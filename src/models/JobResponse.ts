import type { Company } from "./Company";

export interface JobResponse {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: Company;
}