// app/providers.tsx (FILE BARU)

"use client"; // Komponen ini adalah 'Client Component' karena menggunakan state dan context.

import type React from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthProvider } from "@/hooks/use-auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NotificationProvider } from "@/hooks/use-notifications";

// Komponen ini akan menjadi satu-satunya tempat untuk semua provider client-side
export function Providers({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  return (
    <AuthProvider initialSession={initialSession}>
      <SidebarProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}