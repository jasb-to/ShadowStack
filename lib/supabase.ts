import { createBrowserClient } from "@supabase/ssr"
import { createServerClient as createServerSupabaseClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

// Client-side Supabase client for use in Client Components
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

// Server-side Supabase client factory - must be called from Server Components/Actions/Route Handlers
export function createServerClient() {
  // This function will be called from server contexts where cookies() is available
  const { cookies } = require("next/headers")

  return createServerSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookies().set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}

// Legacy client component client (for backward compatibility)
export function createClientComponentClient() {
  return createClient()
}

// Default export for client components - safe to use anywhere
export const supabase = createClient()
