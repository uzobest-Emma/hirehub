import { auth } from "@/auth";
import { db } from "@/src/prisma/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ApplicationsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const applications = await db.application.findMany({
    where: {
      applicantId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      job: {
        select: {
          id: true,
          title: true,
          company: true,
          location: true,
          type: true,
          salary: true,
        },
      },
    },
  });

  return (
    <main className="applications-page">
      <div className="applications-container">

        <div className="applications-header">
          <Link
            href="/dashboard"
            className="back-link"
          >
            ← Back to Dashboard
          </Link>

          <p className="dashboard-eyebrow">
            JOB SEEKER
          </p>

          <h1>My Applications</h1>

          <p>
            Track the jobs you have applied for and monitor
            your application status.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="applications-empty">

            <div className="empty-icon">
              ◫
            </div>

            <h2>No applications yet</h2>

            <p>
              You haven't applied for any jobs yet.
              Start exploring available opportunities.
            </p>

            <Link
              href="/jobs"
              className="dashboard-primary-button"
            >
              Browse Jobs
            </Link>

          </div>
        ) : (
          <div className="applications-list">

            {applications.map((application) => (

              <article
                key={application.id}
                className="application-item"
              >

                <div className="application-company-logo">
                  {application.job.company
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="application-info">

                  <h2>
                    {application.job.title}
                  </h2>

                  <p className="application-company">
                    {application.job.company}
                  </p>

                  <div className="application-meta">

                    <span>
                      📍 {application.job.location}
                    </span>

                    <span>
                      💼 {application.job.type}
                    </span>

                    <span>
                      💰 {application.job.salary}
                    </span>

                  </div>

                  <p className="application-date">
                    Applied on{" "}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                </div>

                <div className="application-status-area">

                  <span
                    className={`application-status ${application.status.toLowerCase()}`}
                  >
                    {application.status}
                  </span>

                  <Link
                    href={`/jobs/${application.job.id}`}
                    className="view-job-link"
                  >
                    View Job →
                  </Link>

                </div>

              </article>

            ))}

          </div>
        )}

      </div>
    </main>
  );
}