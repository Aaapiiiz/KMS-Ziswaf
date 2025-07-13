"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, Download, Eye, Heart, Clock, Building2, Plus, ArrowLeft, Star, X } from "lucide-react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

const documents = [
  {
    id: 1,
    title: "Panduan Lengkap Ziswaf 2024",
    description: "Panduan komprehensif untuk pengelolaan ziswaf",
    department: "Pendayagunaan",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    views: 1234,
    downloads: 456,
    isFavorite: true,
    isMandatory: true,
    status: "verified",
    tags: ["panduan", "ziswaf", "2024"],
  },
  {
    id: 2,
    title: "SOP Verifikasi Mustahik",
    description: "Standard Operating Procedure untuk verifikasi penerima bantuan",
    department: "Pendayagunaan",
    type: "DOC",
    size: "1.8 MB",
    uploadDate: "2024-01-12",
    views: 892,
    downloads: 234,
    isFavorite: false,
    isMandatory: true,
    status: "verified",
    tags: ["sop", "verifikasi", "mustahik"],
  },
  {
    id: 3,
    title: "Template Laporan Bulanan",
    description: "Template standar untuk laporan bulanan departemen",
    department: "Keuangan",
    type: "XLSX",
    size: "856 KB",
    uploadDate: "2024-01-10",
    views: 567,
    downloads: 123,
    isFavorite: true,
    isMandatory: false,
    status: "pending",
    tags: ["template", "laporan", "bulanan"],
  },
  {
    id: 4,
    title: "Daftar Mitra Strategis 2024",
    description: "Database lengkap mitra strategis dan informasi kontak",
    department: "Marketing",
    type: "PDF",
    size: "3.2 MB",
    uploadDate: "2024-01-08",
    views: 445,
    downloads: 89,
    isFavorite: false,
    isMandatory: false,
    status: "verified",
    tags: ["mitra", "strategis", "kontak"],
  },
  {
    id: 5,
    title: "Kebijakan Keamanan Data",
    description: "Panduan keamanan data dan privasi organisasi",
    department: "IT",
    type: "PDF",
    size: "1.2 MB",
    uploadDate: "2024-01-05",
    views: 678,
    downloads: 145,
    isFavorite: false,
    isMandatory: true,
    status: "verified",
    tags: ["keamanan", "data", "kebijakan"],
  },
]

const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing"]
const documentTypes = ["Semua", "PDF", "DOC", "XLSX", "PPT"]
// const sortOptions = ["Terbaru", "Terlama", "Nama A-Z", "Nama Z-A", "Paling Populer"]
const statusOptions = ["Semua", "Terverifikasi", "Pending", "Ditolak"]

export default function DocumentSearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("Semua")
  const [selectedType, setSelectedType] = useState("Semua") 
  // const [sortBy, setSortBy] = useState("Terbaru")
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [showMandatoryOnly, setShowMandatoryOnly] = useState(false)
  const [showStarredOnly, setShowStarredOnly] = useState(false)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDepartment = selectedDepartment === "Semua" || doc.department === selectedDepartment
    const matchesType = selectedType === "Semua" || doc.type === selectedType
    const matchesFavorites = !showFavoritesOnly || doc.isFavorite
    const matchesStatus =
      selectedStatus === "Semua" ||
      (selectedStatus === "Terverifikasi" && doc.status === "verified") ||
      (selectedStatus === "Pending" && doc.status === "pending") ||
      (selectedStatus === "Ditolak" && doc.status === "rejected")

    return matchesSearch && matchesDepartment && matchesType && matchesFavorites && matchesStatus
  })

  const handleBackClick = () => {
    router.push("/dashboard")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav />

      {/* Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleBackClick} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pencarian Dokumen</h1>
            <p className="text-gray-600">Temukan dokumen yang Anda butuhkan dengan mudah</p>
          </div>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/documents/add">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Dokumen
          </Link>
        </Button>
      </div>

      {/* Filter Button - hanya Favorit Saja */}
      <div className="flex items-center gap-2">
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={showFavoritesOnly ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
        >
          <Heart className="w-4 h-4 mr-2" />
          Favorit Saja
        </Button>
        {showFavoritesOnly && (
          <span className="text-sm text-gray-600">
            {documents.filter((doc) => doc.isFavorite).length} dokumen ditemukan
          </span>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari dokumen, deskripsi, atau tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600">
              Menampilkan {filteredDocuments.length} dari {documents.length} dokumen
            </p>
            {showFavoritesOnly && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>Favorit</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => setShowFavoritesOnly(false)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                    {doc.isMandatory && (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Wajib
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {doc.isMandatory && <Star className="w-4 h-4 text-orange-500 fill-current" />}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-1 ${doc.isFavorite ? "text-red-500" : "text-gray-400"}`}
                    >
                      <Heart className="w-4 h-4" fill={doc.isFavorite ? "currentColor" : "none"} />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Building2 className="w-4 h-4" />
                    <span>{doc.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{doc.uploadDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{doc.size}</span>
                  <div className="flex items-center space-x-3">
                    <span>{doc.views} views</span>
                    <span>{doc.downloads} downloads</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge variant={doc.status === "verified" ? "default" : "secondary"} className="text-xs">
                    {doc.status === "verified" ? "Terverifikasi" : "Pending"}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/documents/${doc.id}/view`}>
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

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada dokumen ditemukan</h3>
            <p className="text-gray-600 mb-4">Coba ubah filter pencarian atau tambahkan dokumen baru</p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/documents/add">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Dokumen
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
