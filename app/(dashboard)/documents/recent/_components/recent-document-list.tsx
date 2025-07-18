// app/(dashboard)/documents/recent/_components/recent-document-list.tsx

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Heart, Star, Eye, Download, Clock, CheckCircle, XCircle, Search } from "lucide-react"
import type { Document } from "@/lib/supabase/client"
import { supabase } from "@/lib/supabase/client" // Import supabase client
import { useAuth } from "@/hooks/use-auth" // Import useAuth

type DocumentWithUploader = Document & {
  uploaded_by: { name: string; email: string } | null
}

interface RecentDocumentListProps {
  initialDocuments: DocumentWithUploader[]
}

// Helper functions
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
const getVerificationBadge = (status?: Document["verification_status"]) => {
    switch (status) {
      case "approved": return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Terverifikasi</Badge>
      case "pending": return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case "rejected": return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Ditolak</Badge>
      default: return null
    }
};

export function RecentDocumentList({ initialDocuments }: RecentDocumentListProps) {
  const [documents, setDocuments] = useState<DocumentWithUploader[]>(initialDocuments);
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [filteredDocuments, setFilteredDocuments] = useState<DocumentWithUploader[]>(initialDocuments);
  const { userRole } = useAuth(); // Get userRole for star button

  useEffect(() => {
    // When the initial documents from the server change, update our local state
    setDocuments(initialDocuments);
  }, [initialDocuments]);
  
  useEffect(() => {
    const newFiltered = documents.filter(doc => {
      if (timeFilter === 'all') return true;
      const now = new Date();
      const docDate = new Date(doc.created_at);
      const diffTime = Math.abs(now.getTime() - docDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (timeFilter === "today") return diffDays <= 1;
      if (timeFilter === "week") return diffDays <= 7;
      return true; // 'all' covers month by default from parent
    });
    setFilteredDocuments(newFiltered);
  }, [timeFilter, documents]);

  const toggleFavorite = async (docId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const docToUpdate = documents.find((doc) => doc.id === docId);
    if (!docToUpdate) return;
    const newStatus = !docToUpdate.is_starred;
    setDocuments(prev => prev.map(d => d.id === docId ? {...d, is_starred: newStatus} : d));
    await supabase.from("documents").update({ is_starred: newStatus }).eq("id", docId);
  };

  const toggleMandatory = async (docId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (userRole !== "admin") return;
    const docToUpdate = documents.find((doc) => doc.id === docId);
    if (!docToUpdate) return;
    const newStatus = !docToUpdate.is_mandatory;
    setDocuments(prev => prev.map(d => d.id === docId ? {...d, is_mandatory: newStatus} : d));
    await supabase.from("documents").update({ is_mandatory: newStatus }).eq("id", docId);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant={timeFilter === 'all' ? 'default' : 'outline'} onClick={() => setTimeFilter('all')}>Bulan Ini</Button>
        <Button variant={timeFilter === 'week' ? 'default' : 'outline'} onClick={() => setTimeFilter('week')}>Minggu Ini</Button>
        <Button variant={timeFilter === 'today' ? 'default' : 'outline'} onClick={() => setTimeFilter('today')}>Hari Ini</Button>
      </div>

      {filteredDocuments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <Badge variant="outline" className="text-xs">{document.file_type}</Badge>
                    {document.is_mandatory && <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs"><Star className="w-3 h-3 mr-1 fill-current" />Wajib</Badge>}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={(e) => toggleFavorite(document.id, e)} className={`p-1 h-auto ${document.is_starred ? "text-red-500" : "text-gray-400"}`}><Heart className="w-4 h-4" fill={document.is_starred ? "currentColor" : "none"} /></Button>
                    {userRole === 'admin' && (
                        <Button variant="ghost" size="sm" onClick={(e) => toggleMandatory(document.id, e)} className="p-1 h-auto">
                            <Star className={`h-4 w-4 transition-colors ${document.is_mandatory ? "fill-yellow-400 text-yellow-500" : "text-gray-400"}`} />
                        </Button>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2 mt-2">
                    <Link href={`/documents/${document.id}`} className="hover:underline">
                        {document.title}
                    </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">{document.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex justify-between items-center">
                      <span>{document.department}</span>
                      <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(document.created_at)}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {document.tags?.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t mt-4">
                  <div>{getVerificationBadge(document.verification_status)}</div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild><Link href={`/documents/${document.id}`}><Eye className="w-4 h-4" /></Link></Button>
                    <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Dokumen Ditemukan</h3>
            <p className="text-gray-600 mb-4">Tidak ada dokumen yang ditemukan untuk periode waktu yang dipilih.</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}