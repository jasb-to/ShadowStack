import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { url, is_active } = body

    const supabase = createServerClient()

    if (url) {
      const { error } = await supabase.from("user_integrations").upsert({
        user_id: userId,
        integration_type: "webhook",
        config: { url },
        is_active,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        throw error
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
