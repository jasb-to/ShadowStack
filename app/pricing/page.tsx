"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Check, Shield, Zap, Crown, Globe, Brain, Eye, Target } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "£49",
    period: "per month",
    description: "Perfect for small teams and startups getting started with cybersecurity",
    features: [
      "Up to 10 monitored endpoints",
      "Basic anomaly detection",
      "Email alerts",
      "24/7 system monitoring",
      "Basic OSINT scanning",
      "Community support",
      "Cyber Essentials ready",
    ],
    cta: "Start Free Trial",
    popular: false,
    icon: Shield,
  },
  {
    name: "Professional",
    price: "£149",
    period: "per month",
    description: "Advanced protection for growing businesses and government contractors",
    features: [
      "Up to 100 monitored endpoints",
      "Advanced AI-powered detection",
      "Real-time Slack/Teams alerts",
      "OSINT dark web monitoring",
      "LLM threat defense",
      "API security scanning",
      "Priority support",
      "MOD contractor compliance",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    popular: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "£499",
    period: "per month",
    description: "Complete security suite for large organizations and public sector",
    features: [
      "Unlimited monitored endpoints",
      "Advanced AI safety toolkit",
      "Custom breach simulations",
      "Dedicated security analyst",
      "White-label reporting",
      "Advanced compliance tools",
      "24/7 phone support",
      "Government security clearance",
      "Custom deployment options",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    popular: false,
    icon: Crown,
  },
]

const features = [
  {
    icon: Shield,
    title: "Real-time Anomaly Detection",
    description: "AI-powered monitoring of IP, token, and endpoint behavior patterns",
  },
  {
    icon: Eye,
    title: "OSINT Breach Detection",
    description: "Monitor Slack, Telegram, and dark web for security breaches",
  },
  {
    icon: Brain,
    title: "LLM Threat Defense",
    description: "Protect against prompt injection and model exfiltration attacks",
  },
  {
    icon: Target,
    title: "Zero-Config Integration",
    description: "Drop-in API key or SDK integration in minutes",
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="pt-20 pb-16">
        {/* Header */}
        <div className="container mx-auto px-4 text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              Supporting UK's 2025 National Security Strategy
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Enterprise-Grade
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                Cybersecurity
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Protect your APIs, SaaS tools, and developer endpoints with AI-powered threat detection. Trusted by
              government contractors and fintech leaders.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!isAnnual ? "text-white" : "text-slate-400"}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? "bg-cyan-500" : "bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? "text-white" : "text-slate-400"}`}>
                Annual <Badge className="ml-1 bg-green-500/20 text-green-400 border-green-500/30">Save 20%</Badge>
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const price = isAnnual
                ? Math.round(Number.parseInt(plan.price.replace("£", "")) * 0.8)
                : Number.parseInt(plan.price.replace("£", ""))

              return (
                <Card
                  key={plan.name}
                  className={`relative bg-slate-900/50 border-slate-800 ${
                    plan.popular ? "ring-2 ring-cyan-500/50 scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white">£{price}</span>
                      <span className="text-slate-400 ml-2">{plan.period}</span>
                      {isAnnual && (
                        <div className="text-sm text-green-400 mt-1">
                          Save £{(Number.parseInt(plan.price.replace("£", "")) - price) * 12}/year
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-slate-400 mt-4">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button
                      className={`w-full mb-6 ${
                        plan.popular
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                          : "bg-slate-800 hover:bg-slate-700 text-white"
                      }`}
                      asChild
                    >
                      <Link href="/dashboard">{plan.cta}</Link>
                    </Button>

                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Core Security Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Advanced cybersecurity tools designed for modern development teams and government contractors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Government Section */}
        <div className="container mx-auto px-4 mb-16">
          <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Supporting the UK's 2025 National Security Strategy
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-white mb-2">Government Alignment</h4>
                  <ul className="space-y-1 text-slate-300 text-sm">
                    <li>• Accelerates national cyber resilience goals (2025–2030)</li>
                    <li>• Cyber Essentials-ready for SMEs and MOD contractors</li>
                    <li>• Secures AI-enabled public sector tools</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Strategic Support</h4>
                  <ul className="space-y-1 text-slate-300 text-sm">
                    <li>• Supports UKRI, Innovate UK, and MOD-aligned GovTech</li>
                    <li>• Enables whole-of-society cyber defense posture</li>
                    <li>• Government security clearance available</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Getting Started is Simple</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Deploy enterprise-grade cybersecurity in minutes, not months
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Sign Up</h3>
              <p className="text-slate-400 text-sm">Create your account and get instant access to the dashboard</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Add Targets</h3>
              <p className="text-slate-400 text-sm">Configure your APIs, domains, and endpoints for monitoring</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Stay Protected</h3>
              <p className="text-slate-400 text-sm">Receive real-time alerts and automated threat responses</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Infrastructure?</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Join hundreds of development teams and government contractors who trust ShadowStack to protect their
                critical systems and data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  asChild
                >
                  <Link href="/dashboard">Start Free Trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
              <p className="text-slate-400 text-sm mt-4">
                Questions? Contact us at{" "}
                <a href="mailto:support@shadowstack.site" className="text-cyan-400 hover:text-cyan-300">
                  support@shadowstack.site
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
