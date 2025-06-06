import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

export default function CareersPage() {
  const jobOpenings = [
    {
      title: "Senior Security Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "We're looking for a Senior Security Engineer to help build and maintain our core security monitoring infrastructure.",
      requirements: [
        "5+ years of experience in security engineering",
        "Strong knowledge of cloud security principles",
        "Experience with threat detection and incident response",
        "Proficiency in at least one programming language (Python, Go, or JavaScript preferred)",
      ],
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Join our frontend team to build intuitive and responsive user interfaces for our security dashboard.",
      requirements: [
        "3+ years of experience with React and TypeScript",
        "Experience with Next.js and modern frontend tooling",
        "Strong understanding of UI/UX principles",
        "Knowledge of data visualization libraries",
      ],
    },
    {
      title: "Security Analyst",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time",
      description: "Help our customers understand and respond to security threats detected by our platform.",
      requirements: [
        "2+ years of experience in security operations or incident response",
        "Knowledge of common attack vectors and mitigation strategies",
        "Strong communication skills",
        "Experience with SIEM tools and security frameworks",
      ],
    },
    {
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive the go-to-market strategy for our security products and features.",
      requirements: [
        "3+ years of experience in product marketing, preferably in B2B SaaS",
        "Understanding of cybersecurity concepts and market trends",
        "Excellent writing and presentation skills",
        "Experience with competitive analysis and positioning",
      ],
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description:
        "Ensure our customers get maximum value from our platform and help them achieve their security goals.",
      requirements: [
        "2+ years of experience in customer success or account management",
        "Strong interpersonal and communication skills",
        "Problem-solving mindset",
        "Experience with cybersecurity tools is a plus",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us build the future of cybersecurity. We're looking for passionate individuals who want to make a
              difference.
            </p>
          </div>

          {/* Why Join Us */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Work at ShadowStack</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Meaningful Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Work on technology that protects thousands of organizations from cyber threats. Your work directly
                    contributes to making the internet safer.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth & Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We invest in your professional development with a dedicated learning budget, regular workshops, and
                    opportunities to attend industry conferences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work-Life Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Flexible working hours, generous PTO, and a culture that respects your time outside of work. We
                    believe in sustainable productivity.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Competitive Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive health insurance, 401(k) matching, equity options, and more to ensure you and your
                    family are well taken care of.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Remote-First Culture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Work from anywhere with our distributed team. We have team members across multiple time zones and
                    countries.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cutting-Edge Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Work with the latest tools and technologies. We embrace innovation and are always looking for better
                    ways to solve problems.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription className="mt-1">{job.department}</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href={`/careers/apply?position=${encodeURIComponent(job.title)}`}>Apply Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* No Open Positions */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Don't see a position that fits?</h3>
            <p className="text-muted-foreground mb-6">
              We're always interested in hearing from talented individuals. Send us your resume and we'll keep you in
              mind for future opportunities.
            </p>
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
