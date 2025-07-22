import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, BrainCircuit, Globe, GitBranch, AlertTriangle } from "lucide-react"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-cyan-400" />,
      title: "Real-time Anomaly Detection",
      description: "Monitor IP, token, and endpoint behavior to detect threats as they happen.",
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-400" />,
      title: "Zero-Config Integration",
      description: "Get protected in minutes with a simple API key or SDK drop-in. No complex setup required.",
    },
    {
      icon: <Globe className="h-8 w-8 text-cyan-400" />,
      title: "OSINT-Based Breach Detection",
      description: "Scan Slack, Telegram, and the dark web for chatter related to your assets.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-cyan-400" />,
      title: "LLM-Specific Threat Defense",
      description: "Protect against prompt injection, model exfiltration, and other AI-specific attacks.",
    },
    {
      icon: <GitBranch className="h-8 w-8 text-cyan-400" />,
      title: "Developer-First Smart Firewall",
      description: "Flag auth misuse, exposed admin routes, and other common developer oversights.",
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-cyan-400" />,
      title: "Breach Simulation Mode",
      description: "Test your readiness for an attack and ensure compliance with public-sector requirements.",
    },
  ]

  const govFeatures = [
    { title: "Accelerates National Cyber Resilience", description: "Aligns with UK's 2025-2030 strategic goals." },
    { title: "Cyber Essentials Ready", description: "Built for SMEs and MOD contractors to meet compliance." },
    {
      title: "Secures AI-Enabled Public Sector Tools",
      description: "Protects the next generation of government technology.",
    },
    { title: "Supports GovTech Innovation", description: "Aligned with UKRI, Innovate UK, and MOD initiatives." },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-0 left-0 -z-10 h-1/2 w-full bg-gradient-to-b from-cyan-500/20 to-transparent"></div>

          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Proactive Cybersecurity for the AI Era
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
              ShadowStack provides real-time threat detection, AI-powered monitoring, and zero-config protection for
              your APIs, SaaS tools, and developer endpoints.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                <Link href="/sign-up">Request Early Access</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">A New Standard in Digital Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Government Alignment Section */}
        <section id="government" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white">Supporting the UK’s 2025 National Security Strategy</h2>
              <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                ShadowStack is committed to enhancing the UK's cyber defense posture, providing critical infrastructure
                protection for the public and private sectors.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {govFeatures.map((feature, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 text-center">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white">Ready to Secure Your Assets?</h2>
            <p className="mt-4 text-lg text-gray-300">
              Join the waitlist for early access and be the first to experience the future of cybersecurity.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                <Link href="/sign-up">Request Early Access</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
