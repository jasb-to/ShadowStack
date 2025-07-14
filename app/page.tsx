import Link from "next/link"
import { Shield, Zap, Brain, Eye, Lock, Target, CheckCircle, Globe, Users, Building } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ShadowStack</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/pricing" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/25"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mb-6">
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2 rounded-full text-sm font-medium">
            🇬🇧 Supporting UK's 2025 National Security Strategy
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
          Next-Gen
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent block">
            Cybersecurity
          </span>
          <span className="text-4xl md:text-5xl text-slate-400">for Dev Teams</span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed">
          Real-time threat detection, AI-powered monitoring, and zero-config protection for APIs, SaaS tools, and
          developer endpoints. Smart threat defense that adapts to your infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center shadow-lg shadow-cyan-500/25"
          >
            Request Early Access
            <Shield className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/pricing"
            className="border border-slate-600 text-white hover:bg-slate-800/50 px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center"
          >
            View Pricing
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Cyber Essentials Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>MOD Contractor Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>UKRI Aligned</span>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Core Security Features</h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Advanced threat detection powered by AI, designed for modern development workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/70 transition-all hover:border-cyan-500/30 group">
            <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Real-time Anomaly Detection</h3>
            <p className="text-slate-300 leading-relaxed">
              Monitor IP behavior, token usage, and endpoint patterns with AI-powered analysis. Detect threats before
              they impact your systems.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/70 transition-all hover:border-cyan-500/30 group">
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Zero-Config Integration</h3>
            <p className="text-slate-300 leading-relaxed">
              Drop-in API key or SDK integration. No complex setup, no infrastructure changes. Protect your endpoints in
              minutes.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/70 transition-all hover:border-cyan-500/30 group">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">OSINT Breach Detection</h3>
            <p className="text-slate-300 leading-relaxed">
              Monitor Slack, Telegram, and dark web channels for mentions of your assets. Early warning system for
              potential breaches.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/70 transition-all hover:border-cyan-500/30 group">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">LLM Threat Defense</h3>
            <p className="text-slate-300 leading-relaxed">
              Protect against prompt injection, model exfiltration, and AI-specific attacks. Specialized defense for
              AI-powered applications.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/70 transition-all hover:border-cyan-500/30 group">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Developer-First Firewall</h3>
            <p className="text-slate-300 leading-relaxed">
              Smart firewall that understands developer workflows. Flags auth misuse and admin route vulnerabilities
              automatically.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/70 transition-all hover:border-cyan-500/30 group">
            <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/25 group-hover:shadow-yellow-500/40 transition-all">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Breach Simulation Mode</h3>
            <p className="text-slate-300 leading-relaxed">
              Test your defenses with realistic breach scenarios. Public-sector readiness testing for compliance and
              certification.
            </p>
          </div>
        </div>
      </section>

      {/* Government Alignment Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Supporting the UK's 2025 National Security Strategy
              </h2>
            </div>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Aligned with government initiatives to strengthen national cyber resilience and protect critical
              infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">National Cyber Resilience</h3>
              <p className="text-slate-400 text-sm">Accelerates 2025–2030 resilience goals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Cyber Essentials Ready</h3>
              <p className="text-slate-400 text-sm">SMEs and MOD contractors</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">AI-Enabled Public Sector</h3>
              <p className="text-slate-400 text-sm">Secures AI-powered government tools</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">GovTech Aligned</h3>
              <p className="text-slate-400 text-sm">UKRI, Innovate UK, MOD support</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Personas */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for Security-First Teams</h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Trusted by organizations that can't afford to compromise on security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-all">
            <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">Public Sector Security</h3>
            <p className="text-slate-400 text-sm">Government agencies and security teams</p>
          </div>

          <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-all">
            <Building className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">Defense Contractors</h3>
            <p className="text-slate-400 text-sm">MOD/NHS suppliers and SME contractors</p>
          </div>

          <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-all">
            <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">Fintech & Compliance</h3>
            <p className="text-slate-400 text-sm">Compliance-heavy infrastructure teams</p>
          </div>

          <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-all">
            <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">DevOps Engineers</h3>
            <p className="text-slate-400 text-sm">API architects and infrastructure teams</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Secure Your Infrastructure?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join security-first organizations already protecting their critical systems with ShadowStack.
          </p>
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center justify-center shadow-lg shadow-cyan-500/25"
          >
            Request Early Access
            <Shield className="ml-3 w-6 h-6" />
          </Link>
          <p className="text-slate-400 text-sm mt-4">
            Contact us at{" "}
            <a href="mailto:support@shadowstack.site" className="text-cyan-400 hover:text-cyan-300">
              support@shadowstack.site
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-cyan-400 mr-2" />
            <span className="text-lg font-bold text-white">ShadowStack</span>
          </div>
          <p>&copy; 2025 ShadowStack. All rights reserved. Supporting UK National Security Strategy 2025.</p>
          <p className="mt-2 text-sm">
            Contact:{" "}
            <a href="mailto:support@shadowstack.site" className="text-cyan-400 hover:text-cyan-300">
              support@shadowstack.site
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
