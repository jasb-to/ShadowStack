import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Pause monitoring for the wallet
    const { error } = await supabase
      .from("monitoring_targets")
      .update({ is_active: false })
      .eq("target_value", walletAddress)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Wallet pause error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
