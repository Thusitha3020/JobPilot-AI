import { Job, MetricCardData } from "@/types/dashboard";

export const INITIAL_METRICS: MetricCardData[] = [
  {
    id: "new-jobs",
    title: "New Jobs",
    value: 142,
    change: "+24 today",
    changeType: "positive",
    description: "New roles matched to your pilot profile",
    iconName: "Briefcase",
  },
  {
    id: "strong-matches",
    title: "Strong Matches",
    value: 28,
    change: "90%+ match score",
    changeType: "positive",
    description: "High probability applications",
    iconName: "Sparkles",
  },
  {
    id: "applications",
    title: "Applications",
    value: 19,
    change: "+4 this week",
    changeType: "positive",
    description: "Active submitted job pipelines",
    iconName: "Send",
  },
  {
    id: "interviews",
    title: "Interviews",
    value: 4,
    change: "2 upcoming",
    changeType: "neutral",
    description: "Scheduled interview rounds",
    iconName: "Calendar",
  },
  {
    id: "offers",
    title: "Offers",
    value: 2,
    change: "1 pending review",
    changeType: "positive",
    description: "Formal job offers received",
    iconName: "Award",
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Full-Stack Engineer (Next.js & AI)",
    company: "Vercel Partner Labs",
    companyLogo: "⚡",
    location: "San Francisco, CA (Remote)",
    jobType: "Remote",
    matchPercentage: 96,
    matchingSkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs"],
    missingSkills: ["GraphQL", "Kafka"],
    postedDate: "2 hours ago",
    salary: "$165,000 - $195,000 / yr",
    experienceLevel: "Senior",
    description: "We are seeking a Lead Full-Stack Engineer to architect next-generation AI automation interfaces using Next.js App Router, Tailwind CSS, and Server Actions.",
    requirements: [
      "5+ years building modern web applications with React and TypeScript.",
      "Deep understanding of Next.js App Router, Server Components, and SSR performance.",
      "Experience integrating AI LLM streaming APIs (OpenAI / Anthropic SDKs)."
    ]
  },
  {
    id: "job-2",
    title: "AI Systems & Automation Engineer",
    company: "Cognitive Automation Inc",
    companyLogo: "🤖",
    location: "New York, NY (Hybrid)",
    jobType: "Hybrid",
    matchPercentage: 92,
    matchingSkills: ["TypeScript", "Python", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
    missingSkills: ["Kubernetes", "Redis"],
    postedDate: "5 hours ago",
    salary: "$150,000 - $180,000 / yr",
    experienceLevel: "Mid-level",
    description: "Join our core team building autonomous background worker agents for enterprise workflow optimization. Direct hands-on work with queue architecture and web apps.",
    requirements: [
      "Strong background in TypeScript and Python backend architecture.",
      "Proven track record of building resilient event-driven background queues.",
      "Comfortable with containerization (Docker) and CI/CD pipelines."
    ]
  },
  {
    id: "job-3",
    title: "Lead Frontend Architect",
    company: "HyperScale Tech",
    companyLogo: "🚀",
    location: "Austin, TX (Remote)",
    jobType: "Remote",
    matchPercentage: 88,
    matchingSkills: ["React", "TypeScript", "Tailwind CSS", "Redux/Zustand", "Webpack/Vite"],
    missingSkills: ["AWS Lambda", "Cypress"],
    postedDate: "1 day ago",
    salary: "$180,000 - $210,000 / yr",
    experienceLevel: "Lead",
    description: "Direct the design system and micro-frontend architecture for a high-traffic analytics dashboard serving millions of active users daily.",
    requirements: [
      "7+ years scaling frontend web applications with modern JS frameworks.",
      "Expertise in web performance metrics, bundle optimization, and accessible component libraries.",
      "Leadership experience guiding cross-functional agile engineering teams."
    ]
  },
  {
    id: "job-4",
    title: "Product Designer & UI Developer",
    company: "DesignPilot Studio",
    companyLogo: "🎨",
    location: "Seattle, WA (Remote)",
    jobType: "Remote",
    matchPercentage: 85,
    matchingSkills: ["Tailwind CSS", "React", "Figma", "UI/UX Design", "CSS Animations"],
    missingSkills: ["Storybook", "Framer Motion"],
    postedDate: "2 days ago",
    salary: "$140,000 - $165,000 / yr",
    experienceLevel: "Senior",
    description: "Bridge the gap between design and engineering. Create high-fidelity dark-mode SaaS interfaces, interactive prototypes, and design system tokens.",
    requirements: [
      "Proficiency in Figma as well as production-ready CSS/React code.",
      "Passionate about micro-interactions, responsive layouts, and user accessibility."
    ]
  },
  {
    id: "job-5",
    title: "Backend Engineer - AI Integrations",
    company: "NeuralFlow Systems",
    companyLogo: "🧠",
    location: "Boston, MA (On-site)",
    jobType: "Full-time",
    matchPercentage: 94,
    matchingSkills: ["TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Docker"],
    missingSkills: ["Go", "gRPC"],
    postedDate: "3 days ago",
    salary: "$155,000 - $185,000 / yr",
    experienceLevel: "Senior",
    description: "Architect high-throughput REST and WebSocket APIs to power AI job assistant agents and resume parsing engines.",
    requirements: [
      "Deep experience with Node.js/TypeScript REST API design and security.",
      "Familiarity with vector databases (Pinecone, pgvector) and indexing strategies."
    ]
  },
  {
    id: "job-6",
    title: "Senior React Native & Web Developer",
    company: "MobilePilot Global",
    companyLogo: "📱",
    location: "Chicago, IL (Hybrid)",
    jobType: "Hybrid",
    matchPercentage: 81,
    matchingSkills: ["React", "TypeScript", "REST APIs", "Tailwind CSS"],
    missingSkills: ["React Native", "Swift", "Android Studio"],
    postedDate: "4 days ago",
    salary: "$145,000 - $170,000 / yr",
    experienceLevel: "Mid-level",
    description: "Expand our flagship job application dashboard across web and mobile web platforms with unified shared component logic.",
    requirements: [
      "Strong React foundation with knowledge of cross-platform state management.",
      "Ability to optimize mobile web performance and smooth touch gestures."
    ]
  }
];
