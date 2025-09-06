'use client'

import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * ProtectedRoute
 * --------------
 * Client component wrapper used to guard UI that should only be visible
 * to authenticated users. It relies on `useAuth` context to check
 * authentication state and will redirect to `/auth/login` when no user is
 * present.
 *
 * Where used:
 * - Wrap pages or components that require a signed-in user (for example,
 *   `app/polls/new/page.tsx` can render its form inside this wrapper).
 */
export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // When loading finishes, redirect to login if there's no user
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    // Show a spinner while auth status is being determined
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    // When not authenticated, show a fallback UI or a simple Access Denied message
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  // Authenticated: render children
  return <>{children}</>
}
