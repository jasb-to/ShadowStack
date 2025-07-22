import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Bot } from "lucide-react"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Next-Gen Cybersecurity for Modern Teams
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ShadowStack provides real-time threat detection and AI-powered monitoring to protect your digital
                    assets. Zero-config protection for APIs, SaaS tools, and developer endpoints.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="w-full min-[400px]:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto bg-transparent">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=550"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted-foreground/10 px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Comprehensive Protection, Simplified
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features designed to give you peace of mind and full visibility into your
                  security posture.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <Card>
                <CardHeader className="grid grid-cols-[auto_1fr] items-start gap-4 space-y-0">
                  <div className="space-y-1">
                    <CardTitle>Real-Time Monitoring</CardTitle>
                  </div>
                  <div className="flex items-center justify-center rounded-full bg-primary/10 p-2">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Continuously scan public data sources and developer channels for mentions of your sensitive assets
                    like API keys, wallets, and domains.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="grid grid-cols-[auto_1fr] items-start gap-4 space-y-0">
                  <div className="space-y-1">
                    <CardTitle>AI-Powered Alerts</CardTitle>
                  </div>
                  <div className="flex items-center justify-center rounded-full bg-primary/10 p-2">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our AI engine analyzes potential threats, reduces false positives, and delivers high-fidelity alerts
                    directly to your team.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="grid grid-cols-[auto_1fr] items-start gap-4 space-y-0">
                  <div className="space-y-1">
                    <CardTitle>Zero-Config Protection</CardTitle>
                  </div>
                  <div className="flex items-center justify-center rounded-full bg-primary/10 p-2">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Easy setup with no complex configurations. Start protecting your assets in minutes with our
                    intuitive dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Secure Your Digital Footprint?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the growing number of businesses trusting ShadowStack for their cybersecurity needs.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                >
                  Start Free Trial
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">Sign up and get started. No credit card required.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
