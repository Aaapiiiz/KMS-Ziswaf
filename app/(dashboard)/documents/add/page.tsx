"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  X,
  Plus,
  Tag,
  Folder,
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  User,
  Calendar,
  FileType,
  HardDrive,
  Link,
  FileSpreadsheet,
  Presentation,
  FileImage,
  Globe,
  ExternalLink,
  ArrowLeft,
  AtSign,
} from "lucide-react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { UserTagDialog } from "@/components/user-tag-dialog"
import { useRouter } from "next/navigation"

const programs = [
  "Program Beasiswa Mahasiswa",
  "Program Beasiswa Anak Yatim",
  "Program Beasiswa Vokasi",
  "Program Beasiswa Alumni",
]
const categories = ["Panduan", "SOP", "Template", "Laporan", "Evaluasi", "Database", "Presentasi", "Formulir"]
const fileTypes = ["PDF", "DOCX", "XLSX", "PPTX", "TXT", "ZIP"]
const priorities = ["Rendah", "Sedang", "Tinggi", "Kritis"]
const departments = ["Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing", "Operasional"]

const predefinedTags = [
  "ziswaf",
  "panduan",
  "sop",
  "template",
  "laporan",
  "evaluasi",
  "keuangan",
  "pendayagunaan",
  "penghimpunan",
  "mustahik",
  "muzakki",
  "beasiswa",
  "kesehatan",
  "umkm",
  "infrastruktur",
  "dakwah",
  "monitoring",
  "verifikasi",
  "validasi",
  "distribusi",
  "penyaluran",
  "audit",
  "compliance",
  "training",
  "workshop",
  "meeting",
  "presentation",
]

// Mock users for tagging
const users = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad.fauzi@ziswaf.com", department: "Pendayagunaan" },
  { id: 2, name: "Siti Nurhaliza", email: "siti.nurhaliza@ziswaf.com", department: "Pendayagunaan" },
  { id: 3, name: "Budi Santoso", email: "budi.santoso@ziswaf.com", department: "IT" },
  { id: 4, name: "Maya Sari", email: "maya.sari@ziswaf.com", department: "Keuangan" },
  { id: 5, name: "Andi Rahman", email: "andi.rahman@ziswaf.com", department: "SDM" },
]

export default function AddDocumentPage() {
  const router = useRouter()
  const [documentType, setDocumentType] = useState<"file" | "link">("file")
  const [linkData, setLinkData] = useState({
    url: "",
    platform: "",
  })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    program: "",
    fileType: "",
    priority: "Sedang",
    isRequired: false,
    isMandatory: false,
    version: "1.0",
    author: "",
    location: "",
    expiryDate: "",
    relatedDocuments: "",
    accessLevel: "organizational", // organizational, public
    language: "id",
  })

  const [tags, setTags] = useState<string[]>([])
  const [departmentTags, setDepartmentTags] = useState<string[]>([])
  const [taggedUsers, setTaggedUsers] = useState<typeof users>([])
  const [newTag, setNewTag] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setIsUploading(true)

      // Auto-fill some fields based on file
      const fileExtension = file.name.split(".").pop()?.toUpperCase()
      if (fileExtension && fileTypes.includes(fileExtension)) {
        handleInputChange("fileType", fileExtension)
      }

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
        }
      }, 200)

      // Auto-generate location based on program and category
      if (formData.program && formData.category) {
        const location = `/documents/${formData.program.toLowerCase().replace(/\s+/g, "-")}/${formData.category.toLowerCase()}/`
        handleInputChange("location", location)
      }
    }
  }

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addDepartmentTag = (dept: string) => {
    if (!departmentTags.includes(dept)) {
      setDepartmentTags([...departmentTags, dept])
    }
  }

  const removeDepartmentTag = (deptToRemove: string) => {
    setDepartmentTags(departmentTags.filter((dept) => dept !== deptToRemove))
  }

  const addUserTag = (user: (typeof users)[0]) => {
    if (!taggedUsers.find((u) => u.id === user.id)) {
      setTaggedUsers([...taggedUsers, user])
    }
  }

  const removeUserTag = (userId: number) => {
    setTaggedUsers(taggedUsers.filter((user) => user.id !== userId))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Judul dokumen wajib diisi"
    if (!formData.description.trim()) newErrors.description = "Deskripsi dokumen wajib diisi"
    if (!formData.category) newErrors.category = "Kategori wajib dipilih"
    if (!formData.program) newErrors.program = "Program wajib dipilih"
    if (!formData.author.trim()) newErrors.author = "Nama penulis wajib diisi"
    if (!formData.location.trim()) newErrors.location = "Lokasi file wajib diisi"
    if (documentType === "file" && !uploadedFile) newErrors.file = "File dokumen wajib diupload"
    if (documentType === "link" && !linkData.url.trim()) newErrors.url = "URL dokumen wajib diisi"
    if (tags.length === 0) newErrors.tags = "Minimal 1 tag wajib ditambahkan"
    if (departmentTags.length === 0) newErrors.departmentTags = "Minimal 1 departemen wajib ditag"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Simulate form submission
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        // Redirect to documents page or show success message
        alert("Dokumen berhasil ditambahkan dan otomatis diajukan untuk verifikasi admin!")
        router.push("/documents")
      }
    }, 100)
  }

  const generateLocation = () => {
    if (formData.program && formData.category) {
      const location = `/documents/${formData.program.toLowerCase().replace(/\s+/g, "-")}/${formData.category.toLowerCase()}/`
      handleInputChange("location", location)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <BreadcrumbNav />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/documents")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tambah Dokumen Baru</h1>
              <p className="text-gray-600">Upload dan kelola dokumen untuk knowledge management system</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Informasi Dasar</span>
              </CardTitle>
              <CardDescription>Informasi utama tentang dokumen yang akan diupload</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tipe Dokumen *</Label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={documentType === "file" ? "default" : "outline"}
                    onClick={() => setDocumentType("file")}
                    className="flex-1"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button
                    type="button"
                    variant={documentType === "link" ? "default" : "outline"}
                    onClick={() => setDocumentType("link")}
                    className="flex-1"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Link Eksternal
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul Dokumen *</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul dokumen yang deskriptif"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan isi dan tujuan dokumen ini secara detail"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Pilih kategori dokumen" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Program *</Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) => {
                      handleInputChange("program", value)
                      generateLocation()
                    }}
                  >
                    <SelectTrigger className={errors.program ? "border-red-500" : ""}>
                      <SelectValue placeholder="Pilih program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program} value={program}>
                          <div className="flex items-center space-x-2">
                            <Folder className="w-4 h-4" />
                            <span>{program}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.program && <p className="text-sm text-red-500">{errors.program}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Penulis/Author *</Label>
                  <Input
                    id="author"
                    placeholder="Nama penulis dokumen"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className={errors.author ? "border-red-500" : ""}
                  />
                  {errors.author && <p className="text-sm text-red-500">{errors.author}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Versi</Label>
                  <Input
                    id="version"
                    placeholder="1.0"
                    value={formData.version}
                    onChange={(e) => handleInputChange("version", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioritas</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {documentType === "file" ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload File</span>
                </CardTitle>
                <CardDescription>Upload file dokumen yang akan disimpan dalam sistem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">File Dokumen *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Klik untuk upload atau drag & drop file di sini</p>
                      <p className="text-xs text-gray-500">
                        Mendukung: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, ZIP (Max: 50MB)
                      </p>
                    </label>
                  </div>
                  {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                </div>

                {uploadedFile && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">{uploadedFile.name}</span>
                        <Badge variant="outline">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</Badge>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setUploadedFile(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {isUploading && (
                      <div className="space-y-1">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-xs text-gray-500">Uploading... {uploadProgress}%</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fileType">Tipe File</Label>
                    <Select value={formData.fileType} onValueChange={(value) => handleInputChange("fileType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe file" />
                      </SelectTrigger>
                      <SelectContent>
                        {fileTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center space-x-2">
                              <FileType className="w-4 h-4" />
                              <span>{type}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Tanggal Kadaluarsa</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="w-5 h-5" />
                  <span>Link Dokumen</span>
                </CardTitle>
                <CardDescription>
                  Tambahkan link ke dokumen eksternal seperti Google Docs, Sheets, Canva, dll.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="documentUrl">URL Dokumen *</Label>
                  <Input
                    id="documentUrl"
                    placeholder="https://docs.google.com/document/d/..."
                    value={linkData.url}
                    onChange={(e) => setLinkData((prev) => ({ ...prev, url: e.target.value }))}
                    className={errors.url ? "border-red-500" : ""}
                  />
                  {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={linkData.platform}
                    onValueChange={(value) => setLinkData((prev) => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih platform dokumen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google-docs">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>Google Docs</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="google-sheets">
                        <div className="flex items-center space-x-2">
                          <FileSpreadsheet className="w-4 h-4 text-green-600" />
                          <span>Google Sheets</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="google-slides">
                        <div className="flex items-center space-x-2">
                          <Presentation className="w-4 h-4 text-orange-600" />
                          <span>Google Slides</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="canva">
                        <div className="flex items-center space-x-2">
                          <FileImage className="w-4 h-4 text-purple-600" />
                          <span>Canva</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="figma">
                        <div className="flex items-center space-x-2">
                          <FileImage className="w-4 h-4 text-pink-600" />
                          <span>Figma</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="notion">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-800" />
                          <span>Notion</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-600" />
                          <span>Platform Lain</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <ExternalLink className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900">Tips untuk Link Dokumen:</p>
                      <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                        <li>• Pastikan link dapat diakses oleh tim</li>
                        <li>• Gunakan link sharing yang tepat (view/edit)</li>
                        <li>• Periksa permission sebelum menyimpan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location and Organization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Folder className="w-5 h-5" />
                <span>Lokasi & Organisasi</span>
              </CardTitle>
              <CardDescription>Tentukan lokasi penyimpanan berdasarkan program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi File *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    placeholder="/documents/program/kategori/"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className={`flex-1 ${errors.location ? "border-red-500" : ""}`}
                  />
                  <Button type="button" variant="outline" onClick={generateLocation}>
                    <HardDrive className="w-4 h-4 mr-2" />
                    Auto
                  </Button>
                </div>
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                <p className="text-xs text-gray-500">Lokasi akan menentukan struktur folder berdasarkan program</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessLevel">Level Akses</Label>
                <Select value={formData.accessLevel} onValueChange={(value) => handleInputChange("accessLevel", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organizational">Organizational - Seluruh organisasi</SelectItem>
                    <SelectItem value="public">Public - Dapat diakses publik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="relatedDocuments">Dokumen Terkait</Label>
                <Input
                  id="relatedDocuments"
                  placeholder="ID atau nama dokumen yang terkait (pisahkan dengan koma)"
                  value={formData.relatedDocuments}
                  onChange={(e) => handleInputChange("relatedDocuments", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Department Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Departemen Terlibat</span>
              </CardTitle>
              <CardDescription>Pilih departemen yang perlu akses ke dokumen ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Departemen yang Terlibat *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      type="button"
                      variant={departmentTags.includes(dept) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (departmentTags.includes(dept)) {
                          removeDepartmentTag(dept)
                        } else {
                          addDepartmentTag(dept)
                        }
                      }}
                      className="justify-start"
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      {dept}
                    </Button>
                  ))}
                </div>
                {errors.departmentTags && <p className="text-sm text-red-500">{errors.departmentTags}</p>}
              </div>

              <div className="space-y-2">
                <Label>Departemen Terpilih</Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                  {departmentTags.map((dept) => (
                    <Badge key={dept} variant="secondary" className="flex items-center space-x-1">
                      <Building2 className="w-3 h-3" />
                      <span>{dept}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeDepartmentTag(dept)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {departmentTags.length === 0 && (
                    <p className="text-sm text-gray-500">Belum ada departemen yang dipilih</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Tagging */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AtSign className="w-5 h-5" />
                  <span>Tag Pengguna</span>
                </div>
                <UserTagDialog
                  taggedUsers={taggedUsers}
                  onUserTag={addUserTag}
                  onUserUntag={removeUserTag}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Tag Pengguna
                    </Button>
                  }
                />
              </CardTitle>
              <CardDescription>Tag pengguna yang perlu diberitahu tentang dokumen ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pengguna yang Di-tag</Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                  {taggedUsers.map((user) => (
                    <Badge key={user.id} variant="secondary" className="flex items-center space-x-1">
                      <AtSign className="w-3 h-3" />
                      <span>{user.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeUserTag(user.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {taggedUsers.length === 0 && <p className="text-sm text-gray-500">Belum ada pengguna yang di-tag</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="w-5 h-5" />
                <span>Tags & Metadata</span>
              </CardTitle>
              <CardDescription>Tambahkan tags untuk memudahkan pencarian dan kategorisasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tags Terpilih</Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {tags.length === 0 && <p className="text-sm text-gray-500">Belum ada tags yang dipilih</p>}
                </div>
                {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
              </div>

              <div className="space-y-2">
                <Label>Tags Tersedia</Label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                  {predefinedTags.map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant={tags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (tags.includes(tag)) {
                          removeTag(tag)
                        } else {
                          addTag(tag)
                        }
                      }}
                      className="justify-start text-xs"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newTag">Tambah Tag Baru</Label>
                <div className="flex space-x-2">
                  <Input
                    id="newTag"
                    placeholder="Ketik tag baru"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag(newTag)
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={() => addTag(newTag)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isRequired"
                  checked={formData.isRequired}
                  onCheckedChange={(checked) => handleInputChange("isRequired", checked as boolean)}
                />
                <Label htmlFor="isRequired" className="text-sm">
                  Dokumen Wajib Dibaca
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isMandatory"
                  checked={formData.isMandatory}
                  onCheckedChange={(checked) => handleInputChange("isMandatory", checked as boolean)}
                />
                <Label htmlFor="isMandatory" className="text-sm">
                  Dokumen Kepegawaian Wajib
                </Label>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Verifikasi Otomatis</p>
                    <p className="text-blue-700 text-xs mt-1">
                      Setiap dokumen akan otomatis diajukan untuk verifikasi admin setelah diupload.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">{formData.title || "Judul Dokumen"}</h4>
                <p className="text-xs text-gray-600 mb-2">{formData.description || "Deskripsi dokumen..."}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>{formData.author || "Penulis"}</span>
                  <span>•</span>
                  <span>{formData.program || "Program"}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date().toLocaleDateString("id-ID")}</span>
                  <span>•</span>
                  <span>{formData.category || "Kategori"}</span>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                {departmentTags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Departemen:</p>
                    <div className="flex flex-wrap gap-1">
                      {departmentTags.slice(0, 2).map((dept) => (
                        <Badge key={dept} variant="outline" className="text-xs">
                          <Building2 className="w-3 h-3 mr-1" />
                          {dept}
                        </Badge>
                      ))}
                      {departmentTags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{departmentTags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                {taggedUsers.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Tagged Users:</p>
                    <div className="flex flex-wrap gap-1">
                      {taggedUsers.slice(0, 2).map((user) => (
                        <Badge key={user.id} variant="outline" className="text-xs">
                          <AtSign className="w-3 h-3 mr-1" />
                          {user.name}
                        </Badge>
                      ))}
                      {taggedUsers.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{taggedUsers.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status Info */}
          <Card>
            <CardHeader>
              <CardTitle>Status Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                {uploadedFile || linkData.url ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                )}
                <span>
                  {documentType === "file"
                    ? uploadedFile
                      ? "File siap diupload"
                      : "Belum ada file dipilih"
                    : linkData.url
                      ? "Link siap disimpan"
                      : "Belum ada link dimasukkan"}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Status: Akan diverifikasi admin otomatis</span>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Mengupload... {uploadProgress}%
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Simpan Dokumen
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
