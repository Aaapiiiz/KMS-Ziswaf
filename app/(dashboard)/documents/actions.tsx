// ngejerwisokto/app/(dashboard)/documents/actions.tsx (VERIFY THIS CODE)
"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteDocument(formData: FormData) {
  const documentId = formData.get('documentId') as string;
  const fileUrl = formData.get('fileUrl') as string | null | undefined;

  console.log(`[Server Action] deleteDocument started for ID: ${documentId}`);
  
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error("[Server Action] FAILED: User is not authenticated.");
    return { error: "Authentication required." };
  }

  console.log(`[Server Action] SUCCESS: Authenticated as ${user.email}. Proceeding with deletion.`);

  // ... sisa logika penghapusan ...
  try {
    if (fileUrl && fileUrl.includes('/documents/')) {
      const filePath = fileUrl.split('/documents/').pop();
      if (filePath) {
        await supabase.storage.from('documents').remove([filePath]);
      }
    }
    const { error: dbError } = await supabase.from('documents').delete().eq('id', documentId);
    if (dbError) throw dbError;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    console.error("[Server Action] Error during deletion process:", errorMessage);
    return { error: `Failed to delete document: ${errorMessage}` };
  }

  revalidatePath('/documents');
  redirect('/documents');
}