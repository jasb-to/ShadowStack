"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"

const featuredPost = {
  title: "The Evolution of Crypto Security Threats in 2024",
  excerpt:
    "An in-depth analysis of emerging security threats in the cryptocurrency space and how exchanges can stay protected.",
  author: "Security Team",
  date: "March 15, 2024",
  readTime: "8 min read",
  category: "Security",
  image: "/placeholder.svg?height=400&width=600",
}

const blogPosts = [
  {
    title: "How AI is Revolutionizing Threat Detection",
    excerpt:
      "Discover how machine learning algorithms are transforming the way we detect and respond to security threats.",
    author: "Dr. Sarah Chen",
    date: "March 12, 2024",
    readTime: "6 min read",
    category: "AI & Technology",
    icon: Zap,
  },
  {
    title: "Best Practices for Hot Wallet Security",
    excerpt: "Essential security measures every crypto exchange should implement to protect their hot wallets.",
    author: "Mike Rodriguez",
    date: "March 10, 2024",
    readTime: "5 min read",
    category: "Security",
    icon: Shield,
  },
  {
    title: "Market Analysis: Crypto Security Trends Q1 2024",
    excerpt: "A comprehensive overview of security incidents and trends in the first quarter of 2024.",
    author: "Analytics Team",
    date: "March 8, 2024",
    readTime: "7 min read",
    category: "Market Analysis",
    icon: TrendingUp,
  },
  {
    title: "Implementing Real-time Monitoring Systems",
    excerpt: "Step-by-step guide to setting up effective real-time monitoring for your crypto infrastructure.",
    author: "Tech Team",
    date: "March 5, 2024",
    readTime: "10 min read",
    category: "Technical",
    icon: Zap,
  },
  {
    title: "Understanding Telegram Threat Intelligence",
    excerpt: "How to leverage Telegram channels for early threat detection and intelligence gathering.",
    author: "Intelligence Team",
    date: "March 3, 2024",
    readTime: "4 min read",
    category: "Intelligence",
    icon: Shield,
  },
  {
    title: "Regulatory Compliance in Crypto Security",
    excerpt: "Navigate the complex landscape of security regulations and compliance requirements.",
    author: "Legal Team",
    date: "March 1, 2024",
    readTime: "9 min read",
    category: "Compliance",
    icon: TrendingUp,
  },
]

const categories = ["All", "Security", "AI & Technology", "Market Analysis", "Technical", "Intelligence", "Compliance"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Security Insights & Updates</h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Stay informed with the latest trends, insights, and best practices in cryptocurrency security
              </p>
            </div>

            {/* Featured Post */}
            <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <Shield className="w-24 h-24 text-white opacity-50" />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="bg-emerald-600 text-white mb-4">{featuredPost.category}</Badge>
                  <h2 className="text-2xl font-bold text-white mb-4">{featuredPost.title}</h2>
                  <p className="text-slate-300 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{featuredPost.author}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={
                  category === "All"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {post.category}
                    </Badge>
                    <post.icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <CardTitle className="text-white hover:text-emerald-400 transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
