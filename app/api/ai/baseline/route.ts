import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

// Simple baseline calculation using transaction patterns
function calculateBaseline(transactions: any[]) {
  if (transactions.length === 0) return null

  const amounts = transactions.map((tx) => Number.parseFloat(tx.amount || 0))
  const frequencies = transactions.reduce(
    (acc, tx) => {
      const hour = new Date(tx.timestamp).getHours()
      acc[hour] = (acc[hour] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  return {
    avgAmount: amounts.reduce((a, b) => a + b, 0) / amounts.length,
    maxAmount: Math.max(...amounts),
    minAmount: Math.min(...amounts),
    totalTxs: transactions.length,
    hourlyPattern: frequencies,
    timestamp: Date.now(),
  }
}

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, userId } = await request.json()

    if (!walletAddress || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Check if user has AI enabled
    const { data: user } = await supabase.from("user_profiles").select("ai_enabled").eq("id", userId).single()

    if (!user?.ai_enabled) {
      return NextResponse.json({ error: "AI not enabled for user" }, { status: 403 })
    }

    // Get wallet's transaction history (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    // Mock transaction data - in production, this would come from blockchain APIs
    const mockTransactions = [
      { amount: "0.1", timestamp: new Date(Date.now() - 1000000).toISOString(), type: "send" },
      { amount: "0.05", timestamp: new Date(Date.now() - 2000000).toISOString(), type: "receive" },
      { amount: "0.2", timestamp: new Date(Date.now() - 3000000).toISOString(), type: "send" },
    ]

    // Calculate baseline patterns
    const baseline = calculateBaseline(mockTransactions)

    if (!baseline) {
      return NextResponse.json({ error: "Insufficient transaction history" }, { status: 400 })
    }

    // Store baseline in Redis with 7-day expiry
    const cacheKey = `baseline:${walletAddress}`
    await redis.setex(cacheKey, 7 * 24 * 60 * 60, JSON.stringify(baseline))

    return NextResponse.json({
      success: true,
      baseline: {
        avgAmount: baseline.avgAmount,
        totalTxs: baseline.totalTxs,
        timestamp: baseline.timestamp,
      },
    })
  } catch (error) {
    console.error("Baseline calculation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const walletAddress = searchParams.get("wallet")

  if (!walletAddress) {
    return NextResponse.json({ error: "Wallet address required" }, { status: 400 })
  }

  try {
    const cacheKey = `baseline:${walletAddress}`
    const baseline = await redis.get(cacheKey)

    if (!baseline) {
      return NextResponse.json({ error: "No baseline found" }, { status: 404 })
    }

    return NextResponse.json({ baseline })
  } catch (error) {
    console.error("Baseline retrieval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
