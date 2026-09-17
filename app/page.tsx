const featuredJobs = [
  {
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Lagos, Nigeria",
    type: "Full-time",
    salary: "₦500K - ₦800K",
    category: "Technology",
  },
  {
    title: "Product Designer",
    company: "Creative Labs",
    location: "Abuja, Nigeria",
    type: "Full-time",
    salary: "₦400K - ₦700K",
    category: "Design",
  },
  {
    title: "Marketing Manager",
    company: "Growth Africa",
    location: "Lagos, Nigeria",
    type: "Hybrid",
    salary: "₦450K - ₦750K",
    category: "Marketing",
  },
  {
    title: "Customer Support Specialist",
    company: "AfriConnect",
    location: "Remote",
    type: "Remote",
    salary: "₦250K - ₦400K",
    category: "Customer Service",
  },
];

const categories = [
  { icon: "💻", name: "Technology", jobs: "1,240 jobs" },
  { icon: "🎨", name: "Design", jobs: "580 jobs" },
  { icon: "📊", name: "Marketing", jobs: "720 jobs" },
  { icon: "💼", name: "Finance", jobs: "460 jobs" },
  { icon: "🏥", name: "Healthcare", jobs: "390 jobs" },
  { icon: "🎓", name: "Education", jobs: "310 jobs" },
];

export default function Home() {
  return (
    <main>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <a href="/" className="logo">
            Hire<span>Hub</span>
          </a>

          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/jobs">Find Jobs</a>
            <a href="/companies">Companies</a>
            <a href="/career-advice">Career Advice</a>
          </div>

          <div className="nav-actions">
            <a href="/login" className="login-btn">
              Login
            </a>

            <a href="/register" className="signup-btn">
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-background"></div>

        <div className="container hero-content">
          <div className="hero-badge">
            <span>✦</span>
            The smarter way to find your next opportunity
          </div>

          <h1>
            Find a job where
            <br />
            <span>your talent matters.</span>
          </h1>

          <p className="hero-text">
            Discover thousands of job opportunities from trusted companies.
            Find the career you deserve and take the next step toward your
            future.
          </p>

          {/* SEARCH */}
          <div className="search-box">
            <div className="search-field">
              <span className="search-icon">⌕</span>

              <div>
                <label>What are you looking for?</label>
                <input
                  type="text"
                  placeholder="Job title, keyword or company"
                />
              </div>
            </div>

            <div className="search-divider"></div>

            <div className="search-field">
              <span className="location-icon">⌖</span>

              <div>
                <label>Location</label>
                <input
                  type="text"
                  placeholder="City, state or remote"
                />
              </div>
            </div>

            <button className="search-button">
              Search Jobs
              <span>→</span>
            </button>
          </div>

          <div className="popular-searches">
            <strong>Popular:</strong>
            <span>Software Engineer</span>
            <span>Marketing</span>
            <span>Accounting</span>
            <span>Remote Jobs</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container stats">
          <div className="stat">
            <strong>10K+</strong>
            <span>Active Jobs</span>
          </div>

          <div className="stat">
            <strong>2.5K+</strong>
            <span>Companies</span>
          </div>

          <div className="stat">
            <strong>50K+</strong>
            <span>Job Seekers</span>
          </div>

          <div className="stat">
            <strong>95%</strong>
            <span>Success Rate</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE OPPORTUNITIES</span>
              <h2>Browse jobs by category</h2>
            </div>

            <a href="/jobs" className="view-all">
              View all categories →
            </a>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <a href="/jobs" className="category-card" key={category.name}>
                <div className="category-icon">{category.icon}</div>

                <div>
                  <h3>{category.name}</h3>
                  <p>{category.jobs}</p>
                </div>

                <span className="category-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="jobs-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">LATEST OPPORTUNITIES</span>
              <h2>Featured jobs</h2>
            </div>

            <a href="/jobs" className="view-all">
              View all jobs →
            </a>
          </div>

          <div className="jobs-grid">
            {featuredJobs.map((job) => (
              <article className="job-card" key={job.title}>
                <div className="job-top">
                  <div className="company-logo">
                    {job.company.charAt(0)}
                  </div>

                  <button className="save-button">♡</button>
                </div>

                <span className="job-category">{job.category}</span>

                <h3>{job.title}</h3>

                <p className="company-name">{job.company}</p>

                <div className="job-info">
                  <span>⌖ {job.location}</span>
                  <span>◷ {job.type}</span>
                </div>

                <div className="job-bottom">
                  <div>
                    <strong>{job.salary}</strong>
                    <small>/ month</small>
                  </div>

                  <a href="/jobs" className="apply-link">
                    Apply →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYER CTA */}
      <section className="employer-section">
        <div className="container employer-card">
          <div>
            <span className="section-label">FOR EMPLOYERS</span>

            <h2>
              Find the right talent
              <br />
              for your company.
            </h2>

            <p>
              Post your job openings and connect with qualified candidates
              who are ready to make an impact.
            </p>

            <a href="/employer/post-job" className="employer-button">
              Post a Job →
            </a>
          </div>

          <div className="employer-visual">
            <div className="visual-card card-one">
              <span>✓</span>
              <div>
                <strong>Candidate matched</strong>
                <small>Frontend Developer</small>
              </div>
            </div>

            <div className="visual-card card-two">
              <span>★</span>
              <div>
                <strong>98% Match</strong>
                <small>Excellent candidate</small>
              </div>
            </div>

            <div className="visual-circle">
              👤
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo">
              Hire<span>Hub</span>
            </a>

            <p>
              Connecting talented people with companies building the future.
            </p>

            <div className="socials">
              <a href="#">f</a>
              <a href="#">in</a>
              <a href="#">𝕏</a>
              <a href="#">◎</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>For Job Seekers</h4>
            <a href="/jobs">Find Jobs</a>
            <a href="/saved-jobs">Saved Jobs</a>
            <a href="/applications">My Applications</a>
            <a href="/career-advice">Career Advice</a>
          </div>

          <div className="footer-column">
            <h4>For Employers</h4>
            <a href="/employer/post-job">Post a Job</a>
            <a href="/employer/jobs">Manage Jobs</a>
            <a href="/employer/candidates">Find Candidates</a>
            <a href="/employer/dashboard">Employer Dashboard</a>
          </div>

          <div className="footer-column">
            <h4>HireHub</h4>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© 2026 HireHub. All rights reserved.</p>
          <p>Built for the future of work.</p>
        </div>
      </footer>
    </main>
  );
}