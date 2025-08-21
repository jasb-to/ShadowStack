"use client"

import { useState } from "react"
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const featuredPost = {
  title: "The Future of Crypto Security: AI-Powered Threat Detection",
  excerpt:
    "Explore how artificial intelligence is revolutionizing the way we detect and respond to security threats in the cryptocurrency space.",
  author: "Sarah Chen",
  date: "Dec 15, 2024",
  readTime: "8 min read",
  category: "Security",
  image: "/placeholder.svg?height=400&width=800&text=AI+Security",
}

const blogPosts = [
  {
    title: "Understanding Telegram Channel Monitoring",
    excerpt:
      "Learn how ShadowStack monitors public Telegram channels for potential security threats and breach discussions.",
    author: "Mike Rodriguez",
    date: "Dec 12, 2024",
    readTime: "5 min read",
    category: "Monitoring",
    tags: ["Telegram", "Monitoring", "Security"],
  },
  {
    title: "Best Practices for Wallet Security",
    excerpt:
      "Essential security measures every crypto exchange should implement to protect hot wallets and user funds.",
    author: "Alex Thompson",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    category: "Security",
    tags: ["Wallets", "Security", "Best Practices"],
  },
  {
    title: "Setting Up Real-Time Alerts",
    excerpt: "Step-by-step guide to configuring email and webhook alerts for immediate threat notifications.",
    author: "Lisa Park",
    date: "Dec 8, 2024",
    readTime: "4 min read",
    category: "Tutorial",
    tags: ["Alerts", "Configuration", "Tutorial"],
  },
  {
    title: "Compliance and Regulatory Updates",
    excerpt: "Stay updated with the latest compliance requirements and regulatory changes affecting crypto security.",
    author: "David Kim",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    category: "Compliance",
    tags: ["Compliance", "Regulations", "Legal"],
  },
  {
    title: "Case Study: Preventing a Major Breach",
    excerpt: "How one exchange used ShadowStack to detect and prevent a potential security breach before it happened.",
    author: "Emma Wilson",
    date: "Dec 3, 2024",
    readTime: "9 min read",
    category: "Case Study",
    tags: ["Case Study", "Prevention", "Success Story"],
  },
  {
    title: "API Integration Guide",
    excerpt: "Complete guide to integrating ShadowStack's API with your existing security infrastructure.",
    author: "James Foster",
    date: "Dec 1, 2024",
    readTime: "10 min read",
    category: "Development",
    tags: ["API", "Integration", "Development"],
  },
]

const categories = ["All", "Security", "Monitoring", "Tutorial", "Compliance", "Case Study", "Development"]

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
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">ShadowStack Blog</h1>
            <p className="text-xl text-slate-300 mb-8">
              Insights, tutorials, and updates on crypto security and threat monitoring
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <section className="mb-16">
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
                <Badge className="bg-emerald-600 text-white mb-4">{featuredPost.category}</Badge>
                <h2 className="text-2xl font-bold text-white mb-4">{featuredPost.title}</h2>
                <p className="text-slate-300 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center text-slate-400 text-sm mb-6">
                  <User className="h-4 w-4 mr-2" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="mr-4">{featuredPost.date}</span>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="text-slate-300 line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-slate-400 text-sm mb-4">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{post.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs border-slate-600 text-slate-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border-emerald-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Stay Updated</CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Get the latest security insights and ShadowStack updates delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Subscribe</Button>
              </div>
              <p className="text-slate-400 text-sm mt-4">No spam, unsubscribe at any time</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
