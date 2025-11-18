import { createFileRoute } from "@tanstack/react-router";
import { env } from "~/config/env/server";

export const Route = createFileRoute("/api/embeddings/$")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					// Parse incoming request from Meilisearch
					const body = await request.json();

					// Handle both formats:
					// 1. {"input": "text"} or {"input": ["text1", "text2"]}
					// 2. Raw string from Meilisearch's {{text}} template
					let inputs: string | string[];
					if (typeof body === "string") {
						// Meilisearch sends raw string with {{text}} template
						inputs = body;
					} else if (body.input) {
						// Standard format with input field
						inputs = body.input;
					} else {
						return new Response(
							JSON.stringify({ error: "Missing input field" }),
							{
								status: 400,
								headers: { "Content-Type": "application/json" },
							},
						);
					}

					// Sanitize input to remove malformed Unicode surrogates (emojis that break llama.cpp JSON parser)
					// and collapse excessive whitespace (fix embeddinggemma 164x slowdown bug #12508)
					// Handle null/undefined/non-string values robustly
					const sanitize = (text: any): string => {
						if (text == null) return "";
						const str = String(text);
						// Remove Unicode surrogates (emojis)
						const noSurrogates = str.replace(/[\uD800-\uDFFF]/g, "");
						// Collapse excessive whitespace (double/triple spaces from HTML/PDFs)
						return noSurrogates.replace(/\s+/g, " ").trim();
					};

					const sanitizedInputs = Array.isArray(inputs)
						? inputs.map(sanitize)
						: sanitize(inputs);

					// Wrap with EmbeddingGemma query prompt format
					// Document embeddings use: "title: X | text: Y" (from documentTemplate)
					// Query embeddings use: "task: search result | query: Z"
					const promptedInputs = Array.isArray(sanitizedInputs)
						? sanitizedInputs.map((text: string) => `task: search result | query: ${text}`)
						: `task: search result | query: ${sanitizedInputs}`;

					// Forward to llama.cpp server with timeout
					const controller = new AbortController();
					const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

					let llamaResponse: Response;
					try {
						llamaResponse = await fetch(
							`${env.LLAMA_CPP_URL}/v1/embeddings`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									...(env.LLAMA_CPP_API_KEY && {
										Authorization: `Bearer ${env.LLAMA_CPP_API_KEY}`,
									}),
								},
								body: JSON.stringify({
									input: promptedInputs,
								}),
								signal: controller.signal,
							},
						);
					} catch (fetchError) {
						clearTimeout(timeout);
						console.error("llama.cpp connection failed:", fetchError instanceof Error ? fetchError.message : "Unknown error");
						return new Response(
							JSON.stringify({ error: "Embeddings service unavailable" }),
							{
								status: 503,
								headers: { "Content-Type": "application/json" },
							},
						);
					} finally {
						clearTimeout(timeout);
					}

					if (!llamaResponse.ok) {
						const status = llamaResponse.status;
						console.error(`llama.cpp embeddings failed: ${status}`);
						return new Response(
							JSON.stringify({ error: "Embeddings generation failed" }),
							{
								status: status >= 500 ? 503 : status,
								headers: { "Content-Type": "application/json" },
							},
						);
					}

					// Transform llama.cpp OpenAI format to Meilisearch format
					// OpenAI format: { data: [{ embedding: [...] }, ...] }
					// Meilisearch expects: [...] for single or [[...], [...]] for batch
					const data = await llamaResponse.json();

					if (!data.data || !Array.isArray(data.data)) {
						console.error("Invalid llama.cpp response format:", data);
						return new Response(
							JSON.stringify({
								error: "Invalid response format from embedding server",
								details: "Missing or invalid 'data' array",
							}),
							{
								status: 500,
								headers: { "Content-Type": "application/json" },
							},
						);
					}

					const embeddings = data.data.map((item: any) => {
						if (!item.embedding || !Array.isArray(item.embedding)) {
							throw new Error("Invalid embedding in response");
						}
						return item.embedding;
					});

					// Return single embedding or array of embeddings
					const response = Array.isArray(inputs) ? embeddings : embeddings[0];

					return new Response(JSON.stringify(response), {
						status: 200,
						headers: {
							"Content-Type": "application/json",
						},
					});
				} catch (error) {
					console.error("Embeddings proxy error:", error instanceof Error ? error.message : String(error));
					return new Response(
						JSON.stringify({ error: "Embeddings proxy failed" }),
						{
							status: 500,
							headers: { "Content-Type": "application/json" },
						},
					);
				}
			},
		},
	},
});
