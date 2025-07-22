"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Target, AlertCircle, Loader2 } from "lucide-react"

export default function AdminPage() {
  const { isAdmin, loading: authLoading, user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({ users: 0, targets: 0, alerts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/sign-in")
    } else if (!authLoading && user && !isAdmin) {
      router.push("/dashboard")
    }
  }, [user, isAdmin, authLoading, router])

  useEffect(() => {
    const fetchAdminStats = async () => {
      if (!isAdmin) return
      setLoading(true)
      try {
        // Note: These queries require RLS policies that allow admins to read.
        // Or they can be moved to an API route that uses the service_role key.
        const { count: usersCount, error: usersError } = await supabase
          .from("user_profiles")
          .select("*", { count: "exact", head: true })
        if (usersError) throw usersError

        const { count: targetsCount, error: targetsError } = await supabase
          .from("monitoring_targets")
          .select("*", { count: "exact", head: true })
        if (targetsError) throw targetsError

        const { count: alertsCount, error: alertsError } = await supabase
          .from("alerts")
          .select("*", { count: "exact", head: true })
        if (alertsError) throw alertsError

        setStats({
          users: usersCount || 0,
          targets: targetsCount || 0,
          alerts: alertsCount || 0,
        })
      } catch (error) {
        console.error("Error fetching admin stats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isAdmin) {
      fetchAdminStats()
    }
  }, [isAdmin])

  if (authLoading || loading || !isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
        <p className="ml-4">Verifying admin access...</p>
      </div>
    )
  }

  return (
    <main className="flex-1 p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Platform-wide overview and statistics.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Users" value={stats.users} icon={Users} />
        <StatCard title="Total Targets" value={stats.targets} icon={Target} />
        <StatCard title="Total Alerts" value={stats.alerts} icon={AlertCircle} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40 text-muted-foreground">
            <p>User table coming soon.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40 text-muted-foreground">
            <p>Monitoring service status coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function StatCard({ title, value, icon: Icon }: { title: string; value: string | number; icon: React.ElementType }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
