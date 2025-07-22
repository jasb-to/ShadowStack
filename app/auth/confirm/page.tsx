"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConfirmPage() {
  const [loading, setLoading] = useState(true)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          setError(error.message)
          setLoading(false)
          return
        }

        if (data.session) {
          setConfirmed(true)
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setConfirmed(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 3000)
      }
    })

    handleEmailConfirmation()

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-10 w-10 text-blue-600 animate-pulse" />
            <span className="ml-3 text-3xl font-bold text-gray-900">ShadowStack</span>
          </div>
          <Card className="shadow-xl border-0">
            <CardContent className="flex flex-col items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Checking confirmation status...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-10 w-10 text-blue-600" />
            <span className="ml-3 text-3xl font-bold text-gray-900">ShadowStack</span>
          </div>
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-600">Email Confirmed!</CardTitle>
              <CardDescription className="text-gray-600">
                Your account has been successfully verified. Redirecting to dashboard...
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-10 w-10 text-blue-600" />
          <span className="ml-3 text-3xl font-bold text-gray-900">ShadowStack</span>
        </div>
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4">
              <Mail className="h-16 w-16 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription className="text-gray-600">
              We've sent you a confirmation link. Please check your email and click the link to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the email? Check your spam folder or try signing up again.
              </p>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => router.push("/sign-up")}>
                  Try Again
                </Button>
                <Link href="/sign-in">
                  <Button variant="ghost" className="w-full">
                    Already confirmed? Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
