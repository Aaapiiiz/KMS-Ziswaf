"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Check, X, Clock, AlertCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { AdminRouteGuard } from "@/components/admin-route-guard"

const pendingDocuments = [
  {
    id: 1,
    title: "Laporan Evaluasi Program Beasiswa Q4 2024",
    description: "Evaluasi komprehensif program beasiswa untuk mahasiswa kurang mampu",
    submittedBy: "Siti Nurhaliza",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    department: "Pendayagunaan",
    type: "PDF",
    size: "2.4 MB",
    submittedDate: "2024-01-15",
    priority: "high",
    tags: ["evaluasi", "beasiswa", "laporan"],
    status: "pending",
  },
  {
    id: 2,
    title: "SOP Verifikasi Mustahik Terbaru",
    description: "Standard Operating Procedure untuk verifikasi penerima bantuan",
    submittedBy: "Ahmad Fauzi",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    department: "Pendayagunaan",
    type: "DOC",
    size: "1.8 MB",
    submittedDate: "2024-01-12",
    priority: "medium",
    tags: ["sop", "verifikasi", "mustahik"],
    status: "pending",
  },
  {
    id: 3,
    title: "Template Proposal Program Bantuan",
    description: "Template standar untuk proposal program bantuan sosial",
    submittedBy: "Budi Santoso",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    department: "Marketing",
    type: "DOCX",
    size: "856 KB",
    submittedDate: "2024-01-10",
    priority: "low",
    tags: ["template", "proposal", "bantuan"],
    status: "pending",
  },
  {
    id: 4,
    title: "Laporan Keuangan Bulanan Desember",
    description: "Laporan keuangan lengkap untuk bulan Desember 2024",
    submittedBy: "Dewi Sartika",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    department: "Keuangan",
    type: "XLSX",
    size: "3.2 MB",
    submittedDate: "2024-01-08",
    priority: "high",
    tags: ["keuangan", "laporan", "bulanan"],
    status: "pending",
  },
]

const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing"]
const priorities = ["Semua", "high", "medium", "low"]

export default function VerificationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("Semua")
  const [priorityFilter, setPriorityFilter] = useState("Semua")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [verificationNote, setVerificationNote] = useState("")
  const router = useRouter()

  const filteredDocuments = pendingDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "Semua" || doc.department === departmentFilter
    const matchesPriority = priorityFilter === "Semua" || doc.priority === priorityFilter

    return matchesSearch && matchesDepartment && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Tinggi"
      case "medium":
        return "Sedang"
      case "low":
        return "Rendah"
      default:
        return priority
    }
  }

  const handleApprove = (docId: number) => {
    console.log("Approved document:", docId, "Note:", verificationNote)
    setVerificationNote("")
    setSelectedDocument(null)
  }

  const handleReject = (docId: number) => {
    console.log("Rejected document:", docId, "Note:", verificationNote)
    setVerificationNote("")
    setSelectedDocument(null)
  }

  return (
    <AdminRouteGuard>
      <div className="p-6 space-y-6">
        {/* Breadcrumb Navigation */}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verifikasi Dokumen</h1>
            <p className="text-gray-600">Review dan verifikasi dokumen yang menunggu persetujuan</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              <Clock className="w-4 h-4 mr-1" />
              {filteredDocuments.length} Menunggu
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari dokumen yang perlu diverifikasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Prioritas" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority === "Semua" ? "Semua" : getPriorityText(priority)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getPriorityColor(document.priority)}>
                        {getPriorityText(document.priority)}
                      </Badge>
                      <Badge variant="outline">{document.type}</Badge>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Menunggu Verifikasi
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{document.title}</h3>
                    <p className="text-gray-600 mb-4">{document.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src={document.submittedByAvatar || "/placeholder.svg"}
                            alt={document.submittedBy}
                          />
                          <AvatarFallback className="text-xs">
                            {document.submittedBy
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{document.submittedBy}</span>
                      </div>
                      <span>{document.department}</span>
                      <span>{document.submittedDate}</span>
                      <span>{document.size}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {document.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/documents/${document.id}/view`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Link>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => setSelectedDocument(document)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Setujui
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Setujui Dokumen</DialogTitle>
                          <DialogDescription>
                            Anda akan menyetujui dokumen "{selectedDocument?.title}". Dokumen akan dipublikasikan dan
                            dapat diakses oleh semua pengguna.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Catatan Verifikasi (Opsional)</label>
                            <Textarea
                              placeholder="Tambahkan catatan untuk persetujuan ini..."
                              value={verificationNote}
                              onChange={(e) => setVerificationNote(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                            Batal
                          </Button>
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => selectedDocument && handleApprove(selectedDocument.id)}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Setujui Dokumen
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setSelectedDocument(document)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Tolak
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tolak Dokumen</DialogTitle>
                          <DialogDescription>
                            Anda akan menolak dokumen "{selectedDocument?.title}". Dokumen akan dikembalikan ke pengirim
                            dengan catatan revisi.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Alasan Penolakan *</label>
                            <Textarea
                              placeholder="Jelaskan alasan penolakan dan saran perbaikan..."
                              value={verificationNote}
                              onChange={(e) => setVerificationNote(e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                            Batal
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => selectedDocument && handleReject(selectedDocument.id)}
                            disabled={!verificationNote.trim()}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Tolak Dokumen
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada dokumen untuk diverifikasi</h3>
            <p className="text-gray-600">Semua dokumen telah diverifikasi atau tidak ada yang sesuai dengan filter</p>
          </div>
        )}
      </div>
    </AdminRouteGuard>
  )
}
