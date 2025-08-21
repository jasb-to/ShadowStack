"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Shield,
  Zap,
  Settings,
  CreditCard,
  Book,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  Star,
  Users,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    icon: Shield,
    title: "Security & Monitoring",
    description: "Wallet monitoring, threat detection, and security alerts",
    count: 12,
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Settings,
    title: "Account & Settings",
    description: "Profile management, notifications, and preferences",
    count: 8,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    icon: CreditCard,
    title: "Billing & Subscriptions",
    description: "Payment methods, invoices, and subscription management",
    count: 6,
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    icon: Zap,
    title: "API & Integrations",
    description: "Webhooks, API keys, and third-party integrations",
    count: 10,
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
]

const popularArticles = [
  {
    title: "Getting Started with Wallet Monitoring",
    description: "Learn how to add and configure your first crypto wallet for monitoring",
    category: "Security & Monitoring",
    readTime: "5 min read",
    views: "2.1k views",
  },
  {
    title: "Understanding Security Alert Types",
    description: "Complete guide to different types of security alerts and their meanings",
    category: "Security & Monitoring",
    readTime: "8 min read",
    views: "1.8k views",
  },
  {
    title: "Setting Up Email Notifications",
    description: "Configure email alerts for real-time security notifications",
    category: "Account & Settings",
    readTime: "3 min read",
    views: "1.5k views",
  },
  {
    title: "API Integration Guide",
    description: "How to integrate ShadowStack with your existing security infrastructure",
    category: "API & Integrations",
    readTime: "12 min read",
    views: "1.2k views",
  },
  {
    title: "Subscription Plans Explained",
    description: "Compare features and choose the right plan for your organization",
    category: "Billing & Subscriptions",
    readTime: "6 min read",
    views: "980 views",
  },
]

const quickLinks = [
  { title: "System Status", href: "/status", icon: Shield },
  { title: "API Documentation", href: "/docs", icon: Book },
  { title: "Community Forum", href: "/community", icon: Users },
  { title: "Feature Requests", href: "/feedback", icon: Lightbulb },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-slate-900/50 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How can we help you?</h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Find answers to your questions, learn about our features, and get the most out of ShadowStack
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700">
                Search
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Categories */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {categories.map((category, index) => (
                    <Card
                      key={index}
                      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                            <category.icon className="w-6 h-6" />
                          </div>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {category.count} articles
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400">{category.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Popular Articles */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Popular Articles</h2>
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <Card
                      key={index}
                      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-slate-400 mb-3">{article.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <Badge variant="outline" className="border-slate-600 text-slate-400">
                                {article.category}
                              </Badge>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {article.readTime}
                              </span>
                              <span>{article.views}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors ml-4" />
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
                  <CardTitle className="text-white flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-emerald-400" />
                    Need More Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400 text-sm">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Link href="/contact">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Support
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      <Link href="tel:+1-555-0123">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us
                      </Link>
                    </Button>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>📧 Email: 24/7 response</p>
                    <p>📞 Phone: Mon-Fri 9AM-6PM EST</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quickLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center text-slate-400 hover:text-white transition-colors group"
                      >
                        <link.icon className="w-4 h-4 mr-3 text-slate-500 group-hover:text-emerald-400" />
                        <span className="text-sm">{link.title}</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Satisfaction */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-white">4.9/5</p>
                    <p className="text-sm text-slate-400">Based on 1,200+ reviews</p>
                  </div>
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
