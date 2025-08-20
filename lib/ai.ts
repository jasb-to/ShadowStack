export interface AiAlert {
  id: string
  wallet_address: string
  transaction_hash: string
  amount: number
  anomaly_score: number
  severity: "low" | "medium" | "high" | "critical"
  ai_summary: string
  blockchain: string
  timestamp: string
  dismissed: boolean
  created_at: string
}

export interface AnomalyResult {
  ai_enabled: boolean
  is_anomaly?: boolean
  anomaly_score?: number
  severity?: "low" | "medium" | "high" | "critical"
  ai_summary?: string
  baseline_avg?: number
}

export async function checkTransactionAnomaly(
  walletAddress: string,
  amount: number,
  transactionHash: string,
  blockchain: string,
): Promise<AnomalyResult> {
  try {
    const response = await fetch("/api/ai/anomaly", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet_address: walletAddress,
        amount,
        transaction_hash: transactionHash,
        blockchain,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to check anomaly")
    }

    return await response.json()
  } catch (error) {
    console.error("Error checking transaction anomaly:", error)
    return { ai_enabled: false }
  }
}

export async function dismissAiAlert(alertId: string): Promise<boolean> {
  try {
    const response = await fetch("/api/alerts/dismiss", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alert_id: alertId, type: "ai" }),
    })

    return response.ok
  } catch (error) {
    console.error("Error dismissing AI alert:", error)
    return false
  }
}

export function formatAnomalyScore(score: number): string {
  return `${score.toFixed(1)}x above normal`
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "critical":
      return "text-red-600 bg-red-50 border-red-200"
    case "high":
      return "text-orange-600 bg-orange-50 border-orange-200"
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "low":
      return "text-blue-600 bg-blue-50 border-blue-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export function getSeverityIcon(severity: string): string {
  switch (severity) {
    case "critical":
      return "🚨"
    case "high":
      return "⚠️"
    case "medium":
      return "⚡"
    case "low":
      return "ℹ️"
    default:
      return "📊"
  }
}
