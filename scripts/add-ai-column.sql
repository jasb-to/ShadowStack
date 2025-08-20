-- Add AI enabled column to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS ai_enabled BOOLEAN DEFAULT false;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_ai_enabled 
ON user_profiles(ai_enabled) 
WHERE ai_enabled = true;

-- Update existing users to have AI disabled by default
UPDATE user_profiles 
SET ai_enabled = false 
WHERE ai_enabled IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN user_profiles.ai_enabled IS 'Whether AI anomaly detection is enabled for this user';
