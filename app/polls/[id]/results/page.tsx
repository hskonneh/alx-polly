import VoteResult from '@/app/components/VoteResult'
import PollResultChart from '@/app/components/PollResultChart'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { PollOption } from '@/lib/types'

export default async function PollResultsPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: poll, error } = await supabase
    .from('polls')
    .select('*, options:poll_options(*)') // Aliased poll_options to options
    .eq('id', id)
    .single()

  if (error || !poll) {
    console.error('Error fetching poll results:', error)
    notFound()
  }

  const normalizedOptions: PollOption[] = (poll.options || []).map((o: any) => ({
    id: o.id,
    text: (o.option_text || o.text || '').toString(),
    votes: typeof o.votes === 'number' ? o.votes : 0,
    percentage: 0,
  }))

  const totalVotes = normalizedOptions.reduce((sum, option) => sum + (option.votes || 0), 0)

  const optionsWithPercentage = normalizedOptions.map((option) => ({
    ...option,
    percentage: totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100,
  }))

  // Sort options by votes in descending order for leading option display
  const sortedOptions = [...optionsWithPercentage].sort((a, b) => (b.votes || 0) - (a.votes || 0))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href={`/polls/${id}`} className="text-blue-600 hover:text-blue-500">
            ← Back to Poll
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Poll Results</h1>
          <p className="mt-2 text-gray-600">
            Detailed results and analytics for this poll
          </p>
        </div>

        <VoteResult
          question={poll.title || poll.question}
          options={optionsWithPercentage}
          totalVotes={totalVotes}
        />

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vote Distribution</h3>
          <div className="h-[400px]">
            <PollResultChart
              question={poll.title || poll.question}
              options={optionsWithPercentage}
              totalVotes={totalVotes}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Votes:</span>
                <span className="font-medium">{totalVotes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Options:</span>
                <span className="font-medium">{normalizedOptions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Leading Option:</span>
                <span className="font-medium">{sortedOptions[0]?.text || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link href={`/polls/${id}/share`} className="block">
                <Button className="w-full text-gray-700 hover:cursor-pointer hover:text-blue-500">Share Results</Button>
              </Link>
              <Link href={`/polls/${id}`} className="block">
                <Button variant="outline" className="w-full">View Poll</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
