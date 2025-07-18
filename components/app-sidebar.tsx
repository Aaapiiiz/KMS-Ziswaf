// components/app-sidebar.tsx
"use client"

import type * as React from "react"
import { GalleryVerticalEnd, PieChart, Bell, FileText, GraduationCap, Shield } from "lucide-react"; // CORRECTED: Removed BookOpen
import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import { AdminSidebarMenu } from "@/components/admin-sidebar-menu"
import { ClientOnly } from "@/components/client-only"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, SidebarGroup, SidebarMenu, SidebarMenuSkeleton, SidebarGroupLabel } from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "KMS Ziswaf",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dokumen",
      url: "/documents",
      icon: FileText,
      items: [
        { title: "Semua Dokumen", url: "/documents" },
        { title: "Dokumen Terbaru", url: "/documents/recent" },
      ],
    },
    {
      title: "Program",
      url: "/programs",
      icon: GraduationCap,
    },
    // { // Departemen link is disabled as requested
    //   title: "Departemen",
    //   url: "/departments",
    //   icon: BookOpen,
    // },
    { title: "Permintaan Pengetahuan", url: "/knowledge-requests", icon: PieChart },
    { title: "Notifikasi", url: "/notifications", icon: Bell },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const AdminMenuFallback = (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center">
        <Shield className="mr-2 h-4 w-4" />
        Admin Panel
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuSkeleton showIcon />
        <SidebarMenuSkeleton showIcon />
      </SidebarMenu>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <ClientOnly fallback={AdminMenuFallback}>
          <AdminSidebarMenu />
        </ClientOnly>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}