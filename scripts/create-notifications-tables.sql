-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('document_verification', 'read_request', 'read_confirmation', 'document_status')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    requires_action BOOLEAN DEFAULT FALSE,
    action_type VARCHAR(50) CHECK (action_type IN ('mark_as_read', 'verify_document', 'respond')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notification_actions table for tracking actions taken
CREATE TABLE IF NOT EXISTS notification_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL,
    action_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notification_preferences table for user preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    document_verification BOOLEAN DEFAULT TRUE,
    read_requests BOOLEAN DEFAULT TRUE,
    document_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_to_user_id ON notifications(to_user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_from_user_id ON notifications(from_user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_document_id ON notifications(document_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_requires_action ON notifications(requires_action);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_notifications_updated_at 
    BEFORE UPDATE ON notifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at 
    BEFORE UPDATE ON notification_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (to_user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (to_user_id = auth.uid());

CREATE POLICY "Users can create notifications" ON notifications
    FOR INSERT WITH CHECK (from_user_id = auth.uid());

-- Create RLS policies for notification_actions
CREATE POLICY "Users can view their own notification actions" ON notification_actions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own notification actions" ON notification_actions
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create RLS policies for notification_preferences
CREATE POLICY "Users can manage their own notification preferences" ON notification_preferences
    FOR ALL USING (user_id = auth.uid());
