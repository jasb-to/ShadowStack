-- Add AI enabled column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS ai_enabled BOOLEAN DEFAULT false;

-- Create AI alerts table
CREATE TABLE IF NOT EXISTS ai_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wallet_address TEXT NOT NULL,
    transaction_hash TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    anomaly_score DECIMAL NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    ai_summary TEXT NOT NULL,
    blockchain TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    dismissed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create AI transaction history table
CREATE TABLE IF NOT EXISTS ai_transaction_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_address TEXT NOT NULL,
    transaction_hash TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    blockchain TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_alerts_user_id ON ai_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_alerts_wallet_address ON ai_alerts(wallet_address);
CREATE INDEX IF NOT EXISTS idx_ai_alerts_dismissed ON ai_alerts(dismissed);
CREATE INDEX IF NOT EXISTS idx_ai_alerts_created_at ON ai_alerts(created_at);

CREATE INDEX IF NOT EXISTS idx_ai_transaction_history_wallet_address ON ai_transaction_history(wallet_address);
CREATE INDEX IF NOT EXISTS idx_ai_transaction_history_timestamp ON ai_transaction_history(timestamp);

-- Enable RLS (Row Level Security)
ALTER TABLE ai_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_transaction_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for ai_alerts
CREATE POLICY "Users can view their own AI alerts" ON ai_alerts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI alerts" ON ai_alerts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert AI alerts" ON ai_alerts
    FOR INSERT WITH CHECK (true);

-- Create RLS policies for ai_transaction_history
CREATE POLICY "System can insert transaction history" ON ai_transaction_history
    FOR INSERT WITH CHECK (true);

CREATE POLICY "System can select transaction history" ON ai_transaction_history
    FOR SELECT USING (true);

-- Add updated_at trigger for ai_alerts
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_alerts_updated_at BEFORE UPDATE ON ai_alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
