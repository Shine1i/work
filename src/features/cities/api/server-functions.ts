import { createServerFn } from "@tanstack/react-start";
import { desc, isNotNull, sql } from "drizzle-orm";
import { db } from "~/lib/db";
import { jobPostings } from "~/lib/db/schema";

export const $getPopularCities = createServerFn({ method: "GET" }).handler(async () => {
  const popularCities = await db
    .select({
      name: jobPostings.locationText,
      jobCount: sql<number>`count(*)::int`.as("job_count"),
    })
    .from(jobPostings)
    .where(isNotNull(jobPostings.locationText))
    .groupBy(jobPostings.locationText)
    .orderBy(desc(sql`count(*)`))
    .limit(6);

  return popularCities;
});
