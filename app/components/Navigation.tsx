'use client'

/**
 * Navigation
 * ----------
 * Top navigation bar for the app. Shows different links depending on
 * authentication state. Uses `useAuth` context to access `user`, `loading`,
 * and `signOut` helpers.
 *
 * Where used:
 * - Imported into the root layout (`app/layout.tsx`) so it appears on every page.
 *
 * Behavior notes:
 * - While `loading` is true the component renders a skeleton state.
 * - When `user` is present it shows a welcome message and a Sign Out button.
 * - When no `user` it shows Sign In / Sign Up actions.
 */
import Link from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'
import { Button } from '@/app/components/ui/button'

export default function Navigation() {
  const { user, signOut, loading } = useAuth()

  // Sign out action delegates to AuthContext which talks to Supabase
  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    // Minimal skeleton while auth state is determined
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                ALX Polly
              </Link>
            </div>
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              PollPall
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/polls"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Polls
              </Link>
              {user && (
                <Link
                  href="/polls/new"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create Poll
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.email}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-sm cursor-pointer"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-sm text-gray-700 cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="text-sm text-gray-700 cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
