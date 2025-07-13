"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { UserNav } from "@/components/user-nav" // <-- Import UserNav

export function DashboardHeader({ showBreadcrumb = true }: { showBreadcrumb?: boolean }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        
        {/* Conditionally render the separator and breadcrumb */}
        {showBreadcrumb && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </>
        )}

      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  )
}