import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Ensure environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL")
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create and export the Supabase client for client-side use
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Function to create a server-side client for API routes and Server Actions
export function createServerClient() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseServiceKey) {
    throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY for server operations")
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// --- Database Types ---
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  company_name?: string
  subscription_tier: "none" | "basic" | "pro" | "enterprise"
  subscription_status: "active" | "inactive" | "past_due" | "canceled"
  subscription_id?: string
  current_period_end?: string
  role?: "user" | "admin"
  permissions?: string[]
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
