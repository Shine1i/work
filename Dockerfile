FROM oven/bun:1.1.20-slim AS base
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile --ignore-scripts

# Copy source code
COPY . .

# Build application
RUN bun run build

# Expose port
EXPOSE 3000

# Start application
CMD ["bun", "run", "start"]
