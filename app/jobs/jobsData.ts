export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  salaryNumber: number;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Lagos, Nigeria",
    type: "Full-time",
    category: "Technology",
    salary: "₦500K - ₦800K",
    salaryNumber: 500000,
    experience: "2+ years",
    description:
      "We are looking for a talented Frontend Developer to join our growing engineering team and build modern web applications.",
    responsibilities: [
      "Build responsive and accessible web applications",
      "Work closely with designers and backend developers",
      "Write clean, reusable and maintainable code",
      "Improve website performance and user experience",
    ],
    requirements: [
      "2+ years of frontend development experience",
      "Strong knowledge of React and JavaScript",
      "Experience with HTML and CSS",
      "Good understanding of responsive design",
    ],
  },

  {
    id: 2,
    title: "Product Designer",
    company: "Creative Labs",
    location: "Abuja, Nigeria",
    type: "Full-time",
    category: "Design",
    salary: "₦400K - ₦700K",
    salaryNumber: 400000,
    experience: "2+ years",
    description:
      "Creative Labs is searching for a Product Designer who can transform complex problems into simple and beautiful digital experiences.",
    responsibilities: [
      "Create wireframes and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with product and engineering teams",
      "Maintain and improve our design system",
    ],
    requirements: [
      "2+ years of product design experience",
      "Strong Figma skills",
      "Understanding of UX principles",
      "Excellent communication skills",
    ],
  },

  {
    id: 3,
    title: "Marketing Manager",
    company: "Growth Africa",
    location: "Lagos, Nigeria",
    type: "Hybrid",
    category: "Marketing",
    salary: "₦450K - ₦750K",
    salaryNumber: 450000,
    experience: "3+ years",
    description:
      "Lead marketing campaigns that help Growth Africa reach new customers and expand across the Nigerian market.",
    responsibilities: [
      "Develop marketing strategies",
      "Manage digital marketing campaigns",
      "Analyze campaign performance",
      "Work with creative teams on marketing content",
    ],
    requirements: [
      "3+ years marketing experience",
      "Strong analytical skills",
      "Knowledge of digital marketing",
      "Excellent communication skills",
    ],
  },

  {
    id: 4,
    title: "Customer Support Specialist",
    company: "AfriConnect",
    location: "Remote",
    type: "Remote",
    category: "Customer Service",
    salary: "₦250K - ₦400K",
    salaryNumber: 250000,
    experience: "1+ years",
    description:
      "Join AfriConnect and help customers get the best possible experience using our digital platform.",
    responsibilities: [
      "Respond to customer questions",
      "Resolve customer issues",
      "Document customer feedback",
      "Work with internal teams to solve problems",
    ],
    requirements: [
      "1+ year customer support experience",
      "Excellent written communication",
      "Strong problem-solving skills",
      "Ability to work independently",
    ],
  },

  {
    id: 5,
    title: "Backend Developer",
    company: "Fintech Africa",
    location: "Lagos, Nigeria",
    type: "Full-time",
    category: "Technology",
    salary: "₦700K - ₦1.2M",
    salaryNumber: 700000,
    experience: "3+ years",
    description:
      "Build secure and scalable backend systems powering financial products used by customers across Africa.",
    responsibilities: [
      "Develop backend APIs",
      "Design and maintain databases",
      "Improve system reliability",
      "Collaborate with frontend engineers",
    ],
    requirements: [
      "3+ years backend development experience",
      "Strong Node.js or Python knowledge",
      "Database experience",
      "Understanding of REST APIs",
    ],
  },

  {
    id: 6,
    title: "Accountant",
    company: "Prime Holdings",
    location: "Port Harcourt, Nigeria",
    type: "Full-time",
    category: "Finance",
    salary: "₦350K - ₦550K",
    salaryNumber: 350000,
    experience: "2+ years",
    description:
      "Prime Holdings is looking for an organized Accountant to manage financial records and support business operations.",
    responsibilities: [
      "Prepare financial reports",
      "Maintain accurate financial records",
      "Monitor expenses",
      "Assist with budgeting",
    ],
    requirements: [
      "Degree in Accounting or related field",
      "2+ years accounting experience",
      "Strong Excel skills",
      "Attention to detail",
    ],
  },

  {
    id: 7,
    title: "Software Engineer",
    company: "CloudWorks",
    location: "Remote",
    type: "Remote",
    category: "Technology",
    salary: "₦800K - ₦1.5M",
    salaryNumber: 800000,
    experience: "3+ years",
    description:
      "Work with a distributed engineering team building cloud-based products for businesses around the world.",
    responsibilities: [
      "Develop scalable software",
      "Review code",
      "Write automated tests",
      "Participate in technical planning",
    ],
    requirements: [
      "3+ years software engineering experience",
      "Strong programming skills",
      "Experience with cloud technologies",
      "Good problem-solving ability",
    ],
  },

  {
    id: 8,
    title: "HR Officer",
    company: "PeopleFirst Nigeria",
    location: "Enugu, Nigeria",
    type: "Full-time",
    category: "Human Resources",
    salary: "₦300K - ₦500K",
    salaryNumber: 300000,
    experience: "2+ years",
    description:
      "Help build a strong workplace culture while supporting recruitment, employee relations and HR operations.",
    responsibilities: [
      "Support recruitment activities",
      "Maintain employee records",
      "Assist with onboarding",
      "Support employee engagement programs",
    ],
    requirements: [
      "Degree in HR or related discipline",
      "2+ years HR experience",
      "Strong communication skills",
      "Good organizational skills",
    ],
  },
];