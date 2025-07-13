import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { NotificationProvider } from "@/hooks/use-notifications" 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      <SidebarProvider>
        <AppSidebar />
        {/* We use SidebarInset which is a <main> tag */}
        <SidebarInset>
          {/* The header is now a direct child of the main container */}
          <DashboardHeader />
          
          {/* This div becomes the scrollable content area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </NotificationProvider>
  )
}