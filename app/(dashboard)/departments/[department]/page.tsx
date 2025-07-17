// app/(dashboard)/departments/[department]/page.tsx

// --- PERUBAHAN ---
// Hapus semua import yang berhubungan dengan Supabase dan server-side
import { notFound } from "next/navigation";
import { DepartmentDetailView } from "./_components/department-detail-view";
import type { Document } from "@/lib/supabase"; // Kita tetap butuh tipenya untuk mock data

// Halaman ini tidak lagi perlu 'export const dynamic = 'force-dynamic';'

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

// --- DITAMBAHKAN: Data Dokumen Mockup ---
// Kita membuat data palsu di sini dengan struktur yang sama persis seperti dari Supabase.
const mockDocuments: Document[] = [
  {
    id: "doc-mock-1",
    title: "Panduan Mockup Departemen 2024",
    description: "Ini adalah deskripsi untuk dokumen panduan mockup.",
    file_type: "PDF",
    created_at: new Date().toISOString(),
    is_starred: true,
    is_mandatory: false,
    // Anda bisa menambahkan properti lain sesuai tipe 'Document' jika diperlukan oleh komponen
  } as Document, // 'as Document' untuk memastikan tipe datanya benar
  {
    id: "doc-mock-2",
    title: "Laporan Kinerja Mockup Bulan Ini",
    description: "Laporan kinerja yang dibuat dari data statis.",
    file_type: "XLSX",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 hari yang lalu
    is_starred: false,
    is_mandatory: true,
  } as Document,
];
// --- SELESAI PENAMBAHAN MOCK DATA ---


interface PageProps {
  params: { department: string }
}

// --- PERUBAHAN: Hapus 'async' dari fungsi ---
export default function DepartmentDetailPage({ params }: PageProps) {
  const { department } = params;
  const departmentSlug = department.toLowerCase();
  const departmentData = departmentInfo[departmentSlug];

  if (!departmentData) {
    notFound();
  }

  // --- DIHAPUS: Semua kode yang berhubungan dengan Supabase telah dihapus dari file ini. ---
  // const supabase = createServerComponentClient({ cookies });
  // await supabase.auth.getSession();
  // const { data: documents, error } = await supabase...

  return (
    <DepartmentDetailView
      departmentData={departmentData}
      // --- PERUBAHAN: Gunakan data mockup yang sudah kita buat ---
      documents={mockDocuments}
    />
  );
}