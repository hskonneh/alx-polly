import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Create a Supabase client configured for server-side usage in Next.js.
 *
 * This helper wires Supabase to Next's cookie store so auth flows work
 * in Server Components and Route Handlers. It intentionally wraps cookie
 * operations in try/catch blocks because some cookie operations may be
 * invoked in contexts where Next's cookie write API is not available.
 *
 * Returns: a Supabase client instance scoped to the current request.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      // Read cookie value from Next's cookie store
      get(name: string) {
        return cookieStore.get(name)?.value
      },

      // Writes may fail in certain Server Component contexts; swallow
      // errors so UI rendering isn't blocked. If your app needs to write
      // cookies from server components, add middleware or route handlers
      // that perform session refreshes instead.
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set(name, value, options)
        } catch {
          // Intentionally ignored: best-effort cookie write in server-only
          // rendering environments.
        }
      },

      // Removing a cookie is implemented by setting it with maxAge 0.
      // The same try/catch applies as for `set`.
      remove(name: string, options: any) {
        try {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        } catch {
          // Ignored for the same reasons as `set` above.
        }
      },
    },
  })
}


