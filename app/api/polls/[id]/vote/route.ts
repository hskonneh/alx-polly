import { NextRequest, NextResponse } from 'next/server'

// Mock data - replace with actual database
let polls = [
  {
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
    createdAt: '2024-01-15T10:30:00Z',
    createdBy: 'user1'
  }
]

// Mock votes tracking - replace with actual database
let votes = new Set<string>()

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { optionId } = body

    if (!optionId) {
      return NextResponse.json(
        { error: 'Option ID is required' },
        { status: 400 }
      )
    }

    const pollIndex = polls.findIndex(p => p.id === params.id)
    
    if (pollIndex === -1) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      )
    }

    const poll = polls[pollIndex]

    if (!poll.isActive) {
      return NextResponse.json(
        { error: 'Poll is not active' },
        { status: 400 }
      )
    }

    // Check if option exists
    const optionIndex = poll.options.findIndex(o => o.id === optionId)
    if (optionIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid option' },
        { status: 400 }
      )
    }

    // TODO: Implement proper user identification
    const userId = 'anonymous' // Replace with actual user ID from authentication
    const voteKey = `${params.id}-${userId}`

    // Check if user has already voted (basic implementation)
    if (votes.has(voteKey)) {
      return NextResponse.json(
        { error: 'You have already voted on this poll' },
        { status: 400 }
      )
    }

    // Record the vote
    votes.add(voteKey)
    poll.options[optionIndex].votes += 1
    poll.totalVotes += 1

    return NextResponse.json({
      message: 'Vote recorded successfully',
      poll: {
        id: poll.id,
        question: poll.question,
        options: poll.options,
        totalVotes: poll.totalVotes,
        isActive: poll.isActive
      }
    })
  } catch (error) {
    console.error('Error recording vote:', error)
    return NextResponse.json(
      { error: 'Failed to record vote' },
      { status: 500 }
    )
  }
}
