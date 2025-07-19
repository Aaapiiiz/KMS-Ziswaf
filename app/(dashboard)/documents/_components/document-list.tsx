// app/(dashboard)/documents/_components/document-list.tsx

"use client"

import { useState, useEffect, useMemo } from "react"
// import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DocumentFilters, DocumentFilterValues } from "@/components/document-filters"
import { useAuth } from "@/hooks/use-auth"
import type { Document } from "@/lib/supabase/client"
import { supabase } from "@/lib/supabase/client"
import { FileText, Calendar, Heart, Star, Eye, Download, Clock, CheckCircle, XCircle, Search, Link as LinkIcon } from "lucide-react"

type DocumentWithUploader = Document & {
  uploaded_by: { name: string; email: string } | null
}

interface DocumentListProps {
  initialDocuments: DocumentWithUploader[]
}

export function DocumentList({ initialDocuments }: DocumentListProps) {
  const [documents, setDocuments] = useState<DocumentWithUploader[]>(initialDocuments)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { userRole } = useAuth()
  const router = useRouter(); 

  const [activeFilters, setActiveFilters] = useState<DocumentFilterValues>({
    searchQuery: "", category: "Semua", department: "Semua", priority: "Semua",
    time: "Semua", showFavoritesOnly: false, showMandatoryOnly: false,
  })
  
  // Update local state if initial props change
  useEffect(() => {
    setDocuments(initialDocuments);
  }, [initialDocuments]);

  const filteredDocuments = useMemo(() => {
    const { searchQuery, category, department, priority, showFavoritesOnly, showMandatoryOnly } = activeFilters
    return documents.filter((doc) => {
      const matchesSearch = !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase())) || doc.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = category === "Semua" || doc.category === category
      const matchesDepartment = department === "Semua" || doc.department === department
      const matchesPriority = priority === "Semua" || doc.priority === priority
      const matchesFavorites = !showFavoritesOnly || doc.is_starred
      const matchesMandatory = !showMandatoryOnly || doc.is_mandatory
      return matchesSearch && matchesCategory && matchesDepartment && matchesPriority && matchesFavorites && matchesMandatory
    })
  }, [documents, activeFilters])

  const toggleFavorite = async (docId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const docToUpdate = documents.find((doc) => doc.id === docId)
    if (!docToUpdate) return
    const newFavoriteStatus = !docToUpdate.is_starred
    // Optimistic UI update
    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_starred: newFavoriteStatus } : doc)))
    const { error } = await supabase.from("documents").update({ is_starred: newFavoriteStatus }).eq("id", docId)
    if (error) { // Revert on error
        setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_starred: !newFavoriteStatus } : doc)))
        alert("Gagal memperbarui favorit.")
    }
  }

  const toggleMandatory = async (docId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (userRole !== "admin") return
    const docToUpdate = documents.find((doc) => doc.id === docId)
    if (!docToUpdate) return
    const newMandatoryStatus = !docToUpdate.is_mandatory
    // Optimistic UI update
    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_mandatory: newMandatoryStatus } : doc)))
    const { error } = await supabase.from("documents").update({ is_mandatory: newMandatoryStatus }).eq("id", docId)
    if (error) { // Revert on error
        setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_mandatory: !newMandatoryStatus } : doc)))
        alert("Gagal memperbarui status wajib.")
    }
  }

  const handleDownload = async (doc: DocumentWithUploader, e: React.MouseEvent) => {
      e.stopPropagation()
      if (doc.document_type !== 'file' || !doc.file_url) return
      
      const { data, error } = await supabase.storage.from('documents').download(doc.file_url.split('/').slice(-2).join('/'));

      if (error || !data) {
          console.error("Download failed:", error);
          alert("Gagal mengunduh file.");
          return;
      }
      
      const blob = data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = downloadUrl;
      const fileName = doc.file_url.split('/').pop()?.split('?')[0] || 'download';
      a.download = fileName;
      window.document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
  }

  const handleView = (doc: DocumentWithUploader, e: React.MouseEvent) => {
      e.stopPropagation();
      // Always navigate to the internal detail page, regardless of document type.
      router.push(`/documents/${doc.id}`);
  }

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })
  const formatFileSize = (sizeInBytes?: number | null) => {
    if (!sizeInBytes) return "N/A"
    if (sizeInBytes > 1024 * 1024) return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
    if (sizeInBytes > 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`
    return `${sizeInBytes} B`
  }
  const getVerificationBadge = (status?: Document["verification_status"]) => {
    switch (status) {
      case "approved": return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Terverifikasi</Badge>
      case "pending": return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case "rejected": return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Ditolak</Badge>
      default: return null
    }
  }

  const DocumentCard = ({ document: doc }: { document: DocumentWithUploader }) => (
    <Card className="hover:shadow-lg transition-shadow flex flex-col cursor-pointer" onClick={(e) => handleView(doc, e)}>
        <div className="flex flex-col h-full p-4 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    {doc.document_type === 'link' ? <LinkIcon className="h-4 w-4 text-gray-500" /> : <FileText className="h-4 w-4 text-gray-500" />}
                    <Badge variant="outline" className="text-xs">{doc.file_type || 'LINK'}</Badge>
                    {doc.is_mandatory && <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs"><Star className="w-3 h-3 mr-1 fill-current" />Wajib</Badge>}
                </div>
                <div className="flex items-center space-x-0">
                    <Button variant="ghost" size="sm" onClick={(e) => toggleFavorite(doc.id, e)} className={`p-1 h-auto ${doc.is_starred ? "text-red-500" : "text-gray-400"}`}><Heart className="w-4 h-4" fill={doc.is_starred ? "currentColor" : "none"} /></Button>
                    {userRole === 'admin' && (<Button variant="ghost" size="sm" onClick={(e) => toggleMandatory(doc.id, e)} className="p-1 h-auto"><Star className={`h-4 w-4 transition-colors ${doc.is_mandatory ? "fill-yellow-400 text-yellow-500" : "text-gray-400"}`} /></Button>)}
                </div>
            </div>
            <div className="space-y-1 flex-grow">
                <CardTitle className="text-base leading-snug line-clamp-2 hover:underline">{doc.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">{doc.description}</CardDescription>
            </div>
            <div className="space-y-2 text-xs text-gray-500 pt-2 border-t">
                <div className="flex justify-between items-center"><span>{doc.department}</span><div className="flex items-center space-x-1"><Calendar className="w-3 h-3" /><span>{formatDate(doc.created_at)}</span></div></div>
                <div className="flex justify-between items-center"><span>Oleh: {doc.uploaded_by?.name || 'Sistem'}</span><span>{formatFileSize(doc.file_size)}</span></div>
            </div>
            <div className="flex items-center justify-between pt-2">
                <div>{getVerificationBadge(doc.verification_status)}</div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={(e) => handleView(doc, e)}><Eye className="w-4 h-4" /></Button>
                    <Button variant="outline" size="sm" onClick={(e) => handleDownload(doc, e)} disabled={doc.document_type === 'link'}><Download className="w-4 h-4" /></Button>
                </div>
            </div>
        </div>
    </Card>
  );

  return (
    <>
      <DocumentFilters onFilterChange={setActiveFilters} onViewChange={setViewMode} visibleFilters={["category", "department", "priority", "showFavoritesOnly", "showMandatoryOnly"]} resultCount={filteredDocuments.length} />
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDocuments.map((doc) => (<DocumentCard key={doc.id} document={doc} />))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">List view coming soon!</div>
      )}
      {!filteredDocuments.length && (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><Search className="h-12 w-12 text-muted-foreground mb-4" /><h3 className="text-lg font-semibold mb-2">Tidak Ada Dokumen Ditemukan</h3><p className="text-muted-foreground text-center mb-4">Tidak ada dokumen yang sesuai dengan hak akses atau filter Anda.</p></CardContent></Card>
      )}
    </>
  )
}