import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section Skeleton */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Skeleton className="h-12 w-96 mx-auto mb-6 bg-slate-800" />
            <Skeleton className="h-6 w-[600px] mx-auto mb-8 bg-slate-800" />
            <Skeleton className="h-12 w-full max-w-2xl mx-auto bg-slate-800" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post Skeleton */}
          <section className="mb-16">
            <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Skeleton className="w-full h-64 md:h-80 bg-slate-700" />
                </div>
                <div className="md:w-1/2 p-8">
                  <Skeleton className="h-6 w-20 mb-4 bg-slate-700" />
                  <Skeleton className="h-8 w-full mb-4 bg-slate-700" />
                  <Skeleton className="h-4 w-full mb-2 bg-slate-700" />
                  <Skeleton className="h-4 w-3/4 mb-6 bg-slate-700" />
                  <div className="flex items-center space-x-4 mb-6">
                    <Skeleton className="h-4 w-20 bg-slate-700" />
                    <Skeleton className="h-4 w-24 bg-slate-700" />
                    <Skeleton className="h-4 w-16 bg-slate-700" />
                  </div>
                  <Skeleton className="h-10 w-32 bg-slate-700" />
                </div>
              </div>
            </Card>
          </section>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-3">
              {/* Categories Skeleton */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 bg-slate-800" />
                ))}
              </div>

              {/* Blog Posts Grid Skeleton */}
              <div className="grid gap-8 md:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="bg-slate-800/50 border-slate-700">
                    <div className="aspect-video">
                      <Skeleton className="w-full h-full bg-slate-700" />
                    </div>
                    <CardHeader>
                      <Skeleton className="h-6 w-full mb-2 bg-slate-700" />
                      <Skeleton className="h-4 w-full mb-1 bg-slate-700" />
                      <Skeleton className="h-4 w-3/4 bg-slate-700" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-16 bg-slate-700" />
                          <Skeleton className="h-4 w-20 bg-slate-700" />
                        </div>
                        <Skeleton className="h-4 w-12 bg-slate-700" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Skeleton */}
              <div className="text-center mt-12">
                <Skeleton className="h-10 w-40 mx-auto bg-slate-800" />
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-8">
              {/* Newsletter Signup Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <Skeleton className="h-6 w-32 mb-2 bg-slate-700" />
                  <Skeleton className="h-4 w-full bg-slate-700" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-10 w-full bg-slate-700" />
                  <Skeleton className="h-10 w-full bg-slate-700" />
                </CardContent>
              </Card>

              {/* Trending Topics Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <Skeleton className="h-6 w-40 bg-slate-700" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                        <div className="flex items-center">
                          <Skeleton className="w-8 h-8 rounded-lg mr-3 bg-slate-600" />
                          <Skeleton className="h-4 w-24 bg-slate-600" />
                        </div>
                        <Skeleton className="h-5 w-8 bg-slate-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <Skeleton className="h-6 w-32 bg-slate-700" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 rounded-lg">
                        <Skeleton className="h-4 w-full mb-2 bg-slate-700" />
                        <Skeleton className="h-4 w-3/4 mb-2 bg-slate-700" />
                        <div className="flex items-center">
                          <Skeleton className="h-3 w-16 bg-slate-700" />
                          <span className="mx-2 text-slate-600">•</span>
                          <Skeleton className="h-3 w-12 bg-slate-700" />
                        </div>
                      </div>
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
