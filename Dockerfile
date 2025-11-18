# Use official Node.js LTS image
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# Install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json package-lock.json* /temp/dev/
RUN cd /temp/dev && npm ci

# Install production dependencies only
RUN mkdir -p /temp/prod
COPY package.json package-lock.json* /temp/prod/
RUN cd /temp/prod && npm ci --omit=dev

# Build application
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
# Pre-generate route tree
RUN npx @tanstack/router-cli generate
RUN npm run build

# Production image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/.output .output
COPY --from=prerelease /usr/src/app/package.json .

USER node
EXPOSE 3000/tcp
CMD ["node", ".output/server/index.mjs"]
