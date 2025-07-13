"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Users, DollarSign, Calendar, MapPin, Plus, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data
const scholarshipPrograms = [
  {
    id: 1,
    title: "Beasiswa Mahasiswa Kurang Mampu 2024",
    description: "Program beasiswa untuk mahasiswa dari keluarga kurang mampu dengan prestasi akademik yang baik.",
    budget: "Rp 2.5 Miliar",
    recipients: 500,
    maxRecipients: 600,
    startDate: "1 Januari 2024",
    endDate: "31 Desember 2024",
    status: "active",
    category: "pendidikan",
    location: "Nasional",
    progress: 83,
  },
  {
    id: 2,
    title: "Beasiswa Prestasi Akademik 2024",
    description: "Beasiswa untuk mahasiswa berprestasi dengan IPK minimal 3.5 dari berbagai universitas.",
    budget: "Rp 1.8 Miliar",
    recipients: 300,
    maxRecipients: 350,
    startDate: "1 Februari 2024",
    endDate: "31 Januari 2025",
    status: "active",
    category: "prestasi",
    location: "Nasional",
    progress: 86,
  },
  {
    id: 3,
    title: "Beasiswa Anak Yatim Piatu 2024",
    description: "Program khusus beasiswa untuk anak yatim piatu yang melanjutkan pendidikan tinggi.",
    budget: "Rp 1.2 Miliar",
    recipients: 200,
    maxRecipients: 250,
    startDate: "1 Maret 2024",
    endDate: "28 Februari 2025",
    status: "active",
    category: "sosial",
    location: "Nasional",
    progress: 80,
  },
]

export default function ScholarshipsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif"
      case "completed":
        return "Selesai"
      case "planning":
        return "Perencanaan"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Beasiswa</h1>
          <p className="text-muted-foreground">Kelola dan pantau program beasiswa untuk penerima manfaat</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Program
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Program</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 program baru</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penerima</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,000</div>
            <p className="text-xs text-muted-foreground">+15% dari tahun lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggaran</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 5.5M</div>
            <p className="text-xs text-muted-foreground">Miliar rupiah</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Keberhasilan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Penerima lulus tepat waktu</p>
          </CardContent>
        </Card>
      </div>

      {/* Programs List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Semua Program</TabsTrigger>
          <TabsTrigger value="active">Aktif</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
          <TabsTrigger value="planning">Perencanaan</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {scholarshipPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">
                      <Link href={`/programs/scholarships/${program.id}`} className="hover:underline">
                        {program.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(program.status)}>{getStatusText(program.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress Penyaluran</span>
                      <span>{program.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${program.progress}%` }}></div>
                    </div>
                  </div>

                  {/* Program Details */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      {program.budget}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {program.recipients}/{program.maxRecipients} penerima
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {program.startDate} - {program.endDate}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {program.location}
                    </div>
                  </div>

                  {/* Category and Actions */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{program.category}</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/programs/scholarships/${program.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Detail
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Menampilkan program yang sedang aktif</p>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Menampilkan program yang sudah selesai</p>
          </div>
        </TabsContent>

        <TabsContent value="planning">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Menampilkan program dalam tahap perencanaan</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
