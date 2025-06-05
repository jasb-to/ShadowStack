import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Zap, ChevronRight, Eye, Bell, Server } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 flex-1">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Next-Gen Cybersecurity
              </span>{" "}
              for Modern Teams
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Real-time threat detection, intelligent monitoring, and automated protection for your APIs, SaaS tools,
              and developer infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/pricing">
                  View Pricing <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/dashboard">Live Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">Intelligent Protection That Adapts</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Security that learns your patterns and protects what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-glow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Alerts</h3>
                <p className="text-muted-foreground">
                  Instant notifications about potential security threats targeting your systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-glow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">API Protection</h3>
                <p className="text-muted-foreground">
                  Comprehensive security for your APIs with attack detection and prevention.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-glow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Infrastructure Monitoring</h3>
                <p className="text-muted-foreground">
                  Keep your cloud infrastructure secure with continuous monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-glow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Automated Protection</h3>
                <p className="text-muted-foreground">
                  Smart systems that automatically block threats before they cause damage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-glow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-muted-foreground">
                  Advanced AI that analyzes threats and provides actionable recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-glow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
                <p className="text-muted-foreground">
                  Deploy in minutes with intelligent auto-configuration and integration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Digital Assets?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of teams already protecting their systems with ShadowStack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/pricing">
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ShadowStack</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ShadowStack. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
