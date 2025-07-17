// app/(dashboard)/layout.tsx

import type React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

// Layout ini sekarang sangat sederhana dan tidak perlu tahu tentang provider.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}