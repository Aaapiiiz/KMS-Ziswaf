-- Add verification columns to documents table
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'revision_requested'));
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES users(id);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verification_requested_at TIMESTAMP WITH TIME ZONE;

-- Create document_comments table for admin feedback
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

-- Create document_revisions table to track document versions
CREATE TABLE IF NOT EXISTS document_revisions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  revision_notes TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_documents_verification_status ON documents(verification_status);
CREATE INDEX IF NOT EXISTS idx_document_comments_document_id ON document_comments(document_id);
CREATE INDEX IF NOT EXISTS idx_document_revisions_document_id ON document_revisions(document_id);

-- Update existing documents to have pending status
UPDATE documents SET verification_status = 'pending' WHERE verification_status IS NULL;
