import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Poll } from '@/lib/types'

/**
 * PollsPage (Server Component)
 * ----------------------------
 * Lists all polls from the database and shows action links to view, vote,
 * or see results. This page performs server-side data fetching with the
 * Supabase server client so it renders with fresh data on each request.
 *
 * Where used:
 * - URL: `/polls`
 * - Used by contributors to see available polls and navigate to create/new
 *   poll flows or analytics.
 */
export default async function PollsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: polls, error } = await supabase.from('polls').select('*')

  if (error) {
    console.error('Error fetching polls:', error)
    return <p>Error loading polls.</p>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Polls</h1>
            <p className="mt-2 text-gray-600 hover:text-cyan-700 hover:text-2xl">Browse and participate in polls</p>
          </div>
          <Link href="/polls/new">
            <Button  className='text-gray-900 cursor-pointer'>Create New Poll</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(polls as Poll[]).map((poll) => (
            <div key={poll.id} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-200 ease-in-out">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {poll.title}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  (poll as any).is_active || (poll as any).isActive
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {(poll as any).is_active || (poll as any).isActive ? 'Active' : 'Closed'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                {/* totalVotes can be stored on poll or computed elsewhere; guard with fallback */}
                <p>{(poll as any).totalVotes || 0} votes</p>
                <p>Created {new Date((poll as any).createdAt || (poll as any).created_at).toLocaleDateString()}</p>
              </div>
              
              <div className="flex gap-2">
                <Link href={`/polls/${poll.id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-emerald-500 hover:bg-emerald-300 text-white font-bold rounded hover:shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50" >
                    View Poll
                  </Button>
                </Link>
                <Link href={`/polls/${poll.id}/results`}>
                  <Button variant="ghost" size="sm" className='text-emerald-600 hover:text-indigo-300 cursor-pointer'>
                    Results
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {polls && polls.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No polls found</h3>
            <p className="text-gray-600 mb-4">Be the first to create a poll!</p>
            <Link href="/polls/new">
              <Button>Create Your First Poll</Button>
            </Link>
          </div>
        )}

        {polls && polls.length > 0 && (
          <div className="flex justify-start mt-8">
            <Link href="/polls/chart">
              <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                View All Polls Chart
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
