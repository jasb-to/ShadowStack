import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-12 bg-slate-700 rounded-lg mb-6 animate-pulse" />
            <div className="h-6 bg-slate-700 rounded-lg mb-8 animate-pulse" />
            <div className="h-12 bg-slate-700 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-12 bg-slate-700 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-3">
            {/* Featured Article Skeleton */}
            <section className="mb-12">
              <div className="h-8 bg-slate-700 rounded-lg mb-6 w-48 animate-pulse" />
              <Card className="bg-slate-800/50 border-slate-700">
                <div className="aspect-video bg-slate-700 animate-pulse" />
                <CardHeader>
                  <div className="flex space-x-4 mb-2">
                    <div className="h-4 bg-slate-700 rounded w-20 animate-pulse" />
                    <div className="h-4 bg-slate-700 rounded w-24 animate-pulse" />
                    <div className="h-4 bg-slate-700 rounded w-16 animate-pulse" />
                  </div>
                  <div className="h-8 bg-slate-700 rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-slate-700 rounded mb-1 animate-pulse" />
                  <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse" />
                </CardHeader>
              </Card>
            </section>

            {/* Blog Posts Grid Skeleton */}
            <section>
              <div className="h-8 bg-slate-700 rounded-lg mb-6 w-48 animate-pulse" />
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="bg-slate-800/50 border-slate-700">
                    <div className="aspect-video bg-slate-700 animate-pulse" />
                    <CardHeader>
                      <div className="flex space-x-4 mb-2">
                        <div className="h-4 bg-slate-700 rounded w-16 animate-pulse" />
                        <div className="h-4 bg-slate-700 rounded w-20 animate-pulse" />
                      </div>
                      <div className="h-6 bg-slate-700 rounded mb-2 animate-pulse" />
                      <div className="h-4 bg-slate-700 rounded mb-1 animate-pulse" />
                      <div className="h-4 bg-slate-700 rounded w-2/3 animate-pulse" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
