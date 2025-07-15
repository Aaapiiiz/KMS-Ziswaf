// app/(dashboard)/admin/verification/page.tsx (FINAL, CORRECTED VERSION)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Eye, Check, X, Clock, AlertCircle, Loader2 } from "lucide-react";
import { AdminRouteGuard } from "@/components/admin-route-guard";
import { getDocumentsForVerification, updateDocumentVerificationStatus } from "@/lib/supabase";
import type { Document, User } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";

const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing", "Penyaluran", "Audit"];
const priorities = ["Semua", "high", "medium", "low"];

type DocumentForVerification = Document & {
  uploaded_by: Pick<User, "name" | "email" | "avatar_url"> | null;
};

export default function VerificationPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<DocumentForVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("Semua");
  const [priorityFilter, setPriorityFilter] = useState("Semua");
  const [selectedDocument, setSelectedDocument] = useState<DocumentForVerification | null>(null);
  const [verificationNote, setVerificationNote] = useState("");
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const docs = await getDocumentsForVerification();
      setDocuments((docs as DocumentForVerification[]) || []);
    } catch (error) {
      console.error("Failed to fetch documents for verification:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDepartment = departmentFilter === "Semua" || doc.department === departmentFilter;
    const matchesPriority = priorityFilter === "Semua" || doc.priority === priorityFilter;
    return matchesSearch && matchesDepartment && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "Tinggi";
      case "medium": return "Sedang";
      case "low": return "Rendah";
      default: return priority.charAt(0).toUpperCase() + priority.slice(1);
    }
  };

  const handleApprove = async () => {
    if (!user || !selectedDocument) return;
    try {
      await updateDocumentVerificationStatus(selectedDocument.id, "approved", user.id, verificationNote);
      setDocuments((prev) => prev.filter((doc) => doc.id !== selectedDocument.id));
      alert("Dokumen berhasil disetujui.");
    } catch (error) {
      console.error("Failed to approve document:", error);
      alert("Gagal menyetujui dokumen.");
    } finally {
      setVerificationNote("");
      setSelectedDocument(null);
      setIsApproveOpen(false);
    }
  };

  const handleReject = async () => {
    if (!user || !selectedDocument || !verificationNote.trim()) {
      alert("Alasan penolakan wajib diisi.");
      return;
    }
    try {
      await updateDocumentVerificationStatus(selectedDocument.id, "rejected", user.id, verificationNote);
      setDocuments((prev) => prev.filter((doc) => doc.id !== selectedDocument.id));
      alert("Dokumen berhasil ditolak.");
    } catch (error) {
      console.error("Failed to reject document:", error);
      alert("Gagal menolak dokumen.");
    } finally {
      setVerificationNote("");
      setSelectedDocument(null);
      setIsRejectOpen(false);
    }
  };

  return (
    <AdminRouteGuard>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verifikasi Dokumen</h1>
            <p className="text-gray-600">Review dan verifikasi dokumen yang menunggu persetujuan</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700"><Clock className="w-4 h-4 mr-1" />{filteredDocuments.length} Menunggu</Badge>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><Input placeholder="Cari dokumen..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/></div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}><SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Departemen" /></SelectTrigger><SelectContent>{departments.map((dept) => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent></Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}><SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Prioritas" /></SelectTrigger><SelectContent>{priorities.map((priority) => <SelectItem key={priority} value={priority}>{priority === "Semua" ? "Semua" : getPriorityText(priority)}</SelectItem>)}</SelectContent></Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {loading ? (<div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>) 
          : (
            filteredDocuments.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getPriorityColor(document.priority)}>{getPriorityText(document.priority)}</Badge>
                        <Badge variant="outline">{document.file_type}</Badge>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700"><Clock className="w-3 h-3 mr-1" />Menunggu Verifikasi</Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{document.title}</h3>
                      <p className="text-gray-600 mb-4">{document.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-2"><Avatar className="w-6 h-6"><AvatarImage src={document.uploaded_by?.avatar_url || "/placeholder.svg"} alt={document.uploaded_by?.name || "User"} /><AvatarFallback className="text-xs">{(document.uploaded_by?.name || "U").split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar><span>{document.uploaded_by?.name || "Unknown User"}</span></div>
                          <span>{document.department}</span>
                          <span>{new Date(document.created_at).toLocaleDateString("id-ID")}</span>
                          <span>{document.file_size ? `${(document.file_size / 1024 / 1024).toFixed(2)} MB` : "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      {/* === START OF THE FIX === */}
                      {document.document_type === 'link' ? (
                        // If it's a LINK, use a standard `<a>` tag to open the external URL.
                        <Button variant="outline" size="sm" asChild>
                          <a href={document.external_url || '#'} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </a>
                        </Button>
                      ) : (
                        // If it's a FILE, use Next.js's <Link> to go to the internal detail page.
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/documents/${document.id}`} target="_blank">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Link>
                        </Button>
                      )}
                      {/* === END OF THE FIX === */}
                      <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700" onClick={() => {setSelectedDocument(document); setIsApproveOpen(true);}}><Check className="w-4 h-4 mr-2" />Setujui</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => {setSelectedDocument(document); setIsRejectOpen(true);}}><X className="w-4 h-4 mr-2" />Tolak</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {!loading && filteredDocuments.length === 0 && (
          <div className="text-center py-12"><AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada dokumen untuk diverifikasi</h3><p className="text-gray-600">Semua dokumen telah diverifikasi atau tidak ada yang sesuai dengan filter</p></div>
        )}
      </div>

      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
          <DialogContent>
              <DialogHeader><DialogTitle>Setujui Dokumen</DialogTitle><DialogDescription>Anda akan menyetujui dokumen "{selectedDocument?.title}". Dokumen akan dipublikasikan.</DialogDescription></DialogHeader>
              <div className="space-y-4 py-4"><Label htmlFor="approve-note" className="text-sm font-medium">Catatan Verifikasi (Opsional)</Label><Textarea id="approve-note" placeholder="Tambahkan catatan untuk persetujuan ini..." value={verificationNote} onChange={(e) => setVerificationNote(e.target.value)} className="mt-1"/></div>
              <DialogFooter><Button variant="outline" onClick={() => setIsApproveOpen(false)}>Batal</Button><Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}><Check className="w-4 h-4 mr-2" />Setujui Dokumen</Button></DialogFooter>
          </DialogContent>
      </Dialog>
      
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
          <DialogContent>
              <DialogHeader><DialogTitle>Tolak Dokumen</DialogTitle><DialogDescription>Anda akan menolak dokumen "{selectedDocument?.title}". Dokumen akan dikembalikan ke pengirim.</DialogDescription></DialogHeader>
              <div className="space-y-4 py-4"><Label htmlFor="reject-note" className="text-sm font-medium">Alasan Penolakan *</Label><Textarea id="reject-note" placeholder="Jelaskan alasan penolakan dan saran perbaikan..." value={verificationNote} onChange={(e) => setVerificationNote(e.target.value)} className="mt-1" required/></div>
              <DialogFooter><Button variant="outline" onClick={() => setIsRejectOpen(false)}>Batal</Button><Button variant="destructive" onClick={handleReject} disabled={!verificationNote.trim()}><X className="w-4 h-4 mr-2" />Tolak Dokumen</Button></DialogFooter>
          </DialogContent>
      </Dialog>

    </AdminRouteGuard>
  )
}