import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock, ArrowRight, TrendingUp, Shield, Brain, AlertTriangle, Eye, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const featuredPost = {
  title: "The Future of Crypto Security: AI-Powered Threat Detection",
  excerpt:
    "Discover how artificial intelligence is revolutionizing cryptocurrency security monitoring and what it means for the future of digital asset protection.",
  author: "Sarah Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "AI & Security",
  image: "/placeholder.jpg",
  featured: true,
}

const blogPosts = [
  {
    title: "Understanding Wallet Security: Best Practices for 2024",
    excerpt:
      "Essential security measures every crypto holder should implement to protect their digital assets from emerging threats.",
    author: "Mike Rodriguez",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Security",
    image: "/placeholder.jpg",
  },
  {
    title: "How to Set Up Real-Time Monitoring for Your Crypto Portfolio",
    excerpt:
      "Step-by-step guide to implementing comprehensive monitoring for your cryptocurrency wallets and exchanges.",
    author: "Alex Thompson",
    date: "2024-01-10",
    readTime: "5 min read",
    category: "Tutorial",
    image: "/placeholder.jpg",
  },
  {
    title: "The Rise of DeFi Security Threats: What You Need to Know",
    excerpt: "Analyzing the latest security vulnerabilities in decentralized finance and how to protect yourself.",
    author: "Emma Wilson",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "DeFi",
    image: "/placeholder.jpg",
  },
  {
    title: "Machine Learning in Cryptocurrency: Detecting Anomalies",
    excerpt: "How machine learning algorithms can identify suspicious patterns in blockchain transactions.",
    author: "David Park",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Technology",
    image: "/placeholder.jpg",
  },
  {
    title: "Regulatory Updates: Global Crypto Security Standards",
    excerpt: "Latest regulatory developments affecting cryptocurrency security requirements worldwide.",
    author: "Lisa Chang",
    date: "2024-01-03",
    readTime: "4 min read",
    category: "Regulation",
    image: "/placeholder.jpg",
  },
  {
    title: "Case Study: Preventing a $50M Exchange Hack",
    excerpt: "Real-world example of how advanced monitoring systems prevented a major cryptocurrency exchange breach.",
    author: "James Miller",
    date: "2024-01-01",
    readTime: "10 min read",
    category: "Case Study",
    image: "/placeholder.jpg",
  },
]

const categories = [
  { name: "All Posts", count: 24, active: true },
  { name: "Security", count: 8 },
  { name: "AI & Technology", count: 6 },
  { name: "Tutorial", count: 5 },
  { name: "DeFi", count: 3 },
  { name: "Regulation", count: 2 },
]

const trendingTopics = [
  { name: "AI Security", icon: Brain, posts: 12 },
  { name: "Wallet Protection", icon: Shield, posts: 18 },
  { name: "Threat Detection", icon: AlertTriangle, posts: 15 },
  { name: "Monitoring Tools", icon: Eye, posts: 9 },
  { name: "DeFi Security", icon: Zap, posts: 7 },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">ShadowStack Blog</h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Insights, tutorials, and updates on cryptocurrency security and threat detection
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-12 pr-4 py-4 text-lg bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/20 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">Featured</Badge>
                  <CardTitle className="text-2xl md:text-3xl text-white mb-4 leading-tight">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-lg mb-6">{featuredPost.excerpt}</CardDescription>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>{featuredPost.author}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={category.active ? "default" : "outline"}
                    size="sm"
                    className={
                      category.active
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "border-slate-600 text-slate-300 hover:bg-slate-800"
                    }
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 bg-slate-700 text-slate-300">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* Blog Posts Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {blogPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 group"
                  >
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-slate-900/80 text-slate-300 border-slate-600">{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-white text-xl leading-tight group-hover:text-emerald-400 transition-colors">
                        <Link href="#" className="line-clamp-2">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-slate-400 line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center space-x-2">
                          <span>{post.author}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
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
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Stay Updated</CardTitle>
                  <CardDescription className="text-slate-400">
                    Get the latest security insights delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  />
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors group"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-3">
                            <topic.icon className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-slate-300 group-hover:text-white transition-colors">{topic.name}</span>
                        </div>
                        <Badge variant="secondary" className="bg-slate-600 text-slate-300">
                          {topic.posts}
                        </Badge>
                      </Link>
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
                    {blogPosts.slice(0, 3).map((post, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="block p-3 rounded-lg hover:bg-slate-700/50 transition-colors group"
                      >
                        <h4 className="text-slate-300 group-hover:text-white transition-colors text-sm font-medium line-clamp-2 mb-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-slate-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </Link>
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
