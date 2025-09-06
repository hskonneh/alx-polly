'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'
import PollForm from '@/app/components/PollForm'
import { createPoll } from '@/lib/actions/createPoll'

/**
 * NewPollPage (Client Page)
 * -------------------------
 * Wraps the `PollForm` inside `ProtectedRoute` so only authenticated
 * users can access the create-poll flow. `createPoll` is a Server Action
 * imported and provided to the form; it performs DB inserts on the server.
 */
export default function NewPollPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Poll</h1>
        {/* PollForm calls the provided Server Action to create the poll */}
        <PollForm createPollAction={createPoll} />
      </div>
    </ProtectedRoute>
  )
}
