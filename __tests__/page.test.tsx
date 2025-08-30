import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home', () => {
  it('renders the main page content', () => {
    render(<Home />)
    
    // Check for main content
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument()
    expect(screen.getByText(/Save and see your changes instantly/i)).toBeInTheDocument()
    
    // Check for navigation links
    expect(screen.getByText('Deploy now')).toBeInTheDocument()
    expect(screen.getByText('Read our docs')).toBeInTheDocument()
    
    // Check for footer links
    expect(screen.getByText('Learn')).toBeInTheDocument()
    expect(screen.getByText('Examples')).toBeInTheDocument()
    expect(screen.getByText(/Go to nextjs.org/i)).toBeInTheDocument()
  })

  it('renders Next.js logo', () => {
    render(<Home />)
    const logo = screen.getByAltText('Next.js logo')
    expect(logo).toBeInTheDocument()
  })

  it('has proper link attributes', () => {
    render(<Home />)
    
    const deployLink = screen.getByText('Deploy now').closest('a')
    expect(deployLink).toHaveAttribute('target', '_blank')
    expect(deployLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
