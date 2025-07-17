// app/layout.tsx

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import yang diperlukan
import { Providers } from "./providers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ziswaf KMS - Knowledge Management System",
  description: "Sistem Manajemen Pengetahuan untuk Ziswaf",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="id">
      <body className={inter.className}>
        <Providers initialSession={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}