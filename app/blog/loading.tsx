import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Title Skeleton */}
            <div className="h-12 bg-slate-800 rounded-lg mb-6 animate-pulse"></div>
            <div className="h-6 bg-slate-800 rounded-lg mb-8 animate-pulse"></div>

            {/* Search Bar Skeleton */}
            <div className="relative max-w-2xl mx-auto">
              <div className="h-14 bg-slate-800/50 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Featured Post Skeleton */}
          <Card className="max-w-4xl mx-auto bg-slate-800/50 border-slate-700 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-48 md:h-full bg-slate-700 animate-pulse"></div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="h-6 bg-slate-700 rounded mb-4 w-24 animate-pulse"></div>
                <div className="h-8 bg-slate-700 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-4 bg-slate-700 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-slate-700 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-slate-700 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="h-8 bg-slate-700 rounded w-24 animate-pulse"></div>
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
            {/* Category Filter Skeleton */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-8 bg-slate-800 rounded w-20 animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid Skeleton */}
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-5 bg-slate-700 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-slate-700 rounded w-12 animate-pulse"></div>
                    </div>
                    <div className="h-6 bg-slate-700 rounded mb-2 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-700 rounded w-2/3 animate-pulse"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-3 bg-slate-700 rounded w-16 animate-pulse"></div>
                        <div className="h-3 bg-slate-700 rounded w-20 animate-pulse"></div>
                      </div>
                      <div className="h-3 bg-slate-700 rounded w-16 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Newsletter Signup Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
                </CardContent>
              </Card>

              {/* Trending Topics Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded w-32 animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="h-4 bg-slate-700 rounded w-24 animate-pulse"></div>
                        <div className="h-4 bg-slate-700 rounded w-8 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
