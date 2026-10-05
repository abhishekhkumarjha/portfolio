export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  link?: string;
  github?: string;
  category: "AI & ML" | "Cyber & Security" | "Full-Stack";
  tags: string[];
  threeIconType: "contract" | "shield" | "globe" | "network" | "layout" | "shopping-cart" | "database" | "smartphone";
  highlights?: string[];
  architectureSteps?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  date: string;
  credLink?: string;
  authority: string;
}

export interface EventItem {
  title: string;
  date?: string;
  organizerOrRole?: string;
  link?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string[];
  phone: string[];
  linkedin: string;
  github?: string;
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  certifications?: Certification[];
  awards?: string[];
  events?: {
    financeAndTrading?: EventItem[];
    hackathons: EventItem[];
  };
}
