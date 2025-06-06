"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ThreatCard } from "@/components/threat-card"
import { useAuth } from "@/lib/auth-context"
import { Shield, AlertTriangle, Eye, Activity, RefreshCw, Sparkles } from "lucide-react"

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

export default function DashboardPage() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
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

  const fetchThreats = async () => {
    try {
      const response = await fetch("/api/threats")
      const newData = await response.json()

      // Transform the data to match our interface
      const transformedThreats = newData.threats.map((threat: any) => ({
        ...threat,
        source_ip: threat.sourceIp || threat.source_ip,
      }))

      setData({
        ...newData,
        threats: transformedThreats,
      })
      setLastUpdate(new Date())

      // Generate AI insights
      generateAIInsights(transformedThreats)
    } catch (error) {
      console.error("Failed to fetch threats:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateAIInsights = (threats: Threat[]) => {
    const criticalCount = threats.filter((t) => t.severity === "critical").length
    const blockedCount = threats.filter((t) => t.blocked).length
    const totalCount = threats.length

    let insights = ""

    if (criticalCount > 0) {
      insights += `🚨 ${criticalCount} critical threats detected requiring immediate attention. `
    }

    if (blockedCount > 0) {
      insights += `✅ ${blockedCount} out of ${totalCount} threats have been automatically blocked. `
    }

    if (totalCount === 0) {
      insights = "🛡️ No active threats detected. Your systems are secure and all monitoring systems are operational."
    } else {
      insights += `📊 Current threat landscape shows ${totalCount} active monitoring events with automated protection systems engaged.`
    }

    setAiInsights(insights)
  }

  useEffect(() => {
    if (!isSignedIn) return

    fetchThreats()

    // Update every 30 seconds
    const interval = setInterval(fetchThreats, 30000)

    return () => clearInterval(interval)
  }, [isSignedIn])

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
              <Button variant="outline" size="sm" onClick={fetchThreats} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.totalThreats || 0}</div>
                <p className="text-xs text-muted-foreground">Active monitoring</p>
              </CardContent>
            </Card>

            <Card className="shadow-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blocked Threats</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{data?.blockedThreats || 0}</div>
                <p className="text-xs text-muted-foreground">Automatically blocked</p>
              </CardContent>
            </Card>

            <Card className="shadow-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{severityStats.critical}</div>
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

          {/* Severity Overview */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle>Threat Severity Distribution</CardTitle>
              <CardDescription>Current threat levels across your infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
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

          {/* Threats Grid */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Threats</h2>
              <Badge variant="outline">Live Updates Every 30s</Badge>
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
    </div>
  )
}
