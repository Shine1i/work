import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq, gte, inArray, isNotNull } from "drizzle-orm";
import { db } from "~/lib/db";
import { aiClassifications, companies, jobPostings } from "~/lib/db/schema";

export const $getRecentFriendlyJobs = createServerFn({ method: "GET" }).handler(async () => {
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
    })
    .from(jobPostings)
    .innerJoin(companies, eq(jobPostings.companyId, companies.id))
    .innerJoin(aiClassifications, eq(jobPostings.id, aiClassifications.jobPostingId))
    .where(
      and(
        inArray(aiClassifications.experienceLevel, ["true_entry_level", "low_experience"]),
        isNotNull(aiClassifications.entrylevelScore),
      ),
    )
    .orderBy(desc(aiClassifications.entrylevelScore), desc(jobPostings.publishedAt))
    .limit(6);

  return jobs;
});
