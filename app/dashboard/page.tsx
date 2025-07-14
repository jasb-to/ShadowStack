"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, Activity, Eye, Target, TrendingUp, Globe, Brain } from "lucide-react"

// Force dynamic rendering
export const dynamic = "force-dynamic"

interface ThreatData {
  id: string
  severity: "low" | "medium" | "high" | "critical"
  type: string
  source: string
  description: string
  timestamp: string
  status: "active" | "resolved" | "investigating"
}

interface DashboardStats {
  totalThreats: number
  criticalThreats: number
  resolvedThreats: number
  monitoredEndpoints: number
  riskScore: number
  uptime: number
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalThreats: 0,
    criticalThreats: 0,
    resolvedThreats: 0,
    monitoredEndpoints: 0,
    riskScore: 0,
    uptime: 99.9,
  })
  const [threats, setThreats] = useState<ThreatData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && user) {
      loadDashboardData()
    }
  }, [user, authLoading])

  const loadDashboardData = async () => {
    try {
      // Load real alerts data
      const { data: alerts, error: alertsError } = await supabase
        .from("alerts")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(10)

      // Load monitoring targets
      const { data: targets, error: targetsError } = await supabase
        .from("monitoring_targets")
        .select("*")
        .eq("user_id", user?.id)

      if (alertsError || targetsError) {
        console.error("Error loading dashboard data:", { alertsError, targetsError })
        // Create demo data if no real data exists
        createDemoData()
        return
      }

      // Process real data
      const totalThreats = alerts?.length || 0
      const criticalThreats = alerts?.filter((a) => a.severity === "critical").length || 0
      const resolvedThreats = alerts?.filter((a) => a.status === "resolved").length || 0
      const monitoredEndpoints = targets?.length || 0

      setStats({
        totalThreats,
        criticalThreats,
        resolvedThreats,
        monitoredEndpoints,
        riskScore: criticalThreats > 0 ? 85 : 25,
        uptime: 99.9,
      })

      // Transform alerts to threat format
      const threatData: ThreatData[] =
        alerts?.map((alert) => ({
          id: alert.id,
          severity: alert.severity,
          type: alert.alert_type || "Security Alert",
          source: alert.source || "System",
          description: alert.message,
          timestamp: alert.created_at,
          status: alert.status || "active",
        })) || []

      setThreats(threatData)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      createDemoData()
    } finally {
      setLoading(false)
    }
  }

  const createDemoData = () => {
    // Demo data for new users
    const demoThreats: ThreatData[] = [
      {
        id: "1",
        severity: "high",
        type: "Suspicious API Access",
        source: "API Gateway",
        description: "Unusual access pattern detected from IP 192.168.1.100",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: "investigating",
      },
      {
        id: "2",
        severity: "medium",
        type: "Rate Limit Exceeded",
        source: "Load Balancer",
        description: "Client exceeded rate limit by 300% in last 5 minutes",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        status: "active",
      },
      {
        id: "3",
        severity: "low",
        type: "New Device Login",
        source: "Auth Service",
        description: "Login from new device detected for user@example.com",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        status: "resolved",
      },
    ]

    setThreats(demoThreats)
    setStats({
      totalThreats: 3,
      criticalThreats: 0,
      resolvedThreats: 1,
      monitoredEndpoints: 12,
      riskScore: 35,
      uptime: 99.9,
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "investigating":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "active":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading security dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-cyan-400" />
                Security Dashboard
              </h1>
              <p className="text-slate-400 mt-1">Real-time threat monitoring and protection status</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Activity className="w-3 h-3 mr-1" />
                System Online
              </Badge>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                <Target className="w-4 h-4 mr-2" />
                Add Target
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalThreats}</div>
              <p className="text-xs text-slate-400">
                {stats.criticalThreats} critical, {stats.resolvedThreats} resolved
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Risk Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.riskScore}/100</div>
              <p className="text-xs text-slate-400">
                {stats.riskScore < 50 ? "Low risk" : stats.riskScore < 80 ? "Medium risk" : "High risk"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Monitored Endpoints</CardTitle>
              <Globe className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.monitoredEndpoints}</div>
              <p className="text-xs text-slate-400">Active monitoring</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.uptime}%</div>
              <p className="text-xs text-slate-400">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="threats" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="threats" className="data-[state=active]:bg-slate-800">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Live Threats
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-slate-800">
              <Eye className="w-4 h-4 mr-2" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="ai-safety" className="data-[state=active]:bg-slate-800">
              <Brain className="w-4 h-4 mr-2" />
              AI Safety
            </TabsTrigger>
          </TabsList>

          <TabsContent value="threats" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  Recent Threats
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time security alerts and anomaly detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threats.length > 0 ? (
                    threats.map((threat) => (
                      <div
                        key={threat.id}
                        className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getSeverityColor(threat.severity)}>{threat.severity}</Badge>
                              <Badge className={getStatusColor(threat.status)}>{threat.status}</Badge>
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{threat.type}</h4>
                              <p className="text-sm text-slate-400">{threat.description}</p>
                              <p className="text-xs text-slate-500 mt-1">
                                {threat.source} • {new Date(threat.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-600 bg-transparent">
                          Investigate
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">No active threats detected</p>
                      <p className="text-sm text-slate-500">Your systems are secure</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-cyan-400" />
                    OSINT Monitoring
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Dark web and social media breach detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Telegram Channels</span>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Dark Web Forums</span>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Slack Monitoring</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Limited</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Monitored Assets
                  </CardTitle>
                  <CardDescription className="text-slate-400">Endpoints and assets under protection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">API Endpoints</span>
                      <span className="text-white font-medium">{stats.monitoredEndpoints}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Domain Names</span>
                      <span className="text-white font-medium">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">IP Addresses</span>
                      <span className="text-white font-medium">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-safety" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI Safety Toolkit
                </CardTitle>
                <CardDescription className="text-slate-400">LLM-specific threat defense and monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Prompt Injection Detection</h4>
                        <p className="text-sm text-slate-400">Real-time analysis of user inputs</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Model Exfiltration Alerts</h4>
                        <p className="text-sm text-slate-400">Detect unauthorized model access</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Behavior Monitoring</h4>
                        <p className="text-sm text-slate-400">Track LLM usage patterns</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Beta</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Risk Scoring</h4>
                        <p className="text-sm text-slate-400">AI endpoint risk assessment</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
