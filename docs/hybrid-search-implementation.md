# Hybrid Search Implementation Complete

## ✅ Implementation Summary

Successfully implemented hybrid search (semantic + keyword) for job listings using Meilisearch and llama.cpp with EmbeddingGemma model.

## Components Added

### 1. Embeddings Proxy API Route
**File:** `src/routes/api/embeddings/proxy.ts`
- Intercepts Meilisearch embedding requests
- Wraps queries with EmbeddingGemma prompt: `task: search result | query: {text}`
- Forwards to llama.cpp at `http://192.168.0.7:8080/v1/embeddings`
- Handles errors and returns embeddings to Meilisearch

### 2. Environment Configuration
**File:** `src/config/env/server.ts`
- Added `LLAMA_CPP_URL` (default: `http://192.168.0.7:8080`)
- Added `LLAMA_CPP_API_KEY` (optional)

### 3. Meilisearch Embedder Configuration
**Embedder:** `job-embedder`
- **Source:** REST
- **URL:** `http://localhost:3000/api/embeddings/proxy`
- **Dimensions:** 768 (EmbeddingGemma)
- **Document Template:**
  ```liquid
  title: {% if doc.title %}{{ doc.title }}{% else %}none{% endif %} | text: {% if doc.company_name %}{{ doc.company_name }}{% endif %}{% if doc.location_text %} in {{ doc.location_text }}{% endif %}{% if doc.employment_type %}, {{ doc.employment_type }}{% endif %}.{% if doc.ai_tags %} Skills: {{ doc.ai_tags | join: ", " | truncatewords: 8 }}.{% endif %}
  ```

**Fields in template:**
- Title (required for EmbeddingGemma format)
- Company name
- Location
- Employment type
- AI tags (truncated to 8 words for skills)

**Rationale:** Based on research, including core fields (title, company, location) + AI tags provides optimal semantic search quality while staying under 45-word recommendation.

### 4. Search Server Function Update
**File:** `src/features/jobs/api/search/server-functions.ts`
- Added hybrid search support
- When `semanticRatio` parameter provided, enables hybrid mode:
  ```ts
  hybrid: {
    semanticRatio: params.semanticRatio,
    embedder: "job-embedder",
  }
  ```

### 5. Search Types Update
**File:** `src/features/jobs/types/search.ts`
- Added `semanticRatio?: number` (0-1 range validation)

### 6. UI Control
**File:** `src/features/jobs/components/SearchFilters.tsx`
- Added "Sökmiljö (AI)" accordion section
- Slider control for semantic ratio (0-1)
- Labels: "Nyckelord" ← → "AI-förståelse"
- Shows percentage when active
- Helpful description in Swedish

**Component:** `Slider` from shadcn/ui (added)

## How to Use

### User Experience
1. Navigate to `/jobs/search`
2. Open "Sökmiljö (AI)" filter section
3. Adjust slider:
   - **0%** = Pure keyword search (default behavior)
   - **50%** = Balanced hybrid (recommended starting point)
   - **100%** = Pure semantic/AI search

### Example URL Parameters
```
/jobs/search?q=python developer&semanticRatio=0.5
/jobs/search?q=machine learning&location=Stockholm&semanticRatio=0.7
```

## Current Status

### ✅ Completed
- [x] Embeddings proxy API route
- [x] Environment configuration
- [x] Meilisearch embedder configured
- [x] Server function updated
- [x] Types updated
- [x] UI control added

### 🔄 In Progress
Meilisearch is currently generating embeddings for all existing job documents. This process:
- Runs automatically after embedder configuration
- Sends each document through llama.cpp server
- May take several minutes depending on job count
- Can be monitored via Meilisearch tasks API

**Check progress:**
```bash
curl http://localhost:7700/tasks?indexUids=jobs&types=settingsUpdate
```

Or via MCP:
```
mcp__meilisearch__get-task with taskUid=26617
```

## Testing

### 1. Verify Embeddings Proxy
```bash
# Test proxy endpoint directly
curl -X POST http://localhost:3000/api/embeddings/proxy \
  -H "Content-Type: application/json" \
  -d '{"input": "software engineer"}'

# Expected: Response with embedding array from llama.cpp
```

### 2. Check Meilisearch Settings
```bash
curl http://localhost:7700/indexes/jobs/settings/embedders \
  -H "Authorization: Bearer YOUR_KEY"

# Expected: job-embedder configuration visible
```

### 3. Test Hybrid Search
Once embeddings generation completes:

**Pure keyword (ratio=0):**
```
/jobs/search?q=python&semanticRatio=0
```

**Balanced (ratio=0.5):**
```
/jobs/search?q=python developer&semanticRatio=0.5
```

**Pure semantic (ratio=1.0):**
```
/jobs/search?q=artificial intelligence&semanticRatio=1
```

### 4. Compare Results
Search for conceptual queries and compare:
- "work from home developer" (semantic should excel)
- "remote software engineer" (should match "work from home")
- "AI engineer" vs "artificial intelligence" (semantic equivalence)

## Environment Variables

Add to `.env`:
```env
# Already configured
MEILISEARCH_URL=https://meilisearch.kernelvm.xyz/
MEILISEARCH_API_KEY=your_key

# New (optional override)
LLAMA_CPP_URL=http://192.168.0.7:8080
LLAMA_CPP_API_KEY=  # Leave empty if not needed
```

## Performance Considerations

### Embedding Generation Latency
- llama.cpp with Q8_0 GGUF: ~50-100ms per query
- Batch embedding not currently enabled
- Consider caching for frequently searched queries

### Index Size
- Each document now stores 768-dimensional vector
- Increases index size but enables semantic search

### Search Latency
- Pure keyword (ratio=0): No additional latency
- Hybrid (ratio=0.5): +embedding generation time
- Pure semantic (ratio=1): +embedding generation time
- User can control tradeoff via slider

## Troubleshooting

### Embedder not working
1. Check llama.cpp server is running: `curl http://192.168.0.7:8080/health`
2. Check proxy is accessible: `curl http://localhost:3000/api/embeddings/proxy -X POST -d '{"input":"test"}'`
3. Check Meilisearch tasks for errors: `mcp__meilisearch__get-tasks`

### Search not using embeddings
1. Verify embeddings generation completed
2. Check `semanticRatio` parameter is being passed
3. Verify embedder name is correct (`job-embedder`)

### Poor semantic results
1. Adjust `semanticRatio` - lower values prioritize exact matches
2. Check document template includes relevant fields
3. Verify llama.cpp is using EmbeddingGemma model (not text generation model)

## Next Steps

1. **Monitor embedding generation progress** - Wait for task completion
2. **Test search quality** - Compare keyword vs semantic vs hybrid
3. **Tune default ratio** - Based on user behavior and result quality
4. **Add analytics** - Track which ratio values users prefer
5. **Optimize template** - Adjust field weights if needed
6. **Consider caching** - For popular queries

## References

- Implementation docs: `docs/hybrid-search.md`
- Template optimization: `docs/document-template.md`
- Meilisearch embedder docs: https://meilisearch.com/docs/learn/ai_powered_search/configure_rest_embedder
- EmbeddingGemma: https://ai.google.dev/gemma/docs/embeddinggemma
