import { auth } from "@/auth";
import { db } from "@/src/prisma/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SavedJobsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const savedJobs = await db.saved_job.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      job: {
        select: {
          id: true,
          title: true,
          company: true,
          location: true,
          category: true,
          type: true,
          experience: true,
          salary: true,
        },
      },
    },
  });

  return (
    <main className="saved-jobs-page">
      <div className="saved-jobs-container">

        <div className="saved-jobs-header">

          <Link
            href="/dashboard"
            className="back-link"
          >
            ← Back to Dashboard
          </Link>

          <p className="dashboard-eyebrow">
            JOB SEEKER
          </p>

          <h1>Saved Jobs</h1>

          <p>
            Keep track of jobs you're interested in
            and come back to them later.
          </p>

        </div>


        {savedJobs.length === 0 ? (

          <div className="saved-jobs-empty">

            <div className="empty-icon">
              ♡
            </div>

            <h2>No saved jobs yet</h2>

            <p>
              When you find a job you like, save it here
              so you can easily find it later.
            </p>

            <Link
              href="/jobs"
              className="dashboard-primary-button"
            >
              Browse Jobs
            </Link>

          </div>

        ) : (

          <div className="saved-jobs-list">

            {savedJobs.map((saved) => (

              <article
                key={saved.id}
                className="saved-job-card"
              >

                <div className="saved-job-logo">
                  {saved.job.company
                    .charAt(0)
                    .toUpperCase()}
                </div>


                <div className="saved-job-info">

                  <span className="saved-job-category">
                    {saved.job.category}
                  </span>

                  <h2>
                    {saved.job.title}
                  </h2>

                  <p className="saved-job-company">
                    {saved.job.company}
                  </p>


                  <div className="saved-job-meta">

                    <span>
                      📍 {saved.job.location}
                    </span>

                    <span>
                      💼 {saved.job.type}
                    </span>

                    <span>
                      🎯 {saved.job.experience}
                    </span>

                    <span>
                      💰 {saved.job.salary}
                    </span>

                  </div>

                </div>


                <div className="saved-job-actions">

                  <Link
                    href={`/jobs/${saved.job.id}`}
                    className="view-job-button"
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