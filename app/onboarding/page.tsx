"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, Shield, Wallet, Bell, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/lib/auth-context"

interface WalletAddress {
  address: string
  blockchain: string
  isValid: boolean
}

const blockchains = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", pattern: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/ },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", pattern: /^0x[a-fA-F0-9]{40}$/ },
  { id: "binance", name: "Binance Smart Chain", symbol: "BNB", pattern: /^0x[a-fA-F0-9]{40}$/ },
  { id: "solana", name: "Solana", symbol: "SOL", pattern: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/ },
  { id: "tron", name: "TRON", symbol: "TRX", pattern: /^T[A-Za-z1-9]{33}$/ },
]

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: "£15",
    period: "/month",
    wallets: 5,
    features: ["5 hot wallets", "Email alerts", "Basic security scoring", "Multi-chain support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "£49",
    period: "/month",
    wallets: 25,
    features: ["25 hot wallets", "Slack/Discord webhooks", "Advanced anomaly detection", "API access"],
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "£199",
    period: "/month",
    wallets: 999,
    features: ["Unlimited wallets", "White-label dashboard", "Priority support", "Custom integrations"],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTier, setSelectedTier] = useState("growth")
  const [exchangeName, setExchangeName] = useState("")
  const [walletAddresses, setWalletAddresses] = useState<WalletAddress[]>([])
  const [newAddress, setNewAddress] = useState("")
  const [notificationEmail, setNotificationEmail] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [webhookType, setWebhookType] = useState("")

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

  const addWalletAddress = () => {
    if (!newAddress.trim()) return

    const blockchain = detectBlockchain(newAddress)
    const isValid = validateAddress(newAddress)

    const newWallet: WalletAddress = {
      address: newAddress,
      blockchain,
      isValid,
    }

    setWalletAddresses([...walletAddresses, newWallet])
    setNewAddress("")
  }

  const removeWalletAddress = (index: number) => {
    setWalletAddresses(walletAddresses.filter((_, i) => i !== index))
  }

  const getBlockchainName = (id: string): string => {
    const blockchain = blockchains.find((b) => b.id === id)
    return blockchain ? blockchain.name : "Unknown"
  }

  const getBlockchainSymbol = (id: string): string => {
    const blockchain = blockchains.find((b) => b.id === id)
    return blockchain ? blockchain.symbol : "?"
  }

  const selectedTierData = pricingTiers.find((tier) => tier.id === selectedTier)
  const maxWallets = selectedTierData?.wallets || 5

  const handleStartTrial = async () => {
    if (!isSignedIn) {
      router.push("/sign-up")
      return
    }

    // In production, this would create the subscription and set up monitoring
    router.push("/dashboard?trial=started")
  }

  const canProceedToStep2 = exchangeName.trim().length > 0
  const canProceedToStep3 = walletAddresses.length > 0 && walletAddresses.every((w) => w.isValid)
  const canStartTrial = notificationEmail.trim().length > 0

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="flex-1 py-12">
        <div className="container max-w-4xl px-4 md:px-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        currentStep > step ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Plan Selection */}
          {currentStep === 1 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  Choose Your Plan
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Select the plan that fits your exchange size. All plans include a 7-day free trial.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {pricingTiers.map((tier) => (
                    <Card
                      key={tier.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedTier === tier.id
                          ? "bg-slate-700 border-emerald-400 ring-2 ring-emerald-400/50"
                          : "bg-slate-800 border-slate-600 hover:border-slate-500"
                      } ${tier.popular ? "relative" : ""}`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="pb-4">
                        <CardTitle className="text-white">{tier.name}</CardTitle>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-white">{tier.price}</span>
                          <span className="text-slate-400">{tier.period}</span>
                        </div>
                        <p className="text-sm text-slate-300">Up to {tier.wallets} wallets</p>
                      </CardHeader>

                      <CardContent>
                        <ul className="space-y-2">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                              <span className="text-slate-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="exchangeName" className="text-white">
                      Exchange Name
                    </Label>
                    <Input
                      id="exchangeName"
                      placeholder="e.g., CryptoVault Exchange"
                      value={exchangeName}
                      onChange={(e) => setExchangeName(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Wallet Addresses */}
          {currentStep === 2 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                  <Wallet className="w-6 h-6 text-emerald-400" />
                  Add Hot Wallet Addresses
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Add your exchange's hot wallet addresses for monitoring. We support Bitcoin, Ethereum, BSC, Solana,
                  and TRON.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Paste wallet address here..."
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    onKeyPress={(e) => e.key === "Enter" && addWalletAddress()}
                  />
                  <Button
                    onClick={addWalletAddress}
                    disabled={!newAddress.trim() || walletAddresses.length >= maxWallets}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Add
                  </Button>
                </div>

                <div className="text-sm text-slate-400">
                  {walletAddresses.length} / {maxWallets} wallets added
                </div>

                {walletAddresses.length > 0 && (
                  <div className="space-y-2">
                    {walletAddresses.map((wallet, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          wallet.isValid ? "bg-slate-700" : "bg-red-900/20 border border-red-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {wallet.isValid ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                          )}
                          <div>
                            <div className="font-mono text-sm text-white">{wallet.address}</div>
                            <div className="text-xs text-slate-400">
                              {wallet.isValid ? (
                                <Badge variant="outline" className="border-emerald-400/30 text-emerald-400">
                                  {getBlockchainSymbol(wallet.blockchain)} {getBlockchainName(wallet.blockchain)}
                                </Badge>
                              ) : (
                                <span className="text-red-400">Invalid address format</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWalletAddress(index)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceedToStep3}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Notifications */}
          {currentStep === 3 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                  <Bell className="w-6 h-6 text-emerald-400" />
                  Set Up Notifications
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Configure how you want to receive security alerts and notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="notificationEmail" className="text-white">
                    Notification Email *
                  </Label>
                  <Input
                    id="notificationEmail"
                    type="email"
                    placeholder="security@yourexchange.com"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <Label htmlFor="webhookType" className="text-white">
                    Webhook Integration (Optional)
                  </Label>
                  <Select value={webhookType} onValueChange={setWebhookType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select integration type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="slack">Slack</SelectItem>
                      <SelectItem value="discord">Discord</SelectItem>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                      <SelectItem value="custom">Custom Webhook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {webhookType && (
                  <div>
                    <Label htmlFor="webhookUrl" className="text-white">
                      Webhook URL
                    </Label>
                    <Input
                      id="webhookUrl"
                      placeholder={
                        webhookType === "slack"
                          ? "https://hooks.slack.com/services/..."
                          : webhookType === "discord"
                            ? "https://discord.com/api/webhooks/..."
                            : "https://your-webhook-url.com"
                      }
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                )}

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Setup Summary</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div>
                      Exchange: <span className="text-white">{exchangeName}</span>
                    </div>
                    <div>
                      Plan:{" "}
                      <span className="text-white">
                        {selectedTierData?.name} ({selectedTierData?.price}
                        {selectedTierData?.period})
                      </span>
                    </div>
                    <div>
                      Wallets: <span className="text-white">{walletAddresses.length} addresses</span>
                    </div>
                    <div>
                      Trial: <span className="text-emerald-400">7 days free</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={handleStartTrial}
                    disabled={!canStartTrial}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                  >
                    Start 7-Day Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
