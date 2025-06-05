"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import type { CustomerSubscription } from "@/lib/stripe"

interface SubscriptionCardProps {
  subscription: CustomerSubscription
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const tierColors = {
    basic: "text-tier-basic bg-[hsl(var(--tier-basic),0.1)]",
    pro: "text-tier-pro bg-[hsl(var(--tier-pro),0.1)]",
    enterprise: "text-tier-enterprise bg-[hsl(var(--tier-enterprise),0.1)]",
    none: "text-gray-500 bg-gray-100/10",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="shadow-glow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <div className="bg-foreground/10 text-foreground p-2 rounded-full">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <CardDescription>
            {subscription.tier === "none" ? "No active subscription" : `${subscription.tierDetails.name} Plan`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className={`px-3 py-1 rounded-full text-xs ${tierColors[subscription.tier]}`}>
              {subscription.tier === "none"
                ? "No Plan"
                : `${subscription.tierDetails.name} - ${subscription.tierDetails.currency}${subscription.tierDetails.price}/mo`}
            </div>
            {subscription.tier !== "none" && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </div>
            )}
          </div>

          <Button size="sm" className="w-full" asChild>
            <Link href="/pricing">{subscription.tier === "none" ? "Choose a Plan" : "Manage Subscription"}</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
