import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section Skeleton */}
        <section className="py-16 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <div className="h-16 bg-slate-800 rounded-lg w-96 mx-auto animate-pulse"></div>
              <div className="h-6 bg-slate-800 rounded w-[600px] mx-auto animate-pulse"></div>
              <div className="h-12 bg-slate-800 rounded-lg w-96 mx-auto animate-pulse"></div>
            </div>
          </div>
        </section>

        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-3 space-y-12">
              {/* Featured Post Skeleton */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="w-full h-64 md:h-80 bg-slate-700 animate-pulse"></div>
                  </div>
                  <div className="md:w-1/2 p-8 space-y-4">
                    <div className="flex gap-2">
                      <div className="h-6 bg-slate-700 rounded w-20 animate-pulse"></div>
                      <div className="h-6 bg-slate-700 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="h-8 bg-slate-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                    <div className="flex gap-4">
                      <div className="h-4 bg-slate-700 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-slate-700 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-slate-700 rounded w-20 animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-slate-700 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Category Filter Skeleton */}
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-10 bg-slate-700 rounded w-24 animate-pulse"></div>
                ))}
              </div>

              {/* Blog Posts Grid Skeleton */}
              <div className="grid gap-8 md:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="aspect-video bg-slate-700 animate-pulse"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-slate-700 rounded w-20 animate-pulse"></div>
                      <div className="h-6 bg-slate-700 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                      <div className="flex gap-4">
                        <div className="h-4 bg-slate-700 rounded w-16 animate-pulse"></div>
                        <div className="h-4 bg-slate-700 rounded w-16 animate-pulse"></div>
                        <div className="h-4 bg-slate-700 rounded w-16 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              {/* Newsletter Skeleton */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                <div className="h-6 bg-slate-700 rounded w-32 animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
                <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
              </div>

              {/* Popular Topics Skeleton */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                <div className="h-6 bg-slate-700 rounded w-32 animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <div className="w-5 h-5 bg-slate-700 rounded animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-700 rounded w-32 animate-pulse"></div>
                      <div className="h-3 bg-slate-700 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Posts Skeleton */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                <div className="h-6 bg-slate-700 rounded w-32 animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-slate-700 rounded w-24 animate-pulse"></div>
                    {i < 3 && <div className="border-t border-slate-700 pt-4"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
