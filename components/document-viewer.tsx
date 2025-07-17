// components/document-viewer.tsx

"use client";

import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Download, FileImage, FileSpreadsheet, Presentation, Globe } from "lucide-react";
import Image from "next/image";

interface DocumentViewerProps {
  document: {
    id: string;
    title: string;
    file_url?: string | null;
    external_url?: string | null;
    preview_url?: string | null;
    file_type?: string | null;
    document_type: "file" | "link";
    platform?: string | null;
    description?: string | null;
  };
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  // Helper to get an embeddable preview URL from a standard Google Drive link
  const getGoogleDrivePreviewUrl = (url: string | undefined | null): string | undefined => {
    if (!url || !url.includes("drive.google.com")) return undefined;
    
    // Updated, more robust Regex to capture the file ID
    const match = url.match(/drive\.google\.com\/(?:file\/d\/|document\/d\/|spreadsheets\/d\/|presentation\/d\/|drive\/folders\/)([\w-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url; // Fallback
  };

  const previewUrl = document.preview_url || getGoogleDrivePreviewUrl(document.external_url);

  const getPlatformIcon = (platform?: string | null) => {
    switch (platform?.toLowerCase()) {
      case "google-docs": return <FileText className="w-12 h-12 text-blue-600" />;
      case "google-sheets": return <FileSpreadsheet className="w-12 h-12 text-green-600" />;
      case "google-slides": return <Presentation className="w-12 h-12 text-orange-600" />;
      case "canva": return <FileImage className="w-12 h-12 text-purple-600" />;
      default: return <Globe className="w-12 h-12 text-gray-600" />;
    }
  };

  const openInNewTab = () => {
    const url = document.document_type === 'link' ? document.external_url : document.file_url;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const renderViewerContent = () => {
    if (document.document_type === 'link') {
      if (previewUrl) {
        return (
          <iframe
            src={previewUrl ?? ''} // <<< THE FIX IS APPLIED HERE
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media"
            title={document.title}
            sandbox="allow-scripts allow-same-origin"
          />
        );
      }
      return (
        <div className="w-full h-full bg-muted rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center space-y-4">
          {getPlatformIcon(document.platform)}
          <h3 className="text-lg font-semibold text-gray-900">{document.title}</h3>
          <p className="text-sm text-gray-600 max-w-sm">
            Ini adalah tautan ke dokumen eksternal. Untuk pengalaman terbaik, buka di tab baru.
          </p>
          <Button onClick={openInNewTab}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Buka Dokumen
          </Button>
        </div>
      );
    }

    const fileTypeUpper = document.file_type?.toUpperCase();
    if (fileTypeUpper === "PDF" && document.file_url) {
      return (
        <iframe
          src={document.file_url}
          className="w-full h-full border-0"
          title={document.title}
        />
      );
    }
    if (["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(fileTypeUpper || '') && document.file_url) {
      return (
        <div className="relative w-full h-full bg-muted rounded-lg flex items-center justify-center">
          <Image src={document.file_url} alt={document.title} layout="fill" objectFit="contain" />
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-muted rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <FileText className="w-12 h-12 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900">Preview Tidak Tersedia</h3>
        <p className="text-sm text-gray-600">File {document.file_type} tidak dapat ditampilkan di browser.</p>
        <Button onClick={openInNewTab}><Download className="w-4 h-4 mr-2" /> Download File</Button>
      </div>
    );
  };

  return (
    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
      {renderViewerContent()}
    </div>
  );
} 