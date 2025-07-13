-- Update activities table with more detailed fields
ALTER TABLE activities ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low'));
ALTER TABLE activities ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100);
ALTER TABLE activities ADD COLUMN IF NOT EXISTS budget BIGINT DEFAULT 0;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS target_beneficiaries INTEGER DEFAULT 0;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS current_beneficiaries INTEGER DEFAULT 0;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE activities ADD COLUMN IF NOT EXISTS departments TEXT[];

-- Create activity_participants table
CREATE TABLE IF NOT EXISTS activity_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(100),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, user_id)
);

-- Create activity_documents table
CREATE TABLE IF NOT EXISTS activity_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, document_id)
);

-- Create activity_meetings table
CREATE TABLE IF NOT EXISTS activity_meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  attendees_count INTEGER DEFAULT 0,
  meeting_notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_discussions table
CREATE TABLE IF NOT EXISTS activity_discussions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  parent_id UUID REFERENCES activity_discussions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_milestones table
CREATE TABLE IF NOT EXISTS activity_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_date DATE NOT NULL,
  completion_date DATE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activity_participants_activity_id ON activity_participants(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_participants_user_id ON activity_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_documents_activity_id ON activity_documents(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_meetings_activity_id ON activity_meetings(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_discussions_activity_id ON activity_discussions(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_milestones_activity_id ON activity_milestones(activity_id);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_priority ON activities(priority);
