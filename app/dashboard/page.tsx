"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Target, Plus, Settings, Bell, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface DashboardStats {
  totalTargets: number
  activeAlerts: number
  riskScore: number
  recentAlerts: Array<{
    id: string
    message: string
    severity: "low" | "medium" | "high" | "critical"
    timestamp: string
  }>
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const upgraded = searchParams.get("upgraded")

  const [stats, setStats] = useState<DashboardStats>({
    totalTargets: 0,
    activeAlerts: 0,
    riskScore: 0,
    recentAlerts: [],
  })
  const [loadingStats, setLoadingStats] = useState(true)
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false)

  useEffect(() => {
    if (upgraded === "true") {
      setShowUpgradeMessage(true)
      // Remove the query parameter
      router.replace("/dashboard")
    }
  }, [upgraded, router])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in")
      return
    }

    if (user) {
      fetchStats()
    }
  }, [user, loading, router])

  const fetchStats = async () => {
    try {
      if (!user) return

      // Fetch monitoring targets
      const { data: targets, error: targetsError } = await supabase
        .from("monitoring_targets")
        .select("*")
        .eq("user_id", user.id)

      if (targetsError && targetsError.code !== "PGRST116") {
        console.error("Error fetching targets:", targetsError)
      }

      // Fetch alerts
      const { data: alerts, error: alertsError } = await supabase
        .from("alerts")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_read", false)
        .order("created_at", { ascending: false })
        .limit(5)

      if (alertsError && alertsError.code !== "PGRST116") {
        console.error("Error fetching alerts:", alertsError)
      }

      // Calculate risk score based on alerts and targets
      const targetCount = targets?.length || 0
      const alertCount = alerts?.length || 0
      const riskScore = Math.min(100, alertCount * 15 + Math.max(0, targetCount - 5) * 5)

      // Format recent alerts
      const recentAlerts =
        alerts?.map((alert) => ({
          id: alert.id,
          message: alert.message || "Security alert detected",
          severity: alert.severity || "medium",
          timestamp: new Date(alert.created_at).toLocaleString(),
        })) || []

      setStats({
        totalTargets: targetCount,
        activeAlerts: alertCount,
        riskScore: Math.round(riskScore),
        recentAlerts,
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

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    if (score >= 40) return "text-yellow-600"
    return "text-green-600"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-16">
        {/* Upgrade Success Message */}
        {showUpgradeMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mx-4 mt-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">Successfully upgraded! Your new plan features are now active.</p>
              </div>
              <div className="ml-auto pl-3">
                <button onClick={() => setShowUpgradeMessage(false)} className="text-green-400 hover:text-green-600">
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.email}</p>
              </div>
              <div className="flex space-x-3">
                <Link href="/dashboard/settings">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Link href="/dashboard/alerts">
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Alerts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
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
                <p className="text-xs text-muted-foreground">Active monitoring targets</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loadingStats ? "..." : stats.activeAlerts}</div>
                <p className="text-xs text-muted-foreground">Requiring attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getRiskScoreColor(stats.riskScore)}`}>
                  {loadingStats ? "..." : stats.riskScore}%
                </div>
                <p className="text-xs text-muted-foreground">Overall security risk</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your monitoring and security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/dashboard/targets">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Monitoring Target
                  </Button>
                </Link>
                <Link href="/dashboard/alerts">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    View All Alerts
                  </Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Latest security alerts and notifications</CardDescription>
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
                  <p className="font-medium">No recent alerts</p>
                  <p className="text-sm">Your monitoring targets are secure</p>
                  <Link href="/dashboard/targets">
                    <Button className="mt-4 bg-transparent" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Target
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <AlertTriangle className="h-5 w-5 mt-0.5 text-orange-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.timestamp}</p>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
