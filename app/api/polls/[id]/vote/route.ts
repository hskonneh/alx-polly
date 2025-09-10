import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  const { id: poll_id } = context.params;
  const supabase = await createServerSupabaseClient();
  try {
    const body = await request.json();
    const { optionId } = body;
    if (!optionId) {
      return NextResponse.json({ error: 'Option ID is required' }, { status: 400 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || null;

    if (userId) {
      const { data: existingVote, error: existingVoteError } = await supabase
        .from('votes')
        .select()
        .eq('poll_id', poll_id)
        .eq('user_id', userId)
        .single();

      if (existingVote) {
        return NextResponse.json({ error: 'You have already voted on this poll' }, { status: 400 });
      }
      if (existingVoteError && existingVoteError.code !== 'PGRST116') { // PGRST116 = no rows found
        throw existingVoteError;
      }
    }

    const { error: voteError } = await supabase
      .from('votes')
      .insert({ poll_id: poll_id, option_id: optionId, user_id: userId });

    if (voteError) {
      throw voteError;
    }

    const { error: rpcError } = await supabase.rpc('increment_vote_count', { option_id_param: optionId });

    if (rpcError) {
      throw rpcError;
    }

    return NextResponse.json({ message: 'Vote recorded successfully' });
  } catch (error: any) {
    console.error('Error recording vote:', error);
    return NextResponse.json({ error: error.message || 'Failed to record vote' }, { status: 500 });
  }
}