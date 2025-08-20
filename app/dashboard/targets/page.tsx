"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Plus, Trash2, Wallet, CheckCircle, AlertTriangle, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface MonitoringTarget {
  id: string
  target_type: string
  target_value: string
  target_name?: string
  target_description?: string
  is_active: boolean
  created_at: string
}

const blockchains = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", pattern: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/ },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", pattern: /^0x[a-fA-F0-9]{40}$/ },
  { id: "binance", name: "Binance Smart Chain", symbol: "BNB", pattern: /^0x[a-fA-F0-9]{40}$/ },
  { id: "solana", name: "Solana", symbol: "SOL", pattern: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/ },
  { id: "tron", name: "TRON", symbol: "TRX", pattern: /^T[A-Za-z1-9]{33}$/ },
]

export default function TargetsPage() {
  const { user, loading: authLoading } = useAuth()
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
  const [saving, setSaving] = useState(false)
  const [newTarget, setNewTarget] = useState({
    address: "",
    name: "",
    description: "",
    blockchain: "",
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/sign-in")
      return
    }

    if (user) {
      fetchTargets()
    }
  }, [user, authLoading, router])

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

  const detectBlockchain = (address: string): string => {
    for (const blockchain of blockchains) {
      if (blockchain.pattern.test(address)) {
        return blockchain.id
      }
    }
    return "unknown"
  }

  const validateAddress = (address: string): boolean => {
    return blockchains.some((blockchain) => blockchain.pattern.test(address))
  }

  const getBlockchainName = (id: string): string => {
    const blockchain = blockchains.find((b) => b.id === id)
    return blockchain ? blockchain.name : "Unknown"
  }

  const getBlockchainSymbol = (id: string): string => {
    const blockchain = blockchains.find((b) => b.id === id)
    return blockchain ? blockchain.symbol : "?"
  }

  const addTarget = async () => {
    if (!newTarget.address.trim()) {
      toast({
        title: "Error",
        description: "Please enter a wallet address",
        variant: "destructive",
      })
      return
    }

    if (!validateAddress(newTarget.address)) {
      toast({
        title: "Error",
        description: "Invalid wallet address format",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const detectedBlockchain = detectBlockchain(newTarget.address)

      const { error } = await supabase.from("monitoring_targets").insert({
        user_id: user?.id,
        target_type: "wallet",
        target_value: newTarget.address,
        target_name: newTarget.name || `${getBlockchainSymbol(detectedBlockchain)} Wallet`,
        target_description: newTarget.description || `${getBlockchainName(detectedBlockchain)} wallet address`,
        is_active: true,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Wallet address added for monitoring",
      })

      setNewTarget({ address: "", name: "", description: "", blockchain: "" })
      fetchTargets()
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add wallet address",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const removeTarget = async (targetId: string) => {
    try {
      const { error } = await supabase.from("monitoring_targets").delete().eq("id", targetId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Wallet removed from monitoring",
      })

      fetchTargets()
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove wallet",
        variant: "destructive",
      })
    }
  }

  const toggleTarget = async (targetId: string, isActive: boolean) => {
    try {
      const { error } = await supabase.from("monitoring_targets").update({ is_active: !isActive }).eq("id", targetId)

      if (error) throw error

      toast({
        title: "Success",
        description: `Monitoring ${!isActive ? "enabled" : "paused"}`,
      })

      fetchTargets()
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update monitoring status",
        variant: "destructive",
      })
    }
  }

  if (authLoading || !user) {
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
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              Hot Wallet Monitoring
            </h1>
            <p className="text-slate-300">
              Add and manage your exchange's hot wallet addresses for real-time monitoring
            </p>
          </div>

          {/* Add New Wallet */}
          <Card className="mb-8 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Plus className="h-5 w-5 text-emerald-400" />
                Add Hot Wallet Address
              </CardTitle>
              <CardDescription className="text-slate-300">
                Enter your hot wallet address to start monitoring for security threats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">
                    Wallet Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter wallet address (BTC, ETH, SOL, TRON, BNB)"
                    value={newTarget.address}
                    onChange={(e) => {
                      const address = e.target.value
                      const blockchain = detectBlockchain(address)
                      setNewTarget({
                        ...newTarget,
                        address,
                        blockchain,
                      })
                    }}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 font-mono"
                  />
                  {newTarget.address && (
                    <div className="flex items-center gap-2 text-sm">
                      {validateAddress(newTarget.address) ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <Badge variant="outline" className="border-emerald-400/30 text-emerald-400">
                            {getBlockchainSymbol(newTarget.blockchain)} {getBlockchainName(newTarget.blockchain)}
                          </Badge>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">Invalid address format</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Wallet Name (Optional)
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Main Trading Wallet"
                    value={newTarget.name}
                    onChange={(e) => setNewTarget({ ...newTarget, name: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description (Optional)
                </Label>
                <Input
                  id="description"
                  placeholder="Brief description of this wallet's purpose"
                  value={newTarget.description}
                  onChange={(e) => setNewTarget({ ...newTarget, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <Button
                onClick={addTarget}
                disabled={saving || !newTarget.address || !validateAddress(newTarget.address)}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                {saving ? "Adding..." : "Add Wallet"}
              </Button>
            </CardContent>
          </Card>

          {/* Monitored Wallets */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wallet className="h-5 w-5 text-emerald-400" />
                Monitored Wallets ({targets.length})
              </CardTitle>
              <CardDescription className="text-slate-300">
                Your hot wallet addresses being monitored for security threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingTargets ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto"></div>
                  <p className="text-slate-400 mt-2">Loading wallets...</p>
                </div>
              ) : targets.length === 0 ? (
                <div className="text-center py-8">
                  <Wallet className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-2">No wallets being monitored yet</p>
                  <p className="text-sm text-slate-500">Add your first hot wallet address above to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {targets.map((target) => {
                    const blockchain = detectBlockchain(target.target_value)
                    return (
                      <div
                        key={target.id}
                        className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${target.is_active ? "bg-emerald-400" : "bg-slate-500"}`}
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-white">{target.target_name}</h3>
                              <Badge variant="outline" className="border-emerald-400/30 text-emerald-400">
                                {getBlockchainSymbol(blockchain)} {getBlockchainName(blockchain)}
                              </Badge>
                              {target.is_active ? (
                                <Badge className="bg-emerald-500/20 text-emerald-400">Active</Badge>
                              ) : (
                                <Badge variant="outline" className="border-slate-500 text-slate-400">
                                  Paused
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm font-mono text-slate-300">{target.target_value}</p>
                            {target.target_description && (
                              <p className="text-xs text-slate-400 mt-1">{target.target_description}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleTarget(target.id, target.is_active)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-600"
                          >
                            {target.is_active ? "Pause" : "Resume"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeTarget(target.id)}
                            className="border-red-600 text-red-400 hover:bg-red-600/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
