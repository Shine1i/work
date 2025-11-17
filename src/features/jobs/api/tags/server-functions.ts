import { createServerFn } from "@tanstack/react-start";
import { sql } from "drizzle-orm";
import { db } from "~/lib/db";
import { aiClassifications } from "~/lib/db/schema";

export const $getAllAiTags = createServerFn({ method: "GET" }).handler(async () => {
  // Get all unique AI tags from the database
  const result = await db
    .select({
      tag: sql<string>`unnest(${aiClassifications.aiTags})`,
    })
    .from(aiClassifications)
    .where(sql`${aiClassifications.aiTags} IS NOT NULL`);

  // Get unique tags and sort alphabetically
  const uniqueTags = Array.from(new Set(result.map((r) => r.tag)))
    .filter((tag) => tag && tag.trim())
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  return uniqueTags;
});
