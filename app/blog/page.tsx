"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Calendar, Clock, User, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
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
  { name: "Tutorials", count: 3 },
  { name: "Company", count: 2 },
]

const featuredPost = {
  title: "The Future of Crypto Exchange Security: AI-Powered Threat Detection",
  excerpt:
    "Explore how artificial intelligence is revolutionizing the way crypto exchanges detect and prevent security threats in real-time.",
  author: "Sarah Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Security",
  image: "/placeholder.jpg",
  featured: true,
}

const blogPosts = [
  {
    title: "How to Set Up Multi-Chain Wallet Monitoring",
    excerpt: "A comprehensive guide to monitoring wallets across Bitcoin, Ethereum, BSC, Solana, and TRON networks.",
    author: "Marcus Rodriguez",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Tutorials",
    image: "/placeholder.jpg",
  },
  {
    title: "Understanding Proof of Reserves in 2024",
    excerpt: "Why proof of reserves is becoming essential for crypto exchanges and how to implement it effectively.",
    author: "Elena Kowalski",
    date: "2024-01-10",
    readTime: "5 min read",
    category: "Industry News",
    image: "/placeholder.jpg",
  },
  {
    title: "ShadowStack v2.1: Enhanced AI Anomaly Detection",
    excerpt:
      "Introducing improved machine learning algorithms that reduce false positives by 40% while increasing threat detection accuracy.",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "4 min read",
    category: "Product Updates",
    image: "/placeholder.jpg",
  },
  {
    title: "The Cost of Crypto Exchange Hacks in 2023",
    excerpt: "A detailed analysis of major security breaches and their impact on the cryptocurrency ecosystem.",
    author: "Jennifer Walsh",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Security",
    image: "/placeholder.jpg",
  },
  {
    title: "Building Trust Through Transparency",
    excerpt: "How real-time monitoring and public proof of reserves can help exchanges build user confidence.",
    author: "Alex Thompson",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Industry News",
    image: "/placeholder.jpg",
  },
  {
    title: "API Integration Best Practices",
    excerpt: "Learn how to integrate ShadowStack's monitoring API into your existing exchange infrastructure.",
    author: "Ryan Foster",
    date: "2024-01-01",
    readTime: "9 min read",
    category: "Tutorials",
    image: "/placeholder.jpg",
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                ShadowStack Blog
              </h1>
              <p className="mx-auto max-w-[600px] text-slate-300 text-lg">
                Insights, updates, and best practices for crypto exchange security
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-400"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Featured Post */}
              <section>
                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={featuredPost.image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <Badge className="bg-emerald-600 text-white mb-4">Featured</Badge>
                      <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 mb-4 ml-2">
                        {featuredPost.category}
                      </Badge>
                      <h2 className="text-2xl font-bold text-white mb-4 leading-tight">{featuredPost.title}</h2>
                      <p className="text-slate-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Category Filter */}
              <section>
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.name)}
                      className={
                        selectedCategory === category.name
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                      }
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>

                {/* Blog Posts Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                  {filteredPosts.map((post, index) => (
                    <Card
                      key={index}
                      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group"
                    >
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 w-fit">
                          {post.category}
                        </Badge>
                        <CardTitle className="text-white group-hover:text-emerald-400 transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-slate-300 mb-4 leading-relaxed">
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-slate-400 text-lg">No articles found matching your criteria.</p>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Newsletter Signup */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Stay Updated</CardTitle>
                  <CardDescription className="text-slate-300">
                    Get the latest security insights and product updates delivered to your inbox.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Subscribe</Button>
                </CardContent>
              </Card>

              {/* Popular Topics */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Popular Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-white font-medium">Security Best Practices</div>
                      <div className="text-sm text-slate-400">12 articles</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">Market Analysis</div>
                      <div className="text-sm text-slate-400">8 articles</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-white font-medium">Product Updates</div>
                      <div className="text-sm text-slate-400">6 articles</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="text-white font-medium text-sm leading-tight hover:text-emerald-400 transition-colors cursor-pointer">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      {index < 2 && <div className="border-t border-slate-700 pt-4"></div>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 border-emerald-400/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-white font-bold mb-2">Ready to Secure Your Exchange?</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Start monitoring your crypto wallets with ShadowStack today.
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                  >
                    <Link href="/onboarding">Start Free Trial</Link>
                  </Button>
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
