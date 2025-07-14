"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ThreatCard } from "@/components/threat-card"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Shield, AlertTriangle, Eye, Activity, RefreshCw, Sparkles, Plus, Target } from "lucide-react"
import { Footer } from "@/components/footer"

interface Threat {
  id: string
  name: string
  source_ip: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  type: string
  blocked: boolean
}

interface DashboardData {
  threats: Threat[]
  timestamp: string
  totalThreats: number
  blockedThreats: number
}

interface DashboardStats {
  totalTargets: number
  activeTargets: number
  totalAlerts: number
  unreadAlerts: number
  criticalAlerts: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { isSignedIn, user, loading: authLoading } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalTargets: 0,
    activeTargets: 0,
    totalAlerts: 0,
    unreadAlerts: 0,
    criticalAlerts: 0,
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [aiInsights, setAiInsights] = useState<string>("")

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!authLoading && !isSignedIn) {
      router.push("/sign-in")
      return
    }
  }, [isSignedIn, authLoading, router])

  const fetchDashboardData = async () => {
    if (!user) return

    try {
      // Fetch monitoring targets stats
      const { data: targets, error: targetsError } = await supabase
        .from("monitoring_targets")
        .select("id, is_active")
        .eq("user_id", user.id)

      if (targetsError) {
        console.error("Error fetching targets:", targetsError)
      }

      // Fetch alerts stats
      const { data: alerts, error: alertsError } = await supabase
        .from("alerts")
        .select("id, severity, is_read")
        .eq("user_id", user.id)

      if (alertsError) {
        console.error("Error fetching alerts:", alertsError)
      }

      // Calculate stats
      const newStats = {
        totalTargets: targets?.length || 0,
        activeTargets: targets?.filter((t) => t.is_active).length || 0,
        totalAlerts: alerts?.length || 0,
        unreadAlerts: alerts?.filter((a) => !a.is_read).length || 0,
        criticalAlerts: alerts?.filter((a) => a.severity === "critical").length || 0,
      }

      setStats(newStats)

      // Fetch simulated threat data
      const response = await fetch("/api/threats")
      if (response.ok) {
        const threatData = await response.json()

        const transformedThreats = threatData.threats.map((threat: any) => ({
          ...threat,
          source_ip: threat.sourceIp || threat.source_ip,
        }))

        setData({
          ...threatData,
          threats: transformedThreats,
        })
      }

      setLastUpdate(new Date())

      // Generate AI insights
      generateAIInsights(data?.threats || [], newStats)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateAIInsights = (threats: Threat[], dashboardStats: DashboardStats) => {
    let insights = ""

    if (dashboardStats.totalTargets === 0) {
      insights =
        "🎯 Get started by adding your first monitoring target. Add wallet addresses, domains, or API endpoints to begin threat detection."
    } else if (dashboardStats.criticalAlerts > 0) {
      insights = `🚨 ${dashboardStats.criticalAlerts} critical alerts require immediate attention. Review your alerts page for detailed information.`
    } else if (dashboardStats.unreadAlerts > 0) {
      insights = `📬 You have ${dashboardStats.unreadAlerts} unread alerts. ${dashboardStats.activeTargets} targets are actively monitored.`
    } else if (threats.length === 0) {
      insights = `🛡️ All systems secure! ${dashboardStats.activeTargets} targets are being monitored with no active threats detected.`
    } else {
      const blockedCount = threats.filter((t) => t.blocked).length
      insights = `📊 Monitoring ${dashboardStats.activeTargets} targets. ${blockedCount} out of ${threats.length} recent threats have been automatically blocked.`
    }

    setAiInsights(insights)
  }

  useEffect(() => {
    if (!authLoading && isSignedIn && user) {
      fetchDashboardData()

      // Update every 30 seconds
      const interval = setInterval(fetchDashboardData, 30000)
      return () => clearInterval(interval)
    }
  }, [isSignedIn, user, authLoading])

  const getSeverityStats = () => {
    if (!data) return { critical: 0, high: 0, medium: 0, low: 0 }

    return data.threats.reduce(
      (acc, threat) => {
        acc[threat.severity]++
        return acc
      },
      { critical: 0, high: 0, medium: 0, low: 0 },
    )
  }

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if not signed in
  if (!isSignedIn) {
    return null
  }

  const severityStats = getSeverityStats()

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">Security Dashboard</h1>
              <p className="text-slate-400">Real-time threat monitoring and protection status</p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <div className="text-sm text-slate-400">Last updated: {lastUpdate.toLocaleTimeString()}</div>
              <Button variant="outline" size="sm" onClick={fetchDashboardData} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          {stats.totalTargets === 0 && (
            <Card className="mb-8 border-cyan-500/20 bg-cyan-500/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Get Started</h3>
                    <p className="text-slate-400 mb-4">
                      Add your first monitoring target to start detecting security threats
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Link href="/dashboard/targets">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Target
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Monitoring Targets</CardTitle>
                <Target className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.activeTargets}</div>
                <p className="text-xs text-slate-400">
                  {stats.totalTargets} total ({stats.activeTargets} active)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalAlerts}</div>
                <p className="text-xs text-slate-400">{stats.unreadAlerts} unread</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Critical Alerts</CardTitle>
                <Activity className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">{stats.criticalAlerts}</div>
                <p className="text-xs text-slate-400">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">System Status</CardTitle>
                <Eye className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-400">Active</span>
                </div>
                <p className="text-xs text-slate-400">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Card */}
          <Card className="mb-8 bg-slate-900/50 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-white">AI Security Insights</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                Real-time analysis of your security landscape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-slate-300">
                {aiInsights || "Analyzing current threat patterns..."}
              </p>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
              className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
              onClick={() => router.push("/dashboard/targets")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-cyan-400" />
                  Monitoring Targets
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your monitored assets and add new targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">{stats.totalTargets}</span>
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    Manage →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
              onClick={() => router.push("/dashboard/alerts")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertTriangle className="h-5 w-5 text-cyan-400" />
                  Security Alerts
                </CardTitle>
                <CardDescription className="text-slate-400">View and manage your security alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">{stats.unreadAlerts}</span>
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    View →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
              onClick={() => router.push("/dashboard/settings")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Settings
                </CardTitle>
                <CardDescription className="text-slate-400">Configure notifications and integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Configure</span>
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    Settings →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Severity Overview */}
          {data && data.threats.length > 0 && (
            <Card className="mb-8 bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Threat Activity</CardTitle>
                <CardDescription className="text-slate-400">Latest security events and threat levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
                    Critical: {severityStats.critical}
                  </Badge>
                  <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                    High: {severityStats.high}
                  </Badge>
                  <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                    Medium: {severityStats.medium}
                  </Badge>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Low: {severityStats.low}</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Threats */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Recent Threat Simulations</h2>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                Demo Data - Live Updates Every 30s
              </Badge>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-700 rounded"></div>
                        <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.threats.map((threat, index) => (
                  <ThreatCard key={threat.id} threat={threat} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
