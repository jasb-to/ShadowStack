export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          subscription_tier: string | null
          ai_enabled: boolean | null
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
          subscription_tier?: string | null
          ai_enabled?: boolean | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          subscription_tier?: string | null
          ai_enabled?: boolean | null
        }
      }
      targets: {
        Row: {
          id: string
          user_id: string
          wallet_address: string
          blockchain: string
          label: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          wallet_address: string
          blockchain: string
          label?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          wallet_address?: string
          blockchain?: string
          label?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          user_id: string
          target_id: string
          alert_type: string
          severity: string
          title: string
          description: string
          metadata: any | null
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
          metadata?: any | null
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
          metadata?: any | null
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
          metadata: any | null
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
          metadata?: any | null
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
          metadata?: any | null
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
  }
}
