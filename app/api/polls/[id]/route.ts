import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient();
  const { id } = params;
  try {
    const { data: poll, error } = await supabase
      .from('polls')
      .select('*, poll_options(*)')
      .eq('id', id)
      .single();
    if (error || !poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }
    return NextResponse.json({ poll });
  } catch (error) {
    console.error('Error fetching poll:', error);
    return NextResponse.json({ error: 'Failed to fetch poll' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient();
  const { id } = params;
  try {
    const body = await request.json();
    // You can update title, isActive, or options
    const { title, isActive, options } = body;
    // Update poll main fields
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .update({ title, isActive })
      .eq('id', id)
      .select()
      .single();
    if (pollError || !poll) {
      return NextResponse.json({ error: 'Poll not found or update failed' }, { status: 404 });
    }
    // Optionally update poll options
    if (Array.isArray(options)) {
      // Delete old options and insert new ones
      await supabase.from('poll_options').delete().eq('poll_id', id);
      const pollOptions = options.map((optionText: string) => ({ poll_id: id, option_text: optionText }));
      await supabase.from('poll_options').insert(pollOptions);
    }
    return NextResponse.json({ poll });
  } catch (error) {
    console.error('Error updating poll:', error);
    return NextResponse.json({ error: 'Failed to update poll' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient();
  const { id } = params;
  try {
    // Delete poll options first (if any)
    await supabase.from('poll_options').delete().eq('poll_id', id);
    // Delete poll
    const { error } = await supabase.from('polls').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ error: 'Failed to delete poll' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Poll deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting poll:', error);
    return NextResponse.json({ error: 'Failed to delete poll' }, { status: 500 });
  }
}
