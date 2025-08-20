"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Shield, Zap, Eye, Lock, Globe, Code, ArrowRight } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    id: "mission",
    title: "Our Mission",
    icon: Shield,
    content: `ShadowStack protects crypto exchanges and DeFi platforms by monitoring the dark web and public channels for threats against your hot wallets. We scan Telegram channels, Discord servers, and other platforms where hackers discuss potential targets, giving you early warning before attacks happen.`,
  },
  {
    id: "hot-wallets",
    title: "What are Hot Wallets?",
    icon: Lock,
    content: `Hot wallets are cryptocurrency wallets connected to the internet, used by exchanges for daily operations like processing withdrawals and trades. Unlike cold storage, hot wallets are vulnerable to online attacks because they're always connected. This makes them prime targets for hackers who monitor these addresses for large balances or suspicious activity.`,
  },
  {
    id: "threat-detection",
    title: "How We Detect Threats",
    icon: Eye,
    content: `Our AI-powered system continuously scans public Telegram channels, Discord servers, and dark web forums where hackers share information about potential targets. We look for mentions of your wallet addresses, domain names, and other sensitive assets, alerting you immediately when threats are detected.`,
  },
  {
    id: "supported-networks",
    title: "Supported Blockchain Networks",
    icon: Globe,
    content: `We monitor wallet addresses across major blockchain networks including Bitcoin (BTC), Ethereum (ETH), Binance Smart Chain (BSC), Solana (SOL), and TRON (TRX). Our system automatically detects the blockchain type when you add a wallet address.`,
  },
]

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/alerts",
    description: "Retrieve all security alerts for your account",
    response: "Array of alert objects with timestamp, severity, and details",
  },
  {
    method: "POST",
    endpoint: "/api/wallets",
    description: "Add a new wallet address for monitoring",
    body: "{ address: string, label?: string, network?: string }",
  },
  {
    method: "GET",
    endpoint: "/api/threats",
    description: "Get current threat intelligence data",
    response: "Real-time threat data from monitored channels",
  },
  {
    method: "POST",
    endpoint: "/api/webhooks",
    description: "Configure webhook notifications",
    body: "{ url: string, events: string[], secret?: string }",
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Complete guide to protecting your crypto exchange with ShadowStack's threat monitoring
            </p>
          </div>

          {/* Quick Start */}
          <Card className="bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 border-emerald-400/20 mb-12">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Quick Start Guide
              </CardTitle>
              <CardDescription className="text-slate-300">
                Get up and running with ShadowStack in 5 minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white">Sign up for an account</h4>
                  <p className="text-slate-300 text-sm">Create your ShadowStack account and choose a plan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white">Add your hot wallet addresses</h4>
                  <p className="text-slate-300 text-sm">
                    Go to Dashboard → Targets and add the wallet addresses you want to monitor
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white">Configure notifications</h4>
                  <p className="text-slate-300 text-sm">Set up email alerts and webhook integrations in Settings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-white">Monitor threats</h4>
                  <p className="text-slate-300 text-sm">
                    View real-time alerts in your dashboard and receive notifications
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8 mb-12">
            {sections.map((section) => (
              <Card key={section.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* API Documentation */}
          <Card className="bg-slate-800/50 border-slate-700 mb-12">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                API Reference
              </CardTitle>
              <CardDescription className="text-slate-300">
                Integrate ShadowStack into your existing security infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Authentication</h4>
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <code className="text-emerald-400 text-sm">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                  <p className="text-slate-300 text-sm mt-2">Get your API key from Dashboard → Settings → API Keys</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Endpoints</h4>
                  <div className="space-y-4">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant={endpoint.method === "GET" ? "default" : "secondary"}
                            className={endpoint.method === "GET" ? "bg-emerald-600" : "bg-blue-600"}
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-emerald-400">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">{endpoint.description}</p>
                        {endpoint.body && (
                          <div className="bg-slate-900 p-2 rounded text-xs">
                            <code className="text-cyan-400">{endpoint.body}</code>
                          </div>
                        )}
                        {endpoint.response && (
                          <p className="text-slate-400 text-xs mt-2">Returns: {endpoint.response}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Best Practices */}
          <Card className="bg-slate-800/50 border-slate-700 mb-12">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                Security Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Wallet Address Management</h4>
                  <ul className="text-slate-300 text-sm space-y-1 ml-4">
                    <li>• Only add hot wallet addresses that are actively used</li>
                    <li>• Use descriptive labels to identify each wallet's purpose</li>
                    <li>• Regularly review and remove unused wallet addresses</li>
                    <li>• Monitor both incoming and outgoing transactions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Alert Response</h4>
                  <ul className="text-slate-300 text-sm space-y-1 ml-4">
                    <li>• Respond to critical alerts within 15 minutes</li>
                    <li>• Have an incident response plan ready</li>
                    <li>• Consider moving funds when threats are detected</li>
                    <li>• Document all security incidents for analysis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Integration Security</h4>
                  <ul className="text-slate-300 text-sm space-y-1 ml-4">
                    <li>• Keep API keys secure and rotate them regularly</li>
                    <li>• Use webhook secrets to verify payload authenticity</li>
                    <li>• Implement rate limiting on your webhook endpoints</li>
                    <li>• Monitor API usage for unusual patterns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 border-emerald-400/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
              <p className="text-slate-300 mb-6">Our team is here to help you implement ShadowStack successfully</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/help"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Browse Help Center
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:info@shadowsignals.live"
                  className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 hover:bg-slate-800 px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Contact Support
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
