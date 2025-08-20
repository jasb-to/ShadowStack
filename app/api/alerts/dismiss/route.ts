import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { alert_id, type } = await request.json()

    if (!alert_id || !type) {
      return NextResponse.json({ error: "Missing alert_id or type" }, { status: 400 })
    }

    if (type === "ai") {
      // Dismiss AI alert
      const { error } = await supabase
        .from("ai_alerts")
        .update({
          dismissed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", alert_id)

      if (error) {
        console.error("Error dismissing AI alert:", error)
        return NextResponse.json({ error: "Failed to dismiss alert" }, { status: 500 })
      }
    } else {
      // Handle regular alerts (if needed)
      const { error } = await supabase
        .from("alerts")
        .update({
          dismissed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", alert_id)

      if (error) {
        console.error("Error dismissing alert:", error)
        return NextResponse.json({ error: "Failed to dismiss alert" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in dismiss alert API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
