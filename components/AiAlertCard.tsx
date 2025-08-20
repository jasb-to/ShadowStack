"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Pause, ExternalLink, Brain } from "lucide-react"
import { type AiAlert, dismissAiAlert, getSeverityColor, getSeverityIcon, formatAnomalyScore } from "@/lib/ai"
import { useToast } from "@/hooks/use-toast"

interface AiAlertCardProps {
  alert: AiAlert
  onDismiss?: (alertId: string) => void
  onPause?: (walletAddress: string) => void
}

export function AiAlertCard({ alert, onDismiss, onPause }: AiAlertCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDismiss = async () => {
    setIsLoading(true)
    try {
      const success = await dismissAiAlert(alert.id)
      if (success) {
        onDismiss?.(alert.id)
        toast({
          title: "Alert dismissed",
          description: "AI alert has been marked as resolved.",
        })
      } else {
        throw new Error("Failed to dismiss alert")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to dismiss alert. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePauseWallet = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/targets/pause", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: alert.wallet_address }),
      })

      if (response.ok) {
        onPause?.(alert.wallet_address)
        toast({
          title: "Wallet paused",
          description: "Monitoring has been paused for this wallet.",
        })
      } else {
        throw new Error("Failed to pause wallet")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to pause wallet monitoring. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const severityColorClass = getSeverityColor(alert.severity)
  const severityIcon = getSeverityIcon(alert.severity)

  return (
    <Card className={`border-l-4 ${severityColorClass} shadow-lg hover:shadow-xl transition-shadow duration-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              AI Alert
            </Badge>
            <Badge variant="outline" className={severityColorClass}>
              {severityIcon} {alert.severity.toUpperCase()}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            disabled={isLoading}
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardTitle className="text-lg">Anomalous Transaction Detected</CardTitle>
        <CardDescription className="text-sm">
          Wallet: {alert.wallet_address.slice(0, 8)}...{alert.wallet_address.slice(-8)} •{" "}
          {alert.blockchain.toUpperCase()} • {formatAnomalyScore(alert.anomaly_score)}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-600" />
            AI Analysis
          </h4>
          <p className="text-slate-700 text-sm leading-relaxed">{alert.ai_summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-slate-600">Amount:</span>
            <p className="text-slate-900">
              {alert.amount} {alert.blockchain.toUpperCase()}
            </p>
          </div>
          <div>
            <span className="font-medium text-slate-600">Anomaly Score:</span>
            <p className="text-slate-900">{formatAnomalyScore(alert.anomaly_score)}</p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDismiss}
            disabled={isLoading}
            className="flex-1 bg-transparent"
          >
            <X className="w-4 h-4 mr-1" />
            Dismiss
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePauseWallet}
            disabled={isLoading}
            className="flex-1 bg-transparent"
          >
            <Pause className="w-4 h-4 mr-1" />
            Pause Wallet
          </Button>
          <Button variant="outline" size="sm" asChild className="px-3 bg-transparent">
            <a href={`https://etherscan.io/tx/${alert.transaction_hash}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
