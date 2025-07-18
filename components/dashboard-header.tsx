// components/dashboard-header.tsx
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "@/components/user-nav";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ClientOnly } from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadcrumbNav />
      </div>
      <div className="ml-auto flex items-center gap-4">
        {/* Bungkus UserNav dengan ClientOnly dan berikan fallback */}
        <ClientOnly fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
          <UserNav />
        </ClientOnly>
      </div>
    </header>
  );
}