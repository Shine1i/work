import { createFileRoute } from "@tanstack/react-router";
import { env } from "~/config/env/server";

export const Route = createFileRoute("/api/embeddings/$")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					// Parse incoming request from Meilisearch
					const body = await request.json();
					const inputs = body.input;

					// Sanitize input to remove malformed Unicode surrogates (emojis that break llama.cpp JSON parser)
					// Replace unpaired surrogates with empty string
					const sanitize = (text: string) =>
						text.replace(/[\uD800-\uDFFF]/g, "");

					const sanitizedInputs = Array.isArray(inputs)
						? inputs.map(sanitize)
						: sanitize(inputs);

					// Wrap with EmbeddingGemma query prompt format
					// Document embeddings use: "title: X | text: Y" (from documentTemplate)
					// Query embeddings use: "task: search result | query: Z"
					const promptedInputs = Array.isArray(sanitizedInputs)
						? sanitizedInputs.map((text: string) => `task: search result | query: ${text}`)
						: `task: search result | query: ${sanitizedInputs}`;

					// Forward to llama.cpp server
					const llamaResponse = await fetch(
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
								...body,
								input: promptedInputs,
							}),
						},
					);

					if (!llamaResponse.ok) {
						console.error(
							`llama.cpp embeddings failed: ${llamaResponse.status} ${llamaResponse.statusText}`,
						);
						return new Response(
							JSON.stringify({
								error: "Embeddings generation failed",
								details: await llamaResponse.text(),
							}),
							{
								status: llamaResponse.status,
								headers: { "Content-Type": "application/json" },
							},
						);
					}

					// Transform llama.cpp OpenAI format to Meilisearch format
					// OpenAI format: { data: [{ embedding: [...] }, ...] }
					// Meilisearch expects: [...] for single or [[...], [...]] for batch
					const data = await llamaResponse.json();
					const embeddings = data.data.map((item: any) => item.embedding);

					// Return single embedding or array of embeddings
					const response = Array.isArray(inputs) ? embeddings : embeddings[0];

					return new Response(JSON.stringify(response), {
						status: 200,
						headers: {
							"Content-Type": "application/json",
						},
					});
				} catch (error) {
					console.error("Embeddings proxy error:", error);
					return new Response(
						JSON.stringify({
							error: "Embeddings proxy failed",
							message: error instanceof Error ? error.message : "Unknown error",
						}),
						{
							status: 500,
							headers: { "Content-Type": "application/json" },
						},
					)
				}
			},
		},
	},
});
