import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section Skeleton */}
        <section className="py-16 bg-gradient-to-b from-slate-900/50 to-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="h-12 bg-slate-800 rounded-lg w-80 mx-auto mb-4 animate-pulse" />
              <div className="h-6 bg-slate-800 rounded w-96 mx-auto animate-pulse" />
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar Skeleton */}
              <div className="h-12 bg-slate-800 rounded-lg animate-pulse" />

              {/* Category Filter Skeleton */}
              <div className="flex flex-wrap gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 bg-slate-800 rounded-full w-24 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-3 space-y-12">
              {/* Featured Post Skeleton */}
              <section>
                <div className="flex items-center mb-6">
                  <div className="w-5 h-5 bg-slate-800 rounded mr-2 animate-pulse" />
                  <div className="h-8 bg-slate-800 rounded w-48 animate-pulse" />
                </div>

                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <div className="aspect-video bg-slate-700 animate-pulse" />
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-6 bg-slate-700 rounded-full w-20 animate-pulse" />
                      <div className="h-4 bg-slate-700 rounded w-24 animate-pulse" />
                      <div className="h-4 bg-slate-700 rounded w-20 animate-pulse" />
                    </div>

                    <div className="h-8 bg-slate-700 rounded w-full mb-4 animate-pulse" />
                    <div className="h-4 bg-slate-700 rounded w-full mb-2 animate-pulse" />
                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-6 animate-pulse" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-700 rounded-full mr-3 animate-pulse" />
                        <div>
                          <div className="h-4 bg-slate-700 rounded w-24 mb-1 animate-pulse" />
                          <div className="h-3 bg-slate-700 rounded w-32 animate-pulse" />
                        </div>
                      </div>
                      <div className="h-10 bg-slate-700 rounded w-28 animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Blog Posts Grid Skeleton */}
              <section>
                <div className="h-8 bg-slate-800 rounded w-48 mb-6 animate-pulse" />

                <div className="grid gap-8 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                      <div className="aspect-video bg-slate-700 animate-pulse" />
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="h-5 bg-slate-700 rounded-full w-16 animate-pulse" />
                          <div className="h-4 bg-slate-700 rounded w-20 animate-pulse" />
                        </div>

                        <div className="h-6 bg-slate-700 rounded w-full mb-3 animate-pulse" />
                        <div className="h-4 bg-slate-700 rounded w-full mb-2 animate-pulse" />
                        <div className="h-4 bg-slate-700 rounded w-3/4 mb-4 animate-pulse" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-slate-700 rounded-full mr-2 animate-pulse" />
                            <div>
                              <div className="h-4 bg-slate-700 rounded w-20 mb-1 animate-pulse" />
                              <div className="h-3 bg-slate-700 rounded w-16 animate-pulse" />
                            </div>
                          </div>
                          <div className="w-5 h-5 bg-slate-700 rounded animate-pulse" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-8">
              {/* Newsletter Signup Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-slate-700 rounded mr-2 animate-pulse" />
                    <div className="h-6 bg-slate-700 rounded w-32 animate-pulse" />
                  </div>
                  <div className="h-4 bg-slate-700 rounded w-full mt-2 animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-10 bg-slate-700 rounded animate-pulse" />
                  <div className="h-10 bg-slate-700 rounded animate-pulse" />
                  <div className="h-3 bg-slate-700 rounded w-3/4 animate-pulse" />
                </CardContent>
              </Card>

              {/* Popular Tags Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded w-32 animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="h-6 bg-slate-700 rounded-full w-16 animate-pulse" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded w-32 animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-b border-slate-700 last:border-0 pb-3 last:pb-0">
                        <div className="h-4 bg-slate-700 rounded w-full mb-1 animate-pulse" />
                        <div className="h-3 bg-slate-700 rounded w-20 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories Skeleton */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded w-24 animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="h-4 bg-slate-700 rounded w-20 animate-pulse" />
                        <div className="h-5 bg-slate-700 rounded-full w-8 animate-pulse" />
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
