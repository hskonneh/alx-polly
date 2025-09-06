'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Poll, PollOption } from '@/lib/types'

interface PollVoteFormProps {
  poll: Poll
}

export default function PollVoteForm({ poll }: PollVoteFormProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleVote = async () => {
    if (!selectedOption) {
      setError('Please select an option to vote.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/polls/${poll.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ optionId: selectedOption }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to cast vote.')
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select your answer:</h3>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {poll.options.map((option: PollOption) => (
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
            <p className="text-gray-800 font-medium">{option.text}</p>
          </div>
        </label>
      ))}
      <Button
        onClick={handleVote}
        disabled={!selectedOption || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Vote'}
      </Button>
    </div>
  )
}
