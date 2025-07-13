"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, Heart, Star, Eye, Download, Clock, CheckCircle, XCircle, Search} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { DocumentFilters, DocumentFilterValues } from "@/components/document-filters"

// Define the Document interface
interface Document {
  id: string
  title: string
  description: string
  department: string
  author: string
  created_at: string
  file_type: string
  file_size: string
  is_favorite: boolean
  is_mandatory: boolean
  views: number
  downloads: number
  tags: string[]
  verification_status: "approved" | "pending" | "rejected"
  category: string;
  priority: string;
}

// Mock data for the page
const mockDocuments: Document[] = [
    {
      id: "1",
      title: "Panduan Penyaluran Beasiswa 2024",
      description: "Dokumen panduan lengkap untuk proses penyaluran beasiswa tahun 2024",
      department: "Pendayagunaan",
      author: "Ahmad Fauzi",
      created_at: "2024-01-15",
      file_type: "PDF",
      file_size: "2.5 MB",
      is_favorite: true,
      is_mandatory: true,
      views: 245,
      downloads: 89,
      tags: ["beasiswa", "panduan", "2024"],
      verification_status: "approved",
      category: "Panduan",
      priority: "high",
    },
    {
      id: "2",
      title: "Laporan Keuangan Q4 2023",
      description: "Laporan keuangan triwulan keempat tahun 2023",
      department: "Keuangan",
      author: "Siti Nurhaliza",
      created_at: "2024-01-10",
      file_type: "Excel",
      file_size: "1.8 MB",
      is_favorite: false,
      is_mandatory: true,
      views: 156,
      downloads: 67,
      tags: ["keuangan", "laporan", "Q4"],
      verification_status: "approved",
      category: "Laporan",
      priority: "high",
    },
    {
      id: "3",
      title: "SOP Verifikasi Mustahik",
      description: "Standard Operating Procedure untuk verifikasi penerima bantuan",
      department: "Penyaluran",
      author: "Budi Santoso",
      created_at: "2024-01-08",
      file_type: "PDF",
      file_size: "1.2 MB",
      is_favorite: true,
      is_mandatory: false,
      views: 198,
      downloads: 45,
      tags: ["SOP", "verifikasi", "mustahik"],
      verification_status: "pending",
      category: "SOP",
      priority: "medium",
    },
    {
      id: "4",
      title: "Proposal Program Kesehatan",
      description: "Proposal program bantuan kesehatan untuk mustahik",
      department: "Pendayagunaan",
      author: "Fatimah Zahra",
      created_at: "2024-01-05",
      file_type: "Word",
      file_size: "3.1 MB",
      is_favorite: false,
      is_mandatory: false,
      views: 87,
      downloads: 23,
      tags: ["proposal", "kesehatan", "bantuan"],
      verification_status: "rejected",
      category: "Template",
      priority: "low",
    },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { userRole } = useAuth();
  
  const [activeFilters, setActiveFilters] = useState<DocumentFilterValues>({
    searchQuery: "",
    category: "Semua",
    department: "Semua",
    priority: "Semua",
    time: "Semua",
    showFavoritesOnly: false,
    showMandatoryOnly: false,
  });

  const handleFilterChange = (filters: DocumentFilterValues) => {
    setActiveFilters(filters);
  };
  
  useEffect(() => {
    const { searchQuery, category, department, priority, showFavoritesOnly, showMandatoryOnly } = activeFilters;
    
    const newFiltered = documents.filter(doc => {
      const matchesSearch =
        searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = category === "Semua" || doc.category === category;
      const matchesDepartment = department === "Semua" || doc.department === department;
      const matchesPriority = priority === "Semua" || doc.priority === priority;
      const matchesFavorites = !showFavoritesOnly || doc.is_favorite;
      const matchesMandatory = !showMandatoryOnly || doc.is_mandatory;

      return matchesSearch && matchesCategory && matchesDepartment && matchesPriority && matchesFavorites && matchesMandatory;
    });

    setFilteredDocuments(newFiltered);
  }, [documents, activeFilters]);

  const toggleFavorite = (docId: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_favorite: !doc.is_favorite } : doc)));
  };

  const toggleMandatory = (docId: string) => {
    if (userRole !== "admin") return;
    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_mandatory: !doc.is_mandatory } : doc)));
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semua Dokumen</h1>
          <p className="text-muted-foreground">Kelola dan akses semua dokumen dalam sistem</p>
        </div>
        <Button asChild>
          <Link href="/documents/add"><Plus className="mr-2 h-4 w-4" />Tambah Dokumen</Link>
        </Button>
      </div>

      <DocumentFilters
        onFilterChange={handleFilterChange}
        onViewChange={setViewMode}
        visibleFilters={['category', 'department', 'favorites', 'mandatory']}
        resultCount={filteredDocuments.length}
      />

      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <Badge variant="outline" className="text-xs">{document.file_type}</Badge>
                    {document.is_mandatory && (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Wajib
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => toggleFavorite(document.id)} className={`p-1 h-auto ${document.is_favorite ? "text-red-500" : "text-gray-400"}`}>
                      <Heart className="w-4 h-4" fill={document.is_favorite ? "currentColor" : "none"} />
                    </Button>
                    {userRole === "admin" && (
                      <Button variant="ghost" size="sm" onClick={() => toggleMandatory(document.id)} className="p-1 h-auto">
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
                      <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(document.created_at)}</span></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{document.file_size}</span>
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
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredDocuments.map((document) => (
                <div key={document.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Link href={`/documents/${document.id}`} className="font-medium text-gray-900 truncate hover:underline">{document.title}</Link>
                        {document.is_mandatory && <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs"><Star className="w-3 h-3 mr-1 fill-current" />Wajib</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1 mb-2">{document.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{document.author}</span>
                        <span>{document.department}</span>
                        <span>{formatDate(document.created_at)}</span>
                        <span>{getVerificationBadge(document.verification_status)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => toggleFavorite(document.id)}><Heart className={`w-4 h-4 ${document.is_favorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} /></Button>
                    <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tidak Ada Dokumen Ditemukan</h3>
            <p className="text-muted-foreground text-center mb-4">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}