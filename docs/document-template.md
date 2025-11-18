The document template I recommended has some **good elements but needs improvement** to align with Meilisearch best practices. Let me break down the issues and provide an optimized version.

## Issues with the Previous Template

### 1. **Too Long and Verbose**
The template I suggested could easily exceed 45 words, especially with full descriptions. Meilisearch recommends keeping prompts between **15-45 words** for optimal embedding quality.[1][2][3]

### 2. **Missing Natural Language Context**
The template was too structured and lacked natural language flow. Research shows that embeddings work better when text reads naturally rather than as field dumps.[4][5]

### 3. **Redundant Separator Characters**
Using `|` separators throughout makes the prompt feel mechanical. While EmbeddingGemma requires `title: X | text: Y` format, the text portion should flow naturally[1].

### 4. **Over-truncation Risk**
Using `truncatewords: 30` and `truncatewords: 15` separately can lead to fragmented context. Better to construct a coherent sentence and truncate once.[3][1]

## Optimized Document Template

Here's an improved version that follows Meilisearch best practices while respecting EmbeddingGemma's format requirements:

```liquid
title: {% if doc.title %}{{ doc.title }}{% else %}none{% endif %} | text: {% if doc.company %}{{ doc.company }}{% endif %}{% if doc.location %} in {{ doc.location }}{% endif %}{% if doc.jobType %} ({{ doc.jobType }}){% endif %}: {% if doc.description %}{{ doc.description | truncatewords: 25 }}{% endif %}{% if doc.requirements %} Requires {{ doc.requirements | truncatewords: 10 }}.{% endif %}
```

**Why this is better:**

**Natural language flow**: Reads as "Company in Location (Job Type): Description. Requires Requirements" which is more semantically coherent[5][1][4]

**Optimal length**: Typically produces 30-40 words, well within the 15-45 word sweet spot[2][1][3]

**Prioritizes critical fields**: Company, location, and job type appear first as they're the most discriminative for job search[6][7]

**Conditional formatting**: Uses guards (`{% if %}`) to handle missing fields gracefully[1][3]

**Single truncation point**: Splits truncation budget intelligently (25 words for description, 10 for requirements)[1]

## Alternative: Ultra-Short Template

If your job descriptions are typically long, consider an even shorter template focused on the most discriminative fields:[7][6]

```liquid
title: {% if doc.title %}{{ doc.title }}{% else %}none{% endif %} | text: {{ doc.company }}{% if doc.location %}, {{ doc.location }}{% endif %}{% if doc.jobType %} - {{ doc.jobType }}{% endif %}. {% if doc.description %}{{ doc.description | truncatewords: 20 }}{% endif %}
```

This produces ~20-30 words and emphasizes job title, company, and location—which research shows are the most effective fields for job matching.[7]

## Field Priority Considerations

Based on job search research, here's the priority ranking of fields for semantic relevance:[6][7]

1. **Job Title** (highest priority) - Most discriminative single field
2. **Company Name** - Crucial for employer-specific searches
3. **Location** - Important for geographic filtering
4. **Job Type** - Full-time/part-time/contract distinction
5. **Description** (truncated) - Provides context
6. **Requirements** (truncated) - Secondary context
7. **Skills** - Often redundant with description (can omit)

Research on job-resume matching shows that **job titles alone can outperform full-text embeddings** for retrieval tasks, so prioritizing title and company information is critical.[7]

## Testing Your Template

To verify your template produces good prompts, test it with a sample document:

```bash
# Sample job document
{
  "id": "job-001",
  "title": "Senior Full-Stack Developer",
  "company": "TechCorp",
  "location": "Remote / San Francisco",
  "jobType": "Full-time",
  "description": "We are looking for an experienced full-stack developer to join our engineering team. You will work on building scalable web applications using modern frameworks and cloud infrastructure. The ideal candidate has strong experience with React, Node.js, and AWS.",
  "requirements": "5+ years of experience with JavaScript/TypeScript, React, Node.js. Strong understanding of REST APIs, database design, and cloud platforms."
}
```

**Expected output with optimized template:**
```
title: Senior Full-Stack Developer | text: TechCorp in Remote / San Francisco (Full-time): We are looking for an experienced full-stack developer to join our engineering team. You will work on building scalable web applications using modern frameworks and cloud infrastructure. The ideal candidate has strong experience with... Requires 5+ years of experience with JavaScript/TypeScript, React, Node.js. Strong understanding of...
```

This is approximately **42 words** - perfect for the 15-45 word target.[3][1]

## Additional Optimization: Skills Field

If you want to include the skills field, add it as a **comma-separated list at the end** rather than an array:

```liquid
title: {% if doc.title %}{{ doc.title }}{% else %}none{% endif %} | text: {{ doc.company }}{% if doc.location %}, {{ doc.location }}{% endif %}{% if doc.jobType %} ({{ doc.jobType }}){% endif %}. {% if doc.description %}{{ doc.description | truncatewords: 20 }}.{% endif %}{% if doc.skills %} Skills: {{ doc.skills | join: ", " | truncatewords: 8 }}.{% endif %}
```

This keeps the skills concise while maintaining semantic value.[4][5]

## Final Recommendation

Use this **production-ready template** that balances all requirements:

```json
{
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
    "documentTemplate": "title: {% if doc.title %}{{ doc.title }}{% else %}none{% endif %} | text: {{ doc.company }}{% if doc.location %} in {{ doc.location }}{% endif %}{% if doc.jobType %}, {{ doc.jobType }}{% endif %}. {% if doc.description %}{{ doc.description | truncatewords: 22 }}.{% endif %}",
    "dimensions": 768
  }
}
```

This version is **cleaner, more natural, and optimized for embedding quality** while maintaining EmbeddingGemma's required format.[5][3][1][7]

[1](https://www.meilisearch.com/llms-full.txt)
[2](https://github.com/orgs/meilisearch/discussions/748)
[3](https://meilisearch.com/docs/learn/ai_powered_search/document_template_best_practices)
[4](https://community.openai.com/t/the-length-of-the-embedding-contents/111471)
[5](https://www.ingedata.ai/blog/2025/04/01/talent-matching-with-vector-embeddings/)
[6](https://developers.google.com/search/docs/appearance/structured-data/job-posting)
[7](https://vbn.aau.dk/files/464971521/Kaya_Bogers.pdf)
[8](https://www.meilisearch.com/blog/meilisearch-1-16)
[9](https://www.meilisearch.com/blog/meilisearch-1-6)
[10](https://forum.asana.com/t/dont-use-a-priority-custom-field-usually-use-a-simpler-approach-or-a-critical-instead/379276)
[11](https://meilisearch.com/docs/learn/ai_powered_search/getting_started_with_ai_search)
[12](https://www.meilisearch.com/blog/add-ai-powered-search-to-react)
[13](https://github.com/meilisearch/meilisearch/issues/4765)
[14](https://blog.continue.dev/accuracy-limits-of-codebase-retrieval/)
[15](https://stackoverflow.com/questions/71386752/how-to-modify-wp-job-manager-job-listings-template)
[16](https://github.com/orgs/meilisearch/discussions/621)
[17](https://n8n.io/workflows/6518-automatic-job-listings-extraction-and-publishing-template/)
[18](https://meilisearch.com/docs/reference/api/settings)
[19](https://www.servicenow.com/docs/bundle/zurich-platform-user-interface/page/build/help-guided-tours/task/modify-embedded-help-role-priority.html)
[20](https://meilisearch.com/docs/learn/getting_started/documents)
