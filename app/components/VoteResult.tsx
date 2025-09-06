 'use client'

/**
 * VoteResult
 * ----------
 * Displays a list of poll options with vote counts and a visual progress
 * bar (percentage). Expects the `options` prop to contain `percentage`
 * already calculated (0-100). This component is typically used in the
 * results page and accepts server-fetched data shaped by the server
 * component.
 *
 * Where used:
 * - `app/polls/[id]/results/page.tsx` to render poll outcomes.
 */
interface VoteOption {
  id: string
  text: string
  votes: number
  percentage: number
}

interface VoteResultProps {
  question: string
  options: VoteOption[]
  totalVotes: number
}

export default function VoteResult({ question, options, totalVotes }: VoteResultProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{question}</h2>
      <p className="text-sm text-gray-600 mb-6">Total votes: {totalVotes}</p>
      
      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.id} className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">{option.text}</span>
              <span className="text-sm text-gray-600">
                {option.votes} votes ({option.percentage.toFixed(1)}%)
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${option.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Poll Results</span>
          <span>Updated just now</span>
        </div>
      </div>
    </div>
  )
}
