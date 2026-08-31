export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  appliedDate: string;
}
