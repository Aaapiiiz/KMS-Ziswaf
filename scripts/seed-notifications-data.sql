-- Insert sample notification preferences for existing users
INSERT INTO notification_preferences (user_id, email_notifications, push_notifications, document_verification, read_requests, document_status)
SELECT 
    id,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE
FROM users
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample notifications for admin users
INSERT INTO notifications (type, title, message, document_id, from_user_id, to_user_id, is_read, requires_action, action_type, metadata)
SELECT 
    'read_confirmation',
    'Konfirmasi Pembacaan',
    'Ahmad Fauzi telah membaca dokumen ' || d.title,
    d.id,
    u1.id,
    u2.id,
    FALSE,
    FALSE,
    NULL,
    '{"priority": "medium"}'::jsonb
FROM documents d
CROSS JOIN (SELECT id FROM users WHERE role = 'user' LIMIT 1) u1
CROSS JOIN (SELECT id FROM users WHERE role = 'admin' LIMIT 1) u2
WHERE d.title LIKE '%SOP%'
LIMIT 3;

-- Insert sample verification requests for admin
INSERT INTO notifications (type, title, message, document_id, from_user_id, to_user_id, is_read, requires_action, action_type, metadata)
SELECT 
    'document_verification',
    'Permintaan Verifikasi',
    'Dokumen baru memerlukan verifikasi: ' || d.title,
    d.id,
    u1.id,
    u2.id,
    FALSE,
    TRUE,
    'verify_document',
    '{"priority": "high"}'::jsonb
FROM documents d
CROSS JOIN (SELECT id FROM users WHERE role = 'user' LIMIT 1) u1
CROSS JOIN (SELECT id FROM users WHERE role = 'admin' LIMIT 1) u2
WHERE d.verification_status = 'pending'
LIMIT 2;

-- Insert sample read requests for users
INSERT INTO notifications (type, title, message, document_id, from_user_id, to_user_id, is_read, requires_action, action_type, metadata)
SELECT 
    'read_request',
    'Permintaan Baca Dokumen',
    'Admin meminta Anda untuk membaca: ' || d.title,
    d.id,
    u1.id,
    u2.id,
    FALSE,
    TRUE,
    'mark_as_read',
    jsonb_build_object(
        'priority', 'high',
        'deadline', (NOW() + INTERVAL '7 days')::text
    )
FROM documents d
CROSS JOIN (SELECT id FROM users WHERE role = 'admin' LIMIT 1) u1
CROSS JOIN (SELECT id FROM users WHERE role = 'user' LIMIT 1) u2
WHERE d.is_mandatory = TRUE
LIMIT 2;

-- Insert sample document status notifications for users
INSERT INTO notifications (type, title, message, document_id, from_user_id, to_user_id, is_read, requires_action, action_type, metadata)
SELECT 
    'document_status',
    'Status Verifikasi',
    CASE 
        WHEN d.verification_status = 'approved' THEN 'Dokumen Anda "' || d.title || '" telah disetujui'
        WHEN d.verification_status = 'rejected' THEN 'Dokumen Anda "' || d.title || '" ditolak'
        ELSE 'Dokumen Anda "' || d.title || '" memerlukan revisi'
    END,
    d.id,
    u1.id,
    u2.id,
    FALSE,
    CASE WHEN d.verification_status = 'revision_requested' THEN TRUE ELSE FALSE END,
    CASE WHEN d.verification_status = 'revision_requested' THEN 'respond' ELSE NULL END,
    jsonb_build_object(
        'verification_status', d.verification_status,
        'priority', CASE WHEN d.verification_status = 'revision_requested' THEN 'medium' ELSE 'low' END
    )
FROM documents d
CROSS JOIN (SELECT id FROM users WHERE role = 'admin' LIMIT 1) u1
CROSS JOIN (SELECT id FROM users WHERE role = 'user' LIMIT 1) u2
WHERE d.verification_status IN ('approved', 'rejected', 'revision_requested')
LIMIT 3;

-- Update timestamps to make notifications appear recent
UPDATE notifications 
SET created_at = NOW() - (RANDOM() * INTERVAL '7 days')
WHERE created_at < NOW() - INTERVAL '1 day';
