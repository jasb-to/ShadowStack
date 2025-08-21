"use client"

import { useState } from "react"
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
  Book,
  Shield,
  Zap,
  Users,
  Settings,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Article {
  id: string
  title: string
  description: string
  category: string
  views: number
  content: string
}

interface Category {
  id: string
  name: string
  icon: any
  description: string
  articles: Article[]
}

const helpCategories: Category[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Book,
    description: "Learn the basics of ShadowStack",
    articles: [
      {
        id: "quick-start",
        title: "Quick Start Guide",
        description: "Get up and running with ShadowStack in minutes",
        category: "Getting Started",
        views: 1250,
        content: "Follow these steps to get started with ShadowStack monitoring...",
      },
      {
        id: "first-target",
        title: "Adding Your First Target",
        description: "Learn how to add and configure monitoring targets",
        category: "Getting Started",
        views: 980,
        content: "To add your first monitoring target, navigate to the dashboard...",
      },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring & Alerts",
    icon: Shield,
    description: "Configure monitoring and alert settings",
    articles: [
      {
        id: "alert-setup",
        title: "Setting Up Alerts",
        description: "Configure email and webhook alerts for threats",
        category: "Monitoring",
        views: 850,
        content: "Configure your alert preferences to stay informed about threats...",
      },
      {
        id: "monitoring-channels",
        title: "Monitoring Channels",
        description: "Understanding how we monitor Telegram channels",
        category: "Monitoring",
        views: 720,
        content: "ShadowStack monitors public Telegram channels for threat mentions...",
      },
    ],
  },
  {
    id: "ai-features",
    name: "AI Features",
    icon: Zap,
    description: "Leverage AI-powered threat detection",
    articles: [
      {
        id: "ai-anomaly",
        title: "AI Anomaly Detection",
        description: "How our AI identifies unusual threat patterns",
        category: "AI Features",
        views: 650,
        content: "Our AI system analyzes threat patterns to detect anomalies...",
      },
      {
        id: "threat-scoring",
        title: "Threat Scoring System",
        description: "Understanding threat severity scores",
        category: "AI Features",
        views: 540,
        content: "Each threat is assigned a severity score based on multiple factors...",
      },
    ],
  },
  {
    id: "account",
    name: "Account & Billing",
    icon: Users,
    description: "Manage your account and subscription",
    articles: [
      {
        id: "subscription",
        title: "Managing Your Subscription",
        description: "Upgrade, downgrade, or cancel your subscription",
        category: "Account",
        views: 420,
        content: "Manage your ShadowStack subscription from the billing section...",
      },
      {
        id: "team-management",
        title: "Team Management",
        description: "Add team members and manage permissions",
        category: "Account",
        views: 380,
        content: "Invite team members and configure their access levels...",
      },
    ],
  },
  {
    id: "api",
    name: "API & Integrations",
    icon: Settings,
    description: "Integrate ShadowStack with your tools",
    articles: [
      {
        id: "api-docs",
        title: "API Documentation",
        description: "Complete API reference and examples",
        category: "API",
        views: 320,
        content: "Use our REST API to integrate ShadowStack with your systems...",
      },
      {
        id: "webhooks",
        title: "Webhook Integration",
        description: "Set up webhooks for real-time notifications",
        category: "API",
        views: 280,
        content: "Configure webhooks to receive real-time threat notifications...",
      },
    ],
  },
  {
    id: "troubleshooting",
    name: "Troubleshooting",
    icon: AlertTriangle,
    description: "Common issues and solutions",
    articles: [
      {
        id: "common-issues",
        title: "Common Issues",
        description: "Solutions to frequently encountered problems",
        category: "Troubleshooting",
        views: 890,
        content: "Here are solutions to the most common issues users encounter...",
      },
      {
        id: "performance",
        title: "Performance Optimization",
        description: "Optimize your monitoring performance",
        category: "Troubleshooting",
        views: 450,
        content: "Tips to optimize your ShadowStack monitoring performance...",
      },
    ],
  },
]

const popularArticles = [
  { id: "quick-start", title: "Quick Start Guide", views: 1250, category: "Getting Started" },
  { id: "common-issues", title: "Common Issues", views: 890, category: "Troubleshooting" },
  { id: "first-target", title: "Adding Your First Target", views: 980, category: "Getting Started" },
  { id: "alert-setup", title: "Setting Up Alerts", views: 850, category: "Monitoring" },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const filteredCategories = helpCategories
    .map((category) => ({
      ...category,
      articles: category.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.articles.length > 0 || searchQuery === "")

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setSelectedArticle(null)}
              className="mb-6 text-slate-300 hover:text-white"
            >
              ← Back to Help Center
            </Button>

            <div className="mb-6">
              <Badge variant="secondary" className="mb-2">
                {selectedArticle.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{selectedArticle.title}</h1>
              <p className="text-slate-300 text-lg">{selectedArticle.description}</p>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed">{selectedArticle.content}</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 p-6 bg-slate-800/30 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold mb-2">Was this helpful?</h3>
              <p className="text-slate-300 mb-4">Let us know if you need more assistance.</p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  👍 Yes
                </Button>
                <Button variant="outline" size="sm">
                  👎 No
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-slate-300 text-lg mb-8">
              Find answers to your questions and learn how to get the most out of ShadowStack
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Popular Articles */}
          {searchQuery === "" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularArticles.map((article) => {
                  const fullArticle = helpCategories.flatMap((cat) => cat.articles).find((a) => a.id === article.id)

                  return (
                    <Card
                      key={article.id}
                      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer"
                      onClick={() => fullArticle && setSelectedArticle(fullArticle)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-white">{article.title}</h3>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <span>{article.category}</span>
                          <span>{article.views} views</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Help Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{searchQuery ? "Search Results" : "Browse by Category"}</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <category.icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{category.name}</CardTitle>
                        <CardDescription className="text-slate-400">{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.articles.map((article) => (
                        <div
                          key={article.id}
                          onClick={() => setSelectedArticle(article)}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors group"
                        >
                          <div>
                            <h4 className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-sm text-slate-400">{article.description}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-slate-300 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
