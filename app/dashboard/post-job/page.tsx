"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostJobPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    type: "",
    experience: "",
    salary: "",
    salaryNumber: "",
    description: "",
    requirements: "",
    responsibilities: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          salaryNumber: Number(form.salaryNumber) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Unable to post job."
        );
        setLoading(false);
        return;
      }

      setMessage("Job posted successfully!");

      setTimeout(() => {
        router.push("/jobs");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error("POST JOB ERROR:", error);

      setMessage(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="post-job-page">
      <div className="post-job-container">

        {/* HEADER */}
        <div className="post-job-header">
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

            <h1>Post a New Job</h1>

            <p>
              Find the right person for your company by
              creating a professional job listing.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="post-job-form"
        >

          {/* BASIC INFORMATION */}
          <section className="post-job-section">
            <div className="post-job-section-header">
              <h2>Basic Information</h2>
              <p>
                Tell candidates about the position.
              </p>
            </div>

            <div className="post-job-grid">

              <div className="form-group full">
                <label htmlFor="title">
                  Job Title
                </label>

                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">
                  Company Name
                </label>

                <input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. HireHub Technologies"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Lagos, Nigeria"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
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

                  <option value="Engineering">
                    Engineering
                  </option>

                  <option value="Sales">
                    Sales
                  </option>

                  <option value="Customer Service">
                    Customer Service
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="type">
                  Employment Type
                </label>

                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select type
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

              <div className="form-group">
                <label htmlFor="experience">
                  Experience Level
                </label>

                <select
                  id="experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select experience
                  </option>

                  <option value="Entry Level">
                    Entry Level
                  </option>

                  <option value="Mid Level">
                    Mid Level
                  </option>

                  <option value="Senior Level">
                    Senior Level
                  </option>

                  <option value="Expert">
                    Expert
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="salary">
                  Salary
                </label>

                <input
                  id="salary"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₦300,000 - ₦500,000/month"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="salaryNumber">
                  Salary Amount
                </label>

                <input
                  id="salaryNumber"
                  name="salaryNumber"
                  type="number"
                  min="0"
                  value={form.salaryNumber}
                  onChange={handleChange}
                  placeholder="e.g. 500000"
                />
              </div>

            </div>
          </section>

          {/* DESCRIPTION */}
          <section className="post-job-section">
            <div className="post-job-section-header">
              <h2>Job Description</h2>
              <p>
                Give candidates a clear understanding of
                the position.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the job, company and what the successful candidate will do..."
                rows={7}
                required
              />
            </div>
          </section>

          {/* REQUIREMENTS */}
          <section className="post-job-section">
            <div className="post-job-section-header">
              <h2>Requirements</h2>
              <p>
                List the qualifications and skills candidates
                should have.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="requirements">
                Requirements
              </label>

              <textarea
                id="requirements"
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="Example:&#10;• 2+ years of experience&#10;• Strong communication skills&#10;• Knowledge of React"
                rows={7}
                required
              />
            </div>
          </section>

          {/* RESPONSIBILITIES */}
          <section className="post-job-section">
            <div className="post-job-section-header">
              <h2>Responsibilities</h2>
              <p>
                Explain what the person will be responsible
                for.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="responsibilities">
                Responsibilities
              </label>

              <textarea
                id="responsibilities"
                name="responsibilities"
                value={form.responsibilities}
                onChange={handleChange}
                placeholder="Example:&#10;• Build web applications&#10;• Work with the development team&#10;• Maintain existing features"
                rows={7}
                required
              />
            </div>
          </section>

          {/* MESSAGE */}
          {message && (
            <div
              className={
                message.includes("successfully")
                  ? "post-job-message success"
                  : "post-job-message error"
              }
            >
              {message}
            </div>
          )}

          {/* ACTIONS */}
          <div className="post-job-actions">
            <Link
              href="/dashboard"
              className="post-job-cancel"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="dashboard-primary-button post-job-submit"
              disabled={loading}
            >
              {loading
                ? "Posting Job..."
                : "Publish Job"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}