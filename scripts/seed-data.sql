-- Insert sample users
INSERT INTO users (email, name, department, role, status, last_login) VALUES
('admin@ziswaf.com', 'Ahmad Fauzi', 'Pendayagunaan', 'admin', 'active', NOW() - INTERVAL '2 hours'),
('siti.nurhaliza@ziswaf.com', 'Siti Nurhaliza', 'Penghimpunan', 'user', 'active', NOW() - INTERVAL '5 hours'),
('budi.santoso@ziswaf.com', 'Budi Santoso', 'Keuangan', 'user', 'active', NOW() - INTERVAL '1 day'),
('maya.sari@ziswaf.com', 'Maya Sari', 'Marketing', 'user', 'pending', NULL),
('rizki.pratama@ziswaf.com', 'Rizki Pratama', 'IT', 'user', 'inactive', NOW() - INTERVAL '25 days');

-- Insert sample documents
INSERT INTO documents (title, description, file_url, file_type, file_size, category, department, tags, uploaded_by, is_mandatory) VALUES
('Panduan Lengkap Pendayagunaan Ziswaf 2024', 'Dokumen komprehensif yang memuat seluruh prosedur dan panduan untuk pendayagunaan dana ziswaf', '/documents/panduan-ziswaf-2024.pdf', 'PDF', 2516582, 'Panduan', 'Pendayagunaan', ARRAY['ziswaf', 'panduan', 'prosedur'], (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), FALSE),
('Template Laporan Bulanan Pendayagunaan', 'Template standar untuk pembuatan laporan bulanan kegiatan pendayagunaan', '/documents/template-laporan-bulanan.xlsx', 'XLSX', 875264, 'Template', 'Pendayagunaan', ARRAY['template', 'laporan', 'bulanan'], (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), FALSE),
('SOP Verifikasi dan Validasi Mustahik', 'Standar operasional prosedur untuk proses verifikasi dan validasi penerima manfaat', '/documents/sop-verifikasi-mustahik.pdf', 'PDF', 1887436, 'SOP', 'Pendayagunaan', ARRAY['sop', 'verifikasi', 'mustahik'], (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'), FALSE),
('Kode Etik Perusahaan', 'Dokumen wajib yang memuat kode etik dan tata nilai perusahaan', '/documents/kode-etik-perusahaan.pdf', 'PDF', 1258742, 'Kepegawaian', 'SDM', ARRAY['kode-etik', 'wajib', 'kepegawaian'], (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), TRUE),
('Strategi Penghimpunan Dana Ziswaf 2025', 'Dokumen strategis untuk perencanaan penghimpunan dana ziswaf tahun 2025', '/documents/strategi-penghimpunan-2025.pdf', 'PDF', 3355648, 'Strategi', 'Penghimpunan', ARRAY['strategi', 'penghimpunan', '2025'], (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), FALSE);

-- Insert sample activities
INSERT INTO activities (name, description, status, participants, created_by) VALUES
('Program Beasiswa', 'Program pemberian beasiswa untuk mahasiswa kurang mampu', 'active', 12, (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
('Bantuan Kesehatan', 'Program bantuan kesehatan untuk masyarakat dhuafa', 'planning', 8, (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com')),
('Pemberdayaan UMKM', 'Program pemberdayaan usaha mikro kecil menengah', 'active', 15, (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com')),
('Infrastruktur Masjid', 'Program pembangunan dan renovasi masjid', 'completed', 6, (SELECT id FROM users WHERE email = 'admin@ziswaf.com'));

-- Insert sample ziswaf reports
INSERT INTO ziswaf_reports (area, target_amount, realized_amount, report_month, report_year) VALUES
('Pendidikan', 2000000000, 1800000000, 12, 2024),
('Kesehatan', 1500000000, 1350000000, 12, 2024),
('Ekonomi', 1800000000, 1620000000, 12, 2024),
('Sosial', 1200000000, 960000000, 12, 2024),
('Dakwah', 800000000, 720000000, 12, 2024),
('Pendidikan', 1800000000, 1710000000, 11, 2024),
('Kesehatan', 1400000000, 1260000000, 11, 2024),
('Ekonomi', 1700000000, 1530000000, 11, 2024),
('Sosial', 1100000000, 880000000, 11, 2024),
('Dakwah', 750000000, 675000000, 11, 2024);

-- Insert sample document views
INSERT INTO document_views (document_id, user_id) VALUES
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Template Laporan Bulanan Pendayagunaan'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'SOP Verifikasi dan Validasi Mustahik'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'));

-- Insert sample document favorites
INSERT INTO document_favorites (document_id, user_id) VALUES
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'SOP Verifikasi dan Validasi Mustahik'), (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'));

-- Insert sample document downloads
INSERT INTO document_downloads (document_id, user_id) VALUES
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Template Laporan Bulanan Pendayagunaan'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Kode Etik Perusahaan'), (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'));
