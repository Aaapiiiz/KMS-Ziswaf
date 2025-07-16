// ngejerwisokto/app/(dashboard)/departments/[department]/page.tsx

import { notFound } from "next/navigation";
import { DepartmentDetailView } from "./_components/department-detail-view";

// Hapus semua impor terkait Supabase dan `async` dari sini.

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

// Komponen ini sekarang SINKRON dan tidak lagi menyebabkan bug.
export default function DepartmentDetailPage({ params }: { params: { department: string } }) {
  const { department } = params;
  const departmentSlug = department.toLowerCase();
  const departmentData = departmentInfo[departmentSlug];

  if (!departmentData) {
    notFound();
  }

  // Kita hanya meneruskan data statis. Komponen di bawah ini akan mengambil datanya sendiri.
  return (
    <DepartmentDetailView
      departmentData={departmentData}
    />
  );
}