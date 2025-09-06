'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '../supabase-server'
import { Poll } from '../types'

export async function createPoll(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const title = formData.get('title') as string
  const options = JSON.parse(formData.get('options') as string)

  // Attach authenticated user as creator if available
  const { data: authData } = await supabase.auth.getUser()
  const creator_id = authData?.user?.id ?? null

  // Insert poll (polls table doesn't have an 'options' column)
  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .insert({ title, creator_id })
    .select()
    .single()

  if (pollError || !poll) {
    console.error('Error creating poll:', pollError)
    throw new Error('Could not create poll')
  }

  // Insert options into poll_options table
  try {
    const optionsPayload = (options as string[]).map((opt) => ({
      poll_id: poll.id,
      option_text: opt,
    }))

    const { error: optsError } = await supabase.from('poll_options').insert(optionsPayload)
    if (optsError) {
      console.error('Error inserting poll options:', optsError)
      // Attempt to cleanup the created poll to avoid orphaned polls
      await supabase.from('polls').delete().eq('id', poll.id)
      throw new Error('Could not create poll options')
    }
  } catch (err) {
    console.error('Unexpected error inserting options:', err)
    // Cleanup
    await supabase.from('polls').delete().eq('id', poll.id)
    throw err
  }

  // Fetch the poll with its options for return shape
  const { data: fullPoll, error: fetchError } = await supabase
    .from('polls')
    .select('*, options:poll_options(*)')
    .eq('id', poll.id)
    .single()

  if (fetchError || !fullPoll) {
    console.error('Error fetching full poll after insert:', fetchError)
    throw new Error('Could not fetch created poll')
  }

  revalidatePath('/polls')
  return fullPoll as Poll
}
