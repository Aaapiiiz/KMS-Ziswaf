// app/(dashboard)/documents/recent/page.tsx (FINAL CORRECTED VERSION)
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Document } from "@/lib/supabase";
import { RecentDocumentList } from "./_components/recent-document-list";

type DocumentWithUploader = Document & {
  uploaded_by: { name: string; email: string } | null;
};

export default async function RecentDocumentsPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Use the direct query, NOT the RPC function
  const { data: documents, error } = await supabase
    .from("documents")
    .select(`*, uploaded_by ( name, email )`)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: false });

  if (error) { console.error("Error fetching recent documents:", error); }

  return (
    <div className="space-y-6">
      {/*...rest of the component...*/}
      <RecentDocumentList initialDocuments={(documents as any) || []} />
    </div>
  );
}