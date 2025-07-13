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
  // These were from the TeamSwitcher, keeping them for the data object
  GalleryVerticalEnd, 
} from "lucide-react"

import { useAuth } from "@/hooks/use-auth"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher" // <-- Re-import TeamSwitcher
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

function NavAdmin({
  items,
}: {
  items: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}) {
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
  user: {
    name: "Admin KMS",
    email: "admin@ziswaf.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  // Data for the TeamSwitcher
  teams: [
    {
      name: "KMS Ziswaf",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "/dashboard",
    //   icon: SquareTerminal,
    //   isActive: true,
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
  ],
  projects: [
    { name: "Aktivitas", url: "/activities", icon: Frame },
    { name: "Permintaan Pengetahuan", url: "/knowledge-requests", icon: PieChart },
    { name: "Notifikasi", url: "/notifications", icon: Map },
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
  const { user, userRole } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Add the TeamSwitcher back */}
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        
        {userRole === 'admin' && <NavAdmin items={data.adminNav} />}
      </SidebarContent>
      
      {userRole !== 'admin' && user && (
          <SidebarFooter>
            <NavUser user={user} />
          </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  )
}