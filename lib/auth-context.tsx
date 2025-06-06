"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isSignedIn: boolean
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false)

  // Check local storage on initial load
  useEffect(() => {
    const storedAuth = localStorage.getItem("demo-auth")
    if (storedAuth) {
      setIsSignedIn(JSON.parse(storedAuth))
    }
  }, [])

  const signIn = () => {
    setIsSignedIn(true)
    localStorage.setItem("demo-auth", JSON.stringify(true))
  }

  const signOut = () => {
    setIsSignedIn(false)
    localStorage.setItem("demo-auth", JSON.stringify(false))
  }

  return <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
