import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createServerClient()

    // Fetch user profile
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("full_name, company_name, subscription_tier, subscription_status")
      .eq("id", userId)
      .single()

    // Fetch notification preferences
    const { data: notifications } = await supabase
      .from("notification_preferences")
      .select("email_alerts, min_severity_for_email, webhook_alerts")
      .eq("user_id", userId)
      .single()

    // Fetch webhook integration
    const { data: webhook } = await supabase
      .from("user_integrations")
      .select("config")
      .eq("user_id", userId)
      .eq("integration_type", "webhook")
      .single()

    return NextResponse.json({
      profile: profile || {},
      notifications: notifications || {
        email_alerts: true,
        min_severity_for_email: "medium",
        webhook_alerts: false,
      },
      webhook: webhook || null,
    })
  } catch (error) {
    console.error("Settings API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
