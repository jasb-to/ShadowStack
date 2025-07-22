"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isSignedIn, user, loading, isAdmin } = useAuth()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (loading) return

    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }

    if (!isAdmin) {
      router.push("/dashboard")
      return
    }

    setChecking(false)
  }, [isSignedIn, user, loading, isAdmin, router])

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn || !isAdmin) {
    return null
  }

  return <>{children}</>
}
