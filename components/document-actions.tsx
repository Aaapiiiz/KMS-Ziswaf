// components/document-actions.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Document } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Share2, Edit, Trash2, Loader2 } from "lucide-react";

// Define the shape of the props the component expects
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

  // Determine if the current user has permission to delete this document
  const canDelete = user?.id === document.uploaded_by || userRole === 'admin';

  const handleDelete = async () => {
    if (!canDelete) {
      alert("Anda tidak memiliki izin untuk menghapus dokumen ini.");
      return;
    }
    
    setIsDeleting(true);

    try {
      // Step 1: If it's a file, delete it from Supabase Storage first
      if (document.document_type === 'file' && document.file_url) {
        // Extract the file path from the full URL
        const filePath = document.file_url.split('/documents/').pop();
        if (filePath) {
          const { error: storageError } = await supabase.storage.from('documents').remove([filePath]);
          if (storageError) {
            // Log the error but continue to try deleting the DB record
            console.error("Storage deletion failed, but proceeding to delete DB record:", storageError);
          }
        }
      }

      // Step 2: Delete the document record from the database table
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', document.id);

      if (dbError) {
        throw dbError;
      }

      alert("Dokumen berhasil dihapus.");
      router.push('/documents'); // Redirect to the main documents page
      router.refresh(); // Force a refresh to update the list for other users

    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Gagal menghapus dokumen. Silakan coba lagi.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline"><Share2 className="w-4 h-4 mr-2" />Bagikan</Button>
      <Button variant="outline"><Edit className="w-4 h-4 mr-2" />Edit</Button>

      {/* Only show the delete button if the user has permission */}
      {canDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Hapus
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus dokumen secara permanen
                dari server dan penyimpanan file.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Ya, Hapus Dokumen
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}