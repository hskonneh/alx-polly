import { createServerSupabaseClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function togglePollStatus(formData: FormData) {
  'use server'
  try {
  const id = formData.get('id') as string
  if (!id) {
    throw new Error('Missing poll id')
  }

  // prefer the current state passed from the form to avoid an extra select that
  // may be blocked by RLS. The page includes the current isActive value.
  const isActiveStr = formData.get('isActive') as string | null
  let newStatus: boolean | null = null
  if (isActiveStr !== null) {
    const current = isActiveStr === 'true'
    newStatus = !current
  }

  const supabase = await createServerSupabaseClient()
  const { data, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  const user = data?.user
  if (!user) {
    throw new Error('Not authenticated')
  }

  // Update the poll but constrain by creator_id to ensure only the owner can
  // modify it. If newStatus wasn't derived from the form, fall back to updating
  // by toggling on the DB side via a select-then-update, but prefer the form
  // path to avoid potential RLS read failures.
  if (newStatus !== null) {
    const { data: updated, error: updateError } = await supabase
      .from('polls')
      .update({ is_active: newStatus })
      .eq('id', id)
      .eq('creator_id', user.id)
      .select()
      .single()

    if (updateError || !updated) {
      // Likely not found or not authorized under RLS; log and return gracefully.
      // Do not throw here to avoid crashing the caller page.
      // eslint-disable-next-line no-console
      console.error('Failed to update poll status (not found or unauthorized):', updateError)
      return
    }
  } else {
    // Fallback: fetch then toggle (may still be blocked by RLS)
    const { data: poll, error: fetchError } = await supabase
      .from('polls')
      .select('id, is_active, creator_id')
      .eq('id', id)
      .single()

    if (fetchError || !poll) {
      // Log and return rather than throwing; RLS may hide the row.
      // eslint-disable-next-line no-console
      console.error('Could not fetch poll for fallback toggle:', fetchError)
      return
    }

    if (poll.creator_id !== user.id) {
      // Not authorized to toggle.
      // eslint-disable-next-line no-console
      console.error('User is not the creator; cannot toggle poll')
      return
    }

    const toggled = !poll.is_active
    const { error: updateError } = await supabase
      .from('polls')
      .update({ is_active: toggled })
      .eq('id', id)

    if (updateError) {
      // Log and return gracefully
      // eslint-disable-next-line no-console
      console.error('Error updating poll during fallback toggle:', updateError)
      return
    }
  }

  // Revalidate the poll detail and list pages so UI updates
  revalidatePath(`/polls/${id}`)
  revalidatePath('/polls')
  } catch (err) {
    // Log the error but don't throw to avoid crashing the page render. The
    // server action may run without a session cookie in some contexts and
    // RLS can cause the select to fail; handle gracefully and revalidate.
    // eslint-disable-next-line no-console
    console.error('togglePollStatus error:', err)
    const id = (formData.get('id') as string) || ''
    if (id) {
      try {
        revalidatePath(`/polls/${id}`)
        revalidatePath('/polls')
      } catch {}
    }
    return
  }
}
