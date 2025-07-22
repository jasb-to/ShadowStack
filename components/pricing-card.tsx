"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

interface TierDetails {
  name: string
  priceId?: string
  price: number
  currency: string
  features: string[]
  maxLimit: number
}

type SubscriptionTier = "basic" | "pro" | "enterprise" | "none"

interface CustomerSubscription {
  id: string
  tier: SubscriptionTier
  tierDetails: TierDetails
  status: string
  currentPeriodEnd: number
}

interface PricingCardProps {
  tier: SubscriptionTier
  tierDetails: TierDetails
  isCurrentTier?: boolean
  subscription: CustomerSubscription | null
  isYearly?: boolean
}

export function PricingCard({
  tier,
  tierDetails,
  isCurrentTier = false,
  subscription,
  isYearly = false,
}: PricingCardProps) {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscription = async () => {
    setIsLoading(true)

    try {
      if (!isSignedIn) {
        // Redirect to sign-up if not signed in
        router.push("/sign-up")
        return
      }

      if (isCurrentTier) {
        // If it's the current tier, go to dashboard
        router.push("/dashboard")
        return
      }

      // For now, redirect to dashboard with a success message
      // In production, this would integrate with Stripe
      router.push("/dashboard?upgraded=true")
    } catch (error) {
      console.error("Error handling subscription:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Apply 20% discount for yearly subscriptions
  const displayPrice = isYearly ? (tierDetails.price * 0.8 * 12).toFixed(2) : tierDetails.price.toFixed(2)

  const tierColorClasses = {
    basic: "border-green-500/20 hover:border-green-500/40",
    pro: "border-blue-500/20 hover:border-blue-500/40 ring-2 ring-blue-500/20",
    enterprise: "border-purple-500/20 hover:border-purple-500/40",
    none: "",
  }

  const tierBgClasses = {
    basic: "bg-green-500/10 text-green-500",
    pro: "bg-blue-500/10 text-blue-500",
    enterprise: "bg-purple-500/10 text-purple-500",
    none: "bg-gray-500/10 text-gray-500",
  }

  const buttonVariant = tier === "pro" ? "default" : "outline"

  return (
    <div
      className={`rounded-xl border bg-card shadow-lg transition-all hover:shadow-xl ${tierColorClasses[tier]} relative`}
    >
      {tier === "pro" && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
        </div>
      )}

      <div className="flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{tierDetails.name}</h3>
          <div className={`px-3 py-1 text-xs rounded-full ${tierBgClasses[tier]}`}>
            {tier === "basic" ? "Starter" : tier === "pro" ? "Popular" : "Premium"}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-end">
            <span className="text-3xl font-bold">
              {tierDetails.currency}
              {displayPrice}
            </span>
            <span className="text-muted-foreground ml-1">{isYearly ? "/year" : "/month"}</span>
          </div>
          {isYearly && <p className="text-xs text-muted-foreground mt-1">20% discount applied</p>}
        </div>

        <ul className="mb-6 space-y-2 flex-grow">
          {tierDetails.features.map((feature) => (
            <li key={feature} className="flex items-center text-sm">
              <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            className="w-full"
            onClick={handleSubscription}
            disabled={isLoading}
            variant={isCurrentTier ? "outline" : buttonVariant}
          >
            {isLoading ? "Loading..." : isCurrentTier ? "Current Plan" : !isSignedIn ? "Get Started" : "Upgrade Now"}
          </Button>
        </div>
      </div>
    </div>
  )
}
