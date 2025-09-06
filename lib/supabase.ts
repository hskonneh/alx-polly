import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Create a Supabase client for use in the browser (client components).
 *
 * Use this in client-side React components when you need to call
 * Supabase from the browser (for example, to subscribe to real-time
 * channels or perform client-initiated auth flows).
 */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
