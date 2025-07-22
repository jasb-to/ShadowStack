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
      if (error) {
        // This can happen if the profile is not created yet.
        if (error.code !== "PGRST116") {
          throw error
        }
        return false
      }
      return data?.role === "admin"
    } catch (error) {
      console.error("Error checking admin role:", error)
      return false
    }
  }

  useEffect(() => {
    let mounted = true

    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          if (session?.user) {
            const isAdminUser = await checkAdminRole(session.user.id)
            setIsAdmin(isAdminUser)
          }
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          const isAdminUser = await checkAdminRole(session.user.id)
          setIsAdmin(isAdminUser)
        } else {
          setIsAdmin(false)
        }
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      // This is the corrected line.
      // We ensure subscription exists before trying to unsubscribe.
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    router.push("/dashboard")
  }

  const signUp = async (email: string, password: string, fullName: string, company?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: company,
        },
      },
    })
    if (error) throw error
    // You might want to redirect to a "please check your email" page
    alert("Check your email for the confirmation link!")
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
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
