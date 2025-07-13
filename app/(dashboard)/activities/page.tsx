"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Users,
  Calendar,
  Target,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  MessageSquare,
  FileText,
  TrendingUp,
  Filter,
  Grid,
  List,
} from "lucide-react"

// Define interfaces for our data structures
interface Participant {
  id: number;
  name: string;
  department: string;
  role: string;
  avatar: string;
}

interface Activity {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  startDate: string;
  endDate: string;
  progress: number;
  departments: string[];
  participants: Participant[];
  totalParticipants: number;
  budget: number;
  targetBeneficiaries: number;
  currentBeneficiaries: number;
  documents: number;
  meetings: number;
  lastUpdate: string;
  tags: string[];
}

const activities: Activity[] = [
  {
    id: 1,
    name: "Program Beasiswa Mahasiswa Dhuafa",
    description:
      "Kolaborasi program beasiswa untuk mahasiswa kurang mampu dengan melibatkan tim pendayagunaan, keuangan, dan marketing untuk outreach yang lebih luas",
    status: "active",
    priority: "high",
    startDate: "2024-11-01",
    endDate: "2025-03-31",
    progress: 65,
    departments: ["Pendayagunaan", "Keuangan", "Marketing"],
    participants: [
      {
        id: 1,
        name: "Ahmad Fauzi",
        department: "Pendayagunaan",
        role: "Lead",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 2,
        name: "Siti Nurhaliza",
        department: "Keuangan",
        role: "Finance Coordinator",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 3,
        name: "Maya Sari",
        department: "Marketing",
        role: "Outreach Specialist",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 4,
        name: "Budi Santoso",
        department: "Pendayagunaan",
        role: "Program Officer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    totalParticipants: 12,
    budget: 2500000000,
    targetBeneficiaries: 500,
    currentBeneficiaries: 325,
    documents: 8,
    meetings: 15,
    lastUpdate: "2024-12-15T10:30:00",
    tags: ["beasiswa", "pendidikan", "kolaborasi"],
  },
  {
    id: 2,
    name: "Sistem Monitoring Bantuan Kesehatan",
    description:
      "Pengembangan sistem monitoring terintegrasi untuk bantuan kesehatan dengan kolaborasi IT, Pendayagunaan, dan SDM",
    status: "planning",
    priority: "medium",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    progress: 15,
    departments: ["IT", "Pendayagunaan", "SDM"],
    participants: [
      {
        id: 5,
        name: "Rizki Pratama",
        department: "IT",
        role: "Tech Lead",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 6,
        name: "Ahmad Fauzi",
        department: "Pendayagunaan",
        role: "Business Analyst",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 7,
        name: "Linda Sari",
        department: "SDM",
        role: "Process Coordinator",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    totalParticipants: 8,
    budget: 800000000,
    targetBeneficiaries: 1000,
    currentBeneficiaries: 0,
    documents: 3,
    meetings: 4,
    lastUpdate: "2024-12-14T16:45:00",
    tags: ["kesehatan", "sistem", "monitoring"],
  },
  {
    id: 3,
    name: "Pemberdayaan UMKM Berkelanjutan",
    description:
      "Program pemberdayaan UMKM dengan pendekatan holistik melibatkan pendayagunaan, marketing, dan keuangan untuk sustainability",
    status: "active",
    priority: "high",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    progress: 45,
    departments: ["Pendayagunaan", "Marketing", "Keuangan"],
    participants: [
      {
        id: 8,
        name: "Budi Santoso",
        department: "Pendayagunaan",
        role: "Program Manager",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 9,
        name: "Maya Sari",
        department: "Marketing",
        role: "Market Development",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 10,
        name: "Siti Nurhaliza",
        department: "Keuangan",
        role: "Financial Advisor",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    totalParticipants: 15,
    budget: 3200000000,
    targetBeneficiaries: 200,
    currentBeneficiaries: 90,
    documents: 12,
    meetings: 22,
    lastUpdate: "2024-12-15T09:20:00",
    tags: ["umkm", "pemberdayaan", "ekonomi"],
  },
  {
    id: 4,
    name: "Digitalisasi Proses Ziswaf",
    description:
      "Transformasi digital proses ziswaf dari penghimpunan hingga pendayagunaan dengan kolaborasi semua departemen",
    status: "completed",
    priority: "high",
    startDate: "2024-01-01",
    endDate: "2024-10-31",
    progress: 100,
    departments: ["IT", "Penghimpunan", "Pendayagunaan", "Keuangan"],
    participants: [
      {
        id: 11,
        name: "Rizki Pratama",
        department: "IT",
        role: "Project Lead",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 12,
        name: "Ahmad Fauzi",
        department: "Pendayagunaan",
        role: "Business Lead",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    totalParticipants: 18,
    budget: 1500000000,
    targetBeneficiaries: 0,
    currentBeneficiaries: 0,
    documents: 25,
    meetings: 45,
    lastUpdate: "2024-10-31T17:00:00",
    tags: ["digitalisasi", "transformasi", "sistem"],
  },
  {
    id: 5,
    name: "Pelatihan Soft Skills Karyawan",
    description:
      "Program pelatihan soft skills untuk meningkatkan kolaborasi antar departemen dan efektivitas kerja tim",
    status: "planning",
    priority: "low",
    startDate: "2025-02-01",
    endDate: "2025-05-31",
    progress: 5,
    departments: ["SDM", "Pendayagunaan", "Marketing"],
    participants: [
      {
        id: 13,
        name: "Linda Sari",
        department: "SDM",
        role: "Training Coordinator",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    totalParticipants: 6,
    budget: 400000000,
    targetBeneficiaries: 50,
    currentBeneficiaries: 0,
    documents: 2,
    meetings: 2,
    lastUpdate: "2024-12-10T14:30:00",
    tags: ["pelatihan", "soft-skills", "sdm"],
  },
]

const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing"]
const statuses = ["Semua", "planning", "active", "completed", "cancelled"]
const priorities = ["Semua", "high", "medium", "low"]

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("Semua")
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [selectedPriority, setSelectedPriority] = useState("Semua")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = selectedDepartment === "Semua" || activity.departments.includes(selectedDepartment)

    const matchesStatus = selectedStatus === "Semua" || activity.status === selectedStatus
    const matchesPriority = selectedPriority === "Semua" || activity.priority === selectedPriority

    return matchesSearch && matchesDepartment && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <Clock className="w-3 h-3 mr-1" />
            Perencanaan
          </Badge>
        )
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700">
            <Target className="w-3 h-3 mr-1" />
            Aktif
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Dibatalkan
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Tinggi</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-700">Sedang</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-700">Rendah</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const stats = {
    total: activities.length,
    active: activities.filter((a) => a.status === "active").length,
    planning: activities.filter((a) => a.status === "planning").length,
    completed: activities.filter((a) => a.status === "completed").length,
    totalParticipants: activities.reduce((sum, a) => sum + a.totalParticipants, 0),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Aktivitas Antar Departemen</h1>
        <p className="text-gray-600">
          Kolaborasi dan transfer pengetahuan lintas departemen untuk mencapai tujuan bersama
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Aktivitas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sedang Aktif</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perencanaan</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.planning}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Partisipan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalParticipants}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter & Pencarian</span>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Buat Aktivitas Baru
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari aktivitas berdasarkan nama, deskripsi, atau tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Departemen" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "Semua"
                      ? "Semua Status"
                      : status === "planning"
                        ? "Perencanaan"
                        : status === "active"
                          ? "Aktif"
                          : status === "completed"
                            ? "Selesai"
                            : "Dibatalkan"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Prioritas" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority === "Semua"
                      ? "Semua Prioritas"
                      : priority === "high"
                        ? "Tinggi"
                        : priority === "medium"
                          ? "Sedang"
                          : "Rendah"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Badge variant="secondary">{filteredActivities.length} aktivitas</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activities Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(activity.status)}
                    {getPriorityBadge(activity.priority)}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{activity.name}</CardTitle>
                <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{activity.progress}%</span>
                  </div>
                  <Progress value={activity.progress} className="h-2" />
                </div>

                {/* Departments */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Departemen Terlibat</p>
                  <div className="flex flex-wrap gap-1">
                    {activity.departments.map((dept) => (
                      <Badge key={dept} variant="outline" className="text-xs">
                        <Building2 className="w-3 h-3 mr-1" />
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Participants */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Partisipan</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {activity.participants.slice(0, 4).map((participant) => (
                        <Avatar key={participant.id} className="w-6 h-6 border-2 border-white">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                          <AvatarFallback className="text-xs">
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{activity.totalParticipants} orang</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>{activity.documents} dokumen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span>{activity.meetings} meeting</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(activity.startDate)} - {formatDate(activity.endDate)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex-1" onClick={() => setSelectedActivity(activity)}>
                        Lihat Detail
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle>{selectedActivity?.name}</DialogTitle>
                        <DialogDescription>{selectedActivity?.description}</DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="participants">Partisipan</TabsTrigger>
                          <TabsTrigger value="timeline">Timeline</TabsTrigger>
                          <TabsTrigger value="documents">Dokumen</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium">Status</p>
                                {selectedActivity && getStatusBadge(selectedActivity.status)}
                              </div>
                              <div>
                                <p className="text-sm font-medium">Prioritas</p>
                                {selectedActivity && getPriorityBadge(selectedActivity.priority)}
                              </div>
                              <div>
                                <p className="text-sm font-medium">Progress</p>
                                <div className="space-y-1">
                                  <Progress value={selectedActivity?.progress || 0} className="h-2" />
                                  <p className="text-xs text-gray-600">{selectedActivity?.progress}% selesai</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium">Budget</p>
                                <p className="text-sm text-gray-600">
                                  {selectedActivity && formatCurrency(selectedActivity.budget)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Target Penerima Manfaat</p>
                                <p className="text-sm text-gray-600">{selectedActivity?.targetBeneficiaries} orang</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Penerima Manfaat Saat Ini</p>
                                <p className="text-sm text-gray-600">{selectedActivity?.currentBeneficiaries} orang</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="participants" className="space-y-4">
                          <div className="space-y-4">
                            {selectedActivity?.participants.map((participant) => (
                              <div
                                key={participant.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={participant.avatar || "/placeholder.svg"}
                                      alt={participant.name}
                                    />
                                    <AvatarFallback>
                                      {participant.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{participant.name}</p>
                                    <p className="text-sm text-gray-600">{participant.role}</p>
                                  </div>
                                </div>
                                <Badge variant="outline">{participant.department}</Badge>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="timeline" className="space-y-4">
                          <div className="space-y-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="font-medium">Mulai Aktivitas</p>
                              <p className="text-sm text-gray-600">
                                {selectedActivity && formatDate(selectedActivity.startDate)}
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <p className="font-medium">Target Selesai</p>
                              <p className="text-sm text-gray-600">
                                {selectedActivity && formatDate(selectedActivity.endDate)}
                              </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="font-medium">Update Terakhir</p>
                              <p className="text-sm text-gray-600">
                                {selectedActivity && formatDate(selectedActivity.lastUpdate)}
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="documents" className="space-y-4">
                          <div className="text-center py-8">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">{selectedActivity?.documents} dokumen terkait aktivitas ini</p>
                            <Button className="mt-4">Lihat Semua Dokumen</Button>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <DialogFooter>
                        <Button variant="outline">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Bergabung
                        </Button>
                        <Button>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Diskusi
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Gabung
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <Target className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{activity.name}</h3>
                          {getStatusBadge(activity.status)}
                          {getPriorityBadge(activity.priority)}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1 mb-2">{activity.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{activity.departments.join(", ")}</span>
                          <span>{activity.totalParticipants} partisipan</span>
                          <span>{activity.progress}% selesai</span>
                          <span>
                            {formatDate(activity.startDate)} - {formatDate(activity.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        Lihat Detail
                      </Button>
                      <Button size="sm" variant="outline">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Gabung
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredActivities.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada aktivitas ditemukan</h3>
            <p className="text-gray-600 mb-4">Coba ubah filter atau kata kunci pencarian</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Buat Aktivitas Baru
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}