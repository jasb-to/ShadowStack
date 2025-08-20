// Shared AI utility functions and types

export interface AnomalyResult {
  score: number
  isAnomaly: boolean
  summary: string
  threshold?: number
}

export interface Transaction {
  amount: string
  timestamp: string
  type: "send" | "receive"
  hash?: string
  from?: string
  to?: string
}

// Fetch anomaly detection for a transaction
export async function checkAnomaly(
  walletAddress: string,
  transaction: Transaction,
  userId: string,
): Promise<AnomalyResult> {
  try {
    const response = await fetch("/api/ai/anomaly", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress,
        transaction,
        userId,
      }),
    })

    if (!response.ok) {
      throw new Error("Anomaly check failed")
    }

    return await response.json()
  } catch (error) {
    console.error("AI anomaly check error:", error)
    return {
      score: 0,
      isAnomaly: false,
      summary: "AI check unavailable",
    }
  }
}

// Format anomaly score for display
export function formatAnomalyScore(score: number): string {
  if (score < 1) return "Very Low"
  if (score < 2) return "Low"
  if (score < 3) return "Medium"
  if (score < 5) return "High"
  return "Critical"
}

// Get severity color for anomaly score
export function getAnomalyColor(score: number): string {
  if (score < 1) return "text-green-400"
  if (score < 2) return "text-yellow-400"
  if (score < 3) return "text-orange-400"
  if (score < 5) return "text-red-400"
  return "text-red-600"
}
