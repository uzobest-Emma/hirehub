"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (newPassword.length < 8) {
      setError(
        "Your new password must be at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to change your password."
        );
        return;
      }

      setMessage(
        "Your password has been changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "CHANGE PASSWORD ERROR:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="change-password-page">
      <div className="change-password-container">

        <Link
          href="/dashboard/settings"
          className="back-link"
        >
          ← Back to Settings
        </Link>

        <div className="change-password-card">

          <div className="change-password-header">
            <div className="change-password-icon">
              🔐
            </div>

            <p className="dashboard-eyebrow">
              ACCOUNT SECURITY
            </p>

            <h1>Change Password</h1>

            <p>
              Update your HireHub password to keep your
              account secure.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="change-password-field">
              <label htmlFor="currentPassword">
                Current Password
              </label>

              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) =>
                  setCurrentPassword(event.target.value)
                }
                placeholder="Enter your current password"
                required
              />
            </div>

            <div className="change-password-field">
              <label htmlFor="newPassword">
                New Password
              </label>

              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                placeholder="At least 8 characters"
                required
              />

              <small>
                Use at least 8 characters for better
                security.
              </small>
            </div>

            <div className="change-password-field">
              <label htmlFor="confirmPassword">
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Enter your new password again"
                required
              />
            </div>

            {error && (
              <div className="change-password-error">
                {error}
              </div>
            )}

            {message && (
              <div className="change-password-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="change-password-button"
              disabled={loading}
            >
              {loading
                ? "Updating Password..."
                : "Update Password"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}