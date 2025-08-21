"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Key, CreditCard, Trash2, Save, AlertTriangle } from "lucide-react"
import { createClientComponentClient } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: string
  email: string
  full_name: string
  company: string
  phone: string
  timezone: string
  created_at: string
}

interface NotificationSettings {
  email_alerts: boolean
  sms_alerts: boolean
  webhook_alerts: boolean
  alert_frequency: string
  quiet_hours_start: string
  quiet_hours_end: string
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email_alerts: true,
    sms_alerts: false,
    webhook_alerts: false,
    alert_frequency: "immediate",
    quiet_hours_start: "22:00",
    quiet_hours_end: "08:00",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/sign-in")
        return
      }

      // Load profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profileData) {
        setProfile(profileData)
      }

      // Load notification settings (mock data for now)
      // In a real app, this would come from the database
      setNotifications({
        email_alerts: true,
        sms_alerts: false,
        webhook_alerts: false,
        alert_frequency: "immediate",
        quiet_hours_start: "22:00",
        quiet_hours_end: "08:00",
      })
    } catch (err) {
      setError("Failed to load user data")
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    if (!profile) return

    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          company: profile.company,
          phone: profile.phone,
          timezone: profile.timezone,
        })
        .eq("id", profile.id)

      if (error) throw error

      setSuccess("Profile updated successfully")
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      })
    } catch (err) {
      setError("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const saveNotifications = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      // In a real app, save to database
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Notification settings updated")
      toast({
        title: "Success",
        description: "Your notification preferences have been updated.",
      })
    } catch (err) {
      setError("Failed to update notification settings")
    } finally {
      setSaving(false)
    }
  }

  const deleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return
    }

    try {
      // In a real app, implement account deletion
      toast({
        title: "Account Deletion",
        description: "Please contact support to delete your account.",
        variant: "destructive",
      })
    } catch (err) {
      setError("Failed to delete account")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-800 rounded w-1/4"></div>
            <div className="h-64 bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-slate-400">Manage your account preferences and security settings</p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-emerald-500/50 bg-emerald-500/10">
            <AlertDescription className="text-emerald-400">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-slate-700">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          value={profile.full_name || ""}
                          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white">
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={profile.company || ""}
                          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={profile.email}
                        disabled
                        className="bg-slate-700/30 border-slate-600 text-slate-400"
                      />
                      <p className="text-xs text-slate-500">Email cannot be changed. Contact support if needed.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={profile.phone || ""}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-white">
                          Timezone
                        </Label>
                        <Select
                          value={profile.timezone || "UTC"}
                          onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                        >
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                            <SelectItem value="Europe/London">London</SelectItem>
                            <SelectItem value="Europe/Paris">Paris</SelectItem>
                            <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={saveProfile}
                        disabled={saving}
                        className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure how and when you receive security alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Email Alerts</Label>
                      <p className="text-sm text-slate-400">Receive security alerts via email</p>
                    </div>
                    <Switch
                      checked={notifications.email_alerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email_alerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">SMS Alerts</Label>
                      <p className="text-sm text-slate-400">Receive critical alerts via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.sms_alerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms_alerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Webhook Alerts</Label>
                      <p className="text-sm text-slate-400">Send alerts to your webhook endpoint</p>
                    </div>
                    <Switch
                      checked={notifications.webhook_alerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, webhook_alerts: checked })}
                    />
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Alert Frequency</Label>
                    <Select
                      value={notifications.alert_frequency}
                      onValueChange={(value) => setNotifications({ ...notifications, alert_frequency: value })}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Quiet Hours Start</Label>
                      <Input
                        type="time"
                        value={notifications.quiet_hours_start}
                        onChange={(e) => setNotifications({ ...notifications, quiet_hours_start: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Quiet Hours End</Label>
                      <Input
                        type="time"
                        value={notifications.quiet_hours_end}
                        onChange={(e) => setNotifications({ ...notifications, quiet_hours_end: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={saveNotifications}
                    disabled={saving}
                    className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Password & Authentication</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage your password and two-factor authentication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Password</Label>
                      <p className="text-sm text-slate-400">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                      <Key className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-slate-400">Add an extra layer of security</p>
                    </div>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      Not Enabled
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">API Keys</CardTitle>
                  <CardDescription className="text-slate-400">Manage API keys for integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Key className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 mb-4">No API keys created yet</p>
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                      Create API Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Current Plan</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Plan</Label>
                      <p className="text-sm text-slate-400">Professional Plan</p>
                    </div>
                    <Badge className="bg-emerald-600 text-white">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Billing Cycle</Label>
                      <p className="text-sm text-slate-400">Monthly - $99/month</p>
                    </div>
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                      Change Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-red-400">Danger Zone</CardTitle>
                  <CardDescription className="text-slate-400">Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Delete Account</Label>
                      <p className="text-sm text-slate-400">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" onClick={deleteAccount} className="bg-red-600 hover:bg-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
