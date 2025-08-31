'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'

// Mock data - replace with actual API call
const mockPoll = {
  id: '1',
  question: 'What is your favorite programming language?',
  options: [
    { id: '1', text: 'JavaScript', votes: 45 },
    { id: '2', text: 'Python', votes: 38 },
    { id: '3', text: 'TypeScript', votes: 32 },
    { id: '4', text: 'Java', votes: 25 },
    { id: '5', text: 'C++', votes: 16 }
  ],
  totalVotes: 156,
  isActive: true,
  createdAt: '2024-01-15T10:30:00Z'
}

export default function PollPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pollId, setPollId] = useState<string>('')

  // Handle async params
  useEffect(() => {
    params.then(({ id }) => setPollId(id))
  }, [params])

  const handleVote = async () => {
    if (!selectedOption) return
    
    setIsSubmitting(true)
    
    // TODO: Implement actual voting logic
    console.log('Voting for option:', selectedOption)
    
    // Simulate API call
    setTimeout(() => {
      setHasVoted(true)
      setIsSubmitting(false)
    }, 1000)
  }

  const totalVotes = mockPoll.options.reduce((sum, option) => sum + option.votes, 0)

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
              {mockPoll.question}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{totalVotes} total votes</span>
              <span>•</span>
              <span>Created {new Date(mockPoll.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                mockPoll.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {mockPoll.isActive ? 'Active' : 'Closed'}
              </span>
            </div>
          </div>

          {!hasVoted && mockPoll.isActive ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Select your answer:</h3>
              {mockPoll.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedOption === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="poll-option"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{option.text}</span>
                  </div>
                  {selectedOption === option.id && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </label>
              ))}
              
              <div className="pt-4">
                <Button
                  onClick={handleVote}
                  disabled={!selectedOption || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Results:</h3>
              {mockPoll.options.map((option) => {
                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0
                return (
                  <div key={option.id} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{option.text}</span>
                      <span className="text-sm text-gray-600">
                        {option.votes} votes ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              
              {hasVoted && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">Thank you for voting!</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              <Link href={`/polls/${pollId}/results`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Detailed Results
                </Button>
              </Link>
              <Link href={`/polls/${pollId}/share`}>
                <Button variant="ghost">
                  Share Poll
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
