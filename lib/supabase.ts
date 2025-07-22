import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Mock Supabase for preview environment
const isMockMode = typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")

// Environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log("🔧 Supabase Configuration:")
console.log("URL:", supabaseUrl)
console.log("Mock Mode:", isMockMode)
console.log("Anon Key:", supabaseAnonKey ? "✅ Present" : "❌ Missing")

// Create mock client for preview environment
const createMockClient = () => {
  return {
    auth: {
      getSession: async () => {
        const mockSession = localStorage.getItem("mock-session")
        return {
          data: { session: mockSession ? JSON.parse(mockSession) : null },
          error: null,
        }
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        console.log("🎭 Mock sign in:", email)

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock successful login
        const mockUser = {
          id: "mock-user-id",
          email: email,
          user_metadata: {
            full_name: "Demo User",
            company_name: "Demo Company",
          },
        }

        const mockSession = {
          user: mockUser,
          access_token: "mock-token",
          refresh_token: "mock-refresh",
        }

        localStorage.setItem("mock-session", JSON.stringify(mockSession))

        return {
          data: { user: mockUser, session: mockSession },
          error: null,
        }
      },
      signUp: async ({ email, password, options }: any) => {
        console.log("🎭 Mock sign up:", email)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockUser = {
          id: "mock-user-id",
          email: email,
          user_metadata: options?.data || {},
        }

        return {
          data: { user: mockUser },
          error: null,
        }
      },
      signOut: async () => {
        console.log("🎭 Mock sign out")
        localStorage.removeItem("mock-session")
        return { error: null }
      },
      onAuthStateChange: (callback: Function) => {
        console.log("🎭 Mock auth state change listener")

        // Check for existing session on mount
        const mockSession = localStorage.getItem("mock-session")
        if (mockSession) {
          setTimeout(() => {
            callback("SIGNED_IN", JSON.parse(mockSession))
          }, 100)
        }

        return {
          data: {
            subscription: {
              unsubscribe: () => console.log("🎭 Mock unsubscribe"),
            },
          },
        }
      },
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: { code: "PGRST116" } }),
        }),
      }),
      insert: async () => ({ error: null }),
    }),
  }
}

// Singleton pattern for the client
let supabaseInstance: SupabaseClient | null = null

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  }
  return supabaseInstance
}

export const supabase = getSupabase()

// Server-side client for API routes
export function createServerClient() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseServiceKey) {
    console.error("❌ SUPABASE_SERVICE_ROLE_KEY is missing")
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for server operations")
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Database types
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
