"use client"

import { useState } from "react"
import { Search, Book, MessageCircle, Shield, Zap, Users, FileText, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    description: "Learn the basics of ShadowStack",
    articles: [
      { title: "Quick Start Guide", views: "2.1k", time: "5 min read" },
      { title: "Setting up your first monitoring target", views: "1.8k", time: "8 min read" },
      { title: "Understanding breach alerts", views: "1.5k", time: "6 min read" },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring & Alerts",
    icon: Shield,
    description: "Configure monitoring and alert settings",
    articles: [
      { title: "Adding monitoring targets", views: "1.2k", time: "7 min read" },
      { title: "Configuring alert thresholds", views: "980", time: "5 min read" },
      { title: "Email notification settings", views: "850", time: "4 min read" },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: FileText,
    description: "Connect with external services",
    articles: [
      { title: "Webhook integration guide", views: "750", time: "10 min read" },
      { title: "Slack notifications setup", views: "650", time: "6 min read" },
      { title: "API documentation", views: "1.1k", time: "15 min read" },
    ],
  },
  {
    id: "account",
    title: "Account & Billing",
    icon: Users,
    description: "Manage your account and subscription",
    articles: [
      { title: "Upgrading your plan", views: "920", time: "3 min read" },
      { title: "Managing team members", views: "680", time: "5 min read" },
      { title: "Billing and invoices", views: "540", time: "4 min read" },
    ],
  },
]

const popularArticles = [
  {
    id: 1,
    title: "How to set up your first monitoring target",
    category: "Getting Started",
    views: "3.2k",
    time: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding different types of breach alerts",
    category: "Monitoring",
    views: "2.8k",
    time: "12 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Configuring webhook notifications",
    category: "Integrations",
    views: "2.1k",
    time: "10 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Best practices for crypto asset monitoring",
    category: "Security",
    views: "1.9k",
    time: "15 min read",
    featured: false,
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              How can we help you?
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Find answers, guides, and resources to get the most out of ShadowStack
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-slate-800/50 border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 text-white placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Popular Articles */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Popular Articles</h2>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  Most Viewed
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {article.title}
                          </CardTitle>
                          <CardDescription className="text-slate-400 mt-2">
                            {article.category} • {article.time}
                          </CardDescription>
                        </div>
                        {article.featured && (
                          <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 ml-2">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">{article.views} views</span>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Help Categories */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {helpCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Card
                      key={category.id}
                      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group"
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg">
                            <Icon className="h-6 w-6 text-emerald-400" />
                          </div>
                          <div>
                            <CardTitle className="text-white group-hover:text-emerald-400 transition-colors">
                              {category.title}
                            </CardTitle>
                            <CardDescription className="text-slate-400">{category.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {category.articles.map((article, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0"
                            >
                              <span className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">
                                {article.title}
                              </span>
                              <div className="flex items-center space-x-2 text-xs text-slate-400">
                                <span>{article.views}</span>
                                <span>•</span>
                                <span>{article.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Contact Support */}
              <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-emerald-400" />
                    <CardTitle className="text-white">Need More Help?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                      Contact Support
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Community Forum
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Book className="h-5 w-5 mr-2 text-emerald-400" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["API Documentation", "System Status", "Feature Requests", "Security Guidelines", "Changelog"].map(
                      (link, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm"
                        >
                          {link}
                        </a>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
