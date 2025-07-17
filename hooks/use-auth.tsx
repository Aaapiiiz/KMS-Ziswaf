// hooks/use-auth.tsx

"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
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
  initialSession, // Terima sesi yang sudah diambil oleh server
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null);
  const [loading, setLoading] = useState(true);

  // Fungsi terpadu untuk memproses sesi dan mengambil profil dari DB
  const processSessionAndProfile = useCallback(async (session: Session | null) => {
    if (!session?.user) {
      setUser(null);
      setUserRole(null);
      setLoading(false); // Selesai loading, tidak ada user
      return;
    }

    try {
      // Ambil profil dari tabel 'users' berdasarkan ID dari sesi
      const { data: profile, error } = await supabase
        .from("users")
        .select(`*`)
        .eq("id", session.user.id)
        .single();
      
      if (error) throw error; // Jika query gagal, lempar error

      if (profile) {
        setUser(profile as AppUser);
        setUserRole(profile.role);
      } else {
        // Kasus penting: Sesi ada tapi profil tidak ditemukan di DB.
        // Anggap sebagai tidak terotentikasi.
        setUser(null);
        setUserRole(null);
      }
    } catch (e) {
      console.error("Gagal mengambil profil pengguna:", e);
      setUser(null);
      setUserRole(null);
    } finally {
      // Pastikan loading selalu selesai, apa pun hasilnya.
      setLoading(false);
    }
  }, []);

  // Di sisi client, hanya proses sesi awal dari server SEKALI SAJA.
  useEffect(() => {
    processSessionAndProfile(initialSession);
  }, [initialSession, processSessionAndProfile]);

  // Kemudian, pasang listener untuk memantau perubahan login/logout di client.
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Jika ada perubahan, proses lagi sesi yang baru.
        processSessionAndProfile(session);
      }
    );
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [processSessionAndProfile]);

  const value = {
    user,
    userRole,
    loading,
    login: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    logout: async () => {
      await supabase.auth.signOut();
      setUser(null);
      setUserRole(null);
    },
  };

  // Hilangkan logika `if (loading) return null`.
  // Biarkan komponen anak yang memutuskan apa yang ditampilkan saat loading.
  // Ini akan menghilangkan masalah "layar putih".
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}