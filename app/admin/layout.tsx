"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isSignedIn, loading } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAdmin, setCheckingAdmin] = useState(true)

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!isSignedIn || !user) {
        router.push("/sign-in")
        return
      }

      try {
        const { data: profile, error } = await supabase
          .from("user_profiles")
          .select("role, permissions")
          .eq("id", user.id)
          .single()

        if (error) throw error

        if (profile?.role === "admin") {
          setIsAdmin(true)
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error checking admin access:", error)
        router.push("/dashboard")
      } finally {
        setCheckingAdmin(false)
      }
    }

    if (!loading) {
      checkAdminAccess()
    }
  }, [isSignedIn, user, loading, router])

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Checking admin access...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  )
}
