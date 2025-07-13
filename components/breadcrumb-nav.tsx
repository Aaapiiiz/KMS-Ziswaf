"use client"

import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const pathLabels: Record<string, string> = {
  dashboard: "Dashboard",
  documents: "Dokumen",
  departments: "Departemen",
  programs: "Program",
  activities: "Aktivitas",
  notifications: "Notifikasi",
  admin: "Admin",
  users: "Manajemen User",
  verification: "Verifikasi Dokumen",
  "data-input": "Input Data",
  recent: "Dokumen Terbaru",
  mandatory: "Dokumen Wajib",
  favorites: "Favorit",
  search: "Pencarian",
  add: "Tambah Dokumen",
  scholarships: "Beasiswa",
  "social-aid": "Bantuan Sosial",
  "knowledge-requests": "Permintaan Pengetahuan",
  pendayagunaan: "Pendayagunaan",
  penghimpunan: "Penghimpunan",
  penyaluran: "Penyaluran",
  keuangan: "Keuangan",
  profile: "Profil",
  settings: "Pengaturan",
  password: "Ubah Password",
  preferences: "Preferensi",
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  if (pathSegments.length === 0 || pathSegments[0] === "dashboard") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/")
          const label = pathLabels[segment] || segment
          const isLast = index === pathSegments.length - 1

          return (
            <div key={segment} className="flex items-center gap-1">
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
