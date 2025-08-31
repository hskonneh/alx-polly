'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'
import PollForm from '@/app/components/PollForm'

export default function NewPollPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Poll</h1>
        <PollForm />
      </div>
    </ProtectedRoute>
  )
}
