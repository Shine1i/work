import { createServerFn } from "@tanstack/react-start";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "~/lib/db";
import { companies, jobPostings } from "~/lib/db/schema";

export const $getPopularCompanies = createServerFn({ method: "GET" }).handler(async () => {
  const popularCompanies = await db
    .select({
      id: companies.id,
      name: companies.name,
      companyLogoUrl: companies.companyLogoUrl,
      jobCount: sql<number>`count(${jobPostings.id})::int`.as("job_count"),
    })
    .from(companies)
    .innerJoin(jobPostings, eq(companies.id, jobPostings.companyId))
    .groupBy(companies.id, companies.name, companies.companyLogoUrl)
    .orderBy(desc(sql`count(${jobPostings.id})`))
    .limit(15);

  return popularCompanies;
});
