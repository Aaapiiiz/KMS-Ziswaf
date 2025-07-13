"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Lock, Shield, Check, X } from "lucide-react"

export default function PasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 12.5
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5
    return Math.min(strength, 100)
  }

  const passwordStrength = getPasswordStrength(newPassword)

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-red-500"
    if (strength < 50) return "bg-orange-500"
    if (strength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 25) return "Lemah"
    if (strength < 50) return "Sedang"
    if (strength < 75) return "Kuat"
    return "Sangat Kuat"
  }

  // Password requirements
  const requirements = [
    { text: "Minimal 8 karakter", met: newPassword.length >= 8 },
    { text: "Mengandung huruf besar", met: /[A-Z]/.test(newPassword) },
    { text: "Mengandung huruf kecil", met: /[a-z]/.test(newPassword) },
    { text: "Mengandung angka", met: /[0-9]/.test(newPassword) },
    { text: "Mengandung karakter khusus", met: /[^A-Za-z0-9]/.test(newPassword) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    // Reset form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ubah Password</h1>
        <p className="text-muted-foreground">Pastikan akun Anda tetap aman dengan password yang kuat</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Ubah Password
            </CardTitle>
            <CardDescription>Masukkan password lama dan password baru Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Password Saat Ini</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">Password Baru</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password Strength */}
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Kekuatan Password:</span>
                      <span className="font-medium">{getStrengthText(passwordStrength)}</span>
                    </div>
                    <Progress value={passwordStrength} className="h-2" />
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="flex items-center gap-2 text-sm">
                    {newPassword === confirmPassword ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Password cocok</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">Password tidak cocok</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || newPassword !== confirmPassword || passwordStrength < 50}
              >
                <Shield className="mr-2 h-4 w-4" />
                {isLoading ? "Mengubah Password..." : "Ubah Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Persyaratan Password</CardTitle>
            <CardDescription>Password Anda harus memenuhi kriteria berikut</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {req.met ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-gray-400" />}
                  <span className={req.met ? "text-green-600" : "text-gray-600"}>{req.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Tips Keamanan:</strong> Gunakan password yang unik dan tidak pernah digunakan di layanan lain.
            Pertimbangkan menggunakan password manager untuk mengelola password Anda dengan aman.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
