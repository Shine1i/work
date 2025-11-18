import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    VITE_BASE_URL: z.url().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string().min(1),

    // Meilisearch
    MEILISEARCH_URL: z.url(),
    MEILISEARCH_API_KEY: z.string().min(1),

    // llama.cpp embeddings server
    LLAMA_CPP_URL: z.url().default("http://192.168.0.7:8080"),
    LLAMA_CPP_API_KEY: z.string().optional(),

    // OAuth2 providers, optional, update as needed
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
  },
  runtimeEnv: process.env,
});
