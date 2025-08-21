import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-12 bg-slate-700 rounded-lg mb-6 animate-pulse"></div>
            <div className="h-6 bg-slate-700 rounded-lg mb-8 animate-pulse"></div>
            <div className="h-12 bg-slate-700 rounded-lg max-w-2xl mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Skeleton */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-slate-700 rounded-lg animate-pulse"></div>
          ))}
        </div>

        {/* Featured Post Skeleton */}
        <Card className="mb-12 bg-slate-800/50 border-slate-700 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="w-full h-64 md:h-full bg-slate-700 animate-pulse"></div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="h-6 w-20 bg-slate-700 rounded mb-4 animate-pulse"></div>
              <div className="h-8 bg-slate-700 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-slate-700 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-slate-700 rounded mb-6 animate-pulse"></div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <div className="h-4 w-20 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-slate-700 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-24 bg-slate-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-slate-800/50 border-slate-700">
              <div className="aspect-video bg-slate-700 animate-pulse rounded-t-lg"></div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-5 w-16 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-12 bg-slate-700 rounded animate-pulse"></div>
                </div>
                <div className="h-6 bg-slate-700 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded mb-1 animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <div className="h-4 w-16 bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-slate-700 rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 w-16 bg-slate-700 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
