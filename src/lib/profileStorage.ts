import { UserProfileData } from "@/types/profile";

export const DEFAULT_PROFILE: UserProfileData = {
  personal: {
    fullName: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
  },
  education: {
    university: "University of California, Berkeley",
    degree: "B.S. in Computer Science",
    graduationYear: "2023",
  },
  professional: {
    preferredJobTitles: ["IT Support Specialist", "System Administrator", "Full-Stack Engineer"],
    preferredLocations: ["San Francisco, CA", "Remote"],
    employmentType: "Full-time",
    workPreference: "Remote",
    minSalary: "$95,000 / yr",
  },
  skills: {
    itSupport: true,
    networking: true,
    hardwareTroubleshooting: true,
    softwareTroubleshooting: true,
    systemAdministration: true,
    microsoftOffice: true,
    otherSkills: ["TypeScript", "Active Directory", "Linux", "Docker", "Powershell"],
  },
  links: {
    portfolio: "https://alexmorgan.dev",
    linkedin: "https://linkedin.in/in/alexmorgan-pilot",
    github: "https://github.com/alexmorgan-dev",
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
