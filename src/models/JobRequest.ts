import type { Company } from "./Company";

export interface JobRequest {
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  company: Company;
}