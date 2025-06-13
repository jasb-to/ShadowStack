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
  const { isSignedIn, user } = useAuth()
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
    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }
  }, [isSignedIn, router])

  const fetchDashboardData = async () => {
    try {
      // Fetch monitoring targets stats
      const { data: targets, error: targetsError } = await supabase
        .from("monitoring_targets")
        .select("id, is_active")
        .eq("user_id", user?.id)

      if (targetsError) throw targetsError

      // Fetch alerts stats
      const { data: alerts, error: alertsError } = await supabase
        .from("alerts")
        .select("id, severity, is_read")
        .eq("user_id", user?.id)

      if (alertsError) throw alertsError

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
      const threatData = await response.json()

      const transformedThreats = threatData.threats.map((threat: any) => ({
        ...threat,
        source_ip: threat.sourceIp || threat.source_ip,
      }))

      setData({
        ...threatData,
        threats: transformedThreats,
      })
      setLastUpdate(new Date())

      // Generate AI insights
      generateAIInsights(transformedThreats, newStats)
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
    if (!isSignedIn) return

    fetchDashboardData()

    // Update every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)

    return () => clearInterval(interval)
  }, [isSignedIn, user])

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

  // Don't render dashboard if not signed in
  if (!isSignedIn) {
    return null
  }

  const severityStats = getSeverityStats()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
              <p className="text-muted-foreground">Real-time threat monitoring and protection status</p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <div className="text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</div>
              <Button variant="outline" size="sm" onClick={fetchDashboardData} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          {stats.totalTargets === 0 && (
            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Get Started</h3>
                    <p className="text-muted-foreground mb-4">
                      Add your first monitoring target to start detecting security threats
                    </p>
                  </div>
                  <Button asChild>
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
            <Card className="shadow-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monitoring Targets</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeTargets}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalTargets} total ({stats.activeTargets} active)
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAlerts}</div>
                <p className="text-xs text-muted-foreground">{stats.unreadAlerts} unread</p>
              </CardContent>
            </Card>

            <Card className="shadow-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{stats.criticalAlerts}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="shadow-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-500">Active</span>
                </div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Card */}
          <Card className="mb-8 shadow-glow border-purple-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <CardTitle>AI Security Insights</CardTitle>
              </div>
              <CardDescription>Real-time analysis of your security landscape</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{aiInsights || "Analyzing current threat patterns..."}</p>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/dashboard/targets")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Monitoring Targets
                </CardTitle>
                <CardDescription>Manage your monitored assets and add new targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{stats.totalTargets}</span>
                  <Button variant="ghost" size="sm">
                    Manage →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/dashboard/alerts")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Security Alerts
                </CardTitle>
                <CardDescription>View and manage your security alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{stats.unreadAlerts}</span>
                  <Button variant="ghost" size="sm">
                    View →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/dashboard/settings")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Settings
                </CardTitle>
                <CardDescription>Configure notifications and integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Configure</span>
                  <Button variant="ghost" size="sm">
                    Settings →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Severity Overview */}
          {data && data.threats.length > 0 && (
            <Card className="mb-8 shadow-glow">
              <CardHeader>
                <CardTitle>Recent Threat Activity</CardTitle>
                <CardDescription>Latest security events and threat levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                    Critical: {severityStats.critical}
                  </Badge>
                  <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                    High: {severityStats.high}
                  </Badge>
                  <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                    Medium: {severityStats.medium}
                  </Badge>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Low: {severityStats.low}</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Threats */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Threat Simulations</h2>
              <Badge variant="outline">Demo Data - Live Updates Every 30s</Badge>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
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
