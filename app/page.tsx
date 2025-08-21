"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, Zap, Building2, TrendingUp, Users, Globe, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const features = [
  {
    icon: Shield,
    title: "Real-Time Monitoring",
    description: "24/7 surveillance of your hot wallets across Bitcoin, Ethereum, BSC, Solana, and TRON networks.",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Get notified within seconds of suspicious activity via email, Slack, Discord, or custom webhooks.",
  },
  {
    icon: TrendingUp,
    title: "Anomaly Detection",
    description: "AI-powered algorithms detect unusual patterns and potential security threats before they escalate.",
  },
  {
    icon: Building2,
    title: "Proof of Reserves",
    description: "Generate embeddable badges and Merkle proofs to demonstrate solvency to your users.",
  },
  {
    icon: Users,
    title: "Multi-Chain Support",
    description: "Monitor wallets across all major blockchains from a single, unified dashboard.",
  },
  {
    icon: Globe,
    title: "White-Label Ready",
    description: "Customize the dashboard with your branding and integrate seamlessly into your platform.",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, CryptoVault Exchange",
    content:
      "ShadowStack caught a potential exploit attempt that our internal systems missed. It's now essential to our security stack.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Security Lead, BitTrade Pro",
    content:
      "The real-time alerts and proof-of-reserves features have significantly improved our user trust and regulatory compliance.",
    rating: 5,
  },
  {
    name: "Elena Kowalski",
    role: "CEO, Nordic Crypto",
    content:
      "Implementation took less than 30 minutes. The ROI in terms of security and user confidence has been incredible.",
    rating: 5,
  },
]

const stats = [
  { label: "Exchanges Protected", value: "150+" },
  { label: "Wallets Monitored", value: "10K+" },
  { label: "Threats Blocked", value: "2.3M+" },
  { label: "Uptime", value: "99.9%" },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
          <div className="container mx-auto relative px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center space-y-8 text-center">
              <Badge variant="outline" className="border-emerald-400/30 text-emerald-400 px-4 py-2">
                <Building2 className="w-4 h-4 mr-2" />
                Trusted by 150+ Crypto Exchanges
              </Badge>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent max-w-5xl">
                Enterprise Security
                <br />
                for Crypto Exchanges
              </h1>

              <p className="mx-auto max-w-[700px] text-slate-300 text-lg md:text-xl leading-relaxed">
                Real-time wallet monitoring, anomaly detection, and proof-of-reserves for crypto exchanges. Protect your
                hot wallets and build user trust with enterprise-grade security.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-6 text-lg"
                >
                  <Link href="/onboarding">
                    Start 7-Day Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8 py-6 text-lg"
                >
                  <Link href="/demo">View Live Demo</Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  No setup fees
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Cancel anytime
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  24/7 support
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                Everything You Need to Secure Your Exchange
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-300 text-lg">
                Comprehensive security monitoring designed specifically for crypto exchanges
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">
                Trusted by Leading Exchanges
              </h2>
              <p className="text-slate-300 text-lg">See what our customers say about ShadowStack</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-white mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {testimonials[currentTestimonial].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonials[currentTestimonial].name}</div>
                      <div className="text-slate-400">{testimonials[currentTestimonial].role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-emerald-400" : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <Card className="bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 border-emerald-400/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">
                  Ready to Secure Your Exchange?
                </h2>
                <p className="mx-auto max-w-[600px] text-slate-300 text-lg mb-8">
                  Join 150+ crypto exchanges already using ShadowStack. Start your 7-day free trial today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-6 text-lg"
                  >
                    <Link href="/onboarding">Start Your Trial</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent px-8 py-6 text-lg"
                  >
                    <Link href="/contact">Talk to Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
