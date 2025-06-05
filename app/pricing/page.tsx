"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { PricingCard } from "@/components/pricing-card"
import { TIER_PRODUCTS } from "@/lib/stripe"
import { getUserSubscription } from "@/lib/subscription"
import type { CustomerSubscription } from "@/lib/stripe"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [subscription, setSubscription] = useState<CustomerSubscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const sub = await getUserSubscription()
        setSubscription(sub)
      } catch (error) {
        console.error("Error fetching subscription:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Transparent Pricing for Every Team</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your security needs. Cancel anytime.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="max-w-xs mx-auto mb-10 p-1 bg-muted rounded-lg flex">
            <Button
              variant={isYearly ? "ghost" : "default"}
              className="flex-1 rounded-md"
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </Button>
            <Button
              variant={isYearly ? "default" : "ghost"}
              className="flex-1 rounded-md"
              onClick={() => setIsYearly(true)}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">-20%</span>
            </Button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              tier="basic"
              tierDetails={TIER_PRODUCTS.basic}
              isCurrentTier={subscription?.tier === "basic"}
              subscription={subscription}
              isYearly={isYearly}
            />
            <PricingCard
              tier="pro"
              tierDetails={TIER_PRODUCTS.pro}
              isCurrentTier={subscription?.tier === "pro"}
              subscription={subscription}
              isYearly={isYearly}
            />
            <PricingCard
              tier="enterprise"
              tierDetails={TIER_PRODUCTS.enterprise}
              isCurrentTier={subscription?.tier === "enterprise"}
              subscription={subscription}
              isYearly={isYearly}
            />
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What happens if I exceed my scan limit?</h3>
                <p className="text-muted-foreground">
                  We'll notify you when you're approaching your limit. You can upgrade your plan or additional scans
                  will be queued until your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll
                  prorate the billing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all new subscriptions. No questions asked.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We use enterprise-grade encryption and follow SOC 2 compliance standards to protect your
                  data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
