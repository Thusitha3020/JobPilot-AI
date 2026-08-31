import { CVDocument } from "@/types/cv";

export const DEFAULT_CVS: CVDocument[] = [
  {
    id: "cv-1",
    fileName: "Candidate_Master_Resume_2026.pdf",
    originalName: "Candidate_Master_Resume_2026.pdf",
    fileSize: "1.4 MB",
    rawSizeBytes: 1468000,
    uploadDate: "Aug 28, 2026",
    isDefault: true,
    status: "Default",
    extractedData: {
      name: "JobPilot Candidate",
      email: "candidate@jobpilot.lk",
      phone: "+94 77 123 4567",
      education: [
        {
          institution: "University of Moratuwa",
          degree: "B.Sc. (Hons) in Computer Science & Engineering",
          startYear: "2020",
          endYear: "2024",
        },
      ],
      skills: [
        "Full-Stack Development",
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "IT Support",
        "Networking",
        "Linux",
        "Docker",
      ],
      experience: [
        {
          jobTitle: "Software Engineer",
          company: "WSO2 Sri Lanka",
          location: "Colombo 07, Western Province",
          startDate: "2024",
          endDate: "Present",
          description: "Architect Next.js and Node.js microservices for enterprise cloud automation portals.",
          highlights: [
            "Optimized REST API endpoints reducing response latencies by 40%",
            "Developed cloud background worker queues for job search integrations",
          ],
        },
      ],
      projects: [
        {
          title: "JobPilot AI Sri Lanka",
          description: "Automated Sri Lankan web job scanner and resume pilot platform.",
          technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma"],
          link: "https://jobpilot.lk",
        },
      ],
      certifications: [
        { name: "AWS Certified Developer Associate", issuer: "Amazon Web Services", issueDate: "2025" },
        { name: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", issueDate: "2024" },
      ],
      languages: ["English (Professional)", "Sinhala (Native)"],
      portfolio: "https://jobpilot.lk",
      linkedin: "https://linkedin.com/in/jobpilot-candidate",
      github: "https://github.com/jobpilot-candidate",
    },
  },
  {
    id: "cv-2",
    fileName: "DevOps_Cloud_Specialist_LK.pdf",
    originalName: "DevOps_Cloud_Specialist_LK.pdf",
    fileSize: "1.1 MB",
    rawSizeBytes: 1153433,
    uploadDate: "Aug 15, 2026",
    isDefault: false,
    status: "Active",
    extractedData: {
      name: "JobPilot Candidate",
      email: "candidate@jobpilot.lk",
      phone: "+94 77 123 4567",
      education: [
        {
          institution: "University of Moratuwa",
          degree: "B.Sc. Computer Science",
        },
      ],
      skills: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD Pipelines", "PostgreSQL"],
      experience: [],
      projects: [],
      certifications: [],
      languages: ["English", "Sinhala"],
      portfolio: "https://jobpilot.lk",
      linkedin: "https://linkedin.com/in/jobpilot-candidate",
      github: "https://github.com/jobpilot-candidate",
    },
  },
];

const CV_STORAGE_KEY = "jobpilot_cv_documents_v1";

export function getStoredCVs(): CVDocument[] {
  if (typeof window === "undefined") return DEFAULT_CVS;

  try {
    const data = localStorage.getItem(CV_STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_CVS;
  } catch (error) {
    console.error("Failed to read CVs from localStorage:", error);
    return DEFAULT_CVS;
  }
}

export function saveStoredCVs(cvs: CVDocument[]): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvs));
    return true;
  } catch (error) {
    console.error("Failed to save CVs to localStorage:", error);
    return false;
  }
}
