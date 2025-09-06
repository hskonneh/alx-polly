'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '../supabase-server'

export async function deletePoll(id: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.from('polls').delete().eq('id', id)

  if (error) {
    console.error('Error deleting poll:', error)
    throw new Error('Could not delete poll')
  }

  revalidatePath('/polls')
}
