// app/(dashboard)/documents/page.tsx (FINAL, CORRECTED VERSION)

// Hapus semua impor terkait Supabase dan async
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DocumentList } from "./_components/document-list";

// Halaman ini sekarang menjadi komponen sinkron yang sederhana.
export default function DocumentsPage() {
  
  // Semua logika pengambilan data telah dipindahkan ke <DocumentList />.
  // Komponen ini hanya bertanggung jawab untuk me-render layout halaman.
  // Ini menghindari bug pada static analyzer Next.js v15.

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semua Dokumen</h1>
          <p className="text-muted-foreground">Kelola dan akses semua dokumen dalam sistem</p>
        </div>
        <Button asChild>
          <Link href="/documents/add">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Dokumen
          </Link>
        </Button>
      </div>
      
      {/* Komponen DocumentList sekarang akan mengambil datanya sendiri di sisi klien */}
      <DocumentList />
    </div>
  );
}