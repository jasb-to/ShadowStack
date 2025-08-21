"use client"

import { useState } from "react"
import { Search, Calendar, Clock, User, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredPost = {
  id: 1,
  title: "The Evolution of Crypto Security: Why Traditional Monitoring Falls Short",
  excerpt:
    "As the crypto landscape evolves, so do the threats. Learn why traditional security monitoring approaches are insufficient for modern digital assets and how ShadowStack addresses these challenges.",
  author: "Sarah Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Security",
  image: "/placeholder.svg?height=400&width=800&text=Featured+Article",
  featured: true,
}

const blogPosts = [
  {
    id: 2,
    title: "Real-time Threat Detection: How AI Powers ShadowStack",
    excerpt:
      "Discover how artificial intelligence and machine learning algorithms enable ShadowStack to detect threats in real-time across multiple channels.",
    author: "Marcus Rodriguez",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=500&text=AI+Detection",
  },
  {
    id: 3,
    title: "Case Study: Preventing a $2M DeFi Protocol Breach",
    excerpt:
      "Learn how ShadowStack helped a major DeFi protocol identify and prevent a potential breach that could have resulted in millions in losses.",
    author: "Alex Thompson",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Case Study",
    image: "/placeholder.svg?height=300&width=500&text=Case+Study",
  },
  {
    id: 4,
    title: "Telegram Channel Monitoring: Best Practices for Crypto Companies",
    excerpt:
      "A comprehensive guide to monitoring Telegram channels for potential threats and breach chatter in the crypto space.",
    author: "Jennifer Liu",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Guide",
    image: "/placeholder.svg?height=300&width=500&text=Telegram+Guide",
  },
  {
    id: 5,
    title: "The Cost of Data Breaches in Crypto: 2024 Industry Report",
    excerpt:
      "Our annual report reveals the true cost of data breaches in the cryptocurrency industry and how companies can protect themselves.",
    author: "David Park",
    date: "2024-01-05",
    readTime: "12 min read",
    category: "Research",
    image: "/placeholder.svg?height=300&width=500&text=Industry+Report",
  },
  {
    id: 6,
    title: "Building a Security-First Culture in Fintech",
    excerpt:
      "How fintech companies can foster a security-first mindset across their organization and implement effective breach prevention strategies.",
    author: "Rachel Green",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Culture",
    image: "/placeholder.svg?height=300&width=500&text=Security+Culture",
  },
]

const categories = [
  { name: "All", count: 25, icon: TrendingUp },
  { name: "Security", count: 8, icon: Shield },
  { name: "Technology", count: 6, icon: Zap },
  { name: "Case Study", count: 4, icon: User },
  { name: "Guide", count: 5, icon: Calendar },
  { name: "Research", count: 2, icon: Clock },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ShadowStack Blog
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Insights, guides, and industry analysis on crypto security and breach prevention
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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            selectedCategory === category.name
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "text-slate-300 hover:bg-slate-700/50 hover:text-emerald-400"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span>{category.name}</span>
                          </div>
                          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                            {category.count}
                          </Badge>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Stay Updated</CardTitle>
                  <CardDescription className="text-slate-300">
                    Get the latest security insights delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                  />
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {selectedCategory === "All" && !searchQuery && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Featured Article</h2>
                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:bg-slate-800/70 transition-colors cursor-pointer group">
                  <div className="aspect-video bg-slate-700 relative overflow-hidden">
                    <img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
                      Featured
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-slate-400 mb-2">
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
                    <CardTitle className="text-2xl text-white group-hover:text-emerald-400 transition-colors">
                      {featuredPost.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-base">{featuredPost.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                        {featuredPost.category}
                      </Badge>
                      <div className="flex items-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        <span className="text-sm font-medium">Read More</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Blog Posts Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
                </h2>
                <span className="text-slate-400">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group"
                  >
                    <div className="aspect-video bg-slate-700 relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center space-x-4 text-sm text-slate-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <CardTitle className="text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-slate-300 line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                            {post.category}
                          </Badge>
                          <span className="text-sm text-slate-400">{post.readTime}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg">No articles found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("All")
                    }}
                    variant="outline"
                    className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
