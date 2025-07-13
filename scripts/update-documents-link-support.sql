-- Add support for link-based documents
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS external_url TEXT,
ADD COLUMN IF NOT EXISTS document_type VARCHAR(10) DEFAULT 'file' CHECK (document_type IN ('file', 'link')),
ADD COLUMN IF NOT EXISTS platform VARCHAR(50);

-- Update existing documents to have document_type = 'file'
UPDATE documents SET document_type = 'file' WHERE document_type IS NULL;

-- Make file_url nullable for link documents
ALTER TABLE documents ALTER COLUMN file_url DROP NOT NULL;
ALTER TABLE documents ALTER COLUMN file_size DROP NOT NULL;

-- Add constraint to ensure either file_url or external_url is provided
ALTER TABLE documents ADD CONSTRAINT check_document_url 
CHECK (
  (document_type = 'file' AND file_url IS NOT NULL) OR 
  (document_type = 'link' AND external_url IS NOT NULL)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);
CREATE INDEX IF NOT EXISTS idx_documents_platform ON documents(platform) WHERE platform IS NOT NULL;

-- Insert sample link documents
INSERT INTO documents (
  id, title, description, external_url, document_type, platform, file_type, 
  category, department, tags, uploaded_by, author, version, location, 
  priority, access_level, language, created_at, updated_at
) VALUES 
(
  gen_random_uuid(),
  'Template Proposal Kegiatan Ziswaf',
  'Template Google Docs untuk membuat proposal kegiatan pendayagunaan ziswaf',
  'https://docs.google.com/document/d/1234567890/edit',
  'link',
  'google-docs',
  'GDOC',
  'Template',
  'Pendayagunaan',
  ARRAY['template', 'proposal', 'ziswaf'],
  (SELECT id FROM users WHERE role = 'admin' LIMIT 1),
  'Tim Pendayagunaan',
  '2.0',
  '/templates/pendayagunaan/',
  'medium',
  'organizational',
  'id',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Dashboard Monitoring Penyaluran',
  'Dashboard Google Sheets untuk monitoring real-time penyaluran dana ziswaf',
  'https://docs.google.com/spreadsheets/d/0987654321/edit',
  'link',
  'google-sheets',
  'GSHEET',
  'Dashboard',
  'Pendayagunaan',
  ARRAY['monitoring', 'dashboard', 'penyaluran'],
  (SELECT id FROM users WHERE role = 'admin' LIMIT 1),
  'Tim Monitoring',
  '1.5',
  '/dashboards/pendayagunaan/',
  'high',
  'departmental',
  'id',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Presentasi Laporan Tahunan 2024',
  'Presentasi Google Slides untuk laporan tahunan kegiatan ziswaf 2024',
  'https://docs.google.com/presentation/d/1122334455/edit',
  'link',
  'google-slides',
  'GSLIDE',
  'Presentasi',
  'Keuangan',
  ARRAY['laporan', 'tahunan', '2024', 'presentasi'],
  (SELECT id FROM users WHERE role = 'admin' LIMIT 1),
  'Tim Keuangan',
  '3.1',
  '/presentations/keuangan/',
  'high',
  'organizational',
  'id',
  NOW(),
  NOW()
);
