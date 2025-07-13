"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, FileText, Target, Building2, Activity, BookOpen, Settings } from "lucide-react"

// Mock data - in real app, this would come from API
const getDepartmentData = (department: string) => {
  const departments = {
    pendayagunaan: {
      name: "Pendayagunaan",
      description: "Departemen yang bertanggung jawab atas penyaluran dan pendayagunaan dana ziswaf",
      head: "Ahmad Fauzi",
      headAvatar: "/placeholder.svg?height=40&width=40",
      members: 15,
      activeProjects: 8,
      completedProjects: 12,
      totalBudget: 15000000000,
      usedBudget: 12500000000,
      stats: {
        beneficiaries: 2847,
        programs: 25,
        documents: 156,
        activities: 8,
      },
      recentActivities: [
        {
          id: 1,
          title: "Program Beasiswa Mahasiswa",
          status: "active",
          progress: 75,
          budget: 2500000000,
          participants: 12,
          dueDate: "2024-12-31",
        },
        {
          id: 2,
          title: "Bantuan Kesehatan Masyarakat",
          status: "planning",
          progress: 25,
          budget: 1800000000,
          participants: 8,
          dueDate: "2024-11-30",
        },
        {
          id: 3,
          title: "Infrastruktur Masjid",
          status: "completed",
          progress: 100,
          budget: 1500000000,
          participants: 6,
          dueDate: "2023-12-31",
        },
      ],
      teamMembers: [
        {
          name: "Ahmad Fauzi",
          role: "Kepala Departemen",
          avatar: "/placeholder.svg?height=32&width=32",
          status: "online",
        },
        {
          name: "Siti Nurhaliza",
          role: "Program Manager",
          avatar: "/placeholder.svg?height=32&width=32",
          status: "online",
        },
        {
          name: "Budi Santoso",
          role: "Field Coordinator",
          avatar: "/placeholder.svg?height=32&width=32",
          status: "offline",
        },
        { name: "Dewi Sartika", role: "Data Analyst", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
      ],
      documents: [
        { id: 1, title: "SOP Penyaluran Bantuan", type: "PDF", date: "2024-01-15", downloads: 45 },
        { id: 2, title: "Template Proposal Program", type: "DOCX", date: "2024-01-10", downloads: 32 },
        { id: 3, title: "Laporan Bulanan Januari", type: "PDF", date: "2024-01-31", downloads: 28 },
      ],
    },
    // Add other departments as needed
  }

  return departments[department as keyof typeof departments]
}

export default function DepartmentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const department = getDepartmentData(params.department as string)

  if (!department) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Departemen tidak ditemukan</h3>
          <p className="text-gray-600 mb-4">Departemen yang Anda cari mungkin tidak tersedia</p>
          <Button onClick={() => router.push("/dashboard")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "planning":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{department.name}</h1>
            <p className="text-gray-600 mt-1">{department.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Bulanan</SelectItem>
              <SelectItem value="quarterly">Kuartalan</SelectItem>
              <SelectItem value="yearly">Tahunan</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Penerima Manfaat</p>
                <p className="text-2xl font-bold text-gray-900">{department.stats.beneficiaries.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Program Aktif</p>
                <p className="text-2xl font-bold text-gray-900">{department.stats.programs}</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dokumen</p>
                <p className="text-2xl font-bold text-gray-900">{department.stats.documents}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktivitas</p>
                <p className="text-2xl font-bold text-gray-900">{department.stats.activities}</p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Penggunaan budget departemen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Budget Terpakai</span>
              <span className="font-semibold">
                {Math.round((department.usedBudget / department.totalBudget) * 100)}%
              </span>
            </div>
            <Progress value={(department.usedBudget / department.totalBudget) * 100} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatCurrency(department.usedBudget)} terpakai</span>
              <span>{formatCurrency(department.totalBudget)} total</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Aktivitas</TabsTrigger>
              <TabsTrigger value="documents">Dokumen</TabsTrigger>
              <TabsTrigger value="reports">Laporan</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {department.recentActivities.map((activity) => (
                      <div key={activity.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status === "active"
                              ? "Aktif"
                              : activity.status === "planning"
                                ? "Perencanaan"
                                : "Selesai"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Progress</span>
                            <span>{activity.progress}%</span>
                          </div>
                          <Progress value={activity.progress} className="h-2" />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Budget: {formatCurrency(activity.budget)}</span>
                            <span>Due: {activity.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Semua Aktivitas</CardTitle>
                  <CardDescription>Daftar lengkap aktivitas departemen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {department.recentActivities.map((activity) => (
                      <div key={activity.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{activity.title}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <span>{activity.participants} partisipan</span>
                              <span>Due: {activity.dueDate}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/activities/${activity.title.toLowerCase().replace(/\s+/g, "-")}`}>
                              Lihat Detail
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Dokumen Departemen</CardTitle>
                  <CardDescription>Dokumen dan file penting departemen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {department.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.title}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{doc.type}</span>
                              <span>•</span>
                              <span>{doc.date}</span>
                              <span>•</span>
                              <span>{doc.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Lihat
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Laporan Departemen</h3>
                  <p className="text-gray-600 mb-4">Fitur laporan akan segera tersedia</p>
                  <Button variant="outline">Generate Laporan</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Department Head */}
          <Card>
            <CardHeader>
              <CardTitle>Kepala Departemen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={department.headAvatar || "/placeholder.svg"} alt={department.head} />
                  <AvatarFallback>
                    {department.head
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{department.head}</p>
                  <p className="text-sm text-gray-500">Kepala Departemen</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Tim Departemen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {department.teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Users className="w-4 h-4 mr-2" />
                Lihat Semua Tim
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistik Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Anggota Tim</span>
                <span className="font-medium">{department.members}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Proyek Aktif</span>
                <span className="font-medium">{department.activeProjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Proyek Selesai</span>
                <span className="font-medium">{department.completedProjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Efisiensi Budget</span>
                <span className="font-medium text-green-600">
                  {Math.round((department.usedBudget / department.totalBudget) * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
