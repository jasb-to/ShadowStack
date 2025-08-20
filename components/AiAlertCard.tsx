"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, AlertTriangle, X, CheckCircle } from "lucide-react"
import { formatAnomalyScore, getAnomalyColor, type AnomalyResult } from "@/lib/ai"
import { toast } from "@/hooks/use-toast"

interface AiAlertCardProps {
  anomaly: AnomalyResult & {
    walletAddress: string
    transaction: {
      amount: string
      timestamp: string
      type: "send" | "receive"
      hash?: string
    }
  }
  onDismiss?: () => void
}

export function AiAlertCard({ anomaly, onDismiss }: AiAlertCardProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const handleDismiss = async () => {
    setIsProcessing(true)
    try {
      // Mark alert as read in database
      await fetch("/api/alerts/dismiss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: anomaly.walletAddress,
          alertType: "AI_ANOMALY",
        }),
      })

      setIsDismissed(true)
      onDismiss?.()

      toast({
        title: "Alert Dismissed",
        description: "AI anomaly alert has been marked as resolved",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to dismiss alert",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const severityColor = getAnomalyColor(anomaly.score)
  const severityText = formatAnomalyScore(anomaly.score)

  return (
    <Card className="border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-red-500/5 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-lg text-white">AI Anomaly Detected</CardTitle>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Free Beta
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            disabled={isProcessing}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-slate-300">
          Unusual transaction pattern detected for wallet {anomaly.walletAddress.slice(0, 8)}...
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Alert className="border-orange-500/30 bg-orange-500/10">
          <AlertTriangle className="h-4 w-4 text-orange-400" />
          <AlertDescription className="text-orange-200">{anomaly.summary}</AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-slate-400">Transaction Amount</p>
            <p className="text-white font-mono">{anomaly.transaction.amount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400">Anomaly Score</p>
            <p className={`font-bold ${severityColor}`}>
              {anomaly.score} ({severityText})
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400">Transaction Type</p>
            <p className="text-white capitalize">{anomaly.transaction.type}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400">Detected At</p>
            <p className="text-white">{new Date(anomaly.transaction.timestamp).toLocaleTimeString()}</p>
          </div>
        </div>

        {anomaly.transaction.hash && (
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Transaction Hash</p>
            <p className="text-white font-mono text-xs break-all bg-slate-800 p-2 rounded">
              {anomaly.transaction.hash}
            </p>
          </div>
        )}

        <Button onClick={handleDismiss} disabled={isProcessing} size="sm" className="w-full">
          <CheckCircle className="h-4 w-4 mr-2" />
          {isProcessing ? "Processing..." : "Mark as Safe"}
        </Button>

        <div className="text-xs text-slate-500 pt-2 border-t border-slate-700">
          AI analysis powered by Hugging Face. Threshold: {anomaly.threshold || 2.5}
        </div>
      </CardContent>
    </Card>
  )
}
