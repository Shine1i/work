import { Meilisearch } from "meilisearch";
import { env } from "~/config/env/server";

// Singleton Meilisearch client instance
let client: Meilisearch | null = null;

/**
 * Get or create the Meilisearch client instance
 * Server-only - do not use in client components
 */
function getMeilisearchClient(): Meilisearch {
  if (!client) {
    client = new Meilisearch({
      host: env.MEILISEARCH_URL,
      apiKey: env.MEILISEARCH_API_KEY,
    });
  }
  return client;
}

/**
 * Get the jobs index from Meilisearch
 * Server-only - do not use in client components
 */
export function getJobsIndex() {
  const client = getMeilisearchClient();
  return client.index("jobs");
}
