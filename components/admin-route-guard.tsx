"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"

interface AdminRouteGuardProps {
  children: React.ReactNode
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { user, userRole, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || userRole !== "admin")) {
      // Redirect non-admin users to dashboard
      router.push("/dashboard")
    }
  }, [user, userRole, loading, router])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  // Show access denied for non-admin users
  if (!user || userRole !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Akses Ditolak</h2>
            <p className="text-gray-600 mb-6">
              Halaman ini hanya dapat diakses oleh administrator. Silakan hubungi admin jika Anda memerlukan akses.
            </p>
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render admin content
  return <>{children}</>
}
