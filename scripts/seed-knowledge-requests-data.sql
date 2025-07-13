-- Insert knowledge segments
INSERT INTO knowledge_segments (name, description, icon, color) VALUES
('Zakat', 'Pengetahuan tentang zakat dan pengelolaannya', '🕌', 'blue'),
('Infaq', 'Pengetahuan tentang infaq dan sedekah', '💰', 'green'),
('Wakaf', 'Pengetahuan tentang wakaf dan pengelolaannya', '🏛️', 'purple'),
('Pendayagunaan', 'Program dan strategi pendayagunaan', '🎯', 'orange'),
('Penghimpunan  '🏛️', 'purple'),
('Pendayagunaan', 'Program dan strategi pendayagunaan', '🎯', 'orange'),
('Penghimpunan', 'Strategi dan metode penghimpunan dana', '📈', 'red'),
('Keuangan', 'Manajemen keuangan dan akuntansi', '💼', 'indigo'),
('SDM', 'Manajemen sumber daya manusia', '👥', 'pink'),
('Teknologi', 'Sistem dan teknologi informasi', '💻', 'cyan'),
('Hukum & Regulasi', 'Aspek hukum dan regulasi ziswaf', '⚖️', 'yellow'),
('Audit & Compliance', 'Audit internal dan kepatuhan', '🔍', 'gray');

-- Insert attachment types
INSERT INTO attachment_types (name, description, icon, category) VALUES
('SOP (Standard Operating Procedure)', 'Prosedur operasional standar', '📋', 'procedure'),
('Template Dokumen', 'Template untuk berbagai dokumen', '📄', 'template'),
('Form & Formulir', 'Form dan formulir untuk input data', '📝', 'form'),
('Panduan & Petunjuk', 'Panduan dan petunjuk teknis', '📖', 'guide'),
('Regulasi & Kebijakan', 'Dokumen regulasi dan kebijakan', '⚖️', 'regulation'),
('Format Laporan', 'Template dan format laporan', '📊', 'report'),
('Checklist & Audit', 'Checklist untuk audit dan verifikasi', '✅', 'checklist'),
('Materi Training', 'Materi untuk pelatihan dan edukasi', '🎓', 'training'),
('Referensi & Rujukan', 'Dokumen referensi dan rujukan', '📚', 'reference'),
('Flowchart & Diagram', 'Diagram alur dan flowchart proses', '🔄', 'diagram');

-- Insert sample knowledge requests
INSERT INTO knowledge_requests (title, description, segment_id, requested_by, department, priority, status, due_date, progress, segment_specific) VALUES
(
  'SOP Verifikasi Mustahik Program Beasiswa',
  'Membutuhkan SOP lengkap untuk proses verifikasi calon penerima beasiswa dengan kriteria yang jelas dan terukur',
  (SELECT id FROM knowledge_segments WHERE name = 'Pendayagunaan'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'Pendayagunaan',
  'high',
  'in_progress',
  '2024-12-30',
  65,
  '{"targetGroup": "Mahasiswa kurang mampu", "criteria": ["IPK minimal 3.0", "Penghasilan keluarga < 3 juta", "Aktif berorganisasi"], "scope": "Nasional", "additionalRequirements": ["Surat keterangan tidak mampu dari kelurahan", "Transkrip nilai terbaru", "Surat rekomendasi dari dosen pembimbing"]}'
),
(
  'Template Laporan Keuangan Bulanan',
  'Template standar untuk laporan keuangan bulanan setiap departemen dengan format yang konsisten',
  (SELECT id FROM knowledge_segments WHERE name = 'Keuangan'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'Keuangan',
  'medium',
  'pending',
  '2024-12-25',
  25,
  '{"reportingPeriod": "Bulanan", "departments": ["Semua departemen"], "compliance": ["PSAK", "Regulasi OJK"], "format": "Excel dan PDF"}'
),
(
  'Panduan Audit Internal Ziswaf',
  'Panduan komprehensif untuk pelaksanaan audit internal program ziswaf sesuai standar internasional',
  (SELECT id FROM knowledge_segments WHERE name = 'Audit & Compliance'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'Audit Internal',
  'high',
  'completed',
  '2024-12-15',
  100,
  '{"auditScope": ["Program Zakat", "Program Infaq", "Program Wakaf"], "frequency": "Triwulanan", "standards": ["ISO 19011", "COSO Framework"]}'
);

-- Insert sample attachment requests
INSERT INTO knowledge_request_attachments (request_id, attachment_type_id, description, is_required, status, uploaded_file_name, uploaded_by, uploaded_at) VALUES
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM attachment_types WHERE name = 'SOP (Standard Operating Procedure)'),
  'SOP verifikasi dokumen mustahik dengan flowchart proses',
  TRUE,
  'completed',
  'SOP_Verifikasi_Mustahik_v1.pdf',
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  '2024-11-25'
),
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM attachment_types WHERE name = 'Form & Formulir'),
  'Form assessment kelayakan dengan scoring system',
  TRUE,
  'in_progress',
  NULL,
  NULL,
  NULL
),
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM attachment_types WHERE name = 'Checklist & Audit'),
  'Checklist verifikasi berkas dan dokumen pendukung',
  FALSE,
  'pending',
  NULL,
  NULL,
  NULL
);

-- Insert sample updates
INSERT INTO knowledge_request_updates (request_id, user_id, message, progress, attachment_files) VALUES
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'SOP verifikasi mustahik telah selesai dibuat dan sudah diupload. Sedang dalam proses review internal.',
  65,
  ARRAY['SOP_Verifikasi_Mustahik_v1.pdf']
),
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'Terima kasih atas progress yang sudah dicapai. Mohon untuk form assessment juga segera diselesaikan.',
  45,
  ARRAY[]::TEXT[]
);
