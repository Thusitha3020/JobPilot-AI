export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

export interface EducationDetails {
  university: string;
  degree: string;
  graduationYear: string;
}

export interface ProfessionalDetails {
  preferredJobTitles: string[];
  preferredLocations: string[];
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Any';
  workPreference: 'Remote' | 'Hybrid' | 'On-site' | 'Open to Any';
  minSalary: string;
}

export interface SkillMatrix {
  itSupport: boolean;
  networking: boolean;
  hardwareTroubleshooting: boolean;
  softwareTroubleshooting: boolean;
  systemAdministration: boolean;
  microsoftOffice: boolean;
  otherSkills: string[];
}

export interface SocialLinks {
  portfolio: string;
  linkedin: string;
  github: string;
}

export interface UserProfileData {
  personal: PersonalDetails;
  education: EducationDetails;
  professional: ProfessionalDetails;
  skills: SkillMatrix;
  links: SocialLinks;
  lastUpdated?: string;
}
