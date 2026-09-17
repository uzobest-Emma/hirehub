"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { jobs } from "./jobsData";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [jobType, setJobType] = useState("All Types");
  const [salary, setSalary] = useState("Any Salary");

  const categories = [
    "All Categories",
    ...Array.from(new Set(jobs.map((job) => job.category))),
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.category.toLowerCase().includes(searchText);

      const matchesLocation =
        location.trim() === "" ||
        job.location.toLowerCase().includes(location.toLowerCase().trim());

      const matchesCategory =
        category === "All Categories" ||
        job.category === category;

      const matchesType =
        jobType === "All Types" ||
        job.type === jobType;

      let matchesSalary = true;

      if (salary === "₦300K+") {
        matchesSalary = job.salaryNumber >= 300000;
      }

      if (salary === "₦500K+") {
        matchesSalary = job.salaryNumber >= 500000;
      }

      if (salary === "₦800K+") {
        matchesSalary = job.salaryNumber >= 800000;
      }

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesType &&
        matchesSalary
      );
    });
  }, [search, location, category, jobType, salary]);

  function resetFilters() {
    setSearch("");
    setLocation("");
    setCategory("All Categories");
    setJobType("All Types");
    setSalary("Any Salary");
  }

  return (
    <main className="jobs-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="jobs-header">

        <div className="container">

          <span className="section-label">
            OPPORTUNITIES
          </span>

          <h1>
            Find your next opportunity
          </h1>

          <p>
            Search thousands of jobs from companies
            looking for talented people like you.
          </p>


          {/* SEARCH */}

          <div className="jobs-search">

            <div className="jobs-search-field">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Job title, keyword or company"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <div className="jobs-search-field">

              <span>⌖</span>

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

            </div>


            <button
              onClick={() => {
                // Search is already live.
                // This button is here for a better user experience.
                document
                  .getElementById("job-results")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Search Jobs →
            </button>

          </div>

        </div>

      </section>


      {/* =========================
          JOBS CONTENT
      ========================= */}

      <section
        className="jobs-content"
        id="job-results"
      >

        <div className="container jobs-layout">


          {/* =========================
              FILTER SIDEBAR
          ========================= */}

          <aside className="filters">

            <div className="filters-title">

              <h2>
                Filters
              </h2>

              <button
                onClick={resetFilters}
              >
                Reset
              </button>

            </div>


            {/* CATEGORY */}

            <div className="filter-group">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>


            {/* JOB TYPE */}

            <div className="filter-group">

              <label>
                Job Type
              </label>

              <select
                value={jobType}
                onChange={(e) =>
                  setJobType(e.target.value)
                }
              >

                <option>
                  All Types
                </option>

                <option>
                  Full-time
                </option>

                <option>
                  Part-time
                </option>

                <option>
                  Contract
                </option>

                <option>
                  Hybrid
                </option>

                <option>
                  Remote
                </option>

              </select>

            </div>


            {/* SALARY */}

            <div className="filter-group">

              <label>
                Minimum Salary
              </label>

              <select
                value={salary}
                onChange={(e) =>
                  setSalary(e.target.value)
                }
              >

                <option>
                  Any Salary
                </option>

                <option>
                  ₦300K+
                </option>

                <option>
                  ₦500K+
                </option>

                <option>
                  ₦800K+
                </option>

              </select>

            </div>

          </aside>


          {/* =========================
              RESULTS
          ========================= */}

          <div className="jobs-results">

            <div className="results-header">

              <div>

                <h2>
                  Available jobs
                </h2>

                <p>
                  {filteredJobs.length}{" "}
                  {filteredJobs.length === 1
                    ? "job"
                    : "jobs"}{" "}
                  found
                </p>

              </div>


              <select
                className="sort-select"
                defaultValue="recent"
              >

                <option value="recent">
                  Most Recent
                </option>

                <option value="salary">
                  Highest Salary
                </option>

                <option value="relevant">
                  Most Relevant
                </option>

              </select>

            </div>


            {/* =========================
                NO RESULTS
            ========================= */}

            {filteredJobs.length === 0 ? (

              <div className="no-results">

                <div>
                  🔎
                </div>

                <h3>
                  No jobs found
                </h3>

                <p>
                  Try changing your search or
                  filters to find more opportunities.
                </p>

                <button
                  onClick={resetFilters}
                  style={{
                    marginTop: "18px",
                    padding: "11px 18px",
                    border: "none",
                    borderRadius: "7px",
                    background: "#2563eb",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              /* =========================
                 JOB LIST
              ========================= */

              <div className="jobs-list">

                {filteredJobs.map((job) => (

                  <article
                    className="job-list-card"
                    key={job.id}
                  >

                    {/* COMPANY LOGO */}

                    <div className="job-list-logo">
                      {job.company.charAt(0)}
                    </div>


                    <div className="job-list-main">

                      <div className="job-list-top">

                        <div>

                          <span className="job-category">
                            {job.category}
                          </span>

                          <h3>
                            {job.title}
                          </h3>

                          <p className="company-name">
                            {job.company}
                          </p>

                        </div>


                        <button
                          className="save-button"
                          aria-label={`Save ${job.title}`}
                        >
                          ♡
                        </button>

                      </div>


                      {/* JOB INFO */}

                      <div className="job-list-info">

                        <span>
                          📍 {job.location}
                        </span>

                        <span>
                          💼 {job.type}
                        </span>

                        <span>
                          🎯 {job.experience}
                        </span>

                      </div>


                      {/* BOTTOM */}

                      <div className="job-list-bottom">

                        <strong>
                          {job.salary}
                        </strong>


                        <Link
                          href={`/jobs/${job.id}`}
                        >
                          View Job →
                        </Link>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}