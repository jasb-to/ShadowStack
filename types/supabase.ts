export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: string
          price_id: string | null
          quantity: number | null
          cancel_at_period_end: boolean | null
          created: string
          current_period_start: string
          current_period_end: string
          ended_at: string | null
          cancel_at: string | null
          canceled_at: string | null
          trial_start: string | null
          trial_end: string | null
        }
        Insert: {
          id: string
          user_id: string
          status: string
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          created?: string
          current_period_start?: string
          current_period_end?: string
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          created?: string
          current_period_start?: string
          current_period_end?: string
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
      }
      users: {
        Row: {
          id: string
          clerk_id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
          stripe_customer_id: string | null
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          name?: string | null
          created_at?: string
          updated_at?: string
          stripe_customer_id?: string | null
        }
      }
      threats: {
        Row: {
          id: string
          name: string
          source_ip: string
          severity: string
          timestamp: string
          type: string
          blocked: boolean
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          source_ip: string
          severity: string
          timestamp?: string
          type: string
          blocked: boolean
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          source_ip?: string
          severity?: string
          timestamp?: string
          type?: string
          blocked?: boolean
          user_id?: string
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

export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"]
export type User = Database["public"]["Tables"]["users"]["Row"]
export type Threat = Database["public"]["Tables"]["threats"]["Row"]
