"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, AlertTriangle, Activity, Plus, Settings, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface DashboardStats {
  totalTargets: number
  totalAlerts: number
  activeAlerts: number
  recentAlerts: Array<{
    id: string
    message: string
    severity: string
    created_at: string
  }>
}

export default function DashboardPage() {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalTargets: 0,
    totalAlerts: 0,
    activeAlerts: 0,
    recentAlerts: [],
  })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in")
      return
    }

    if (user) {
      fetchDashboardStats()
    }
  }, [user, loading, router])

  const fetchDashboardStats = async () => {
    try {
      if (!user) return

      // Fetch user's targets count
      const { count: targetsCount, error: targetsError } = await supabase
        .from("monitoring_targets")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)

      if (targetsError && targetsError.code !== "PGRST116") {
        console.error("Error fetching targets count:", targetsError)
      }

      // Fetch user's alerts count
      const { count: alertsCount, error: alertsError } = await supabase
        .from("alerts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)

      if (alertsError && alertsError.code !== "PGRST116") {
        console.error("Error fetching alerts count:", alertsError)
      }

      // Fetch user's active alerts count
      const { count: activeAlertsCount, error: activeAlertsError } = await supabase
        .from("alerts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false)

      if (activeAlertsError && activeAlertsError.code !== "PGRST116") {
        console.error("Error fetching active alerts count:", activeAlertsError)
      }

      // Fetch recent alerts
      const { data: recentAlertsData, error: recentAlertsError } = await supabase
        .from("alerts")
        .select("id, message, severity, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      if (recentAlertsError && recentAlertsError.code !== "PGRST116") {
        console.error("Error fetching recent alerts:", recentAlertsError)
      }

      setStats({
        totalTargets: targetsCount || 0,
        totalAlerts: alertsCount || 0,
        activeAlerts: activeAlertsCount || 0,
        recentAlerts: recentAlertsData || [],
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoadingStats(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Button asChild variant="outline">
                    <Link href="/admin">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Link>
                  </Button>
                )}
                <Button asChild>
                  <Link href="/dashboard/targets">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Target
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monitoring Targets</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loadingStats ? "..." : stats.totalTargets}</div>
                <p className="text-xs text-muted-foreground">Assets being monitored</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loadingStats ? "..." : stats.totalAlerts}</div>
                <p className="text-xs text-muted-foreground">Security alerts generated</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{loadingStats ? "..." : stats.activeAlerts}</div>
                <p className="text-xs text-muted-foreground">Requiring attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your security monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/dashboard/targets">
                    <Target className="h-4 w-4 mr-2" />
                    Manage Monitoring Targets
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/dashboard/alerts">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    View All Alerts
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/pricing">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest security notifications</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <div className="text-center py-4">
                    <Activity className="h-6 w-6 animate-spin mx-auto mb-2" />
                    <p>Loading alerts...</p>
                  </div>
                ) : stats.recentAlerts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No alerts yet</p>
                    <p className="text-sm">Add monitoring targets to start receiving alerts</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <AlertTriangle className="h-4 w-4 mt-1 text-orange-500" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                            <span className="text-xs text-gray-500">{formatTimeAgo(alert.created_at)}</span>
                          </div>
                          <p className="text-sm text-gray-900">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
