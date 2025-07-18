// hooks/use-auth.tsx (Final Corrected Version)

"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // useRouter tetap dibutuhkan untuk logout
import { supabase } from "@/lib/supabase/client";
import type { User as AppUser } from "@/lib/supabase/client"; 

interface AuthContextType {
  user: AppUser | null;
  userRole: "admin" | "user" | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// FIX 1: Ganti React.Node menjadi React.ReactNode
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // FIX 2: Kembalikan useRouter karena dibutuhkan oleh fungsi logout baru
  const router = useRouter(); 
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const getSessionAndProfile = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("users")
          .select(`*`)
          .eq("id", session.user.id)
          .single();
        setUser(profile as AppUser ?? null);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Gagal mengambil sesi atau profil:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      getSessionAndProfile();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [getSessionAndProfile]);

  const value: AuthContextType = {
    user,
    userRole: user?.role ?? null,
    loading,
    login: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error }; 
    },
    logout: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
      }
      // Pindahkan router.push ke sini untuk memastikan redirect terjadi setelah signOut selesai
      // Ini lebih baik daripada mengandalkan layout, karena ini adalah aksi langsung.
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