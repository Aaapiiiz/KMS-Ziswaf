"use client"

import { AdminRouteGuard } from "@/components/admin-route-guard"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Save, Upload, FileText, Users, Activity } from "lucide-react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { useRouter } from "next/navigation"

export default function DataInputPage() {
  const [activeTab, setActiveTab] = useState("documents")
  const router = useRouter()

  return (
    <AdminRouteGuard>
      <div className="p-6 space-y-6">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Input Data Admin</h1>
            <p className="text-gray-600">Kelola data dokumen, pengguna, dan aktivitas sistem</p>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Users className="w-4 h-4 mr-1" />
            Admin Only
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Dokumen
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Pengguna
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Aktivitas
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Dokumen Baru</CardTitle>
                <CardDescription>Tambahkan dokumen baru ke sistem knowledge management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="doc-title">Judul Dokumen</Label>
                    <Input id="doc-title" placeholder="Masukkan judul dokumen" />
                  </div>
                  <div>
                    <Label htmlFor="doc-category">Kategori</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sop">SOP</SelectItem>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="laporan">Laporan</SelectItem>
                        <SelectItem value="panduan">Panduan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="doc-description">Deskripsi</Label>
                  <Textarea id="doc-description" placeholder="Deskripsi dokumen" />
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tambah Pengguna Baru</CardTitle>
                <CardDescription>Daftarkan pengguna baru ke sistem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-name">Nama Lengkap</Label>
                    <Input id="user-name" placeholder="Nama lengkap pengguna" />
                  </div>
                  <div>
                    <Label htmlFor="user-email">Email</Label>
                    <Input id="user-email" type="email" placeholder="email@ziswaf.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-department">Departemen</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih departemen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendayagunaan">Pendayagunaan</SelectItem>
                        <SelectItem value="penghimpunan">Penghimpunan</SelectItem>
                        <SelectItem value="keuangan">Keuangan</SelectItem>
                        <SelectItem value="sdm">SDM</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="user-role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Aktivitas Baru</CardTitle>
                <CardDescription>Catat aktivitas atau kegiatan organisasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="activity-title">Judul Aktivitas</Label>
                  <Input id="activity-title" placeholder="Nama kegiatan atau aktivitas" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activity-date">Tanggal</Label>
                    <Input id="activity-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="activity-location">Lokasi</Label>
                    <Input id="activity-location" placeholder="Lokasi kegiatan" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="activity-description">Deskripsi</Label>
                  <Textarea id="activity-description" placeholder="Deskripsi aktivitas" />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Aktivitas
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminRouteGuard>
  )
}
