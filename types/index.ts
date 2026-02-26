export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  instagram?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category?: string;
}

export interface Education {
  id: string;
  year: string;
  institution: string;
  title: string;
  description?: string;
  certificateUrl?: string;
}

export interface WorkExperience {
  id: string;
  period: string;
  company: string;
  role?: string;
  responsibilities: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}
