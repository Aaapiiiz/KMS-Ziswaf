-- Update existing activities with new fields
UPDATE activities SET 
  priority = 'high',
  start_date = '2024-11-01',
  end_date = '2025-03-31',
  progress = 65,
  budget = 2500000000,
  target_beneficiaries = 500,
  current_beneficiaries = 325,
  tags = ARRAY['beasiswa', 'pendidikan', 'kolaborasi'],
  departments = ARRAY['Pendayagunaan', 'Keuangan', 'Marketing']
WHERE name = 'Program Beasiswa';

UPDATE activities SET 
  priority = 'medium',
  start_date = '2025-01-15',
  end_date = '2025-06-30',
  progress = 15,
  budget = 800000000,
  target_beneficiaries = 1000,
  current_beneficiaries = 0,
  tags = ARRAY['kesehatan', 'sistem', 'monitoring'],
  departments = ARRAY['IT', 'Pendayagunaan', 'SDM']
WHERE name = 'Bantuan Kesehatan';

UPDATE activities SET 
  priority = 'high',
  start_date = '2024-09-01',
  end_date = '2025-08-31',
  progress = 45,
  budget = 3200000000,
  target_beneficiaries = 200,
  current_beneficiaries = 90,
  tags = ARRAY['umkm', 'pemberdayaan', 'ekonomi'],
  departments = ARRAY['Pendayagunaan', 'Marketing', 'Keuangan']
WHERE name = 'Pemberdayaan UMKM';

UPDATE activities SET 
  priority = 'high',
  start_date = '2024-01-01',
  end_date = '2024-10-31',
  progress = 100,
  budget = 1500000000,
  target_beneficiaries = 0,
  current_beneficiaries = 0,
  tags = ARRAY['digitalisasi', 'transformasi', 'sistem'],
  departments = ARRAY['IT', 'Penghimpunan', 'Pendayagunaan', 'Keuangan']
WHERE name = 'Infrastruktur Masjid';

-- Insert activity participants
INSERT INTO activity_participants (activity_id, user_id, role) VALUES
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), 'Lead'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), 'Finance Coordinator'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com'), 'Outreach Specialist'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'), 'Program Officer');

INSERT INTO activity_participants (activity_id, user_id, role) VALUES
((SELECT id FROM activities WHERE name = 'Bantuan Kesehatan'), (SELECT id FROM users WHERE email = 'rizki.pratama@ziswaf.com'), 'Tech Lead'),
((SELECT id FROM activities WHERE name = 'Bantuan Kesehatan'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), 'Business Analyst'),
((SELECT id FROM activities WHERE name = 'Bantuan Kesehatan'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), 'Process Coordinator');

-- Insert activity milestones
INSERT INTO activity_milestones (activity_id, title, description, target_date, completion_date, status, created_by) VALUES
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Project Initiation', 'Kick-off meeting dan pembentukan tim', '2024-11-01', '2024-11-01', 'completed', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Criteria Development', 'Pengembangan kriteria seleksi penerima', '2024-11-15', '2024-11-15', 'completed', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Marketing Campaign Launch', 'Peluncuran campaign awareness', '2024-12-01', '2024-12-01', 'completed', (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Application Period', 'Periode penerimaan aplikasi beasiswa', '2024-12-15', NULL, 'active', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Selection Process', 'Proses seleksi dan evaluasi aplikasi', '2025-01-15', NULL, 'pending', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Scholarship Distribution', 'Distribusi beasiswa kepada penerima', '2025-02-01', NULL, 'pending', (SELECT id FROM users WHERE email = 'admin@ziswaf.com'));

-- Insert activity meetings
INSERT INTO activity_meetings (activity_id, title, description, meeting_date, duration_minutes, attendees_count, meeting_notes, created_by) VALUES
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Kick-off Meeting', 'Initial planning and role assignment', '2024-11-01 10:00:00', 120, 8, 'Initial planning and role assignment completed successfully', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Budget Review', 'Budget allocation discussion', '2024-11-15 14:00:00', 90, 5, 'Budget allocation finalized and approved', (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Marketing Strategy', 'Outreach strategy planning', '2024-12-01 09:00:00', 60, 6, 'Marketing campaign strategy approved and launched', (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com'));

-- Insert activity discussions
INSERT INTO activity_discussions (activity_id, user_id, message) VALUES
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), 'Tim, kita perlu finalisasi kriteria seleksi penerima beasiswa minggu ini.'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com'), 'Sudah ada update dari tim marketing terkait campaign awareness. Response rate cukup baik.'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), 'Budget tracking bulan ini sudah on track. Detailed report akan saya share besok.');
