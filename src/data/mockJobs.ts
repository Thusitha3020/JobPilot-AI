import { Job, MetricCardData } from "@/types/dashboard";

export function calculateMetricsFromJobs(jobs: Job[]): MetricCardData[] {
  const totalCount = jobs.length;
  const strongMatchesCount = jobs.filter((j) => j.matchPercentage >= 90).length;
  const appliedCount = jobs.filter((j) => j.applicationStatus === "applied").length;
  const interviewingCount = jobs.filter((j) => j.applicationStatus === "interviewing").length;
  const offersCount = jobs.filter((j) => j.applicationStatus === "offered").length;

  return [
    {
      id: "new-jobs",
      title: "Sri Lanka & Global Roles",
      value: totalCount,
      change: `${totalCount} active`,
      changeType: "positive",
      description: "Active roles in job queue",
      iconName: "Briefcase",
    },
    {
      id: "strong-matches",
      title: "Strong Matches",
      value: strongMatchesCount,
      change: "90%+ match score",
      changeType: "positive",
      description: "High probability applications in LK",
      iconName: "Sparkles",
    },
    {
      id: "applications",
      title: "Applications",
      value: appliedCount,
      change: appliedCount > 0 ? `${appliedCount} submitted` : "0 submitted",
      changeType: appliedCount > 0 ? "positive" : "neutral",
      description: "Active submitted job pipelines",
      iconName: "Send",
    },
    {
      id: "interviews",
      title: "Interviews",
      value: interviewingCount,
      change: interviewingCount > 0 ? `${interviewingCount} active` : "0 scheduled",
      changeType: interviewingCount > 0 ? "positive" : "neutral",
      description: "Scheduled interview rounds",
      iconName: "Calendar",
    },
    {
      id: "offers",
      title: "Offers",
      value: offersCount,
      change: offersCount > 0 ? `${offersCount} received` : "0 received",
      changeType: offersCount > 0 ? "positive" : "neutral",
      description: "Formal job offers received",
      iconName: "Award",
    },
  ];
}

export const INITIAL_METRICS: MetricCardData[] = calculateMetricsFromJobs([]);

export const MOCK_JOBS: Job[] = [
  {
    id: "lk-job-1",
    title: "Senior Full-Stack Engineer (Next.js & AI)",
    company: "WSO2 Sri Lanka",
    companyLogo: "☁️",
    location: "Colombo 07, Western Province (Hybrid)",
    jobType: "Hybrid",
    matchPercentage: 97,
    matchingSkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs"],
    missingSkills: ["GraphQL", "Kafka"],
    postedDate: "1 hour ago (LinkedIn LK)",
    salary: "LKR 480,000 - 750,000 / mo",
    experienceLevel: "Senior",
    description: "Architect next-generation enterprise API automation platforms using Next.js App Router, TypeScript, and Server Actions for global enterprise clients.",
    requirements: [
      "4+ years building modern web applications with React and TypeScript.",
      "Deep understanding of Next.js App Router, Server Components, and SSR performance.",
      "Experience integrating AI LLM APIs and RESTful microservices."
    ]
  },
  {
    id: "lk-job-2",
    title: "AI Systems & Automation Engineer",
    company: "99x Technology",
    companyLogo: "🚀",
    location: "Colombo 03, Western Province (Remote)",
    jobType: "Remote",
    matchPercentage: 95,
    matchingSkills: ["TypeScript", "Python", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
    missingSkills: ["Kubernetes", "Redis"],
    postedDate: "3 hours ago (Ikman.lk)",
    salary: "LKR 420,000 - 680,000 / mo",
    experienceLevel: "Senior",
    description: "Join our core innovation team building autonomous background worker agents for European SaaS product partners.",
    requirements: [
      "Strong background in TypeScript and Python backend architecture.",
      "Proven track record of building resilient event-driven background queues.",
      "Comfortable with containerization (Docker) and CI/CD pipelines."
    ]
  },
  {
    id: "lk-job-3",
    title: "Lead Frontend Architect",
    company: "Sysco LABS Sri Lanka",
    companyLogo: "🧠",
    location: "Colombo 05, Western Province (Hybrid)",
    jobType: "Hybrid",
    matchPercentage: 93,
    matchingSkills: ["React", "TypeScript", "Tailwind CSS", "Redux/Zustand", "Webpack/Vite"],
    missingSkills: ["AWS Lambda", "Cypress"],
    postedDate: "5 hours ago (TopJobs.lk)",
    salary: "LKR 550,000 - 850,000 / mo",
    experienceLevel: "Lead",
    description: "Direct design systems and micro-frontend architecture for high-traffic food logistics analytics engines.",
    requirements: [
      "6+ years scaling frontend web applications with React and TypeScript.",
      "Expertise in web performance metrics, bundle optimization, and accessible UI components.",
      "Leadership experience guiding agile engineering teams."
    ]
  },
  {
    id: "lk-job-4",
    title: "IT Support Specialist & Network Admin",
    company: "IFS Sri Lanka",
    companyLogo: "🏢",
    location: "Kandy, Central Province (On-site)",
    jobType: "Full-time",
    matchPercentage: 94,
    matchingSkills: ["IT Support", "Networking", "Hardware Troubleshooting", "Software Troubleshooting", "System Administration"],
    missingSkills: ["Powershell Scripting"],
    postedDate: "1 day ago (XpressJobs)",
    salary: "LKR 180,000 - 280,000 / mo",
    experienceLevel: "Mid-level",
    description: "Provide tier 2/3 IT support, configure networking hardware, manage Active Directory domain environments, and maintain office infrastructure.",
    requirements: [
      "2+ years experience in corporate IT support and network administration.",
      "Proficient with Windows Server, Active Directory, DNS/DHCP, and Office 365.",
      "Strong hardware and software troubleshooting skills."
    ]
  },
  {
    id: "lk-job-5",
    title: "DevOps & Cloud Infrastructure Lead",
    company: "Axiata Digital Labs",
    companyLogo: "🌐",
    location: "Galle, Southern Province (Hybrid)",
    jobType: "Hybrid",
    matchPercentage: 92,
    matchingSkills: ["AWS", "Docker", "Linux", "TypeScript", "CI/CD", "PostgreSQL"],
    missingSkills: ["Terraform", "Kubernetes"],
    postedDate: "1 day ago (LinkedIn LK)",
    salary: "LKR 500,000 - 800,000 / mo",
    experienceLevel: "Lead",
    description: "Manage multi-region AWS cloud infrastructure, Docker container deployments, and GitHub Actions CI/CD pipelines for telecom products.",
    requirements: [
      "4+ years hands-on Cloud DevOps experience with AWS or GCP.",
      "Expert knowledge of Terraform, Kubernetes, Docker, and Linux administration."
    ]
  },
  {
    id: "lk-job-6",
    title: "Product Designer & UI Engineer",
    company: "Surge Global Lanka",
    companyLogo: "⚡",
    location: "Remote - Sri Lanka",
    jobType: "Remote",
    matchPercentage: 88,
    matchingSkills: ["Tailwind CSS", "React", "Figma", "UI/UX Design", "CSS Animations"],
    missingSkills: ["Storybook", "Framer Motion"],
    postedDate: "2 days ago (Direct Portal)",
    salary: "$1,600 - $2,800 / mo (USD equiv)",
    experienceLevel: "Senior",
    description: "Bridge the gap between design and engineering. Create high-fidelity dark-mode SaaS interfaces, interactive prototypes, and design tokens.",
    requirements: [
      "Proficiency in Figma as well as production-ready CSS/React code.",
      "Passionate about micro-interactions, responsive layouts, and user accessibility."
    ]
  }
];
