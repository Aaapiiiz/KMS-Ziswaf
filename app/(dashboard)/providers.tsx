// app/(dashboard)/providers.tsx

"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { NotificationProvider } from "@/hooks/use-notifications";
import { SidebarProvider } from "@/components/ui/sidebar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // The AuthProvider here gives auth context to all dashboard pages.
    <AuthProvider>
      <NotificationProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}