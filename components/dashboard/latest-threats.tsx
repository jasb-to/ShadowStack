"use client"

import { useEffect, useState } from "react"
import { ThreatCard } from "@/components/threat-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import type { Threat } from "@/types/supabase"

interface ThreatFeed {
  threats: Threat[]
  timestamp: string
  totalThreats: number
  blockedThreats: number
}

export function LatestThreats() {
  const [data, setData] = useState<ThreatFeed | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchThreats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/threats")
      const newData = await response.json()
      setData(newData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch threats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThreats()

    // Auto refresh every 30 seconds
    const interval = setInterval(fetchThreats, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Latest Threats</h2>
          <p className="text-sm text-muted-foreground">Real-time monitoring feed</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</div>
          <Button variant="outline" size="sm" onClick={fetchThreats} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-5 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {data?.threats.map((threat, i) => (
            <ThreatCard key={threat.id} threat={threat} index={i} />
          ))}
        </motion.div>
      )}
    </section>
  )
}
