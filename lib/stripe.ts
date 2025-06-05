import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
})

export const TIER_PRODUCTS = {
  basic: {
    name: "Starter",
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
    price: 9.99,
    currency: "£",
    features: [
      "500 monthly threat scans",
      "Basic dashboard access",
      "Delayed alerts (30 min)",
      "Email support",
      "7-day data retention",
    ],
    maxLimit: 500,
  },
  pro: {
    name: "Growth",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    price: 29.99,
    currency: "£",
    features: [
      "5,000 scans/month",
      "Real-time alerts",
      "AI threat summaries",
      "Webhook integration",
      "Priority email support",
      "30-day data retention",
    ],
    maxLimit: 5000,
  },
  enterprise: {
    name: "Mission Control",
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
    price: 99.99,
    currency: "£",
    features: [
      "Unlimited scans",
      "Priority AI insights",
      "Team seats (up to 5)",
      "Custom integrations",
      "Dedicated account manager",
      "90-day data retention",
      "Custom API rate limits",
    ],
    maxLimit: Number.POSITIVE_INFINITY,
  },
}

export type SubscriptionTier = "basic" | "pro" | "enterprise" | "none"

export interface TierDetails {
  name: string
  priceId?: string
  price: number
  currency: string
  features: string[]
  maxLimit: number
}

export interface CustomerSubscription {
  id: string
  tier: SubscriptionTier
  tierDetails: TierDetails
  status: string
  currentPeriodEnd: number
}
