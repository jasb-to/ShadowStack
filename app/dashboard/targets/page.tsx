"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, Plus, Trash2, ArrowLeft, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface MonitoringTarget {
  id: string
  target_type: string
  target_value: string
  target_name?: string
  target_description?: string
  is_active: boolean
  created_at: string
}

export default function TargetsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [targets, setTargets] = useState<MonitoringTarget[]>([])
  const [loadingTargets, setLoadingTargets] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    target_type: "",
    target_value: "",
    target_name: "",
    target_description: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in")
      return
    }

    if (user) {
      fetchTargets()
    }
  }, [user, loading, router])

  const fetchTargets = async () => {
    try {
      const { data, error } = await supabase
        .from("monitoring_targets")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setTargets(data || [])
    } catch (error) {
      console.error("Error fetching targets:", error)
      toast({
        title: "Error",
        description: "Failed to load monitoring targets",
        variant: "destructive",
      })
    } finally {
      setLoadingTargets(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase.from("monitoring_targets").insert([
        {
          user_id: user?.id,
          target_type: formData.target_type,
          target_value: formData.target_value,
          target_name: formData.target_name || null,
          target_description: formData.target_description || null,
          is_active: true,
        },
      ])

      if (error) throw error

      toast({
        title: "Success",
        description: "Monitoring target added successfully",
      })

      setFormData({ target_type: "", target_value: "", target_name: "", target_description: "" })
      setShowAddForm(false)
      fetchTargets()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add monitoring target",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this monitoring target?")) return

    try {
      const { error } = await supabase.from("monitoring_targets").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Monitoring target deleted successfully",
      })

      fetchTargets()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete monitoring target",
        variant: "destructive",
      })
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/dashboard" className="mr-4">
                <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">ShadowStack</span>
            </div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monitoring Targets</h1>
            <p className="text-gray-600 mt-2">Manage the assets you want to monitor for security threats</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Target
          </Button>
        </div>

        {/* Add Target Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Monitoring Target</CardTitle>
              <CardDescription>Add a new asset to monitor for security threats</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target_type">Target Type</Label>
                    <Select
                      value={formData.target_type}
                      onValueChange={(value) => setFormData({ ...formData, target_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select target type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wallet">Crypto Wallet</SelectItem>
                        <SelectItem value="domain">Domain</SelectItem>
                        <SelectItem value="email">Email Address</SelectItem>
                        <SelectItem value="api">API Endpoint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target_value">Target Value</Label>
                    <Input
                      id="target_value"
                      placeholder="Enter the asset to monitor"
                      value={formData.target_value}
                      onChange={(e) => setFormData({ ...formData, target_value: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target_name">Name (Optional)</Label>
                  <Input
                    id="target_name"
                    placeholder="Friendly name for this target"
                    value={formData.target_name}
                    onChange={(e) => setFormData({ ...formData, target_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target_description">Description (Optional)</Label>
                  <Input
                    id="target_description"
                    placeholder="Brief description of this asset"
                    value={formData.target_description}
                    onChange={(e) => setFormData({ ...formData, target_description: e.target.value })}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Adding..." : "Add Target"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Targets List */}
        <div className="space-y-4">
          {loadingTargets ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <Target className="h-8 w-8 animate-spin" />
              </CardContent>
            </Card>
          ) : targets.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No monitoring targets</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first asset to monitor</p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Target
                </Button>
              </CardContent>
            </Card>
          ) : (
            targets.map((target) => (
              <Card key={target.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{target.target_name || target.target_value}</h3>
                        <Badge variant={target.target_type === "wallet" ? "default" : "secondary"}>
                          {target.target_type}
                        </Badge>
                        <Badge variant={target.is_active ? "default" : "secondary"}>
                          {target.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{target.target_value}</p>
                      {target.target_description && (
                        <p className="text-sm text-gray-500">{target.target_description}</p>
                      )}
                      <p className="text-xs text-gray-500">Added {new Date(target.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(target.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
