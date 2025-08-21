"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Target,
  Wallet,
  Globe,
  Mail,
  Trash2,
  Edit,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react"
import { createClientComponentClient } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface MonitoringTarget {
  id: string
  name: string
  type: "wallet" | "domain" | "email" | "keyword"
  value: string
  description?: string
  is_active: boolean
  created_at: string
  last_checked?: string
  alert_count: number
}

export default function TargetsPage() {
  const [targets, setTargets] = useState<MonitoringTarget[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [newTarget, setNewTarget] = useState({
    name: "",
    type: "wallet" as const,
    value: "",
    description: "",
  })
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    loadTargets()
  }, [])

  const loadTargets = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/sign-in")
        return
      }

      const { data, error } = await supabase
        .from("targets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      setTargets(data || [])
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load monitoring targets",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addTarget = async () => {
    if (!newTarget.name || !newTarget.value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase.from("targets").insert({
        user_id: user.id,
        name: newTarget.name,
        type: newTarget.type,
        value: newTarget.value,
        description: newTarget.description,
        is_active: true,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Monitoring target added successfully",
      })

      setNewTarget({ name: "", type: "wallet", value: "", description: "" })
      setShowAddForm(false)
      loadTargets()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add monitoring target",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const toggleTarget = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase.from("targets").update({ is_active: !isActive }).eq("id", id)

      if (error) throw error

      setTargets(targets.map((target) => (target.id === id ? { ...target, is_active: !isActive } : target)))

      toast({
        title: "Success",
        description: `Target ${!isActive ? "activated" : "paused"}`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update target status",
        variant: "destructive",
      })
    }
  }

  const deleteTarget = async (id: string) => {
    if (!confirm("Are you sure you want to delete this target?")) return

    try {
      const { error } = await supabase.from("targets").delete().eq("id", id)

      if (error) throw error

      setTargets(targets.filter((target) => target.id !== id))
      toast({
        title: "Success",
        description: "Target deleted successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete target",
        variant: "destructive",
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "wallet":
        return <Wallet className="w-4 h-4" />
      case "domain":
        return <Globe className="w-4 h-4" />
      case "email":
        return <Mail className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "wallet":
        return "bg-emerald-600"
      case "domain":
        return "bg-blue-600"
      case "email":
        return "bg-purple-600"
      default:
        return "bg-slate-600"
    }
  }

  const filteredTargets = targets.filter((target) => {
    const matchesSearch =
      target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.value.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || target.type === filterType
    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-800 rounded w-1/4"></div>
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Monitoring Targets</h1>
            <p className="text-slate-400">Manage what assets and keywords you want to monitor for security threats</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Target
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search targets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="wallet">Wallets</SelectItem>
              <SelectItem value="domain">Domains</SelectItem>
              <SelectItem value="email">Emails</SelectItem>
              <SelectItem value="keyword">Keywords</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Target Form */}
        {showAddForm && (
          <Card className="mb-6 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Add New Target</CardTitle>
              <CardDescription className="text-slate-400">Configure a new asset or keyword to monitor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Name</Label>
                  <Input
                    placeholder="e.g., Main Hot Wallet"
                    value={newTarget.name}
                    onChange={(e) => setNewTarget({ ...newTarget, name: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Type</Label>
                  <Select
                    value={newTarget.type}
                    onValueChange={(value: any) => setNewTarget({ ...newTarget, type: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="wallet">Wallet Address</SelectItem>
                      <SelectItem value="domain">Domain</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="keyword">Keyword</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Value</Label>
                <Input
                  placeholder={
                    newTarget.type === "wallet"
                      ? "0x1234..."
                      : newTarget.type === "domain"
                        ? "example.com"
                        : newTarget.type === "email"
                          ? "admin@example.com"
                          : "security breach"
                  }
                  value={newTarget.value}
                  onChange={(e) => setNewTarget({ ...newTarget, value: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Description (Optional)</Label>
                <Textarea
                  placeholder="Additional context about this target..."
                  value={newTarget.description}
                  onChange={(e) => setNewTarget({ ...newTarget, description: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addTarget}
                  disabled={saving}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                >
                  {saving ? "Adding..." : "Add Target"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Targets List */}
        {filteredTargets.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Targets Found</h3>
              <p className="text-slate-400 mb-6">
                {searchTerm || filterType !== "all"
                  ? "No targets match your current filters"
                  : "Start by adding your first monitoring target"}
              </p>
              {!searchTerm && filterType === "all" && (
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Target
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredTargets.map((target) => (
              <Card
                key={target.id}
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg ${getTypeColor(target.type)} flex items-center justify-center`}
                      >
                        {getTypeIcon(target.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white truncate">{target.name}</h3>
                          <Badge variant="secondary" className="bg-slate-700 text-slate-300 capitalize">
                            {target.type}
                          </Badge>
                          {target.is_active ? (
                            <Badge className="bg-emerald-600 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-600 text-slate-300">
                              <Pause className="w-3 h-3 mr-1" />
                              Paused
                            </Badge>
                          )}
                        </div>

                        <p className="text-slate-300 font-mono text-sm truncate mb-2">{target.value}</p>

                        {target.description && <p className="text-slate-400 text-sm truncate">{target.description}</p>}

                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {target.alert_count} alerts
                          </span>
                          {target.last_checked && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Last checked {new Date(target.last_checked).toLocaleDateString()}
                            </span>
                          )}
                          <span>Added {new Date(target.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleTarget(target.id, target.is_active)}
                        className="border-slate-600 text-white hover:bg-slate-700"
                      >
                        {target.is_active ? (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Resume
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTarget(target.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{targets.length}</div>
              <div className="text-sm text-slate-400">Total Targets</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">{targets.filter((t) => t.is_active).length}</div>
              <div className="text-sm text-slate-400">Active</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-400">{targets.filter((t) => !t.is_active).length}</div>
              <div className="text-sm text-slate-400">Paused</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">
                {targets.reduce((sum, t) => sum + t.alert_count, 0)}
              </div>
              <div className="text-sm text-slate-400">Total Alerts</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
