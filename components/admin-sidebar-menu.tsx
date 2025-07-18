"use client";

import {
  Users,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";

// Data ini spesifik untuk menu admin
const adminNav = [
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
];

export function AdminSidebarMenu() {
    const { userRole, loading } = useAuth();

    // Selama SSR dan hidrasi awal, loading akan true. Tampilkan skeleton.
    if (loading) {
        return (
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
    }

    // Setelah loading selesai, jika user adalah admin, tampilkan menu.
    if (userRole === 'admin') {
        return (
            <SidebarGroup>
                <SidebarGroupLabel className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                </SidebarGroupLabel>
                <SidebarMenu>
                    {adminNav.map((item) => (
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
        );
    }

    // Jika bukan admin atau tidak login, jangan render apa pun.
    return null;
}