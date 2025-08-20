"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, User, Bell, Key, Webhook, Brain, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [aiEnabled, setAiEnabled] = useState(false)
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    company: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    critical: true,
    high: true,
    medium: false,
    low: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    loadUserSettings()
  }, [])

  const loadUserSettings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: userProfile } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (userProfile) {
        setProfile({
          email: userProfile.email || "",
          name: userProfile.name || "",
          company: userProfile.company || "",
        })
        setAiEnabled(userProfile.ai_enabled || false)
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase
        .from("users")
        .update({
          name: profile.name,
          company: profile.company,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAI = async (enabled: boolean) => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase
        .from("users")
        .update({
          ai_enabled: enabled,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      setAiEnabled(enabled)
      toast({
        title: enabled ? "AI enabled" : "AI disabled",
        description: enabled
          ? "AI anomaly detection is now active for your wallets."
          : "AI anomaly detection has been disabled.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update AI settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-slate-800">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="flex items-center gap-2">
                <Webhook className="w-4 h-4" />
                Webhooks
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Features
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-slate-300">
                    Update your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled
                        className="bg-slate-700 border-slate-600 text-slate-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Notification Preferences</CardTitle>
                  <CardDescription className="text-slate-300">
                    Configure how you receive security alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-slate-400">Receive alerts via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Alert Levels</h4>
                    {[
                      { key: "critical", label: "Critical", color: "bg-red-500" },
                      { key: "high", label: "High", color: "bg-orange-500" },
                      { key: "medium", label: "Medium", color: "bg-yellow-500" },
                      { key: "low", label: "Low", color: "bg-blue-500" },
                    ].map(({ key, label, color }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${color}`} />
                          <Label className="text-white">{label}</Label>
                        </div>
                        <Switch
                          checked={notifications[key as keyof typeof notifications] as boolean}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">API Keys</CardTitle>
                  <CardDescription className="text-slate-300">
                    Manage your API keys for programmatic access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Key className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400 mb-4">API key management coming soon</p>
                    <Button variant="outline" disabled className="border-slate-600 text-slate-400 bg-transparent">
                      Generate API Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Webhooks</CardTitle>
                  <CardDescription className="text-slate-300">
                    Configure webhook endpoints for real-time alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Webhook className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400 mb-4">Webhook configuration coming soon</p>
                    <Button variant="outline" disabled className="border-slate-600 text-slate-400 bg-transparent">
                      Add Webhook
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            AI Anomaly Detection
                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                              Free Beta
                            </Badge>
                          </CardTitle>
                          <CardDescription className="text-slate-300">
                            Advanced AI-powered transaction anomaly detection
                          </CardDescription>
                        </div>
                      </div>
                      <Switch checked={aiEnabled} onCheckedChange={handleToggleAI} disabled={loading} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        How AI Detection Works
                      </h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Analyzes your wallet's 7-day transaction patterns</li>
                        <li>• Detects unusual amounts and suspicious activity</li>
                        <li>• Generates intelligent security summaries</li>
                        <li>• Provides actionable recommendations</li>
                      </ul>
                    </div>

                    {aiEnabled ? (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-400 mb-2">
                          <Brain className="w-4 h-4" />
                          <span className="font-medium">AI Detection Active</span>
                        </div>
                        <p className="text-sm text-green-300">
                          Your wallets are now protected by AI-powered anomaly detection. You'll receive intelligent
                          alerts when suspicious transactions are detected.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                          <Brain className="w-4 h-4" />
                          <span className="font-medium">AI Detection Disabled</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          Enable AI anomaly detection to get intelligent alerts about suspicious wallet activity and
                          transaction patterns.
                        </p>
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">7-Day</div>
                        <div className="text-sm text-slate-400">Pattern Analysis</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">Real-time</div>
                        <div className="text-sm text-slate-400">Detection</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">Smart</div>
                        <div className="text-sm text-slate-400">Summaries</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">AI Settings</CardTitle>
                    <CardDescription className="text-slate-300">
                      Configure AI detection sensitivity and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400 mb-4">Advanced AI settings coming soon</p>
                      <p className="text-sm text-slate-500">
                        Customize detection thresholds, alert preferences, and AI model settings
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
