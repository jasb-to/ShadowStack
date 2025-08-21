"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Calendar, Clock, User, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const categories = [
  { name: "All", count: 24 },
  { name: "Security", count: 8 },
  { name: "Product Updates", count: 6 },
  { name: "Industry News", count: 5 },
  { name: "Tutorials", count: 5 },
]

const featuredPost = {
  id: 1,
  title: "The Future of Crypto Security: AI-Powered Threat Detection",
  excerpt:
    "Explore how artificial intelligence is revolutionizing cryptocurrency security monitoring and threat detection in 2024.",
  author: "Sarah Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Security",
  image: "/placeholder.svg?height=400&width=800",
  featured: true,
}

const blogPosts = [
  {
    id: 2,
    title: "New Dashboard Features: Enhanced Analytics and Reporting",
    excerpt:
      "We've rolled out major updates to our dashboard with improved analytics, custom reports, and real-time monitoring capabilities.",
    author: "Mike Johnson",
    date: "2024-01-12",
    readTime: "5 min read",
    category: "Product Updates",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 3,
    title: "Understanding Telegram Channel Monitoring",
    excerpt:
      "A comprehensive guide to how ShadowStack monitors public Telegram channels for potential security threats.",
    author: "Alex Rodriguez",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Tutorials",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 4,
    title: "2024 Crypto Security Threat Landscape Report",
    excerpt:
      "Our annual report analyzing the evolving threat landscape in cryptocurrency and what exchanges need to know.",
    author: "Dr. Emily Watson",
    date: "2024-01-08",
    readTime: "15 min read",
    category: "Industry News",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 5,
    title: "Setting Up Webhook Notifications: A Step-by-Step Guide",
    excerpt:
      "Learn how to configure webhook notifications to integrate ShadowStack alerts with your existing security infrastructure.",
    author: "David Kim",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "Tutorials",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 6,
    title: "Case Study: How CryptoVault Prevented a $50M Breach",
    excerpt:
      "Real-world case study showing how early threat detection helped a major exchange prevent a significant security breach.",
    author: "Sarah Chen",
    date: "2024-01-03",
    readTime: "7 min read",
    category: "Security",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 7,
    title: "API Rate Limiting and Best Practices",
    excerpt:
      "Understanding our API rate limits and how to optimize your integrations for better performance and reliability.",
    author: "Tom Wilson",
    date: "2024-01-01",
    readTime: "6 min read",
    category: "Tutorials",
    image: "/placeholder.svg?height=300&width=600",
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ShadowStack Blog
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Insights, updates, and best practices for cryptocurrency security monitoring
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-slate-800/50 border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 text-white placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className={
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0"
                  : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              }
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === "All" && searchQuery === "" && (
          <Card className="mb-12 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 mb-4">
                  Featured
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{featuredPost.title}</h2>
                <p className="text-slate-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors group"
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                    <Tag className="h-3 w-3 mr-1" />
                    {post.category}
                  </Badge>
                  <span className="text-xs text-slate-400">{post.readTime}</span>
                </div>
                <CardTitle className="text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-slate-300 line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 p-0">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get the latest security insights, product updates, and industry news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
              />
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              No spam, unsubscribe at any time. Read our{" "}
              <Link href="/privacy" className="text-emerald-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
