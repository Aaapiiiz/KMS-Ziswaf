// app/(dashboard)/layout.tsx

import type React from "react";
import { Providers } from "./providers";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Jadikan layout ini async untuk bisa mengambil data
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  
  // Ambil sesi di sini, di sisi server. Ini adalah cara yang aman.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    // Kirim sesi dari server ini ke komponen Providers di client
    <Providers initialSession={session}>
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