# Authentication Setup Guide

This guide will help you set up user authentication for your Next.js polling app using Supabase.

## Prerequisites

1. A Supabase account and project
2. Node.js and npm installed
3. Next.js project with App Router

## Step 1: Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to Settings > API
3. Copy your project URL and anon key

## Step 2: Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values from your Supabase project.

## Step 3: Install Dependencies

The following packages have been installed:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Step 4: Authentication Features

### Components Created

1. **AuthContext** (`app/contexts/AuthContext.tsx`)
   - Manages user authentication state
   - Provides sign in, sign up, and sign out functions
   - Handles authentication state changes

2. **ProtectedRoute** (`app/components/ProtectedRoute.tsx`)
   - Wraps pages that require authentication
   - Redirects unauthenticated users to login page
   - Shows loading state while checking authentication

3. **Updated Navigation** (`app/components/Navigation.tsx`)
   - Shows different navigation based on authentication status
   - Displays user email when logged in
   - Provides sign in/sign up links when not authenticated

### Pages Updated

1. **Login Page** (`app/auth/login/page.tsx`)
   - Integrated with Supabase authentication
   - Handles login errors
   - Redirects to intended page after login

2. **Register Page** (`app/auth/register/page.tsx`)
   - Integrated with Supabase authentication
   - Password confirmation validation
   - Email verification flow

### Server-side Utilities

1. **Supabase Client** (`lib/supabase.ts`)
   - Client-side and server-side Supabase clients
   - Handles cookie management for SSR

2. **Auth Utilities** (`lib/auth.ts`)
   - Server-side user authentication helpers
   - `getCurrentUser()` - Get current user in server components
   - `requireAuth()` - Require authentication and redirect if not authenticated
   - `getSession()` - Get current session

3. **Middleware** (`middleware.ts`)
   - Protects routes at the middleware level
   - Handles authentication redirects
   - Manages Supabase session cookies

## Step 5: Usage Examples

### Protecting a Page

```tsx
'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  )
}
```

### Using Authentication in Components

```tsx
'use client'

import { useAuth } from '@/app/contexts/AuthContext'

export default function MyComponent() {
  const { user, signOut } = useAuth()

  if (!user) {
    return <div>Please sign in</div>
  }

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Server-side Authentication

```tsx
import { getCurrentUser } from '@/lib/auth'

export default async function ServerComponent() {
  const user = await getCurrentUser()
  
  if (!user) {
    return <div>Not authenticated</div>
  }

  return <div>Hello, {user.email}!</div>
}
```

## Step 6: Database Setup (Optional)

If you want to store additional user data, you can create a `profiles` table in Supabase:

```sql
create table profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Users can view their own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);
```

## Step 7: Testing

1. Start your development server: `npm run dev`
2. Navigate to `/auth/register` to create a new account
3. Check your email for verification (if enabled in Supabase)
4. Navigate to `/auth/login` to sign in
5. Try accessing protected routes like `/polls/new`

## Security Features

- **Route Protection**: Middleware and component-level protection
- **Session Management**: Automatic session handling with cookies
- **Error Handling**: Proper error messages for authentication failures
- **Loading States**: Loading indicators during authentication checks
- **Redirect Handling**: Redirects to intended page after login

## Customization

You can customize the authentication flow by:

1. Modifying the `AuthContext` to add additional user data
2. Updating the UI components to match your design
3. Adding additional authentication providers (Google, GitHub, etc.)
4. Implementing password reset functionality
5. Adding email verification handling

## Troubleshooting

1. **Environment Variables**: Make sure your `.env.local` file is in the project root
2. **Supabase URL**: Ensure you're using the correct project URL from Supabase
3. **CORS Issues**: Check your Supabase project settings for allowed origins
4. **Cookie Issues**: Make sure your domain is properly configured in Supabase

For more information, refer to the [Supabase documentation](https://supabase.com/docs).
