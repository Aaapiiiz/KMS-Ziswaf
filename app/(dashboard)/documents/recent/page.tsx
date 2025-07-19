// app/(dashboard)/documents/recent/page.tsx

import { createSupabaseServerClient } from "@/lib/supabase/server"; // CORRECTED: Use the new server client
import type { Document } from "@/lib/supabase/client";
import { RecentDocumentList } from "./_components/recent-document-list";

export const dynamic = 'force-dynamic';

type DocumentWithUploader = Document & {
  uploaded_by: { name: string; email: string } | null;
};

async function getRecentDocuments() {
  const supabase = await createSupabaseServerClient(); // <-- FIX: Add 'await'

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  await supabase.auth.getSession();

  const { data: documents, error } = await supabase
    .from("documents")
    .select(`*, uploaded_by ( name, email )`)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recent documents:", error);
    return [];
  }
  return documents || [];
}

export default async function RecentDocumentsPage() {
  const documents = await getRecentDocuments();

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Dokumen Terbaru</h1>
        <p className="text-gray-600">Dokumen yang ditambahkan atau diperbarui dalam 30 hari terakhir.</p>
      </div>
      <RecentDocumentList initialDocuments={(documents as DocumentWithUploader[]) || []} />
    </div>
  );
}