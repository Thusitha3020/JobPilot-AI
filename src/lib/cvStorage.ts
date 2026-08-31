import { CVDocument } from "@/types/cv";

export const DEFAULT_CVS: CVDocument[] = [
  {
    id: "cv-1",
    fileName: "Alex_Morgan_Master_Resume_2026.pdf",
    originalName: "Alex_Morgan_Master_Resume_2026.pdf",
    fileSize: "1.8 MB",
    rawSizeBytes: 1887436,
    uploadDate: "Aug 28, 2026",
    isDefault: true,
    status: "Default",
    extractedData: {
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 234-5678",
      education: [
        {
          institution: "University of California, Berkeley",
          degree: "B.S. in Computer Science",
          startYear: "2019",
          endYear: "2023",
        },
      ],
      skills: [
        "IT Support",
        "System Administration",
        "Networking",
        "Software Troubleshooting",
        "TypeScript",
        "React",
        "Docker",
        "Powershell",
      ],
      experience: [
        {
          jobTitle: "Senior Systems & IT Engineer",
          company: "Enterprise Cloud Systems",
          location: "San Francisco, CA",
          startDate: "2023",
          endDate: "Present",
          description: "Maintained IT infrastructure, automated deployment workflows, and resolved high-priority software and hardware issues.",
          highlights: [
            "Managed active directory for 500+ employees",
            "Deployed background monitoring scripts reducing downtime by 35%",
          ],
        },
      ],
      projects: [
        {
          title: "JobPilot Automation Engine",
          description: "Built automated client pilot workflows and system monitor alerts.",
          technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
          link: "https://github.com/alexmorgan-dev/jobpilot",
        },
      ],
      certifications: [
        { name: "CompTIA Network+", issuer: "CompTIA", issueDate: "2024" },
        { name: "AWS Certified SysOps Administrator", issuer: "Amazon Web Services", issueDate: "2025" },
      ],
      languages: ["English (Native)", "Spanish (Professional)"],
      portfolio: "https://alexmorgan.dev",
      linkedin: "https://linkedin.in/in/alexmorgan-pilot",
      github: "https://github.com/alexmorgan-dev",
    },
  },
  {
    id: "cv-2",
    fileName: "Alex_Morgan_DevOps_Specialist.pdf",
    originalName: "Alex_Morgan_DevOps_Specialist.pdf",
    fileSize: "1.2 MB",
    rawSizeBytes: 1258291,
    uploadDate: "Aug 15, 2026",
    isDefault: false,
    status: "Active",
    extractedData: {
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 234-5678",
      education: [
        {
          institution: "UC Berkeley",
          degree: "B.S. Computer Science",
        },
      ],
      skills: ["Kubernetes", "Docker", "Terraform", "CI/CD", "Linux Admin"],
      experience: [],
      projects: [],
      certifications: [],
      languages: ["English"],
      portfolio: "https://alexmorgan.dev",
      linkedin: "https://linkedin.in/in/alexmorgan-pilot",
      github: "https://github.com/alexmorgan-dev",
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
