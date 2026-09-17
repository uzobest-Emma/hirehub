"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AccountRole = "JOB_SEEKER" | "EMPLOYER";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AccountRole>("JOB_SEEKER");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanFullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: cleanFullName,
          email: cleanEmail,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to create your account."
        );
        return;
      }

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      console.error("REGISTRATION ERROR:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">

        {/* BRAND */}
        <div className="auth-brand">
          <div className="auth-logo">H</div>

          <h1>Join HireHub</h1>

          <p>
            Create your account and take the next step
            toward your career.
          </p>
        </div>

        {/* REGISTER CARD */}
        <div className="auth-card">

          <h2>Create Account</h2>

          <p className="auth-subtitle">
            Tell us a little about yourself.
          </p>

          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}
            <div className="auth-input-group">
              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                autoComplete="name"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="auth-input-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                required
              />
            </div>

            {/* ACCOUNT TYPE */}
            <div className="auth-input-group">
              <label>
                I want to
              </label>

              <div className="role-options">

                {/* JOB SEEKER */}
                <label
                  className={`role-option ${
                    role === "JOB_SEEKER"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="JOB_SEEKER"
                    checked={
                      role === "JOB_SEEKER"
                    }
                    onChange={() =>
                      setRole("JOB_SEEKER")
                    }
                  />

                  <div>
                    <strong>
                      Find a Job
                    </strong>

                    <span>
                      I'm looking for employment
                    </span>
                  </div>
                </label>

                {/* EMPLOYER */}
                <label
                  className={`role-option ${
                    role === "EMPLOYER"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="EMPLOYER"
                    checked={
                      role === "EMPLOYER"
                    }
                    onChange={() =>
                      setRole("EMPLOYER")
                    }
                  />

                  <div>
                    <strong>
                      Hire Talent
                    </strong>

                    <span>
                      I'm looking for employees
                    </span>
                  </div>
                </label>

              </div>
            </div>

            {/* PASSWORD */}
            <div className="auth-input-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="new-password"
                minLength={8}
                required
              />

              <small>
                Use at least 8 characters.
              </small>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="auth-input-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            {/* ERROR */}
            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            {/* SUCCESS */}
            {success && (
              <p className="auth-success">
                {success}
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </form>

          {/* GOOGLE */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="social-login"
            onClick={() => {
              alert(
                "Google sign-in will be available soon."
              );
            }}
          >
            Continue with Google
          </button>

          {/* LOGIN */}
          <p className="auth-switch">
            Already have an account?{" "}
            <Link href="/login">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}