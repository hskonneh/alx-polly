import { createServerSupabaseClient } from './supabase-server'
import { redirect } from 'next/navigation'

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient()
  
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  return user
}

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
