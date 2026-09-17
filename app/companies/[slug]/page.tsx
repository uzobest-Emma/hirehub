import Link from "next/link";

const companies = [
  {
    slug: "technova-solutions",
    name: "TechNova Solutions",
    initials: "TN",
    industry: "Technology",
    location: "Lagos, Nigeria",
    size: "51-200 employees",
    jobs: [
      {
        id: 1,
        title: "Frontend Developer",
        type: "Full-time",
        location: "Lagos",
        salary: "₦500K - ₦800K",
      },
    ],
    description:
      "TechNova Solutions is a technology company focused on building modern digital products and innovative software solutions for businesses across Africa.",
  },
  {
    slug: "fintech-africa",
    name: "Fintech Africa",
    initials: "FA",
    industry: "Financial Technology",
    location: "Lagos, Nigeria",
    size: "51-200 employees",
    jobs: [
      {
        id: 5,
        title: "Backend Developer",
        type: "Full-time",
        location: "Lagos",
        salary: "₦700K - ₦1.2M",
      },
    ],
    description:
      "Fintech Africa develops accessible financial technology solutions that help individuals and businesses manage money and grow.",
  },
  {
    slug: "creative-labs",
    name: "Creative Labs",
    initials: "CL",
    industry: "Design & Creative",
    location: "Abuja, Nigeria",
    size: "11-50 employees",
    jobs: [
      {
        id: 2,
        title: "Product Designer",
        type: "Full-time",
        location: "Abuja",
        salary: "₦400K - ₦700K",
      },
    ],
    description:
      "Creative Labs is a digital creative company specializing in product design, branding, user experience, and digital innovation.",
  },
  {
    slug: "growth-africa",
    name: "Growth Africa",
    initials: "GA",
    industry: "Marketing",
    location: "Lagos, Nigeria",
    size: "51-200 employees",
    jobs: [
      {
        id: 3,
        title: "Marketing Manager",
        type: "Hybrid",
        location: "Lagos",
        salary: "₦450K - ₦750K",
      },
    ],
    description:
      "Growth Africa helps ambitious businesses grow through modern marketing, customer acquisition, and brand strategies.",
  },
  {
    slug: "africonnect",
    name: "AfriConnect",
    initials: "AC",
    industry: "Telecommunications",
    location: "Remote",
    size: "201-500 employees",
    jobs: [
      {
        id: 4,
        title: "Customer Support Specialist",
        type: "Remote",
        location: "Remote",
        salary: "₦250K - ₦400K",
      },
    ],
    description:
      "AfriConnect connects people and businesses through reliable digital communication and customer support solutions.",
  },
  {
    slug: "cloudworks",
    name: "CloudWorks",
    initials: "CW",
    industry: "Cloud & Software",
    location: "Remote",
    size: "51-200 employees",
    jobs: [
      {
        id: 7,
        title: "Software Engineer",
        type: "Remote",
        location: "Remote",
        salary: "₦800K - ₦1.5M",
      },
    ],
    description:
      "CloudWorks builds cloud-based software and infrastructure solutions for modern businesses.",
  },
  {
    slug: "prime-holdings",
    name: "Prime Holdings",
    initials: "PH",
    industry: "Finance",
    location: "Port Harcourt, Nigeria",
    size: "51-200 employees",
    jobs: [
      {
        id: 6,
        title: "Accountant",
        type: "Full-time",
        location: "Port Harcourt",
        salary: "₦350K - ₦550K",
      },
    ],
    description:
      "Prime Holdings is a financial services organization focused on responsible investment, business development, and sustainable growth.",
  },
  {
    slug: "peoplefirst-nigeria",
    name: "PeopleFirst Nigeria",
    initials: "PN",
    industry: "Human Resources",
    location: "Enugu, Nigeria",
    size: "11-50 employees",
    jobs: [
      {
        id: 8,
        title: "HR Officer",
        type: "Full-time",
        location: "Enugu",
        salary: "₦300K - ₦500K",
      },
    ],
    description:
      "PeopleFirst Nigeria helps organizations build stronger teams through recruitment, people management, and HR solutions.",
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;

  const company = companies.find((item) => item.slug === slug);

  if (!company) {
    return (
      <main className="company-not-found">
        <div>
          <span className="page-label">COMPANIES</span>

          <h1>Company not found</h1>

          <p>
            We couldn't find the company profile you're looking for.
          </p>

          <Link href="/companies">
            ← Back to Companies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="company-profile-page">

      {/* COMPANY HEADER */}
      <section className="company-profile-header">
        <div className="container">

          <Link
            href="/companies"
            className="company-back-link"
          >
            ← Back to Companies
          </Link>

          <div className="company-profile-main">

            <div className="company-profile-logo">
              {company.initials}
            </div>

            <div className="company-profile-title">
              <span>{company.industry}</span>

              <h1>{company.name}</h1>

              <p>📍 {company.location}</p>
            </div>

          </div>

        </div>
      </section>

      {/* COMPANY CONTENT */}
      <section className="company-profile-content">
        <div className="container">

          <div className="company-profile-layout">

            {/* MAIN */}
            <div className="company-profile-main-content">

              <section className="company-about-card">
                <span className="section-label">
                  ABOUT THE COMPANY
                </span>

                <h2>
                  About {company.name}
                </h2>

                <p>{company.description}</p>

                <p>
                  The company is committed to building strong teams,
                  creating meaningful products, and providing
                  opportunities for talented professionals to grow.
                </p>
              </section>

              {/* JOBS */}
              <section className="company-open-jobs">

                <div className="company-jobs-heading">
                  <div>
                    <span className="section-label">
                      OPEN POSITIONS
                    </span>

                    <h2>
                      Jobs at {company.name}
                    </h2>
                  </div>

                  <span className="company-job-count">
                    {company.jobs.length}{" "}
                    {company.jobs.length === 1
                      ? "open position"
                      : "open positions"}
                  </span>
                </div>

                <div className="company-job-list">

                  {company.jobs.map((job) => (
                    <article
                      className="company-job-card"
                      key={job.id}
                    >
                      <div className="company-job-card-main">

                        <div className="company-small-logo">
                          {company.initials}
                        </div>

                        <div>
                          <h3>{job.title}</h3>

                          <p>{company.name}</p>

                          <div className="company-job-meta">
                            <span>📍 {job.location}</span>
                            <span>💼 {job.type}</span>
                            <span>₦ {job.salary.replace("₦ ", "")}</span>
                          </div>
                        </div>

                      </div>

                      <Link
                        href={`/jobs/${job.id}`}
                        className="company-job-button"
                      >
                        View Job →
                      </Link>
                    </article>
                  ))}

                </div>
              </section>

            </div>

            {/* SIDEBAR */}
            <aside className="company-profile-sidebar">

              <div className="company-info-card">

                <span className="section-label">
                  COMPANY INFORMATION
                </span>

                <div className="company-info-item">
                  <span>Industry</span>
                  <strong>{company.industry}</strong>
                </div>

                <div className="company-info-item">
                  <span>Location</span>
                  <strong>{company.location}</strong>
                </div>

                <div className="company-info-item">
                  <span>Company Size</span>
                  <strong>{company.size}</strong>
                </div>

                <div className="company-info-item">
                  <span>Open Jobs</span>
                  <strong>{company.jobs.length}</strong>
                </div>

              </div>

              <div className="company-hiring-card">

                <span className="section-label">
                  LOOKING FOR WORK?
                </span>

                <h3>
                  Find your next opportunity.
                </h3>

                <p>
                  Explore more jobs from companies hiring
                  talented professionals.
                </p>

                <Link href="/jobs">
                  Browse Jobs →
                </Link>

              </div>

            </aside>

          </div>

        </div>
      </section>

    </main>
  );
}