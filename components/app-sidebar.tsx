"use client"

import type * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Shield,
  Users,
  CheckCircle,
  GalleryVerticalEnd, 
} from "lucide-react"

import { useAuth } from "@/hooks/use-auth"
import { NavMain } from "@/components/nav-main"
// NavProjects is no longer needed
// import { NavProjects } from "@/components/nav-projects" 
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

// ... (NavAdmin component remains the same) ...
function NavAdmin({ items }: { items: { name: string, url: string, icon: React.ElementType }[] }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center">
        <Shield className="mr-2 h-4 w-4" />
        Admin Panel
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
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
  )
}


const data = {
  teams: [
    {
      name: "KMS Ziswaf",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  // UPDATED: All main navigation items are now in this single array
  navMain: [
    // { 
    //   title: "Dashboard",
    //   url: "/dashboard", 
    //   icon: SquareTerminal, 
    // },
    {
      title: "Dokumen",
      url: "/documents",
      icon: Bot,
      items: [
        { title: "Semua Dokumen", url: "/documents" },
        { title: "Dokumen Terbaru", url: "/documents/recent" },
      ],
    },
    {
      title: "Departemen",
      url: "/departments",
      icon: BookOpen,
      items: [
        { title: "Pendayagunaan", url: "/departments/pendayagunaan" },
        { title: "Penghimpunan", url: "/departments/penghimpunan" },
        { title: "Penyaluran", url: "/departments/penyaluran" },
        { title: "Keuangan", url: "/departments/keuangan" },
      ],
    },
    {
      title: "Program",
      url: "/programs",
      icon: Settings2,
      items: [
        { title: "Beasiswa", url: "/programs/scholarships" },
        { title: "Bantuan Sosial", url: "/programs/social-aid" },
      ],
    },
    // { title: "Aktivitas", url: "/activities", icon: Frame },
    { title: "Permintaan Pengetahuan", url: "/knowledge-requests", icon: PieChart },
    { title: "Notifikasi", url: "/notifications", icon: Map },
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
  const { userRole } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* The single NavMain component now renders everything */}
        <NavMain items={data.navMain} />
        
        {/* The NavProjects component is now removed */}
        
        {userRole === 'admin' && <NavAdmin items={data.adminNav} />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}