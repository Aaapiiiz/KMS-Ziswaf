-- =================================================================
--  Unified Database Initialization Script for Ziswaf KMS
-- =================================================================

-- Drop existing tables in reverse order of dependency to ensure a clean slate if needed
-- (Use with caution in production)
-- DROP TABLE IF EXISTS document_request_updates, document_request_attachments, document_requests, document_request_templates, knowledge_segments CASCADE;
-- DROP TABLE IF EXISTS scholarship_recipients, scholarship_programs CASCADE;
-- DROP TABLE IF EXISTS activity_milestones, activity_discussions, activity_meetings, activity_documents, activity_participants, activities CASCADE;
-- DROP TABLE IF EXISTS notification_actions, notification_preferences, notifications CASCADE;
-- DROP TABLE IF EXISTS document_versions, document_comments, document_favorites, document_downloads, document_views, document_locations, document_categories, documents CASCADE;
-- DROP TABLE IF EXISTS ziswaf_reports, users CASCADE;

-- =================================================================
--  SECTION 1: TABLE CREATION
-- =================================================================

-- User Table (Primary table, created first)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Documents and Related Tables
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  document_type VARCHAR(10) DEFAULT 'file' CHECK (document_type IN ('file', 'link')),
  file_url TEXT,
  external_url TEXT,
  platform VARCHAR(50),
  file_type VARCHAR(10),
  file_size BIGINT,
  category VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  author VARCHAR(255),
  tags TEXT[],
  uploaded_by UUID REFERENCES users(id),
  is_mandatory BOOLEAN DEFAULT FALSE,
  is_starred BOOLEAN DEFAULT FALSE,
  version VARCHAR(20) DEFAULT '1.0',
  location VARCHAR(500),
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  access_level VARCHAR(50) DEFAULT 'departmental' CHECK (access_level IN ('departmental', 'organizational', 'public')),
  language VARCHAR(10) DEFAULT 'id',
  expiry_date DATE,
  related_documents TEXT,
  verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'revision_requested')),
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  verification_requested_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_document_url CHECK (
    (document_type = 'file' AND file_url IS NOT NULL AND file_size IS NOT NULL) OR 
    (document_type = 'link' AND external_url IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS document_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  comment TEXT NOT NULL,
  comment_type VARCHAR(50) DEFAULT 'feedback' CHECK (comment_type IN ('feedback', 'revision_request', 'approval_note')),
  is_internal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities and Related Tables
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  start_date DATE,
  end_date DATE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  budget BIGINT DEFAULT 0,
  target_beneficiaries INTEGER DEFAULT 0,
  current_beneficiaries INTEGER DEFAULT 0,
  tags TEXT[],
  departments TEXT[],
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(100),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, user_id)
);

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

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('document_verification', 'read_request', 'read_confirmation', 'document_status')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    requires_action BOOLEAN DEFAULT FALSE,
    action_type VARCHAR(50) CHECK (action_type IN ('mark_as_read', 'verify_document', 'respond')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    document_verification BOOLEAN DEFAULT TRUE,
    read_requests BOOLEAN DEFAULT TRUE,
    document_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scholarship Programs and Knowledge Requests
CREATE TABLE IF NOT EXISTS scholarship_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  budget BIGINT NOT NULL DEFAULT 0,
  recipients INTEGER DEFAULT 0,
  target_recipients INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  department VARCHAR(100) NOT NULL,
  coordinator_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES scholarship_programs(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  requested_by UUID REFERENCES users(id),
  assigned_to VARCHAR(100),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  data_requirements TEXT[] NOT NULL,
  deliverables TEXT[] NOT NULL,
  template_type VARCHAR(100),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =================================================================
--  SECTION 2: TRIGGERS AND FUNCTIONS
-- =================================================================

-- Create function to update 'updated_at' timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with an 'updated_at' column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Add more triggers for other tables as needed...

-- =================================================================
--  SECTION 3: SEED INITIAL DATA
-- =================================================================

-- Insert sample users (will not overwrite if email exists)
INSERT INTO users (email, name, department, role, status, last_login) VALUES
('admin@ziswaf.com', 'Admin System', 'IT', 'admin', 'active', NOW() - INTERVAL '1 hours'),
('user@ziswaf.com', 'Ahmad Fauzi', 'Pendayagunaan', 'user', 'active', NOW() - INTERVAL '2 hours'),
('siti.nurhaliza@ziswaf.com', 'Siti Nurhaliza', 'Penghimpunan', 'user', 'active', NOW() - INTERVAL '5 hours'),
('budi.santoso@ziswaf.com', 'Budi Santoso', 'Keuangan', 'user', 'active', NOW() - INTERVAL '1 day'),
('maya.sari@ziswaf.com', 'Maya Sari', 'Marketing', 'user', 'pending', NULL),
('rizki.pratama@ziswaf.com', 'Rizki Pratama', 'IT', 'user', 'inactive', NOW() - INTERVAL '25 days')
ON CONFLICT (email) DO NOTHING;

-- Insert sample documents (will not overwrite if title exists)
INSERT INTO documents (title, description, document_type, file_url, file_type, file_size, category, department, tags, uploaded_by, is_mandatory, is_starred, verification_status, author) VALUES
('Panduan Penyaluran Beasiswa 2024', 'Dokumen panduan lengkap untuk proses penyaluran beasiswa tahun 2024', 'file', '/documents/panduan-beasiswa-2024.pdf', 'PDF', 2516582, 'Panduan', 'Pendayagunaan', ARRAY['beasiswa', 'panduan', '2024'], (SELECT id FROM users WHERE email = 'user@ziswaf.com'), TRUE, TRUE, 'approved', 'Ahmad Fauzi'),
('Laporan Keuangan Q4 2023', 'Laporan keuangan triwulan keempat tahun 2023', 'file', '/documents/laporan-keuangan-q4-2023.xlsx', 'Excel', 1887436, 'Laporan', 'Keuangan', ARRAY['keuangan', 'laporan', 'Q4'], (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), TRUE, TRUE, 'approved', 'Siti Nurhaliza'),
('SOP Verifikasi Mustahik', 'Standar operasional prosedur untuk verifikasi penerima bantuan', 'file', '/documents/sop-verifikasi-mustahik.pdf', 'PDF', 1258291, 'SOP', 'Penyaluran', ARRAY['SOP', 'verifikasi', 'mustahik'], (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'), FALSE, FALSE, 'pending', 'Budi Santoso'),
('Proposal Program Kesehatan', 'Proposal program bantuan kesehatan untuk mustahik', 'file', '/documents/proposal-kesehatan.docx', 'Word', 3251200, 'Proposal', 'Pendayagunaan', ARRAY['proposal', 'kesehatan', 'bantuan'], (SELECT id FROM users WHERE email = 'user@ziswaf.com'), FALSE, FALSE, 'rejected', 'Ahmad Fauzi')
ON CONFLICT (title) DO NOTHING;

-- =================================================================
--  SECTION 4: ENABLE ROW-LEVEL SECURITY (RLS)
-- =================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship_programs ENABLE ROW LEVEL SECURITY;
-- Add more RLS enablement for other tables as needed...

-- Example RLS policies (customize as needed)
CREATE POLICY "Users can view their own data." ON users
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own data." ON users
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can view all documents." ON documents
    FOR SELECT USING (true); -- Or add more restrictive logic, e.g., based on department

-- =================================================================
--  END OF SCRIPT
-- =================================================================