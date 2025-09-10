-- Add a votes column to the poll_options table
ALTER TABLE poll_options
ADD COLUMN votes INTEGER NOT NULL DEFAULT 0;

-- Add poll_id to votes table to simplify duplicate vote checks
ALTER TABLE votes
ADD COLUMN poll_id UUID REFERENCES polls(id) ON DELETE CASCADE;

-- Create a function to increment the vote count atomically
CREATE OR REPLACE FUNCTION increment_vote_count(option_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE poll_options
  SET votes = votes + 1
  WHERE id = option_id_param;
END;
$$ LANGUAGE plpgsql;
