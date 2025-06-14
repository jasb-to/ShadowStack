"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { supabase } from "@/lib/supabase"
import { Users, CreditCard, Settings, Activity, TrendingUp, Shield, Database, Bell, TestTube } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminStats {
  totalUsers: number
  activeUsers: number
  paidUsers: number
  freeUsers: number
  totalTargets: number
  totalAlerts: number
  monthlyRevenue: number
  systemHealth: "healthy" | "warning" | "critical"
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    paidUsers: 0,
    freeUsers: 0,
    totalTargets: 0,
    totalAlerts: 0,
    monthlyRevenue: 0,
    systemHealth: "healthy",
  })
  const [paywallEnabled, setPaywallEnabled] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAdminStats()
    fetchSystemConfig()
  }, [])

  const fetchAdminStats = async () => {
    try {
      // Fetch user stats
      const { data: users, error: usersError } = await supabase
        .from("user_profiles")
        .select("subscription_tier, subscription_status, last_login")

      if (usersError) throw usersError

      // Fetch targets count
      const { count: targetsCount, error: targetsError } = await supabase
        .from("monitoring_targets")
        .select("*", { count: "exact", head: true })

      if (targetsError) throw targetsError

      // Fetch alerts count
      const { count: alertsCount, error: alertsError } = await supabase
        .from("alerts")
        .select("*", { count: "exact", head: true })

      if (alertsError) throw alertsError

      // Calculate stats
      const totalUsers = users?.length || 0
      const activeUsers =
        users?.filter((u) => u.last_login && new Date(u.last_login) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
          .length || 0
      const paidUsers =
        users?.filter((u) => u.subscription_tier !== "none" && u.subscription_status === "active").length || 0

      setStats({
        totalUsers,
        activeUsers,
        paidUsers,
        freeUsers: totalUsers - paidUsers,
        totalTargets: targetsCount || 0,
        totalAlerts: alertsCount || 0,
        monthlyRevenue: paidUsers * 29, // Simplified calculation
        systemHealth: "healthy",
      })
    } catch (error) {
      console.error("Error fetching admin stats:", error)
      toast({
        title: "Error",
        description: "Failed to fetch admin statistics",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchSystemConfig = async () => {
    try {
      const { data: configs, error } = await supabase
        .from("system_config")
        .select("config_key, config_value")
        .in("config_key", ["paywall_enabled", "maintenance_mode"])

      if (error) throw error

      configs?.forEach((config) => {
        if (config.config_key === "paywall_enabled") {
          setPaywallEnabled(config.config_value === "true")
        }
        if (config.config_key === "maintenance_mode") {
          setMaintenanceMode(config.config_value === "true")
        }
      })
    } catch (error) {
      console.error("Error fetching system config:", error)
    }
  }

  const updateSystemConfig = async (key: string, value: boolean) => {
    try {
      const { error } = await supabase
        .from("system_config")
        .update({
          config_value: value.toString(),
          updated_at: new Date().toISOString(),
        })
        .eq("config_key", key)

      if (error) throw error

      // Log admin action
      await supabase.rpc("log_admin_action", {
        p_action: "update_system_config",
        p_resource_type: "system_config",
        p_resource_id: key,
        p_details: { old_value: !value, new_value: value },
      })

      toast({
        title: "Success",
        description: `${key.replace("_", " ")} updated successfully`,
      })
    } catch (error) {
      console.error("Error updating system config:", error)
      toast({
        title: "Error",
        description: "Failed to update system configuration",
        variant: "destructive",
      })
    }
  }

  const handlePaywallToggle = (enabled: boolean) => {
    setPaywallEnabled(enabled)
    updateSystemConfig("paywall_enabled", enabled)
  }

  const handleMaintenanceToggle = (enabled: boolean) => {
    setMaintenanceMode(enabled)
    updateSystemConfig("maintenance_mode", enabled)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and management controls</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={stats.systemHealth === "healthy" ? "default" : "destructive"}>
              {stats.systemHealth.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* System Controls */}
        <Card className="mb-8 border-orange-500/20 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              System Controls
            </CardTitle>
            <CardDescription>Toggle system-wide features and test modes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Paywall</h3>
                  <p className="text-sm text-muted-foreground">Enable/disable payment requirements</p>
                </div>
                <Switch checked={paywallEnabled} onCheckedChange={handlePaywallToggle} />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Maintenance Mode</h3>
                  <p className="text-sm text-muted-foreground">Put system in maintenance mode</p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={handleMaintenanceToggle} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">{stats.activeUsers} active this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Subscribers</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.paidUsers}</div>
              <p className="text-xs text-muted-foreground">{stats.freeUsers} free users</p>
            </CardContent>
          </Card>

          <Card className="shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{stats.monthlyRevenue}</div>
              <p className="text-xs text-muted-foreground">Estimated monthly recurring</p>
            </CardContent>
          </Card>

          <Card className="shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-500">Operational</span>
              </div>
              <p className="text-xs text-muted-foreground">All systems running</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/users">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  User Management
                </CardTitle>
                <CardDescription>Manage users, subscriptions, and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{stats.totalUsers}</span>
                  <Button variant="ghost" size="sm">
                    Manage →
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/analytics">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Analytics
                </CardTitle>
                <CardDescription>View detailed system analytics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">View Reports</span>
                  <Button variant="ghost" size="sm">
                    Analytics →
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/system">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  System Settings
                </CardTitle>
                <CardDescription>Configure system-wide settings and features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Configure</span>
                  <Button variant="ghost" size="sm">
                    Settings →
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/security">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security & Audit
                </CardTitle>
                <CardDescription>View audit logs and security settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">View Logs</span>
                  <Button variant="ghost" size="sm">
                    Security →
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/database">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Database Management
                </CardTitle>
                <CardDescription>Backup, restore, and manage database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Manage DB</span>
                  <Button variant="ghost" size="sm">
                    Database →
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/notifications">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>Manage system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Manage</span>
                  <Button variant="ghost" size="sm">
                    Notifications →
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>Latest administrative actions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System configuration updated</p>
                  <p className="text-xs text-muted-foreground">Paywall settings modified</p>
                </div>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">Free tier signup</p>
                </div>
                <span className="text-xs text-muted-foreground">15 minutes ago</span>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Database backup completed</p>
                  <p className="text-xs text-muted-foreground">Automated daily backup</p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
