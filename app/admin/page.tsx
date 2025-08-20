"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Users, Target, AlertTriangle, Activity, Home } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface AdminStats {
  totalUsers: number
  totalTargets: number
  totalAlerts: number
  activeAlerts: number
  recentUsers: Array<{
    id: string
    email: string
    created_at: string
    subscription_tier: string
  }>
  recentAlerts: Array<{
    id: string
    message: string
    severity: string
    user_email: string
    created_at: string
  }>
}

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTargets: 0,
    totalAlerts: 0,
    activeAlerts: 0,
    recentUsers: [],
    recentAlerts: [],
  })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/sign-in")
        return
      }

      if (!isAdmin) {
        router.push("/dashboard")
        return
      }

      fetchAdminStats()
    }
  }, [user, isAdmin, loading, router])

  const fetchAdminStats = async () => {
    try {
      if (!user || !isAdmin) return

      // Fetch user count
      const { count: userCount, error: usersError } = await supabase
        .from("user_profiles")
        .select("*", { count: "exact", head: true })

      if (usersError && usersError.code !== "PGRST116") {
        console.error("Error fetching user count:", usersError)
      }

      // Fetch recent users
      const { data: recentUsersData, error: recentUsersError } = await supabase
        .from("user_profiles")
        .select("id, email, created_at, subscription_tier")
        .order("created_at", { ascending: false })
        .limit(5)

      if (recentUsersError && recentUsersError.code !== "PGRST116") {
        console.error("Error fetching recent users:", recentUsersError)
      }

      // Fetch targets count
      const { count: targetsCount, error: targetsError } = await supabase
        .from("monitoring_targets")
        .select("*", { count: "exact", head: true })

      if (targetsError && targetsError.code !== "PGRST116") {
        console.error("Error fetching targets count:", targetsError)
      }

      // Fetch alerts count
      const { count: alertsCount, error: alertsError } = await supabase
        .from("alerts")
        .select("*", { count: "exact", head: true })

      if (alertsError && alertsError.code !== "PGRST116") {
        console.error("Error fetching alerts count:", alertsError)
      }

      // Fetch active alerts count
      const { count: activeAlertsCount, error: activeAlertsError } = await supabase
        .from("alerts")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false)

      if (activeAlertsError && activeAlertsError.code !== "PGRST116") {
        console.error("Error fetching active alerts count:", activeAlertsError)
      }

      // Fetch recent alerts with user info
      const { data: recentAlertsData, error: recentAlertsError } = await supabase
        .from("alerts")
        .select(`
          id,
          message_text,
          severity,
          created_at,
          user_profiles!inner(email)
        `)
        .order("created_at", { ascending: false })
        .limit(5)

      if (recentAlertsError && recentAlertsError.code !== "PGRST116") {
        console.error("Error fetching recent alerts:", recentAlertsError)
      }

      setStats({
        totalUsers: userCount || 0,
        totalTargets: targetsCount || 0,
        totalAlerts: alertsCount || 0,
        activeAlerts: activeAlertsCount || 0,
        recentUsers:
          recentUsersData?.map((user) => ({
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            subscription_tier: user.subscription_tier || "none",
          })) || [],
        recentAlerts:
          recentAlertsData?.map((alert) => ({
            id: alert.id,
            message: alert.message_text || "Security alert",
            severity: alert.severity || "medium",
            user_email: (alert.user_profiles as any)?.email || "Unknown",
            created_at: alert.created_at,
          })) || [],
      })
    } catch (error) {
      console.error("Error fetching admin stats:", error)
    } finally {
      setLoadingStats(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-400" />
          <p className="text-slate-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
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

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "scale":
        return "bg-purple-100 text-purple-800"
      case "growth":
        return "bg-blue-100 text-blue-800"
      case "starter":
        return "bg-green-100 text-green-800"
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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" className="text-slate-300 hover:text-white">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-slate-400">Platform overview and management</p>
                </div>
              </div>
            </div>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              <Building2 className="h-3 w-3 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {loadingStats ? "..." : stats.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400">Registered accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Monitoring Targets</CardTitle>
              <Target className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {loadingStats ? "..." : stats.totalTargets.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400">Assets being monitored</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Alerts</CardTitle>
              <Activity className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {loadingStats ? "..." : stats.totalAlerts.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400">Security alerts generated</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{loadingStats ? "..." : stats.activeAlerts}</div>
              <p className="text-xs text-slate-400">Requiring attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Users</CardTitle>
              <CardDescription className="text-slate-400">Latest user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <div className="text-center py-4">
                  <Activity className="h-6 w-6 animate-spin mx-auto mb-2 text-emerald-400" />
                  <p className="text-slate-400">Loading users...</p>
                </div>
              ) : stats.recentUsers.length === 0 ? (
                <div className="text-center py-4 text-slate-500">No recent users</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Plan</TableHead>
                      <TableHead className="text-slate-300">Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.recentUsers.map((user) => (
                      <TableRow key={user.id} className="border-slate-700">
                        <TableCell className="font-medium text-white">{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getTierColor(user.subscription_tier)}>{user.subscription_tier}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-400">{formatTimeAgo(user.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Alerts</CardTitle>
              <CardDescription className="text-slate-400">Latest security alerts across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <div className="text-center py-4">
                  <Activity className="h-6 w-6 animate-spin mx-auto mb-2 text-emerald-400" />
                  <p className="text-slate-400">Loading alerts...</p>
                </div>
              ) : stats.recentAlerts.length === 0 ? (
                <div className="text-center py-4 text-slate-500">No recent alerts</div>
              ) : (
                <div className="space-y-4">
                  {stats.recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border border-slate-700 rounded-lg">
                      <AlertTriangle className="h-4 w-4 mt-1 text-orange-400" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          <span className="text-xs text-slate-400">{alert.user_email}</span>
                        </div>
                        <p className="text-sm text-white">{alert.message}</p>
                        <p className="text-xs text-slate-400">{formatTimeAgo(alert.created_at)}</p>
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
  )
}
