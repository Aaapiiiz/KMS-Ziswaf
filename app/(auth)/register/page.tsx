"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // ** ADDED THIS IMPORT **
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, BookOpen, CheckCircle, Users, Shield, Zap, Star, Sparkles, Crown } from "lucide-react";

// This component is for client-side only rendering to prevent hydration mismatch. It's already correct.
const FloatingParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true) }, []);
  if (!isMounted) { return null }
  return (
    <div className="absolute inset-0">
      {[...Array(15)].map((_, i) => (
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
  );
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const departments = ["Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing", "Operasional", "Audit", "Penyaluran"];

  // --- THIS IS THE CORRECTED SUBMIT FUNCTION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      setIsLoading(false);
      return;
    }

    try {
      // This is the call to Supabase to create a new user.
      // We pass the user's name and department in the `options.data` field.
      // Our database trigger will use this data to populate the public.users table.
      const {error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            department: formData.department,
          },
        },
      });

      if (signUpError) {
        // If Supabase returns an error (e.g., user already exists), throw it.
        throw signUpError;
      }
      
      // If sign-up is successful, show the success message.
      setSuccess(true);

    } catch (err) {
      console.error("Registration failed:", err);
      // Display a user-friendly error message.
      setError(err instanceof Error ? err.message : "Gagal melakukan pendaftaran. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
  // --- END OF CORRECTED SUBMIT FUNCTION ---

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
            <CardContent className="pt-8 text-center space-y-6">
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Pendaftaran Berhasil!
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Akun Anda telah berhasil dibuat. Silakan kembali ke halaman login untuk masuk.
                </p>
              </div>
              <Button asChild className="w-full h-14 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg">
                <Link href="/login">
                  <span>Kembali ke Halaman Login</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <style jsx>{`
          @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <FloatingParticles />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                    Bergabung dengan Ziswaf KMS
                  </h1>
                  <p className="text-xl text-cyan-200 font-medium">Mulai perjalanan knowledge sharing Anda</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                <h3 className="font-bold text-white text-2xl mb-6 flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 mr-3 fill-current" />
                  Keuntungan Bergabung
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200">Akses unlimited ke seluruh knowledge base perusahaan</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200">Kolaborasi real-time dengan tim lintas departemen</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200">Dashboard analytics untuk tracking performance</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                  <Users className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="text-sm text-gray-300">Active Users</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                  <Shield className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">99.9%</p>
                  <p className="text-sm text-gray-300">Uptime</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                  <Zap className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-sm text-gray-300">Support</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
              <CardHeader className="space-y-4 text-center pb-6">
                <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:hidden shadow-2xl">
                  <BookOpen className="w-12 h-12 text-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Buat Akun Baru
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    Lengkapi informasi di bawah untuk bergabung dengan tim terbaik
                  </CardDescription>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5">
                  {error && (<Alert variant="destructive" className="border-red-200 bg-red-50"><AlertDescription className="text-red-700">{error}</AlertDescription></Alert>)}
                  <div className="space-y-2"><Label htmlFor="name" className="text-sm font-semibold text-gray-700">Nama Lengkap*</Label><Input id="name" type="text" placeholder="Masukkan nama lengkap Anda" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"/></div>
                  <div className="space-y-2"><Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address*</Label><Input id="email" type="email" placeholder="nama@perusahaan.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"/></div>
                  <div className="space-y-2"><Label htmlFor="department" className="text-sm font-semibold text-gray-700">Departemen*</Label><Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}><SelectTrigger className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"><SelectValue placeholder="Pilih departemen Anda" /></SelectTrigger><SelectContent>{departments.map((dept) => (<SelectItem key={dept} value={dept}>{dept}</SelectItem>))}</SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password*</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} placeholder="Minimal 8 karakter" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} required className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl pr-12"/><Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>{showPassword ? (<EyeOff className="h-5 w-5 text-gray-400" />) : (<Eye className="h-5 w-5 text-gray-400" />)}</Button></div></div>
                  <div className="space-y-2"><Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Konfirmasi Password*</Label><div className="relative"><Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Ulangi password Anda" value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} required className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl pr-12"/><Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? (<EyeOff className="h-5 w-5 text-gray-400" />) : (<Eye className="h-5 w-5 text-gray-400" />)}</Button></div></div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-4">
                  <Button type="submit" className="w-full h-14 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 text-white font-semibold rounded-xl" disabled={isLoading}>{isLoading ? (<div className="flex items-center space-x-2"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Memproses...</span></div>) : (<div className="flex items-center space-x-2"><span>Daftar Sekarang</span><Sparkles className="w-4 h-4" /></div>)}</Button>
                  <div className="text-center text-sm text-gray-600">Sudah memiliki akun?{" "}<Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">Masuk di sini</Link></div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .grid-pattern-overlay { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}