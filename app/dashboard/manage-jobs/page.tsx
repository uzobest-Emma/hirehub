import { auth } from "@/auth";
import { db } from "@/src/prisma/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ManageJobsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "EMPLOYER") {
    redirect("/dashboard");
  }

  const jobs = await db.job.findMany({
    where: {
      employerId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      company: true,
      location: true,
      category: true,
      type: true,
      experience: true,
      salary: true,
      createdAt: true,
      _count: {
        select: {
          application: true,
        },
      },
    },
  });

  return (
    <main className="manage-jobs-page">
      <div className="manage-jobs-container">

        <div className="manage-jobs-header">

          <div>
            <Link
              href="/dashboard"
              className="back-link"
            >
              ← Back to Dashboard
            </Link>

            <p className="dashboard-eyebrow">
              EMPLOYER
            </p>

            <h1>Manage Jobs</h1>

            <p>
              Manage the jobs you have posted and track
              applications from candidates.
            </p>
          </div>

          <Link
            href="/dashboard/post-job"
            className="dashboard-primary-button"
          >
            + Post a New Job
          </Link>

        </div>


        {jobs.length === 0 ? (

          <div className="manage-jobs-empty">

            <div className="empty-icon">
              💼
            </div>

            <h2>No jobs posted yet</h2>

            <p>
              You haven't posted any jobs yet. Create your
              first job listing and start finding candidates.
            </p>

            <Link
              href="/dashboard/post-job"
              className="dashboard-primary-button"
            >
              Post Your First Job
            </Link>

          </div>

        ) : (

          <div className="manage-jobs-list">

            {jobs.map((job) => (

              <article
                key={job.id}
                className="manage-job-card"
              >

                <div className="manage-job-logo">
                  {job.company
                    .charAt(0)
                    .toUpperCase()}
                </div>


                <div className="manage-job-info">

                  <span className="manage-job-category">
                    {job.category}
                  </span>

                  <h2>
                    {job.title}
                  </h2>

                  <p className="manage-job-company">
                    {job.company}
                  </p>


                  <div className="manage-job-meta">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      💼 {job.type}
                    </span>

                    <span>
                      🎯 {job.experience}
                    </span>

                    <span>
                      💰 {job.salary}
                    </span>

                  </div>


                  <p className="manage-job-date">
                    Posted on{" "}
                    {new Date(
                      job.createdAt
                    ).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                </div>


                <div className="manage-job-right">

                  <div className="applicant-count">

                    <strong>
                      {job._count.application}
                    </strong>

                    <span>
                      {job._count.application === 1
                        ? "Applicant"
                        : "Applicants"}
                    </span>

                  </div>


                  <div className="manage-job-actions">

                    <Link
                      href={`/jobs/${job.id}`}
                      className="manage-view-button"
                    >
                      View
                    </Link>

                    <Link
                      href={`/dashboard/manage-jobs/${job.id}/edit`}
                      className="manage-edit-button"
                    >
                      Edit
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}