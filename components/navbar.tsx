"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Shield, Menu, ChevronDown, Eye, AlertTriangle, Settings, LogOut, User, CreditCard } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Demo", href: "/demo" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Help", href: "/help" },
]

const dashboardNavigation = [
  { name: "Overview", href: "/dashboard", icon: Eye },
  { name: "Alerts", href: "/dashboard/alerts", icon: AlertTriangle },
  { name: "Targets", href: "/dashboard/targets", icon: Shield },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled || isDashboard ? "bg-slate-900/95 backdrop-blur-sm border-b border-slate-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">ShadowStack</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isDashboard ? (
                // Dashboard Navigation
                <>
                  {dashboardNavigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "text-slate-300 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    )
                  })}
                </>
              ) : (
                // Public Navigation
                <>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                {!isDashboard && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-slate-300 hover:text-white">
                      <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-emerald-400" />
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                    <DropdownMenuLabel className="text-slate-300">{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem asChild className="text-slate-300 hover:bg-slate-700">
                      <Link href="/dashboard" className="flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-slate-300 hover:bg-slate-700">
                      <Link href="/dashboard/settings" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-slate-300 hover:bg-slate-700">
                      <Link href="/pricing" className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Billing
                        <Badge
                          variant="outline"
                          className="ml-auto bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        >
                          Pro
                        </Badge>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button asChild variant="ghost" className="text-slate-300 hover:text-white">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-slate-900 border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-emerald-500" />
                    <span className="text-lg font-bold text-white">ShadowStack</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {isDashboard ? (
                    // Dashboard Mobile Navigation
                    <>
                      {dashboardNavigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "text-slate-300 hover:text-white hover:bg-slate-800"
                            }`}
                          >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.name}
                          </Link>
                        )
                      })}
                      <div className="border-t border-slate-800 pt-4 mt-4">
                        <Button
                          onClick={handleSignOut}
                          variant="ghost"
                          className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign out
                        </Button>
                      </div>
                    </>
                  ) : (
                    // Public Mobile Navigation
                    <>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}

                      <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
                        {user ? (
                          <>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-slate-600 text-slate-300 bg-transparent"
                            >
                              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                Dashboard
                              </Link>
                            </Button>
                            <Button
                              onClick={() => {
                                handleSignOut()
                                setIsOpen(false)
                              }}
                              variant="ghost"
                              className="w-full text-red-400 hover:bg-red-500/10"
                            >
                              Sign out
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-slate-600 text-slate-300 bg-transparent"
                            >
                              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                                Sign in
                              </Link>
                            </Button>
                            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                              <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                                Get Started
                              </Link>
                            </Button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
