export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          ai_enabled: boolean
          subscription_tier: string
          subscription_status: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          ai_enabled?: boolean
          subscription_tier?: string
          subscription_status?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          ai_enabled?: boolean
          subscription_tier?: string
          subscription_status?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
          ai_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
          ai_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          avatar_url?: string | null
          ai_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      monitored_targets: {
        Row: {
          id: string
          user_id: string
          target_type: string
          target_value: string
          description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_type: string
          target_value: string
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_type?: string
          target_value?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      security_alerts: {
        Row: {
          id: string
          user_id: string
          target_id: string
          alert_type: string
          severity: string
          title: string
          description: string
          metadata: Json | null
          is_dismissed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_id: string
          alert_type: string
          severity: string
          title: string
          description: string
          metadata?: Json | null
          is_dismissed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_id?: string
          alert_type?: string
          severity?: string
          title?: string
          description?: string
          metadata?: Json | null
          is_dismissed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_alerts: {
        Row: {
          id: string
          user_id: string
          wallet_address: string
          alert_type: string
          severity: string
          title: string
          description: string
          confidence_score: number
          metadata: Json | null
          dismissed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          wallet_address: string
          alert_type: string
          severity: string
          title: string
          description: string
          confidence_score: number
          metadata?: Json | null
          dismissed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          wallet_address?: string
          alert_type?: string
          severity?: string
          title?: string
          description?: string
          confidence_score?: number
          metadata?: Json | null
          dismissed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
