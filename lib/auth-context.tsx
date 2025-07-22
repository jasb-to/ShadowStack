"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "./supabase"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  isSignedIn: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      // Create user profile if it doesn't exist
      if (event === "SIGNED_IN" && session?.user) {
        await ensureUserProfile(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const ensureUserProfile = async (user: User) => {
    try {
      const { data: profile, error: fetchError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (fetchError && fetchError.code === "PGRST116") {
        // Profile doesn't exist, create it
        const { error: insertError } = await supabase.from("user_profiles").insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || null,
          company_name: user.user_metadata?.company_name || null,
          subscription_tier: "none",
          subscription_status: "inactive",
          role: "user",
        })

        if (insertError) {
          console.error("Error creating user profile:", insertError)
        }
      }
    } catch (error) {
      console.error("Error ensuring user profile:", error)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    router.push("/dashboard")
    router.refresh()
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    router.push("/auth/confirm")
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push("/")
    router.refresh()
  }

  const isAdmin = user?.email === "jaspalbilkhu@gmail.com"

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSignedIn: !!user,
        isAdmin,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
