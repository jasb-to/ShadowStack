"use client"

import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const blogPosts = [
  {
    title: "The Evolution of Crypto Security Threats in 2024",
    excerpt: "Explore the latest trends in cryptocurrency security threats and how exchanges can stay protected.",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Security",
    featured: true,
  },
  {
    title: "Building Resilient Hot Wallet Infrastructure",
    excerpt: "Best practices for securing hot wallets while maintaining operational efficiency.",
    author: "Michael Rodriguez",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Infrastructure",
  },
  {
    title: "AI-Powered Threat Detection: A Game Changer",
    excerpt: "How artificial intelligence is revolutionizing the way we detect and respond to security threats.",
    author: "Dr. Emily Watson",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "AI & ML",
  },
  {
    title: "Regulatory Compliance in Crypto Security",
    excerpt: "Navigate the complex landscape of security regulations for cryptocurrency exchanges.",
    author: "James Thompson",
    date: "2023-12-28",
    readTime: "10 min read",
    category: "Compliance",
  },
  {
    title: "Real-time Monitoring: Beyond Traditional Approaches",
    excerpt: "Why real-time threat monitoring is essential for modern crypto exchanges.",
    author: "Lisa Park",
    date: "2023-12-20",
    readTime: "7 min read",
    category: "Monitoring",
  },
  {
    title: "Case Study: Preventing a $50M Security Breach",
    excerpt: "How ShadowStack helped a major exchange prevent a catastrophic security incident.",
    author: "Alex Kumar",
    date: "2023-12-15",
    readTime: "15 min read",
    category: "Case Study",
  },
]

const categories = ["All", "Security", "Infrastructure", "AI & ML", "Compliance", "Monitoring", "Case Study"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">ShadowStack Blog</h1>
            <p className="text-xl text-slate-300 mb-8">Insights, updates, and best practices for crypto security</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  category === "All"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          {blogPosts
            .filter((post) => post.featured)
            .map((post, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 mb-12">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-emerald-600 text-white">Featured</Badge>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {post.category}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">{post.title}</h2>
                  <p className="text-lg text-slate-300 mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-white line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="text-slate-400 line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{new Date(post.date).toLocaleDateString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-400 hover:text-emerald-300 hover:bg-slate-700"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16">
            <Card className="bg-slate-800/50 border-slate-700 max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
                <p className="text-slate-300 mb-6">
                  Get the latest insights on crypto security delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
