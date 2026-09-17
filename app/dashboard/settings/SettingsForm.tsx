"use client";

import { useState } from "react";

type SettingsFormProps = {
  user: {
    fullName: string | null;
    email: string;
    phone: string | null;
    location: string | null;
    role: string;
  };
};

export default function SettingsForm({
  user,
}: SettingsFormProps) {
  const [fullName, setFullName] = useState(user.fullName ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [location, setLocation] = useState(user.location ?? "");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phone,
          location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Unable to update your account."
        );
        return;
      }

      setMessage("Your account information has been updated.");
    } catch (error) {
      console.error("SETTINGS ERROR:", error);

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="settings-layout">
      <aside className="settings-sidebar">
        <a href="#account" className="settings-nav-active">
          Account
        </a>

        <a href="#security">
          Security
        </a>

        <a href="#notifications">
          Notifications
        </a>

        <a href="#danger-zone">
          Danger Zone
        </a>
      </aside>

      <div className="settings-content">
        {/* ACCOUNT */}

        <section
          id="account"
          className="settings-card"
        >
          <div className="settings-card-header">
            <div>
              <h2>Account Information</h2>

              <p>
                Update the information connected to your
                HireHub account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="settings-form-grid">
              <div className="settings-field">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  placeholder="Your full name"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                />

                <small>
                  Your email address cannot be changed
                  here.
                </small>
              </div>

              <div className="settings-field">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="e.g. 08012345678"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  placeholder="e.g. Lagos, Nigeria"
                />
              </div>
            </div>

            <div className="settings-account-details">
              <div>
                <span>Account Type</span>

                <strong>
                  {user.role === "EMPLOYER"
                    ? "Employer"
                    : "Job Seeker"}
                </strong>
              </div>

              <div>
                <span>Account Status</span>

                <strong className="account-active">
                  Active
                </strong>
              </div>
            </div>

            {message && (
              <div className="settings-message">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="settings-save-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </form>
        </section>

        {/* SECURITY */}

        <section
          id="security"
          className="settings-card"
        >
          <div className="settings-card-header">
            <div>
              <h2>Security</h2>

              <p>
                Keep your HireHub account secure.
              </p>
            </div>
          </div>

          <div className="settings-option">
            <div>
              <h3>Password</h3>

              <p>
                Change your account password regularly
                to keep your account secure.
              </p>
            </div>

    <a
      href="/dashboard/settings/change-password"
      className="settings-secondary-button"
    >
      Change Password
    </a>
          </div>
        </section>

        {/* NOTIFICATIONS */}

        <section
          id="notifications"
          className="settings-card"
        >
          <div className="settings-card-header">
            <div>
              <h2>Notifications</h2>

              <p>
                Choose how you want to receive HireHub
                notifications.
              </p>
            </div>
          </div>

          <div className="notification-option">
            <div>
              <h3>Email Notifications</h3>

              <p>
                Receive important updates about your
                applications and account.
              </p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                defaultChecked
              />

              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-option">
            <div>
              <h3>New Job Alerts</h3>

              <p>
                Receive notifications when new jobs match
                your interests.
              </p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                defaultChecked
              />

              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>

        {/* DANGER ZONE */}

        <section
          id="danger-zone"
          className="settings-card danger-card"
        >
          <div className="settings-card-header">
            <div>
              <h2>Danger Zone</h2>

              <p>
                Actions here can permanently affect your
                HireHub account.
              </p>
            </div>
          </div>

          <div className="danger-option">
            <div>
              <h3>Delete Account</h3>

              <p>
                Permanently delete your HireHub account
                and associated data.
              </p>
            </div>

            <button
              type="button"
              className="delete-account-button"
              onClick={() =>
                alert(
                  "Account deletion will be added after the main account system is complete."
                )
              }
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}