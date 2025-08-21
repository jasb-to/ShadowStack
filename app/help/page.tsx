import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Shield,
  AlertTriangle,
  Eye,
  Settings,
  CreditCard,
  Mail,
  MessageCircle,
  Book,
  Video,
  FileText,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of ShadowStack",
    icon: Book,
    articles: [
      { title: "Setting up your first wallet monitor", href: "#", isNew: true },
      { title: "Understanding security alerts", href: "#" },
      { title: "Configuring notification preferences", href: "#" },
      { title: "Dashboard overview", href: "#" },
    ],
  },
  {
    title: "Security Monitoring",
    description: "Advanced threat detection features",
    icon: Shield,
    articles: [
      { title: "How wallet monitoring works", href: "#" },
      { title: "Understanding threat levels", href: "#" },
      { title: "Custom alert rules", href: "#", isNew: true },
      { title: "False positive management", href: "#" },
    ],
  },
  {
    title: "AI Features",
    description: "Artificial intelligence capabilities",
    icon: AlertTriangle,
    articles: [
      { title: "Enabling AI anomaly detection", href: "#", isNew: true },
      { title: "Understanding AI confidence scores", href: "#" },
      { title: "AI baseline learning", href: "#" },
      { title: "Customizing AI sensitivity", href: "#" },
    ],
  },
  {
    title: "Account & Billing",
    description: "Manage your subscription and account",
    icon: CreditCard,
    articles: [
      { title: "Upgrading your plan", href: "#" },
      { title: "Managing payment methods", href: "#" },
      { title: "Understanding usage limits", href: "#" },
      { title: "Canceling your subscription", href: "#" },
    ],
  },
]

const popularArticles = [
  {
    title: "How to add a new wallet for monitoring",
    description: "Step-by-step guide to adding cryptocurrency wallets to your monitoring dashboard",
    readTime: "3 min read",
    category: "Getting Started",
  },
  {
    title: "Understanding different alert types",
    description: "Learn about the various security alerts and what they mean for your assets",
    readTime: "5 min read",
    category: "Security",
  },
  {
    title: "Setting up email notifications",
    description: "Configure when and how you receive security alerts via email",
    readTime: "2 min read",
    category: "Notifications",
  },
  {
    title: "AI anomaly detection explained",
    description: "Deep dive into how our AI system detects suspicious wallet activity",
    readTime: "7 min read",
    category: "AI Features",
    isNew: true,
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How can we help you?</h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Find answers to your questions about ShadowStack security monitoring
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                className="pl-12 pr-4 py-4 text-lg bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Popular Articles */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Popular Articles</h2>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                View All Articles
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {popularArticles.map((article, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2 hover:text-emerald-400 transition-colors">
                          <Link href="#" className="flex items-center gap-2">
                            {article.title}
                            {article.isNew && (
                              <Badge
                                variant="outline"
                                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
                              >
                                New
                              </Badge>
                            )}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-slate-400">{article.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span className="bg-slate-700 px-2 py-1 rounded text-xs">{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Help Categories */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>

            <div className="grid gap-8 md:grid-cols-2">
              {helpCategories.map((category, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{category.title}</CardTitle>
                        <CardDescription className="text-slate-400">{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Link
                            href={article.href}
                            className="flex items-center justify-between text-slate-300 hover:text-white transition-colors group"
                          >
                            <span className="flex items-center gap-2">
                              {article.title}
                              {article.isNew && (
                                <Badge
                                  variant="outline"
                                  className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
                                >
                                  New
                                </Badge>
                              )}
                            </span>
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white mb-2">Still need help?</CardTitle>
                <CardDescription className="text-slate-300 text-lg">
                  Our support team is here to help you 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Email Support</h3>
                    <p className="text-slate-400 text-sm mb-4">Get help via email within 24 hours</p>
                    <Button
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
                    >
                      Send Email
                    </Button>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Live Chat</h3>
                    <p className="text-slate-400 text-sm mb-4">Chat with our support team instantly</p>
                    <Button
                      variant="outline"
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                    >
                      Start Chat
                    </Button>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Video className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Video Tutorials</h3>
                    <p className="text-slate-400 text-sm mb-4">Watch step-by-step video guides</p>
                    <Button
                      variant="outline"
                      className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                    >
                      Watch Videos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Links */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-8">Quick Links</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/dashboard" className="group">
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Eye className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      Dashboard
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">View your security overview</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/settings" className="group">
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Settings className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      Settings
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">Configure your preferences</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/pricing" className="group">
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <CardContent className="p-6 text-center">
                    <CreditCard className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">Pricing</h3>
                    <p className="text-slate-400 text-sm mt-1">View plans and pricing</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/docs" className="group">
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      API Docs
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">Integration documentation</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
