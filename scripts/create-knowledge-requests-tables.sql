-- Create knowledge segments table
CREATE TABLE IF NOT EXISTS knowledge_segments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attachment types table
CREATE TABLE IF NOT EXISTS attachment_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge requests table
CREATE TABLE IF NOT EXISTS knowledge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  segment_id UUID REFERENCES knowledge_segments(id),
  requested_by UUID REFERENCES users(id),
  department VARCHAR(100),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  due_date DATE NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  segment_specific JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge request attachments table
CREATE TABLE IF NOT EXISTS knowledge_request_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES knowledge_requests(id) ON DELETE CASCADE,
  attachment_type_id UUID REFERENCES attachment_types(id),
  description TEXT NOT NULL,
  is_required BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  uploaded_file_name VARCHAR(500),
  uploaded_file_path VARCHAR(1000),
  uploaded_file_size BIGINT,
  uploaded_by UUID REFERENCES users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge request updates table
CREATE TABLE IF NOT EXISTS knowledge_request_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES knowledge_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  progress INTEGER CHECK (progress >= 0 AND progress <= 100),
  attachment_files TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge request comments table
CREATE TABLE IF NOT EXISTS knowledge_request_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES knowledge_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  comment TEXT NOT NULL,
  parent_comment_id UUID REFERENCES knowledge_request_comments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge request assignments table
CREATE TABLE IF NOT EXISTS knowledge_request_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES knowledge_requests(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id),
  assigned_by UUID REFERENCES users(id),
  role VARCHAR(100), -- 'primary', 'reviewer', 'contributor'
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_segment_id ON knowledge_requests(segment_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_status ON knowledge_requests(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_priority ON knowledge_requests(priority);
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_due_date ON knowledge_requests(due_date);
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_requested_by ON knowledge_requests(requested_by);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_attachments_request_id ON knowledge_request_attachments(request_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_attachments_status ON knowledge_request_attachments(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_updates_request_id ON knowledge_request_updates(request_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_comments_request_id ON knowledge_request_comments(request_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_assignments_request_id ON knowledge_request_assignments(request_id);

-- Enable Row Level Security
ALTER TABLE knowledge_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_request_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_request_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_request_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_request_assignments ENABLE ROW LEVEL SECURITY;
