"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/lib/auth-context"
import { Shield, Menu, X } from "lucide-react"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use auth hook
  const { user, signOut, loading, isSignedIn } = useAuth()

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
      isSignedIn: !!user,
      user: user,
      loading: loading,
    })
  }, [user, loading])

  const isAdminUser = user?.email === "jaspalbilkhu@gmail.com"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Shield className="h-6 w-6 text-cyan-400" />
          <span className="ml-2 font-bold text-lg text-white">ShadowStack</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#features" className="text-sm text-gray-300 hover:text-white">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-gray-300 hover:text-white" prefetch={false}>
            Pricing
          </Link>
          <Link href="/about" className="text-sm text-gray-300 hover:text-white" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="text-sm text-gray-300 hover:text-white" prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {!loading &&
            (isSignedIn ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            ))}
          <ModeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-md rounded-lg mt-2">
            <Link
              href="/#features"
              className="block px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
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
    </header>
  )
}
