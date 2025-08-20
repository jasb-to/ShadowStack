import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

interface TransactionData {
  wallet_address: string
  amount: number
  timestamp: string
  transaction_hash: string
  blockchain: string
}

export async function POST(request: NextRequest) {
  try {
    const { wallet_address, amount, timestamp, transaction_hash, blockchain }: TransactionData = await request.json()

    // Check if user has AI enabled
    const { data: user } = await supabase
      .from("users")
      .select("ai_enabled")
      .eq("wallet_addresses", `%${wallet_address}%`)
      .single()

    if (!user?.ai_enabled) {
      return NextResponse.json({ ai_enabled: false })
    }

    // Get recent transactions for baseline (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { data: recentTransactions } = await supabase
      .from("ai_transaction_history")
      .select("amount")
      .eq("wallet_address", wallet_address)
      .gte("timestamp", sevenDaysAgo)
      .order("timestamp", { ascending: false })
      .limit(50)

    // Calculate baseline metrics
    const amounts = recentTransactions?.map((tx) => tx.amount) || []
    const avgAmount = amounts.length > 0 ? amounts.reduce((a, b) => a + b, 0) / amounts.length : 0
    const maxAmount = amounts.length > 0 ? Math.max(...amounts) : 0

    // Simple anomaly detection
    const threshold = Number.parseFloat(process.env.AI_THRESHOLD || "2.5")
    const isAnomaly = amount > avgAmount * threshold || amount > maxAmount * 1.5
    const anomalyScore = avgAmount > 0 ? amount / avgAmount : 1

    let aiSummary = ""
    let severity: "low" | "medium" | "high" | "critical" = "low"

    if (isAnomaly) {
      // Generate AI summary using Hugging Face
      try {
        const hfResponse = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `Analyze this cryptocurrency transaction anomaly:
              
Wallet: ${wallet_address.slice(0, 8)}...${wallet_address.slice(-8)}
Transaction Amount: ${amount} ${blockchain.toUpperCase()}
Average Amount (7 days): ${avgAmount.toFixed(4)} ${blockchain.toUpperCase()}
Anomaly Score: ${anomalyScore.toFixed(2)}x above normal

Generate a brief security alert summary (2-3 sentences) explaining why this transaction is suspicious and what actions should be taken. Focus on the unusual amount compared to normal patterns.`,
            parameters: {
              max_new_tokens: 150,
              temperature: 0.3,
              return_full_text: false,
            },
          }),
        })

        if (hfResponse.ok) {
          const hfData = await hfResponse.json()
          aiSummary =
            hfData[0]?.generated_text?.trim() ||
            "Unusual transaction pattern detected. Consider investigating this activity."
        } else {
          aiSummary = "Unusual transaction pattern detected. Consider investigating this activity."
        }
      } catch (error) {
        console.error("Hugging Face API error:", error)
        aiSummary = "Unusual transaction pattern detected. Consider investigating this activity."
      }

      // Determine severity based on anomaly score
      if (anomalyScore > 10) severity = "critical"
      else if (anomalyScore > 5) severity = "high"
      else if (anomalyScore > 2.5) severity = "medium"
      else severity = "low"

      // Store AI alert
      await supabase.from("ai_alerts").insert({
        wallet_address,
        transaction_hash,
        amount,
        anomaly_score: anomalyScore,
        severity,
        ai_summary: aiSummary,
        blockchain,
        timestamp,
      })
    }

    // Store transaction in history
    await supabase.from("ai_transaction_history").insert({
      wallet_address,
      transaction_hash,
      amount,
      blockchain,
      timestamp,
    })

    return NextResponse.json({
      ai_enabled: true,
      is_anomaly: isAnomaly,
      anomaly_score: anomalyScore,
      severity,
      ai_summary: aiSummary,
      baseline_avg: avgAmount,
    })
  } catch (error) {
    console.error("AI anomaly detection error:", error)
    return NextResponse.json({ error: "Failed to process anomaly detection" }, { status: 500 })
  }
}
