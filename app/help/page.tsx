"use client"

import { useState } from "react"
import { Search, MessageCircle, Book, Shield, Zap, Users, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of ShadowStack",
    icon: Book,
    articles: [
      { title: "Quick Start Guide", description: "Get up and running in 5 minutes" },
      { title: "Setting Up Your First Monitor", description: "Configure your first security monitor" },
      { title: "Understanding Alerts", description: "Learn how our alert system works" },
    ],
  },
  {
    title: "Security Features",
    description: "Advanced security monitoring capabilities",
    icon: Shield,
    articles: [
      { title: "Threat Detection", description: "How we identify potential threats" },
      { title: "AI-Powered Analysis", description: "Understanding our AI detection system" },
      { title: "Custom Alert Rules", description: "Create custom monitoring rules" },
    ],
  },
  {
    title: "API & Integration",
    description: "Connect ShadowStack with your systems",
    icon: Zap,
    articles: [
      { title: "API Documentation", description: "Complete API reference guide" },
      { title: "Webhook Setup", description: "Configure webhooks for real-time alerts" },
      { title: "Third-party Integrations", description: "Connect with Slack, Discord, and more" },
    ],
  },
  {
    title: "Account Management",
    description: "Manage your ShadowStack account",
    icon: Users,
    articles: [
      { title: "Billing & Subscriptions", description: "Manage your subscription and billing" },
      { title: "Team Management", description: "Add and manage team members" },
      { title: "Security Settings", description: "Configure account security options" },
    ],
  },
]

const popularArticles = [
  { title: "How to set up Telegram monitoring", views: "2.1k", category: "Getting Started" },
  { title: "Understanding threat severity levels", views: "1.8k", category: "Security" },
  { title: "API rate limits and best practices", views: "1.5k", category: "API" },
  { title: "Configuring email notifications", views: "1.2k", category: "Alerts" },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">How can we help you?</h1>
            <p className="text-xl text-slate-300 mb-8">
              Find answers, guides, and resources to get the most out of ShadowStack
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Popular Articles */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Popular Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularArticles.map((article, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{article.title}</h3>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                            {article.category}
                          </Badge>
                          <span className="text-sm text-slate-400">{article.views} views</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {helpCategories.map((category, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{category.title}</CardTitle>
                        <CardDescription className="text-slate-400">{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <div
                          key={articleIndex}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                        >
                          <div>
                            <h4 className="font-medium text-white">{article.title}</h4>
                            <p className="text-sm text-slate-400">{article.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center">
            <Card className="bg-slate-800/50 border-slate-700 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <MessageCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
                <p className="text-slate-300 mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Contact Support</Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
