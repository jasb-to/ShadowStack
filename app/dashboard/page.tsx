"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, Eye, Plus, Activity, Brain, Zap } from "lucide-react"
import { AiAlertCard } from "@/components/AiAlertCard"
import { checkAnomaly } from "@/lib/ai"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function DashboardPage() {
  const [alerts, setAlerts] = useState([])
  const [aiAlerts, setAiAlerts] = useState([])
  const [targets, setTargets] = useState([])
  const [loading, setLoading] = useState(true)
  const [aiEnabled, setAiEnabled] = useState(false)

  const supabase = createClientComponentClient()

  useEffect(() => {
    loadDashboardData()
    // Simulate AI anomaly detection
    simulateAiDetection()
  }, [])

  const loadDashboardData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Load user settings
      const { data: profile } = await supabase.from("user_profiles").select("ai_enabled").eq("id", user.id).single()

      if (profile) {
        setAiEnabled(profile.ai_enabled)
      }

      // Load alerts
      const { data: alertsData } = await supabase
        .from("alerts")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_read", false)
        .order("created_at", { ascending: false })
        .limit(10)

      if (alertsData) {
        setAlerts(alertsData)
      }

      // Load targets
      const { data: targetsData } = await supabase
        .from("targets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (targetsData) {
        setTargets(targetsData)
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const simulateAiDetection = async () => {
    if (!aiEnabled) return

    // Simulate an AI anomaly detection for demo
    const mockTransaction = {
      amount: "5.7",
      timestamp: new Date().toISOString(),
      type: "send" as const,
      hash: "0x1234567890abcdef1234567890abcdef12345678",
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const result = await checkAnomaly("0x742d35Cc6634C0532925a3b8D", mockTransaction, user.id)

      if (result.isAnomaly) {
        setAiAlerts([
          {
            ...result,
            walletAddress: "0x742d35Cc6634C0532925a3b8D",
            transaction: mockTransaction,
          },
        ])
      }
    } catch (error) {
      console.error("AI detection simulation error:", error)
    }
  }

  const stats = [
    {
      title: "Active Targets",
      value: targets.length.toString(),
      description: "Wallets being monitored",
      icon: Eye,
      color: "text-blue-400",
    },
    {
      title: "Active Alerts",
      value: alerts.length.toString(),
      description: "Unread security alerts",
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      title: "Threat Level",
      value: "Medium",
      description: "Current security status",
      icon: Shield,
      color: "text-yellow-400",
    },
    {
      title: "AI Detection",
      value: aiEnabled ? "Active" : "Disabled",
      description: "AI anomaly monitoring",
      icon: Brain,
      color: aiEnabled ? "text-purple-400" : "text-slate-400",
    },
  ]

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
          <p className="text-slate-400">Monitor your crypto assets and security threats</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Target
        </Button>
      </div>

      {/* AI Alerts Section */}
      {aiEnabled && aiAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI Anomaly Alerts
          </h2>
          {aiAlerts.map((alert, index) => (
            <AiAlertCard
              key={index}
              anomaly={alert}
              onDismiss={() => setAiAlerts(aiAlerts.filter((_, i) => i !== index))}
            />
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.description}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Recent Alerts
          </TabsTrigger>
          <TabsTrigger value="targets" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Monitored Targets
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity Feed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {alerts.length === 0 ? (
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No Active Alerts</h3>
                <p className="text-slate-400">Your monitored assets are secure</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert: any) => (
                <Card key={alert.id} className="bg-slate-900 border-slate-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        Security Alert
                      </CardTitle>
                      <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <CardDescription>{new Date(alert.created_at).toLocaleString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{alert.message_text}</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="targets" className="space-y-4">
          {targets.length === 0 ? (
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No Targets Added</h3>
                <p className="text-slate-400 mb-4">Start monitoring your crypto assets</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Target
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {targets.map((target: any) => (
                <Card key={target.id} className="bg-slate-900 border-slate-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white font-mono text-sm">{target.address}</CardTitle>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Active
                      </Badge>
                    </div>
                    <CardDescription>Added {new Date(target.created_at).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Type:</span>
                        <span className="text-white ml-2">{target.target_type}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Network:</span>
                        <span className="text-white ml-2">{target.network || "Ethereum"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-8 text-center">
              <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Activity Feed</h3>
              <p className="text-slate-400">Recent monitoring activity will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Feature Promotion */}
      {!aiEnabled && (
        <Alert className="border-purple-500/30 bg-purple-500/10">
          <Brain className="h-4 w-4 text-purple-400" />
          <AlertDescription className="text-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <strong>Try AI Anomaly Detection</strong> - Get smarter alerts with machine learning
              </div>
              <Button size="sm" variant="outline" className="border-purple-500 text-purple-300 bg-transparent">
                <Zap className="h-4 w-4 mr-2" />
                Enable AI
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
