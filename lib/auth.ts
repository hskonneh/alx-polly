import { createServerSupabaseClient } from './supabase-server'
import { redirect } from 'next/navigation'

/**
 * Retrieve the currently authenticated user from Supabase.
 *
 * Returns the user object if authenticated, or `null` if not.
 */
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    // Return null on any error so callers can decide how to handle it
    return null
  }

  return user
}

/**
 * Guard for route-level server components: redirect to login when no user.
 *
 * This helper throws a client-side redirect if the user is not found.
 */
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    // Next's redirect will short-circuit server rendering and navigate
    redirect('/auth/login')
  }

  return user
}

/**
 * Retrieve the current session object from Supabase.
 *
 * Returns the session or `null` when unavailable.
 */
export async function getSession() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    return null
  }

  return session
}
