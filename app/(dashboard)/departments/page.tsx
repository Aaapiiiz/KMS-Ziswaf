"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Activity, TrendingUp, Building2, Plus, Eye } from "lucide-react"
import Link from "next/link"

// Mock data
const departments = [
  {
    id: "pendayagunaan",
    name: "Pendayagunaan",
    description: "Mengelola program-program pendayagunaan dana ziswaf untuk kesejahteraan masyarakat",
    head: "Ahmad Fauzi",
    members: 12,
    documents: 45,
    activities: 23,
    budget: "Rp 2.5 Miliar",
    programs: ["Beasiswa", "Bantuan Kesehatan", "Pemberdayaan Ekonomi"],
    performance: 92,
    color: "bg-blue-500",
  },
  {
    id: "penghimpunan",
    name: "Penghimpunan",
    description: "Bertanggung jawab atas penghimpunan dana ziswaf dari berbagai sumber",
    head: "Siti Nurhaliza",
    members: 8,
    documents: 32,
    activities: 18,
    budget: "Target Rp 5 Miliar",
    programs: ["Fundraising Digital", "Corporate Partnership", "Retail Collection"],
    performance: 88,
    color: "bg-green-500",
  },
  {
    id: "penyaluran",
    name: "Penyaluran",
    description: "Mengelola penyaluran dana ziswaf kepada mustahik yang berhak",
    head: "Budi Santoso",
    members: 15,
    documents: 67,
    activities: 31,
    budget: "Rp 3.2 Miliar",
    programs: ["Bantuan Langsung", "Program Sosial", "Emergency Response"],
    performance: 95,
    color: "bg-purple-500",
  },
  {
    id: "keuangan",
    name: "Keuangan",
    description: "Mengelola administrasi keuangan dan pelaporan dana ziswaf",
    head: "Fatimah Zahra",
    members: 6,
    documents: 89,
    activities: 12,
    budget: "Operational",
    programs: ["Financial Reporting", "Audit & Compliance", "Budget Planning"],
    performance: 90,
    color: "bg-orange-500",
  },
]

export default function DepartmentsPage() {
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-600"
    if (performance >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departemen</h1>
          <p className="text-muted-foreground">Kelola dan pantau kinerja semua departemen</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Departemen
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departemen</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Departemen aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">41</div>
            <p className="text-xs text-muted-foreground">Pegawai aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dokumen</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">233</div>
            <p className="text-xs text-muted-foreground">Dokumen tersimpan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Kinerja</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-muted-foreground">Performance score</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${department.color}`} />
                    <CardTitle className="text-xl">
                      <Link href={`/departments/${department.id}`} className="hover:underline">
                        {department.name}
                      </Link>
                    </CardTitle>
                  </div>
                  <CardDescription>{department.description}</CardDescription>
                </div>
                <Badge className={getPerformanceColor(department.performance)}>{department.performance}%</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Department Head */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Kepala Departemen</span>
                <span className="text-sm font-medium">{department.head}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{department.members}</div>
                  <div className="text-xs text-muted-foreground">Anggota</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{department.documents}</div>
                  <div className="text-xs text-muted-foreground">Dokumen</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{department.activities}</div>
                  <div className="text-xs text-muted-foreground">Aktivitas</div>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Anggaran</span>
                <span className="text-sm font-medium">{department.budget}</span>
              </div>

              {/* Programs */}
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Program Utama</span>
                <div className="flex flex-wrap gap-1">
                  {department.programs.map((program) => (
                    <Badge key={program} variant="secondary" className="text-xs">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/departments/${department.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Detail
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Activity className="mr-2 h-4 w-4" />
                  Aktivitas
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
