"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Book, MessageCircle, Mail, Phone, ChevronRight, Star, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const categories = [
  {
    title: "Getting Started",
    description: "Learn the basics of ShadowStack",
    icon: Book,
    articles: [
      { title: "Quick Start Guide", views: "2.1k", time: "5 min read" },
      { title: "Setting Up Your First Wallet", views: "1.8k", time: "3 min read" },
      { title: "Understanding Alert Types", views: "1.5k", time: "4 min read" },
    ],
  },
  {
    title: "Wallet Monitoring",
    description: "Configure and manage wallet monitoring",
    icon: Users,
    articles: [
      { title: "Adding Multiple Wallets", views: "1.2k", time: "6 min read" },
      { title: "Blockchain Support", views: "980", time: "3 min read" },
      { title: "Custom Alert Rules", views: "750", time: "8 min read" },
    ],
  },
  {
    title: "AI Features",
    description: "Leverage AI-powered security insights",
    icon: Star,
    articles: [
      { title: "AI Anomaly Detection", views: "890", time: "7 min read" },
      { title: "Pattern Analysis", views: "650", time: "5 min read" },
      { title: "Smart Summaries", views: "420", time: "4 min read" },
    ],
  },
]

const popularArticles = [
  {
    title: "How to Set Up Real-Time Alerts",
    description: "Configure instant notifications for your crypto wallets",
    category: "Getting Started",
    views: "3.2k",
    time: "8 min read",
    rating: 4.9,
  },
  {
    title: "Understanding Threat Severity Levels",
    description: "Learn how we classify and prioritize security threats",
    category: "Security",
    views: "2.8k",
    time: "6 min read",
    rating: 4.8,
  },
  {
    title: "API Integration Guide",
    description: "Integrate ShadowStack with your existing systems",
    category: "Development",
    views: "2.1k",
    time: "12 min read",
    rating: 4.7,
  },
  {
    title: "Troubleshooting Common Issues",
    description: "Solutions to frequently encountered problems",
    category: "Support",
    views: "1.9k",
    time: "10 min read",
    rating: 4.6,
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                How can we help you?
              </h1>
              <p className="mx-auto max-w-[600px] text-slate-300 text-lg">
                Find answers, get support, and learn how to make the most of ShadowStack
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for help articles, guides, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-400"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Popular Articles */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">Popular Articles</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {popularArticles.map((article, index) => (
                    <Card
                      key={index}
                      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">
                            {article.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm">{article.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-white hover:text-emerald-400 transition-colors">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-slate-300 mb-4">{article.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {article.views} views
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.time}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Categories */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
                <div className="space-y-6">
                  {categories.map((category, index) => (
                    <Card key={index} className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <category.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white">{category.title}</CardTitle>
                            <CardDescription className="text-slate-300">{category.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {category.articles.map((article, articleIndex) => (
                            <div
                              key={articleIndex}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer group"
                            >
                              <div>
                                <h4 className="text-white group-hover:text-emerald-400 transition-colors">
                                  {article.title}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                                  <span>{article.views} views</span>
                                  <span>{article.time}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Support */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Need More Help?</CardTitle>
                  <CardDescription className="text-slate-300">
                    Can't find what you're looking for? Our support team is here to help.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Live Chat
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link
                    href="/docs"
                    className="flex items-center justify-between p-2 rounded hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-white"
                  >
                    <span>API Documentation</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/demo"
                    className="flex items-center justify-between p-2 rounded hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-white"
                  >
                    <span>Live Demo</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex items-center justify-between p-2 rounded hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-white"
                  >
                    <span>Pricing Plans</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-between p-2 rounded hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-white"
                  >
                    <span>Contact Sales</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              {/* Status */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">All systems operational</span>
                  </div>
                  <Link href="/status" className="text-emerald-400 hover:text-emerald-300 text-sm mt-2 inline-block">
                    View status page →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
