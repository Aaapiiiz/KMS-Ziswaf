// components/document-actions.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Document } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { deleteDocument } from "@/app/(dashboard)/documents/actions"; // <-- Import the new Server Action

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
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
  const router = useRouter();
  const { user, userRole } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Determine if the current user has permission to delete this document
  const canDelete = user?.id === document.uploaded_by || userRole === 'admin';

  const handleDelete = async () => {
    if (!canDelete) {
      alert("Anda tidak memiliki izin untuk menghapus dokumen ini.");
      return;
    }
    
    setIsDeleting(true);

    try {
      // Call the server action
      const result = await deleteDocument(document.id, document.file_url);
      
      if (result?.error) {
        // If the server action returns an error, show it
        throw new Error(result.error);
      }
      
      // The server action handles redirection, but we can refresh just in case
      // and close the dialog. The alert is no longer needed as the user will be navigated away.
      router.refresh();

    } catch (error) {
      console.error("Error deleting document:", error);
      alert(error instanceof Error ? error.message : "Gagal menghapus dokumen. Silakan coba lagi.");
      setIsDeleting(false); // Stop loading on error
      setIsAlertOpen(false); // Close the dialog on error
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
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus dokumen <strong>{document.title}</strong> secara permanen dari server dan penyimpanan file.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsAlertOpen(false)} disabled={isDeleting}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                {isDeleting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menghapus...</>
                ) : (
                  "Ya, Hapus Dokumen"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}