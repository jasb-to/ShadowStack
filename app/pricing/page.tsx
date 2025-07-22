"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check } from "lucide-react"
import { Footer } from "@/components/footer"

const pricingTiers = [
  {
    name: "Starter",
    priceMonthly: "£15",
    priceYearly: "£12",
    description: "For individuals and small teams getting started with basic monitoring.",
    features: ["Monitor 10 assets", "Email alerts", "Basic analytics", "Community support"],
    variant: "outline",
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    priceMonthly: "£45",
    priceYearly: "£36",
    description: "For growing businesses that need advanced features and more capacity.",
    features: ["Monitor 50 assets", "SMS & Email alerts", "Advanced analytics", "Priority support", "API Access"],
    variant: "default",
    cta: "Request Early Access",
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    description: "For large organizations with specific needs and compliance requirements.",
    features: [
      "Unlimited assets",
      "Dedicated support",
      "Custom integrations",
      "On-premise option",
      "Security audit logs",
    ],
    variant: "outline",
    cta: "Contact Sales",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing Plans</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Choose the right plan for your business. Simple, transparent pricing.
              </p>
              <div className="flex items-center space-x-2">
                <span>Monthly</span>
                <Switch checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle billing period" />
                <span>Yearly (Save 20%)</span>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={tier.variant === "default" ? "border-primary shadow-lg" : ""}>
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="flex items-baseline gap-1 pt-4">
                      <span className="text-4xl font-bold">{isYearly ? tier.priceYearly : tier.priceMonthly}</span>
                      {tier.name !== "Enterprise" && <span className="text-sm text-muted-foreground">/month</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={tier.variant as "default" | "outline"}
                      className={
                        tier.variant === "default"
                          ? "w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                          : "w-full"
                      }
                    >
                      {tier.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
