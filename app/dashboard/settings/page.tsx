"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Mail, Bell, Shield, User, Webhook } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    email_alerts: true,
    slack_notifications: false,
    discord_notifications: false,
    webhook_url: "",
    ai_enabled: false, // New AI setting
  })

  const supabase = createClientComponentClient()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("user_profiles")
        .select("email_alerts, slack_notifications, discord_notifications, webhook_url, ai_enabled")
        .eq("id", user.id)
        .single()

      if (data) {
        setSettings(data)
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    }
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("user_profiles").update(settings).eq("id", user.id)

      if (error) throw error

      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and notifications</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Features
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>Configure how you receive alerts via email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Alerts</Label>
                  <p className="text-sm text-slate-400">Receive breach alerts via email</p>
                </div>
                <Switch
                  checked={settings.email_alerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, email_alerts: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Integrations
              </CardTitle>
              <CardDescription>Connect with external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Slack Notifications</Label>
                  <p className="text-sm text-slate-400">Send alerts to Slack channels</p>
                </div>
                <Switch
                  checked={settings.slack_notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, slack_notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Discord Notifications</Label>
                  <p className="text-sm text-slate-400">Send alerts to Discord channels</p>
                </div>
                <Switch
                  checked={settings.discord_notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, discord_notifications: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook" className="text-white">
                  Custom Webhook URL
                </Label>
                <Input
                  id="webhook"
                  placeholder="https://your-webhook-url.com/alerts"
                  value={settings.webhook_url}
                  onChange={(e) => setSettings({ ...settings, webhook_url: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                />
                <p className="text-sm text-slate-400">Optional: Send alerts to your custom endpoint</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Anomaly Detection
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Free Beta
                </Badge>
              </CardTitle>
              <CardDescription>Advanced AI-powered anomaly detection for your wallet transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Enable AI Anomaly Detection</Label>
                  <p className="text-sm text-slate-400">Use machine learning to detect unusual transaction patterns</p>
                </div>
                <Switch
                  checked={settings.ai_enabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, ai_enabled: checked })}
                />
              </div>

              {settings.ai_enabled && (
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 space-y-3">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-400" />
                    AI Features Enabled
                  </h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Real-time transaction anomaly detection</li>
                    <li>• AI-generated security summaries</li>
                    <li>• Pattern recognition for unusual activity</li>
                    <li>• Smart alert prioritization</li>
                  </ul>
                  <p className="text-xs text-purple-300">
                    Powered by Hugging Face AI models. No additional charges during beta.
                  </p>
                </div>
              )}

              <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">How AI Detection Works</h4>
                <div className="text-sm text-slate-400 space-y-2">
                  <p>
                    Our AI system analyzes your wallet's transaction history to build a baseline of normal activity.
                  </p>
                  <p>
                    When new transactions occur, the AI compares them against this baseline to detect anomalies such as:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Unusual transaction amounts</li>
                    <li>Transactions at unexpected times</li>
                    <li>Rapid succession of transactions</li>
                    <li>Interactions with flagged addresses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Two-Factor Authentication</Label>
                <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                <Button variant="outline" className="bg-slate-800 border-slate-600 text-white">
                  Enable 2FA
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">API Keys</Label>
                <p className="text-sm text-slate-400">Manage API access to your account</p>
                <Button variant="outline" className="bg-slate-800 border-slate-600 text-white">
                  Manage API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input id="name" placeholder="Your full name" className="bg-slate-800 border-slate-600 text-white" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">
                  Company
                </Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
