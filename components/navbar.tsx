"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold text-white">ShadowStack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/demo" className="text-slate-300 hover:text-white transition-colors">
              Demo
            </Link>
            <Link href="/docs" className="text-slate-300 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/help" className="text-slate-300 hover:text-white transition-colors">
              Help
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900 rounded-lg mt-2">
              <Link
                href="/pricing"
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/demo"
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Demo
              </Link>
              <Link
                href="/docs"
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/help"
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Help
              </Link>
              <div className="border-t border-slate-700 pt-4 mt-4">
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-slate-300 hover:text-white hover:bg-slate-800 mb-2">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
