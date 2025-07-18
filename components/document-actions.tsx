// components/document-actions.tsx (Corrected and Final Version)

"use client";

import { useState } from "react";
import type { Document } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { deleteDocument } from "@/app/(dashboard)/documents/actions"; // Import the Server Action

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Share2, Edit, Trash2, Loader2 } from "lucide-react";

type DocumentWithUploader = Document & {
  uploaded_by: { name: string; email: string; avatar_url?: string } | null;
};

interface DocumentActionsProps {
  document: DocumentWithUploader;
}

export function DocumentActions({ document }: DocumentActionsProps) {
  const { user, userRole } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Determine if the current user has permission to delete this document
  const canDelete = user?.id === document.uploaded_by || userRole === 'admin';

  // This function will be called when the form is submitted.
  // We use this to manage the loading state.
  const handleFormSubmit = async (formData: FormData) => {
    if (!canDelete) {
      alert("Anda tidak memiliki izin untuk menghapus dokumen ini.");
      return;
    }

    setIsDeleting(true);
    
    try {
      // The server action handles everything else (auth, deletion, redirect)
      const result = await deleteDocument(formData);

      // If the server action returns an error message, display it.
      if (result?.error) {
        throw new Error(result.error);
      }
      
      // Note: A successful deletion will redirect, so this part might not even be reached.
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menghapus dokumen.");
      // Stop loading state on error so the user can try again
      setIsDeleting(false); 
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline"><Share2 className="w-4 h-4 mr-2" />Bagikan</Button>
      <Button variant="outline"><Edit className="w-4 h-4 mr-2" />Edit</Button>

      {/* Only show the delete button if the user has permission */}
      {canDelete && (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          {/* The trigger for the dialog */}
          <Button variant="destructive" onClick={() => setIsAlertOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus
          </Button>
          
          <AlertDialogContent>
            {/* The form calls the server action directly. This is the key fix. */}
            <form action={handleFormSubmit}>
              <input type="hidden" name="documentId" value={document.id} />
              <input type="hidden" name="fileUrl" value={document.file_url || ''} />

              <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Ini akan menghapus dokumen <strong>{document.title}</strong> secara permanen dari server.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel type="button" disabled={isDeleting}>Batal</AlertDialogCancel>
                
                {/* This button now submits the form */}
                <Button type="submit" variant="destructive" disabled={isDeleting}>
                  {isDeleting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menghapus...</>
                  ) : (
                    "Ya, Hapus Dokumen"
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}