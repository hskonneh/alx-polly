import { createServerSupabaseClient } from '@/lib/supabase-server'
import PollResultChart from '@/app/components/PollResultChart'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { PollOption } from '@/lib/types'

interface ChartPoll {
  id: string
  title: string
  isActive: boolean
  options: PollOption[]
  totalVotes: number
}

export default async function PollsChartPage() {
  const supabase = await createServerSupabaseClient()

  try {
    // Get all polls with their options
    const { data: polls, error } = await supabase
      .from('polls')
      .select('*, poll_options(*)')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching polls:', error)
      return <div className="p-4 text-red-600">Error loading polls: {error.message}</div>
    }

    if (!polls || !Array.isArray(polls)) {
      console.error('No polls data returned')
      return <div className="p-4">No polls available.</div>
    }

    // Format data for each poll with proper typing
    // Notes:
    // - Supabase returns nested objects for relationships (poll_options).
    // - We defensively map the nested options to the PollOption shape used
    //   by the chart component to avoid runtime undefined errors.
    const pollsWithData: ChartPoll[] = polls.map(poll => {
      const options = (poll.poll_options || []).map((opt: any): PollOption => ({
        id: opt.id,
        text: opt.option_text || '',
        votes: opt.votes || 0,
      }))

      // Sum votes with explicit numeric guards to avoid NaN from undefined
      const totalVotes = options.reduce((sum: number, opt: PollOption) => sum + (opt.votes || 0), 0)

      return {
        id: poll.id,
        title: poll.title || '',
        isActive: poll.is_active || false,
        options,
        totalVotes
      }
    })

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Poll Charts</h1>
              <p className="mt-2 text-gray-600">Visual representation of all poll results</p>
            </div>
            <Link href="/polls">
              <Button variant="outline">← Back to Polls</Button>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {pollsWithData.map(poll => (
              <div key={poll.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <Link href={`/polls/${poll.id}/results`} className="hover:text-blue-600">
                    <h2 className="text-xl font-semibold text-gray-900">{poll.title}</h2>
                  </Link>
                  <div className="flex gap-2 mt-2 text-sm text-gray-600">
                    <span>{poll.totalVotes} votes</span>
                    <span>•</span>
                    <span className={`${
                      poll.isActive ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {poll.isActive ? 'Active' : 'Closed'}
                    </span>
                  </div>
                </div>
                
                <div className="h-[300px]">
                  <PollResultChart
                    question={poll.title}
                    options={poll.options}
                    totalVotes={poll.totalVotes}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in PollsChartPage:', error)
    return (
      <div className="p-4 text-red-600">
        An unexpected error occurred. Please try again later.
      </div>
    )
  }
}

