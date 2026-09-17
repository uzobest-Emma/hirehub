"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ApplyJobPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = String(params.id);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    resumeUrl: "",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
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
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          ...form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Unable to submit application."
        );
        setLoading(false);
        return;
      }

      setMessage("Application submitted successfully!");

      setTimeout(() => {
        router.push("/dashboard/applications");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error("APPLICATION ERROR:", error);

      setMessage(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="apply-page">
      <div className="apply-container">

        <Link
          href={`/jobs/${jobId}`}
          className="back-link"
        >
          ← Back to Job
        </Link>

        <div className="apply-header">
          <p className="dashboard-eyebrow">
            JOB APPLICATION
          </p>

          <h1>Apply for this position</h1>

          <p>
            Complete the form below to submit your
            application.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="apply-form"
        >

          {/* PERSONAL INFORMATION */}

          <section className="apply-section">

            <div className="apply-section-header">
              <h2>Personal Information</h2>

              <p>
                Tell the employer how they can contact you.
              </p>
            </div>

            <div className="apply-grid">

              <div className="form-group">

                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
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
                  placeholder="Lagos, Nigeria"
                  required
                />

              </div>

            </div>

          </section>


          {/* RESUME */}

          <section className="apply-section">

            <div className="apply-section-header">

              <h2>Resume</h2>

              <p>
                Provide a link to your resume.
              </p>

            </div>

            <div className="form-group">

              <label htmlFor="resumeUrl">
                Resume URL
              </label>

              <input
                id="resumeUrl"
                name="resumeUrl"
                type="url"
                value={form.resumeUrl}
                onChange={handleChange}
                placeholder="https://example.com/my-resume.pdf"
                required
              />

            </div>

          </section>


          {/* COVER LETTER */}

          <section className="apply-section">

            <div className="apply-section-header">

              <h2>Cover Letter</h2>

              <p>
                Explain why you are a good fit for this
                position.
              </p>

            </div>

            <div className="form-group">

              <label htmlFor="coverLetter">
                Cover Letter
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                placeholder="Tell the employer about yourself, your experience and why you are interested in this position..."
                rows={9}
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

          <div className="apply-actions">

            <Link
              href={`/jobs/${jobId}`}
              className="post-job-cancel"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="dashboard-primary-button apply-submit"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Application"}
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}