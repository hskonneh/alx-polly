'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '../supabase-server'
import { Poll } from '../types'

export async function updatePoll(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const options = JSON.parse(formData.get('options') as string)

  // Update poll title
  const { data: updatedPoll, error: pollError } = await supabase
    .from('polls')
    .update({ title })
    .eq('id', id)
    .select()
    .single()

  if (pollError || !updatedPoll) {
    console.error('Error updating poll title:', pollError)
    throw new Error('Could not update poll')
  }

  // Replace poll options: delete existing and insert new ones
  const { error: delError } = await supabase.from('poll_options').delete().eq('poll_id', id)
  if (delError) {
    console.error('Error deleting old poll options:', delError)
    throw new Error('Could not update poll options')
  }

  const optionsPayload = (options as string[]).map((opt) => ({ poll_id: id, option_text: opt }))
  const { error: insertError } = await supabase.from('poll_options').insert(optionsPayload)
  if (insertError) {
    console.error('Error inserting updated poll options:', insertError)
    throw new Error('Could not update poll options')
  }

  // Fetch full poll with options
  const { data: fullPoll, error: fetchError } = await supabase
    .from('polls')
    .select('*, options:poll_options(*)')
    .eq('id', id)
    .single()

  if (fetchError || !fullPoll) {
    console.error('Error fetching updated poll:', fetchError)
    throw new Error('Could not fetch updated poll')
  }

  revalidatePath('/polls')
  revalidatePath(`/polls/${id}`)
  return fullPoll as Poll
}
