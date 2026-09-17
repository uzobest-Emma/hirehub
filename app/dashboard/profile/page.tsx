"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Profile = {
  id: string;
  fullName: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  bio: string | null;
  skills: string | null;
  resumeUrl: string | null;
  website: string | null;
  companyName: string | null;
  companyLogo: string | null;
  role: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/profile");

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load profile.");
          return;
        }

        const user = data.user;

        setProfile(user);

        setFullName(user.fullName || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setLocation(user.location || "");
        setBio(user.bio || "");
        setSkills(user.skills || "");
        setResumeUrl(user.resumeUrl || "");
        setWebsite(user.website || "");
        setCompanyName(user.companyName || "");
      } catch (error) {
        console.error("PROFILE LOAD ERROR:", error);
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

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
          bio,
          skills,
          resumeUrl,
          website,
          companyName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to update profile.");
        return;
      }

      setProfile(data.user);

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
      setError("Unable to connect to the server.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          Loading your profile...
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="profile-page">
        <div className="profile-error">
          {error || "Unable to load your profile."}
        </div>
      </main>
    );
  }

  const avatarLetter =
    fullName.charAt(0).toUpperCase() || "U";

  return (
    <main className="profile-page">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">
            H
          </div>

          <span>HireHub</span>
        </div>

        <nav className="dashboard-nav">

          <Link
            href="/dashboard"
            className="dashboard-nav-item"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link
            href="/jobs"
            className="dashboard-nav-item"
          >
            <span>⌕</span>
            Find Jobs
          </Link>

          <Link
            href="/dashboard/applications"
            className="dashboard-nav-item"
          >
            <span>◫</span>
            My Applications
          </Link>

          <Link
            href="/dashboard/saved-jobs"
            className="dashboard-nav-item"
          >
            <span>♡</span>
            Saved Jobs
          </Link>

          <Link
            href="/dashboard/profile"
            className="dashboard-nav-item active"
          >
            <span>◎</span>
            My Profile
          </Link>

        </nav>

        <div className="dashboard-sidebar-bottom">

          <Link
            href="/dashboard/settings"
            className="dashboard-nav-item"
          >
            <span>⚙</span>
            Settings
          </Link>

          <Link
            href="/"
            className="dashboard-nav-item"
          >
            <span>←</span>
            Back to Website
          </Link>

        </div>
      </aside>

      {/* MAIN */}
      <section className="profile-main">

        {/* HEADER */}
        <header className="profile-header">

          <div>
            <p className="dashboard-eyebrow">
              MY PROFILE
            </p>

            <h1>
              Profile Settings
            </h1>

            <p>
              Keep your professional information
              up to date.
            </p>
          </div>

        </header>

        {/* PROFILE SUMMARY */}
        <div className="profile-summary-card">

          <div className="profile-avatar">
            {avatarLetter}
          </div>

          <div className="profile-summary-info">

            <h2>
              {fullName || "Your Name"}
            </h2>

            <p>
              {email}
            </p>

            <span>
              {profile.role
                .replaceAll("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (letter) =>
                  letter.toUpperCase()
                )}
            </span>

          </div>

        </div>

        {/* FORM */}
        <form
          className="profile-form-card"
          onSubmit={handleSubmit}
        >

          <div className="profile-section-title">
            <h2>
              Personal Information
            </h2>

            <p>
              Tell employers about yourself.
            </p>
          </div>

          <div className="profile-form-grid">

            {/* FULL NAME */}
            <div className="profile-input-group">

              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                placeholder="Your full name"
                required
              />

            </div>

            {/* EMAIL */}
            <div className="profile-input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                disabled
              />

              <small>
                Your email address cannot be changed here.
              </small>

            </div>

            {/* PHONE */}
            <div className="profile-input-group">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="+234 800 000 0000"
              />

            </div>

            {/* LOCATION */}
            <div className="profile-input-group">

              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Lagos, Nigeria"
              />

            </div>

          </div>

          {/* BIO */}
          <div className="profile-input-group full-width">

            <label htmlFor="bio">
              Professional Bio
            </label>

            <textarea
              id="bio"
              value={bio}
              onChange={(e) =>
                setBio(e.target.value)
              }
              placeholder="Tell employers about your experience, strengths and career goals..."
              rows={6}
            />

          </div>

          {/* SKILLS */}
          <div className="profile-input-group full-width">

            <label htmlFor="skills">
              Skills
            </label>

            <input
              id="skills"
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="React, Next.js, TypeScript, UI/UX..."
            />

            <small>
              Separate your skills with commas.
            </small>

          </div>

          {/* CAREER INFORMATION */}
          <div className="profile-section-title profile-career-title">

            <h2>
              Career Information
            </h2>

            <p>
              Add links that help employers learn more about you.
            </p>

          </div>

          <div className="profile-form-grid">

            {/* RESUME */}
            <div className="profile-input-group">

              <label htmlFor="resumeUrl">
                Resume URL
              </label>

              <input
                id="resumeUrl"
                type="url"
                value={resumeUrl}
                onChange={(e) =>
                  setResumeUrl(e.target.value)
                }
                placeholder="https://..."
              />

            </div>

            {/* WEBSITE */}
            <div className="profile-input-group">

              <label htmlFor="website">
                Personal Website
              </label>

              <input
                id="website"
                type="url"
                value={website}
                onChange={(e) =>
                  setWebsite(e.target.value)
                }
                placeholder="https://yourwebsite.com"
              />

            </div>

            {/* COMPANY */}
            <div className="profile-input-group">

              <label htmlFor="companyName">
                Company Name
              </label>

              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(e.target.value)
                }
                placeholder="Company name"
              />

            </div>

          </div>

          {/* MESSAGES */}
          {error && (
            <div className="profile-message profile-message-error">
              {error}
            </div>
          )}

          {message && (
            <div className="profile-message profile-message-success">
              {message}
            </div>
          )}

          {/* ACTIONS */}
          <div className="profile-form-actions">

            <Link
              href="/dashboard"
              className="profile-cancel-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="dashboard-primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}