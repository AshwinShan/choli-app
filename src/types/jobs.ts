import { Company } from "./company";

interface Range {
  min: number;
  max: number;
}

interface Education {
  degree: string;
  fieldOfStudy: string;
}

interface JobDescription {
  description: string;
  aboutTheCompany: string;
  aboutTheRole: string;
  aboutTheTeam: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  role: string;
  industry: string;
  employmentType: string;
  education: Education[];
}

interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  description: JobDescription;
  datePosted: string;
  experience: Range;
  salary: Range;
  skills: string[];
  postedBy: string;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  isDeleted: boolean;
}

export type { Job };
