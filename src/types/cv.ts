export interface EducationEntry {
  institution: string;
  degree: string;
  startYear?: string;
  endYear?: string;
}

export interface ExperienceEntry {
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface ProjectEntry {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  issueDate?: string;
}

export interface CVExtractionData {
  name: string;
  email: string;
  phone: string;
  education: EducationEntry[];
  skills: string[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: string[];
  portfolio: string;
  linkedin: string;
  github: string;
}

export type CVStatus = 'Active' | 'Default' | 'Parsed' | 'Draft';

export interface CVDocument {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: string; // Formatted size, e.g. "1.8 MB"
  rawSizeBytes: number;
  uploadDate: string;
  isDefault: boolean;
  status: CVStatus;
  pdfDataUrl?: string;
  extractedData?: Partial<CVExtractionData>;
}
