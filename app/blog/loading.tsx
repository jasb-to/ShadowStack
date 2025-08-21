import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="h-10 bg-slate-800 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-slate-800 rounded-lg w-96 mx-auto mb-8 animate-pulse" />
            <div className="h-12 bg-slate-800 rounded-lg max-w-2xl mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post Skeleton */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="w-full h-64 md:h-full bg-slate-700 animate-pulse" />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="h-6 bg-slate-700 rounded w-20 mb-4 animate-pulse" />
                <div className="h-8 bg-slate-700 rounded w-full mb-4 animate-pulse" />
                <div className="h-4 bg-slate-700 rounded w-full mb-2 animate-pulse" />
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-6 animate-pulse" />
                <div className="flex items-center mb-6">
                  <div className="h-4 bg-slate-700 rounded w-32 mr-4 animate-pulse" />
                  <div className="h-4 bg-slate-700 rounded w-24 mr-4 animate-pulse" />
                  <div className="h-4 bg-slate-700 rounded w-20 animate-pulse" />
                </div>
                <div className="h-10 bg-slate-700 rounded w-32 animate-pulse" />
              </div>
            </div>
          </Card>
        </section>

        {/* Category Filter Skeleton */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-8 bg-slate-700 rounded w-20 animate-pulse" />
            ))}
          </div>
        </section>

        {/* Blog Posts Grid Skeleton */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded w-20 mb-2 animate-pulse" />
                  <div className="h-6 bg-slate-700 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-slate-700 rounded w-full mb-1 animate-pulse" />
                  <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="h-4 bg-slate-700 rounded w-24 mr-4 animate-pulse" />
                    <div className="h-4 bg-slate-700 rounded w-20 animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-slate-700 rounded w-16 animate-pulse" />
                    <div className="flex gap-1">
                      <div className="h-5 bg-slate-700 rounded w-12 animate-pulse" />
                      <div className="h-5 bg-slate-700 rounded w-16 animate-pulse" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
