-- Add mandatory and starred fields to documents table
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS is_starred BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_mandatory BOOLEAN DEFAULT FALSE;

-- Create index for better performance on mandatory document queries
CREATE INDEX IF NOT EXISTS idx_documents_mandatory ON documents(is_mandatory, is_starred);

-- Update some existing documents to be mandatory (example data)
UPDATE documents 
SET is_mandatory = TRUE, is_starred = TRUE, updated_at = NOW()
WHERE title LIKE '%Panduan%' OR title LIKE '%SOP%' OR category = 'Panduan';

-- Add comment to track changes
COMMENT ON COLUMN documents.is_starred IS 'Admin-controlled mandatory reading indicator';
COMMENT ON COLUMN documents.is_mandatory IS 'Whether document is mandatory for all users';
