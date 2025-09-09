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
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
      // TODO: Implement a toast notification or other user feedback mechanism
      alert('Failed to sign out. Please try again.')
    }
  }

  if (loading) {
    // Minimal skeleton while auth state is determined
    return (
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg border-b border-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white">
                PollPall
              </Link>
            </div>
            <div className="flex items-center">
              <div className="animate-pulse bg-blue-300 h-8 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg border-b border-blue-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              PollPall
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/polls"
                className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
              >
                Polls
              </Link>
              {user && (
                <Link
                  href="/polls/new"
                  className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
                >
                  Create Poll
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-blue-100">
                  Welcome, {user.email}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-sm cursor-pointer border-blue-300 text-blue-100 hover:bg-blue-400 hover:text-white transition-colors duration-200"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-sm text-blue-100 cursor-pointer hover:bg-blue-400 hover:text-white transition-colors duration-200">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="text-sm text-white cursor-pointer bg-blue-400 hover:bg-blue-500 transition-colors duration-200">
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
