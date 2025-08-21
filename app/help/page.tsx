"use client"

import { useState } from "react"
import { Search, MessageCircle, Shield, Zap, Users, FileText, Settings, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const helpCategories = [
  {
    icon: Shield,
    title: "Security & Monitoring",
    description: "Learn about threat detection and security features",
    articles: 12,
    color: "text-emerald-400",
  },
  {
    icon: Settings,
    title: "Setup & Configuration",
    description: "Get started with ShadowStack setup and configuration",
    articles: 8,
    color: "text-blue-400",
  },
  {
    icon: Zap,
    title: "API & Integrations",
    description: "Integrate ShadowStack with your existing systems",
    articles: 15,
    color: "text-yellow-400",
  },
  {
    icon: Users,
    title: "Account Management",
    description: "Manage your account, billing, and team settings",
    articles: 6,
    color: "text-purple-400",
  },
  {
    icon: FileText,
    title: "Reports & Analytics",
    description: "Understanding reports and analytics features",
    articles: 10,
    color: "text-cyan-400",
  },
  {
    icon: MessageCircle,
    title: "Troubleshooting",
    description: "Common issues and how to resolve them",
    articles: 9,
    color: "text-red-400",
  },
]

const popularArticles = [
  {
    title: "Getting Started with ShadowStack",
    description: "Complete guide to setting up your first monitoring project",
    views: "2.1k views",
    readTime: "5 min read",
  },
  {
    title: "Understanding Threat Levels",
    description: "How ShadowStack categorizes and prioritizes security threats",
    views: "1.8k views",
    readTime: "3 min read",
  },
  {
    title: "Setting Up Email Alerts",
    description: "Configure email notifications for security events",
    views: "1.5k views",
    readTime: "4 min read",
  },
  {
    title: "API Authentication Guide",
    description: "Secure your API integrations with proper authentication",
    views: "1.2k views",
    readTime: "6 min read",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">How can we help you?</h1>
            <p className="text-xl text-slate-300 mb-8">
              Find answers, guides, and resources to get the most out of ShadowStack
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg">{article.title}</CardTitle>
                  <CardDescription className="text-slate-300">{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{article.views}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`h-8 w-8 ${category.color}`} />
                      <div>
                        <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                          {category.articles} articles
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-slate-300 mt-2">{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <Card className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border-emerald-500/20">
            <CardHeader className="text-center">
              <HelpCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <CardTitle className="text-2xl text-white">Still need help?</CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Our support team is here to help you succeed with ShadowStack
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Contact Support</Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-slate-400 text-sm mt-4">Average response time: 2 hours • Available 24/7</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
