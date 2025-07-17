// hooks/use-auth.tsx

"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Pastikan diimpor dari 'next/navigation'
import { supabase } from "@/lib/supabase";
import type { User as AppUser } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: AppUser | null;
  userRole: "admin" | "user" | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const router = useRouter(); // Inisialisasi router di sini
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fungsi terpadu untuk memproses sesi dan mengambil profil dari DB
  // Dibuat dengan useCallback agar tidak dibuat ulang di setiap render
  const processSessionAndProfile = useCallback(async (session: Session | null) => {
    if (!session?.user) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from("users")
        .select(`*`)
        .eq("id", session.user.id)
        .single();
      
      if (error) {
        // Jika profil tidak ditemukan, logout paksa
        console.error("Gagal mengambil profil, melakukan logout:", error);
        await supabase.auth.signOut();
        return;
      }
      
      setUser(profile as AppUser);

    } catch (e) {
      console.error("Error saat memproses sesi:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Proses sesi dari server sekali saja saat komponen pertama kali dimuat
  useEffect(() => {
    processSessionAndProfile(initialSession);
  }, [initialSession, processSessionAndProfile]);

  // Pasang listener untuk memantau perubahan login/logout di sisi client
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Jika ada perubahan, proses lagi sesi yang baru.
        // Ini akan menangani login/logout secara otomatis.
        processSessionAndProfile(session);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [processSessionAndProfile]);

  const value = {
    user,
    userRole: user?.role ?? null,
    loading,
    login: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Tidak perlu redirect di sini, onAuthStateChange akan menanganinya
    },
    logout: async () => {
      await supabase.auth.signOut();
      // Navigasi ke halaman login setelah logout berhasil
      router.push('/login');
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}