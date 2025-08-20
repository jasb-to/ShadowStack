import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShadowStack - Crypto Security Monitoring",
  description:
    "Advanced threat detection and monitoring for cryptocurrency exchanges and hot wallets. Real-time security alerts and AI-powered anomaly detection.",
  keywords: "crypto security, wallet monitoring, threat detection, blockchain security, cryptocurrency protection",
  authors: [{ name: "ShadowStack Team" }],
  creator: "ShadowStack",
  publisher: "ShadowStack",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shadowstack.com",
    title: "ShadowStack - Crypto Security Monitoring",
    description: "Advanced threat detection and monitoring for cryptocurrency exchanges and hot wallets.",
    siteName: "ShadowStack",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShadowStack - Crypto Security Monitoring",
    description: "Advanced threat detection and monitoring for cryptocurrency exchanges and hot wallets.",
    creator: "@shadowstack",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <AuthProvider>
              {children}
              <Toaster />
              <Analytics />
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
