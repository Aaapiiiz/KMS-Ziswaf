"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Heart,
  Share2,
  Edit,
  Trash2,
  Clock,
  User,
  Building2,
  Tag,
} from "lucide-react"

// Mock data - in real app, this would come from API
const getDocumentById = (id: string) => {
  const documents = [
    {
      id: "1",
      title: "Panduan Lengkap Ziswaf 2024",
      description:
        "Panduan komprehensif untuk pengelolaan ziswaf yang mencakup semua aspek dari pengumpulan hingga penyaluran dana ziswaf",
      department: "Pendayagunaan",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      uploadedBy: "Ahmad Fauzi",
      views: 1234,
      downloads: 456,
      isFavorite: true,
      status: "verified",
      tags: ["panduan", "ziswaf", "2024"],
      content: "Dokumen ini berisi panduan lengkap untuk pengelolaan ziswaf...",
      version: "1.2",
      lastModified: "2024-01-15T10:30:00Z",
    },
  ]

  return documents.find((doc) => doc.id === id)
}

export default function DocumentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(false)

  const document = getDocumentById(params.id as string)

  if (!document) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Dokumen tidak ditemukan</h3>
          <p className="text-gray-600 mb-4">Dokumen yang Anda cari mungkin telah dihapus atau dipindahkan</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    )
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In real app, this would make an API call
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Detail Dokumen</h1>
          <p className="text-gray-600">Informasi lengkap tentang dokumen</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <CardTitle className="text-xl">{document.title}</CardTitle>
                    <CardDescription className="mt-1">{document.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFavorite}
                    className={isFavorite || document.isFavorite ? "text-red-500" : "text-gray-400"}
                  >
                    <Heart className="w-4 h-4" fill={isFavorite || document.isFavorite ? "currentColor" : "none"} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Document Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{document.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{document.uploadedBy}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{document.uploadDate}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>{document.size}</span>
                </div>
              </div>

              <Separator />

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{document.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{document.downloads} downloads</span>
                  </div>
                </div>
                <Badge variant={document.status === "verified" ? "default" : "secondary"}>
                  {document.status === "verified" ? "Terverifikasi" : "Pending"}
                </Badge>
              </div>

              {/* Tags */}
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href={`/documents/${document.id}/view`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Dokumen
                  </Link>
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Document Content Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview Konten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{document.content}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href={`/documents/${document.id}/view`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Buka Dokumen
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan Link
              </Button>
            </CardContent>
          </Card>

          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tipe File:</span>
                <Badge variant="outline">{document.type}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ukuran:</span>
                <span>{document.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Versi:</span>
                <span>{document.version}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Diupload:</span>
                <span>{document.uploadDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Oleh:</span>
                <span>{document.uploadedBy}</span>
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dokumen Terkait</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Link href="/documents/2" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-sm">SOP Verifikasi Mustahik</div>
                  <div className="text-xs text-gray-500">Pendayagunaan • PDF</div>
                </Link>
                <Link href="/documents/3" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-sm">Template Laporan Bulanan</div>
                  <div className="text-xs text-gray-500">Keuangan • XLSX</div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
