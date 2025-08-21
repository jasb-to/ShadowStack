"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Book, MessageCircle, Shield, Settings, CreditCard, ChevronRight, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Book,
    description: "Learn the basics of ShadowStack",
    articles: [
      { title: "Quick Start Guide", href: "/help/quick-start", popular: true },
      { title: "Setting Up Your First Monitor", href: "/help/setup-monitor" },
      { title: "Understanding Alerts", href: "/help/alerts" },
      { title: "Dashboard Overview", href: "/help/dashboard" },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring & Alerts",
    icon: Shield,
    description: "Configure and manage your monitoring",
    articles: [
      { title: "Creating Monitoring Targets", href: "/help/targets", popular: true },
      { title: "Alert Configuration", href: "/help/alert-config" },
      { title: "Telegram Integration", href: "/help/telegram" },
      { title: "Email Notifications", href: "/help/email-alerts", popular: true },
    ],
  },
  {
    id: "account",
    name: "Account & Billing",
    icon: CreditCard,
    description: "Manage your account and subscription",
    articles: [
      { title: "Subscription Plans", href: "/help/plans" },
      { title: "Billing & Payments", href: "/help/billing" },
      { title: "Account Settings", href: "/help/account" },
      { title: "Team Management", href: "/help/teams" },
    ],
  },
  {
    id: "api",
    name: "API & Integrations",
    icon: Settings,
    description: "Integrate ShadowStack with your tools",
    articles: [
      { title: "API Documentation", href: "/help/api" },
      { title: "Webhook Setup", href: "/help/webhooks" },
      { title: "Third-party Integrations", href: "/help/integrations" },
      { title: "Rate Limits", href: "/help/rate-limits" },
    ],
  },
]

const popularArticles = [
  { title: "Quick Start Guide", href: "/help/quick-start", category: "Getting Started" },
  { title: "Creating Monitoring Targets", href: "/help/targets", category: "Monitoring" },
  { title: "Email Notifications Setup", href: "/help/email-alerts", category: "Alerts" },
  { title: "Understanding Pricing", href: "/help/pricing", category: "Billing" },
  { title: "API Authentication", href: "/help/api-auth", category: "API" },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategories = categories.filter((category) => !selectedCategory || category.id === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How can we help you?</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Find answers to common questions, learn how to use ShadowStack, and get the most out of your security
              monitoring.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Popular Articles */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularArticles.map((article, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                            <Link href={article.href}>{article.title}</Link>
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
              <div className="space-y-8">
                {filteredCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {category.articles.map((article, index) => (
                          <Link
                            key={index}
                            href={article.href}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {article.title}
                              </span>
                              {article.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link
                    href="/contact"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contact Support</span>
                  </Link>
                  <Link
                    href="/docs"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Book className="w-4 h-4" />
                    <span>API Documentation</span>
                  </Link>
                  <Link
                    href="/demo"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Try Demo</span>
                  </Link>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need More Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Link>
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">All systems operational</span>
                  </div>
                  <Link
                    href="/status"
                    className="text-blue-600 dark:text-blue-400 text-sm hover:underline mt-2 inline-block"
                  >
                    View status page
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
