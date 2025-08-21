"use client"

import { useState } from "react"
import { Search, Calendar, User, ArrowRight, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const featuredPost = {
  id: 1,
  title: "The Evolution of Crypto Security: 2024 Threat Landscape Analysis",
  excerpt:
    "An in-depth look at the emerging security threats facing cryptocurrency exchanges and DeFi protocols in 2024, including new attack vectors and defensive strategies.",
  author: "Sarah Chen",
  date: "March 15, 2024",
  readTime: "12 min read",
  category: "Security Analysis",
  image: "/placeholder.svg?height=400&width=800&text=Crypto+Security+2024",
  featured: true,
}

const blogPosts = [
  {
    id: 2,
    title: "Building Resilient Hot Wallet Infrastructure",
    excerpt:
      "Best practices for designing and maintaining secure hot wallet systems that can withstand sophisticated attacks while maintaining operational efficiency.",
    author: "Mike Rodriguez",
    date: "March 10, 2024",
    readTime: "8 min read",
    category: "Infrastructure",
    views: 1250,
  },
  {
    id: 3,
    title: "AI-Powered Threat Detection: Beyond Traditional Monitoring",
    excerpt:
      "How machine learning and artificial intelligence are revolutionizing the way we detect and respond to security threats in real-time.",
    author: "Dr. Emily Watson",
    date: "March 5, 2024",
    readTime: "10 min read",
    category: "AI & Machine Learning",
    views: 980,
  },
  {
    id: 4,
    title: "The Psychology of Social Engineering in Crypto",
    excerpt:
      "Understanding the human factors that make cryptocurrency organizations vulnerable to social engineering attacks and how to build a security-aware culture.",
    author: "James Thompson",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Social Engineering",
    views: 850,
  },
  {
    id: 5,
    title: "Incident Response Playbook for Crypto Exchanges",
    excerpt:
      "A comprehensive guide to developing and executing effective incident response procedures specifically tailored for cryptocurrency trading platforms.",
    author: "Lisa Park",
    date: "February 20, 2024",
    readTime: "15 min read",
    category: "Incident Response",
    views: 720,
  },
  {
    id: 6,
    title: "Regulatory Compliance in the Age of DeFi",
    excerpt:
      "Navigating the complex regulatory landscape surrounding decentralized finance while maintaining security and user privacy.",
    author: "Robert Kumar",
    date: "February 15, 2024",
    readTime: "9 min read",
    category: "Compliance",
    views: 650,
  },
  {
    id: 7,
    title: "Multi-Signature Wallet Security: Advanced Configurations",
    excerpt:
      "Deep dive into advanced multi-signature wallet configurations, threshold schemes, and best practices for institutional-grade security.",
    author: "Alex Turner",
    date: "February 8, 2024",
    readTime: "11 min read",
    category: "Wallet Security",
    views: 590,
  },
]

const categories = [
  "All Posts",
  "Security Analysis",
  "Infrastructure",
  "AI & Machine Learning",
  "Social Engineering",
  "Incident Response",
  "Compliance",
  "Wallet Security",
]

const trendingTopics = [
  { topic: "Zero-Knowledge Proofs", posts: 12 },
  { topic: "MEV Protection", posts: 8 },
  { topic: "Cross-Chain Security", posts: 15 },
  { topic: "Quantum Resistance", posts: 6 },
  { topic: "Flash Loan Attacks", posts: 10 },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Posts")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Security Insights & Analysis
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Expert perspectives on cryptocurrency security, threat intelligence, and industry best practices
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-slate-800/50 border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 text-white placeholder-slate-400"
              />
            </div>
          </div>

          {/* Featured Post */}
          <Card className="max-w-4xl mx-auto bg-slate-800/50 border-slate-700 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-48 md:h-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Star className="h-16 w-16 text-emerald-400" />
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 mb-4">
                  Featured Article
                </Badge>
                <h2 className="text-2xl font-bold text-white mb-4 hover:text-emerald-400 transition-colors cursor-pointer">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-300 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0"
                        : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-slate-400">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {post.views}
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400 line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
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
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                  />
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-emerald-400" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingTopics.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">
                          {item.topic}
                        </span>
                        <Badge variant="secondary" className="bg-slate-700 text-slate-400">
                          {item.posts}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Archives */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Archives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["March 2024", "February 2024", "January 2024", "December 2023", "November 2023"].map(
                      (month, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm"
                        >
                          {month}
                        </a>
                      ),
                    )}
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
