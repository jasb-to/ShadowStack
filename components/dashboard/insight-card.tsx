"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface InsightCardProps {
  insights: string
}

export function InsightCard({ insights }: InsightCardProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [insights])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-glow border-purple-500/20 h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>AI Threat Insights</CardTitle>
            <div className="bg-purple-500/10 text-purple-500 p-2 rounded-full">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <CardDescription>AI-powered analysis of your security landscape</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          ) : (
            <div className="text-sm space-y-4 leading-relaxed">
              {insights.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
