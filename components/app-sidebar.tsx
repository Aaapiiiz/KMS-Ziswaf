"use client"

import type * as React from "react"
import {
  BookOpen,
  Users,
  CheckCircle,
  GalleryVerticalEnd,
  PieChart,
  Bell,
  Shield,
  FileText,
  GraduationCap, // Added Icon
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
    {
      title: "Dokumen",
      url: "/documents",
      icon: FileText,
      items: [
        { title: "Semua Dokumen", url: "/documents" },
        { title: "Dokumen Terbaru", url: "/documents/recent" },
      ],
    },
    // *** NEW MENU ITEM FOR PROGRAMS ***
    {
      title: "Program",
      url: "/programs",
      icon: GraduationCap,
      // items: [
      //   { title: "Ikhtisar Program", url: "/programs" },
      //   { title: "Beasiswa", url: "/programs/scholarships" },
      //   { title: "Bantuan Sosial", url: "/programs/social-aid" },
      // ],
    },
    {
      title: "Departemen",
      url: "/departments", 
      icon: BookOpen,
    },
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