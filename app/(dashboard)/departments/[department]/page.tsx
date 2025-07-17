// ngejerwisokto/app/(dashboard)/departments/[department]/page.tsx

import { notFound } from "next/navigation";
import { DepartmentDetailView } from "./_components/department-detail-view";
import type { Document } from "@/lib/supabase";

interface DepartmentDetailPageProps {
  params: { department: string };
}

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

const mockDocuments: Document[] = [
  { id: 'doc1', title: 'Panduan Penyaluran Dana (Mockup)', file_type: 'PDF', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_starred: true, description: 'Ini adalah contoh deskripsi untuk dokumen mockup.', document_type: 'file', category: 'Panduan', department: 'Pendayagunaan', tags: ['mockup', 'contoh'], uploaded_by: null, is_mandatory: false, verification_status: 'approved', version: '1.0', priority: 'medium', access_level: 'departmental', language: 'id', author: 'Sistem Mockup' },
  { id: 'doc2', title: 'Laporan Kegiatan Bulan Lalu (Mockup)', file_type: 'XLSX', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_starred: false, description: 'Contoh laporan kegiatan dalam format spreadsheet.', document_type: 'file', category: 'Laporan', department: 'Pendayagunaan', tags: ['laporan', 'bulanan'], uploaded_by: null, is_mandatory: true, verification_status: 'pending', version: '1.1', priority: 'high', access_level: 'departmental', language: 'id', author: 'Sistem Mockup' },
];

// --- PERBAIKAN: Tambahkan kata kunci 'async' ---
export default async function DepartmentDetailPage({ params }: DepartmentDetailPageProps) {
  const { department } = params;
  const departmentSlug = department.toLowerCase();
  const departmentData = departmentInfo[departmentSlug];

  if (!departmentData) {
    notFound();
  }

  return (
    <DepartmentDetailView
      departmentData={departmentData}
      documents={mockDocuments}
    />
  );
}