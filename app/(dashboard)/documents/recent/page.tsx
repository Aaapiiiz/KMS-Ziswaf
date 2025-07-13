"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { FileText, Calendar, Heart, Star, Eye, Download, Clock, CheckCircle, XCircle, Search } from "lucide-react"
import Link from "next/link"

// Interface and Mock Data remain the same as before
interface Document {
  id: number
  title: string
  description: string
  category: string
  department: string
  author: string
  date: string
  uploadedAt: string
  size: string
  type: "PDF" | "XLSX" | "Word" | "PPTX"
  downloads: number
  views: number
  tags: string[]
  is_favorite: boolean
  is_mandatory: boolean
  verification_status: "approved" | "pending" | "rejected"
  priority: "high" | "medium" | "low"
  isNew: boolean
}

const recentDocuments: Document[] = [
    {
    id: 1,
    title: "Panduan Penyaluran Beasiswa 2024",
    description: "Dokumen panduan lengkap untuk proses penyaluran beasiswa tahun 2024",
    category: "Panduan",
    department: "Pendayagunaan",
    author: "Ahmad Fauzi",
    date: "2024-12-17",
    uploadedAt: new Date().toISOString(),
    size: "2.4 MB",
    type: "PDF",
    downloads: 23,
    views: 156,
    tags: ["ziswaf", "panduan", "prosedur"],
    is_favorite: true,
    is_mandatory: true,
    verification_status: "approved",
    priority: "high",
    isNew: true,
  },
  {
    id: 2,
    title: "Template Evaluasi Program Beasiswa Q4 2024",
    description: "Template untuk evaluasi dan penilaian program beasiswa triwulan keempat",
    category: "Template",
    department: "Pendayagunaan",
    author: "Siti Nurhaliza",
    date: "2024-12-16",
    uploadedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    size: "1.2 MB",
    type: "XLSX",
    downloads: 45,
    views: 234,
    tags: ["template", "evaluasi", "beasiswa"],
    is_favorite: false,
    is_mandatory: false,
    verification_status: "approved",
    priority: "medium",
    isNew: true,
  },
  {
    id: 3,
    title: "SOP Verifikasi Mustahik Terbaru",
    description: "Standar operasional prosedur terbaru untuk verifikasi dan validasi penerima manfaat",
    category: "SOP",
    department: "Pendayagunaan",
    author: "Budi Santoso",
    date: "2024-12-15",
    uploadedAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    size: "1.8 MB",
    type: "PDF",
    downloads: 67,
    views: 345,
    tags: ["sop", "verifikasi", "mustahik"],
    is_favorite: true,
    is_mandatory: true,
    verification_status: "approved",
    priority: "high",
    isNew: true,
  },
  {
    id: 4,
    title: "Laporan Analisis Dampak Program Sosial",
    description: "Laporan komprehensif analisis dampak program sosial periode November 2024",
    category: "Laporan",
    department: "Pendayagunaan",
    author: "Maya Sari",
    date: "2024-12-14",
    uploadedAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    size: "3.5 MB",
    type: "PDF",
    downloads: 89,
    views: 456,
    tags: ["laporan", "analisis", "dampak"],
    is_favorite: false,
    is_mandatory: false,
    verification_status: "pending",
    priority: "high",
    isNew: false,
  },
];


export default function RecentDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(recentDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(recentDocuments);
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const { userRole } = useAuth();

  useEffect(() => {
    let newFiltered = documents.filter(doc => {
      if (timeFilter === 'all') return true;

      const now = new Date();
      const uploadDate = new Date(doc.uploadedAt);
      const diffTime = now.getTime() - uploadDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (timeFilter === "today") return diffDays <= 1;
      if (timeFilter === "week") return diffDays <= 7;
      if (timeFilter === "month") return diffDays <= 30;

      return true;
    });
    
    setFilteredDocuments(newFiltered);
  }, [documents, timeFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
  };
  
  const getVerificationBadge = (status: Document["verification_status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Terverifikasi</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Ditolak</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900">Dokumen Terbaru</h1>
        </div>
        <div>
            <p className="text-gray-600">Dokumen yang baru saja ditambahkan atau diperbarui</p>
        </div>
      </div>

      {/* NEW: Simple Filter Buttons */}
      <div className="flex items-center gap-2">
        <Button variant={timeFilter === 'all' ? 'default' : 'outline'} onClick={() => setTimeFilter('all')}>Semua</Button>
        <Button variant={timeFilter === 'today' ? 'default' : 'outline'} onClick={() => setTimeFilter('today')}>Hari Ini</Button>
        <Button variant={timeFilter === 'week' ? 'default' : 'outline'} onClick={() => setTimeFilter('week')}>Minggu Ini</Button>
        <Button variant={timeFilter === 'month' ? 'default' : 'outline'} onClick={() => setTimeFilter('month')}>Bulan Ini</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow flex flex-col">
             <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <Badge variant="outline" className="text-xs">{document.type}</Badge>
                  {document.is_mandatory && (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Wajib
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className={`p-1 h-auto ${document.is_favorite ? "text-red-500" : "text-gray-400"}`}>
                    <Heart className="w-4 h-4" fill={document.is_favorite ? "currentColor" : "none"} />
                  </Button>
                  {userRole === "admin" && (
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Star className={`h-4 w-4 transition-colors ${document.is_mandatory ? "fill-yellow-400 text-yellow-500" : "text-gray-400"}`} />
                    </Button>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2 mt-2">{document.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-sm">{document.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
              <div>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between items-center">
                    <span>{document.department}</span>
                    <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(document.date)}</span></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{document.size}</span>
                     <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1"><Eye className="w-4 h-4" /><span>{document.views} views</span></div>
                        <div className="flex items-center space-x-1"><Download className="w-4 h-4" /><span>{document.downloads} downloads</span></div>
                      </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
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

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Dokumen Terbaru</h3>
            <p className="text-gray-600 mb-4">Tidak ada dokumen yang ditemukan untuk periode waktu yang dipilih.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}