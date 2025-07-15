// app/(auth)/layout.tsx
// This file is already correct.

import { AuthProvider } from "@/hooks/use-auth";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}