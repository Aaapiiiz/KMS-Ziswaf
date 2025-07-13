"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  ExternalLink,
  Share2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Copy,
  Link,
  FileImage,
  FileSpreadsheet,
  Presentation,
  Globe,
} from "lucide-react"

interface DocumentViewerProps {
  document: {
    id: string
    title: string
    file_url?: string
    external_url?: string
    preview_url?: string
    file_type: string
    document_type: "file" | "link"
    platform?: string
    description?: string
    author: string
    department: string
    created_at: string
  }
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [showShareDialog, setShowShareDialog] = useState(false)

  const getPlatformIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case "google-docs":
        return <FileText className="w-4 h-4 text-blue-600" />
      case "google-sheets":
        return <FileSpreadsheet className="w-4 h-4 text-green-600" />
      case "google-slides":
        return <Presentation className="w-4 h-4 text-orange-600" />
      case "canva":
        return <FileImage className="w-4 h-4 text-purple-600" />
      case "figma":
        return <FileImage className="w-4 h-4 text-pink-600" />
      case "notion":
        return <FileText className="w-4 h-4 text-gray-800" />
      default:
        return <Globe className="w-4 h-4 text-gray-600" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case "google-docs":
        return "bg-blue-100 text-blue-700"
      case "google-sheets":
        return "bg-green-100 text-green-700"
      case "google-slides":
        return "bg-orange-100 text-orange-700"
      case "canva":
        return "bg-purple-100 text-purple-700"
      case "figma":
        return "bg-pink-100 text-pink-700"
      case "notion":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleShare = async () => {
    const shareUrl = document.document_type === "link" ? document.external_url : document.file_url
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: document.title,
          text: document.description,
          url: shareUrl,
        })
      } catch (error) {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(shareUrl)
      }
    } else if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
    }
  }

  const openInNewTab = () => {
    const url = document.document_type === "link" ? document.external_url : document.file_url
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const renderViewer = () => {
    if (document.document_type === "link") {
      return (
        <div className="aspect-[4/3] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-4">
            {getPlatformIcon(document.platform || "")}
            <div>
              <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{document.description}</p>
              {document.platform && (
                <Badge className={`mt-2 ${getPlatformColor(document.platform)}`}>
                  {document.platform.replace("-", " ").toUpperCase()}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={openInNewTab}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Buka Dokumen
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </div>
        </div>
      )
    }

    // File-based document viewer
    if (document.file_type.toUpperCase() === "PDF" && document.preview_url) {
      return (
        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border">
          <iframe
            src={document.preview_url}
            className="w-full h-full border-0"
            allow="autoplay"
            title={document.title}
          />
        </div>
      )
    }

    if (["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(document.file_type.toUpperCase())) {
      return (
        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={document.file_url || "/placeholder.svg"}
            alt={document.title}
            className="max-w-full max-h-full object-contain"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: "transform 0.2s ease",
            }}
          />
        </div>
      )
    }

    // Default viewer for other file types
    return (
      <div className="aspect-[4/3] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4">
          <FileText className="w-16 h-16 text-gray-400 mx-auto" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">Preview Tidak Tersedia</h3>
            <p className="text-sm text-gray-600 mt-1">
              File {document.file_type} tidak dapat ditampilkan dalam browser
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={openInNewTab}>
              <Download className="w-4 h-4 mr-2" />
              Download File
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan Link
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Viewer Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            {document.document_type === "link" ? <Link className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
            <span>{document.document_type === "link" ? "Link" : document.file_type}</span>
          </Badge>
          {document.platform && (
            <Badge className={getPlatformColor(document.platform)}>
              {document.platform.replace("-", " ").toUpperCase()}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {document.document_type === "file" &&
            ["PDF", "JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(document.file_type.toUpperCase()) && (
              <>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 min-w-[50px] text-center">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="outline" size="sm" onClick={() => setRotation((rotation + 90) % 360)}>
                  <RotateCw className="w-4 h-4" />
                </Button>
              </>
            )}

          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl h-[90vh]">
              <DialogHeader>
                <DialogTitle>{document.title}</DialogTitle>
                <DialogDescription>
                  {document.author} • {document.department} •{" "}
                  {new Date(document.created_at).toLocaleDateString("id-ID")}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-hidden">{renderViewer()}</div>
            </DialogContent>
          </Dialog>

          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bagikan Dokumen</DialogTitle>
                <DialogDescription>Pilih cara untuk membagikan dokumen ini</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{document.title}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {document.document_type === "link" ? document.external_url : document.file_url}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const url = document.document_type === "link" ? document.external_url : document.file_url
                        if (url) navigator.clipboard.writeText(url)
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleShare} className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan Link
                  </Button>
                  <Button variant="outline" onClick={openInNewTab} className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buka di Tab Baru
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Viewer */}
      {renderViewer()}
    </div>
  )
}
