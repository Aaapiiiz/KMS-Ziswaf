// app/(dashboard)/departments/[department]/page.tsx (Corrected)

import { notFound } from "next/navigation";
import { DepartmentDetailView } from "./_components/department-detail-view";
import { createSupabaseServerClient } from "@/lib/supabase/server"; // Asumsi path ini benar
import type { Document } from "@/lib/supabase/client"; // Asumsi path ini benar

// This line is crucial for the production build and strict static analysis.
export const dynamic = 'force-dynamic';

const departmentInfo: { [key: string]: { name: string; description: string; head: string; headAvatar: string; members: number } } = {
  pendayagunaan: { name: "Pendayagunaan", description: "Departemen yang bertanggung jawab atas penyaluran dan pendayagunaan dana ziswaf.", head: "Budi Santoso", headAvatar: "/placeholder.svg?height=40&width=40", members: 12 },
  penghimpunan: { name: "Penghimpunan", description: "Bertanggung jawab atas strategi dan eksekusi penghimpunan dana ZISWAF.", head: "Siti Nurhaliza", headAvatar: "/placeholder.svg?height=40&width=40", members: 8 },
  keuangan: { name: "Keuangan", description: "Mengelola administrasi keuangan dan pelaporan dana ziswaf.", head: "Siti Nurhaliza", headAvatar: "/placeholder.svg?height=40&width=40", members: 8 },
  marketing: { name: "Marketing", description: "Bertanggung jawab atas komunikasi dan promosi program.", head: "Maya Sari", headAvatar: "/placeholder.svg?height=40&width=40", members: 6 },
  it: { name: "IT", description: "Mengelola infrastruktur dan sistem teknologi informasi.", head: "Admin Ziswaf", headAvatar: "/placeholder.svg?height=40&width=40", members: 4 },
  sdm: { name: "SDM", description: "Mengelola sumber daya manusia dan kepegawaian.", head: "Admin Ziswaf", headAvatar: "/placeholder.svg?height=40&width=40", members: 5 },
  penyaluran: { name: "Penyaluran", description: "Mengelola proses penyaluran bantuan kepada mustahik.", head: "Budi Santoso", headAvatar: "/placeholder.svg?height=40&width=40", members: 10 },
  audit: { name: "Audit", description: "Melakukan audit internal untuk memastikan kepatuhan dan transparansi.", head: "Admin Ziswaf", headAvatar: "/placeholder.svg?height=40&width=40", members: 3 },
};

interface PageProps {
  params: { department: string }
}

async function getDepartmentDocuments(departmentName: string) {
  // FIX: Added 'await' to resolve the Supabase client promise
  const supabase = await createSupabaseServerClient();
  
  // This call is optional but good practice for ensuring session is fresh
  await supabase.auth.getSession(); 

  const { data: documents, error } = await supabase
    .from('documents')
    .select('*')
    .eq('department', departmentName);
    
  if (error) {
    console.error("Error fetching documents for department:", error.message);
    return [];
  }
  // FIX: Ensure the return type matches the expected Document[]
  return (documents as Document[]) || [];
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const departmentSlug = params.department.toLowerCase();
  const departmentData = departmentInfo[departmentSlug];

  if (!departmentData) {
    notFound();
  }

  const documents = await getDepartmentDocuments(departmentData.name);

  return (
    <DepartmentDetailView
      departmentData={departmentData}
      documents={documents}
    />
  );
}