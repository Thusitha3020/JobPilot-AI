import { UserProfileData } from "@/types/profile";
import { UserSession } from "@/lib/authSession";

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

const DEFAULT_STORAGE_KEY = "jobpilot_user_profile_v1";

function getUserProfileKey(email?: string): string {
  if (!email || email === "candidate@jobpilot.lk") return DEFAULT_STORAGE_KEY;
  const cleanEmail = email.toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `jobpilot_user_${cleanEmail}_profile_v1`;
}

/**
 * Gets stored profile for a specific Gmail address or global default.
 */
export function getStoredProfile(email?: string): UserProfileData {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  try {
    const key = getUserProfileKey(email);
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);

    // Fallback to default storage key if present
    const fallbackItem = localStorage.getItem(DEFAULT_STORAGE_KEY);
    return fallbackItem ? JSON.parse(fallbackItem) : DEFAULT_PROFILE;
  } catch (error) {
    console.error("Failed to read profile from localStorage:", error);
    return DEFAULT_PROFILE;
  }
}

/**
 * Saves stored profile for a specific Gmail address or global default.
 */
export function saveStoredProfile(profile: UserProfileData, email?: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const updatedProfile = {
      ...profile,
      lastUpdated: new Date().toISOString(),
    };
    const key = getUserProfileKey(email || profile.personal.email);
    localStorage.setItem(key, JSON.stringify(updatedProfile));
    return true;
  } catch (error) {
    console.error("Failed to save profile to localStorage:", error);
    return false;
  }
}

/**
 * Automatically extracts Gmail account details (Full Name, Email, Avatar) upon sign-up / login and fills candidate profile.
 */
export function syncProfileWithGmailSession(session: UserSession): UserProfileData {
  if (!session || !session.isLoggedIn || !session.email) return getStoredProfile();

  const existingProfile = getStoredProfile(session.email);
  const updatedProfile: UserProfileData = {
    ...existingProfile,
    personal: {
      ...existingProfile.personal,
      fullName: session.name || existingProfile.personal.fullName || "Candidate",
      email: session.email,
      phone: existingProfile.personal.phone || "+94 77 123 4567",
      location: existingProfile.personal.location || "Colombo, Sri Lanka",
    },
    lastUpdated: new Date().toISOString(),
  };

  saveStoredProfile(updatedProfile, session.email);
  return updatedProfile;
}
