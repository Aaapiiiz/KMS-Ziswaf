"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, X, AlertCircle, Link as LinkIcon, Loader2, Info } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase/client"; // <-- FIX: Import from the new client file
import type { Document } from "@/lib/supabase/client";

const categories = ["Panduan", "SOP", "Template", "Laporan", "Evaluasi", "Proposal", "Desain", "Notulensi", "Analisis", "Checklist", "Update"];
const priorities = ["low", "medium", "high"] as const;
const departments = ["Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing", "Penyaluran", "Audit"];
const platforms = ["google-docs", "google-sheets", "google-slides", "canva", "figma", "notion", "other"];

export default function AddDocumentPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [documentType, setDocumentType] = useState<"file" | "link">("file");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    department: "",
    author: user?.name || "",
    priority: "medium" as typeof priorities[number],
    version: "1.0",
    externalUrl: "",
    platform: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      if (errors.file) setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Judul wajib diisi";
    if (!formData.description.trim()) newErrors.description = "Deskripsi wajib diisi";
    if (!formData.category) newErrors.category = "Kategori wajib dipilih";
    if (!formData.department) newErrors.department = "Departemen wajib dipilih";
    if (documentType === "file" && !uploadedFile) newErrors.file = "File wajib di-upload";
    if (documentType === "link" && !formData.externalUrl.trim()) newErrors.url = "URL wajib diisi";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !validateForm()) return;

    setIsSubmitting(true);
    const documentDataToInsert: Partial<Document> = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      department: formData.department,
      author: formData.author,
      priority: formData.priority,
      version: formData.version,
      tags,
      uploaded_by: user.id,
      document_type: documentType,
      verification_status: 'pending',
      verification_requested_at: new Date().toISOString(),
      access_level: 'departmental', // default access level
      language: 'id',
    };

    try {
      if (documentType === 'file' && uploadedFile) {
        const fileExt = uploadedFile.name.split('.').pop()?.toLowerCase() || '';
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, uploadedFile);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(filePath);
        documentDataToInsert.file_url = publicUrl;
        documentDataToInsert.file_size = uploadedFile.size;
        documentDataToInsert.file_type = fileExt.toUpperCase();

      } else if (documentType === 'link') {
        documentDataToInsert.external_url = formData.externalUrl;
        documentDataToInsert.platform = formData.platform || 'other';
        documentDataToInsert.file_type = 'LINK';
      }

      const { error: insertError } = await supabase.from('documents').insert([documentDataToInsert]); // Wrap in an array for insert
      if (insertError) throw insertError;

      alert("Dokumen berhasil ditambahkan dan diajukan untuk verifikasi!");
      router.push("/documents");

    } catch (error) {
      console.error("Error submitting document:", error);
      alert(`Gagal menyimpan dokumen: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* <BreadcrumbNav /> */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Tambah Dokumen Baru</h1>
            <p className="text-gray-600">Upload dan kelola dokumen untuk knowledge management system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2"><Info className="w-5 h-5" /><span>Informasi Dasar</span></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Tipe Dokumen *</Label>
                    <div className="flex space-x-2 p-1 bg-muted rounded-lg">
                        <Button type="button" variant={documentType === "file" ? "default" : "ghost"} onClick={() => setDocumentType("file")} className="flex-1 shadow-sm data-[variant=default]:bg-white data-[variant=default]:text-primary"><Upload className="w-4 h-4 mr-2" /> Upload File</Button>
                        <Button type="button" variant={documentType === "link" ? "default" : "ghost"} onClick={() => setDocumentType("link")} className="flex-1 shadow-sm data-[variant=default]:bg-white data-[variant=default]:text-primary"><LinkIcon className="w-4 h-4 mr-2" /> Link Eksternal</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">Judul Dokumen *</Label>
                    <Input id="title" placeholder="Masukkan judul dokumen yang deskriptif" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} className={errors.title ? "border-red-500" : ""} />
                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi *</Label>
                    <Textarea id="description" placeholder="Jelaskan isi dan tujuan dokumen ini" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={3} className={errors.description ? "border-red-500" : ""} />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="category">Kategori *</Label><Select value={formData.category} onValueChange={(v) => handleInputChange("category", v)}><SelectTrigger className={errors.category ? "border-red-500" : ""}><SelectValue placeholder="Pilih kategori" /></SelectTrigger><SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>{errors.category && <p className="text-sm text-red-500">{errors.category}</p>}</div>
                    <div className="space-y-2"><Label htmlFor="department">Departemen *</Label><Select value={formData.department} onValueChange={(v) => handleInputChange("department", v)}><SelectTrigger className={errors.department ? "border-red-500" : ""}><SelectValue placeholder="Pilih departemen" /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>{errors.department && <p className="text-sm text-red-500">{errors.department}</p>}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label htmlFor="author">Penulis/Author *</Label><Input id="author" placeholder="Nama penulis" value={formData.author} onChange={(e) => handleInputChange("author", e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="version">Versi</Label><Input id="version" placeholder="1.0" value={formData.version} onChange={(e) => handleInputChange("version", e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="priority">Prioritas</Label><Select value={formData.priority} onValueChange={(v) => handleInputChange("priority", v as typeof priorities[number])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{priorities.map(p => <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                </div>

                {/* --- START: Tags Section --- */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (Opsional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="tags"
                      placeholder="Ketik tag lalu tekan Enter atau tombol Tambah"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(newTag);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addTag(newTag)}
                    >
                      Tambah
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tambahkan tag untuk mempermudah pencarian dokumen.
                  </p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                          <button
                            type="button"
                            className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            <span className="sr-only">Remove {tag}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                {/* --- END: Tags Section --- */}

            </CardContent>
          </Card>

          {documentType === 'file' ? (
             <Card>
              <CardHeader><CardTitle className="flex items-center space-x-2"><Upload className="w-5 h-5" /><span>Upload File</span></CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="file-upload">File Dokumen *</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="cursor-pointer space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-muted-foreground">Klik untuk upload atau drag & drop</p>
                      <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX, PPTX, JPG, PNG (MAX. 50MB)</p>
                    </label>
                  </div>
                  {errors.file && <p className="text-sm text-red-500 mt-2">{errors.file}</p>}
                </div>
                {uploadedFile && (
                  <div className="p-3 bg-muted rounded-lg mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 truncate"><FileText className="w-4 h-4" /> <span className="text-sm font-medium truncate">{uploadedFile.name}</span></div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setUploadedFile(null)}><X className="w-4 h-4" /></Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader><CardTitle className="flex items-center space-x-2"><LinkIcon className="w-5 h-5" /><span>Link Dokumen Eksternal</span></CardTitle></CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="documentUrl">URL Dokumen *</Label>
                   <Input id="documentUrl" placeholder="https://docs.google.com/..." value={formData.externalUrl} onChange={(e) => handleInputChange("externalUrl", e.target.value)} className={errors.url ? "border-red-500" : ""} />
                   {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="platform">Platform (opsional)</Label>
                   <Select value={formData.platform} onValueChange={(v) => handleInputChange("platform", v)}><SelectTrigger><SelectValue placeholder="Pilih platform" /></SelectTrigger><SelectContent>{platforms.map(p => <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' ')}</SelectItem>)}</SelectContent></Select>
                 </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader><CardTitle>Pengaturan Dokumen</CardTitle></CardHeader>
            <CardContent>
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-blue-900">Verifikasi Otomatis</p>
                            <p className="text-blue-700 text-xs mt-1">Setiap dokumen baru akan otomatis diajukan untuk verifikasi oleh admin sebelum dapat diakses oleh pengguna lain.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
          <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</> : <><Upload className="w-4 h-4 mr-2" /> Simpan & Ajukan Verifikasi</>}
          </Button>
        </div>
      </form>
    </div>
  )
}