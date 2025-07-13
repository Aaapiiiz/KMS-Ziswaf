"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Target,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  Settings,
  Share2,
  Edit,
} from "lucide-react"

// Mock data - in real app, this would come from API
const getActivityBySlug = (slug: string) => {
  // ... (rest of the mock data function is unchanged)
  const activities = [
    {
      id: 1,
      slug: "program-beasiswa-mahasiswa-dhuafa",
      title: "Program Beasiswa Mahasiswa Dhuafa",
      description:
        "Kolaborasi program beasiswa untuk mahasiswa kurang mampu dengan melibatkan tim pendayagunaan, keuangan, dan marketing untuk outreach yang lebih luas. Program ini bertujuan untuk memberikan akses pendidikan tinggi kepada mahasiswa dari keluarga kurang mampu melalui pendekatan holistik yang melibatkan berbagai departemen.",
      department: "Pendayagunaan",
      status: "active",
      priority: "high",
      progress: 65,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      location: "Seluruh Indonesia",
      budget: "Rp 2.500.000.000",
      coordinator: "Ahmad Fauzi",
      coordinatorAvatar: "/placeholder.svg?height=40&width=40",
      participants: [
        {
          name: "Ahmad Fauzi",
          role: "Lead",
          department: "Pendayagunaan",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        {
          name: "Siti Nurhaliza",
          role: "Finance Coordinator",
          department: "Keuangan",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        {
          name: "Maya Sari",
          role: "Outreach Specialist",
          department: "Marketing",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        {
          name: "Budi Santoso",
          role: "Program Officer",
          department: "Pendayagunaan",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      ],
      milestones: [
        {
          id: 1,
          title: "Project Initiation",
          description: "Kick-off meeting dan pembentukan tim",
          date: "2024-01-01",
          status: "completed",
        },
        {
          id: 2,
          title: "Criteria Development",
          description: "Pengembangan kriteria seleksi penerima",
          date: "2024-01-15",
          status: "completed",
        },
        {
          id: 3,
          title: "Marketing Campaign Launch",
          description: "Peluncuran kampanye marketing",
          date: "2024-02-01",
          status: "in_progress",
        },
        {
          id: 4,
          title: "Application Review",
          description: "Review dan seleksi aplikasi",
          date: "2024-03-01",
          status: "pending",
        },
      ],
      stats: {
        beneficiaries: { current: 325, target: 500 },
        budget: { allocated: 2500000000, used: 1625000000 },
        departments: ["Pendayagunaan", "Keuangan", "Marketing"],
      },
      documents: [
        { id: 1, title: "Proposal Program", type: "PDF", size: "2.1 MB", date: "2024-01-01" },
        { id: 2, title: "Budget Allocation", type: "XLSX", size: "1.5 MB", date: "2024-01-05" },
        { id: 3, title: "Selection Criteria", type: "DOCX", size: "890 KB", date: "2024-01-10" },
      ],
      discussions: [
        {
          id: 1,
          author: "Ahmad Fauzi",
          avatar: "/placeholder.svg?height=32&width=32",
          message: "Tim, kita perlu review kriteria seleksi untuk memastikan tepat sasaran.",
          date: "2024-01-20T10:30:00Z",
          replies: 3,
        },
        {
          id: 2,
          author: "Siti Nurhaliza",
          avatar: "/placeholder.svg?height=32&width=32",
          message: "Budget allocation sudah disetujui finance. Bisa mulai proses seleksi.",
          date: "2024-01-18T14:15:00Z",
          replies: 1,
        },
      ],
    },
  ]
  return activities.find((activity) => activity.slug === slug)
}


export default function ActivityDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const activity = getActivityBySlug(params.slug as string)

  if (!activity) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aktivitas tidak ditemukan</h3>
          <p className="text-gray-600 mb-4">Aktivitas yang Anda cari mungkin telah dihapus atau dipindahkan</p>
          <Button onClick={() => router.push("/activities")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Aktivitas
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    // ... (rest of the function is unchanged)
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "in_progress":
        return "bg-yellow-100 text-yellow-700"
      case "pending":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatCurrency = (amount: number) => {
    // ... (rest of the function is unchanged)
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        {/* MODIFIED: REMOVED THE WRAPPING DIV AND THE BACK BUTTON */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{activity.title}</h1>
            <Badge className={getStatusColor(activity.status)}>
              {activity.status === "active" ? "Aktif" : activity.status}
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              Prioritas Tinggi
            </Badge>
          </div>
          <p className="text-gray-600 max-w-3xl">{activity.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Bagikan
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* ... Rest of the component is unchanged ... */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Kemajuan Keseluruhan</span>
                <span className="font-semibold text-gray-900">{activity.progress}%</span>
              </div>
              <Progress value={activity.progress} className="h-3" />
            </div>
            <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{activity.stats.beneficiaries.current}</div>
                <div className="text-sm text-gray-600">Penerima Manfaat</div>
                <div className="text-xs text-gray-500">dari target {activity.stats.beneficiaries.target}</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(activity.stats.budget.allocated)}
                </div>
                <div className="text-sm text-gray-600">Total Budget</div>
                <div className="text-xs text-gray-500">dialokasikan</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-purple-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{activity.participants.length}</div>
                <div className="text-sm text-gray-600">Partisipan</div>
                <div className="text-xs text-gray-500">tim kolaborasi</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="discussion">Diskusi</TabsTrigger>
              <TabsTrigger value="documents">Dokumen</TabsTrigger>
              <TabsTrigger value="meeting">Meeting</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Progress Aktivitas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activity.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {milestone.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : milestone.status === "in_progress" ? (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{milestone.date}</p>
                        </div>
                        <Badge
                          variant={
                            milestone.status === "completed"
                              ? "default"
                              : milestone.status === "in_progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {milestone.status === "completed"
                            ? "Selesai"
                            : milestone.status === "in_progress"
                              ? "Berlangsung"
                              : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-4">
              {activity.discussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                        <AvatarFallback>
                          {discussion.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{discussion.author}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(discussion.date).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                        <p className="text-gray-700">{discussion.message}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {discussion.replies} balasan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              {activity.documents.map((document) => (
                <Card key={document.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">{document.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{document.type}</span>
                            <span>•</span>
                            <span>{document.size}</span>
                            <span>•</span>
                            <span>{document.date}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="meeting">
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Meeting Terjadwal</h3>
                  <p className="text-gray-600 mb-4">Jadwalkan meeting tim untuk koordinasi aktivitas</p>
                  <Button>Jadwalkan Meeting</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {activity.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              milestone.status === "completed"
                                ? "bg-green-500"
                                : milestone.status === "in_progress"
                                  ? "bg-yellow-500"
                                  : "bg-gray-300"
                            }`}
                          />
                          {index < activity.milestones.length - 1 && <div className="w-px h-8 bg-gray-200 mt-2" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Partisipan ({activity.participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.participants.map((participant, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                    <AvatarFallback>
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                    <p className="text-xs text-gray-500">{participant.role}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {participant.department}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Users className="w-4 h-4 mr-2" />
                Lihat Semua
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Departemen Terlibat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {activity.stats.departments.map((dept) => (
                  <Badge key={dept} variant="secondary">
                    {dept}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Durasi</span>
                <span className="font-medium">12 bulan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lokasi</span>
                <span className="font-medium">{activity.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Koordinator</span>
                <span className="font-medium">{activity.coordinator}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Budget Terpakai</span>
                <span className="font-medium text-green-600">
                  {Math.round((activity.stats.budget.used / activity.stats.budget.allocated) * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}