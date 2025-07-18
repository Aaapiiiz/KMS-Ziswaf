// app/(dashboard)/layout.tsx (Tambahkan Route Protection)
"use client"; // Jadikan ini Client Component untuk menggunakan hooks

import type React from "react";
import { useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation"; // Import useRouter
import { useAuth } from "@/hooks/use-auth"; // Import useAuth
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // --- PERBAIKAN UTAMA DI SINI ---
  useEffect(() => {
    // Jika proses loading selesai dan TIDAK ada user,
    // maka paksa redirect ke halaman login.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]); // Efek ini akan berjalan setiap kali user atau loading berubah

  // Tampilkan state loading agar tidak ada "kedipan" UI yang aneh
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Jika user ada, tampilkan layout dashboard
  // Kita tambahkan pengecekan `user` di sini untuk mencegah render sesaat
  // sebelum redirect terjadi.
  if (user) {
    return (
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
        </main>
      </div>
    );
  }
  
  // Jika tidak loading dan tidak ada user, jangan render apa-apa
  // sementara menunggu redirect selesai.
  return null;
}