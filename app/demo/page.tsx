"use client"

import { useState } from "react"
import { Shield, Wallet, AlertTriangle, TrendingUp, Zap, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

interface DemoAlert {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  wallet: string
  timestamp: string
  blockchain: string
}

const demoWallets = [
  {
    id: "1",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    blockchain: "Bitcoin",
    balance: "12.45 BTC",
    securityScore: "A",
    riskLevel: "low",
    status: "active",
  },
  {
    id: "2",
    address: "0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e3e3",
    blockchain: "Ethereum",
    balance: "245.67 ETH",
    securityScore: "B+",
    riskLevel: "medium",
    status: "warning",
  },
  {
    id: "3",
    address: "DQA8fWX6QHuv57TeqJkHhgVrQqXceVMLyR",
    blockchain: "Solana",
    balance: "1,234.56 SOL",
    securityScore: "A-",
    riskLevel: "low",
    status: "active",
  },
]

const alertTemplates = [
  {
    type: "Anomaly Detection",
    severity: "high" as const,
    message: "Unusual withdrawal pattern detected - 3 large transactions in 10 minutes",
    blockchain: "Ethereum",
  },
  {
    type: "Security Alert",
    severity: "critical" as const,
    message: "Interaction with known mixer contract detected",
    blockchain: "Bitcoin",
  },
  {
    type: "Balance Alert",
    severity: "medium" as const,
    message: "Balance decreased by 15% in the last hour",
    blockchain: "Solana",
  },
  {
    type: "Approval Alert",
    severity: "high" as const,
    message: "Unlimited token approval granted to unverified contract",
    blockchain: "Ethereum",
  },
]

export default function DemoPage() {
  const [alerts, setAlerts] = useState<DemoAlert[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  const generateAlert = () => {
    const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)]
    const wallet = demoWallets[Math.floor(Math.random() * demoWallets.length)]

    const newAlert: DemoAlert = {
      id: Date.now().toString(),
      type: template.type,
      severity: template.severity,
      message: template.message,
      wallet: wallet.address,
      timestamp: "Just now",
      blockchain: template.blockchain,
    }

    setAlerts((prev) => [newAlert, ...prev.slice(0, 4)])
  }

  const startSimulation = () => {
    setIsSimulating(true)
    const interval = setInterval(() => {
      generateAlert()
    }, 3000)

    setTimeout(() => {
      clearInterval(interval)
      setIsSimulating(false)
    }, 15000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-500/20 text-blue-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "high":
        return "bg-orange-500/20 text-orange-400"
      case "critical":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  const getSecurityScoreColor = (score: string) => {
    if (score.startsWith("A")) return "text-emerald-400"
    if (score.startsWith("B")) return "text-yellow-400"
    if (score.startsWith("C")) return "text-orange-400"
    return "text-red-400"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <Badge variant="outline" className="border-emerald-400/30 text-emerald-400">
                <Zap className="w-3 h-3 mr-1" />
                Live Demo Environment
              </Badge>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                See ShadowStack in Action
              </h1>

              <p className="mx-auto max-w-[700px] text-slate-300 md:text-xl">
                Experience real-time wallet monitoring and security alerts with our interactive demo. See how
                ShadowStack protects crypto exchanges from threats.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                >
                  {isSimulating ? "Simulating Alerts..." : "Start Live Simulation"}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  <Link href="/onboarding">Start Your Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Dashboard */}
        <section className="py-12 bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="space-y-8">
              {/* Stats Overview */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">Total Wallets</CardTitle>
                    <Wallet className="h-4 w-4 text-emerald-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">3</div>
                    <p className="text-xs text-slate-400">2 active, 1 monitoring</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">Security Score</CardTitle>
                    <Shield className="h-4 w-4 text-emerald-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-400">A-</div>
                    <p className="text-xs text-slate-400">Average across all wallets</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">Active Alerts</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{alerts.length}</div>
                    <p className="text-xs text-slate-400">Real-time monitoring</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">Uptime</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                    <p className="text-xs text-slate-400">Last 30 days</p>
                  </CardContent>
                </Card>
              </div>

              {/* Wallet Monitoring */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-emerald-400" />
                      Monitored Wallets
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Real-time monitoring of hot wallet addresses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {demoWallets.map((wallet) => (
                      <div key={wallet.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(wallet.status)}
                          <div>
                            <div className="font-mono text-sm text-white">
                              {wallet.address.slice(0, 15)}...{wallet.address.slice(-8)}
                            </div>
                            <div className="text-xs text-slate-400">{wallet.blockchain}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getSecurityScoreColor(wallet.securityScore)}`}>
                            {wallet.securityScore}
                          </div>
                          <div className="text-xs text-slate-400">{wallet.balance}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Live Alerts */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Live Security Alerts
                      {isSimulating && (
                        <Badge className="bg-emerald-500/20 text-emerald-400">
                          <Zap className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Real-time threat detection and anomaly alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alerts.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Click "Start Live Simulation" to see alerts in action</p>
                      </div>
                    ) : (
                      alerts.map((alert) => (
                        <div key={alert.id} className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-l-orange-400">
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                            <span className="text-xs text-slate-400">{alert.timestamp}</span>
                          </div>
                          <p className="text-white text-sm font-medium mb-1">{alert.message}</p>
                          <p className="text-xs text-slate-400">
                            {alert.blockchain} • {alert.wallet.slice(0, 20)}...
                          </p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Proof of Reserves Demo */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Proof of Reserves Demo
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Generate embeddable badges to demonstrate solvency to your users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Reserve Coverage</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Total User Balances</span>
                          <span className="text-white">$2,450,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Total Reserves</span>
                          <span className="text-emerald-400">$2,573,500</span>
                        </div>
                        <Progress value={105} className="h-2" />
                        <div className="text-center">
                          <span className="text-2xl font-bold text-emerald-400">105%</span>
                          <p className="text-sm text-slate-400">Reserve Coverage</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Embeddable Badge</h3>
                      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="w-6 h-6 text-emerald-400" />
                          <div>
                            <div className="text-white font-semibold">ShadowStack Verified</div>
                            <div className="text-sm text-slate-400">Last audited: 2 minutes ago</div>
                          </div>
                        </div>
                        <div className="text-emerald-400 font-bold">105% Reserve Coverage</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                Ready to Protect Your Exchange?
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-300 md:text-xl">
                Start your 7-day free trial and experience enterprise-grade security monitoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                >
                  <Link href="/onboarding">Start Your 7-Day Trial</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  <Link href="/contact">Talk to Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
