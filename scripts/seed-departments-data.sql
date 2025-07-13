-- Insert document categories
INSERT INTO document_categories (name, description, color, icon, department) VALUES
('Panduan', 'Dokumen panduan dan petunjuk teknis', '#blue', '📖', 'Pendayagunaan'),
('SOP', 'Standard Operating Procedures', '#green', '📋', 'Pendayagunaan'),
('Template', 'Template dokumen standar', '#purple', '📄', 'Pendayagunaan'),
('Laporan', 'Laporan kegiatan dan evaluasi', '#orange', '📊', 'Pendayagunaan'),
('Evaluasi', 'Dokumen evaluasi program', '#red', '📈', 'Pendayagunaan'),
('Database', 'Database dan data master', '#yellow', '🗃️', 'Pendayagunaan'),
('Formulir', 'Formulir dan form aplikasi', '#indigo', '📝', 'Pendayagunaan'),
('Presentasi', 'Materi presentasi', '#pink', '🎯', 'Pendayagunaan');

-- Insert document locations
INSERT INTO document_locations (path, description, department, category) VALUES
('/documents/pendayagunaan/panduan/', 'Lokasi penyimpanan panduan pendayagunaan', 'Pendayagunaan', 'Panduan'),
('/documents/pendayagunaan/sop/', 'Lokasi penyimpanan SOP pendayagunaan', 'Pendayagunaan', 'SOP'),
('/documents/pendayagunaan/template/', 'Lokasi penyimpanan template pendayagunaan', 'Pendayagunaan', 'Template'),
('/documents/pendayagunaan/laporan/', 'Lokasi penyimpanan laporan pendayagunaan', 'Pendayagunaan', 'Laporan'),
('/documents/pendayagunaan/evaluasi/', 'Lokasi penyimpanan evaluasi pendayagunaan', 'Pendayagunaan', 'Evaluasi'),
('/documents/pendayagunaan/database/', 'Lokasi penyimpanan database pendayagunaan', 'Pendayagunaan', 'Database'),
('/documents/penghimpunan/panduan/', 'Lokasi penyimpanan panduan penghimpunan', 'Penghimpunan', 'Panduan'),
('/documents/penghimpunan/sop/', 'Lokasi penyimpanan SOP penghimpunan', 'Penghimpunan', 'SOP'),
('/documents/keuangan/laporan/', 'Lokasi penyimpanan laporan keuangan', 'Keuangan', 'Laporan'),
('/documents/keuangan/template/', 'Lokasi penyimpanan template keuangan', 'Keuangan', 'Template'),
('/documents/sdm/kepegawaian/', 'Lokasi penyimpanan dokumen kepegawaian', 'SDM', 'Kepegawaian'),
('/documents/it/sistem/', 'Lokasi penyimpanan dokumen sistem IT', 'IT', 'Sistem');

-- Update existing documents with new fields
UPDATE documents SET 
  version = 'v2.1',
  location = '/documents/pendayagunaan/panduan/',
  priority = 'high',
  access_level = 'organizational',
  author = 'Ahmad Fauzi'
WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024';

UPDATE documents SET 
  version = 'v1.5',
  location = '/documents/pendayagunaan/sop/',
  priority = 'high',
  access_level = 'organizational',
  author = 'Budi Santoso'
WHERE title = 'SOP Verifikasi dan Validasi Mustahik';

UPDATE documents SET 
  version = 'v1.0',
  location = '/documents/pendayagunaan/template/',
  priority = 'medium',
  access_level = 'departmental',
  author = 'Siti Nurhaliza'
WHERE title = 'Template Laporan Bulanan Pendayagunaan';

UPDATE documents SET 
  version = 'v1.2',
  location = '/documents/pendayagunaan/evaluasi/',
  priority = 'medium',
  access_level = 'departmental',
  author = 'Maya Sari'
WHERE title = 'Strategi Penghimpunan Dana Ziswaf 2025';

UPDATE documents SET 
  version = 'v1.0',
  location = '/documents/sdm/kepegawaian/',
  priority = 'critical',
  access_level = 'organizational',
  author = 'HR Team',
  is_mandatory = TRUE
WHERE title = 'Kode Etik Perusahaan';

-- Insert document versions for version control
INSERT INTO document_versions (document_id, version, file_url, file_size, change_notes, uploaded_by) VALUES
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), 'v2.1', '/files/panduan-ziswaf-v2.1.pdf', 2516582, 'Update prosedur verifikasi dan tambahan checklist', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'SOP Verifikasi dan Validasi Mustahik'), 'v1.5', '/files/sop-verifikasi-v1.5.pdf', 1887436, 'Perbaikan flowchart dan penambahan kriteria validasi', (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Template Laporan Bulanan Pendayagunaan'), 'v1.0', '/files/template-laporan-v1.0.xlsx', 875264, 'Template awal untuk laporan bulanan', (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'));

-- Insert additional sample documents for departments
INSERT INTO documents (title, description, file_url, file_type, file_size, category, department, tags, uploaded_by, version, location, priority, access_level, author) VALUES
('Daftar Mitra Strategis Pendayagunaan', 'Database lengkap mitra strategis untuk program pendayagunaan ziswaf', '/documents/daftar-mitra-strategis.xlsx', 'XLSX', 1548672, 'Database', 'Pendayagunaan', ARRAY['mitra', 'database', 'strategis', 'kemitraan'], (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), 'v3.0', '/documents/pendayagunaan/database/', 'medium', 'departmental', 'Ahmad Fauzi'),
('Formulir Aplikasi Beasiswa', 'Formulir standar untuk aplikasi program beasiswa mahasiswa', '/documents/formulir-beasiswa.pdf', 'PDF', 892456, 'Formulir', 'Pendayagunaan', ARRAY['formulir', 'beasiswa', 'aplikasi', 'mahasiswa'], (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'), 'v2.0', '/documents/pendayagunaan/formulir/', 'high', 'public', 'Budi Santoso'),
('Presentasi Program UMKM 2024', 'Materi presentasi program pemberdayaan UMKM tahun 2024', '/documents/presentasi-umkm-2024.pptx', 'PPTX', 3245789, 'Presentasi', 'Pendayagunaan', ARRAY['presentasi', 'umkm', 'pemberdayaan', '2024'], (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com'), 'v1.1', '/documents/pendayagunaan/presentasi/', 'medium', 'organizational', 'Maya Sari');
