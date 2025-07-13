"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, FileText, Calendar, Heart, Star, Eye, Download, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth" // <-- STEP 1: IMPORT THE AUTH HOOK

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
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "favorites" | "mandatory">("all")
  
  // STEP 2: GET THE REAL USER AND ROLE FROM THE AUTH HOOK
  const { user, userRole } = useAuth() 

  // STEP 3: DELETE THE OLD MOCK USER STATE
  // const [currentUser] = useState({ role: "admin" }) // <-- This line is deleted

  useEffect(() => {
    // This mock data is fine for now, we'll replace it with a database call later
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
      },
    ]

    setDocuments(mockDocuments)
    setFilteredDocuments(mockDocuments)
  }, [])

  useEffect(() => {
    let filtered = documents

    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (filterType === "favorites") {
      filtered = filtered.filter((doc) => doc.is_favorite)
    } else if (filterType === "mandatory") {
      filtered = filtered.filter((doc) => doc.is_mandatory)
    }

    setFilteredDocuments(filtered)
  }, [documents, searchQuery, filterType])

  const toggleFavorite = (docId: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_favorite: !doc.is_favorite } : doc)))
  }

  const toggleMandatory = (docId: string) => {
    // STEP 4: USE THE REAL userRole FROM THE HOOK
    if (userRole !== "admin") return
    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_mandatory: !doc.is_mandatory } : doc)))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  
  const getVerificationBadge = (status: Document["verification_status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terverifikasi
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="h-3 w-3 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semua Dokumen</h1>
          <p className="text-muted-foreground">Kelola dan akses semua dokumen dalam sistem</p>
        </div>
        <Button asChild>
          <Link href="/documents/add">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Dokumen
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Cari dokumen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={filterType === "all" ? "default" : "outline"} onClick={() => setFilterType("all")} size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Semua
          </Button>
          <Button
            variant={filterType === "favorites" ? "default" : "outline"}
            onClick={() => setFilterType("favorites")}
            size="sm"
          >
            <Heart className="mr-2 h-4 w-4" />
            Favorit
          </Button>
          <Button
            variant={filterType === "mandatory" ? "default" : "outline"}
            onClick={() => setFilterType("mandatory")}
            size="sm"
          >
            <Star className="mr-2 h-4 w-4" />
            Wajib Saja
          </Button>
        </div>
      </div>

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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(document.id)}
                    className={`p-1 h-auto ${document.is_favorite ? "text-red-500" : "text-gray-400"}`}
                  >
                    <Heart className="w-4 h-4" fill={document.is_favorite ? "currentColor" : "none"} />
                  </Button>
                  
                  {/* STEP 5: USE THE REAL userRole FROM THE HOOK */}
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
                    <div className="flex items-center space-x-1">
                       <Calendar className="w-4 h-4" />
                       <span>{formatDate(document.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{document.file_size}</span>
                     <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{document.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{document.downloads} downloads</span>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <div>
                  {getVerificationBadge(document.verification_status)}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/documents/${document.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tidak ada dokumen ditemukan</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery ? `Tidak ada dokumen yang cocok dengan pencarian "${searchQuery}"` : "Belum ada dokumen yang tersedia"}
            </p>
            <Button asChild>
              <Link href="/documents/add">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Dokumen Pertama
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}