"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, User, ArrowRight, Search, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Rise of Crypto Threats: What Fintech Companies Need to Know",
    excerpt:
      "As cryptocurrency adoption grows, so do the threats targeting crypto and fintech companies. Learn about the latest threat landscape and how to protect your assets.",
    content: "Full blog post content would go here...",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Security",
    tags: ["Crypto", "Threats", "Fintech", "Security"],
    featured: true,
  },
  {
    id: "2",
    title: "How AI is Revolutionizing Threat Detection",
    excerpt:
      "Discover how artificial intelligence and machine learning are transforming the way we detect and respond to security threats in real-time.",
    content: "Full blog post content would go here...",
    author: "Mike Rodriguez",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "AI & Technology",
    tags: ["AI", "Machine Learning", "Threat Detection"],
    featured: true,
  },
  {
    id: "3",
    title: "Telegram Monitoring: Best Practices for Security Teams",
    excerpt:
      "Learn the most effective strategies for monitoring Telegram channels and groups for potential security threats and data breaches.",
    content: "Full blog post content would go here...",
    author: "Alex Thompson",
    date: "2024-01-10",
    readTime: "5 min read",
    category: "Monitoring",
    tags: ["Telegram", "Monitoring", "Best Practices"],
    featured: false,
  },
  {
    id: "4",
    title: "Building a Comprehensive Threat Intelligence Program",
    excerpt:
      "A step-by-step guide to establishing an effective threat intelligence program that keeps your organization ahead of emerging threats.",
    content: "Full blog post content would go here...",
    author: "Jennifer Liu",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "Strategy",
    tags: ["Threat Intelligence", "Strategy", "Security Program"],
    featured: false,
  },
  {
    id: "5",
    title: "Case Study: How ShadowStack Prevented a Major Data Breach",
    excerpt:
      "Real-world example of how our threat monitoring system detected and helped prevent a significant security incident at a major fintech company.",
    content: "Full blog post content would go here...",
    author: "David Park",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Case Study",
    tags: ["Case Study", "Data Breach", "Prevention"],
    featured: false,
  },
  {
    id: "6",
    title: "The Future of Cybersecurity: Trends to Watch in 2024",
    excerpt:
      "Explore the emerging cybersecurity trends and technologies that will shape the threat landscape in 2024 and beyond.",
    content: "Full blog post content would go here...",
    author: "Emma Wilson",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Trends",
    tags: ["Cybersecurity", "Trends", "2024", "Future"],
    featured: false,
  },
]

const categories = ["All", "Security", "AI & Technology", "Monitoring", "Strategy", "Case Study", "Trends"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">ShadowStack Blog</h1>
            <p className="text-slate-300 text-lg mb-8">
              Insights, updates, and expert analysis on cybersecurity and threat intelligence
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                          {post.category}
                        </Badge>
                        <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-white hover:text-emerald-400 transition-colors">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-slate-300">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 p-0">
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {featuredPosts.length > 0 ? "Latest Articles" : "All Articles"}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
                  >
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2 bg-slate-700 text-slate-300">
                        {post.category}
                      </Badge>
                      <CardTitle className="text-white hover:text-emerald-400 transition-colors text-lg">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-slate-300 text-sm">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 p-0 text-sm">
                          Read More <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-slate-400 mb-4">Try adjusting your search terms or category filter.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Newsletter Signup */}
          <Card className="mt-12 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-slate-300 mb-6">
                Get the latest cybersecurity insights and ShadowStack updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
