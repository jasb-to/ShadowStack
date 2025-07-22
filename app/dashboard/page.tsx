"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, ShieldCheck, PlusCircle, Settings, Bell, Loader2, BarChart2 } from "lucide-react"

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [stats, setStats] = useState({ targets: 0, alerts: 0, riskScore: "Low" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return
      setLoading(true)
      try {
        const { count: targetsCount, error: targetsError } = await supabase
          .from("monitoring_targets")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
        if (targetsError) throw targetsError

        const { count: alertsCount, error: alertsError } = await supabase
          .from("alerts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
        if (alertsError) throw alertsError

        // Basic risk score logic
        let riskScore = "Low"
        if (alertsCount && alertsCount > 10) riskScore = "Medium"
        if (alertsCount && alertsCount > 50) riskScore = "High"

        setStats({
          targets: targetsCount || 0,
          alerts: alertsCount || 0,
          riskScore,
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchStats()
    } else if (!authLoading) {
      setLoading(false)
    }
  }, [user, authLoading])

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">Please sign in to view your dashboard.</p>
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="flex-1 p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.user_metadata?.full_name || user.email}!</h1>
          <p className="text-muted-foreground">Here's a snapshot of your security posture.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Active Targets"
          value={stats.targets}
          icon={Activity}
          description="Assets you are monitoring"
        />
        <StatCard title="Total Alerts" value={stats.alerts} icon={Bell} description="Threats detected" />
        <StatCard
          title="Overall Risk"
          value={stats.riskScore}
          icon={ShieldCheck}
          description="Calculated from alert severity"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ActionButton
              href="/dashboard/targets"
              icon={PlusCircle}
              title="Add a Target"
              description="Monitor a new website or API."
            />
            <ActionButton
              href="/dashboard/alerts"
              icon={Bell}
              title="View Alerts"
              description="Review recent security events."
            />
            <ActionButton
              href="/dashboard/settings"
              icon={Settings}
              title="Manage Settings"
              description="Configure notifications and integrations."
            />
            <ActionButton
              href="/admin"
              icon={BarChart2}
              title="Admin Panel"
              description="View platform-wide statistics."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of recent alerts will be shown here.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40 text-muted-foreground">
            <p>Alert feed coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: { title: string; value: string | number; icon: React.ElementType; description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function ActionButton({
  href,
  icon: Icon,
  title,
  description,
}: { href: string; icon: React.ElementType; title: string; description: string }) {
  return (
    <Button variant="outline" className="h-auto justify-start p-4 bg-transparent" asChild>
      <Link href={href}>
        <div className="flex items-center">
          <Icon className="h-6 w-6 mr-4" />
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-muted-foreground text-left">{description}</p>
          </div>
        </div>
      </Link>
    </Button>
  )
}
