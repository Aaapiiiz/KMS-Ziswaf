-- Insert sample scholarship programs
INSERT INTO scholarship_programs (name, description, status, budget, recipients, target_recipients, start_date, end_date, department, coordinator_id) VALUES
('Beasiswa Mahasiswa Dhuafa 2024', 'Program beasiswa untuk mahasiswa kurang mampu tingkat S1', 'active', 2000000000, 150, 200, '2024-01-01', '2024-12-31', 'Pendayagunaan', (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1)),
('Beasiswa Santri Berprestasi', 'Beasiswa untuk santri berprestasi di pondok pesantren', 'planning', 1500000000, 0, 100, '2024-03-01', '2024-12-31', 'Pendayagunaan', (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com' LIMIT 1)),
('Beasiswa Mahasiswa S2 Unggulan', 'Program beasiswa untuk mahasiswa S2 dengan prestasi akademik tinggi', 'active', 3000000000, 25, 50, '2024-02-01', '2025-01-31', 'Pendayagunaan', (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1));

-- Insert document request templates
INSERT INTO document_request_templates (name, description, category, data_fields, deliverable_templates) VALUES
('Profil Penerima Beasiswa', 'Template untuk laporan profil dan karakteristik penerima beasiswa', 'reporting', 
 ARRAY['Jumlah penerima per wilayah', 'Distribusi jenjang pendidikan', 'Profil ekonomi keluarga', 'Prestasi akademik'],
 ARRAY['Dashboard interaktif profil penerima', 'Laporan PDF dengan visualisasi data', 'Dataset Excel untuk analisis lanjutan']),
('Evaluasi Dampak Program', 'Template untuk evaluasi dampak dan efektivitas program beasiswa', 'evaluation',
 ARRAY['Perbandingan prestasi akademik', 'Tingkat kelulusan', 'Dampak sosial ekonomi', 'Feedback penerima'],
 ARRAY['Laporan evaluasi dampak', 'Rekomendasi perbaikan program', 'Presentasi untuk stakeholder']),
('Laporan Keuangan Program', 'Template untuk laporan penggunaan dana dan alokasi budget', 'financial',
 ARRAY['Total dana tersalurkan', 'Breakdown per kategori', 'Efisiensi penggunaan dana', 'Proyeksi kebutuhan'],
 ARRAY['Laporan keuangan lengkap', 'Dashboard monitoring budget', 'Analisis cost-effectiveness']);

-- Insert sample document requests
INSERT INTO document_requests (program_id, title, description, requested_by, assigned_to, priority, due_date, status, data_requirements, deliverables, template_type, progress) VALUES
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Laporan Profil Penerima Beasiswa Q4 2024',
 'Laporan komprehensif tentang profil dan karakteristik penerima beasiswa',
 (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1),
 'Tim Data',
 'high',
 '2024-12-31',
 'in_progress',
 ARRAY['Jumlah total penerima beasiswa per wilayah', 'Distribusi penerima berdasarkan jenjang pendidikan', 'Profil ekonomi keluarga penerima', 'Prestasi akademik rata-rata penerima', 'Tingkat kelulusan dan keberlanjutan studi'],
 ARRAY['Dashboard interaktif profil penerima', 'Laporan PDF dengan visualisasi data', 'Dataset Excel untuk analisis lanjutan'],
 'recipient_profile',
 65),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Evaluasi Dampak Program Beasiswa',
 'Analisis dampak program beasiswa terhadap prestasi dan kondisi sosial ekonomi penerima',
 (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1),
 'Tim Evaluasi',
 'medium',
 '2025-01-15',
 'pending',
 ARRAY['Perbandingan IPK sebelum dan sesudah menerima beasiswa', 'Tingkat partisipasi dalam kegiatan kampus', 'Perubahan kondisi ekonomi keluarga', 'Feedback dan testimoni penerima beasiswa'],
 ARRAY['Laporan evaluasi dampak', 'Rekomendasi perbaikan program', 'Presentasi untuk stakeholder'],
 'impact_evaluation',
 0);

-- Insert sample scholarship recipients
INSERT INTO scholarship_recipients (program_id, name, email, phone, address, education_level, institution, gpa, family_income, province, city, gender, birth_date, status, scholarship_amount, start_date, end_date) VALUES
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Ahmad Rizki Pratama', 'ahmad.rizki@email.com', '081234567890', 'Jl. Merdeka No. 123, Jakarta', 'S1', 'Universitas Indonesia', 3.75, 2500000, 'DKI Jakarta', 'Jakarta Pusat', 'male', '2002-05-15', 'active', 5000000, '2024-01-15', '2024-12-31'),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Siti Nurhaliza Putri', 'siti.nurhaliza@email.com', '081234567891', 'Jl. Sudirman No. 456, Bandung', 'S1', 'Institut Teknologi Bandung', 3.85, 2000000, 'Jawa Barat', 'Bandung', 'female', '2001-08-22', 'active', 5000000, '2024-01-15', '2024-12-31'),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Muhammad Fajar Sidiq', 'fajar.sidiq@email.com', '081234567892', 'Jl. Diponegoro No. 789, Yogyakarta', 'S1', 'Universitas Gadjah Mada', 3.65, 1800000, 'DI Yogyakarta', 'Yogyakarta', 'male', '2002-12-10', 'active', 5000000, '2024-01-15', '2024-12-31'),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa S2 Unggulan' LIMIT 1),
 'Dr. Andi Wijaya', 'andi.wijaya@email.com', '081234567893', 'Jl. Thamrin No. 321, Jakarta', 'S2', 'Universitas Indonesia', 3.90, 3000000, 'DKI Jakarta', 'Jakarta Selatan', 'male', '1995-03-18', 'active', 10000000, '2024-02-01', '2025-01-31'),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa S2 Unggulan' LIMIT 1),
 'Dewi Sartika Maharani', 'dewi.sartika@email.com', '081234567894', 'Jl. Gatot Subroto No. 654, Surabaya', 'S2', 'Institut Teknologi Sepuluh Nopember', 3.95, 2800000, 'Jawa Timur', 'Surabaya', 'female', '1994-07-25', 'active', 10000000, '2024-02-01', '2025-01-31');

-- Insert sample document request updates
INSERT INTO document_request_updates (request_id, user_id, progress, note) VALUES
((SELECT id FROM document_requests WHERE title = 'Laporan Profil Penerima Beasiswa Q4 2024' LIMIT 1),
 (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1),
 30,
 'Data collection phase completed. Started data analysis and visualization.'),
((SELECT id FROM document_requests WHERE title = 'Laporan Profil Penerima Beasiswa Q4 2024' LIMIT 1),
 (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1),
 65,
 'Dashboard prototype ready for review. Waiting for feedback before finalization.');
