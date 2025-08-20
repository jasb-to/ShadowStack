import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, alertType } = await request.json()

    if (!walletAddress || !alertType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mark alerts as read
    const { error } = await supabase
      .from("alerts")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("target_id", walletAddress)
      .eq("source_channel", alertType)
      .eq("is_read", false)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error dismissing alert:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
