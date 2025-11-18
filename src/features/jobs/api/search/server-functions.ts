import { createServerFn } from "@tanstack/react-start";
import { getJobsIndex } from "../../utils/meilisearch";
import type { SearchParams, SearchResponse } from "../../types/search";

const PER_PAGE = 8;

export const $searchJobs = createServerFn({ method: "GET" })
  .validator((data: SearchParams) => data)
  .handler(async ({ data: params }) => {
    const page = params.page || 1;

    // Build filter array for Meilisearch
    const filters: string[] = [];

    // Text search on location
    if (params.location) {
      filters.push(`location_text = "${params.location}"`);
    }

    // Text search on company
    if (params.company) {
      filters.push(`company_name = "${params.company}"`);
    }

    // Enum filters
    if (params.employment_type) {
      filters.push(`employment_type = "${params.employment_type}"`);
    }

    if (params.experience_level) {
      filters.push(`experience_level = "${params.experience_level}"`);
    }

    if (params.location_flexibility) {
      filters.push(`location_flexibility = "${params.location_flexibility}"`);
    }

    if (params.application_process_type) {
      filters.push(`application_process_type = "${params.application_process_type}"`);
    }

    // Range filters
    if (params.salary_min !== undefined && params.salary_max !== undefined) {
      filters.push(`average_salary >= ${params.salary_min} AND average_salary <= ${params.salary_max}`);
    } else if (params.salary_min !== undefined) {
      filters.push(`average_salary >= ${params.salary_min}`);
    } else if (params.salary_max !== undefined) {
      filters.push(`average_salary <= ${params.salary_max}`);
    }

    if (params.entrylevel_score_min !== undefined) {
      filters.push(`entrylevel_score >= ${params.entrylevel_score_min}`);
    }

    if (params.experience_years_max !== undefined) {
      filters.push(`required_experience_years_max <= ${params.experience_years_max}`);
    }

    // Boolean filters
    if (params.education_replaces_experience) {
      filters.push(`education_can_replace_experience = true`);
    }

    if (params.no_assessment) {
      filters.push(`requires_assessment = false`);
    }

    if (params.no_drivers_license) {
      filters.push(`requires_drivers_license = false`);
    }

    // AI tags filter (array contains - OR logic for multiple tags)
    if (params.ai_tags) {
      const tags = params.ai_tags.split(",").map((tag) => tag.trim());
      if (tags.length === 1) {
        filters.push(`ai_tags = "${tags[0]}"`);
      } else if (tags.length > 1) {
        const tagFilters = tags.map((tag) => `ai_tags = "${tag}"`).join(" OR ");
        filters.push(`(${tagFilters})`);
      }
    }

    // Determine sort order
    let sort: string[] = [];

    if (params.sort) {
      switch (params.sort) {
        case "newest":
          sort = ["published_at:desc"];
          break;
        case "score":
          sort = ["entrylevel_score:desc"];
          break;
        case "salary":
          sort = ["average_salary:desc"];
          break;
        case "relevance":
        default:
          // Use default relevance ranking (no explicit sort)
          sort = [];
          break;
      }
    } else {
      // Default behavior: relevance if query, newest otherwise
      sort = params.q ? [] : ["published_at:desc"];
    }

    // Perform search
    const index = getJobsIndex();
    const searchResult = await index.search(params.q || "", {
      filter: filters.length > 0 ? filters : undefined,
      sort,
      page,
      hitsPerPage: PER_PAGE,
      // Enable hybrid search if semanticRatio is provided
      ...(params.semanticRatio !== undefined && {
        hybrid: {
          semanticRatio: params.semanticRatio,
          embedder: "job-embedder",
        },
      }),
    });

    // Map response to match existing SearchResponse type
    // When using page-based pagination, Meilisearch returns totalHits instead of estimatedTotalHits
    const totalHits = searchResult.totalHits ?? 0;

    const response: SearchResponse = {
      jobs: searchResult.hits.map((hit: any) => ({
        id: hit.id,
        title: hit.title,
        locationText: hit.location_text,
        publishedAt: hit.published_at,
        applicationUrl: hit.application_url,
        occupation: hit.occupation,
        employmentType: hit.employment_type,
        companyName: hit.company_name,
        companyLogoUrl: hit.company_logo_url,
        experienceLevel: hit.experience_level,
        aiTags: hit.ai_tags,
        entrylevelScore: hit.entrylevel_score,
        entrylevelReasoning: hit.entrylevel_reasoning,
        implicitRequirements: hit.implicit_requirements,
        locationFlexibility: hit.location_flexibility,
        educationCanReplaceExperience: hit.education_can_replace_experience,
        requiredExperienceYearsMin: hit.required_experience_years_min,
        requiredExperienceYearsMax: hit.required_experience_years_max,
        applicationProcessType: hit.application_process_type,
        requiresAssessment: hit.requires_assessment,
        requiresDriversLicense: hit.requires_drivers_license,
        classificationConfidence: hit.classification_confidence,
      })),
      total: totalHits,
      page,
      totalPages: Math.ceil(totalHits / PER_PAGE),
      perPage: PER_PAGE,
    };

    return response;
  });
