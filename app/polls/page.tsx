import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

// Mock data - replace with actual API call
const mockPolls = [
  {
    id: '1',
    question: 'What is your favorite programming language?',
    totalVotes: 156,
    createdAt: '2024-01-15T10:30:00Z',
    isActive: true
  },
  {
    id: '2',
    question: 'Which framework do you prefer for frontend development?',
    totalVotes: 89,
    createdAt: '2024-01-14T15:45:00Z',
    isActive: true
  },
  {
    id: '3',
    question: 'What is your preferred database?',
    totalVotes: 234,
    createdAt: '2024-01-13T09:20:00Z',
    isActive: false
  }
]

export default function PollsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Polls</h1>
            <p className="mt-2 text-gray-600">Browse and participate in polls</p>
          </div>
          <Link href="/polls/new">
            <Button >Create New Poll</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPolls.map((poll) => (
            <div key={poll.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {poll.question}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  poll.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {poll.isActive ? 'Active' : 'Closed'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <p>{poll.totalVotes} votes</p>
                <p>Created {new Date(poll.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div className="flex gap-2">
                <Link href={`/polls/${poll.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Poll
                  </Button>
                </Link>
                <Link href={`/polls/${poll.id}/results`}>
                  <Button variant="ghost" size="sm">
                    Results
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {mockPolls.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No polls found</h3>
            <p className="text-gray-600 mb-4">Be the first to create a poll!</p>
            <Link href="/polls/new">
              <Button>Create Your First Poll</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
