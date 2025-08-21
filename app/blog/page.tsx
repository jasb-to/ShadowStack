"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Clock, User, ArrowRight, TrendingUp, Shield, Zap, Brain, ChevronRight } from "lucide-react"

const categories = [
  { name: "All Posts", count: 24, active: true },
  { name: "Security", count: 8, active: false },
  { name: "Technology", count: 6, active: false },
  { name: "Industry News", count: 5, active: false },
  { name: "Tutorials", count: 5, active: false },
]

const featuredPost = {
  id: "1",
  title: "The Future of Crypto Security: AI-Powered Threat Detection",
  excerpt:
    "Explore how artificial intelligence is revolutionizing cryptocurrency security monitoring and threat detection in 2024.",
  content:
    "As the cryptocurrency landscape continues to evolve, so do the threats that target digital assets. Traditional security measures, while still important, are no longer sufficient to protect against sophisticated attacks...",
  author: "Sarah Chen",
  authorRole: "Head of Security",
  publishedAt: "2024-01-15",
  readTime: "8 min read",
  category: "Security",
  image: "/placeholder.svg?height=400&width=800&text=AI+Security",
  featured: true,
  tags: ["AI", "Security", "Blockchain", "Threat Detection"],
}

const blogPosts = [
  {
    id: "2",
    title: "Multi-Chain Wallet Monitoring: Best Practices for 2024",
    excerpt: "Learn how to effectively monitor wallets across Bitcoin, Ethereum, BSC, Solana, and TRON networks.",
    author: "Marcus Rodriguez",
    authorRole: "Blockchain Engineer",
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=500&text=Multi-Chain",
    tags: ["Multi-Chain", "Monitoring", "Best Practices"],
  },
  {
    id: "3",
    title: "Regulatory Compliance in Crypto Security Monitoring",
    excerpt:
      "Understanding the evolving regulatory landscape and how to maintain compliance while monitoring crypto assets.",
    author: "Elena Kowalski",
    authorRole: "Compliance Officer",
    publishedAt: "2024-01-10",
    readTime: "10 min read",
    category: "Industry News",
    image: "/placeholder.svg?height=300&width=500&text=Compliance",
    tags: ["Compliance", "Regulation", "Legal"],
  },
  {
    id: "4",
    title: "Setting Up Your First Security Alert: A Step-by-Step Guide",
    excerpt: "Complete tutorial on configuring your first wallet monitoring alert with ShadowStack.",
    author: "David Park",
    authorRole: "Developer Relations",
    publishedAt: "2024-01-08",
    readTime: "4 min read",
    category: "Tutorials",
    image: "/placeholder.svg?height=300&width=500&text=Tutorial",
    tags: ["Tutorial", "Setup", "Alerts"],
  },
  {
    id: "5",
    title: "The Rise of DeFi Security Threats in 2024",
    excerpt: "Analyzing the latest DeFi security threats and how exchanges can protect themselves.",
    author: "Alex Thompson",
    authorRole: "Security Researcher",
    publishedAt: "2024-01-05",
    readTime: "7 min read",
    category: "Security",
    image: "/placeholder.svg?height=300&width=500&text=DeFi+Security",
    tags: ["DeFi", "Security", "Threats"],
  },
  {
    id: "6",
    title: "API Integration: Connecting ShadowStack to Your Infrastructure",
    excerpt: "How to integrate ShadowStack's monitoring capabilities into your existing security infrastructure.",
    author: "Jennifer Liu",
    authorRole: "Solutions Engineer",
    publishedAt: "2024-01-03",
    readTime: "12 min read",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=500&text=API+Integration",
    tags: ["API", "Integration", "Infrastructure"],
  },
]

const popularTags = [
  "Security",
  "AI",
  "Blockchain",
  "DeFi",
  "Compliance",
  "API",
  "Tutorial",
  "Multi-Chain",
  "Threats",
  "Monitoring",
]

const recentPosts = [
  { title: "Weekly Security Digest: January 2024", date: "Jan 15, 2024" },
  { title: "New Feature: Advanced Pattern Recognition", date: "Jan 12, 2024" },
  { title: "ShadowStack at Crypto Security Summit", date: "Jan 10, 2024" },
  { title: "Q4 2023 Threat Intelligence Report", date: "Jan 8, 2024" },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Posts")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-slate-900/50 to-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ShadowStack Blog</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Stay updated with the latest in crypto security, threat intelligence, and industry insights
              </p>
            </div>

            {/* Search and Categories */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className={
                      selectedCategory === category.name
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    }
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 bg-slate-700 text-slate-300">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Featured Post */}
              <section>
                <div className="flex items-center mb-6">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
                  <h2 className="text-2xl font-bold text-white">Featured Article</h2>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:bg-slate-800/70 transition-colors">
                  <div className="aspect-video bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-emerald-400" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30">
                        {featuredPost.category}
                      </Badge>
                      <div className="flex items-center text-slate-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-slate-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 hover:text-emerald-400 transition-colors">
                      <Link href={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                    </h3>

                    <p className="text-slate-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{featuredPost.author}</p>
                          <p className="text-slate-400 text-sm">{featuredPost.authorRole}</p>
                        </div>
                      </div>

                      <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                        <Link href={`/blog/${featuredPost.id}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Blog Posts Grid */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>

                {filteredPosts.length > 0 ? (
                  <div className="grid gap-8 md:grid-cols-2">
                    {filteredPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="bg-slate-800/50 border-slate-700 overflow-hidden hover:bg-slate-800/70 transition-colors group"
                      >
                        <div className="aspect-video bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center">
                          <Shield className="w-12 h-12 text-slate-400" />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge variant="outline" className="border-slate-600 text-slate-400">
                              {post.category}
                            </Badge>
                            <div className="flex items-center text-slate-500 text-sm">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readTime}
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                          </h3>

                          <p className="text-slate-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs font-semibold">
                                  {post.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium">{post.author}</p>
                                <p className="text-slate-500 text-xs">
                                  {new Date(post.publishedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <Link
                              href={`/blog/${post.id}`}
                              className="text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="text-center py-12">
                      <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
                      <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-emerald-400" />
                    Stay Updated
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Get the latest security insights delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
                  <p className="text-xs text-slate-500">No spam. Unsubscribe at any time.</p>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                      <div key={index} className="border-b border-slate-700 last:border-0 pb-3 last:pb-0">
                        <Link href="#" className="block group">
                          <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors mb-1">
                            {post.title}
                          </h4>
                          <p className="text-xs text-slate-500">{post.date}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                          {category.name}
                        </Link>
                        <Badge variant="outline" className="border-slate-600 text-slate-500 text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
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
