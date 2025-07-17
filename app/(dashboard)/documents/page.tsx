// app/(dashboard)/documents/page.tsx

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Document } from "@/lib/supabase";
import { DocumentList } from "./_components/document-list";

export const dynamic = 'force-dynamic';

type DocumentWithUploader = Document & {
  uploaded_by: { name: string; email: string } | null;
};

export default async function DocumentsPage() {
  const supabase = createServerComponentClient({ cookies });
  
  // --- FIX IS HERE ---
  // Pastikan sesi diambil SEBELUM melakukan query lain.
  await supabase.auth.getSession();

  const { data: documents, error } = await supabase
    .from("documents")
    .select(`*, uploaded_by ( name, email )`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching documents:", error);
  }

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
      <DocumentList initialDocuments={(documents as DocumentWithUploader[]) || []} />
    </div>
  );
}