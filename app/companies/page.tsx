"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const companies = [
  {
    id: 1,
    name: "TechNova Solutions",
    logo: "TN",
    industry: "Technology",
    location: "Lagos, Nigeria",
    jobs: 12,
    description:
      "Building modern digital products and innovative technology solutions for businesses across Africa.",
  },
  {
    id: 2,
    name: "Fintech Africa",
    logo: "FA",
    industry: "Financial Technology",
    location: "Lagos, Nigeria",
    jobs: 8,
    description:
      "Creating simple and accessible financial technology solutions for individuals and businesses.",
  },
  {
    id: 3,
    name: "Creative Labs",
    logo: "CL",
    industry: "Design & Creative",
    location: "Abuja, Nigeria",
    jobs: 6,
    description:
      "A creative company focused on branding, product design, user experience, and digital innovation.",
  },
  {
    id: 4,
    name: "Growth Africa",
    logo: "GA",
    industry: "Marketing",
    location: "Lagos, Nigeria",
    jobs: 9,
    description:
      "Helping ambitious African businesses grow through powerful marketing and customer strategies.",
  },
  {
    id: 5,
    name: "AfriConnect",
    logo: "AC",
    industry: "Telecommunications",
    location: "Remote",
    jobs: 5,
    description:
      "Connecting people and businesses through reliable digital communication and customer solutions.",
  },
  {
    id: 6,
    name: "CloudWorks",
    logo: "CW",
    industry: "Cloud & Software",
    location: "Remote",
    jobs: 11,
    description:
      "Developing cloud-based software and infrastructure solutions for modern businesses.",
  },
  {
    id: 7,
    name: "Prime Holdings",
    logo: "PH",
    industry: "Finance",
    location: "Port Harcourt, Nigeria",
    jobs: 4,
    description:
      "A growing financial services organization focused on responsible investment and business growth.",
  },
  {
    id: 8,
    name: "PeopleFirst Nigeria",
    logo: "PN",
    industry: "Human Resources",
    location: "Enugu, Nigeria",
    jobs: 7,
    description:
      "Helping organizations build stronger teams through people-focused recruitment and HR solutions.",
  },
];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");

  const filteredCompanies = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return companies;
    }

    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query) ||
        company.location.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <main className="companies-page">
      {/* HERO */}
      <section className="companies-hero">
        <div className="container">
          <span className="page-label">COMPANIES</span>

          <h1>
            Discover companies
            <span> hiring great talent.</span>
          </h1>

          <p>
            Explore companies, learn about their teams, and discover
            opportunities that match your career goals.
          </p>

          {/* SEARCH */}
          <div className="companies-search">
            <span className="companies-search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search companies, industries or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section className="companies-section">
        <div className="container">
          <div className="companies-section-header">
            <div>
              <span className="section-label">TOP EMPLOYERS</span>

              <h2>
                Companies <span>you should know.</span>
              </h2>
            </div>

            <p>
              {filteredCompanies.length}{" "}
              {filteredCompanies.length === 1
                ? "company"
                : "companies"}{" "}
              found
            </p>
          </div>

          {filteredCompanies.length === 0 ? (
            <div className="companies-empty">
              <div className="empty-icon">⌕</div>

              <h3>No companies found</h3>

              <p>
                Try searching for another company, industry, or location.
              </p>

              <button
                onClick={() => setSearch("")}
                className="clear-search-button"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="companies-grid">
              {filteredCompanies.map((company) => (
                <article className="company-card" key={company.id}>
                  <div className="company-card-top">
                    <div className="company-logo">{company.logo}</div>

                    <span className="company-jobs">
                      {company.jobs} open{" "}
                      {company.jobs === 1 ? "job" : "jobs"}
                    </span>
                  </div>

                  <div className="company-card-content">
                    <h3>{company.name}</h3>

                    <p className="company-industry">
                      {company.industry}
                    </p>

                    <p className="company-location">
                      📍 {company.location}
                    </p>

                    <p className="company-description">
                      {company.description}
                    </p>
                  </div>

                  <div className="company-card-footer">
                    <Link
                      href={`/jobs?company=${encodeURIComponent(
                        company.name
                      )}`}
                      className="company-view-button"
                    >
                      View Jobs
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EMPLOYER CTA */}
      <section className="companies-cta">
        <div className="container">
          <div className="companies-cta-content">
            <div>
              <span className="section-label">FOR EMPLOYERS</span>

              <h2>
                Ready to find your
                <span> next great hire?</span>
              </h2>

              <p>
                Connect with talented professionals and build the team
                your company needs to grow.
              </p>
            </div>

            <Link href="/register" className="companies-cta-button">
              Post a Job
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}