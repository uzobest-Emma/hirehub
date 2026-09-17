import Link from "next/link";

type Article = {
  id: number;
  title: string;
  category: string;
  readTime: string;
  date: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
    points?: string[];
  }[];
};

const articles: Article[] = [
  {
    id: 1,
    title: "How to Write a CV That Gets Noticed",
    category: "CV & RESUME",
    readTime: "6 min read",
    date: "September 5, 2026",
    intro:
      "Your CV is often the first impression an employer has of you. Learn how to create a professional CV that highlights your skills, experience, and achievements.",
    sections: [
      {
        heading: "Start With a Strong Professional Summary",
        content:
          "Your professional summary should quickly explain who you are, what you do, and the value you can bring to an employer.",
        points: [
          "Keep it short and focused.",
          "Mention your most relevant skills.",
          "Highlight your strongest experience.",
          "Tailor it to the job you are applying for.",
        ],
      },
      {
        heading: "Highlight Your Achievements",
        content:
          "Employers want to know what you achieved, not only what your responsibilities were. Whenever possible, use measurable results.",
        points: [
          "Use numbers where possible.",
          "Mention projects you successfully completed.",
          "Explain how your work helped the company.",
          "Focus on results rather than generic duties.",
        ],
      },
      {
        heading: "Keep Your CV Professional",
        content:
          "Use a clean layout, readable fonts, consistent spacing, and clear headings. Avoid unnecessary graphics or overly complicated designs.",
      },
    ],
  },

  {
    id: 2,
    title: "How to Prepare for a Job Interview",
    category: "INTERVIEWS",
    readTime: "7 min read",
    date: "September 4, 2026",
    intro:
      "A successful interview requires preparation. Learn practical techniques for answering questions confidently and making a strong impression.",
    sections: [
      {
        heading: "Research the Company",
        content:
          "Before the interview, learn about the company's products, services, culture, and recent activities.",
      },
      {
        heading: "Practice Common Questions",
        content:
          "Prepare answers for common interview questions while keeping your responses natural and conversational.",
        points: [
          "Tell me about yourself.",
          "Why do you want this job?",
          "What are your strengths?",
          "What is one area you are working to improve?",
          "Why should we hire you?",
        ],
      },
      {
        heading: "Ask Good Questions",
        content:
          "At the end of an interview, ask thoughtful questions about the role, team, expectations, and company culture.",
      },
    ],
  },

  {
    id: 3,
    title: "How to Find Your First Job",
    category: "JOB SEARCH",
    readTime: "5 min read",
    date: "September 3, 2026",
    intro:
      "Getting your first job can feel challenging. Here's a practical approach to finding opportunities and building experience.",
    sections: [
      {
        heading: "Create a Strong CV",
        content:
          "Even without professional experience, you can highlight education, projects, volunteering, internships, certifications, and relevant skills.",
      },
      {
        heading: "Use Multiple Job Channels",
        content:
          "Don't depend on one source. Search through job portals, company career pages, professional networks, and personal connections.",
      },
      {
        heading: "Keep Improving Your Skills",
        content:
          "Develop skills that are relevant to the jobs you want. Online courses, personal projects, and certifications can help strengthen your profile.",
      },
    ],
  },

  {
    id: 4,
    title: "How to Build a Strong LinkedIn Profile",
    category: "CAREER GROWTH",
    readTime: "5 min read",
    date: "September 2, 2026",
    intro:
      "A strong LinkedIn profile can help recruiters discover you and make it easier for employers to understand your professional background.",
    sections: [
      {
        heading: "Use a Professional Headline",
        content:
          "Your headline should clearly communicate what you do and the type of opportunities you are interested in.",
      },
      {
        heading: "Complete Your Experience",
        content:
          "Add relevant work experience, internships, projects, education, certifications, and skills.",
      },
      {
        heading: "Stay Active",
        content:
          "Share useful industry content, connect with professionals, and participate in relevant conversations.",
      },
    ],
  },

  {
    id: 5,
    title: "How to Negotiate Your Salary",
    category: "CAREER GROWTH",
    readTime: "6 min read",
    date: "September 1, 2026",
    intro:
      "Salary negotiation can feel uncomfortable, but preparation can help you approach the conversation professionally and confidently.",
    sections: [
      {
        heading: "Research the Market",
        content:
          "Understand typical compensation for your role, experience level, location, and industry before entering a salary discussion.",
      },
      {
        heading: "Know Your Value",
        content:
          "Be prepared to explain the skills, experience, achievements, and results that justify your expectations.",
      },
      {
        heading: "Consider the Full Package",
        content:
          "Salary is only one part of compensation. Consider bonuses, flexibility, insurance, training, leave, and other benefits.",
      },
    ],
  },

  {
    id: 6,
    title: "Remote Work: How to Stay Productive",
    category: "WORKPLACE",
    readTime: "5 min read",
    date: "August 31, 2026",
    intro:
      "Remote work provides flexibility, but staying productive requires good routines, communication, and time management.",
    sections: [
      {
        heading: "Create a Dedicated Workspace",
        content:
          "A consistent workspace can help separate work from personal activities and improve concentration.",
      },
      {
        heading: "Plan Your Day",
        content:
          "Start each day with clear priorities and realistic goals.",
        points: [
          "Identify your most important tasks.",
          "Set specific working periods.",
          "Take regular breaks.",
          "Review your progress at the end of the day.",
        ],
      },
      {
        heading: "Communicate Clearly",
        content:
          "Keep your team updated, respond professionally, and communicate early when you encounter challenges.",
      },
    ],
  },

  {
    id: 7,
    title: "Skills Employers Are Looking For",
    category: "SKILLS",
    readTime: "6 min read",
    date: "August 30, 2026",
    intro:
      "Employers increasingly look for a combination of technical ability, communication, adaptability, and problem-solving skills.",
    sections: [
      {
        heading: "Technical Skills",
        content:
          "Technical skills vary by profession. Identify the tools, software, platforms, and knowledge commonly required in your target career.",
      },
      {
        heading: "Communication",
        content:
          "Strong written and verbal communication helps professionals collaborate effectively and explain ideas clearly.",
      },
      {
        heading: "Problem Solving",
        content:
          "Employers value people who can understand problems, evaluate options, and develop practical solutions.",
      },
    ],
  },

  {
    id: 8,
    title: "How to Grow Your Career",
    category: "CAREER GROWTH",
    readTime: "7 min read",
    date: "August 29, 2026",
    intro:
      "Career growth requires intentional learning, strong relationships, good performance, and a clear understanding of where you want to go.",
    sections: [
      {
        heading: "Set Career Goals",
        content:
          "Define where you want your career to be in the next one, three, or five years and identify the steps required to get there.",
      },
      {
        heading: "Keep Learning",
        content:
          "Continue developing your technical and professional skills through courses, books, mentorship, projects, and practical experience.",
      },
      {
        heading: "Build Professional Relationships",
        content:
          "Networking can introduce you to mentors, colleagues, employers, and opportunities that may not be publicly advertised.",
      },
    ],
  },
];

type CareerArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CareerArticlePage({
  params,
}: CareerArticlePageProps) {
  const { id } = await params;

  const article = articles.find(
    (item) => item.id === Number(id)
  );

  // =========================================
  // ARTICLE NOT FOUND
  // =========================================

  if (!article) {
    return (
      <main className="article-not-found">
        <div className="article-not-found-content">

          <div className="not-found-icon">
            !
          </div>

          <span className="section-label">
            ARTICLE NOT FOUND
          </span>

          <h1>
            We couldn't find that article.
          </h1>

          <p>
            The career advice article you're looking for
            may have been removed or doesn't exist.
          </p>

          <Link
            href="/career-advice"
            className="not-found-button"
          >
            ← Back to Career Advice
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="career-article-page">

      {/* =========================================
          ARTICLE HEADER
      ========================================= */}

      <section className="career-article-header">

        <div className="container">

          <Link
            href="/career-advice"
            className="article-back-link"
          >
            ← Back to Career Advice
          </Link>

          <div className="article-header-content">

            <span className="article-header-category">
              {article.category}
            </span>

            <h1>
              {article.title}
            </h1>

            <p className="article-intro">
              {article.intro}
            </p>

            <div className="article-meta">
              <span>
                📅 {article.date}
              </span>

              <span>
                ⏱ {article.readTime}
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          ARTICLE CONTENT
      ========================================= */}

      <section className="career-article-content-section">

        <div className="container career-article-layout">

          {/* MAIN ARTICLE */}

          <article className="career-article-content">

            {article.sections.map(
              (section, index) => (
                <section
                  key={section.heading}
                  className="article-content-section"
                >

                  <div className="article-section-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h2>
                      {section.heading}
                    </h2>

                    <p>
                      {section.content}
                    </p>

                    {section.points && (
                      <ul>
                        {section.points.map(
                          (point) => (
                            <li key={point}>
                              {point}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>

                </section>
              )
            )}

            {/* ENDING */}

            <div className="article-ending">

              <h2>
                Final Thoughts
              </h2>

              <p>
                Building a successful career takes time,
                consistency, learning, and the willingness
                to keep improving. Apply these ideas to
                your own career journey and keep taking
                meaningful steps forward.
              </p>

            </div>

          </article>


          {/* =====================================
              SIDEBAR
          ===================================== */}

          <aside className="article-sidebar">

            <div className="article-sidebar-card">

              <span className="section-label">
                CAREER ADVICE
              </span>

              <h3>
                Ready for your next opportunity?
              </h3>

              <p>
                Explore opportunities from companies
                hiring talented professionals.
              </p>

              <Link
                href="/jobs"
                className="article-sidebar-button"
              >
                Find Jobs →
              </Link>

            </div>


            <div className="article-sidebar-card">

              <h3>
                Explore More
              </h3>

              <Link
                href="/career-advice"
                className="article-sidebar-link"
              >
                All Career Advice
              </Link>

              <Link
                href="/companies"
                className="article-sidebar-link"
              >
                Explore Companies
              </Link>

              <Link
                href="/register"
                className="article-sidebar-link"
              >
                Create Your Account
              </Link>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}