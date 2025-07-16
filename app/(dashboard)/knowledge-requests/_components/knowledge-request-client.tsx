"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Clock, User, Calendar, Plus, Eye, CheckCircle, AlertCircle, XCircle, Loader2 } from "lucide-react";
import type { KnowledgeRequest as KnowledgeRequestType } from "../page";

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });

const getStatusBadge = (status: KnowledgeRequestType['status']) => {
    switch (status) {
        case "pending": return <Badge className="bg-blue-100 text-blue-700"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
        case "in_progress": return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Dalam Proses</Badge>;
        case "completed": return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Selesai</Badge>;
        case "cancelled": return <Badge className="bg-gray-100 text-gray-700"><XCircle className="h-3 w-3 mr-1" />Dibatalkan</Badge>;
        default: return <Badge variant="secondary">{status}</Badge>;
    }
};

const getPriorityBadge = (priority: KnowledgeRequestType['priority']) => {
    switch (priority) {
        case "high": return <Badge variant="destructive">HIGH</Badge>;
        case "medium": return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">MEDIUM</Badge>;
        case "low": return <Badge variant="outline">LOW</Badge>;
    }
};

const departments = ["Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing", "Penyaluran", "Audit"];

interface KnowledgeRequestClientProps {
    initialRequests: KnowledgeRequestType[];
}

export function KnowledgeRequestClient({ initialRequests }: KnowledgeRequestClientProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [requests, setRequests] = useState(initialRequests);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newRequest, setNewRequest] = useState({ title: '', description: '', department: user?.department || '', segmentId: '', priority: 'medium' as 'low' | 'medium' | 'high' });
  const [segmentOptions, setSegmentOptions] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);
  
  const fetchSegments = async () => {
    if (segmentOptions.length > 0) return; // Don't re-fetch if already loaded
    try {
        const { data, error } = await supabase.from('knowledge_segments').select('id, name');
        if (error) throw error;
        if (data) setSegmentOptions(data);
    } catch (error) {
        console.error("Failed to fetch knowledge segments:", error);
        alert("Gagal memuat kategori pengetahuan.");
    }
  };

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  }), [requests]);
  
  const filteredRequests = useMemo(() => {
      if (activeTab === 'all') return requests;
      if (activeTab === 'in_progress') return requests.filter(r => r.status === 'in_progress');
      return requests.filter(r => r.status === activeTab);
  }, [activeTab, requests]);

  const handleAddRequest = async () => {
    if (!user || !newRequest.title || !newRequest.description || !newRequest.department || !newRequest.segmentId) {
      alert("Mohon lengkapi semua field yang wajib diisi (*).");
      return;
    }
    setIsSubmitting(true);
    try {
        const { error } = await supabase.from('knowledge_requests').insert({
            title: newRequest.title,
            description: newRequest.description,
            department: newRequest.department,
            segment_id: newRequest.segmentId,
            priority: newRequest.priority,
            status: 'pending',
            requested_by: user.id,
            due_date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(), // Default due date 14 days from now
        });
        
        if (error) throw error;
        
        alert("Permintaan pengetahuan berhasil diajukan!");
        router.refresh(); // This re-fetches server data and updates the page
        setIsAddRequestOpen(false);
        setNewRequest({ title: '', description: '', department: user?.department || '', segmentId: '', priority: 'medium' });
    } catch (error) {
        console.error("Failed to add knowledge request:", error);
        alert("Gagal menambahkan permintaan.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permintaan Pengetahuan</h1>
          <p className="text-muted-foreground">Ajukan pertanyaan dan berbagi pengetahuan dengan tim</p>
        </div>
        <Button onClick={() => { fetchSegments(); setIsAddRequestOpen(true); }}><Plus className="mr-2 h-4 w-4" />Ajukan Permintaan</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Permintaan</CardTitle><MessageSquare className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle><AlertCircle className="h-4 w-4 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">{stats.pending}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Dalam Proses</CardTitle><Clock className="h-4 w-4 text-yellow-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Selesai</CardTitle><CheckCircle className="h-4 w-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{stats.completed}</div></CardContent></Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Semua Permintaan</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_progress">Dalam Proses</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
          <TabsTrigger value="cancelled">Dibatalkan</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4 space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <div className="flex-1 space-y-2 mb-4 sm:mb-0"><CardTitle className="text-base sm:text-lg"><Link href={`/knowledge-requests/${request.id}`} className="hover:underline">{request.title}</Link></CardTitle><CardDescription className="text-sm">{request.description}</CardDescription></div>
                  <div className="flex items-center gap-2 ml-0 sm:ml-4">{getPriorityBadge(request.priority)}{getStatusBadge(request.status)}</div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-2"><User className="h-4 w-4" />{request.requester_name || 'Anonim'}</div>
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDate(request.created_at)}</div>
                    <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4" />{request.comment_count || 0} respons</div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
                    <Badge variant="outline">{request.segment_name || 'Lainnya'}</Badge>
                    <Button variant="outline" size="sm" asChild><Link href={`/knowledge-requests/${request.id}`}><Eye className="mr-0 sm:mr-2 h-4 w-4" /><span className="hidden sm:inline">Detail</span></Link></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredRequests.length === 0 && (<div className="text-center py-12 text-muted-foreground">Tidak ada permintaan dalam kategori ini.</div>)}
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddRequestOpen} onOpenChange={setIsAddRequestOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Buat Permintaan Pengetahuan Baru</DialogTitle>
            <DialogDescription>Jelaskan pengetahuan atau dokumen yang Anda butuhkan. Tim terkait akan diberitahu.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="req-title" className="text-right">Judul*</Label><Input id="req-title" value={newRequest.title} onChange={(e) => setNewRequest(prev => ({...prev, title: e.target.value}))} className="col-span-3"/></div>
            <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="req-desc" className="text-right mt-2">Deskripsi*</Label><Textarea id="req-desc" value={newRequest.description} onChange={(e) => setNewRequest(prev => ({...prev, description: e.target.value}))} className="col-span-3"/></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="req-dept" className="text-right">Departemen*</Label><Select value={newRequest.department} onValueChange={(val) => setNewRequest(prev => ({...prev, department: val}))}><SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Departemen" /></SelectTrigger><SelectContent>{departments.map((dept) => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent></Select></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="req-segment" className="text-right">Kategori*</Label><Select value={newRequest.segmentId} onValueChange={(val) => setNewRequest(prev => ({...prev, segmentId: val}))}><SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Kategori Pengetahuan" /></SelectTrigger><SelectContent>{segmentOptions.map((opt) => <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="req-priority" className="text-right">Prioritas*</Label><Select value={newRequest.priority} onValueChange={(val) => setNewRequest(prev => ({...prev, priority: val as any}))}><SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Rendah</SelectItem><SelectItem value="medium">Sedang</SelectItem><SelectItem value="high">Tinggi</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRequestOpen(false)}>Batal</Button>
            <Button type="submit" onClick={handleAddRequest} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengajukan...</> : "Ajukan Permintaan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}