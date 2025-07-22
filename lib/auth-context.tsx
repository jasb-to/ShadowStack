"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  session: Session | null
  isAdmin: boolean
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
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("user_profiles").select("role").eq("id", userId).single()
      if (error && error.code !== "PGRST116") throw error
      return data?.role === "admin"
    } catch (error) {
      console.error("Error checking admin role:", error)
      return false
    }
  }

  useEffect(() => {
    setLoading(true)
    const { subscription } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          const isAdminUser = await checkAdminRole(session.user.id)
          setIsAdmin(isAdminUser)
        } else {
          setIsAdmin(false)
        }
        setLoading(false)
      },
    )

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    router.push("/dashboard")
    router.refresh() // Ensures the layout re-renders with the new auth state
  }

  const signUp = async (email: string, password: string, fullName: string, company?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, company_name: company },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) throw error
    // Redirect to a page that tells the user to confirm their email
    router.push("/auth/confirm")
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const value = {
    user,
    session,
    isAdmin,
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
