// hooks/use-auth.tsx (Final Version with ESLint Fix)

"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
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

    // --- PERUBAHAN DI SINI ---
    // Hapus parameter _event and session karena tidak digunakan
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      // Jika ada perubahan sesi (login/logout), panggil getSessionAndProfile lagi
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
      await supabase.auth.signOut();
      setUser(null);
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