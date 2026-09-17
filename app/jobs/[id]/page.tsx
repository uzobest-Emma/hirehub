import Link from "next/link";
import { db } from "@/src/prisma/db";
import { notFound } from "next/navigation";
import SaveJobButton from "./SaveJobButton";

type JobDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetails({
  params,
}: JobDetailsProps) {
  const { id } = await params;

  const job = await db.job.findUnique({
    where: {
      id,
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
      description: true,
      requirements: true,
      responsibilities: true,
      createdAt: true,
    },
  });

  // Job doesn't exist
  if (!job) {
    notFound();
  }

  return (
    <main className="job-details-page">

      {/* =========================
          JOB HEADER
      ========================= */}

      <section className="job-details-header">
        <div className="container">

          <Link
            href="/jobs"
            className="back-link"
          >
            ← Back to jobs
          </Link>

          <div className="job-details-title">

            <div className="details-company-logo">
              {job.company.charAt(0).toUpperCase()}
            </div>

            <div>

              <span className="job-category">
                {job.category}
              </span>

              <h1>
                {job.title}
              </h1>

              <p>
                {job.company}
              </p>

            </div>

          </div>


          {/* JOB META */}

          <div className="details-meta">

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

        </div>
      </section>


      {/* =========================
          JOB CONTENT
      ========================= */}

      <section className="job-details-content">

        <div className="container details-layout">

          {/* =========================
              MAIN CONTENT
          ========================= */}

          <div className="details-main">

            {/* ABOUT THE JOB */}

            <section className="details-section">

              <h2>
                About the Job
              </h2>

              <p>
                {job.description}
              </p>

            </section>


            {/* RESPONSIBILITIES */}

            <section className="details-section">

              <h2>
                Responsibilities
              </h2>

              <div className="job-text-content">

                {job.responsibilities
                  .split("\n")
                  .filter(
                    (item) => item.trim() !== ""
                  )
                  .map((item, index) => (

                    <p key={index}>
                      {item}
                    </p>

                  ))}

              </div>

            </section>


            {/* REQUIREMENTS */}

            <section className="details-section">

              <h2>
                Requirements
              </h2>

              <div className="job-text-content">

                {job.requirements
                  .split("\n")
                  .filter(
                    (item) => item.trim() !== ""
                  )
                  .map((item, index) => (

                    <p key={index}>
                      {item}
                    </p>

                  ))}

              </div>

            </section>


            {/* ABOUT COMPANY */}

            <section className="details-section">

              <h2>
                About {job.company}
              </h2>

              <p>
                {job.company} is an innovative company
                focused on building great products,
                developing talented people, and creating
                opportunities for professionals to grow.
              </p>

            </section>

          </div>


          {/* =========================
              APPLICATION SIDEBAR
          ========================= */}

          <aside className="application-card">

            <h2>
              Interested in this job?
            </h2>

            <p>
              Take the next step in your career and
              apply for this opportunity.
            </p>


            {/* APPLY BUTTON */}

            <Link
              href={`/jobs/${job.id}/apply`}
              className="apply-button"
            >
              Apply Now →
            </Link>


            {/* SAVE JOB BUTTON */}

            <SaveJobButton
              jobId={job.id}
            />


            <div className="application-divider"></div>


            {/* JOB SUMMARY */}

            <h3>
              Job Summary
            </h3>


            <div className="summary-item">

              <span>
                Salary
              </span>

              <strong>
                {job.salary}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Job Type
              </span>

              <strong>
                {job.type}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Location
              </span>

              <strong>
                {job.location}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Experience
              </span>

              <strong>
                {job.experience}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Category
              </span>

              <strong>
                {job.category}
              </strong>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}