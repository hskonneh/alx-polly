import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Poll, PollOption } from '@/lib/types'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { deletePoll } from '@/lib/actions/deletePoll'
import PollVoteForm from './PollVoteForm' // New Client Component for voting

interface PollPageProps {
  params: { id: string }
}

export default async function PollPage({ params }: PollPageProps) {
  const supabase = await createServerSupabaseClient()
  const { id } = await params

  const { data: poll, error } = await supabase
    .from('polls')
    .select('*, options:poll_options(*)')
    .eq('id', id)
    .single()

  if (error || !poll) {
    console.error('Error fetching poll:', error)
    notFound()
  }

  // normalize options: poll_options have 'option_text'
  const normalizedOptions: PollOption[] = (poll.options || []).map((o: any) => ({
    id: o.id,
    text: o.option_text || o.text || '',
    votes: o.votes || 0,
  }))

  const totalVotes = normalizedOptions.reduce((sum, option) => sum + (option.votes || 0), 0)

  const deletePollWithId = async () => {
    'use server'
    await deletePoll(id)
    redirect('/polls')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/polls" className="text-blue-600 hover:text-blue-500">
            ← Back to Polls
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {poll.title || poll.question}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{totalVotes} total votes</span>
              <span>•</span>
              <span>Created {new Date(poll.created_at || poll.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                poll.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {poll.isActive ? 'Active' : 'Closed'}
              </span>
            </div>
          </div>

          {poll.isActive ? (
            <PollVoteForm poll={{ ...poll, options: normalizedOptions }} />
          ) : (
            <p className="text-gray-700">This poll is closed.</p>
          )}

          <div className="mt-6 flex gap-2">
            <Link href={`/polls/${poll.id}/results`}>
              <Button variant="outline">View Results</Button>
            </Link>
            <Link href={`/polls/${poll.id}/share`}>
              <Button variant="outline">Share Poll</Button>
            </Link>
            <form action={deletePollWithId}>
              <Button variant="destructive" type="submit">Delete Poll</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
