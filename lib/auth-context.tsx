"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { User, Session } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  session: Session | null
  isSignedIn: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, company?: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log("Getting initial session...")
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
        }

        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          console.log("User is signed in:", session.user.email)

          // Check if user profile exists, create if not
          const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()

          if (!profile) {
            console.log("Creating user profile...")
            await supabase.from("user_profiles").insert({
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name,
              company_name: session.user.user_metadata?.company_name,
            })
          }
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === "SIGNED_IN" && session?.user) {
        // Check if user profile exists, create if not
        const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()

        if (!profile) {
          console.log("Creating user profile on sign in...")
          await supabase.from("user_profiles").insert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name,
            company_name: session.user.user_metadata?.company_name,
          })
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      console.log("Sign in successful:", data.user?.email)
      return data
    } catch (error: any) {
      console.error("Sign in error:", error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string, company?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: company || null,
          },
        },
      })

      if (error) throw error

      console.log("Sign up successful:", data.user?.email)

      // Create user profile
      if (data.user) {
        await supabase.from("user_profiles").insert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          company_name: company || null,
        })
      }

      return data
    } catch (error: any) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      console.log("Sign out successful")
    } catch (error: any) {
      console.error("Sign out error:", error)
      throw error
    }
  }

  const value = {
    user,
    session,
    isSignedIn: !!user,
    signIn,
    signUp,
    signOut,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
