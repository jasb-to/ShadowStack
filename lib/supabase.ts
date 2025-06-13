import { createClient } from "@supabase/supabase-js"

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Client-side Supabase client (uses anon key + user JWT)
export const supabase = createClient(
  supabaseUrl || "https://ufmysxronjaohovgoecc.supabase.co",
  supabaseAnonKey ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmbXlzeHJvbmphb2hvdmdvZWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzMDI0NzcsImV4cCI6MjAzMzg3ODQ3N30.Nh-hJRYGnQgxvdUEWwNgJN-kxTKyZXP5aQvmRsF-8QE",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
)

// Server-side Supabase client with admin privileges (uses service role key)
// Only create this if the service role key is available (server-side only)
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl || "https://ufmysxronjaohovgoecc.supabase.co", supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

// Types
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  company_name?: string
  subscription_tier: "none" | "basic" | "pro" | "enterprise"
  subscription_status: "active" | "inactive" | "past_due" | "canceled"
  subscription_id?: string
  current_period_end?: string
  created_at: string
}

export interface MonitoringTarget {
  id: string
  user_id: string
  target_type: "wallet" | "domain" | "email" | "api"
  target_value: string
  target_name?: string
  target_description?: string
  is_active: boolean
  created_at: string
}

export interface Alert {
  id: string
  user_id: string
  target_id: string
  severity: "critical" | "high" | "medium" | "low"
  source_channel: string
  message_text: string
  is_read: boolean
  is_blocked: boolean
  created_at: string
}

export interface UserIntegration {
  id: string
  user_id: string
  integration_type: string
  config: Record<string, any>
  is_active: boolean
  created_at: string
}

export interface NotificationPreferences {
  user_id: string
  email_alerts: boolean
  min_severity_for_email: "critical" | "high" | "medium" | "low"
  webhook_alerts: boolean
  created_at: string
}
