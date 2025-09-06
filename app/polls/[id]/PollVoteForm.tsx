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

    /**
     * PollVoteForm (Client Component)
     * --------------------------------
     * Renders a radio list of options and posts the selected option to the
     * backend vote API. This component uses client state for the selected
     * option and loading/error UI. It's purposely a Client Component because
     * it interacts with browser APIs (window.location) and form events.
     *
     * Inputs:
     * - poll: Poll object with `options` array. Options may come from a server
     *   fetch and are normalized higher in the tree.
     *
     * Output / Side effect:
     * - POSTs to `/api/polls/:id/vote` and navigates to the results page on
     *   success. In future, this could use optimistic updates or a Server
     *   Action instead of client POST.
     */
  
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
    {/* Ensure options is always an array - upstream pages should normalize this
      but guard here in case of missing relations from Supabase */}
    {(poll.options || []).map((option: PollOption) => (
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
