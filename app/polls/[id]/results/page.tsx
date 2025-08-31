import VoteResult from '@/app/components/VoteResult'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

// Mock data - replace with actual API call
const mockPollResults = {
  question: 'What is your favorite programming language?',
  options: [
    { id: '1', text: 'JavaScript', votes: 45, percentage: 28.8 },
    { id: '2', text: 'Python', votes: 38, percentage: 24.4 },
    { id: '3', text: 'TypeScript', votes: 32, percentage: 20.5 },
    { id: '4', text: 'Java', votes: 25, percentage: 16.0 },
    { id: '5', text: 'C++', votes: 16, percentage: 10.3 }
  ],
  totalVotes: 156
}

export default async function PollResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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
          question={mockPollResults.question}
          options={mockPollResults.options}
          totalVotes={mockPollResults.totalVotes}
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Votes:</span>
                <span className="font-medium">{mockPollResults.totalVotes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Options:</span>
                <span className="font-medium">{mockPollResults.options.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Leading Option:</span>
                <span className="font-medium">{mockPollResults.options[0].text}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link href={`/polls/${id}/share`} className="block">
                <Button className="w-full">Share Results</Button>
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
