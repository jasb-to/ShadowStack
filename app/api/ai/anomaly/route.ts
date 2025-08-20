import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

const AI_THRESHOLD = Number.parseFloat(process.env.AI_THRESHOLD || "2.5")
const HF_TOKEN = process.env.HF_TOKEN

// Simple anomaly detection using transaction patterns
function detectAnomaly(transaction: any, recentTransactions: any[]) {
  if (recentTransactions.length < 3) return { score: 0, isAnomaly: false }

  const amounts = recentTransactions.map((tx) => Number.parseFloat(tx.amount || 0))
  const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length
  const txAmount = Number.parseFloat(transaction.amount || 0)

  // Calculate deviation from average
  const deviation = avgAmount > 0 ? Math.abs(txAmount - avgAmount) / avgAmount : 0
  const score = deviation * 10 // Simple scoring

  return {
    score: Math.round(score * 100) / 100,
    isAnomaly: score > AI_THRESHOLD,
  }
}

// Generate AI summary using Hugging Face
async function generateAISummary(transaction: any, anomalyScore: number) {
  if (!HF_TOKEN) {
    return `Anomaly detected: Transaction of ${transaction.amount} shows unusual patterns (score: ${anomalyScore})`
  }

  try {
    const prompt = `Analyze this crypto transaction anomaly:
Amount: ${transaction.amount}
Time: ${transaction.timestamp}
Anomaly Score: ${anomalyScore}
Type: ${transaction.type}

Provide a brief security alert summary in 50 words or less:`

    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 80,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`HF API error: ${response.status}`)
    }

    const result = await response.json()
    return (
      result[0]?.generated_text?.trim() ||
      `Anomaly detected: Transaction of ${transaction.amount} shows unusual patterns (score: ${anomalyScore})`
    )
  } catch (error) {
    console.error("AI summary generation failed:", error)
    return `Anomaly detected: Transaction of ${transaction.amount} shows unusual patterns (score: ${anomalyScore})`
  }
}

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, transaction, userId } = await request.json()

    if (!walletAddress || !transaction || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Check if user has AI enabled
    const { data: user } = await supabase.from("user_profiles").select("ai_enabled").eq("id", userId).single()

    if (!user?.ai_enabled) {
      return NextResponse.json({ error: "AI not enabled for user" }, { status: 403 })
    }

    // Get recent transactions for this wallet (mock data for demo)
    const recentTransactions = [
      { amount: "0.1", timestamp: new Date(Date.now() - 86400000).toISOString() },
      { amount: "0.05", timestamp: new Date(Date.now() - 172800000).toISOString() },
      { amount: "0.2", timestamp: new Date(Date.now() - 259200000).toISOString() },
      { amount: "0.15", timestamp: new Date(Date.now() - 345600000).toISOString() },
    ]

    // Detect anomaly
    const { score, isAnomaly } = detectAnomaly(transaction, recentTransactions)

    let summary = "Transaction appears normal based on recent patterns"
    if (isAnomaly) {
      summary = await generateAISummary(transaction, score)

      // Store AI alert in database
      await supabase.from("alerts").insert({
        user_id: userId,
        target_id: walletAddress,
        severity: score > 5 ? "critical" : score > 3 ? "high" : "medium",
        source_channel: "AI_ANOMALY",
        message_text: summary,
        is_read: false,
        is_blocked: false,
      })
    }

    return NextResponse.json({
      score,
      isAnomaly,
      summary,
      threshold: AI_THRESHOLD,
    })
  } catch (error) {
    console.error("Anomaly detection error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
