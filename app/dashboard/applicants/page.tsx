"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Application = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  coverLetter: string;
  status: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
  };
};

const statuses = [
  "Pending",
  "Reviewing",
  "Shortlisted",
  "Rejected",
  "Hired",
];

export default function ApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadApplications() {
    try {
      const response = await fetch("/api/employer/applications");
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load applicants.");
        return;
      }

      setApplications(data.applications || []);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function updateStatus(
    applicationId: string,
    status: string
  ) {
    try {
      const response = await fetch(
        `/api/employer/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to update status.");
        return;
      }

      setApplications((current) =>
        current.map((application) =>
          application.id === applicationId
            ? { ...application, status }
            : application
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to update application status.");
    }
  }

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-container">
          <p>Loading applicants...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">EMPLOYER</p>
            <h1>Applicants</h1>
            <p>
              Review people who applied to your jobs.
            </p>
          </div>

          <Link
            href="/dashboard/manage-jobs"
            className="dashboard-primary-button"
          >
            Manage Jobs
          </Link>
        </div>

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {!error && applications.length === 0 && (
          <div className="dashboard-card">
            <h2>No applicants yet</h2>

            <p>
              Applications for your jobs will appear here.
            </p>

            <Link
              href="/dashboard/post-job"
              className="dashboard-primary-button"
            >
              Post a Job
            </Link>
          </div>
        )}

        <div className="applicants-list">
          {applications.map((application) => (
            <article
              key={application.id}
              className="applicant-card"
            >
              <div className="applicant-header">
                <div>
                  <p className="dashboard-eyebrow">
                    APPLICATION
                  </p>

                  <h2>{application.fullName}</h2>

                  <p>
                    Applied for{" "}
                    <strong>
                      {application.job.title}
                    </strong>
                  </p>
                </div>

                <select
                  value={application.status}
                  onChange={(event) =>
                    updateStatus(
                      application.id,
                      event.target.value
                    )
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="applicant-details">
                <div>
                  <strong>Email</strong>
                  <p>{application.email}</p>
                </div>

                <div>
                  <strong>Phone</strong>
                  <p>{application.phone}</p>
                </div>

                <div>
                  <strong>Location</strong>
                  <p>{application.location}</p>
                </div>

                <div>
                  <strong>Applied</strong>
                  <p>
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="applicant-cover-letter">
                <strong>Cover Letter</strong>
                <p>{application.coverLetter}</p>
              </div>

              <div className="applicant-actions">
                {application.resumeUrl && (
                  <a
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dashboard-secondary-button"
                  >
                    View Resume
                  </a>
                )}

                <Link
                  href={`/jobs/${application.job.id}`}
                  className="dashboard-secondary-button"
                >
                  View Job
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}