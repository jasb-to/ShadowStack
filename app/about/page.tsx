import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Users, Award, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About ShadowStack</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make advanced cybersecurity accessible to every organization, regardless of size or
              technical expertise.
            </p>
          </div>

          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ShadowStack was founded in 2023 by a team of cybersecurity experts who recognized a critical gap in
                  the market: while large enterprises had access to sophisticated security tools, smaller organizations
                  were left vulnerable.
                </p>
                <p>
                  Our founders had spent years working at major security firms and government agencies, witnessing
                  firsthand how the rapidly evolving threat landscape was outpacing the defensive capabilities of most
                  businesses.
                </p>
                <p>
                  We set out to build a solution that would democratize access to enterprise-grade security monitoring,
                  making it accessible, affordable, and easy to use for organizations of all sizes.
                </p>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg" />
              <Image src="/placeholder.svg?height=600&width=800" alt="ShadowStack team" fill className="object-cover" />
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Security First</h3>
                <p className="text-muted-foreground">
                  We never compromise on security. Every decision we make prioritizes the protection of our customers'
                  data and systems.
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe everyone deserves access to top-tier security tools, regardless of technical expertise or
                  budget constraints.
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in everything we do, from code quality to customer support and beyond.
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously push the boundaries of what's possible in cybersecurity, staying ahead of emerging
                  threats.
                </p>
              </div>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=Team${i}`}
                      alt={`Team member ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Jane Smith</h3>
                  <p className="text-primary">Chief Executive Officer</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Former Head of Security at TechCorp with 15+ years of experience in cybersecurity.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-muted/30 rounded-lg p-8 mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">ShadowStack by the Numbers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're proud of the impact we've made in the cybersecurity landscape since our founding.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">5M+</p>
                <p className="text-muted-foreground">Threats Detected</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">1,000+</p>
                <p className="text-muted-foreground">Customers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">99.9%</p>
                <p className="text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">24/7</p>
                <p className="text-muted-foreground">Monitoring</p>
              </div>
            </div>
          </div>

          {/* Careers */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who are passionate about cybersecurity and want to make a
              difference.
            </p>
            <a href="/careers" className="inline-flex items-center text-primary hover:underline">
              View open positions
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
