"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"
import type { CustomerSubscription } from "@/lib/stripe"

interface ScanUsageCardProps {
  subscription: CustomerSubscription
  currentScans: number
}

export function ScanUsageCard({ subscription, currentScans }: ScanUsageCardProps) {
  const maxScans = subscription?.tierDetails?.maxLimit || 0
  const usagePercentage =
    maxScans === Number.POSITIVE_INFINITY ? 0 : Math.min(Math.round((currentScans / maxScans) * 100), 100)

  const getUsageColor = () => {
    if (usagePercentage < 60) return "bg-green-500"
    if (usagePercentage < 85) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="shadow-glow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Scan Usage</CardTitle>
            <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full">
              <BarChart3 className="h-4 w-4" />
            </div>
          </div>
          <CardDescription>
            {subscription.tier === "enterprise"
              ? "Unlimited scans available"
              : `${currentScans} of ${maxScans} scans used`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscription.tier === "enterprise" ? (
            <div className="text-sm text-muted-foreground">
              Enterprise tier includes unlimited scanning capabilities
            </div>
          ) : (
            <>
              <Progress value={usagePercentage} className={`h-2 ${getUsageColor()}`} />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{usagePercentage}% used</span>
                <span>Resets {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
