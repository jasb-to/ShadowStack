import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Flexible Pricing for Teams of All Sizes
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for you. Get started for free, then upgrade as you grow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <PricingCard
                title="Basic"
                price="$19"
                description="For individuals and small teams getting started."
                features={["5 Monitored Targets", "Real-time Alerts", "Email Notifications", "Community Support"]}
                ctaText="Start Free Trial"
                ctaLink="/sign-up"
              />
              <PricingCard
                title="Pro"
                price="$79"
                isPopular={true}
                description="For growing businesses that need more power and flexibility."
                features={[
                  "50 Monitored Targets",
                  "API & Webhook Integrations",
                  "Advanced Analytics",
                  "Priority Support",
                ]}
                ctaText="Get Started"
                ctaLink="/sign-up"
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                description="For large organizations with custom needs."
                features={[
                  "Unlimited Targets",
                  "SAML/SSO Integration",
                  "Dedicated Account Manager",
                  "24/7/365 Support",
                ]}
                ctaText="Contact Sales"
                ctaLink="/contact"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function PricingCard({
  title,
  price,
  description,
  features,
  ctaText,
  ctaLink,
  isPopular = false,
}: {
  title: string
  price: string
  description: string
  features: string[]
  ctaText: string
  ctaLink: string
  isPopular?: boolean
}) {
  return (
    <Card className={isPopular ? "border-primary" : ""}>
      {isPopular && (
        <div className="bg-primary text-primary-foreground text-center text-sm font-semibold py-1 rounded-t-lg">
          Most Popular
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground">/month</span>}
        </div>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
