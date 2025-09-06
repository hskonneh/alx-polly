import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const supabase = await createServerSupabaseClient();
  try {
    const body = await request.json();
    const { optionId } = body;
    if (!optionId) {
      return NextResponse.json({ error: 'Option ID is required' }, { status: 400 });
    }
    // Get user ID if authenticated
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || null;
    // Prevent duplicate votes per user per poll
    if (userId) {
      const { data: existingVote } = await supabase
        .from('votes')
        .select()
        .eq('poll_id', id)
        .eq('user_id', userId)
        .single();
      if (existingVote) {
        return NextResponse.json({ error: 'You have already voted on this poll' }, { status: 400 });
      }
    }
    // Insert vote
    const { error: voteError } = await supabase
      .from('votes')
      .insert({ poll_id: id, option_id: optionId, user_id: userId });
    if (voteError) {
      return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 });
    }
    // Increment vote count for the option
    const { error: updateError } = await supabase
      .from('options') // Assuming the table is named 'options'
      .update({ votes: (option: { votes: number }) => option.votes + 1 })
      .eq('id', optionId)

    if (updateError) {
      console.error('Error incrementing vote count:', updateError)
      return NextResponse.json({ error: 'Failed to update vote count' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Vote recorded successfully' })
  } catch (error) {
    console.error('Error recording vote:', error);
    return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 });
  }
}
