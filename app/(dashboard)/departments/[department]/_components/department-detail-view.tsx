// app/(dashboard)/departments/[department]/_components/department-detail-view.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Building2, Loader2 } from "lucide-react";
import type { Document } from "@/lib/supabase";
import { supabase } from "@/lib/supabase"; // Impor instance Supabase sisi klien

interface DepartmentDetailViewProps {
  departmentData: {
    name: string;
    description: string;
    head: string;
    headAvatar: string;
    members: number;
  };
  // Prop 'documents' telah dihapus dari sini.
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });

export function DepartmentDetailView({ departmentData }: DepartmentDetailViewProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("documents")
        .select('*')
        .eq('department', departmentData.name)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`Error fetching documents for ${departmentData.name}:`, error);
      } else {
        setDocuments(data || []);
      }
      setLoading(false);
    };

    fetchDocuments();
  }, [departmentData.name]);

  return (
    <div className="p-6 space-y-6">
      {/* Header (tidak berubah) */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
            <Building2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{departmentData.name}</h1>
            <p className="text-gray-600 mt-1 max-w-xl">{departmentData.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="documents">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Dokumen ({loading ? "..." : documents.length})</TabsTrigger>
              <TabsTrigger value="members">Anggota</TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dokumen Departemen</CardTitle>
                  <CardDescription>Dokumen dan file penting yang dimiliki oleh departemen {departmentData.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
                    ) : documents.length > 0 ? (
                      documents.map((doc: Document) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <FileText className="w-8 h-8 text-blue-500 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 hover:underline"><Link href={`/documents/${doc.id}`}>{doc.title}</Link></h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                <Badge variant="outline">{doc.file_type}</Badge><span>•</span><span>{formatDate(doc.created_at)}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild><Link href={`/documents/${doc.id}`}>Lihat</Link></Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">Tidak ada dokumen yang ditemukan.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* ... sisa Tabs ... */}
          </Tabs>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Kepala Departemen</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12"><AvatarImage src={departmentData.headAvatar} alt={departmentData.head} /><AvatarFallback>{departmentData.head.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                <div><p className="font-medium text-gray-900">{departmentData.head}</p><p className="text-sm text-gray-500">Kepala Departemen</p></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Statistik Cepat</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Total Dokumen</span><span className="font-medium">{loading ? "..." : documents.length}</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Anggota Tim</span><span className="font-medium">{departmentData.members}</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}