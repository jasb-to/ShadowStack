import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { email_alerts, min_severity_for_email, webhook_alerts } = body

    const supabase = createServerClient()

    const { error } = await supabase.from("notification_preferences").upsert({
      user_id: userId,
      email_alerts,
      min_severity_for_email,
      webhook_alerts,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Notifications API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
