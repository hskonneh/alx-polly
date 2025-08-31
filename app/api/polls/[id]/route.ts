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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const poll = polls.find(p => p.id === id)
    
    if (!poll) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ poll })
  } catch (error) {
    console.error('Error fetching poll:', error)
    return NextResponse.json(
      { error: 'Failed to fetch poll' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const { isActive } = body

    const pollIndex = polls.findIndex(p => p.id === id)
    
    if (pollIndex === -1) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      )
    }

    // Update poll status
    polls[pollIndex] = {
      ...polls[pollIndex],
      isActive: isActive !== undefined ? isActive : polls[pollIndex].isActive
    }

    return NextResponse.json({ poll: polls[pollIndex] })
  } catch (error) {
    console.error('Error updating poll:', error)
    return NextResponse.json(
      { error: 'Failed to update poll' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const pollIndex = polls.findIndex(p => p.id === id)
    
    if (pollIndex === -1) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      )
    }

    polls.splice(pollIndex, 1)

    return NextResponse.json(
      { message: 'Poll deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting poll:', error)
    return NextResponse.json(
      { error: 'Failed to delete poll' },
      { status: 500 }
    )
  }
}
