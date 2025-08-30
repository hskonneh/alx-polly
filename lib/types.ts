export interface Poll {
  id: string
  question: string
  options: PollOption[]
  totalVotes: number
  isActive: boolean
  createdAt: string
  createdBy: string
}

export interface PollOption {
  id: string
  text: string
  votes: number
  percentage?: number
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface Vote {
  id: string
  pollId: string
  optionId: string
  userId: string
  createdAt: string
}

export interface CreatePollRequest {
  question: string
  options: string[]
}

export interface VoteRequest {
  optionId: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}
