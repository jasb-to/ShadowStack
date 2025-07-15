import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, Zap, Globe, Brain, Users } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "£49",
      period: "/month",
      description: "Perfect for small teams and startups",
      features: [
        "Real-time anomaly detection",
        "Basic OSINT monitoring",
        "Email alerts",
        "5 monitoring targets",
        "Community support",
        "Basic dashboard",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "£149",
      period: "/month",
      description: "For growing businesses and security teams",
      features: [
        "Everything in Starter",
        "Advanced LLM threat defense",
        "Slack/Teams integration",
        "50 monitoring targets",
        "Priority support",
        "Custom alerts",
        "API access",
        "Breach simulation mode",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "£499",
      period: "/month",
      description: "For large organizations and government",
      features: [
        "Everything in Professional",
        "Unlimited monitoring targets",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "Advanced analytics",
        "Compliance reporting",
        "24/7 SOC support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
    {
      name: "Government",
      price: "Custom",
      period: "pricing",
      description: "UK Government & Defense Contractors",
      features: [
        "Cyber Essentials certified",
        "MOD contractor compliance",
        "IL3/IL4 security clearance",
        "On-premise deployment",
        "Government cloud hosting",
        "NCSC alignment",
        "Dedicated account manager",
        "Emergency response team",
      ],
      cta: "Contact Sales",
      popular: false,
      government: true,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30">
            <Shield className="w-4 h-4 mr-2" />
            UK Government 2025 Strategy Aligned
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Secure Your Digital Assets
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your cybersecurity needs. From startups to government agencies, ShadowStack
            provides enterprise-grade protection at every scale.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gray-900/50 border-gray-800 ${
                  plan.popular ? "ring-2 ring-cyan-500/50" : ""
                } ${plan.government ? "ring-2 ring-blue-500/50" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">Most Popular</Badge>
                  </div>
                )}
                {plan.government && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <Globe className="w-3 h-3 mr-1" />
                      Government
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/dashboard" className="block">
                    <Button
                      className={`w-full ${
                        plan.popular || plan.government
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                          : "bg-gray-800 hover:bg-gray-700 text-white"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* UK Government Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900/20 to-indigo-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-white">Supporting the UK's 2025 National Security Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-2">Cyber Essentials Ready</h3>
                  <p className="text-gray-300 text-sm">
                    Accelerates national cyber resilience goals for SMEs and MOD contractors
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Brain className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-2">AI-Enabled Public Sector</h3>
                  <p className="text-gray-300 text-sm">Secures AI-enabled public sector tools and government systems</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Zap className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-2">GovTech Innovation</h3>
                  <p className="text-gray-300 text-sm">
                    Supports UKRI, Innovate UK, and MOD-aligned GovTech initiatives
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-2">Whole-of-Society Defense</h3>
                  <p className="text-gray-300 text-sm">
                    Enables comprehensive cyber defense posture across all sectors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">Getting Started is Simple</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Sign Up</h3>
              <p className="text-gray-300">Create your account and start your free trial in under 2 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Configure</h3>
              <p className="text-gray-300">Add your monitoring targets and customize your security preferences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Protect</h3>
              <p className="text-gray-300">Receive real-time alerts and protect your digital assets 24/7</p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 text-lg">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                What makes ShadowStack different from other security tools?
              </h3>
              <p className="text-gray-300">
                ShadowStack combines real-time OSINT monitoring with AI-powered threat detection, specifically designed
                for the UK's 2025 National Security Strategy requirements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Do you support government and defense contractors?
              </h3>
              <p className="text-gray-300">
                Yes, we offer specialized government pricing with Cyber Essentials certification, MOD contractor
                compliance, and IL3/IL4 security clearance support.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">How quickly can I get started?</h3>
              <p className="text-gray-300">
                You can be up and running in under 5 minutes with our zero-config integration. Simply add your API key
                or install our SDK.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
