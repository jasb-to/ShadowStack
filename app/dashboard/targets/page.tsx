"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { supabase, type MonitoringTarget } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, AlertTriangle, Loader2 } from "lucide-react"

export default function TargetsPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [targets, setTargets] = useState<MonitoringTarget[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingTarget, setEditingTarget] = useState<MonitoringTarget | null>(null)

  const [formState, setFormState] = useState({
    target_type: "domain",
    target_value: "",
    target_name: "",
  })

  useEffect(() => {
    if (user) {
      fetchTargets()
    } else if (!authLoading) {
      setLoading(false)
    }
  }, [user, authLoading])

  const fetchTargets = async () => {
    if (!user) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("monitoring_targets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
      if (error) throw error
      setTargets(data || [])
    } catch (error: any) {
      toast({
        title: "Error fetching targets",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, target_type: value }))
  }

  const resetForm = () => {
    setFormState({
      target_type: "domain",
      target_value: "",
      target_name: "",
    })
    setEditingTarget(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !formState.target_value) return

    setIsSubmitting(true)
    try {
      if (editingTarget) {
        // Update existing target
        const { error } = await supabase
          .from("monitoring_targets")
          .update({
            target_type: formState.target_type as MonitoringTarget["target_type"],
            target_value: formState.target_value,
            target_name: formState.target_name || null,
          })
          .eq("id", editingTarget.id)
          .eq("user_id", user.id)

        if (error) throw error
        toast({ title: "Success", description: "Target updated successfully." })
      } else {
        // Create new target
        const { error } = await supabase.from("monitoring_targets").insert({
          user_id: user.id,
          target_type: formState.target_type as MonitoringTarget["target_type"],
          target_value: formState.target_value,
          target_name: formState.target_name || null,
        })
        if (error) throw error
        toast({ title: "Success", description: "Target added successfully." })
      }
      resetForm()
      fetchTargets()
    } catch (error: any) {
      toast({
        title: "Submission Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (target: MonitoringTarget) => {
    setEditingTarget(target)
    setFormState({
      target_type: target.target_type,
      target_value: target.target_value,
      target_name: target.target_name || "",
    })
  }

  const handleDelete = async (targetId: string) => {
    if (!user || !window.confirm("Are you sure you want to delete this target?")) return

    try {
      const { error } = await supabase.from("monitoring_targets").delete().eq("id", targetId).eq("user_id", user.id)
      if (error) throw error
      toast({ title: "Success", description: "Target deleted." })
      fetchTargets()
    } catch (error: any) {
      toast({
        title: "Deletion Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleToggleActive = async (target: MonitoringTarget) => {
    if (!user) return
    try {
      const { error } = await supabase
        .from("monitoring_targets")
        .update({ is_active: !target.is_active })
        .eq("id", target.id)
        .eq("user_id", user.id)
      if (error) throw error
      toast({
        title: "Success",
        description: `Target ${!target.is_active ? "activated" : "deactivated"}.`,
      })
      fetchTargets()
    } catch (error: any) {
      toast({
        title: "Update Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold">Monitoring Targets</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{editingTarget ? "Edit Target" : "Add New Target"}</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="target_type">Target Type</Label>
              <Select onValueChange={handleSelectChange} value={formState.target_type}>
                <SelectTrigger id="target_type">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domain">Domain/Website</SelectItem>
                  <SelectItem value="api">API Endpoint</SelectItem>
                  <SelectItem value="wallet">Crypto Wallet</SelectItem>
                  <SelectItem value="email">Email Address</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_value">Value</Label>
              <Input
                id="target_value"
                name="target_value"
                value={formState.target_value}
                onChange={handleInputChange}
                placeholder="e.g., example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_name">Name (Optional)</Label>
              <Input
                id="target_name"
                name="target_name"
                value={formState.target_name}
                onChange={handleInputChange}
                placeholder="e.g., My Company Website"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {editingTarget && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : editingTarget ? (
                "Save Changes"
              ) : (
                <PlusCircle className="mr-2 h-4 w-4" />
              )}
              {editingTarget ? "Save Changes" : "Add Target"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <Head>Status</Head>
                <Head>Name</Head>
                <Head>Type</Head>
                <Head>Value</Head>
                <Head>Created</Head>
                <Head className="text-right">Actions</Head>
              </TableRow>
            </TableHeader>
            <TableBody>
              {targets.length > 0 ? (
                targets.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell>
                      <Switch
                        checked={target.is_active}
                        onCheckedChange={() => handleToggleActive(target)}
                        aria-label="Toggle target status"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{target.target_name || "N/A"}</TableCell>
                    <TableCell className="capitalize">{target.target_type}</TableCell>
                    <TableCell className="font-mono">{target.target_value}</TableCell>
                    <TableCell>{new Date(target.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(target)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(target.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                      <p>No targets found. Add one above to start monitoring.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Custom TableHead component for cleaner code
const Head = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <TableHead className={className}>{children}</TableHead>
)
