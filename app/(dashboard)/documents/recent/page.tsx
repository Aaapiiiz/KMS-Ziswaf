// app/(dashboard)/documents/recent/page.tsx (FINAL, COMPLETE VERSION)

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Document } from "@/lib/supabase";
import { RecentDocumentList } from "./_components/recent-document-list";

// This type definition helps TypeScript understand the shape of our joined data.
type DocumentWithUploader = Document & {
  uploaded_by: { name: string; email: string } | null;
};

export default async function RecentDocumentsPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Use the direct query method with a date filter.
  // The RLS policies we set up will allow this to work correctly.
  // Correct code for app/(dashboard)/documents/recent/page.tsx
const { data: documents, error } = await supabase
  .from("documents")
  .select(`*, uploaded_by ( name, email )`)
  .gte('created_at', thirtyDaysAgo.toISOString())
  .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recent documents:", error);
  }

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