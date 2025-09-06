export interface Poll {
  id: string
  // DB column
  title?: string
  // compatibility
  question?: string
  options?: PollOption[]
  totalVotes?: number
  isActive?: boolean
  // DB column
  created_at?: string
  // compatibility
  createdAt?: string
  // DB column
  creator_id?: string
  // compatibility
  createdBy?: string
}

export interface PollOption {
  id: string
  // DB column
  option_text?: string
  // compatibility
  text?: string
  votes?: number
  percentage?: number
}

export interface User {
  id: string
  name?: string
  email?: string
  createdAt?: string
}

export interface Vote {
  id: string
  pollId?: string
  optionId?: string
  userId?: string
  createdAt?: string
}

export interface CreatePollRequest {
  title: string
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
