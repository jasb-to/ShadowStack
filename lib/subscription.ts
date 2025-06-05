import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import { TIER_PRODUCTS, type SubscriptionTier } from "@/lib/stripe"
import type { CustomerSubscription } from "@/lib/stripe"

export async function getUserSubscription(): Promise<CustomerSubscription | null> {
  const { userId } = auth()

  if (!userId) {
    redirect("/login")
  }

  try {
    // Get user from our database
    const { data: user } = await supabaseAdmin.from("users").select("*").eq("clerk_id", userId).single()

    if (!user) {
      return {
        id: "",
        tier: "none",
        tierDetails: {
          name: "No Subscription",
          price: 0,
          currency: "£",
          features: [],
          maxLimit: 0,
        },
        status: "inactive",
        currentPeriodEnd: 0,
      }
    }

    // Get subscription from our database
    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing"])
      .order("created", { ascending: false })
      .limit(1)
      .single()

    if (!subscription) {
      return {
        id: "",
        tier: "none",
        tierDetails: {
          name: "No Subscription",
          price: 0,
          currency: "£",
          features: [],
          maxLimit: 0,
        },
        status: "inactive",
        currentPeriodEnd: 0,
      }
    }

    // Determine tier based on price_id
    let tier: SubscriptionTier = "none"

    if (subscription.price_id === process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID) {
      tier = "basic"
    } else if (subscription.price_id === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) {
      tier = "pro"
    } else if (subscription.price_id === process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID) {
      tier = "enterprise"
    }

    return {
      id: subscription.id,
      tier,
      tierDetails: TIER_PRODUCTS[tier] || TIER_PRODUCTS.basic,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end).getTime(),
    }
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return null
  }
}

export function checkSubscription(
  subscription: CustomerSubscription | null,
  minimumTier: SubscriptionTier = "basic",
): boolean {
  if (!subscription) return false

  // If they have an active subscription
  if (subscription.status === "active" || subscription.status === "trialing") {
    // If the minimum tier is "basic", any subscription is fine
    if (minimumTier === "basic") return true

    // For higher tiers, check tier level
    const tierLevels: Record<SubscriptionTier, number> = {
      none: 0,
      basic: 1,
      pro: 2,
      enterprise: 3,
    }

    return tierLevels[subscription.tier] >= tierLevels[minimumTier]
  }

  return false
}
