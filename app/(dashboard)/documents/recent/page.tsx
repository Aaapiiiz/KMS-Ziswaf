"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  List,
  Grid3X3,
  ChevronDown,
  MoreHorizontal,
  FileText,
  FileSpreadsheet,
  FileImage,
  Video,
  Download,
  Share,
  Star,
  Trash2,
  Eye,
  Folder,
  Info,
} from "lucide-react"

// Data dokumen terbaru sesuai gambar Google Drive
const recentDocuments = {
  "Awal minggu ini": [
    {
      id: 1,
      name: "Log Aktivitas KP - Apis",
      type: "excel",
      size: "6 KB",
      location: "KP",
      owner: "saya",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      lastModified: "17 Jun",
      action: "Diubah oleh saya",
    },
    {
      id: 2,
      name: "TA display",
      type: "presentation",
      size: "1,5 MB",
      location: "Google AI Studio",
      owner: "saya",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      lastModified: "16 Jun",
      action: "Diubah oleh saya",
    },
    {
      id: 3,
      name: "Data Analytics.mp4",
      type: "video",
      size: "468,1 MB",
      location: "Tugas Besar II4013 - ...",
      owner: "saya",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      lastModified: "16 Jun",
      action: "Diupload",
      shared: true,
    },
  ],
  "Minggu lalu": [
    {
      id: 4,
      name: "Private Notebook - 18221167.ipynb",
      type: "notebook",
      size: "5,6 MB",
      location: "Tugas Besar II4013 - ...",
      owner: "saya",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      lastModified: "15 Jun",
      action: "Diubah oleh saya",
      shared: true,
    },
    {
      id: 5,
      name: "Laporan Tugas Besar II4013 (O...",
      type: "document",
      size: "3 MB",
      location: "Tugas Besar II4013 - ...",
      owner: "18221045 Ivan Aldy Gane...",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      lastModified: "15 Jun",
      action: "Dibuka oleh saya",
    },
    {
      id: 6,
      name: "Private Notebook - 18221045.ipynb",
      type: "notebook",
      size: "1,6 MB",
      location: "Tugas Besar II4013 - ...",
      owner: "18221045 Ivan Aldy Gane...",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      lastModified: "15 Jun",
      action: "Dibuka oleh saya",
      shared: true,
    },
    {
      id: 7,
      name: "backend setting",
      type: "presentation",
      size: "310 KB",
      location: "Google AI Studio",
      owner: "saya",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      lastModified: "15 Jun",
      action: "Diubah oleh saya",
    },
    {
      id: 8,
      name: "image.png",
      type: "image",
      size: "88 KB",
      location: "Google AI Studio",
      owner: "saya",
      ownerAvatar: "/placeholder.svg?height=32&width=32",
      lastModified: "15 Jun",
      action: "Diupload",
    },
  ],
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "excel":
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />
    case "presentation":
      return (
        <div className="h-5 w-5 bg-purple-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">P</span>
        </div>
      )
    case "video":
      return <Video className="h-5 w-5 text-red-600" />
    case "notebook":
      return (
        <div className="h-5 w-5 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">N</span>
        </div>
      )
    case "document":
      return <FileText className="h-5 w-5 text-blue-600" />
    case "image":
      return <FileImage className="h-5 w-5 text-red-500" />
    default:
      return <FileText className="h-5 w-5 text-gray-600" />
  }
}

export default function RecentDocumentsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [selectedType, setSelectedType] = useState("Jenis")
  const [selectedPerson, setSelectedPerson] = useState("Orang")
  const [selectedModified, setSelectedModified] = useState("Dimodifikasi")
  const [selectedSource, setSelectedSource] = useState("Sumber")

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Terbaru</h1>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="justify-between min-w-[100px]">
              {selectedType}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedType("Jenis")}>Jenis</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("PDF")}>PDF</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("Excel")}>Excel</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("Video")}>Video</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("Gambar")}>Gambar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="justify-between min-w-[100px]">
              {selectedPerson}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedPerson("Orang")}>Orang</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPerson("Saya")}>Saya</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPerson("Tim")}>Tim</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="justify-between min-w-[120px]">
              {selectedModified}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedModified("Dimodifikasi")}>Dimodifikasi</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedModified("Hari ini")}>Hari ini</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedModified("Minggu ini")}>Minggu ini</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedModified("Bulan ini")}>Bulan ini</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="justify-between min-w-[100px]">
              {selectedSource}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedSource("Sumber")}>Sumber</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedSource("Upload")}>Upload</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedSource("Import")}>Import</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
          <div className="col-span-5">Nama</div>
          <div className="col-span-2">Pemilik</div>
          <div className="col-span-2">Ukuran file</div>
          <div className="col-span-2">Lokasi</div>
          <div className="col-span-1"></div>
        </div>

        {Object.entries(recentDocuments).map(([timeGroup, documents]) => (
          <div key={timeGroup} className="space-y-1">
            {/* Time Group Header */}
            <h3 className="text-sm font-medium text-gray-600 px-4 py-1">{timeGroup}</h3>

            {/* Documents in this time group */}
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="grid grid-cols-12 gap-4 px-4 py-2 hover:bg-gray-50 rounded-lg group cursor-pointer items-center"
              >
                {/* Name Column */}
                <div className="col-span-5 flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getFileIcon(doc.type)}
                    {doc.shared && (
                      <div className="flex items-center">
                        <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {doc.lastModified} • {doc.action}
                    </p>
                  </div>
                </div>

                {/* Owner Column */}
                <div className="col-span-2 flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={doc.ownerAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{doc.owner.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700 truncate">{doc.owner}</span>
                </div>

                {/* File Size Column */}
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">{doc.size}</span>
                </div>

                {/* Location Column */}
                <div className="col-span-2 flex items-center space-x-1">
                  <Folder className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700 truncate">{doc.location}</span>
                </div>

                {/* Actions Column */}
                <div className="col-span-1 flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="mr-2 h-4 w-4" />
                        Bagikan
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        Tambah ke Favorit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
