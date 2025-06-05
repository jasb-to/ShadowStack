"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ShadowStack
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <Link href="/" className="block px-3 py-2 text-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/dashboard" className="block px-3 py-2 text-foreground hover:text-primary">
                Dashboard
              </Link>
              <Link href="#features" className="block px-3 py-2 text-foreground hover:text-primary">
                Features
              </Link>
              <Link href="#pricing" className="block px-3 py-2 text-foreground hover:text-primary">
                Pricing
              </Link>
              <div className="pt-4 pb-3 border-t border-border">
                <Button variant="ghost" className="w-full mb-2">
                  Sign In
                </Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
