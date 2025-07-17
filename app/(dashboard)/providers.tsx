// app/(dashboard)/providers.tsx

"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { NotificationProvider } from "@/hooks/use-notifications";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Session } from "@supabase/supabase-js";

export function Providers({
  children,
  initialSession, // Terima prop sesi
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  return (
    // Teruskan sesi ke AuthProvider
    <AuthProvider initialSession={initialSession}>
      <NotificationProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}