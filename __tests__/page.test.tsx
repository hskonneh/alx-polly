import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home', () => {
  it('renders the main page content', () => {
    render(<Home />)
    
    // Check for main content
    expect(screen.getByText('Welcome to')).toBeInTheDocument(); // Check for "Welcome to"
    expect(screen.getByText('PollPall!')).toBeInTheDocument(); // Check for "PollPall!" separately
    expect(screen.getByText('Create and share polls with ease')).toBeInTheDocument()
    
    // Check for navigation links
    expect(screen.getByText('View Polls')).toBeInTheDocument()
    expect(screen.getByText('Create Poll')).toBeInTheDocument()
  })

  it('renders developer credits', () => {
    render(<Home />)
    expect(screen.getByText(/Developed by HS. Konneh/)).toBeInTheDocument()
  })

  it('has proper navigation links', () => {
    render(<Home />)
    
    const pollsLink = screen.getByText('View Polls').closest('a')
    expect(pollsLink).toBeInTheDocument()
    
    const createPollLink = screen.getByText('Create Poll').closest('a')
    expect(createPollLink).toBeInTheDocument()
  })
})
