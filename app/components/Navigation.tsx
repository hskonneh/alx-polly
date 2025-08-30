'use client'

import Link from 'next/link'
import { Button } from './ui/button'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">ALX Polly</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/polls" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Polls
              </Link>
              <Link href="/polls/new" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Create Poll
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
