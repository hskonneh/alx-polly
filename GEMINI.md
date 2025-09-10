# GEMINI.md - ALX Polly Project

## Project Overview

This is a modern polling application named **ALX Polly**, built with Next.js 15 (using the App Router), React 19, and TypeScript. The backend is powered by Supabase for authentication and database storage, and the UI is styled with Tailwind CSS. The project is fully tested with Jest and React Testing Library.

The application allows users to create, manage, and vote on polls. It also includes features like QR code sharing for polls.

**Key Technologies:**
- **Framework:** Next.js 15.5.2
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS v4, Radix UI
- **Backend:** Supabase (Auth and PostgreSQL)
- **Testing:** Jest, React Testing Library

## Building and Running

### Prerequisites
- Node.js 18+
- A Supabase project (or run without it for limited functionality)

### Environment Variables
Create a `.env.local` file and add your Supabase project URL and anon key:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### Key Commands
The following commands are defined in `package.json`:

- **Install dependencies:**
  ```bash
  npm install --legacy-peer-deps
  ```
- **Run the development server:**
  ```bash
  npm run dev
  ```
  The application will be available at [http://localhost:3000](http://localhost:3000).

- **Run tests:**
  ```bash
  # Run all tests once
  npm test

  # Run tests in watch mode
  npm run test:watch

  # Run tests with coverage report
  npm run test:coverage
  ```

- **Build for production:**
  ```bash
  npm run build
  ```

- **Start the production server:**
  ```bash
  npm start
  ```

- **Lint the codebase:**
  ```bash
  npm run lint
  ```

## Development Conventions

- **App Router:** The project uses the Next.js App Router, with pages and API routes located in the `app/` directory.
- **Server Components:** Most components are React Server Components, fetching data directly on the server.
- **Client Components:** Interactive components that use hooks (`useState`, `useEffect`) are marked with the `'use client'` directive.
- **Server Actions:** Form submissions and mutations are handled by Next.js Server Actions, which are functions marked with `'use server'`.
- **Styling:** Styling is done with Tailwind CSS, and the `clsx` and `tailwind-merge` utilities are used for combining classes.
- **TypeScript:** The project is written in TypeScript and uses strict mode. Type definitions are located in `lib/types.ts`.
- **Supabase Integration:**
  - A server-side Supabase client is created in `lib/supabase-server.ts` for use in Server Components and API routes.
  - A client-side Supabase client is created in `lib/supabase.ts` for use in Client Components.
- **Database:** The database schema is managed through migrations in the `supabase/migrations` directory. Row Level Security (RLS) is enabled on all tables to enforce access control.
- **Testing:** Tests are located in the `__tests__/` directory and follow the naming convention `*.test.ts(x)`.
