import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck } from "lucide-react"

export default function AuthConfirmPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full">
              <MailCheck className="h-8 w-8" />
            </div>
            <CardTitle className="mt-4 text-2xl font-bold">Confirm your email</CardTitle>
            <CardDescription>
              We've sent a confirmation link to your email address. Please check your inbox (and spam folder) to
              complete the sign-up process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This page can be safely closed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
