"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DocumentViewer } from "@/components/document-viewer" // Make sure this path is correct
import {
  FileText,
  Download,
  Eye,
  Heart,
  Share2,
  Calendar,
  Building2,
  Tag,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  MessageSquare,
  ExternalLink,
  Link,
} from "lucide-react"

// Mock data - in real app, this would come from API
const documentData = {
  id: 1,
  title: "Laporan Evaluasi Program Beasiswa Q4 2024",
  description:
    "Evaluasi komprehensif program beasiswa untuk mahasiswa kurang mampu termasuk analisis dampak, efektivitas program, dan rekomendasi untuk periode selanjutnya.",
  category: "Laporan",
  department: "Pendayagunaan",
  author: "Siti Nurhaliza",
  authorEmail: "siti.nurhaliza@ziswaf.com",
  uploadDate: "2024-12-15T10:30:00",
  fileType: "PDF",
  fileSize: "2.4 MB",
  fileUrl: "/documents/laporan-evaluasi-beasiswa-q4-2024.pdf",
  preview_url: "https://drive.google.com/file/d/1kXV09Okj9zrEaBcq6TqOst_4WCxevq-I/preview", // The Google Drive preview link
  externalUrl: "https://docs.google.com/document/d/1234567890/edit",
  documentType: "file", // can be "file" or "link"
  platform: "google-docs", // for link type documents
  verificationStatus: "approved",
  verificationRequestedAt: "2024-12-15T10:35:00",
  tags: ["evaluasi", "beasiswa", "laporan", "q4-2024"],
  views: 45,
  downloads: 12,
  isFavorite: false,
  version: "1.2",
  location: "/documents/pendayagunaan/laporan/",
  priority: "high",
  accessLevel: "organizational",
  language: "id",
  expiryDate: "2025-12-31",
  relatedDocuments: "Template Evaluasi, Panduan Beasiswa",
}

export default function DocumentViewPage() {
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(documentData.isFavorite)

  const getVerificationStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Menunggu Verifikasi
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Terverifikasi
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        )
      case "revision_requested":
        return (
          <Badge className="bg-orange-100 text-orange-700">
            <RefreshCw className="w-3 h-3 mr-1" />
            Perlu Revisi
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700">Tinggi</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700">Sedang</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-700">Rendah</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{documentData.title}</h1>
          <p className="text-gray-600 max-w-3xl">{documentData.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getVerificationStatusBadge(documentData.verificationStatus)}
          {getPriorityBadge(documentData.priority)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Viewer */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {documentData.documentType === "link" ? (
                    <Link className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                  <span>Viewer Dokumen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">v{documentData.version}</Badge>
                  <Badge variant="outline">
                    <Eye className="w-3 h-3 mr-1" />
                    {documentData.views} views
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentViewer
                document={{
                  id: documentData.id.toString(),
                  title: documentData.title,
                  file_url: documentData.fileUrl,
                  external_url: documentData.externalUrl,
                  preview_url: documentData.preview_url, // Passing the preview url
                  file_type: documentData.fileType,
                  document_type: documentData.documentType as "file" | "link",
                  platform: documentData.platform,
                  description: documentData.description,
                  author: documentData.author,
                  department: documentData.department,
                  created_at: documentData.uploadDate,
                }}
              />
            </CardContent>
          </Card>

          {/* Document Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Aksi Dokumen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {documentData.documentType === "file" ? (
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                ) : (
                  <Button className="flex-1" onClick={() => window.open(documentData.externalUrl, "_blank")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buka Link
                  </Button>
                )}

                <Button variant="outline" className="flex-1" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "Unfavorite" : "Favorite"}
                </Button>

                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Bagikan
                </Button>

                <Button variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Komentar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={documentData.author} />
                  <AvatarFallback>
                    {documentData.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{documentData.author}</p>
                  <p className="text-sm text-gray-500">{documentData.authorEmail}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span>{documentData.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{formatDate(documentData.uploadDate)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {documentData.documentType === "link" ? (
                    <Link className="w-4 h-4 text-gray-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-gray-400" />
                  )}
                  <span>
                    {documentData.documentType === "link"
                      ? `Link • ${documentData.platform?.replace("-", " ").toUpperCase()}`
                      : `${documentData.fileType} • ${documentData.fileSize}`}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {documentData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Teknis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Versi:</span>
                  <span className="font-medium">v{documentData.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokasi:</span>
                  <span className="font-medium text-xs">{documentData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Akses:</span>
                  <Badge variant="outline" className="text-xs">
                    {documentData.accessLevel}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bahasa:</span>
                  <span className="font-medium">{documentData.language.toUpperCase()}</span>
                </div>
                {documentData.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kadaluarsa:</span>
                    <span className="font-medium text-xs">
                      {new Date(documentData.expiryDate).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          {documentData.relatedDocuments && (
            <Card>
              <CardHeader>
                <CardTitle>Dokumen Terkait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {documentData.relatedDocuments.split(", ").map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <FileText className="w-3 h-3 text-gray-400" />
                      <span className="text-blue-600 hover:underline cursor-pointer">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span>Dilihat</span>
                </div>
                <span className="font-medium">{documentData.views} kali</span>
              </div>
              {documentData.documentType === "file" && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-400" />
                    <span>Diunduh</span>
                  </div>
                  <span className="font-medium">{documentData.downloads} kali</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <span>Favorit</span>
                </div>
                <span className="font-medium">{isFavorite ? "Ya" : "Tidak"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}