## Setting Up Hybrid Search for Your Job Listing Board

For a job listing board with hybrid search capabilities, you'll need to configure Meilisearch to use your llama.cpp OpenAI-compatible server as a REST embedder. Based on the EmbeddingGemma prompting guidelines, you should use **Retrieval** task prompts for both documents and queries.

### Step 1: Configure the REST Embedder in Meilisearch

Create an embedder configuration that connects to your llama-server. For job listings, the **Retrieval** task type is appropriate since users are searching for job postings.[1][2][3]

```bash
curl -X PATCH 'http://localhost:7700/indexes/jobs/settings/embedders' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_MEILISEARCH_KEY' \
  --data-binary '{
    "job-embedder": {
      "source": "rest",
      "url": "http://localhost:8080/v1/embeddings",
      "apiKey": "dummy-key",
      "request": {
        "input": ["{{text}}", "{{..}}"]
      },
      "response": {
        "data": ["{{embedding}}"]
      },
      "documentTemplate": "{% if doc.title %}title: {{ doc.title | truncatewords: 10 }}{% endif %} | text: {% if doc.company %}{{ doc.company }}, {% endif %}{% if doc.location %}{{ doc.location }}, {% endif %}{% if doc.description %}{{ doc.description | truncatewords: 30 }}{% endif %}{% if doc.requirements %} Requirements: {{ doc.requirements | truncatewords: 15 }}{% endif %}",
      "dimensions": 768
    }
  }'
```

**Key configuration details:**

- **`source: "rest"`**: Specifies a custom REST API embedder[2][3]
- **`url`**: Points to your llama-server's OpenAI-compatible endpoint
- **`request.input`**: Uses `["{{text}}", "{{..}}"]` format for batch processing. The `{{text}}` placeholder will be replaced by the rendered document template, and `{{..}}` enables batch embedding generation[3][2]
- **`response.data`**: Tells Meilisearch where to find embeddings in the OpenAI-compatible response format
- **`documentTemplate`**: Uses Liquid template syntax to format job documents with the EmbeddingGemma document prompt structure[4][5]

### Step 2: Optimize the Document Template

The `documentTemplate` field is critical for generating quality embeddings. Based on EmbeddingGemma's recommendations and job search best practices, structure your template as follows:[5][4]

```liquid
title: {% if doc.title %}{{ doc.title | truncatewords: 10 }}{% endif %} | text: {% if doc.company %}Company: {{ doc.company }}.{% endif %}{% if doc.location %} Location: {{ doc.location }}.{% endif %}{% if doc.jobType %} Type: {{ doc.jobType }}.{% endif %}{% if doc.description %} {{ doc.description | truncatewords: 35 }}{% endif %}{% if doc.requirements %} Requirements: {{ doc.requirements | truncatewords: 20 }}{% endif %}{% if doc.skills %} Skills: {{ doc.skills }}.{% endif %}
```

**Template design principles:**[4]

- **Use EmbeddingGemma's document format**: `title: {title | "none"} | text: {content}` structure for retrieval tasks
- **Keep prompts short**: Target 15-45 words for optimal embedding quality. Use `truncatewords` filter to limit field length[4]
- **Include only relevant fields**: Focus on title, company, location, job type, description, requirements, and key skills[6][7][8]
- **Add guards for missing fields**: Use `{% if doc.field %}` checks to prevent errors when fields are absent[4]
- **Prioritize searchable information**: Place most important information (title, company) at the beginning[9][10]

### Step 3: Configure Index Settings

Define which fields should be searchable and filterable for optimal performance:[7][6]

```bash
curl -X PATCH 'http://localhost:7700/indexes/jobs/settings' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_MEILISEARCH_KEY' \
  --data-binary '{
    "searchableAttributes": [
      "title",
      "company",
      "description",
      "requirements",
      "skills",
      "location"
    ],
    "filterableAttributes": [
      "jobType",
      "location",
      "experienceLevel",
      "salary",
      "remote",
      "postedDate"
    ],
    "sortableAttributes": [
      "postedDate",
      "salary"
    ],
    "displayedAttributes": [
      "*"
    ]
  }'
```

### Step 4: Add Job Documents with Proper Structure

When indexing job postings, structure your documents to match the template:[11]

```bash
curl -X POST 'http://localhost:7700/indexes/jobs/documents' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_MEILISEARCH_KEY' \
  --data-binary '[
    {
      "id": "job-001",
      "title": "Senior Full-Stack Developer",
      "company": "TechCorp",
      "location": "Remote / San Francisco",
      "jobType": "Full-time",
      "experienceLevel": "Senior",
      "description": "We are looking for an experienced full-stack developer to join our engineering team. You will work on building scalable web applications using modern frameworks and cloud infrastructure.",
      "requirements": "5+ years of experience with JavaScript/TypeScript, React, Node.js. Strong understanding of REST APIs, database design, and cloud platforms (AWS/GCP).",
      "skills": ["JavaScript", "TypeScript", "React", "Node.js", "AWS", "PostgreSQL"],
      "salary": 150000,
      "remote": true,
      "postedDate": 1700000000
    }
  ]'
```

Meilisearch will automatically generate embeddings using your llama-server when documents are indexed.[1][3]

### Step 5: Implement Hybrid Search Queries

Now users can perform hybrid searches that combine semantic understanding with keyword matching. The `semanticRatio` parameter controls the balance:[12][13]

**Example 1: Balanced hybrid search (50/50)**
```bash
curl -X POST 'http://localhost:7700/indexes/jobs/search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_MEILISEARCH_KEY' \
  --data-binary '{
    "q": "remote python developer with machine learning experience",
    "hybrid": {
      "semanticRatio": 0.5,
      "embedder": "job-embedder"
    },
    "limit": 20
  }'
```

**Example 2: Semantic-focused search (70% semantic, 30% keyword)**
```bash
curl -X POST 'http://localhost:7700/indexes/jobs/search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_MEILISEARCH_KEY' \
  --data-binary '{
    "q": "looking for AI engineer position",
    "hybrid": {
      "semanticRatio": 0.7,
      "embedder": "job-embedder"
    },
    "filter": "remote = true AND experienceLevel = Senior",
    "limit": 20
  }'
```

**Search parameters explained:**[14][12]

- **`q`**: The user's search query (automatically embedded by Meilisearch using the same embedder)
- **`hybrid.semanticRatio`**: Controls semantic vs. keyword balance
  - `0.0` = Pure keyword/full-text search
  - `0.5` = Balanced hybrid (default)
  - `1.0` = Pure semantic search
- **`hybrid.embedder`**: Name of the embedder to use (must match your configuration)
- **`filter`**: Apply business logic filters (job type, location, salary, etc.)
- **`limit`**: Maximum number of results to return

### Step 6: Handle Query Embeddings

When Meilisearch processes a hybrid search query, it automatically sends the query text to your llama-server. Your server should handle the query embedding generation. Note that **Meilisearch does not send the EmbeddingGemma query prompt** - you'll need to add this in your llama-server or via a middleware proxy.[2][3]

**Option A: Middleware proxy (Recommended)**

Create a simple proxy between Meilisearch and llama-server that adds the query prompt:

```javascript
// Example Express.js middleware
app.post('/v1/embeddings', async (req, res) => {
  const inputs = req.body.input;

  // Add EmbeddingGemma query prompt for retrieval
  const promptedInputs = Array.isArray(inputs)
    ? inputs.map(text => `task: search result | query: ${text}`)
    : `task: search result | query: ${inputs}`;

  // Forward to llama-server
  const response = await fetch('http://localhost:8080/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: promptedInputs })
  });

  return res.json(await response.json());
});
```

**Option B: Modify llama-server behavior**

You could also modify the llama-server source code to automatically prepend the query prompt, but this is less flexible.

### Step 7: Query Prompt Considerations

According to EmbeddingGemma documentation, for job search (retrieval use case):

**Document embeddings** (handled by `documentTemplate`):
```
title: {title | "none"} | text: {content}
```

**Query embeddings** (add via middleware):
```
task: search result | query: {user_query}
```

This asymmetric prompting approach ensures documents and queries are embedded in semantically compatible spaces, improving search relevance.[10][9]

### Step 8: Enable Features in Meilisearch

**Hybrid search settings:**[13][12]

- **Semantic weight tuning**: Allow users to adjust `semanticRatio` based on query type
  - Specific job titles → Lower semantic ratio (0.2-0.4) for exact matching
  - Conceptual searches → Higher semantic ratio (0.6-0.8) for semantic understanding

- **Typo tolerance**: Enabled by default, helps with misspelled search terms[15]

- **Filtering**: Combine semantic search with business logic filters (location, salary range, job type)[12]

- **Ranking rules**: Meilisearch automatically combines semantic and keyword scores using a sophisticated normalization approach[13]

### Performance Optimization Tips

1. **Batch document indexing**: Index documents in batches (500-1000 at a time) for faster processing[6][7]

2. **Limit `documentTemplate` length**: Keep rendered templates under 100 words to reduce embedding generation time and improve quality[4]

3. **Pre-filter before semantic search**: Use keyword filters to reduce the semantic search space for faster queries[12]

4. **Monitor embedding latency**: Most search latency comes from embedding generation. Your llama-server with GPU acceleration should keep this under 100ms per query[3]

5. **Index optimization**: Only include searchable fields in `searchableAttributes` to reduce index size and improve query speed[8][7][6]

6. **Use appropriate quantization**: Your Q8_0 GGUF model balances quality and speed well for production use[16][17]

### Complete Example Configuration

Here's a complete working example for your job board:

```json
{
  "embedders": {
    "job-embedder": {
      "source": "rest",
      "url": "http://localhost:8080/v1/embeddings",
      "apiKey": "dummy",
      "request": {
        "input": ["{{text}}", "{{..}}"]
      },
      "response": {
        "data": ["{{embedding}}"]
      },
      "documentTemplate": "title: {% if doc.title %}{{ doc.title }}{% else %}none{% endif %} | text: {% if doc.company %}{{ doc.company }}, {% endif %}{% if doc.location %}{{ doc.location }}, {% endif %}{% if doc.jobType %}{{ doc.jobType }}.{% endif %}{% if doc.description %} {{ doc.description | truncatewords: 30 }}{% endif %}{% if doc.requirements %} Requires: {{ doc.requirements | truncatewords: 15 }}{% endif %}",
      "dimensions": 768
    }
  },
  "searchableAttributes": ["title", "company", "description", "requirements", "skills", "location"],
  "filterableAttributes": ["jobType", "location", "experienceLevel", "salary", "remote", "postedDate"],
  "sortableAttributes": ["postedDate", "salary"],
  "rankingRules": ["words", "typo", "proximity", "attribute", "sort", "exactness"]
}
```

This setup provides a production-ready hybrid search system that leverages EmbeddingGemma's strengths for job search while maintaining the flexibility to tune semantic vs. keyword balance based on your users' search patterns.[1][13][12][4]

[1](https://meilisearch.com/docs/learn/ai_powered_search/getting_started_with_ai_search)
[2](https://meilisearch.com/docs/learn/ai_powered_search/configure_rest_embedder)
[3](https://github.com/orgs/meilisearch/discussions/748)
[4](https://meilisearch.com/docs/learn/ai_powered_search/document_template_best_practices)
[5](https://www.meilisearch.com/blog/meilisearch-1-6)
[6](https://meilisearch.com/docs/learn/indexing/indexing_best_practices)
[7](https://www.meilisearch.com/blog/indexing-optimization-guide)
[8](https://dev.to/shrsv/meilisearch-indexing-best-practices-1k3p)
[9](https://www.ingedata.ai/blog/2025/04/01/talent-matching-with-vector-embeddings/)
[10](https://jobdataapi.com/c/vector-embeddings-and-search-api-documentation/)
[11](https://meilisearch.com/docs/learn/getting_started/documents)
[12](https://www.meilisearch.com/blog/hybrid-search)
[13](https://www.meilisearch.com/blog/fixing-hybrid-search)
[14](https://www.meilisearch.com/docs/guides/embedders/cloudflare)
[15](https://github.com/meilisearch/meilisearch)
[16](https://huggingface.co/sarav1n/embeddinggemma-300m-Q8_0-GGUF)
[17](https://huggingface.co/dontia/embeddinggemma-300m-medical-Q4_K_M-GGUF)
[18](https://buildship.com/integrations/apps/meilisearch-and-openai)
[19](https://www.viget.com/articles/ai-powered-craft-search-with-meilisearch/)
[20](https://meilisearch.com/docs/guides/embedders/openai)
[21](https://www.meilisearch.com/blog/meilisearch-chat)
[22](https://www.meilisearch.com/solutions/hybrid-search)
[23](https://www.meilisearch.com/docs/guides/embedders/voyage)
[24](https://meilisearch.com/docs/learn/chat/getting_started_with_chat)
[25](https://docs.commerce.blazity.com/ai-features/vector-search)
[26](https://www.meilisearch.com/docs/learn/ai_powered_search/image_search_with_multimodal_embeddings)
[27](https://pkg.go.dev/github.com/meilisearch/meilisearch-go)
[28](https://playbooks.com/mcp/miiton-meilisearch-hybrid-search)
[29](https://www.meilisearch.com/docs/guides/embedders/cohere)
[30](https://news.ycombinator.com/item?id=43680699)
[31](https://meilisearch.com/docs/reference/api/settings)
[32](https://github.com/meilisearch/meilisearch/issues/4765)
[33](https://www.meilisearch.com/blog/meilisearch-1-10)
[34](https://meilisearch.dev/docs/reference/api/documents)
[35](https://www.meilisearch.com/llms-full.txt)
[36](https://x.com/meilisearch/status/1887169506557976686)
[37](https://www.meilisearch.com/blog/how-to-build-rag)
[38](https://buildship.com/integrations/apps/meilisearch-and-gemini)
[39](https://github.com/orgs/meilisearch/discussions/621)
[40](https://meilisearch.com/docs/learn/ai_powered_search/search_with_user_provided_embeddings)
[41](https://community.openai.com/t/optimizing-ai-document-retrieval-embedding-vs-prompting/608297)
[42](https://meilisearch.com/docs/learn/ai_powered_search/image_search_with_user_provided_embeddings)
[43](https://joshuaberkowitz.us/blog/github-repos-8/meilisearch-ai-powered-hybrid-search-that-feels-instant-760)
[44](https://specs.meilisearch.dev/specifications/text/0118-search-api.html)
[45](https://python.langchain.com/docs/integrations/vectorstores/meilisearch/)
[46](https://dev.to/meilisearch/vector-storage-is-coming-to-meilisearch-to-empower-search-through-ai-3i1f)
[47](https://www.mokahr.io/myblog/seo-optimized-job-listings-search-rankings/)
[48](https://github.com/programster/Meilisearch-Demo)
[49](https://opensearch.org/blog/the-new-semantic-field-simplifying-semantic-search-in-opensearch/)
[50](https://arxiv.org/abs/2406.06257)
[51](https://www.meilisearch.com/blog/onsite-search)
[52](https://vbn.aau.dk/files/464971521/Kaya_Bogers.pdf)
[53](https://www.meilisearch.com/blog/how-full-text-search-engines-work)
[54](https://www.elastic.co/search-labs/blog/openwebcrawler-llms-semantic-text-resume-job-search)
[55](https://www.meilisearch.com/blog/best-practices-for-faster-indexing)
[56](https://www.sciencedirect.com/science/article/pii/S0957417425006657)
