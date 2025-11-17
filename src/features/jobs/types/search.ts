import { z } from "zod";

// Enum definitions matching DB schema
export const experienceLevelEnum = z.enum(["true_entry_level", "low_experience", "experience_required", "internship"]);
export const locationFlexibilityEnum = z.enum(["on_site_only", "hybrid", "full_remote", "unknown"]);
export const applicationProcessTypeEnum = z.enum(["quick_apply", "standard_ats", "complex_ats"]);

// Zod schema for search parameters validation
export const searchParamsSchema = z.object({
  // Text search
  q: z.string().optional(),
  location: z.string().optional(),
  company: z.string().optional(),

  // Enum filters
  employment_type: z.string().optional(),
  experience_level: experienceLevelEnum.optional(),
  location_flexibility: locationFlexibilityEnum.optional(),
  application_process_type: applicationProcessTypeEnum.optional(),

  // Range filters
  salary_min: z.number().optional(),
  salary_max: z.number().optional(),
  entrylevel_score_min: z.number().min(0).max(10).optional(),
  experience_years_max: z.number().optional(),

  // Boolean filters
  education_replaces_experience: z.boolean().optional(),
  no_assessment: z.boolean().optional(),
  no_drivers_license: z.boolean().optional(),

  // Array filter
  ai_tags: z.string().optional(),

  // Sorting
  sort: z.enum(["relevance", "newest", "score", "salary"]).optional(),

  // Pagination
  page: z.number().int().positive().catch(1),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

export type SearchResult = {
  id: number;
  title: string;
  locationText: string | null;
  publishedAt: string;
  applicationUrl: string | null;
  occupation: string | null;
  employmentType: string | null;
  companyName: string;
  companyLogoUrl: string | null;
  experienceLevel: "true_entry_level" | "low_experience" | "experience_required" | "internship" | null;
  aiTags: string[] | null;
  entrylevelScore: number | null;
  entrylevelReasoning: string | null;
  implicitRequirements: string[] | null;
  locationFlexibility: "on_site_only" | "hybrid" | "full_remote" | "unknown" | null;
  educationCanReplaceExperience: boolean | null;
  requiredExperienceYearsMin: number | null;
  requiredExperienceYearsMax: number | null;
  applicationProcessType: "quick_apply" | "standard_ats" | "complex_ats" | null;
  requiresAssessment: boolean | null;
  requiresDriversLicense: boolean | null;
  classificationConfidence: number | null;
};

export type SearchResponse = {
  jobs: SearchResult[];
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
};
