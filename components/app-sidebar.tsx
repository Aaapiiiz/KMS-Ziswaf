// components/app-sidebar.tsx

"use client"

import type * as React from "react"
import {
  BookOpen,
  Home,
  Users,
  CheckCircle,
  GalleryVerticalEnd,
  Settings,
  PieChart,
  Bell,
  Shield,
  FileText,
  Activity, // Used for 'Aktivitas' now
} from "lucide-react"

import { useAuth } from "@/hooks/use-auth"
import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"

// More accurate data structure
const data = {
  teams: [
    {
      name: "KMS Ziswaf",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "/dashboard",
    //   icon: Home,
    // },
    {
      title: "Dokumen",
      url: "/documents",
      icon: FileText,
      items: [
        { title: "Semua Dokumen", url: "/documents" },
        { title: "Dokumen Terbaru", url: "/documents/recent" },
        // { title: "Tambah Dokumen", url: "/documents/add" },
      ],
    },
    {
      // *** THE FIX IS HERE ***
      // This is now a direct link, not a collapsible menu.
      title: "Departemen",
      url: "/departments", // Points directly to the main departments page
      icon: BookOpen,
      // The 'items' array has been removed.
    },
    // {
    //   title: "Aktivitas",
    //   url: "/activities",
    //   icon: Activity, // More appropriate icon
    // },
    { title: "Permintaan Pengetahuan", url: "/knowledge-requests", icon: PieChart },
    { title: "Notifikasi", url: "/notifications", icon: Bell },
  ],
  adminNav: [
    {
      name: "Manajemen Pengguna",
      url: "/admin/users",
      icon: Users,
    },
    {
      name: "Verifikasi Dokumen",
      url: "/admin/verification",
      icon: CheckCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userRole, loading } = useAuth()

  // --- DEBUGGING LOG ---
  console.log("AppSidebar Render:", { loading, userRole });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* Main navigation for everyone */}
        <NavMain items={data.navMain} />

        {/* Conditional rendering for the Admin Panel */}
        {loading ? (
          // While loading, show a skeleton placeholder
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
        ) : userRole === 'admin' ? (
          // After loading, if user is an admin, show the real panel
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Admin Panel
            </SidebarGroupLabel>
            <SidebarMenu>
              {data.adminNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}