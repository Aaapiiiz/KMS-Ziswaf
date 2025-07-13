-- Create scholarship programs table
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

-- Create document requests table
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

-- Create document request updates table
CREATE TABLE IF NOT EXISTS document_request_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES document_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  progress INTEGER CHECK (progress >= 0 AND progress <= 100),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document request templates table
CREATE TABLE IF NOT EXISTS document_request_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  data_fields TEXT[] NOT NULL,
  deliverable_templates TEXT[] NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scholarship recipients table
CREATE TABLE IF NOT EXISTS scholarship_recipients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES scholarship_programs(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  education_level VARCHAR(50) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  gpa DECIMAL(3,2),
  family_income BIGINT,
  province VARCHAR(100),
  city VARCHAR(100),
  gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
  birth_date DATE,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'graduated', 'dropped', 'suspended')),
  scholarship_amount BIGINT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scholarship_programs_status ON scholarship_programs(status);
CREATE INDEX IF NOT EXISTS idx_scholarship_programs_department ON scholarship_programs(department);
CREATE INDEX IF NOT EXISTS idx_document_requests_program_id ON document_requests(program_id);
CREATE INDEX IF NOT EXISTS idx_document_requests_status ON document_requests(status);
CREATE INDEX IF NOT EXISTS idx_document_requests_priority ON document_requests(priority);
CREATE INDEX IF NOT EXISTS idx_document_requests_due_date ON document_requests(due_date);
CREATE INDEX IF NOT EXISTS idx_scholarship_recipients_program_id ON scholarship_recipients(program_id);
CREATE INDEX IF NOT EXISTS idx_scholarship_recipients_status ON scholarship_recipients(status);
CREATE INDEX IF NOT EXISTS idx_scholarship_recipients_province ON scholarship_recipients(province);

-- Enable Row Level Security
ALTER TABLE scholarship_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_request_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_request_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship_recipients ENABLE ROW LEVEL SECURITY;
