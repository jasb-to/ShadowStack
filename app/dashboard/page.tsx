"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThreatCard } from "@/components/threat-card"
import { AiAlertCard } from "@/components/AiAlertCard"
import { Shield, AlertTriangle, Eye, TrendingUp, Plus, Brain, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import type { AiAlert } from "@/lib/ai"

// Mock data for demonstration
const mockThreats = [
  {
    id: "1",
    title: "Suspicious wallet activity detected",
    description: "Unusual transaction pattern observed on monitored wallet",
    severity: "high" as const,
    timestamp: "2024-01-15T10:30:00Z",
    source: "AI Detection",
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
  },
  {
    id: "2",
    title: "Large outbound transaction",
    description: "Transaction of 15.5 ETH detected from hot wallet",
    severity: "medium" as const,
    timestamp: "2024-01-15T09:15:00Z",
    source: "Transaction Monitor",
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
  },
]

export default function DashboardPage() {
  const [aiEnabled, setAiEnabled] = useState(false)
  const [aiAlerts, setAiAlerts] = useState<AiAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalWallets: 0,
    activeAlerts: 0,
    threatLevel: "low" as "low" | "medium" | "high" | "critical",
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Load user AI settings
      const { data: userProfile } = await supabase.from("users").select("ai_enabled").eq("id", user.id).single()

      if (userProfile) {
        setAiEnabled(userProfile.ai_enabled || false)
      }

      // Load AI alerts if enabled
      if (userProfile?.ai_enabled) {
        const { data: alerts } = await supabase
          .from("ai_alerts")
          .select("*")
          .eq("user_id", user.id)
          .eq("dismissed", false)
          .order("created_at", { ascending: false })
          .limit(5)

        setAiAlerts(alerts || [])
      }

      // Load basic stats (mock data for now)
      setStats({
        totalWallets: 3,
        activeAlerts: mockThreats.length + (aiAlerts.length || 0),
        threatLevel: "medium",
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDismissAiAlert = (alertId: string) => {
    setAiAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const handlePauseWallet = (walletAddress: string) => {
    // Handle wallet pause logic
    console.log("Pausing wallet:", walletAddress)
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getThreatLevelProgress = (level: string) => {
    switch (level) {
      case "critical":
        return 100
      case "high":
        return 75
      case "medium":
        return 50
      case "low":
        return 25
      default:
        return 0
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-slate-800 rounded w-1/4"></div>
              <div className="grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-slate-800 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
              <p className="text-slate-300 mt-1">Monitor your crypto assets and security threats</p>
            </div>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/dashboard/targets">
                <Plus className="w-4 h-4 mr-2" />
                Add Wallet
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Monitored Wallets</CardTitle>
                <Eye className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalWallets}</div>
                <p className="text-xs text-slate-400">Active monitoring</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.activeAlerts}</div>
                <p className="text-xs text-slate-400">Requiring attention</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Threat Level</CardTitle>
                <Shield className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Badge className={getThreatLevelColor(stats.threatLevel)}>{stats.threatLevel.toUpperCase()}</Badge>
                </div>
                <Progress value={getThreatLevelProgress(stats.threatLevel)} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* AI Promotion or AI Alerts */}
          {!aiEnabled ? (
            <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        Upgrade to AI-Powered Security
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                          Free Beta
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        Get intelligent anomaly detection and AI-generated security insights
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Link href="/dashboard/settings?tab=ai">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enable AI
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Pattern Analysis</div>
                      <div className="text-sm text-slate-400">7-day transaction baselines</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Anomaly Detection</div>
                      <div className="text-sm text-slate-400">Real-time suspicious activity</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Smart Summaries</div>
                      <div className="text-sm text-slate-400">AI-generated insights</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            aiAlerts.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">AI Security Alerts</h2>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                    {aiAlerts.length} Active
                  </Badge>
                </div>
                <div className="space-y-4">
                  {aiAlerts.map((alert) => (
                    <AiAlertCard
                      key={alert.id}
                      alert={alert}
                      onDismiss={handleDismissAiAlert}
                      onPause={handlePauseWallet}
                    />
                  ))}
                </div>
              </div>
            )
          )}

          {/* Recent Threats */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Security Alerts</h2>
              <Button
                variant="outline"
                asChild
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <Link href="/dashboard/alerts">View All</Link>
              </Button>
            </div>

            {mockThreats.length > 0 ? (
              <div className="space-y-4">
                {mockThreats.map((threat) => (
                  <ThreatCard key={threat.id} threat={threat} />
                ))}
              </div>
            ) : (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="text-center py-8">
                  <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">All Clear</h3>
                  <p className="text-slate-400">No security threats detected at this time.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-20 border-slate-600 hover:bg-slate-800 bg-transparent">
              <Link href="/dashboard/targets" className="flex flex-col items-center gap-2">
                <Plus className="w-6 h-6" />
                <span>Add Wallet</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-slate-600 hover:bg-slate-800 bg-transparent">
              <Link href="/dashboard/alerts" className="flex flex-col items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                <span>View Alerts</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-slate-600 hover:bg-slate-800 bg-transparent">
              <Link href="/dashboard/settings" className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6" />
                <span>Settings</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-slate-600 hover:bg-slate-800 bg-transparent">
              <Link href="/help" className="flex flex-col items-center gap-2">
                <Eye className="w-6 h-6" />
                <span>Help Center</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
