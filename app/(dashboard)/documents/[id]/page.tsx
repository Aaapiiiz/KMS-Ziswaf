"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DocumentViewer } from "@/components/document-viewer";
import { DocumentActions } from "@/components/document-actions";
import { FileText, Eye, Download, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabase/client"; // Gunakan client-side supabase
import type { Document } from "@/lib/supabase/client";
import DocumentDetailLoading from "./loading"; // Import loading skeleton

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' });
};

type DocumentWithUploader = Document & {
  uploaded_by: { name: string; email: string; avatar_url?: string } | null;
};

export default function DocumentDetailPage() {
  const params = useParams();
  const id = params.id as string; // Dapatkan ID dari URL

  const [doc, setDoc] = useState<DocumentWithUploader | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const getDocumentData = async () => {
      setLoading(true);
      setError(null);
      
      const { data: document, error: dbError } = await supabase
        .from("documents")
        .select(`*, uploaded_by (name, email, avatar_url)`)
        .eq('id', id)
        .single();

      if (dbError || !document) {
        console.error("Error fetching document:", dbError);
        setError("Gagal memuat dokumen atau dokumen tidak ditemukan.");
        setLoading(false);
        return;
      }
      
      setDoc(document as DocumentWithUploader);
      setLoading(false);
    };

    getDocumentData();
  }, [id]); // Jalankan efek ini setiap kali 'id' berubah

  if (loading) {
    // Gunakan komponen skeleton loading Anda
    return <DocumentDetailLoading />;
  }

  if (error || !doc) {
    // Jika ada error atau dokumen tidak ditemukan setelah loading selesai, arahkan ke halaman notFound
    notFound();
  }
  
  const safePreviewUrl = doc.document_type === 'link' ? (doc.external_url || '#') : (doc.file_url || '#');

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            {doc.document_type === 'link' ? <LinkIcon className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">{doc.title}</h1>
              <Badge variant={doc.verification_status === "approved" ? "default" : "secondary"}>
                {doc.verification_status || 'Pending'}
              </Badge>
            </div>
            <p className="text-gray-600 max-w-2xl mt-1">{doc.description}</p>
          </div>
        </div>
        <DocumentActions document={doc} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Preview Dokumen</CardTitle></CardHeader>
            <CardContent><DocumentViewer document={doc} /></CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Informasi Dokumen</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <span>Departemen</span><span className="font-medium text-right">{doc.department}</span>
                <span>Author</span><span className="font-medium text-right">{doc.author}</span>
                <span>Diupload Oleh</span><span className="font-medium text-right">{doc.uploaded_by?.name || 'N/A'}</span>
                <span>Tanggal Upload</span><span className="font-medium text-right">{formatDate(doc.created_at)}</span>
                <span>Tipe File</span><Badge variant="outline" className="justify-self-end">{doc.file_type}</Badge>
                <span>Prioritas</span><Badge variant={doc.priority === 'high' ? 'destructive' : 'outline'} className="justify-self-end capitalize">{doc.priority}</Badge>
                <span>Versi</span><span className="font-medium text-right">{doc.version}</span>
              </div>
              {doc.tags && doc.tags.length > 0 && (
                <><Separator /><div className="space-y-2"><p className="text-sm font-medium">Tags</p><div className="flex flex-wrap gap-2">{doc.tags.map((tag) => (<Badge key={tag} variant="secondary">{tag}</Badge>))}</div></div></>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Aksi Cepat</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button asChild className="w-full justify-start"><Link href={safePreviewUrl} target="_blank"><Eye className="w-4 h-4 mr-2" />Buka di Tab Baru</Link></Button>
                <Button variant="outline" className="w-full justify-start" disabled={doc.document_type === 'link'}><Download className="w-4 h-4 mr-2" />Download</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}