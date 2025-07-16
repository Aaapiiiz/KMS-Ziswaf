// app/(dashboard)/departments/page.tsx

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Activity, TrendingUp, Building2, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data - now with avatar and more distinct colors
const departments = [
  {
    id: "pendayagunaan",
    name: "Pendayagunaan",
    description: "Mengelola program-program pendayagunaan dana ziswaf untuk kesejahteraan masyarakat.",
    head: "Ahmad Fauzi",
    headAvatar: "/placeholder.svg?height=40&width=40",
    members: 12,
    documents: 45,
    activities: 23,
    budget: "Rp 2.5 Miliar",
    programs: ["Beasiswa", "Bantuan Kesehatan", "Pemberdayaan Ekonomi"],
    performance: 92,
    color: "text-blue-500",
    bgColor: "bg-blue-500",
  },
  {
    id: "penghimpunan",
    name: "Penghimpunan",
    description: "Bertanggung jawab atas penghimpunan dana ziswaf dari berbagai sumber.",
    head: "Siti Nurhaliza",
    headAvatar: "/placeholder.svg?height=40&width=40",
    members: 8,
    documents: 32,
    activities: 18,
    budget: "Target Rp 5 Miliar",
    programs: ["Fundraising Digital", "Corporate Partnership", "Retail Collection"],
    performance: 88,
    color: "text-green-500",
    bgColor: "bg-green-500",
  },
  {
    id: "penyaluran",
    name: "Penyaluran",
    description: "Mengelola penyaluran dana ziswaf kepada mustahik yang berhak.",
    head: "Budi Santoso",
    headAvatar: "/placeholder.svg?height=40&width=40",
    members: 15,
    documents: 67,
    activities: 31,
    budget: "Rp 3.2 Miliar",
    programs: ["Bantuan Langsung", "Program Sosial", "Emergency Response"],
    performance: 95,
    color: "text-purple-500",
    bgColor: "bg-purple-500",
  },
  {
    id: "keuangan",
    name: "Keuangan",
    description: "Mengelola administrasi keuangan dan pelaporan dana ziswaf.",
    head: "Fatimah Zahra",
    headAvatar: "/placeholder.svg?height=40&width=40",
    members: 6,
    documents: 89,
    activities: 12,
    budget: "Operational",
    programs: ["Financial Reporting", "Audit & Compliance", "Budget Planning"],
    performance: 90,
    color: "text-orange-500",
    bgColor: "bg-orange-500",
  },
]

// A new component for the radial progress bar
const RadialProgress = ({ progress, color }: { progress: number, color: string }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-20 w-20">
      <svg className="h-full w-full" viewBox="0 0 80 80">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
          transform="rotate(-90 40 40)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-700">{progress}%</span>
      </div>
    </div>
  );
};


export default function DepartmentsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">

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

      {/* Stats Cards remain the same... */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* ... your four stat cards for Total Departemen, Total Anggota, etc. go here ... */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Departemen</CardTitle><Building2 className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">4</div><p className="text-xs text-muted-foreground">Departemen aktif</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Anggota</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">41</div><p className="text-xs text-muted-foreground">Pegawai aktif</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Dokumen</CardTitle><FileText className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">233</div><p className="text-xs text-muted-foreground">Dokumen tersimpan</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Rata-rata Kinerja</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">91%</div><p className="text-xs text-muted-foreground">Performance score</p></CardContent>
        </Card>
      </div>

      {/* Departments Grid - THE NEW DESIGN */}
      <div className="grid gap-6 md:grid-cols-2">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${department.bgColor}`} />
                    <CardTitle className="text-xl">
                      <Link href={`/departments/${department.id}`} className="hover:underline">
                        {department.name}
                      </Link>
                    </CardTitle>
                </div>
                <CardDescription className="max-w-xs">{department.description}</CardDescription>
              </div>
              <RadialProgress progress={department.performance} color={department.color} />
            </CardHeader>

            <CardContent className="space-y-6 flex-grow">
              {/* Department Head */}
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={department.headAvatar} alt={department.head} />
                    <AvatarFallback>{department.head.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{department.head}</p>
                    <p className="text-xs text-muted-foreground">Kepala Departemen</p>
                  </div>
                </div>
                <Badge variant="outline">{department.budget}</Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Users className={`h-6 w-6 ${department.color}`} />
                  <div className="text-2xl font-bold">{department.members}</div>
                  <div className="text-xs text-muted-foreground">Anggota</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <FileText className={`h-6 w-6 ${department.color}`} />
                  <div className="text-2xl font-bold">{department.documents}</div>
                  <div className="text-xs text-muted-foreground">Dokumen</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Activity className={`h-6 w-6 ${department.color}`} />
                  <div className="text-2xl font-bold">{department.activities}</div>
                  <div className="text-xs text-muted-foreground">Aktivitas</div>
                </div>

              </div>

            </CardContent>
            
            <CardFooter className="flex flex-col items-start gap-4 pt-4 border-t">
              {/* Programs */}
              <div className="w-full">
                <span className="text-sm font-medium text-muted-foreground">Program Utama</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {department.programs.map((program) => (
                    <Badge key={program} variant="secondary" className="text-xs">{program}</Badge>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="w-full flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href="/not-implemented">
                    <Eye className="mr-2 h-4 w-4" />
                    Detail
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Activity className="mr-2 h-4 w-4" />
                  Aktivitas
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}