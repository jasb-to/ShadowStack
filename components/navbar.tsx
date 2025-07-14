"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Shield, Menu, X } from "lucide-react"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use auth hook
  const auth = useAuth()

  // Only access auth after component mounts to avoid SSR issues
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    user: null as any,
    loading: true,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setAuthState({
      isSignedIn: auth.isSignedIn,
      user: auth.user,
      loading: auth.loading,
    })
  }, [auth.isSignedIn, auth.user, auth.loading])

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const isAdminUser = authState.user?.email === "jaspalbilkhu@gmail.com"

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ShadowStack</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            {/* Mobile menu button */}
            <button
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {mounted && !authState.loading && (
              <>
                {authState.isSignedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <User className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{authState.user?.email}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <Shield className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      {isAdminUser && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden md:flex items-center space-x-2">
                    <Button variant="ghost" asChild>
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-md rounded-lg mt-2">
              <Link
                href="/about"
                className="block px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {!authState.isSignedIn && (
                <div className="pt-2 space-y-2">
                  <Link
                    href="/sign-in"
                    className="block px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
