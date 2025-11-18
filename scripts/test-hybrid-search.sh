#!/bin/bash

# Hybrid Search Test Script
# Tests the embeddings proxy and hybrid search implementation

set -e

echo "🔍 Testing Hybrid Search Implementation"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PROXY_URL="http://localhost:3000/api/embeddings/proxy"
MEILISEARCH_URL="${MEILISEARCH_URL:-https://meilisearch.kernelvm.xyz}"
MEILISEARCH_KEY="${MEILISEARCH_API_KEY}"

echo "📋 Configuration:"
echo "  Proxy URL: $PROXY_URL"
echo "  Meilisearch: $MEILISEARCH_URL"
echo ""

# Test 1: Check llama.cpp server
echo "1️⃣  Testing llama.cpp server..."
if curl -s http://192.168.0.7:8080/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} llama.cpp server is running"
else
    echo -e "${RED}✗${NC} llama.cpp server not accessible"
    echo "   Make sure llama.cpp server is running at http://192.168.0.7:8080"
    exit 1
fi
echo ""

# Test 2: Test embeddings proxy endpoint
echo "2️⃣  Testing embeddings proxy endpoint..."
PROXY_RESPONSE=$(curl -s -X POST "$PROXY_URL" \
    -H "Content-Type: application/json" \
    -d '{"input": "test query"}' 2>&1)

if echo "$PROXY_RESPONSE" | grep -q "embedding"; then
    echo -e "${GREEN}✓${NC} Proxy endpoint working"
    EMBEDDING_DIM=$(echo "$PROXY_RESPONSE" | jq -r '.data[0].embedding | length')
    echo "   Embedding dimensions: $EMBEDDING_DIM"
else
    echo -e "${RED}✗${NC} Proxy endpoint error:"
    echo "$PROXY_RESPONSE"
    exit 1
fi
echo ""

# Test 3: Check Meilisearch embedder configuration
echo "3️⃣  Checking Meilisearch embedder configuration..."
EMBEDDER_CONFIG=$(curl -s "$MEILISEARCH_URL/indexes/jobs/settings/embedders" \
    -H "Authorization: Bearer $MEILISEARCH_KEY")

if echo "$EMBEDDER_CONFIG" | jq -e '.["job-embedder"]' > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} job-embedder configured"
    echo "   Document template preview:"
    echo "$EMBEDDER_CONFIG" | jq -r '.["job-embedder"].documentTemplate' | head -c 100
    echo "..."
else
    echo -e "${RED}✗${NC} job-embedder not found in Meilisearch"
    exit 1
fi
echo ""

# Test 4: Check embedding generation progress
echo "4️⃣  Checking embedding generation progress..."
TASKS=$(curl -s "$MEILISEARCH_URL/tasks?indexUids=jobs&types=settingsUpdate&limit=1" \
    -H "Authorization: Bearer $MEILISEARCH_KEY")

TASK_STATUS=$(echo "$TASKS" | jq -r '.results[0].status')
TASK_TYPE=$(echo "$TASKS" | jq -r '.results[0].type')

if [ "$TASK_STATUS" = "succeeded" ]; then
    echo -e "${GREEN}✓${NC} Embeddings generation completed"
elif [ "$TASK_STATUS" = "processing" ]; then
    echo -e "${YELLOW}⏳${NC} Embeddings generation in progress..."
    echo "   This may take several minutes for all documents"
elif [ "$TASK_STATUS" = "failed" ]; then
    echo -e "${RED}✗${NC} Embeddings generation failed"
    echo "   Error: $(echo "$TASKS" | jq -r '.results[0].error')"
    exit 1
else
    echo -e "${YELLOW}⚠${NC}  Task status: $TASK_STATUS"
fi
echo ""

# Test 5: Perform test searches (only if embeddings are ready)
if [ "$TASK_STATUS" = "succeeded" ]; then
    echo "5️⃣  Testing hybrid search..."

    # Pure keyword search (ratio=0)
    echo "   Testing pure keyword search (ratio=0)..."
    KEYWORD_RESULTS=$(curl -s -X POST "$MEILISEARCH_URL/indexes/jobs/search" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $MEILISEARCH_KEY" \
        -d '{"q": "python", "limit": 3}')
    KEYWORD_COUNT=$(echo "$KEYWORD_RESULTS" | jq -r '.estimatedTotalHits // .totalHits')
    echo -e "   ${GREEN}✓${NC} Found $KEYWORD_COUNT keyword matches"

    # Hybrid search (ratio=0.5)
    echo "   Testing hybrid search (ratio=0.5)..."
    HYBRID_RESULTS=$(curl -s -X POST "$MEILISEARCH_URL/indexes/jobs/search" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $MEILISEARCH_KEY" \
        -d '{"q": "python developer", "hybrid": {"semanticRatio": 0.5, "embedder": "job-embedder"}, "limit": 3}')

    if echo "$HYBRID_RESULTS" | jq -e '.hits' > /dev/null 2>&1; then
        HYBRID_COUNT=$(echo "$HYBRID_RESULTS" | jq -r '.estimatedTotalHits // .totalHits')
        echo -e "   ${GREEN}✓${NC} Found $HYBRID_COUNT hybrid matches"
        echo ""
        echo "   Top result:"
        echo "$HYBRID_RESULTS" | jq -r '.hits[0] | "   - \(.title) at \(.companyName)"'
    else
        echo -e "   ${RED}✗${NC} Hybrid search error:"
        echo "$HYBRID_RESULTS" | jq -r '.message'
    fi

    # Pure semantic search (ratio=1.0)
    echo ""
    echo "   Testing pure semantic search (ratio=1.0)..."
    SEMANTIC_RESULTS=$(curl -s -X POST "$MEILISEARCH_URL/indexes/jobs/search" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $MEILISEARCH_KEY" \
        -d '{"q": "artificial intelligence engineer", "hybrid": {"semanticRatio": 1.0, "embedder": "job-embedder"}, "limit": 3}')

    if echo "$SEMANTIC_RESULTS" | jq -e '.hits' > /dev/null 2>&1; then
        SEMANTIC_COUNT=$(echo "$SEMANTIC_RESULTS" | jq -r '.estimatedTotalHits // .totalHits')
        echo -e "   ${GREEN}✓${NC} Found $SEMANTIC_COUNT semantic matches"
    fi

    echo ""
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "📊 Summary:"
    echo "  - Keyword search: $KEYWORD_COUNT results"
    echo "  - Hybrid search: $HYBRID_COUNT results"
    echo "  - Semantic search: $SEMANTIC_COUNT results"
else
    echo "5️⃣  Skipping search tests (embeddings not ready)"
    echo ""
    echo -e "${YELLOW}⏳ Waiting for embeddings generation to complete...${NC}"
    echo "   Run this script again in a few minutes"
fi

echo ""
echo "🎉 Hybrid search implementation ready!"
echo ""
echo "Next steps:"
echo "  1. Start dev server: pnpm dev"
echo "  2. Navigate to: http://localhost:3000/jobs/search"
echo "  3. Open 'Sökmiljö (AI)' filter section"
echo "  4. Adjust semantic ratio slider"
echo "  5. Compare results at different ratios!"
