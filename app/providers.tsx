// app/providers.tsx

"use client";

import type React from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NotificationProvider } from "@/hooks/use-notifications";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}