"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Database, Settings, AlertTriangle, CheckCircle } from "lucide-react"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalAlerts: 0,
    systemStatus: "operational",
  })
  const [loading, setLoading] = useState(true)
  const [setupNeeded, setSetupNeeded] = useState(false)

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Try to load basic stats
        const { data: users, error: usersError } = await supabase
          .from("user_profiles")
          .select("id, subscription_status")

        if (usersError) {
          console.error("Error loading users:", usersError)
          setSetupNeeded(true)
        } else {
          setStats({
            totalUsers: users?.length || 0,
            activeSubscriptions: users?.filter((u) => u.subscription_status === "active").length || 0,
            totalAlerts: 0,
            systemStatus: "operational",
          })
        }
      } catch (error) {
        console.error("Error loading admin stats:", error)
        setSetupNeeded(true)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const setupAdminAccount = async () => {
    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "jaspalbilkhu@gmail.com",
          password: "ShadowStack2024!Admin#Secure",
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert("Admin account setup complete! Please refresh the page.")
        window.location.reload()
      } else {
        alert("Setup failed: " + result.error)
      }
    } catch (error) {
      console.error("Setup error:", error)
      alert("Setup failed. Check console for details.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.email}</p>
        </div>
        <Badge variant={setupNeeded ? "destructive" : "default"}>
          {setupNeeded ? "Setup Required" : "System Operational"}
        </Badge>
      </div>

      {setupNeeded && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Database Setup Required
            </CardTitle>
            <CardDescription className="text-yellow-700">
              The admin system needs to be set up. Click the button below to initialize your admin account and database
              tables.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={setupAdminAccount} className="bg-yellow-600 hover:bg-yellow-700">
              Setup Admin Account
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Paying customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Online</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Connected</div>
            <p className="text-xs text-muted-foreground">Supabase active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Database Tools
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Current system status and configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Environment:</span>
                <Badge variant="outline">Production</Badge>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <Badge variant="outline">Supabase</Badge>
              </div>
              <div className="flex justify-between">
                <span>Admin Email:</span>
                <span className="text-muted-foreground">{user?.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
