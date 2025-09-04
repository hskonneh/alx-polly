import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { cookies } from 'next/headers'

function makeQrLink(pollId: string) {
  // Simple QR link: a shareable URL that can be encoded into a QR code on the front-end
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${base}/polls/${pollId}`
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: polls, error } = await supabase
      .from('polls')
      .select('*, poll_options(*)')

    if (error) {
      console.error('Error fetching polls:', error)
      return NextResponse.json(
        { error: 'Failed to fetch polls' },
        { status: 500 }
      )
    }

    return NextResponse.json({ polls })
  } catch (error) {
    console.error('Error fetching polls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch polls' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()

  try {
    const { title, options } = await request.json()

    if (!title || !options || options.length < 2) {
      return NextResponse.json(
        { error: 'Title and at least 2 options are required' },
        { status: 400 }
      )
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Insert the poll
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({ title, creator_id: user.id })
      .select()
      .single()

    if (pollError) {
      console.error('Error creating poll:', pollError)
      return NextResponse.json(
        { error: 'Failed to create poll' },
        { status: 500 }
      )
    }

    // Generate a qr_code_link and update the poll row with it
    const qrLink = makeQrLink(poll.id)
    const { error: updateError } = await supabase
      .from('polls')
      .update({ qr_code_link: qrLink })
      .eq('id', poll.id)

    if (updateError) {
      console.error('Error updating poll with QR link:', updateError)
      // not fatal: continue to create options and return poll
    }

    // Insert poll options
    const pollOptions = options.map((optionText: string) => ({
      poll_id: poll.id,
      option_text: optionText,
    }))

    const { data: newOptions, error: optionsError } = await supabase
      .from('poll_options')
      .insert(pollOptions)
      .select()

    if (optionsError) {
      console.error('Error creating poll options:', optionsError)
      return NextResponse.json(
        { error: 'Failed to create poll options' },
        { status: 500 }
      )
    }

    // Return the poll with options and qr link
    return NextResponse.json({ poll: { ...poll, options: newOptions, qr_code_link: qrLink } }, { status: 201 })
  } catch (error) {
    console.error('Error creating poll:', error)
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    )
  }
}
