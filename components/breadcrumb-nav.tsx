// components/breadcrumb-nav.tsx (Corrected and Cleaned Up)
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getDynamicBreadcrumbLabel } from "@/app/actions";

const staticLabels: Record<string, string> = {
  dashboard: "Dashboard",
  documents: "Dokumen",
  add: "Tambah Dokumen",
  view: "View",
  departments: "Departemen",
  activities: "Aktivitas",
  admin: "Admin",
  users: "Manajemen Pengguna",
  profile: "Profil",
  settings: "Pengaturan",
  password: "Ubah Password",
  pendayagunaan: "Pendayagunaan",
  penghimpunan: "Penghimpunan",
  recent: "Dokumen Terbaru",
  "knowledge-requests": "Permintaan Pengetahuan",
  notifications: "Notifikasi",
  verification: "Verifikasi",
  "social-aid": "Bantuan Sosial",
  scholarships: "Beasiswa",
  programs: "Program",
};

export function BreadcrumbNav() {
  const pathname = usePathname();
  const [dynamicLabels, setDynamicLabels] = useState<Record<string, string>>({});
  const segments = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);

  const fetchLabels = useCallback(async () => {
    const newLabels: Record<string, string> = {};
    const labelsToFetch: Promise<void>[] = [];
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const prevSegment = segments[i - 1];
      if (!staticLabels[segment] && !dynamicLabels[segment]) {
        const fetchPromise = getDynamicBreadcrumbLabel(segment, prevSegment).then(label => {
          if (label) newLabels[segment] = label;
        });
        labelsToFetch.push(fetchPromise);
      }
    }
    await Promise.all(labelsToFetch);
    if (Object.keys(newLabels).length > 0) {
      setDynamicLabels(prev => ({ ...prev, ...newLabels }));
    }
  }, [segments, dynamicLabels]);

  useEffect(() => {
    fetchLabels();
  }, [pathname, fetchLabels]);

  if (segments.length <= 1 && segments[0] === 'dashboard') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbPage className="flex items-center gap-1"><Home className="h-4 w-4" />Dashboard</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard" className="flex items-center gap-1"><Home className="h-4 w-4" /></Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = segment === 'admin' 
            ? '/dashboard' 
            : "/" + segments.slice(0, index + 1).join("/");
          
          const label = dynamicLabels[segment] || staticLabels[segment] || segment;
          
          // --- PERUBAHAN DI SINI ---
          // Menghapus variabel 'isAdminSegmentAndNotLast' yang tidak digunakan.

          return (
            <React.Fragment key={href + index}>
              <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}