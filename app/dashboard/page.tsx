"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Activity, Globe, Brain, Lock, TrendingUp, Users, Eye, Zap, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalThreats: 0,
    activeMonitoring: 0,
    riskScore: 0,
    alertsToday: 0,
  })

  useEffect(() => {
    // Simulate loading and redirect if not authenticated
    const timer = setTimeout(() => {
      if (!authLoading && !user) {
        router.push("/sign-in?message=Please sign in to access the dashboard")
        return
      }

      // Mock data for demo
      setStats({
        totalThreats: 247,
        activeMonitoring: 12,
        riskScore: 85,
        alertsToday: 8,
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          <span className="text-xl">Loading ShadowStack Dashboard...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  const mockAlerts = [
    {
      id: 1,
      severity: "critical",
      message: "Suspicious API access detected from unknown IP",
      source: "API Monitor",
      time: "2 minutes ago",
      status: "active",
    },
    {
      id: 2,
      severity: "high",
      message: "Potential data exfiltration attempt blocked",
      source: "LLM Defense",
      time: "15 minutes ago",
      status: "resolved",
    },
    {
      id: 3,
      severity: "medium",
      message: "Unusual login pattern detected",
      source: "Behavior Analysis",
      time: "1 hour ago",
      status: "investigating",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ShadowStack Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Welcome back, {user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Activity className="w-4 h-4 mr-2" />
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Threats Detected</CardTitle>
              <Shield className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalThreats}</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Monitoring</CardTitle>
              <Eye className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeMonitoring}</div>
              <p className="text-xs text-gray-500">Targets being monitored</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Risk Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.riskScore}/100</div>
              <p className="text-xs text-gray-500">-5 points from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Alerts Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.alertsToday}</div>
              <p className="text-xs text-gray-500">3 critical, 5 medium</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  Recent Security Alerts
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Latest threats detected across your monitored assets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50">
                    <div className="flex-shrink-0">
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium">{alert.message}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span>{alert.source}</span>
                        <span>•</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-400" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">OSINT Monitoring</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">AI Threat Detection</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">API Monitoring</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email Alerts</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Enabled</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  AI Safety Toolkit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Prompt Injection Detection</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Model Exfiltration Guard</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Monitoring</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Behavior Analysis</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Learning</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Globe className="w-4 h-4 mr-2" />
                  Add Monitoring Target
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Lock className="w-4 h-4 mr-2" />
                  Run Security Scan
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Team Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
