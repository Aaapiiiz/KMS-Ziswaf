// ngejerwisokto/app/(dashboard)/documents/actions.tsx (Corrected)
"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteDocument(documentId: string, fileUrl: string | null | undefined) {
  const supabase = await createSupabaseServerClient(); // <-- FIX: Add 'await' here

  // 1. Autentikasi user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Authentication required." };
  }
  
  // ... rest of the function is unchanged
  const { data: document, error: docError } = await supabase
    .from('documents')
    .select('uploaded_by')
    .eq('id', documentId)
    .single();

  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (docError || profileError || !document || !userProfile) {
    return { error: "Failed to verify permissions." };
  }

  const isOwner = document.uploaded_by === user.id;
  const isAdmin = userProfile.role === 'admin';

  if (!isOwner && !isAdmin) {
    return { error: "You do not have permission to delete this document." };
  }

  try {
    if (fileUrl) {
      const filePath = fileUrl.split('/documents/').pop();
      if (filePath) {
        await supabase.storage.from('documents').remove([filePath]);
      }
    }

    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId);

    if (dbError) {
      throw dbError;
    }

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    console.error("Error during document deletion:", errorMessage);
    return { error: `Failed to delete document: ${errorMessage}` };
  }

  revalidatePath('/documents');
  redirect('/documents');
}