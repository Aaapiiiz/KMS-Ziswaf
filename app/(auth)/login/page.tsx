// ngejerwisokto/app/(auth)/login/page.tsx (Layout Disesuaikan)
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Eye,
  EyeOff,
  BookOpen,
  Users,
  Shield,
  Zap,
  TrendingUp,
  Sparkles,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

// Komponen FloatingParticles (tidak berubah)
const FloatingParticles = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])
  if (!isMounted) return null
  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { user, loading, login } = useAuth()

  // Logika handleLogin (tidak berubah)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const result = await login(email, password);
    if (result.error) {
      setError("Email atau password tidak valid");
    }
    setIsLoading(false)
  };

  // useEffect untuk redirect (tidak berubah)
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background elements (tidak berubah) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <FloatingParticles />
        <div className="absolute inset-0 grid-pattern-overlay opacity-40"></div>
      </div>

      {/* === PERUBAHAN UTAMA: GRID FULL-SCREEN === */}
      <div className="relative z-10 grid w-full min-h-screen lg:grid-cols-2">
        
        {/* --- KOLOM KIRI (INFORMASI) --- */}
        {/* Dibuat menjadi flex container untuk mendorong konten ke kanan */}
        <div className="hidden lg:flex flex-col items-end justify-center p-12">
          <div className="w-full max-w-lg space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                    Ziswaf KMS
                  </h1>
                  <p className="text-xl text-cyan-200 font-medium">Knowledge Management System</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-gray-200 leading-relaxed">
                  Platform revolusioner untuk mengelola pengetahuan ziswaf dengan interface
                  yang memukau.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-emerald-300"><CheckCircle className="w-4 h-4" /><span>99.9% Uptime</span></div>
                  <div className="flex items-center space-x-2 text-cyan-300"><Shield className="w-4 h-4" /><span>Enterprise Security</span></div>
                  <div className="flex items-center space-x-2 text-purple-300"><Zap className="w-4 h-4" /><span>Lightning Fast</span></div>
                  <div className="flex items-center space-x-2 text-pink-300"><TrendingUp className="w-4 h-4" /><span>Advanced Analytics</span></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="group p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"><Users className="w-8 h-8 text-white" /></div>
                  <div className="flex-1"><h3 className="font-bold text-white text-xl mb-3">Collaborative Workspace</h3><p className="text-gray-300 leading-relaxed">Fasilitasi kolaborasi real-time antar departemen dengan tools komunikasi terintegrasi</p></div>
                </div>
              </div>
              <div className="group p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"><TrendingUp className="w-8 h-8 text-white" /></div>
                  <div className="flex-1"><h3 className="font-bold text-white text-xl mb-3">Advanced Analytics</h3><p className="text-gray-300 leading-relaxed">Dashboard analytics mendalam untuk tracking performance dan insights bisnis</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN (FORM) --- */}
        {/* Dibuat menjadi flex container untuk menengahkan Kartu Form */}
        <div className="flex items-center justify-center lg:justify-start p-6 sm:p-8">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
            <CardHeader className="space-y-4 text-center pb-8">
              <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:hidden shadow-2xl">
                <BookOpen className="w-12 h-12 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"><Sparkles className="w-3 h-3 text-white" /></div>
              </div>
              <div className="space-y-3">
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Selamat Datang Kembali</CardTitle>
                <CardDescription className="text-base text-gray-600 leading-relaxed">Masuk ke akun Anda untuk mengakses sistem knowledge management terdepan</CardDescription>
              </div>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-6">
                {error && (<Alert variant="destructive" className="border-red-200 bg-red-50"><AlertDescription className="text-red-700">{error}</AlertDescription></Alert>)}
                <div className="space-y-3"><Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label><Input id="email" type="email" placeholder="nama@perusahaan.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl" /></div>
                <div className="space-y-3"><Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} placeholder="Masukkan password Anda" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl pr-12" /><Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>{showPassword ? (<EyeOff className="h-5 w-5 text-gray-400" />) : (<Eye className="h-5 w-5 text-gray-400" />)}</Button></div></div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-6">
                <Button type="submit" className="w-full h-14 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 hover:from-emerald-700 hover:via-cyan-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-base" disabled={isLoading}>{isLoading ? (<div className="flex items-center space-x-2"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Memproses...</span></div>) : (<span>Masuk ke Dashboard</span>)}</Button>
                <div className="text-center text-sm text-gray-600">Belum memiliki akun?{" "}<Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors">Daftar sekarang</Link></div>
              </CardFooter>
            </form>
          </Card>
        </div>

      </div>
      <style jsx>{`
        /* Style tidak perlu diubah */
        .grid-pattern-overlay { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  )
}