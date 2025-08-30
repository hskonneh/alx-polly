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

export async function GET() {
  try {
    return NextResponse.json({
      polls: polls.map(poll => ({
        id: poll.id,
        question: poll.question,
        totalVotes: poll.totalVotes,
        isActive: poll.isActive,
        createdAt: poll.createdAt
      }))
    })
  } catch (error) {
    console.error('Error fetching polls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch polls' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, options } = body

    if (!question || !options || options.length < 2) {
      return NextResponse.json(
        { error: 'Question and at least 2 options are required' },
        { status: 400 }
      )
    }

    const newPoll = {
      id: Date.now().toString(),
      question,
      options: options.map((option: string, index: number) => ({
        id: (index + 1).toString(),
        text: option,
        votes: 0
      })),
      totalVotes: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      createdBy: 'user1' // TODO: Get from authentication
    }

    polls.push(newPoll)

    return NextResponse.json({
      poll: {
        id: newPoll.id,
        question: newPoll.question,
        options: newPoll.options,
        totalVotes: newPoll.totalVotes,
        isActive: newPoll.isActive,
        createdAt: newPoll.createdAt
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating poll:', error)
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    )
  }
}
