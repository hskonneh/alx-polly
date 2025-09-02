```markdown
# Copilot Instructions for ALX Polly

This document provides essential guidance for AI coding agents working on the ALX Polly project. Focus on these patterns and workflows to be immediately productive.

## 1. Project Architecture & Data Flow

ALX Polly is a Next.js application using the App Router. Key architectural aspects:

- **Frontend (Next.js App Router)**: Located in the `app/` directory. Pages (`page.tsx`), layouts (`layout.tsx`), and API routes (`api/`) are organized here.
- **API Routes**: Defined under `app/api/`. These act as backend endpoints for the frontend. Examples:
    - `app/api/health/route.ts`: Health check.
    - `app/api/polls/route.ts`: CRUD operations for polls.
    - `app/api/polls/[id]/vote/route.ts`: Handling poll votes.
- **Components**: Reusable React components are in `app/components/`. UI primitives are in `app/components/ui/`.
- **Utility Functions**: Shared logic and types are in the `lib/` directory (`lib/utils.ts`, `lib/types.ts`).
- **Authentication**: Pages for login and registration are in `app/auth/`. The `lib/auth.ts` file is intended for authentication logic.

**Data Flow Example (Poll Creation):**
1. User interacts with `app/polls/new/page.tsx` which renders `app/components/PollForm.tsx`.
2. `PollForm.tsx` makes a `POST` request to `/api/polls`.
3. `app/api/polls/route.ts` handles the request, creates the poll, and returns the new poll data.
4. The frontend then redirects the user to the new poll's page (`/polls/[id]`).

## 2. Critical Developer Workflows

- **Installation**: `npm install --legacy-peer-deps`
- **Development Server**: `npm run dev` (access at `http://localhost:3000`)
- **Testing**:
    - Run all tests: `npm test`
    - Watch mode: `npm run test:watch`
    - Coverage: `npm run test:coverage`
    - Test files are located in the `__tests__/` directory, mirroring the structure of the `app/` and `api/` directories where applicable.
- **Building for Production**: `npm run build` then `npm start`

## 3. Project-Specific Conventions and Patterns

- **Styling**: Uses Tailwind CSS v4. All styling should adhere to Tailwind's utility-first approach.
- **TypeScript**: Strongly typed throughout the project. Ensure all new code is type-safe. Custom types are defined in `lib/types.ts`.
- **API Route Handlers**: Follow Next.js App Router conventions for API routes (e.g., `GET`, `POST` functions exported from `route.ts`).
- **Component Structure**: Functional components are preferred. State management within components uses React's `useState` and `useContext` (e.g., `app/contexts/AuthContext.tsx`).

## 4. Integration Points & External Dependencies

- **Next.js**: Core framework for routing, API routes, and rendering.
- **React**: UI library.
- **Tailwind CSS**: For styling.
- **Jest & React Testing Library**: For all testing. Refer to `jest.config.js` and `jest.setup.js` for configuration.
- **Environment Variables**: Managed via `.env.local` (copied from `env.example`). Critical variables include `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_API_URL`.

## 5. Key Files and Directories

- `app/`: Contains all application-specific code (pages, API routes, components).
- `app/api/`: All backend API route handlers.
- `app/components/`: Reusable UI components.
- `lib/`: Utility functions and shared types.
- `__tests__/`: All test files.
- `package.json`: Project dependencies and scripts.
- `next.config.ts`: Next.js specific configurations.
- `tsconfig.json`: TypeScript compiler settings.

## 6. Rules for Creating a New Poll

1. Only authenticated users can create a new poll.
2. Each poll must have a unique title and at least two options.
3. Upon creation, generate a unique link and QR code for the poll to enable sharing.
4. Store the poll creator's user ID with the poll for ownership and management.
5. Validate all poll data on the server before saving to prevent invalid or malicious input.

```
