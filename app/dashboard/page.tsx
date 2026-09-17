import { auth } from "@/auth";
import { db } from "@/src/prisma/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await auth();

  // Protect dashboard
  if (!session?.user) {
    redirect("/login");
  }

  const userName = session.user.name || "User";
  const userEmail = session.user.email || "";
  const userRole = session.user.role || "JOB_SEEKER";

  // Get user's profile
  const profile = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      fullName: true,
      phone: true,
      location: true,
      bio: true,
      skills: true,
      resumeUrl: true,
      website: true,
    },
  });

  // Profile completion fields
  const profileFields = [
    profile?.fullName,
    profile?.phone,
    profile?.location,
    profile?.bio,
    profile?.skills,
    profile?.resumeUrl,
    profile?.website,
  ];

  const completedFields = profileFields.filter(
    (field) => field && field.trim() !== ""
  ).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  // Format user role
  const formattedRole = userRole
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  // User avatar
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <main className="dashboard-page">

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside className="dashboard-sidebar">

        {/* LOGO */}
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">
            H
          </div>

          <span>HireHub</span>
        </div>

        {/* NAVIGATION */}
        <nav className="dashboard-nav">

          {/* DASHBOARD */}
          <Link
            href="/dashboard"
            className="dashboard-nav-item active"
          >
            <span>▦</span>
            Dashboard
          </Link>

          {/* EMPLOYER ONLY */}
         {userRole === "EMPLOYER" && (
  <>
    <Link
      href="/dashboard/post-job"
      className="dashboard-nav-item"
    >
      <span>＋</span>
      Post a Job
    </Link>

    <Link
      href="/dashboard/manage-jobs"
      className="dashboard-nav-item"
    >
      <span>▤</span>
      Manage Jobs
    </Link>
  </>
)}
   <Link
  href="/dashboard/applicants"
  className="dashboard-nav-item"
>
  <span>👥</span>
  Applicants
</Link>

          {/* FIND JOBS */}
          <Link
            href="/jobs"
            className="dashboard-nav-item"
          >
            <span>⌕</span>
            Find Jobs
          </Link>

          {/* APPLICATIONS */}
          <Link
            href="/dashboard/applications"
            className="dashboard-nav-item"
          >
            <span>◫</span>
            My Applications
          </Link>

          {/* SAVED JOBS */}
          <Link
            href="/dashboard/saved-jobs"
            className="dashboard-nav-item"
          >
            <span>♡</span>
            Saved Jobs
          </Link>

          {/* PROFILE */}
          <Link
            href="/dashboard/profile"
            className="dashboard-nav-item"
          >
            <span>◎</span>
            My Profile
          </Link>
        </nav>

        {/* SIDEBAR BOTTOM */}
        <div className="dashboard-sidebar-bottom">

          {/* SETTINGS */}
          <Link
            href="/dashboard/settings"
            className="dashboard-nav-item"
          >
            <span>⚙</span>
            Settings
          </Link>

          {/* BACK TO WEBSITE */}
          <Link
            href="/"
            className="dashboard-nav-item"
          >
            <span>←</span>
            Back to Website
          </Link>

          {/* LOG OUT */}
          <LogoutButton />

        </div>
      </aside>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <section className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <div>

            <p className="dashboard-eyebrow">
              {formattedRole.toUpperCase()} DASHBOARD
            </p>

            <h1>
              Welcome back, {userName} 👋
            </h1>

            <p className="dashboard-header-text">
              Here&apos;s what&apos;s happening with your job search.
            </p>

          </div>

          {/* USER INFORMATION */}
          <div className="dashboard-user">

            <div className="dashboard-avatar">
              {avatarLetter}
            </div>

            <div>
              <strong>
                {userName}
              </strong>

              <span>
                {formattedRole}
              </span>

              <small>
                {userEmail}
              </small>
            </div>

          </div>

        </header>

        {/* =========================================
            STATS
        ========================================= */}
        <div className="dashboard-stats">

          {/* SAVED JOBS */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              ♡
            </div>

            <div>
              <span>
                Saved Jobs
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>

          {/* APPLICATIONS */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              ◫
            </div>

            <div>
              <span>
                Applications
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>

          {/* INTERVIEWS */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              ◷
            </div>

            <div>
              <span>
                Interviews
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>

          {/* PROFILE COMPLETION */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>
              <span>
                Profile Complete
              </span>

              <strong>
                {profileCompletion}%
              </strong>
            </div>

          </div>

        </div>

        {/* =========================================
            DASHBOARD GRID
        ========================================= */}
        <div className="dashboard-grid">

          {/* RECOMMENDED JOBS */}
          <div className="dashboard-card dashboard-jobs-card">

            <div className="dashboard-card-header">

              <div>

                <h2>
                  Recommended Jobs
                </h2>

                <p>
                  Jobs that may be a good match for you.
                </p>

              </div>

              <Link href="/jobs">
                View all
              </Link>

            </div>

            <div className="empty-dashboard">

              <div className="empty-icon">
                ⌕
              </div>

              <h3>
                Find your next opportunity
              </h3>

              <p>
                Start exploring available jobs and
                discover opportunities that match
                your skills.
              </p>

              <Link
                href="/jobs"
                className="dashboard-primary-button"
              >
                Browse Jobs
              </Link>

            </div>

          </div>

          {/* RECENT APPLICATIONS */}
          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <div>

                <h2>
                  Recent Applications
                </h2>

                <p>
                  Track your latest applications.
                </p>

              </div>

              <Link href="/dashboard/applications">
                View all
              </Link>

            </div>

            <div className="empty-dashboard small">

              <div className="empty-icon">
                ◫
              </div>

              <h3>
                No applications yet
              </h3>

              <p>
                When you apply for a job,
                your applications will appear here.
              </p>

            </div>

          </div>

        </div>

        {/* =========================================
            PROFILE COMPLETION
        ========================================= */}
        <div className="dashboard-card profile-progress-card">

          <div>

            <p className="dashboard-eyebrow">
              GET NOTICED BY EMPLOYERS
            </p>

            <h2>
              Complete your profile
            </h2>

            <p>
              A complete profile helps employers
              understand your experience and
              increases your chances of getting hired.
            </p>

          </div>

          <div className="profile-progress">

            <div className="progress-circle">
              <span>
                {profileCompletion}%
              </span>
            </div>

            <Link
              href="/dashboard/profile"
              className="dashboard-primary-button"
            >
              Complete Profile
            </Link>

          </div>

        </div>

      </section>
    </main>
  );
}