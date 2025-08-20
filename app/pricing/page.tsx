"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small exchanges getting started",
    monthlyPrice: 15,
    annualPrice: 150,
    wallets: 5,
    features: [
      "5 hot wallet monitoring",
      "Email alerts",
      "Basic security scoring",
      "Multi-chain support (BTC, ETH, SOL, TRON, BNB)",
      "24/7 monitoring",
      "Basic dashboard",
      "Email support",
    ],
    limitations: ["100 alerts per month", "7-day data retention", "Standard support"],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Most popular for growing exchanges",
    monthlyPrice: 49,
    annualPrice: 490,
    wallets: 25,
    popular: true,
    features: [
      "25 hot wallet monitoring",
      "Slack/Discord/Teams webhooks",
      "Advanced anomaly detection",
      "API access",
      "Custom alert rules",
      "Advanced dashboard",
      "Priority email support",
      "Proof-of-reserves badges",
    ],
    limitations: ["1,000 alerts per month", "30-day data retention", "Priority support"],
  },
  {
    id: "scale",
    name: "Scale",
    description: "For established exchanges at scale",
    monthlyPrice: 199,
    annualPrice: 1990,
    wallets: "Unlimited",
    features: [
      "Unlimited wallet monitoring",
      "White-label dashboard",
      "Custom branding",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "Phone & chat support",
      "SLA guarantees",
      "Custom alert thresholds",
      "Advanced analytics",
    ],
    limitations: ["Unlimited alerts", "90-day data retention", "24/7 priority support"],
  },
]

const faqs = [
  {
    question: "What's included in the 7-day free trial?",
    answer:
      "Full access to all features of your chosen plan, including wallet monitoring, alerts, and dashboard access. No credit card required to start.",
  },
  {
    question: "Which blockchains do you support?",
    answer:
      "We support Bitcoin, Ethereum, Binance Smart Chain, Solana, and TRON networks. Additional blockchain support is added regularly based on customer demand.",
  },
  {
    question: "How quickly are alerts delivered?",
    answer:
      "Alerts are typically delivered within 30 seconds of detection. Critical alerts are prioritized and delivered within 10 seconds.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.",
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer:
      "Yes, we offer custom enterprise solutions with volume discounts, dedicated infrastructure, and tailored features. Contact our sales team for details.",
  },
  {
    question: "What security measures do you have in place?",
    answer:
      "We're SOC 2 Type II compliant and ISO 27001 certified. All data is encrypted in transit and at rest, with zero-knowledge architecture for sensitive wallet data.",
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-emerald-400/30 text-emerald-400 mb-6">
                <Building2 className="w-4 h-4 mr-2" />
                Transparent Pricing
              </Badge>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-6">
                Simple, Transparent Pricing
              </h1>

              <p className="mx-auto max-w-[700px] text-slate-300 text-lg md:text-xl mb-8">
                Choose the perfect plan for your exchange. All plans include a 7-day free trial with full access to
                features.
              </p>

              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm ${!isAnnual ? "text-white" : "text-slate-400"}`}>Monthly</span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-emerald-500"
                />
                <span className={`text-sm ${isAnnual ? "text-white" : "text-slate-400"}`}>
                  Annual
                  <Badge className="ml-2 bg-emerald-500/20 text-emerald-400">Save 17%</Badge>
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.id}
                  className={`relative bg-slate-800/50 border-slate-700 ${
                    tier.popular ? "ring-2 ring-emerald-400/50 scale-105" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                    <CardDescription className="text-slate-300">{tier.description}</CardDescription>

                    <div className="mt-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          £{isAnnual ? Math.floor(tier.annualPrice / 12) : tier.monthlyPrice}
                        </span>
                        <span className="text-slate-400">/month</span>
                      </div>
                      {isAnnual && <p className="text-sm text-emerald-400 mt-1">£{tier.annualPrice} billed annually</p>}
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-slate-300">
                        Up to <span className="font-semibold text-white">{tier.wallets}</span> wallets
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button
                      asChild
                      className={`w-full ${
                        tier.popular
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                    >
                      <Link href="/onboarding">
                        Start 7-Day Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Everything included:</h4>
                      <ul className="space-y-2">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                      <h4 className="font-semibold text-white mb-3">Plan limits:</h4>
                      <ul className="space-y-2">
                        {tier.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            </div>
                            <span className="text-slate-400">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enterprise CTA */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 border-emerald-400/20 max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Building2 className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-2xl font-bold text-white">Enterprise</h3>
                  </div>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    Need more than 25 wallets or custom features? We offer enterprise solutions with volume discounts,
                    dedicated infrastructure, and tailored integrations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                    >
                      <Link href="/contact">Contact Sales</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      <Link href="/demo">View Demo</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-300 text-lg">
                Everything you need to know about ShadowStack pricing and features
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    <CardTitle className="text-white text-left flex items-center justify-between">
                      {faq.question}
                      <div className={`transform transition-transform ${openFaq === index ? "rotate-45" : ""}`}>
                        <div className="w-4 h-4 relative">
                          <div className="absolute inset-0 w-4 h-0.5 bg-slate-400 top-1/2 transform -translate-y-1/2" />
                          <div className="absolute inset-0 w-0.5 h-4 bg-slate-400 left-1/2 transform -translate-x-1/2" />
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  {openFaq === index && (
                    <CardContent className="pt-0">
                      <p className="text-slate-300">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
