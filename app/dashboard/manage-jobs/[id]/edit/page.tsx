"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  experience: string;
  salary: string;
  salaryNumber: number;
  description: string;
  requirements: string;
  responsibilities: string;
};

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryNumber, setSalaryNumber] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadJob() {
      try {
        const response = await fetch(
          `/api/jobs/${jobId}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Unable to load this job."
          );
          return;
        }

        const loadedJob = data.job as Job;

        setJob(loadedJob);

        setTitle(loadedJob.title);
        setCompany(loadedJob.company);
        setLocation(loadedJob.location);
        setCategory(loadedJob.category);
        setType(loadedJob.type);
        setExperience(loadedJob.experience);
        setSalary(loadedJob.salary);
        setSalaryNumber(
          String(loadedJob.salaryNumber ?? "")
        );
        setDescription(loadedJob.description);
        setRequirements(loadedJob.requirements);
        setResponsibilities(
          loadedJob.responsibilities
        );
      } catch (error) {
        console.error("LOAD JOB ERROR:", error);

        setError(
          "Unable to load the job. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !title ||
      !company ||
      !location ||
      !category ||
      !type ||
      !experience ||
      !salary ||
      !description ||
      !requirements ||
      !responsibilities
    ) {
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `/api/jobs/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            company,
            location,
            category,
            type,
            experience,
            salary,
            salaryNumber: Number(salaryNumber) || 0,
            description,
            requirements,
            responsibilities,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to update the job."
        );
        return;
      }

      setSuccess("Job updated successfully.");

      setTimeout(() => {
        router.push("/dashboard/manage-jobs");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error("UPDATE JOB ERROR:", error);

      setError(
        "Something went wrong while updating the job."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/jobs/${jobId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to delete the job."
        );
        return;
      }

      router.push("/dashboard/manage-jobs");
      router.refresh();
    } catch (error) {
      console.error("DELETE JOB ERROR:", error);

      setError(
        "Something went wrong while deleting the job."
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="edit-job-page">
        <div className="edit-job-container">
          <div className="edit-job-loading">
            Loading job...
          </div>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="edit-job-page">
        <div className="edit-job-container">
          <Link
            href="/dashboard/manage-jobs"
            className="back-link"
          >
            ← Back to Manage Jobs
          </Link>

          <div className="edit-job-error-card">
            <h1>Job Not Found</h1>

            <p>
              {error ||
                "We couldn't find this job."}
            </p>

            <Link
              href="/dashboard/manage-jobs"
              className="dashboard-primary-button"
            >
              Back to Manage Jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="edit-job-page">
      <div className="edit-job-container">

        <div className="edit-job-header">
          <div>
            <Link
              href="/dashboard/manage-jobs"
              className="back-link"
            >
              ← Back to Manage Jobs
            </Link>

            <p className="dashboard-eyebrow">
              EMPLOYER
            </p>

            <h1>Edit Job</h1>

            <p>
              Update the details of your job listing.
            </p>
          </div>
        </div>

        <div className="edit-job-card">

          <form onSubmit={handleSubmit}>

            {/* JOB TITLE */}
            <div className="edit-job-field">
              <label htmlFor="title">
                Job Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g. Frontend Developer"
                required
              />
            </div>

            {/* COMPANY */}
            <div className="edit-job-field">
              <label htmlFor="company">
                Company
              </label>

              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                placeholder="Company name"
                required
              />
            </div>

            {/* LOCATION */}
            <div className="edit-job-field">
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
                placeholder="e.g. Lagos, Nigeria"
                required
              />
            </div>

            {/* CATEGORY */}
            <div className="edit-job-field">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
              >
                <option value="">
                  Select category
                </option>

                <option value="Technology">
                  Technology
                </option>

                <option value="Design">
                  Design
                </option>

                <option value="Marketing">
                  Marketing
                </option>

                <option value="Finance">
                  Finance
                </option>

                <option value="Healthcare">
                  Healthcare
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Sales">
                  Sales
                </option>

                <option value="Engineering">
                  Engineering
                </option>

                <option value="Customer Service">
                  Customer Service
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* JOB TYPE */}
            <div className="edit-job-field">
              <label htmlFor="type">
                Job Type
              </label>

              <select
                id="type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
                required
              >
                <option value="">
                  Select job type
                </option>

                <option value="Full-time">
                  Full-time
                </option>

                <option value="Part-time">
                  Part-time
                </option>

                <option value="Contract">
                  Contract
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Remote">
                  Remote
                </option>
              </select>
            </div>

            {/* EXPERIENCE */}
            <div className="edit-job-field">
              <label htmlFor="experience">
                Experience
              </label>

              <select
                id="experience"
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value)
                }
                required
              >
                <option value="">
                  Select experience
                </option>

                <option value="Entry Level">
                  Entry Level
                </option>

                <option value="1-3 years">
                  1-3 years
                </option>

                <option value="3-5 years">
                  3-5 years
                </option>

                <option value="5+ years">
                  5+ years
                </option>
              </select>
            </div>

            {/* SALARY */}
            <div className="edit-job-row">

              <div className="edit-job-field">
                <label htmlFor="salary">
                  Salary
                </label>

                <input
                  id="salary"
                  type="text"
                  value={salary}
                  onChange={(e) =>
                    setSalary(e.target.value)
                  }
                  placeholder="e.g. ₦300,000 - ₦500,000/month"
                  required
                />
              </div>

              <div className="edit-job-field">
                <label htmlFor="salaryNumber">
                  Salary Number
                </label>

                <input
                  id="salaryNumber"
                  type="number"
                  value={salaryNumber}
                  onChange={(e) =>
                    setSalaryNumber(
                      e.target.value
                    )
                  }
                  placeholder="400000"
                />
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="edit-job-field">
              <label htmlFor="description">
                Job Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe the job..."
                rows={6}
                required
              />
            </div>

            {/* REQUIREMENTS */}
            <div className="edit-job-field">
              <label htmlFor="requirements">
                Requirements
              </label>

              <textarea
                id="requirements"
                value={requirements}
                onChange={(e) =>
                  setRequirements(e.target.value)
                }
                placeholder={
                  "Enter one requirement per line"
                }
                rows={7}
                required
              />

              <small>
                Put each requirement on a separate
                line.
              </small>
            </div>

            {/* RESPONSIBILITIES */}
            <div className="edit-job-field">
              <label htmlFor="responsibilities">
                Responsibilities
              </label>

              <textarea
                id="responsibilities"
                value={responsibilities}
                onChange={(e) =>
                  setResponsibilities(
                    e.target.value
                  )
                }
                placeholder={
                  "Enter one responsibility per line"
                }
                rows={7}
                required
              />

              <small>
                Put each responsibility on a separate
                line.
              </small>
            </div>

            {/* MESSAGES */}
            {error && (
              <div className="edit-job-error">
                {error}
              </div>
            )}

            {success && (
              <div className="edit-job-success">
                {success}
              </div>
            )}

            {/* ACTIONS */}
            <div className="edit-job-actions">

              <Link
                href="/dashboard/manage-jobs"
                className="edit-job-cancel"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="edit-job-save"
                disabled={saving || deleting}
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

          {/* DELETE */}
          <div className="edit-job-danger-zone">
            <div>
              <h2>Delete Job</h2>

              <p>
                Permanently remove this job listing
                from HireHub.
              </p>
            </div>

            <button
              type="button"
              className="edit-job-delete"
              onClick={handleDelete}
              disabled={saving || deleting}
            >
              {deleting
                ? "Deleting..."
                : "Delete Job"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}