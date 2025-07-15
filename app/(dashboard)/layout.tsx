// app/(dashboard)/layout.tsx

import type React from "react";
import { Providers } from "./providers"; // Import the Providers component
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The Providers component creates the "use client" boundary.
    <Providers>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </Providers>
  );
}