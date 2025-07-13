"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
  department?: string
}

interface AuthContextType {
  user: User | null
  userRole: "admin" | "user" | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    const storedRole = localStorage.getItem("userRole")

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser))
      setUserRole(storedRole as "admin" | "user")
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login logic - replace with actual API call
    if (email === "admin@ziswaf.com" && password === "admin123") {
      const adminUser = {
        id: "admin-1",
        name: "Admin System",
        email: "admin@ziswaf.com",
        avatar_url: "/placeholder.svg?height=32&width=32",
        department: "IT",
      }
      setUser(adminUser)
      setUserRole("admin")
      localStorage.setItem("user", JSON.stringify(adminUser))
      localStorage.setItem("userRole", "admin")
    } else if (email === "user@ziswaf.com" && password === "user123") {
      const regularUser = {
        id: "user-1",
        name: "Ahmad Fauzi",
        email: "user@ziswaf.com",
        avatar_url: "/placeholder.svg?height=32&width=32",
        department: "Pendayagunaan",
      }
      setUser(regularUser)
      setUserRole("user")
      localStorage.setItem("user", JSON.stringify(regularUser))
      localStorage.setItem("userRole", "user")
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    setUser(null)
    setUserRole(null)
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    window.location.href = "/login"
  }

  return <AuthContext.Provider value={{ user, userRole, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
