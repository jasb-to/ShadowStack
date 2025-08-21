"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, Clock, User, ArrowRight, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "All", count: 24 },
  { name: "Security", count: 8 },
  { name: "Product Updates", count: 6 },
  { name: "Industry News", count: 5 },
  { name: "Tutorials", count: 3 },
  { name: "Company", count: 2 },
]

const featuredPost = {
  title: "The Rise of Crypto Security Threats in 2024",
  excerpt:
    "An in-depth analysis of the evolving threat landscape in cryptocurrency and how organizations can protect themselves.",
  author: "Sarah Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Security",
  image: "/placeholder.jpg",
  href: "/blog/crypto-security-threats-2024",
}

const blogPosts = [
  {
    title: "How to Set Up Real-Time Breach Monitoring",
    excerpt: "A step-by-step guide to configuring ShadowStack for maximum security coverage.",
    author: "Mike Rodriguez",
    date: "2024-01-12",
    readTime: "5 min read",
    category: "Tutorials",
    image: "/placeholder.jpg",
    href: "/blog/setup-breach-monitoring",
  },
  {
    title: "ShadowStack 2.0: Enhanced AI Detection",
    excerpt: "Introducing our new AI-powered threat detection system with improved accuracy and faster response times.",
    author: "Alex Thompson",
    date: "2024-01-10",
    readTime: "4 min read",
    category: "Product Updates",
    image: "/placeholder.jpg",
    href: "/blog/shadowstack-2-0-ai-detection",
  },
  {
    title: "Understanding Telegram Channel Monitoring",
    excerpt: "Learn how threat actors use Telegram and how to monitor these channels effectively.",
    author: "Jennifer Liu",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Security",
    image: "/placeholder.jpg",
    href: "/blog/telegram-channel-monitoring",
  },
  {
    title: "Building a Security-First Culture",
    excerpt: "Best practices for creating a security-minded organization from the ground up.",
    author: "David Park",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Industry News",
    image: "/placeholder.jpg",
    href: "/blog/security-first-culture",
  },
  {
    title: "API Security: Common Vulnerabilities",
    excerpt: "Identifying and preventing the most common API security vulnerabilities in modern applications.",
    author: "Sarah Chen",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Security",
    image: "/placeholder.jpg",
    href: "/blog/api-security-vulnerabilities",
  },
  {
    title: "Year in Review: 2023 Security Incidents",
    excerpt: "A comprehensive analysis of major security incidents from 2023 and lessons learned.",
    author: "Mike Rodriguez",
    date: "2023-12-28",
    readTime: "12 min read",
    category: "Industry News",
    image: "/placeholder.jpg",
    href: "/blog/2023-security-incidents-review",
  },
]

const recentPosts = [
  { title: "Quick Security Audit Checklist", href: "/blog/security-audit-checklist", date: "2024-01-14" },
  { title: "New Integration: Slack Alerts", href: "/blog/slack-integration", date: "2024-01-11" },
  { title: "Compliance Made Simple", href: "/blog/compliance-guide", date: "2024-01-09" },
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Security Insights & Updates</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay informed with the latest security trends, product updates, and expert insights from the ShadowStack
              team.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Article</h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={featuredPost.image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary">{featuredPost.category}</Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Featured</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400">
                      <Link href={featuredPost.href}>{featuredPost.title}</Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                      <Link href={featuredPost.href}>
                        <Button variant="ghost" size="sm" className="group">
                          Read more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex items-center space-x-1"
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400">
                      <Link href={post.href}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Newsletter Signup */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stay Updated</CardTitle>
                  <CardDescription>Get the latest security insights delivered to your inbox.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="email" placeholder="Enter your email" />
                  <Button className="w-full">Subscribe</Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">No spam. Unsubscribe at any time.</p>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-1">
                        <Link href={post.href}>{post.title}</Link>
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Security", "Monitoring", "Threats", "API", "Crypto", "Fintech", "Compliance", "AI"].map(
                      (tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact CTA */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                  <CardDescription>Have questions about security monitoring?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/contact">
                    <Button className="w-full">Contact Our Experts</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
