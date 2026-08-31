export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';

export type ApplicationStatus = 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  jobType: JobType;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  postedDate: string;
  salary: string;
  description: string;
  requirements: string[];
  experienceLevel: 'Entry-level' | 'Mid-level' | 'Senior' | 'Lead' | 'Executive';
  applicationStatus?: ApplicationStatus;
  isSaved?: boolean;
}

export interface MetricCardData {
  id: string;
  title: string;
  value: number | string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  description: string;
  iconName: string;
}

export type NavItemId =
  | 'dashboard'
  | 'jobs'
  | 'applications'
  | 'cv-manager'
  | 'profile'
  | 'automation'
  | 'analytics'
  | 'settings';

export interface SidebarNavItem {
  id: NavItemId;
  label: string;
  iconName: string;
  badge?: number | string;
  isNew?: boolean;
}

export interface FilterState {
  searchQuery: string;
  jobTypeFilter: string;
  matchFilter: 'all' | '90plus' | '80plus';
  locationType: 'all' | 'remote' | 'hybrid' | 'onsite';
}
