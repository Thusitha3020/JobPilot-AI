import { UserProfileData } from "@/types/profile";

export const DEFAULT_PROFILE: UserProfileData = {
  personal: {
    fullName: "JobPilot Candidate",
    email: "candidate@jobpilot.lk",
    phone: "+94 77 123 4567",
    location: "Colombo, Sri Lanka",
  },
  education: {
    university: "University of Moratuwa",
    degree: "B.Sc. (Hons) in Computer Science & Engineering",
    graduationYear: "2024",
  },
  professional: {
    preferredJobTitles: ["Full-Stack Engineer", "Software Engineer", "IT Support Specialist"],
    preferredLocations: ["Colombo, Western Province", "Kandy, Central Province", "Remote - Sri Lanka"],
    employmentType: "Full-time",
    workPreference: "Hybrid",
    minSalary: "LKR 250,000 / mo",
  },
  skills: {
    itSupport: true,
    networking: true,
    hardwareTroubleshooting: true,
    softwareTroubleshooting: true,
    systemAdministration: true,
    microsoftOffice: true,
    otherSkills: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Linux", "Docker"],
  },
  links: {
    portfolio: "https://jobpilot.lk",
    linkedin: "https://linkedin.com/in/jobpilot-candidate",
    github: "https://github.com/jobpilot-candidate",
  },
  lastUpdated: new Date().toISOString(),
};

const STORAGE_KEY = "jobpilot_user_profile_v1";

export function getStoredProfile(): UserProfileData {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : DEFAULT_PROFILE;
  } catch (error) {
    console.error("Failed to read profile from localStorage:", error);
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: UserProfileData): boolean {
  if (typeof window === "undefined") return false;

  try {
    const updatedProfile = {
      ...profile,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    return true;
  } catch (error) {
    console.error("Failed to save profile to localStorage:", error);
    return false;
  }
}
