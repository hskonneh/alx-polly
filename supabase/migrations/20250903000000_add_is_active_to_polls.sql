-- Add is_active column to polls
ALTER TABLE polls
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Ensure RLS policies continue to work: creators can update their own polls
-- (no change required here since policies reference creator_id)
