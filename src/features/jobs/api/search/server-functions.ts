import { createServerFn } from "@tanstack/react-start";
import { and, asc, count, desc, eq, gte, ilike, isNull, lte, not, or, sql } from "drizzle-orm";
import { db } from "~/lib/db";
import { aiClassifications, companies, jobPostings } from "~/lib/db/schema";
import type { SearchParams, SearchResponse } from "../../types/search";

const PER_PAGE = 15;

export const $searchJobs = createServerFn({ method: "GET" })
  .validator((data: SearchParams) => data)
  .handler(async ({ data: params }) => {
    const page = params.page || 1;
    const offset = (page - 1) * PER_PAGE;

    // Build dynamic WHERE conditions
    const conditions = [];

    // Text search on query
    if (params.q) {
      conditions.push(
        or(
          ilike(jobPostings.title, `%${params.q}%`),
          ilike(jobPostings.descriptionText, `%${params.q}%`),
          ilike(jobPostings.occupation, `%${params.q}%`),
        ),
      );
    }

    // Location search
    if (params.location) {
      conditions.push(ilike(jobPostings.locationText, `%${params.location}%`));
    }

    // Company search
    if (params.company) {
      conditions.push(ilike(companies.name, `%${params.company}%`));
    }

    // Enum filters
    if (params.employment_type) {
      conditions.push(eq(jobPostings.employmentType, params.employment_type));
    }

    if (params.experience_level) {
      conditions.push(eq(aiClassifications.experienceLevel, params.experience_level));
    }

    if (params.location_flexibility) {
      conditions.push(eq(aiClassifications.locationFlexibility, params.location_flexibility));
    }

    if (params.application_process_type) {
      conditions.push(eq(aiClassifications.applicationProcessType, params.application_process_type));
    }

    // Range filters
    if (params.salary_min !== undefined) {
      conditions.push(gte(jobPostings.averageSalary, params.salary_min));
    }

    if (params.salary_max !== undefined) {
      conditions.push(lte(jobPostings.averageSalary, params.salary_max));
    }

    if (params.entrylevel_score_min !== undefined) {
      conditions.push(gte(aiClassifications.entrylevelScore, params.entrylevel_score_min));
    }

    if (params.experience_years_max !== undefined) {
      conditions.push(lte(aiClassifications.requiredExperienceYearsMax, params.experience_years_max));
    }

    // Boolean filters
    if (params.education_replaces_experience) {
      conditions.push(eq(aiClassifications.educationCanReplaceExperience, true));
    }

    if (params.no_assessment) {
      conditions.push(
        or(eq(aiClassifications.requiresAssessment, false), isNull(aiClassifications.requiresAssessment)),
      );
    }

    if (params.no_drivers_license) {
      conditions.push(
        or(eq(aiClassifications.requiresDriversLicense, false), isNull(aiClassifications.requiresDriversLicense)),
      );
    }

    // AI tags filter (array contains)
    if (params.ai_tags) {
      conditions.push(sql`${aiClassifications.aiTags} @> ARRAY[${params.ai_tags}]::text[]`);
    }

    // Build WHERE clause
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Determine sort order
    let orderByClause;
    if (params.q) {
      // Priority: title match > entry level score
      orderByClause = [
        sql`CASE WHEN ${jobPostings.title} ILIKE ${`%${params.q}%`} THEN 1 ELSE 2 END`,
        desc(aiClassifications.entrylevelScore),
        desc(jobPostings.publishedAt),
      ];
    } else {
      // Default: newest first
      orderByClause = [desc(jobPostings.publishedAt)];
    }

    // Get total count
    const [{ value: total }] = await db
      .select({ value: count() })
      .from(jobPostings)
      .innerJoin(companies, eq(jobPostings.companyId, companies.id))
      .innerJoin(aiClassifications, eq(jobPostings.id, aiClassifications.jobPostingId))
      .where(whereClause);

    // Fetch jobs
    const jobs = await db
      .select({
        id: jobPostings.id,
        title: jobPostings.title,
        locationText: jobPostings.locationText,
        publishedAt: jobPostings.publishedAt,
        applicationUrl: jobPostings.applicationUrl,
        occupation: jobPostings.occupation,
        employmentType: jobPostings.employmentType,
        companyName: companies.name,
        companyLogoUrl: companies.companyLogoUrl,
        experienceLevel: aiClassifications.experienceLevel,
        aiTags: aiClassifications.aiTags,
        entrylevelScore: aiClassifications.entrylevelScore,
        entrylevelReasoning: aiClassifications.entrylevelReasoning,
        implicitRequirements: aiClassifications.implicitRequirements,
        locationFlexibility: aiClassifications.locationFlexibility,
        educationCanReplaceExperience: aiClassifications.educationCanReplaceExperience,
        requiredExperienceYearsMin: aiClassifications.requiredExperienceYearsMin,
        requiredExperienceYearsMax: aiClassifications.requiredExperienceYearsMax,
        applicationProcessType: aiClassifications.applicationProcessType,
        requiresAssessment: aiClassifications.requiresAssessment,
        requiresDriversLicense: aiClassifications.requiresDriversLicense,
        classificationConfidence: aiClassifications.classificationConfidence,
      })
      .from(jobPostings)
      .innerJoin(companies, eq(jobPostings.companyId, companies.id))
      .innerJoin(aiClassifications, eq(jobPostings.id, aiClassifications.jobPostingId))
      .where(whereClause)
      .orderBy(...orderByClause)
      .limit(PER_PAGE)
      .offset(offset);

    const totalPages = Math.ceil(total / PER_PAGE);

    const response: SearchResponse = {
      jobs,
      total,
      page,
      totalPages,
      perPage: PER_PAGE,
    };

    return response;
  });
