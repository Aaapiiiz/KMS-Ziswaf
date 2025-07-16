// ngejerwisokto/hooks/use-auth.tsx

"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User as AppUser } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

interface AuthState {
  user: AppUser | null;
  userRole: "admin" | "user" | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    userRole: null,
    loading: true,
  });

  const processSession = useCallback(async (session: Session | null) => {
    if (!session?.user) {
      setAuthState({ user: null, userRole: null, loading: false });
      return;
    }

    const roleFromToken = session.user.app_metadata?.user_role as "admin" | "user" | null;
    const userId = session.user.id;

    try {
      console.log(`FINAL DIAGNOSTIC: Attempting to fetch profile for user ID: ${userId}`);
      
      const { data: userArray, error: dbError } = await supabase
        .from("users")
        .select(`*`)
        .eq("id", userId);

      console.log("FINAL DIAGNOSTIC: Raw query result:", { data: userArray, error: dbError });

      if (dbError) {
          console.error("FINAL DIAGNOSTIC: The database returned a direct error.");
          throw dbError;
      }

      if (!userArray || userArray.length === 0) {
        console.error("FINAL DIAGNOSTIC: Query succeeded but returned 0 rows. This means RLS is blocking the SELECT or the user row does not exist.");
        throw new Error("No profile found for this user ID.");
      }

      const profile = userArray[0];
      console.log("FINAL DIAGNOSTIC: Profile fetched successfully.");
      setAuthState({
        user: profile as AppUser,
        userRole: roleFromToken || (profile.role as "admin" | "user"),
        loading: false,
      });

    } catch (e: unknown) {
      console.error("CRITICAL: Failed to fetch user profile from DB.");
      console.error("FINAL DIAGNOSTIC: Full error object:", e);

      await supabase.auth.signOut();
      setAuthState({ user: null, userRole: null, loading: false });
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      processSession(session);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      processSession(session);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [processSession]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Supabase login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const value = { ...authState, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}