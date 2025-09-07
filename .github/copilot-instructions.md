---
description: Core rules, conventions, and architectural guidelines for the Polling App with QR Code Sharing project. This file is the single canonical guidance used by developers and automated agents to build, test, fix, and maintain the application.
globs:
alwaysApply: false
---

# Polling App — Standard Instructions, Procedures, and Processes

This document is the single source of truth for building, compiling, fixing bugs, running tests, updating dependencies, checking links, and maintaining the Polling App with QR Code Sharing. Agents and developers must follow these rules, conventions, and step-by-step procedures to ensure a robust, consistent, and maintainable codebase.

---

## Project Overview
You are an expert full‑stack developer or automated agent working on the Polling App codebase. The app allows users to register, create polls, and share them via unique links and QR codes so others can vote. Follow this document strictly.

---

## Technology Stack (Do not add new major frameworks without approval)
- Language: **TypeScript**
- Framework: **Next.js (App Router)** — prefer Server Components for data fetching
- Database & Auth: **Supabase**
- Styling: **Tailwind CSS** with shadcn/ui components
- State: Server Components for server state; useState/useReducer in Client Components
- Mutations: Prefer **Next.js Server Actions** for form submissions
- QR Code: e.g., qrcode.react or another minimal dependency for QR code rendering
- Testing: **Jest** + **React Testing Library**
- Linting/Formatting: ESLint + Prettier (configured in repo)

---

## Directory & File Conventions

- app/
  - route segments, pages: `page.tsx`
  - layouts: `layout.tsx`
  - errors: `error.tsx`
  - api routes: `app/api/.../route.ts`
- app/components/
  - UI primitives in `app/components/ui/` (shadcn/ui)
  - Reusable components in `app/components/`
- lib/
  - supabase client, utilities, server actions, types (e.g., `lib/supabaseClient.ts`, `lib/types.ts`, `lib/actions/*`)
- __tests__/
  - Mirror `app/` and `lib/` structure for unit and integration tests
- public/
  - Static assets and generated QR code images if persisted
- next.config.js / next.config.ts, tsconfig.json, package.json at repo root

File naming:
- Components: PascalCase (CreatePollForm.tsx)
- Utilities / actions: camelCase (submitVote.ts)
- Dynamic routes at filesystem level: follow Next.js but validate environment compatibility (see "Windows filename policy" below).

---

## Critical Architectural Rules

1. Server Components for data fetching:
   - Fetch data in Server Components using Supabase client.
   - Do not use useEffect/useState for initial data fetch in page components unless necessary.

2. Mutations:
   - Use Next.js Server Actions for form submissions and other mutations. Avoid client-side fetch POSTs from forms when an action can be used.

3. API Routes:
   - Use only where Server Actions or Route Handlers are required (webhooks, non-React consumers).
   - Follow Next.js App Router route.ts export conventions.

4. Security:
   - Never hardcode secrets. Use env vars and never commit .env files.
   - Use process.env.NEXT_PUBLIC_* for variables safe to expose to the client; server-only secrets must not have NEXT_PUBLIC_ prefix.

5. Type Safety:
   - Strongly type all public interfaces. Add or update types in `lib/types.ts`.

6. Error Handling:
   - Use try/catch in Server Actions and Route Handlers.
   - Provide user-friendly messages and log details to server logs.
   - Use `error.tsx` route segment to render route-level errors.

7. Build & CI:
   - The default CI must run: lint, type-check, tests, and build. Fail the pipeline on errors.

8. **Full CRUD Operations with Supabase (Real-time Data)**:
   - **Read (R)**: All data fetching for display must occur in Server Components using the Supabase client to retrieve real-time data directly from the database. Avoid client-side `useEffect` for initial data loads.
   - **Create (C), Update (U), Delete (D)**: All data mutations (insertions, modifications, deletions) must be handled via Next.js Server Actions. These actions will interact directly with the Supabase client to perform the necessary database operations.
   - **Real-time Data Policy**: The application is designed to operate exclusively with live data from the configured Supabase database. Mock data should only be used for isolated unit tests where database interaction is explicitly mocked, not for core application functionality or development beyond initial UI scaffolding.

---

## Windows Filename Policy (important)
Some Windows environments block special characters in filenames (e.g., square brackets). Next.js dynamic routes use bracketed folder names (e.g., `app/polls/[id]/page.tsx`). If your environment blocks such names:

Options:
- Preferred: configure your editor/OS policy to allow bracketed names (safe when repository origin is trusted).
- Alternative: use a neutral folder name (e.g., `app/polls/id/page.tsx` or `app/polls/_id/page.tsx`) and map routes accordingly. If you choose this path, document the deviation and ensure route generation and Link hrefs use the mapped path consistently.
- Document any deviation in a short README at repo root describing the reason and the mapping.

---

## Development Workflows & Commands

- Install:
  - npm ci (or npm install --legacy-peer-deps if peer conflicts)
- Development:
  - npm run dev (http://localhost:3000)
- Type check:
  - npm run build (or tsc --noEmit)
- Tests:
  - npm test (unit + integration)
  - npm run test:watch
  - npm run test:coverage
- Lint & Format:
  - npm run lint
  - npm run format
- Production:
  - npm run build && npm start

CI: Ensure pipeline steps in this order: install, lint, typecheck, tests, build.

---

## Step-by-Step Procedures

These are prescriptive procedures an automated agent or developer must follow for common tasks.

### 1) Adding a New Feature (e.g., Poll creation flow)
1. Create types in lib/types.ts.
2. Add server action in lib/actions/createPoll.ts (exported async function).
3. Add UI component in app/components/CreatePollForm.tsx (Client Component if it uses hooks).
4. Add page route in app/polls/new/page.tsx that renders the form (Server Component preferred).
5. Ensure Server Action is used by the form:
   - Use <form action={createPoll}> pattern for Server Actions.
6. Add tests in __tests__/components and __tests__/lib/actions.
7. Run lint, typecheck, tests, build locally. Fix issues.
8. Open PR with description, checklist, testing notes.

### 2) Fixing a Bug in Data Fetching (e.g., client-side fetch failing)
1. Reproduce locally and inspect Network tab.
2. Verify correct endpoint path (trailing slash vs no trailing slash). Use absolute or basePath-aware URLs when needed.
3. Prefer moving fetching into a Server Component using Supabase client instead of client-side useEffect.
4. If client fetch is required, improve error details:
   - Read response body for error messages before throwing.
   - Log server-side errors.
5. Update tests covering the data flow.
6. Document the root cause in the PR.

Example fetch pattern improvement:
```ts
const res = await fetch('/api/polls')
if (!res.ok) {
  const body = await res.text().catch(() => null)
  throw new Error(body || `Failed to fetch polls (status ${res.status})`)
}
```

### 3) Handling Dynamic Route Param Promise Errors (Next.js >= v15 behavior)
- Problem: params may be a Promise in route components. Attempting to directly destructure params (e.g., `const { id } = params`) may throw.
- Preferred fix: In server components, await params if provided as a promise; in client components use React.use(paramsPromise).
- Example (client component):
```ts
import React from 'react'
export default function Page(props: { params: Promise<{ id: string }> | { id: string } }) {
  const params = React.use(props.params)
  const { id } = params
  // ...
}
```
- Document where components are Server vs Client and unwrap accordingly.

### 4) Dependency Updates
1. Run `npm outdated` to see updates.
2. For minor/patch updates, run `npm update`.
3. For major updates, test locally in a feature branch:
   - Update package.json
   - Run lint, build, tests
   - Resolve breaking changes (read release notes)
4. Update lockfile and open PR with changelog references.

### 5) Checking & Updating Broken Links
1. Run a link-checker (CI job) that crawls built site or tests known route list.
2. For each broken link:
   - Verify intended target exists and the path is correct.
   - Update Link hrefs and API calls.
3. Add test coverage for high-value routes.

---

## Error Handling & Debugging Practices

- Always include context in thrown errors (status codes, route names).
- Server Actions and API routes must return structured JSON for errors: { error: string, code?: string }.
- Client code should surface friendly messages and optionally log technical details to console only in development.
- Use Next.js route-level error.tsx to show graceful error UI for route failures.

---

## Testing & Coverage

- Unit tests for utilities and components.
- Integration tests for pages and API routes (supabase can be mocked or use test instance).
- End-to-end (optional) using Playwright for core user flows: create poll, vote, view results, share via QR.
- Aim for >=80% coverage on critical modules (auth, poll creation, voting).

---

## Code Review Checklist (must be completed before merge)

- Type safety: No any types unless justified and documented.
- Uses Server Components for data fetching where appropriate.
- Uses Server Actions for mutations where possible.
- Supabase client isn’t initialized per request incorrectly (singleton pattern in lib).
- No secrets in code.
- Tests added/updated and passing.
- Lint and format checks are clean.
- No console.debug left in production code.
- README and migration notes updated if structure changed.

---

## Maintenance & Housekeeping

- Rotate and audit dependencies quarterly.
- Keep Tailwind and shadcn/ui versions in sync with project styles.
- Periodically run link-check and test-suite on staging.
- Maintain an upgrade guide for major framework changes (e.g., Next.js breaking changes).
- Document any environment-specific workarounds (Windows filename issues) in README.

---

## Examples & Templates

- Server Action (create poll)
```ts
// lib/actions/createPoll.ts
import { createServerClient } from './supabaseClient'
export async function createPoll(formData: FormData) {
  'use server'
  try {
    // validate, insert, return created poll
  } catch (err) {
    // structured error
    throw new Error('Could not create poll')
  }
}
```

- Fetch error handling (client)
```ts
const res = await fetch('/api/polls')
if (!res.ok) {
  const body = await res.text().catch(() => null)
  throw new Error(body || `Failed to fetch polls (status ${res.status})`)
}
```

---

## Verification Checklist (final gating)

Before finishing any work, ensure:
- Uses Next.js App Router and Server Components for data fetching where appropriate.
- Server Actions used for data mutations (forms).
- Supabase client used for DB interactions and is not leaking secrets to client.
- shadcn/ui is used for UI primitives where appropriate.
- Environment variables in place; no secrets hardcoded.
- Lint/type/test/build pass in CI.

---

## Appendices

- Migration note: If your environment (Windows/Editor) rejects bracketed folder names, document the alternative folder naming and update route/link generation accordingly.
- Troubleshooting common errors:
  - "Failed to fetch polls" — check endpoint path, server status, CORS, and trailing slash.
  - "params is a Promise" — unwrap via await in Server Components or React.use in Client Components.
  - "Could not open page.tsx" on Windows — rename or allow bracketed names; keep mapping documented.

---

End of canonical instructions. Follow these procedures exactly unless an explicit exception is authorized and documented in the PR description.