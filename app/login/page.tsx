"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      // Login successful
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">

        {/* BRAND SECTION */}
        <div className="auth-brand">
          <div className="auth-logo">H</div>

          <h1>Welcome back to HireHub</h1>

          <p>
            Sign in to find your next opportunity or manage your job postings.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="auth-card">

          <h2>Sign In</h2>

          <p className="auth-subtitle">
            Enter your account details below.
          </p>

          <form onSubmit={handleSubmit}>

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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="auth-input-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* OPTIONS */}
            <div className="auth-options">

              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="social-login"
          >
            Continue with Google
          </button>

          {/* REGISTER LINK */}
          <p className="auth-switch">
            Don&apos;t have an account?{" "}

            <Link href="/register">
              Create one
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}