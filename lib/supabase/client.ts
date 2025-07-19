// lib/supabase/client.ts (FINAL CORRECTED VERSION)

// "use client";

// import { createClient } from "@supabase/supabase-js"
import { createClient, type PostgrestError } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// GUNAKAN createBrowserClient, BUKAN createClient
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// =================================================================
// Tipe dan fungsi helper lainnya tidak perlu diubah.
// Kode di bawah ini sudah benar.
// =================================================================

// Types for our database tables
export interface User {
  id: string
  email: string
  name: string
  department: string
  role: "admin" | "user"
  status: "active" | "pending" | "inactive"
  avatar_url?: string
  created_at: string
  updated_at: string
  last_login?: string
}

export interface Document {
  id: string
  title: string
  description?: string
  file_url?: string | null
  external_url?: string | null
  preview_url?: string | null
  document_type: "file" | "link"
  platform?: string | null
  file_type?: string | null
  file_size?: number | null
  category: string
  department: string
  tags: string[]
  uploaded_by: string | { name: string; email: string; avatar_url?: string } | null
  is_mandatory: boolean
  is_starred: boolean
  verification_status: "pending" | "approved" | "rejected" | "revision_requested"
  verified_by?: string | null
  verified_at?: string | null
  verification_requested_at?: string | null
  version: string
  location?: string | null
  priority: "low" | "medium" | "high" | "critical"
  access_level: "departmental" | "organizational" | "public"
  language: string
  expiry_date?: string | null
  related_documents?: string | null
  author: string
  created_at: string
  updated_at: string
}

// HELPER FUNCTIONS

export const getUsers = async (): Promise<User[] | null> => {
  const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })
  if (error) {
    console.error("Supabase error in getUsers:", error)
    return null
  }
  return data
}

export const updateUser = async (userId: string, updates: Partial<User>): Promise<{ data: User | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single()
  
  if (error) {
    console.error("Supabase error in updateUser:", error);
  }
  return { data, error };
}

export const getDocumentsForVerification = async () => {
  const { data, error } = await supabase
    .from("documents")
    .select(`*, uploaded_by ( name, email, avatar_url )`)
    .eq("verification_status", "pending")
    .order("verification_requested_at", { ascending: true })

  if (error) {
    console.error("Supabase error in getDocumentsForVerification:", error)
    throw error
  }
  return data
}

export const updateDocumentVerificationStatus = async (
  documentId: string,
  status: "approved" | "rejected",
  verifiedBy: string,
  comment?: string
) => {
  // Step 1: Update the document status
  const { error: updateError } = await supabase
    .from("documents")
    .update({
      verification_status: status,
      verified_by: verifiedBy,
      verified_at: new Date().toISOString(),
    })
    .eq("id", documentId)
    .select() // PENTING: .select() memaksa Supabase mengembalikan baris yang diperbarui.
              // Data inilah yang akan disiarkan oleh Realtime ke semua klien.

  if (updateError) {
    console.error("Error updating document status:", updateError);
    throw updateError;
  }

  if (comment && comment.trim() !== "") {
    const { error: commentError } = await supabase.from("document_comments").insert({
      document_id: documentId,
      user_id: verifiedBy,
      comment: comment,
      comment_type: status === "approved" ? "approval_note" : "revision_request",
    })

    if (commentError) {
      // Log the error but don't throw, as the main action succeeded.
      console.error("Error adding verification comment:", commentError)
    }
  }
};