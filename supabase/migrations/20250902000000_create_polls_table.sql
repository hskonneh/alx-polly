-- Create the 'polls' table
CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  qr_code_link TEXT
);

-- Enable Row Level Security (RLS) for the 'polls' table
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to create polls
CREATE POLICY "Authenticated users can create polls" ON polls
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy for all users to read polls
CREATE POLICY "All users can read polls" ON polls
  FOR SELECT USING (TRUE);

-- Policy for poll creators to update their own polls
CREATE POLICY "Poll creators can update their own polls" ON polls
  FOR UPDATE USING (auth.uid() = creator_id);

-- Policy for poll creators to delete their own polls
CREATE POLICY "Poll creators can delete their own polls" ON polls
  FOR DELETE USING (auth.uid() = creator_id);

-- Create the 'poll_options' table
CREATE TABLE poll_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL
);

-- Enable Row Level Security (RLS) for the 'poll_options' table
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;

-- Policy for all users to read poll options
CREATE POLICY "All users can read poll options" ON poll_options
  FOR SELECT USING (TRUE);

-- Policy for authenticated users to create poll options (associated with their polls)
CREATE POLICY "Authenticated users can create poll options" ON poll_options
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND EXISTS (SELECT 1 FROM polls WHERE id = poll_options.poll_id AND creator_id = auth.uid()));

-- Policy for poll creators to update their own poll options
CREATE POLICY "Poll creators can update their own poll options" ON poll_options
  FOR UPDATE USING (EXISTS (SELECT 1 FROM polls WHERE id = poll_options.poll_id AND creator_id = auth.uid()));

-- Policy for poll creators to delete their own poll options
CREATE POLICY "Poll creators can delete their own poll options" ON poll_options
  FOR DELETE USING (EXISTS (SELECT 1 FROM polls WHERE id = poll_options.poll_id AND creator_id = auth.uid()));

-- Create the 'votes' table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  option_id UUID REFERENCES poll_options(id) ON DELETE CASCADE,
  CONSTRAINT unique_vote_per_user_per_poll UNIQUE (user_id, option_id)
);

-- Enable Row Level Security (RLS) for the 'votes' table
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to create votes
CREATE POLICY "Authenticated users can create votes" ON votes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy for all users to read votes (e.g., for poll results)
CREATE POLICY "All users can read votes" ON votes
  FOR SELECT USING (TRUE);

-- Policy for users to delete their own votes (optional, if users can change their vote)
CREATE POLICY "Users can delete their own votes" ON votes
  FOR DELETE USING (auth.uid() = user_id);
