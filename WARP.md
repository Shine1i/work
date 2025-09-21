# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands (bun)

- Install: bun install
- Dev server: bun dev (http://localhost:3000)
- Build: bun build
- Run built server: bun start
- Lint: bun lint
- Format: bun format
- Type-check: bun check-types (or run all: bun check)

Database and auth utilities:

- Drizzle Kit: bun db <command>
  - Examples: bun db push, bun db generate, bun db studio
- Auth CLI: bun auth:secret, bun auth:generate (updates src/lib/db/schema/auth.schema.ts from src/lib/auth/auth.ts)
- UI scaffolding (shadcn/ui): bun ui add <component>

Tests: No test runner is configured in package.json at this time.

Environment:

- Copy .env.example to .env and set at minimum:
  - DATABASE_URL
  - BETTER_AUTH_SECRET
  - VITE_BASE_URL (defaults to http://localhost:3000)
  - Optional OAuth: GITHUB_CLIENT_ID/SECRET, GOOGLE_CLIENT_ID/SECRET
- OAuth callback/redirect: http://localhost:3000/api/auth/callback/<provider>

## Architecture overview

- Build/runtime
  - React 19 with React Compiler (via babel-plugin-react-compiler in viteReact plugin)
  - Vite 7 + @tanstack/react-start plugin; Node server build outputs to .output/server
  - Tailwind CSS v4 via @tailwindcss/vite; global styles in src/styles.css
  - TS path alias: ~/_ -> src/_ (tsconfig.json)
- Routing and data
  - File-based routes in src/routes with route groups:
    - \_\_root.tsx: Root document; prefetches auth user (authQueryOptions); injects app CSS; mounts devtools; wraps with ThemeProvider and Sonner
    - (authenticated)/route.tsx: Guarded layout; beforeLoad ensures user (ensureQueryData) and redirects to /login if absent
    - (auth-pages)/route.tsx: Public auth pages; redirects authenticated users to /dashboard
    - index.tsx: Home page example with Suspense + auth-aware UI
  - Router setup (src/router.tsx):
    - Creates QueryClient with defaults; Router context { queryClient, user }
    - Integrates SSR ↔ React Query via setupRouterSsrQueryIntegration
- Server functions
  - Use createServerFn for server endpoints (e.g., src/lib/auth/functions.ts $getUser)
  - Access request with getWebRequest; add auth via authMiddleware (src/lib/auth/middleware.ts)
- Authentication
  - Better Auth configured in src/lib/auth/auth.ts with drizzleAdapter(db) and reactStartCookies; session cookieCache enabled
  - API proxy at src/routes/api/auth/$.ts forwards GET/POST to auth.handler
  - Client auth via src/lib/auth/auth-client.ts; example sign-out logic updates React Query cache and invalidates router
- Database
  - Drizzle ORM over postgres-js; db instance in src/lib/db/index.ts; schemas in src/lib/db/schema/
  - Drizzle Kit config in drizzle.config.ts (url from env.DATABASE_URL)
- Environment
  - @t3-oss/env-core: src/env/server.ts (server vars) and src/env/client.ts (client vars, prefixed VITE\_)
- Styling/UI
  - Theme system in src/components/theme-provider.tsx + ThemeToggle; UI primitives live under src/components/ui; additional components in src/components/magicui and components/hero

## Notable configs

- package.json scripts define the commands above
- vite.config.ts wires TanStack Start, React Compiler, Tailwind, and tsconfig paths
- eslint.config.js is a flat config using TypeScript ESLint + TanStack Router/Query plugins + Prettier
- tsconfig.json defines ~/\* path alias

## Notes from README

- Based on TanStack Start (beta) and TanStack Devtools (alpha); related APIs may change
