'use client'

import { useState } from 'react'
import { Button } from './ui/button'

interface PollOption {
  id: string
  text: string
}

export default function PollForm() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ])

  const addOption = () => {
    const newId = (options.length + 1).toString()
    setOptions([...options, { id: newId, text: '' }])
  }

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id))
    }
  }

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text } : option
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement poll creation logic
    console.log('Creating poll:', { question, options })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Poll</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Poll Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to ask?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poll Options
          </label>
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.id} className="flex gap-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  placeholder={`Option ${option.id}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(option.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addOption}
            className="mt-3"
          >
            Add Option
          </Button>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1">
            Create Poll
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
