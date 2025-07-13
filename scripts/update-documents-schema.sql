-- Add additional fields to documents table for comprehensive document management
ALTER TABLE documents ADD COLUMN IF NOT EXISTS version VARCHAR(20) DEFAULT '1.0';
ALTER TABLE documents ADD COLUMN IF NOT EXISTS location VARCHAR(500);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical'));
ALTER TABLE documents ADD COLUMN IF NOT EXISTS access_level VARCHAR(50) DEFAULT 'departmental' CHECK (access_level IN ('departmental', 'organizational', 'public'));
ALTER TABLE documents ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'id';
ALTER TABLE documents ADD COLUMN IF NOT EXISTS expiry_date DATE;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS related_documents TEXT;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS author VARCHAR(255);

-- Create document_categories table for better categorization
CREATE TABLE IF NOT EXISTS document_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(20) DEFAULT '#gray',
  icon VARCHAR(50),
  department VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_locations table for file organization
CREATE TABLE IF NOT EXISTS document_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path VARCHAR(500) NOT NULL UNIQUE,
  description TEXT,
  department VARCHAR(100),
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_versions table for version control
CREATE TABLE IF NOT EXISTS document_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  version VARCHAR(20) NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  change_notes TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_location ON documents(location);
CREATE INDEX IF NOT EXISTS idx_documents_priority ON documents(priority);
CREATE INDEX IF NOT EXISTS idx_documents_access_level ON documents(access_level);
CREATE INDEX IF NOT EXISTS idx_documents_expiry_date ON documents(expiry_date);
CREATE INDEX IF NOT EXISTS idx_documents_author ON documents(author);
CREATE INDEX IF NOT EXISTS idx_document_versions_document_id ON document_versions(document_id);
CREATE INDEX IF NOT EXISTS idx_document_categories_department ON document_categories(department);
CREATE INDEX IF NOT EXISTS idx_document_locations_department ON document_locations(department);
