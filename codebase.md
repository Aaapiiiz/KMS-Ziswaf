# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# app\(dashboard)\activities\[slug]\page.tsx

```tsx
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
```

# app\(dashboard)\activities\loading.tsx

```tsx
export default function Loading() {
  return null
}

```

# app\(dashboard)\activities\page.tsx

```tsx
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

          {/* --- START OF FIX --- */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* This div wraps the dropdowns and makes them grow */}
            <div className="flex flex-1 flex-col sm:flex-row gap-4 w-full">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
            </div>
            
            {/* This div wraps the view controls */}
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
```

# app\(dashboard)\admin\users\loading.tsx

```tsx
export default function Loading() {
  return null
}

```

# app\(dashboard)\admin\users\page.tsx

```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Mail, UserCheck, UserX } from "lucide-react"
import { useRouter } from "next/navigation"
import { AdminRouteGuard } from "@/components/admin-route-guard"

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  joinDate: string;
  avatar: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@ziswaf.com",
    department: "Pendayagunaan",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 10:30",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@ziswaf.com",
    department: "Pendayagunaan",
    role: "user",
    status: "active",
    lastLogin: "2024-01-15 09:15",
    joinDate: "2023-08-20",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi.santoso@ziswaf.com",
    department: "Keuangan",
    role: "user",
    status: "active",
    lastLogin: "2024-01-14 16:45",
    joinDate: "2023-09-10",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Dewi Sartika",
    email: "dewi.sartika@ziswaf.com",
    department: "Marketing",
    role: "user",
    status: "inactive",
    lastLogin: "2024-01-10 14:20",
    joinDate: "2023-11-05",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Rudi Hermawan",
    email: "rudi.hermawan@ziswaf.com",
    department: "IT",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 11:00",
    joinDate: "2023-05-01",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing"]
const roles = ["Semua", "admin", "user"]
const statuses = ["Semua", "active", "inactive"]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("Semua")
  const [roleFilter, setRoleFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState("Semua")
  const router = useRouter()

  const [editingUser, setEditingUser] = useState<User | null>(null);
  // NEW: State for the "Add User" dialog
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', department: '', role: 'user' });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "Semua" || user.department === departmentFilter
    const matchesRole = roleFilter === "Semua" || user.role === roleFilter
    const matchesStatus = statusFilter === "Semua" || user.status === statusFilter
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

  // NEW: Function to handle adding a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.department) {
      const newUserObject: User = {
        id: users.length + 1, // Simple ID generation for demo
        name: newUser.name,
        email: newUser.email,
        department: newUser.department,
        role: newUser.role as 'admin' | 'user',
        status: 'active', // New users are active by default
        lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' '),
        joinDate: new Date().toISOString().slice(0, 10),
        avatar: "/placeholder.svg?height=32&width=32",
      };
      setUsers(prevUsers => [newUserObject, ...prevUsers]);
      setNewUser({ name: '', email: '', department: '', role: 'user' });
      setIsAddUserOpen(false);
    } else {
      alert("Please fill all required fields.");
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700"
      case "user":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "inactive":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getRoleText = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif"
      case "inactive":
        return "Tidak Aktif"
      default:
        return status
    }
  }

  return (
    <AdminRouteGuard>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
            <p className="text-gray-600">Kelola pengguna dan hak akses sistem</p>
          </div>
          {/* UPDATED: Button is now a trigger for the dialog */}
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pengguna
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                <DialogDescription>Buat akun baru dan tentukan role serta departemen.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="add-name" className="text-right">Nama</Label>
                  <Input id="add-name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="add-email" className="text-right">Email</Label>
                  <Input id="add-email" type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="add-department" className="text-right">Departemen</Label>
                  <Select value={newUser.department} onValueChange={(value) => setNewUser({...newUser, department: value})}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Departemen" /></SelectTrigger>
                    <SelectContent>{departments.filter(d => d !== 'Semua').map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="add-role" className="text-right">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Batal</Button>
                <Button type="submit" onClick={handleAddUser}>Tambah</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters Card remains the same */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Cari nama atau email pengguna..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Departemen" /></SelectTrigger>
                  <SelectContent>{departments.map((dept) => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>{roles.map((role) => <SelectItem key={role} value={role}>{getRoleText(role)}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>{statuses.map((status) => <SelectItem key={status} value={status}>{getStatusText(status)}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengguna</CardTitle>
            <CardDescription>Total {filteredUsers.length} pengguna ditemukan</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Login Terakhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8"><AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} /><AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                        <div><div className="font-medium">{user.name}</div><div className="text-sm text-gray-500">{user.email}</div></div>
                      </div>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell><Badge className={getRoleColor(user.role)}>{getRoleText(user.role)}</Badge></TableCell>
                    <TableCell><Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge></TableCell>
                    <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => setEditingUser(user)}><Edit className="mr-2 h-4 w-4" />Edit Pengguna</DropdownMenuItem>
                          <DropdownMenuItem><Mail className="mr-2 h-4 w-4" />Kirim Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem><UserX className="mr-2 h-4 w-4" />Nonaktifkan</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem><UserCheck className="mr-2 h-4 w-4" />Aktifkan</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Hapus Pengguna</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit User Dialog (already implemented) */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Pengguna</DialogTitle>
            <DialogDescription>Perbarui informasi dan role untuk {editingUser?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">Nama</Label><Input id="name" defaultValue={editingUser?.name} className="col-span-3" /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="email" className="text-right">Email</Label><Input id="email" type="email" defaultValue={editingUser?.email} className="col-span-3" /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="department" className="text-right">Departemen</Label><Select defaultValue={editingUser?.department}><SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger><SelectContent>{departments.filter(d => d !== 'Semua').map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent></Select></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="role" className="text-right">Role</Label><Select defaultValue={editingUser?.role}><SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger><SelectContent>{roles.filter(r => r !== 'Semua').map(role => <SelectItem key={role} value={role}>{getRoleText(role)}</SelectItem>)}</SelectContent></Select></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>Batal</Button>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminRouteGuard>
  )
}
```

# app\(dashboard)\admin\verification\loading.tsx

```tsx
export default function Loading() {
  return null
}

```

# app\(dashboard)\admin\verification\page.tsx

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Check, X, Clock, AlertCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { AdminRouteGuard } from "@/components/admin-route-guard"

const pendingDocuments = [
  {
    id: 1,
    title: "Laporan Evaluasi Program Beasiswa Q4 2024",
    description: "Evaluasi komprehensif program beasiswa untuk mahasiswa kurang mampu",
    submittedBy: "Siti Nurhaliza",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    department: "Pendayagunaan",
    type: "PDF",
    size: "2.4 MB",
    submittedDate: "2024-01-15",
    priority: "high",
    tags: ["evaluasi", "beasiswa", "laporan"],
    status: "pending",
  },
  {
    id: 2,
    title: "SOP Verifikasi Mustahik Terbaru",
    description: "Standard Operating Procedure untuk verifikasi penerima bantuan",
    submittedBy: "Ahmad Fauzi",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    department: "Pendayagunaan",
    type: "DOC",
    size: "1.8 MB",
    submittedDate: "2024-01-12",
    priority: "medium",
    tags: ["sop", "verifikasi", "mustahik"],
    status: "pending",
  },
  {
    id: 3,
    title: "Template Proposal Program Bantuan",
    description: "Template standar untuk proposal program bantuan sosial",
    submittedBy: "Budi Santoso",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    department: "Marketing",
    type: "DOCX",
    size: "856 KB",
    submittedDate: "2024-01-10",
    priority: "low",
    tags: ["template", "proposal", "bantuan"],
    status: "pending",
  },
  {
    id: 4,
    title: "Laporan Keuangan Bulanan Desember",
    description: "Laporan keuangan lengkap untuk bulan Desember 2024",
    submittedBy: "Dewi Sartika",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    department: "Keuangan",
    type: "XLSX",
    size: "3.2 MB",
    submittedDate: "2024-01-08",
    priority: "high",
    tags: ["keuangan", "laporan", "bulanan"],
    status: "pending",
  },
]

const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing"]
const priorities = ["Semua", "high", "medium", "low"]

export default function VerificationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("Semua")
  const [priorityFilter, setPriorityFilter] = useState("Semua")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [verificationNote, setVerificationNote] = useState("")
  const router = useRouter()

  const filteredDocuments = pendingDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "Semua" || doc.department === departmentFilter
    const matchesPriority = priorityFilter === "Semua" || doc.priority === priorityFilter

    return matchesSearch && matchesDepartment && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Tinggi"
      case "medium":
        return "Sedang"
      case "low":
        return "Rendah"
      default:
        return priority
    }
  }

  const handleApprove = (docId: number) => {
    console.log("Approved document:", docId, "Note:", verificationNote)
    setVerificationNote("")
    setSelectedDocument(null)
  }

  const handleReject = (docId: number) => {
    console.log("Rejected document:", docId, "Note:", verificationNote)
    setVerificationNote("")
    setSelectedDocument(null)
  }

  return (
    <AdminRouteGuard>
      <div className="p-6 space-y-6">
        {/* Breadcrumb Navigation */}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verifikasi Dokumen</h1>
            <p className="text-gray-600">Review dan verifikasi dokumen yang menunggu persetujuan</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              <Clock className="w-4 h-4 mr-1" />
              {filteredDocuments.length} Menunggu
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari dokumen yang perlu diverifikasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-48">
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

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Prioritas" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority === "Semua" ? "Semua" : getPriorityText(priority)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getPriorityColor(document.priority)}>
                        {getPriorityText(document.priority)}
                      </Badge>
                      <Badge variant="outline">{document.type}</Badge>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Menunggu Verifikasi
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{document.title}</h3>
                    <p className="text-gray-600 mb-4">{document.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src={document.submittedByAvatar || "/placeholder.svg"}
                            alt={document.submittedBy}
                          />
                          <AvatarFallback className="text-xs">
                            {document.submittedBy
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{document.submittedBy}</span>
                      </div>
                      <span>{document.department}</span>
                      <span>{document.submittedDate}</span>
                      <span>{document.size}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {document.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/documents/${document.id}/view`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Link>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => setSelectedDocument(document)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Setujui
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Setujui Dokumen</DialogTitle>
                          <DialogDescription>
                            Anda akan menyetujui dokumen "{selectedDocument?.title}". Dokumen akan dipublikasikan dan
                            dapat diakses oleh semua pengguna.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Catatan Verifikasi (Opsional)</label>
                            <Textarea
                              placeholder="Tambahkan catatan untuk persetujuan ini..."
                              value={verificationNote}
                              onChange={(e) => setVerificationNote(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                            Batal
                          </Button>
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => selectedDocument && handleApprove(selectedDocument.id)}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Setujui Dokumen
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setSelectedDocument(document)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Tolak
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tolak Dokumen</DialogTitle>
                          <DialogDescription>
                            Anda akan menolak dokumen "{selectedDocument?.title}". Dokumen akan dikembalikan ke pengirim
                            dengan catatan revisi.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Alasan Penolakan *</label>
                            <Textarea
                              placeholder="Jelaskan alasan penolakan dan saran perbaikan..."
                              value={verificationNote}
                              onChange={(e) => setVerificationNote(e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                            Batal
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => selectedDocument && handleReject(selectedDocument.id)}
                            disabled={!verificationNote.trim()}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Tolak Dokumen
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada dokumen untuk diverifikasi</h3>
            <p className="text-gray-600">Semua dokumen telah diverifikasi atau tidak ada yang sesuai dengan filter</p>
          </div>
        )}
      </div>
    </AdminRouteGuard>
  )
}

```

# app\(dashboard)\dashboard\page.tsx

```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Users, FileText, Target, DollarSign, Activity, BookOpen, Heart, Clock } from "lucide-react"

const utilizationData = [
  { area: "Pendidikan", target: 2000000000, realisasi: 1800000000, percentage: 90 },
  { area: "Kesehatan", target: 1500000000, realisasi: 1350000000, percentage: 90 },
  { area: "Ekonomi", target: 1800000000, realisasi: 1620000000, percentage: 90 },
  { area: "Sosial", target: 1200000000, realisasi: 960000000, percentage: 80 },
  { area: "Dakwah", target: 800000000, realisasi: 720000000, percentage: 90 },
]

const monthlyData = [
  { month: "Jan", pendayagunaan: 450000000, penghimpunan: 500000000 },
  { month: "Feb", pendayagunaan: 520000000, penghimpunan: 480000000 },
  { month: "Mar", pendayagunaan: 480000000, penghimpunan: 520000000 },
  { month: "Apr", pendayagunaan: 600000000, penghimpunan: 580000000 },
  { month: "Mei", pendayagunaan: 580000000, penghimpunan: 620000000 },
  { month: "Jun", pendayagunaan: 650000000, penghimpunan: 640000000 },
]

const pieData = [
  { name: "Pendidikan", value: 35, color: "#10b981" },
  { name: "Kesehatan", value: 25, color: "#3b82f6" },
  { name: "Ekonomi", value: 20, color: "#8b5cf6" },
  { name: "Sosial", value: 15, color: "#f59e0b" },
  { name: "Dakwah", value: 5, color: "#ef4444" },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function DashboardPage() {
  const [selectedPeriod] = useState("2024")

  const totalTarget = utilizationData.reduce((sum, item) => sum + item.target, 0)
  const totalRealisasi = utilizationData.reduce((sum, item) => sum + item.realisasi, 0)
  const overallPercentage = Math.round((totalRealisasi / totalTarget) * 100)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Ziswaf KMS</h1>
        <p className="text-gray-600">Ringkasan laporan pendayagunaan ziswaf dan aktivitas knowledge management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendayagunaan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRealisasi)}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span>dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pencapaian Target</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallPercentage}%</div>
            <Progress value={overallPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Target: {formatCurrency(totalTarget)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dokumen</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+23</span>
              <span>dokumen baru minggu ini</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengguna Aktif</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Activity className="h-3 w-3 text-blue-500" />
              <span>89 online sekarang</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilization by Area */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Pendayagunaan per Area</CardTitle>
            <CardDescription>Realisasi vs Target tahun {selectedPeriod}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis tickFormatter={(value) => `${value / 1000000000}M`} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), ""]}
                  labelFormatter={(label) => `Area: ${label}`}
                />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                <Bar dataKey="realisasi" fill="#10b981" name="Realisasi" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution Pie Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribusi Pendayagunaan</CardTitle>
            <CardDescription>Persentase per area program</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Persentase"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Bulanan</CardTitle>
          <CardDescription>Perbandingan penghimpunan dan pendayagunaan</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value / 1000000000}M`} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), ""]} />
              <Area
                type="monotone"
                dataKey="penghimpunan"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Penghimpunan"
              />
              <Area
                type="monotone"
                dataKey="pendayagunaan"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="Pendayagunaan"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Update terkini dari sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Dokumen baru ditambahkan",
                  detail: "Laporan Evaluasi Program Beasiswa Q4 2024",
                  time: "2 jam lalu",
                  user: "Ahmad Fauzi",
                  type: "document",
                },
                {
                  action: "Program baru dibuat",
                  detail: "Bantuan Kesehatan untuk Dhuafa",
                  time: "4 jam lalu",
                  user: "Siti Nurhaliza",
                  type: "program",
                },
                {
                  action: "Laporan diperbarui",
                  detail: "Dashboard Pendayagunaan Desember 2024",
                  time: "6 jam lalu",
                  user: "Budi Santoso",
                  type: "report",
                },
                {
                  action: "Pengguna baru terdaftar",
                  detail: "Maya Sari - Departemen Marketing",
                  time: "1 hari lalu",
                  user: "System",
                  type: "user",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "document"
                        ? "bg-blue-100"
                        : activity.type === "program"
                          ? "bg-green-100"
                          : activity.type === "report"
                            ? "bg-purple-100"
                            : "bg-orange-100"
                    }`}
                  >
                    {activity.type === "document" && <FileText className="w-4 h-4 text-blue-600" />}
                    {activity.type === "program" && <Target className="w-4 h-4 text-green-600" />}
                    {activity.type === "report" && <BarChart className="w-4 h-4 text-purple-600" />}
                    {activity.type === "user" && <Users className="w-4 h-4 text-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.detail}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Statistik Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium">Dokumen Dibaca</span>
              </div>
              <span className="text-lg font-bold text-emerald-600">2,847</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Dokumen Favorit</span>
              </div>
              <span className="text-lg font-bold text-blue-600">156</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Rata-rata Waktu Baca</span>
              </div>
              <span className="text-lg font-bold text-purple-600">8m</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium">Kolaborasi Aktif</span>
              </div>
              <span className="text-lg font-bold text-orange-600">23</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

```

# app\(dashboard)\departments\[department]\page.tsx

```tsx
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

```

# app\(dashboard)\departments\page.tsx

```tsx
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

```

# app\(dashboard)\documents\[id]\page.tsx

```tsx
"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Heart,
  Share2,
  Edit,
  Trash2,
  Clock,
  User,
  Building2,
  Tag,
} from "lucide-react"

// Mock data - in real app, this would come from API
const getDocumentById = (id: string) => {
  const documents = [
    {
      id: "1",
      title: "Panduan Lengkap Ziswaf 2024",
      description:
        "Panduan komprehensif untuk pengelolaan ziswaf yang mencakup semua aspek dari pengumpulan hingga penyaluran dana ziswaf",
      department: "Pendayagunaan",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      uploadedBy: "Ahmad Fauzi",
      views: 1234,
      downloads: 456,
      isFavorite: true,
      status: "verified",
      tags: ["panduan", "ziswaf", "2024"],
      content: "Dokumen ini berisi panduan lengkap untuk pengelolaan ziswaf...",
      version: "1.2",
      lastModified: "2024-01-15T10:30:00Z",
    },
  ]

  return documents.find((doc) => doc.id === id)
}

export default function DocumentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(false)

  const document = getDocumentById(params.id as string)

  if (!document) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Dokumen tidak ditemukan</h3>
          <p className="text-gray-600 mb-4">Dokumen yang Anda cari mungkin telah dihapus atau dipindahkan</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    )
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In real app, this would make an API call
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Detail Dokumen</h1>
          <p className="text-gray-600">Informasi lengkap tentang dokumen</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <CardTitle className="text-xl">{document.title}</CardTitle>
                    <CardDescription className="mt-1">{document.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFavorite}
                    className={isFavorite || document.isFavorite ? "text-red-500" : "text-gray-400"}
                  >
                    <Heart className="w-4 h-4" fill={isFavorite || document.isFavorite ? "currentColor" : "none"} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Document Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{document.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{document.uploadedBy}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{document.uploadDate}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>{document.size}</span>
                </div>
              </div>

              <Separator />

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{document.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{document.downloads} downloads</span>
                  </div>
                </div>
                <Badge variant={document.status === "verified" ? "default" : "secondary"}>
                  {document.status === "verified" ? "Terverifikasi" : "Pending"}
                </Badge>
              </div>

              {/* Tags */}
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href={`/documents/${document.id}/view`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Dokumen
                  </Link>
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Document Content Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview Konten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{document.content}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href={`/documents/${document.id}/view`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Buka Dokumen
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan Link
              </Button>
            </CardContent>
          </Card>

          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tipe File:</span>
                <Badge variant="outline">{document.type}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ukuran:</span>
                <span>{document.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Versi:</span>
                <span>{document.version}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Diupload:</span>
                <span>{document.uploadDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Oleh:</span>
                <span>{document.uploadedBy}</span>
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dokumen Terkait</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Link href="/documents/2" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-sm">SOP Verifikasi Mustahik</div>
                  <div className="text-xs text-gray-500">Pendayagunaan • PDF</div>
                </Link>
                <Link href="/documents/3" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-sm">Template Laporan Bulanan</div>
                  <div className="text-xs text-gray-500">Keuangan • XLSX</div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

```

# app\(dashboard)\documents\[id]\view\page.tsx

```tsx
"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DocumentViewer } from "@/components/document-viewer" // Make sure this path is correct
import {
  FileText,
  Download,
  Eye,
  Heart,
  Share2,
  Calendar,
  Building2,
  Tag,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  MessageSquare,
  ExternalLink,
  Link,
} from "lucide-react"

// Mock data - in real app, this would come from API
const documentData = {
  id: 1,
  title: "Laporan Evaluasi Program Beasiswa Q4 2024",
  description:
    "Evaluasi komprehensif program beasiswa untuk mahasiswa kurang mampu termasuk analisis dampak, efektivitas program, dan rekomendasi untuk periode selanjutnya.",
  category: "Laporan",
  department: "Pendayagunaan",
  author: "Siti Nurhaliza",
  authorEmail: "siti.nurhaliza@ziswaf.com",
  uploadDate: "2024-12-15T10:30:00",
  fileType: "PDF",
  fileSize: "2.4 MB",
  fileUrl: "/documents/laporan-evaluasi-beasiswa-q4-2024.pdf",
  preview_url: "https://drive.google.com/file/d/1kXV09Okj9zrEaBcq6TqOst_4WCxevq-I/preview", // The Google Drive preview link
  externalUrl: "https://docs.google.com/document/d/1234567890/edit",
  documentType: "file", // can be "file" or "link"
  platform: "google-docs", // for link type documents
  verificationStatus: "approved",
  verificationRequestedAt: "2024-12-15T10:35:00",
  tags: ["evaluasi", "beasiswa", "laporan", "q4-2024"],
  views: 45,
  downloads: 12,
  isFavorite: false,
  version: "1.2",
  location: "/documents/pendayagunaan/laporan/",
  priority: "high",
  accessLevel: "organizational",
  language: "id",
  expiryDate: "2025-12-31",
  relatedDocuments: "Template Evaluasi, Panduan Beasiswa",
}

export default function DocumentViewPage() {
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(documentData.isFavorite)

  const getVerificationStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Menunggu Verifikasi
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Terverifikasi
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        )
      case "revision_requested":
        return (
          <Badge className="bg-orange-100 text-orange-700">
            <RefreshCw className="w-3 h-3 mr-1" />
            Perlu Revisi
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700">Tinggi</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700">Sedang</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-700">Rendah</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{documentData.title}</h1>
          <p className="text-gray-600 max-w-3xl">{documentData.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getVerificationStatusBadge(documentData.verificationStatus)}
          {getPriorityBadge(documentData.priority)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Viewer */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {documentData.documentType === "link" ? (
                    <Link className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                  <span>Viewer Dokumen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">v{documentData.version}</Badge>
                  <Badge variant="outline">
                    <Eye className="w-3 h-3 mr-1" />
                    {documentData.views} views
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentViewer
                document={{
                  id: documentData.id.toString(),
                  title: documentData.title,
                  file_url: documentData.fileUrl,
                  external_url: documentData.externalUrl,
                  preview_url: documentData.preview_url, // Passing the preview url
                  file_type: documentData.fileType,
                  document_type: documentData.documentType as "file" | "link",
                  platform: documentData.platform,
                  description: documentData.description,
                  author: documentData.author,
                  department: documentData.department,
                  created_at: documentData.uploadDate,
                }}
              />
            </CardContent>
          </Card>

          {/* Document Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Aksi Dokumen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {documentData.documentType === "file" ? (
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                ) : (
                  <Button className="flex-1" onClick={() => window.open(documentData.externalUrl, "_blank")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buka Link
                  </Button>
                )}

                <Button variant="outline" className="flex-1" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "Unfavorite" : "Favorite"}
                </Button>

                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Bagikan
                </Button>

                <Button variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Komentar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={documentData.author} />
                  <AvatarFallback>
                    {documentData.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{documentData.author}</p>
                  <p className="text-sm text-gray-500">{documentData.authorEmail}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span>{documentData.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{formatDate(documentData.uploadDate)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {documentData.documentType === "link" ? (
                    <Link className="w-4 h-4 text-gray-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-gray-400" />
                  )}
                  <span>
                    {documentData.documentType === "link"
                      ? `Link • ${documentData.platform?.replace("-", " ").toUpperCase()}`
                      : `${documentData.fileType} • ${documentData.fileSize}`}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {documentData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Teknis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Versi:</span>
                  <span className="font-medium">v{documentData.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokasi:</span>
                  <span className="font-medium text-xs">{documentData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Akses:</span>
                  <Badge variant="outline" className="text-xs">
                    {documentData.accessLevel}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bahasa:</span>
                  <span className="font-medium">{documentData.language.toUpperCase()}</span>
                </div>
                {documentData.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kadaluarsa:</span>
                    <span className="font-medium text-xs">
                      {new Date(documentData.expiryDate).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          {documentData.relatedDocuments && (
            <Card>
              <CardHeader>
                <CardTitle>Dokumen Terkait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {documentData.relatedDocuments.split(", ").map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <FileText className="w-3 h-3 text-gray-400" />
                      <span className="text-blue-600 hover:underline cursor-pointer">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span>Dilihat</span>
                </div>
                <span className="font-medium">{documentData.views} kali</span>
              </div>
              {documentData.documentType === "file" && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-400" />
                    <span>Diunduh</span>
                  </div>
                  <span className="font-medium">{documentData.downloads} kali</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <span>Favorit</span>
                </div>
                <span className="font-medium">{isFavorite ? "Ya" : "Tidak"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

# app\(dashboard)\documents\add\page.tsx

```tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  X,
  Plus,
  Tag,
  Folder,
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  User,
  Calendar,
  FileType,
  HardDrive,
  Link,
  FileSpreadsheet,
  Presentation,
  FileImage,
  Globe,
  ExternalLink,
  ArrowLeft,
  AtSign,
} from "lucide-react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { UserTagDialog } from "@/components/user-tag-dialog"
import { useRouter } from "next/navigation"

const programs = [
  "Program Beasiswa Mahasiswa",
  "Program Beasiswa Anak Yatim",
  "Program Beasiswa Vokasi",
  "Program Beasiswa Alumni",
]
const categories = ["Panduan", "SOP", "Template", "Laporan", "Evaluasi", "Database", "Presentasi", "Formulir"]
const fileTypes = ["PDF", "DOCX", "XLSX", "PPTX", "TXT", "ZIP"]
const priorities = ["Rendah", "Sedang", "Tinggi", "Kritis"]
const departments = ["Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing", "Operasional"]

const predefinedTags = [
  "ziswaf",
  "panduan",
  "sop",
  "template",
  "laporan",
  "evaluasi",
  "keuangan",
  "pendayagunaan",
  "penghimpunan",
  "mustahik",
  "muzakki",
  "beasiswa",
  "kesehatan",
  "umkm",
  "infrastruktur",
  "dakwah",
  "monitoring",
  "verifikasi",
  "validasi",
  "distribusi",
  "penyaluran",
  "audit",
  "compliance",
  "training",
  "workshop",
  "meeting",
  "presentation",
]

// Mock users for tagging
const users = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad.fauzi@ziswaf.com", department: "Pendayagunaan" },
  { id: 2, name: "Siti Nurhaliza", email: "siti.nurhaliza@ziswaf.com", department: "Pendayagunaan" },
  { id: 3, name: "Budi Santoso", email: "budi.santoso@ziswaf.com", department: "IT" },
  { id: 4, name: "Maya Sari", email: "maya.sari@ziswaf.com", department: "Keuangan" },
  { id: 5, name: "Andi Rahman", email: "andi.rahman@ziswaf.com", department: "SDM" },
]

export default function AddDocumentPage() {
  const router = useRouter()
  const [documentType, setDocumentType] = useState<"file" | "link">("file")
  const [linkData, setLinkData] = useState({
    url: "",
    platform: "",
  })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    program: "",
    fileType: "",
    priority: "Sedang",
    isRequired: false,
    isMandatory: false,
    version: "1.0",
    author: "",
    location: "",
    expiryDate: "",
    relatedDocuments: "",
    accessLevel: "organizational", // organizational, public
    language: "id",
  })

  const [tags, setTags] = useState<string[]>([])
  const [departmentTags, setDepartmentTags] = useState<string[]>([])
  const [taggedUsers, setTaggedUsers] = useState<typeof users>([])
  const [newTag, setNewTag] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setIsUploading(true)

      // Auto-fill some fields based on file
      const fileExtension = file.name.split(".").pop()?.toUpperCase()
      if (fileExtension && fileTypes.includes(fileExtension)) {
        handleInputChange("fileType", fileExtension)
      }

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
        }
      }, 200)

      // Auto-generate location based on program and category
      if (formData.program && formData.category) {
        const location = `/documents/${formData.program.toLowerCase().replace(/\s+/g, "-")}/${formData.category.toLowerCase()}/`
        handleInputChange("location", location)
      }
    }
  }

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addDepartmentTag = (dept: string) => {
    if (!departmentTags.includes(dept)) {
      setDepartmentTags([...departmentTags, dept])
    }
  }

  const removeDepartmentTag = (deptToRemove: string) => {
    setDepartmentTags(departmentTags.filter((dept) => dept !== deptToRemove))
  }

  const addUserTag = (user: (typeof users)[0]) => {
    if (!taggedUsers.find((u) => u.id === user.id)) {
      setTaggedUsers([...taggedUsers, user])
    }
  }

  const removeUserTag = (userId: number) => {
    setTaggedUsers(taggedUsers.filter((user) => user.id !== userId))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Judul dokumen wajib diisi"
    if (!formData.description.trim()) newErrors.description = "Deskripsi dokumen wajib diisi"
    if (!formData.category) newErrors.category = "Kategori wajib dipilih"
    if (!formData.program) newErrors.program = "Program wajib dipilih"
    if (!formData.author.trim()) newErrors.author = "Nama penulis wajib diisi"
    if (!formData.location.trim()) newErrors.location = "Lokasi file wajib diisi"
    if (documentType === "file" && !uploadedFile) newErrors.file = "File dokumen wajib diupload"
    if (documentType === "link" && !linkData.url.trim()) newErrors.url = "URL dokumen wajib diisi"
    if (tags.length === 0) newErrors.tags = "Minimal 1 tag wajib ditambahkan"
    if (departmentTags.length === 0) newErrors.departmentTags = "Minimal 1 departemen wajib ditag"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Simulate form submission
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        // Redirect to documents page or show success message
        alert("Dokumen berhasil ditambahkan dan otomatis diajukan untuk verifikasi admin!")
        router.push("/documents")
      }
    }, 100)
  }

  const generateLocation = () => {
    if (formData.program && formData.category) {
      const location = `/documents/${formData.program.toLowerCase().replace(/\s+/g, "-")}/${formData.category.toLowerCase()}/`
      handleInputChange("location", location)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <BreadcrumbNav />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push("/documents")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tambah Dokumen Baru</h1>
              <p className="text-gray-600">Upload dan kelola dokumen untuk knowledge management system</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Informasi Dasar</span>
              </CardTitle>
              <CardDescription>Informasi utama tentang dokumen yang akan diupload</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tipe Dokumen *</Label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={documentType === "file" ? "default" : "outline"}
                    onClick={() => setDocumentType("file")}
                    className="flex-1"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button
                    type="button"
                    variant={documentType === "link" ? "default" : "outline"}
                    onClick={() => setDocumentType("link")}
                    className="flex-1"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Link Eksternal
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul Dokumen *</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul dokumen yang deskriptif"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan isi dan tujuan dokumen ini secara detail"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Pilih kategori dokumen" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Program *</Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) => {
                      handleInputChange("program", value)
                      generateLocation()
                    }}
                  >
                    <SelectTrigger className={errors.program ? "border-red-500" : ""}>
                      <SelectValue placeholder="Pilih program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program} value={program}>
                          <div className="flex items-center space-x-2">
                            <Folder className="w-4 h-4" />
                            <span>{program}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.program && <p className="text-sm text-red-500">{errors.program}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Penulis/Author *</Label>
                  <Input
                    id="author"
                    placeholder="Nama penulis dokumen"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className={errors.author ? "border-red-500" : ""}
                  />
                  {errors.author && <p className="text-sm text-red-500">{errors.author}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Versi</Label>
                  <Input
                    id="version"
                    placeholder="1.0"
                    value={formData.version}
                    onChange={(e) => handleInputChange("version", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioritas</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {documentType === "file" ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload File</span>
                </CardTitle>
                <CardDescription>Upload file dokumen yang akan disimpan dalam sistem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">File Dokumen *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Klik untuk upload atau drag & drop file di sini</p>
                      <p className="text-xs text-gray-500">
                        Mendukung: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, ZIP (Max: 50MB)
                      </p>
                    </label>
                  </div>
                  {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                </div>

                {uploadedFile && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">{uploadedFile.name}</span>
                        <Badge variant="outline">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</Badge>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setUploadedFile(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {isUploading && (
                      <div className="space-y-1">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-xs text-gray-500">Uploading... {uploadProgress}%</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fileType">Tipe File</Label>
                    <Select value={formData.fileType} onValueChange={(value) => handleInputChange("fileType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe file" />
                      </SelectTrigger>
                      <SelectContent>
                        {fileTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center space-x-2">
                              <FileType className="w-4 h-4" />
                              <span>{type}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Tanggal Kadaluarsa</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="w-5 h-5" />
                  <span>Link Dokumen</span>
                </CardTitle>
                <CardDescription>
                  Tambahkan link ke dokumen eksternal seperti Google Docs, Sheets, Canva, dll.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="documentUrl">URL Dokumen *</Label>
                  <Input
                    id="documentUrl"
                    placeholder="https://docs.google.com/document/d/..."
                    value={linkData.url}
                    onChange={(e) => setLinkData((prev) => ({ ...prev, url: e.target.value }))}
                    className={errors.url ? "border-red-500" : ""}
                  />
                  {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={linkData.platform}
                    onValueChange={(value) => setLinkData((prev) => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih platform dokumen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google-docs">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>Google Docs</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="google-sheets">
                        <div className="flex items-center space-x-2">
                          <FileSpreadsheet className="w-4 h-4 text-green-600" />
                          <span>Google Sheets</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="google-slides">
                        <div className="flex items-center space-x-2">
                          <Presentation className="w-4 h-4 text-orange-600" />
                          <span>Google Slides</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="canva">
                        <div className="flex items-center space-x-2">
                          <FileImage className="w-4 h-4 text-purple-600" />
                          <span>Canva</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="figma">
                        <div className="flex items-center space-x-2">
                          <FileImage className="w-4 h-4 text-pink-600" />
                          <span>Figma</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="notion">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-800" />
                          <span>Notion</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-600" />
                          <span>Platform Lain</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <ExternalLink className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900">Tips untuk Link Dokumen:</p>
                      <ul className="text-blue-700 mt-1 space-y-1 text-xs">
                        <li>• Pastikan link dapat diakses oleh tim</li>
                        <li>• Gunakan link sharing yang tepat (view/edit)</li>
                        <li>• Periksa permission sebelum menyimpan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location and Organization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Folder className="w-5 h-5" />
                <span>Lokasi & Organisasi</span>
              </CardTitle>
              <CardDescription>Tentukan lokasi penyimpanan berdasarkan program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi File *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    placeholder="/documents/program/kategori/"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className={`flex-1 ${errors.location ? "border-red-500" : ""}`}
                  />
                  <Button type="button" variant="outline" onClick={generateLocation}>
                    <HardDrive className="w-4 h-4 mr-2" />
                    Auto
                  </Button>
                </div>
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                <p className="text-xs text-gray-500">Lokasi akan menentukan struktur folder berdasarkan program</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessLevel">Level Akses</Label>
                <Select value={formData.accessLevel} onValueChange={(value) => handleInputChange("accessLevel", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organizational">Organizational - Seluruh organisasi</SelectItem>
                    <SelectItem value="public">Public - Dapat diakses publik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="relatedDocuments">Dokumen Terkait</Label>
                <Input
                  id="relatedDocuments"
                  placeholder="ID atau nama dokumen yang terkait (pisahkan dengan koma)"
                  value={formData.relatedDocuments}
                  onChange={(e) => handleInputChange("relatedDocuments", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Department Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Departemen Terlibat</span>
              </CardTitle>
              <CardDescription>Pilih departemen yang perlu akses ke dokumen ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Departemen yang Terlibat *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      type="button"
                      variant={departmentTags.includes(dept) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (departmentTags.includes(dept)) {
                          removeDepartmentTag(dept)
                        } else {
                          addDepartmentTag(dept)
                        }
                      }}
                      className="justify-start"
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      {dept}
                    </Button>
                  ))}
                </div>
                {errors.departmentTags && <p className="text-sm text-red-500">{errors.departmentTags}</p>}
              </div>

              <div className="space-y-2">
                <Label>Departemen Terpilih</Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                  {departmentTags.map((dept) => (
                    <Badge key={dept} variant="secondary" className="flex items-center space-x-1">
                      <Building2 className="w-3 h-3" />
                      <span>{dept}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeDepartmentTag(dept)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {departmentTags.length === 0 && (
                    <p className="text-sm text-gray-500">Belum ada departemen yang dipilih</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Tagging */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AtSign className="w-5 h-5" />
                  <span>Tag Pengguna</span>
                </div>
                <UserTagDialog
                  taggedUsers={taggedUsers}
                  onUserTag={addUserTag}
                  onUserUntag={removeUserTag}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Tag Pengguna
                    </Button>
                  }
                />
              </CardTitle>
              <CardDescription>Tag pengguna yang perlu diberitahu tentang dokumen ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pengguna yang Di-tag</Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                  {taggedUsers.map((user) => (
                    <Badge key={user.id} variant="secondary" className="flex items-center space-x-1">
                      <AtSign className="w-3 h-3" />
                      <span>{user.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeUserTag(user.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {taggedUsers.length === 0 && <p className="text-sm text-gray-500">Belum ada pengguna yang di-tag</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="w-5 h-5" />
                <span>Tags & Metadata</span>
              </CardTitle>
              <CardDescription>Tambahkan tags untuk memudahkan pencarian dan kategorisasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tags Terpilih</Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {tags.length === 0 && <p className="text-sm text-gray-500">Belum ada tags yang dipilih</p>}
                </div>
                {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
              </div>

              <div className="space-y-2">
                <Label>Tags Tersedia</Label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                  {predefinedTags.map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant={tags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (tags.includes(tag)) {
                          removeTag(tag)
                        } else {
                          addTag(tag)
                        }
                      }}
                      className="justify-start text-xs"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newTag">Tambah Tag Baru</Label>
                <div className="flex space-x-2">
                  <Input
                    id="newTag"
                    placeholder="Ketik tag baru"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag(newTag)
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={() => addTag(newTag)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isRequired"
                  checked={formData.isRequired}
                  onCheckedChange={(checked) => handleInputChange("isRequired", checked as boolean)}
                />
                <Label htmlFor="isRequired" className="text-sm">
                  Dokumen Wajib Dibaca
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isMandatory"
                  checked={formData.isMandatory}
                  onCheckedChange={(checked) => handleInputChange("isMandatory", checked as boolean)}
                />
                <Label htmlFor="isMandatory" className="text-sm">
                  Dokumen Kepegawaian Wajib
                </Label>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Verifikasi Otomatis</p>
                    <p className="text-blue-700 text-xs mt-1">
                      Setiap dokumen akan otomatis diajukan untuk verifikasi admin setelah diupload.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">{formData.title || "Judul Dokumen"}</h4>
                <p className="text-xs text-gray-600 mb-2">{formData.description || "Deskripsi dokumen..."}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>{formData.author || "Penulis"}</span>
                  <span>•</span>
                  <span>{formData.program || "Program"}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date().toLocaleDateString("id-ID")}</span>
                  <span>•</span>
                  <span>{formData.category || "Kategori"}</span>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                {departmentTags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Departemen:</p>
                    <div className="flex flex-wrap gap-1">
                      {departmentTags.slice(0, 2).map((dept) => (
                        <Badge key={dept} variant="outline" className="text-xs">
                          <Building2 className="w-3 h-3 mr-1" />
                          {dept}
                        </Badge>
                      ))}
                      {departmentTags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{departmentTags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                {taggedUsers.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Tagged Users:</p>
                    <div className="flex flex-wrap gap-1">
                      {taggedUsers.slice(0, 2).map((user) => (
                        <Badge key={user.id} variant="outline" className="text-xs">
                          <AtSign className="w-3 h-3 mr-1" />
                          {user.name}
                        </Badge>
                      ))}
                      {taggedUsers.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{taggedUsers.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status Info */}
          <Card>
            <CardHeader>
              <CardTitle>Status Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                {uploadedFile || linkData.url ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                )}
                <span>
                  {documentType === "file"
                    ? uploadedFile
                      ? "File siap diupload"
                      : "Belum ada file dipilih"
                    : linkData.url
                      ? "Link siap disimpan"
                      : "Belum ada link dimasukkan"}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Status: Akan diverifikasi admin otomatis</span>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Mengupload... {uploadProgress}%
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Simpan Dokumen
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

```

# app\(dashboard)\documents\loading.tsx

```tsx
export default function Loading() {
  return null
}

```

# app\(dashboard)\documents\page.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, Heart, Star, Eye, Download, Clock, CheckCircle, XCircle, Search} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { DocumentFilters, DocumentFilterValues } from "@/components/document-filters"

// Define the Document interface
interface Document {
  id: string
  title: string
  description: string
  department: string
  author: string
  created_at: string
  file_type: string
  file_size: string
  is_favorite: boolean
  is_mandatory: boolean
  views: number
  downloads: number
  tags: string[]
  verification_status: "approved" | "pending" | "rejected"
  category: string;
  priority: string;
}

// Mock data for the page
const mockDocuments: Document[] = [
    {
      id: "1",
      title: "Panduan Penyaluran Beasiswa 2024",
      description: "Dokumen panduan lengkap untuk proses penyaluran beasiswa tahun 2024",
      department: "Pendayagunaan",
      author: "Ahmad Fauzi",
      created_at: "2024-01-15",
      file_type: "PDF",
      file_size: "2.5 MB",
      is_favorite: true,
      is_mandatory: true,
      views: 245,
      downloads: 89,
      tags: ["beasiswa", "panduan", "2024"],
      verification_status: "approved",
      category: "Panduan",
      priority: "high",
    },
    {
      id: "2",
      title: "Laporan Keuangan Q4 2023",
      description: "Laporan keuangan triwulan keempat tahun 2023",
      department: "Keuangan",
      author: "Siti Nurhaliza",
      created_at: "2024-01-10",
      file_type: "Excel",
      file_size: "1.8 MB",
      is_favorite: false,
      is_mandatory: true,
      views: 156,
      downloads: 67,
      tags: ["keuangan", "laporan", "Q4"],
      verification_status: "approved",
      category: "Laporan",
      priority: "high",
    },
    {
      id: "3",
      title: "SOP Verifikasi Mustahik",
      description: "Standard Operating Procedure untuk verifikasi penerima bantuan",
      department: "Penyaluran",
      author: "Budi Santoso",
      created_at: "2024-01-08",
      file_type: "PDF",
      file_size: "1.2 MB",
      is_favorite: true,
      is_mandatory: false,
      views: 198,
      downloads: 45,
      tags: ["SOP", "verifikasi", "mustahik"],
      verification_status: "pending",
      category: "SOP",
      priority: "medium",
    },
    {
      id: "4",
      title: "Proposal Program Kesehatan",
      description: "Proposal program bantuan kesehatan untuk mustahik",
      department: "Pendayagunaan",
      author: "Fatimah Zahra",
      created_at: "2024-01-05",
      file_type: "Word",
      file_size: "3.1 MB",
      is_favorite: false,
      is_mandatory: false,
      views: 87,
      downloads: 23,
      tags: ["proposal", "kesehatan", "bantuan"],
      verification_status: "rejected",
      category: "Template",
      priority: "low",
    },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { userRole } = useAuth();
  
  const [activeFilters, setActiveFilters] = useState<DocumentFilterValues>({
    searchQuery: "",
    category: "Semua",
    department: "Semua",
    priority: "Semua",
    time: "Semua",
    showFavoritesOnly: false,
    showMandatoryOnly: false,
  });

  const handleFilterChange = (filters: DocumentFilterValues) => {
    setActiveFilters(filters);
  };
  
  useEffect(() => {
    const { searchQuery, category, department, priority, showFavoritesOnly, showMandatoryOnly } = activeFilters;
    
    const newFiltered = documents.filter(doc => {
      const matchesSearch =
        searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = category === "Semua" || doc.category === category;
      const matchesDepartment = department === "Semua" || doc.department === department;
      const matchesPriority = priority === "Semua" || doc.priority === priority;
      const matchesFavorites = !showFavoritesOnly || doc.is_favorite;
      const matchesMandatory = !showMandatoryOnly || doc.is_mandatory;

      return matchesSearch && matchesCategory && matchesDepartment && matchesPriority && matchesFavorites && matchesMandatory;
    });

    setFilteredDocuments(newFiltered);
  }, [documents, activeFilters]);

  const toggleFavorite = (docId: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_favorite: !doc.is_favorite } : doc)));
  };

  const toggleMandatory = (docId: string) => {
    if (userRole !== "admin") return;
    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, is_mandatory: !doc.is_mandatory } : doc)));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
  };
  
  const getVerificationBadge = (status: Document["verification_status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Terverifikasi</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Ditolak</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semua Dokumen</h1>
          <p className="text-muted-foreground">Kelola dan akses semua dokumen dalam sistem</p>
        </div>
        <Button asChild>
          <Link href="/documents/add"><Plus className="mr-2 h-4 w-4" />Tambah Dokumen</Link>
        </Button>
      </div>

      <DocumentFilters
        onFilterChange={handleFilterChange}
        onViewChange={setViewMode}
        visibleFilters={['category', 'department', 'favorites', 'mandatory']}
        resultCount={filteredDocuments.length}
      />

      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <Badge variant="outline" className="text-xs">{document.file_type}</Badge>
                    {document.is_mandatory && (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Wajib
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => toggleFavorite(document.id)} className={`p-1 h-auto ${document.is_favorite ? "text-red-500" : "text-gray-400"}`}>
                      <Heart className="w-4 h-4" fill={document.is_favorite ? "currentColor" : "none"} />
                    </Button>
                    {userRole === "admin" && (
                      <Button variant="ghost" size="sm" onClick={() => toggleMandatory(document.id)} className="p-1 h-auto">
                        <Star className={`h-4 w-4 transition-colors ${document.is_mandatory ? "fill-yellow-400 text-yellow-500" : "text-gray-400"}`} />
                      </Button>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2 mt-2">{document.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-sm">{document.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex justify-between items-center">
                      <span>{document.department}</span>
                      <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(document.created_at)}</span></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{document.file_size}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1"><Eye className="w-4 h-4" /><span>{document.views} views</span></div>
                        <div className="flex items-center space-x-1"><Download className="w-4 h-4" /><span>{document.downloads} downloads</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {document.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t mt-4">
                  <div>{getVerificationBadge(document.verification_status)}</div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild><Link href={`/documents/${document.id}`}><Eye className="w-4 h-4" /></Link></Button>
                    <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredDocuments.map((document) => (
                <div key={document.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Link href={`/documents/${document.id}`} className="font-medium text-gray-900 truncate hover:underline">{document.title}</Link>
                        {document.is_mandatory && <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs"><Star className="w-3 h-3 mr-1 fill-current" />Wajib</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1 mb-2">{document.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{document.author}</span>
                        <span>{document.department}</span>
                        <span>{formatDate(document.created_at)}</span>
                        <span>{getVerificationBadge(document.verification_status)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => toggleFavorite(document.id)}><Heart className={`w-4 h-4 ${document.is_favorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} /></Button>
                    <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tidak Ada Dokumen Ditemukan</h3>
            <p className="text-muted-foreground text-center mb-4">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
```

# app\(dashboard)\documents\recent\loading.tsx

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function RecentDocumentsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex-1 space-y-4 p-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* Table Header Skeleton */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b">
          <Skeleton className="col-span-5 h-4" />
          <Skeleton className="col-span-2 h-4" />
          <Skeleton className="col-span-2 h-4" />
          <Skeleton className="col-span-2 h-4" />
          <div className="col-span-1"></div>
        </div>

        {/* Documents Skeleton */}
        <div className="space-y-4">
          {[1, 2].map((group) => (
            <div key={group} className="space-y-1">
              <Skeleton className="h-4 w-32 px-4" />
              {[1, 2, 3].map((doc) => (
                <div key={doc} className="grid grid-cols-12 gap-4 px-4 py-2">
                  <div className="col-span-5 flex items-center space-x-3">
                    <Skeleton className="h-5 w-5" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="col-span-2">
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="col-span-2">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="col-span-1">
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

```

# app\(dashboard)\documents\recent\page.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { FileText, Calendar, Heart, Star, Eye, Download, Clock, CheckCircle, XCircle, Search } from "lucide-react"
import Link from "next/link"

// Interface and Mock Data remain the same as before
interface Document {
  id: number
  title: string
  description: string
  category: string
  department: string
  author: string
  date: string
  uploadedAt: string
  size: string
  type: "PDF" | "XLSX" | "Word" | "PPTX"
  downloads: number
  views: number
  tags: string[]
  is_favorite: boolean
  is_mandatory: boolean
  verification_status: "approved" | "pending" | "rejected"
  priority: "high" | "medium" | "low"
  isNew: boolean
}

const recentDocuments: Document[] = [
    {
    id: 1,
    title: "Panduan Penyaluran Beasiswa 2024",
    description: "Dokumen panduan lengkap untuk proses penyaluran beasiswa tahun 2024",
    category: "Panduan",
    department: "Pendayagunaan",
    author: "Ahmad Fauzi",
    date: "2024-12-17",
    uploadedAt: new Date().toISOString(),
    size: "2.4 MB",
    type: "PDF",
    downloads: 23,
    views: 156,
    tags: ["ziswaf", "panduan", "prosedur"],
    is_favorite: true,
    is_mandatory: true,
    verification_status: "approved",
    priority: "high",
    isNew: true,
  },
  {
    id: 2,
    title: "Template Evaluasi Program Beasiswa Q4 2024",
    description: "Template untuk evaluasi dan penilaian program beasiswa triwulan keempat",
    category: "Template",
    department: "Pendayagunaan",
    author: "Siti Nurhaliza",
    date: "2024-12-16",
    uploadedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    size: "1.2 MB",
    type: "XLSX",
    downloads: 45,
    views: 234,
    tags: ["template", "evaluasi", "beasiswa"],
    is_favorite: false,
    is_mandatory: false,
    verification_status: "approved",
    priority: "medium",
    isNew: true,
  },
  {
    id: 3,
    title: "SOP Verifikasi Mustahik Terbaru",
    description: "Standar operasional prosedur terbaru untuk verifikasi dan validasi penerima manfaat",
    category: "SOP",
    department: "Pendayagunaan",
    author: "Budi Santoso",
    date: "2024-12-15",
    uploadedAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    size: "1.8 MB",
    type: "PDF",
    downloads: 67,
    views: 345,
    tags: ["sop", "verifikasi", "mustahik"],
    is_favorite: true,
    is_mandatory: true,
    verification_status: "approved",
    priority: "high",
    isNew: true,
  },
  {
    id: 4,
    title: "Laporan Analisis Dampak Program Sosial",
    description: "Laporan komprehensif analisis dampak program sosial periode November 2024",
    category: "Laporan",
    department: "Pendayagunaan",
    author: "Maya Sari",
    date: "2024-12-14",
    uploadedAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    size: "3.5 MB",
    type: "PDF",
    downloads: 89,
    views: 456,
    tags: ["laporan", "analisis", "dampak"],
    is_favorite: false,
    is_mandatory: false,
    verification_status: "pending",
    priority: "high",
    isNew: false,
  },
];


export default function RecentDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(recentDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(recentDocuments);
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const { userRole } = useAuth();

  useEffect(() => {
    let newFiltered = documents.filter(doc => {
      if (timeFilter === 'all') return true;

      const now = new Date();
      const uploadDate = new Date(doc.uploadedAt);
      const diffTime = now.getTime() - uploadDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (timeFilter === "today") return diffDays <= 1;
      if (timeFilter === "week") return diffDays <= 7;
      if (timeFilter === "month") return diffDays <= 30;

      return true;
    });
    
    setFilteredDocuments(newFiltered);
  }, [documents, timeFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
  };
  
  const getVerificationBadge = (status: Document["verification_status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Terverifikasi</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Ditolak</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900">Dokumen Terbaru</h1>
        </div>
        <div>
            <p className="text-gray-600">Dokumen yang baru saja ditambahkan atau diperbarui</p>
        </div>
      </div>

      {/* NEW: Simple Filter Buttons */}
      <div className="flex items-center gap-2">
        <Button variant={timeFilter === 'all' ? 'default' : 'outline'} onClick={() => setTimeFilter('all')}>Semua</Button>
        <Button variant={timeFilter === 'today' ? 'default' : 'outline'} onClick={() => setTimeFilter('today')}>Hari Ini</Button>
        <Button variant={timeFilter === 'week' ? 'default' : 'outline'} onClick={() => setTimeFilter('week')}>Minggu Ini</Button>
        <Button variant={timeFilter === 'month' ? 'default' : 'outline'} onClick={() => setTimeFilter('month')}>Bulan Ini</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow flex flex-col">
             <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <Badge variant="outline" className="text-xs">{document.type}</Badge>
                  {document.is_mandatory && (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Wajib
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className={`p-1 h-auto ${document.is_favorite ? "text-red-500" : "text-gray-400"}`}>
                    <Heart className="w-4 h-4" fill={document.is_favorite ? "currentColor" : "none"} />
                  </Button>
                  {userRole === "admin" && (
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Star className={`h-4 w-4 transition-colors ${document.is_mandatory ? "fill-yellow-400 text-yellow-500" : "text-gray-400"}`} />
                    </Button>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2 mt-2">{document.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-sm">{document.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
              <div>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between items-center">
                    <span>{document.department}</span>
                    <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(document.date)}</span></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{document.size}</span>
                     <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1"><Eye className="w-4 h-4" /><span>{document.views} views</span></div>
                        <div className="flex items-center space-x-1"><Download className="w-4 h-4" /><span>{document.downloads} downloads</span></div>
                      </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <div>{getVerificationBadge(document.verification_status)}</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild><Link href={`/documents/${document.id}`}><Eye className="w-4 h-4" /></Link></Button>
                  <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Dokumen Terbaru</h3>
            <p className="text-gray-600 mb-4">Tidak ada dokumen yang ditemukan untuk periode waktu yang dipilih.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
```

# app\(dashboard)\knowledge-requests\loading.tsx

```tsx
export default function Loading() {
  return null
}

```

# app\(dashboard)\knowledge-requests\page.tsx

```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Clock, User, Calendar, Plus, Eye, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the type for a knowledge request for consistency
interface KnowledgeRequest {
  id: number;
  title: string;
  description: string;
  requester: string;
  department: string;
  requestDate: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  responses: number;
  category: string;
}

// Mock data for the page
const initialKnowledgeRequests: KnowledgeRequest[] = [
  {
    id: 1,
    title: "Prosedur Penyaluran Bantuan Pendidikan",
    description: "Saya membutuhkan informasi detail tentang prosedur dan persyaratan penyaluran bantuan pendidikan untuk mahasiswa.",
    requester: "Ahmad Fauzi",
    department: "Penyaluran",
    requestDate: "15 Desember 2024",
    status: "open",
    priority: "high",
    responses: 3,
    category: "prosedur",
  },
  {
    id: 2,
    title: "Template Laporan Keuangan Bulanan",
    description: "Apakah ada template standar untuk laporan keuangan bulanan yang harus digunakan oleh semua departemen?",
    requester: "Siti Nurhaliza",
    department: "Keuangan",
    requestDate: "14 Desember 2024",
    status: "in_progress",
    priority: "medium",
    responses: 1,
    category: "template",
  },
  {
    id: 3,
    title: "Strategi Penghimpunan Dana Digital",
    description: "Bagaimana strategi terbaik untuk penghimpunan dana melalui platform digital dan media sosial?",
    requester: "Fatimah Zahra",
    department: "Penghimpunan",
    requestDate: "12 Desember 2024",
    status: "resolved",
    priority: "low",
    responses: 5,
    category: "strategi",
  },
];

export default function KnowledgeRequestsPage() {
  const [knowledgeRequests, setKnowledgeRequests] = useState<KnowledgeRequest[]>(initialKnowledgeRequests);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    department: '',
    priority: 'medium'
  });

  const handleAddRequest = () => {
    if (!newRequest.title || !newRequest.description || !newRequest.department) {
      alert("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    const newRequestObject: KnowledgeRequest = {
      id: knowledgeRequests.length + 1,
      title: newRequest.title,
      description: newRequest.description,
      department: newRequest.department,
      priority: newRequest.priority as 'high' | 'medium' | 'low',
      requester: "User Saat Ini", // Replace with actual user data later
      requestDate: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'open',
      responses: 0,
      category: 'lainnya',
    };

    setKnowledgeRequests(prev => [newRequestObject, ...prev]);
    setNewRequest({ title: '', description: '', department: '', priority: 'medium' });
    setIsAddRequestOpen(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "Terbuka";
      case "in_progress": return "Dalam Proses";
      case "resolved": return "Terjawab";
      case "closed": return "Ditutup";
      default: return "Unknown";
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <AlertCircle className="h-4 w-4" />;
      case "in_progress": return <Clock className="h-4 w-4" />;
      case "resolved": return <CheckCircle className="h-4 w-4" />;
      case "closed": return <XCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  const filterRequests = (status: KnowledgeRequest['status']) => {
    return knowledgeRequests.filter(req => req.status === status);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permintaan Pengetahuan</h1>
          <p className="text-muted-foreground">Ajukan pertanyaan dan berbagi pengetahuan dengan tim</p>
        </div>
        <Button onClick={() => setIsAddRequestOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajukan Pengetahuan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Permintaan</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeRequests.length}</div>
            <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terbuka</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterRequests('open').length}</div>
            <p className="text-xs text-muted-foreground">Menunggu jawaban</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterRequests('in_progress').length}</div>
            <p className="text-xs text-muted-foreground">Sedang diproses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terjawab</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterRequests('resolved').length}</div>
            <p className="text-xs text-muted-foreground">Sudah terjawab</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Semua Permintaan</TabsTrigger>
          <TabsTrigger value="open">Terbuka</TabsTrigger>
          <TabsTrigger value="in_progress">Dalam Proses</TabsTrigger>
          <TabsTrigger value="resolved">Terjawab</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {knowledgeRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">
                      <Link href={`/knowledge-requests/${request.id}`} className="hover:underline">{request.title}</Link>
                    </CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(request.priority)}>{request.priority.toUpperCase()}</Badge>
                    <Badge className={getStatusColor(request.status)}>
                      <div className="flex items-center gap-1">{getStatusIcon(request.status)}{getStatusText(request.status)}</div>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><User className="h-4 w-4" />{request.requester}</div>
                    <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{request.requestDate}</div>
                    <div className="flex items-center gap-1"><MessageSquare className="h-4 w-4" />{request.responses} respons</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{request.category}</Badge>
                      <span className="text-sm text-muted-foreground">Departemen {request.department}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/knowledge-requests/${request.id}`}><Eye className="mr-2 h-4 w-4" />Detail</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="open"><div className="text-center py-8"><p className="text-muted-foreground">Menampilkan permintaan yang masih terbuka</p></div></TabsContent>
        <TabsContent value="in_progress"><div className="text-center py-8"><p className="text-muted-foreground">Menampilkan permintaan yang sedang diproses</p></div></TabsContent>
        <TabsContent value="resolved"><div className="text-center py-8"><p className="text-muted-foreground">Menampilkan permintaan yang sudah terjawab</p></div></TabsContent>
      </Tabs>
      
      {/* The Dialog for adding a new request */}
      <Dialog open={isAddRequestOpen} onOpenChange={setIsAddRequestOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Buat Permintaan Pengetahuan Baru</DialogTitle>
            <DialogDescription>Jelaskan pertanyaan atau pengetahuan yang Anda butuhkan. Tim terkait akan diberitahu.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="req-title">Judul Permintaan *</Label>
              <Input id="req-title" placeholder="Contoh: Prosedur Klaim Asuransi Kesehatan" value={newRequest.title} onChange={(e) => setNewRequest({...newRequest, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="req-desc">Deskripsi Detail *</Label>
              <Textarea id="req-desc" placeholder="Jelaskan secara detail apa yang Anda butuhkan..." value={newRequest.description} onChange={(e) => setNewRequest({...newRequest, description: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="req-dept">Departemen Terkait *</Label>
                <Select value={newRequest.department} onValueChange={(value) => setNewRequest({...newRequest, department: value})}>
                  <SelectTrigger><SelectValue placeholder="Pilih Departemen" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Penyaluran">Penyaluran</SelectItem>
                    <SelectItem value="Keuangan">Keuangan</SelectItem>
                    <SelectItem value="Penghimpunan">Penghimpunan</SelectItem>
                    <SelectItem value="SDM">SDM</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="req-priority">Prioritas</Label>
                  <Select value={newRequest.priority} onValueChange={(value) => setNewRequest({...newRequest, priority: value})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Rendah</SelectItem>
                    <SelectItem value="medium">Sedang</SelectItem>
                    <SelectItem value="high">Tinggi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRequestOpen(false)}>Batal</Button>
            <Button onClick={handleAddRequest}>Ajukan Permintaan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

# app\(dashboard)\layout.tsx

```tsx
import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { NotificationProvider } from "@/hooks/use-notifications" 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      <SidebarProvider>
        <AppSidebar />
        {/* We use SidebarInset which is a <main> tag */}
        <SidebarInset>
          {/* The header is now a direct child of the main container */}
          <DashboardHeader />
          
          {/* This div becomes the scrollable content area */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </NotificationProvider>
  )
}
```

# app\(dashboard)\notifications\page.tsx

```tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Check,
  Clock,
  FileText,
  Users,
  AlertCircle,
  CheckCircle,
  Settings,
  Trash2,
  ArrowLeft,
} from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "document_verification",
    title: "Dokumen Menunggu Verifikasi",
    message: "Laporan Evaluasi Program Beasiswa Q4 2024 memerlukan verifikasi Anda",
    sender: "Siti Nurhaliza",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    priority: "high",
    actionRequired: true,
  },
  {
    id: 2,
    type: "activity_update",
    title: "Update Aktivitas Program",
    message: "Program Beasiswa Mahasiswa Dhuafa telah mencapai progress 65%",
    sender: "Ahmad Fauzi",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-01-15T09:15:00Z",
    read: false,
    priority: "medium",
    actionRequired: false,
  },
  {
    id: 3,
    type: "knowledge_request",
    title: "Pertanyaan Baru",
    message: "Maya Sari mengajukan pertanyaan tentang strategi marketing digital",
    sender: "Maya Sari",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-01-14T16:45:00Z",
    read: true,
    priority: "medium",
    actionRequired: true,
  },
  {
    id: 4,
    type: "system",
    title: "Pemeliharaan Sistem",
    message: "Sistem akan menjalani pemeliharaan rutin pada 20 Januari 2024",
    sender: "System",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-01-14T14:20:00Z",
    read: true,
    priority: "low",
    actionRequired: false,
  },
]

export default function NotificationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread" && notification.read) return false
    if (activeTab === "action_required" && !notification.actionRequired) return false
    if (filterType !== "all" && notification.type !== filterType) return false
    return true
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "document_verification":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "activity_update":
        return <Users className="w-5 h-5 text-green-500" />
      case "knowledge_request":
        return <Bell className="w-5 h-5 text-purple-500" />
      case "system":
        return <Settings className="w-5 h-5 text-gray-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Tinggi"
      case "medium":
        return "Sedang"
      case "low":
        return "Rendah"
      default:
        return priority
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Baru saja"
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`
    return date.toLocaleDateString("id-ID")
  }

  const markAsRead = (id: number) => {
    // In real app, this would make an API call
    console.log("Mark as read:", id)
  }

  const deleteNotification = (id: number) => {
    // In real app, this would make an API call
    console.log("Delete notification:", id)
  }

  const handleBackClick = () => {
    router.push("/dashboard")
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
            <p className="text-gray-600">Kelola dan pantau semua notifikasi sistem</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="document_verification">Verifikasi Dokumen</SelectItem>
              <SelectItem value="activity_update">Update Aktivitas</SelectItem>
              <SelectItem value="knowledge_request">Knowledge Request</SelectItem>
              <SelectItem value="system">Sistem</SelectItem>
            </SelectContent>
          </Select>
          {/* <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Pengaturan
          </Button> */}
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Belum Dibaca</p>
                <p className="text-2xl font-bold">{notifications.filter((n) => !n.read).length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Perlu Tindakan</p>
                <p className="text-2xl font-bold">{notifications.filter((n) => n.actionRequired).length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selesai</p>
                <p className="text-2xl font-bold">{notifications.filter((n) => n.read).length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Notifikasi</CardTitle>
          <CardDescription>Kelola notifikasi berdasarkan kategori</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Semua ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Belum Dibaca ({notifications.filter((n) => !n.read).length})</TabsTrigger>
              <TabsTrigger value="action_required">
                Perlu Tindakan ({notifications.filter((n) => n.actionRequired).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-6">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    !notification.read ? "bg-blue-50 border-blue-200" : "bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                            {notification.title}
                          </h4>
                          <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                            {getPriorityText(notification.priority)}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700">
                              Perlu Tindakan
                            </Badge>
                          )}
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage
                                src={notification.senderAvatar || "/placeholder.svg"}
                                alt={notification.sender}
                              />
                              <AvatarFallback className="text-xs">
                                {notification.sender
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{notification.sender}</span>
                          </div>
                          <span>{formatTimestamp(notification.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada notifikasi</h3>
                  <p className="text-gray-600">Semua notifikasi telah dibaca atau tidak ada yang sesuai filter</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

```

# app\(dashboard)\profile\password\page.tsx

```tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Lock, Shield, Check, X } from "lucide-react"

export default function PasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 12.5
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5
    return Math.min(strength, 100)
  }

  const passwordStrength = getPasswordStrength(newPassword)

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-red-500"
    if (strength < 50) return "bg-orange-500"
    if (strength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 25) return "Lemah"
    if (strength < 50) return "Sedang"
    if (strength < 75) return "Kuat"
    return "Sangat Kuat"
  }

  // Password requirements
  const requirements = [
    { text: "Minimal 8 karakter", met: newPassword.length >= 8 },
    { text: "Mengandung huruf besar", met: /[A-Z]/.test(newPassword) },
    { text: "Mengandung huruf kecil", met: /[a-z]/.test(newPassword) },
    { text: "Mengandung angka", met: /[0-9]/.test(newPassword) },
    { text: "Mengandung karakter khusus", met: /[^A-Za-z0-9]/.test(newPassword) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    // Reset form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ubah Password</h1>
        <p className="text-muted-foreground">Pastikan akun Anda tetap aman dengan password yang kuat</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Ubah Password
            </CardTitle>
            <CardDescription>Masukkan password lama dan password baru Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Password Saat Ini</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">Password Baru</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password Strength */}
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Kekuatan Password:</span>
                      <span className="font-medium">{getStrengthText(passwordStrength)}</span>
                    </div>
                    <Progress value={passwordStrength} className="h-2" />
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="flex items-center gap-2 text-sm">
                    {newPassword === confirmPassword ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Password cocok</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">Password tidak cocok</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || newPassword !== confirmPassword || passwordStrength < 50}
              >
                <Shield className="mr-2 h-4 w-4" />
                {isLoading ? "Mengubah Password..." : "Ubah Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Persyaratan Password</CardTitle>
            <CardDescription>Password Anda harus memenuhi kriteria berikut</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {req.met ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-gray-400" />}
                  <span className={req.met ? "text-green-600" : "text-gray-600"}>{req.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Tips Keamanan:</strong> Gunakan password yang unik dan tidak pernah digunakan di layanan lain.
            Pertimbangkan menggunakan password manager untuk mengelola password Anda dengan aman.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

```

# app\(dashboard)\profile\settings\page.tsx

```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Camera, Save, User } from "lucide-react"

export default function ProfileSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Profil</h1>
        <p className="text-muted-foreground">Kelola informasi profil dan preferensi akun Anda</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>Perbarui informasi dasar profil Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Ubah Foto
                </Button>
                <p className="text-xs text-muted-foreground">JPG, PNG atau GIF. Maksimal 2MB.</p>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nama Depan</Label>
                <Input id="firstName" defaultValue="Ahmad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nama Belakang</Label>
                <Input id="lastName" defaultValue="Zulkarnain" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="ahmad@ziswaf.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" type="tel" defaultValue="+62 812-3456-7890" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Departemen</Label>
              <Select defaultValue="pendayagunaan">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendayagunaan">Pendayagunaan</SelectItem>
                  <SelectItem value="penghimpunan">Penghimpunan</SelectItem>
                  <SelectItem value="penyaluran">Penyaluran</SelectItem>
                  <SelectItem value="keuangan">Keuangan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Jabatan</Label>
              <Input id="position" defaultValue="Manager Knowledge Management" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Ceritakan sedikit tentang diri Anda..."
                defaultValue="Berpengalaman dalam manajemen pengetahuan dan sistem informasi organisasi."
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferensi Notifikasi</CardTitle>
            <CardDescription>Atur bagaimana Anda ingin menerima notifikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifikasi</Label>
                <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Dokumen Baru</Label>
                <p className="text-sm text-muted-foreground">Notifikasi saat ada dokumen baru ditambahkan</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Verifikasi</Label>
                <p className="text-sm text-muted-foreground">Notifikasi saat dokumen memerlukan verifikasi</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Laporan Mingguan</Label>
                <p className="text-sm text-muted-foreground">Terima ringkasan aktivitas mingguan</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Privasi</CardTitle>
            <CardDescription>Kontrol visibilitas profil dan aktivitas Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Profil Publik</Label>
                <p className="text-sm text-muted-foreground">Izinkan pengguna lain melihat profil Anda</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tampilkan Aktivitas</Label>
                <p className="text-sm text-muted-foreground">Tampilkan aktivitas terbaru di profil</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Status Online</Label>
                <p className="text-sm text-muted-foreground">Tampilkan status online kepada pengguna lain</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  )
}

```

# app\(dashboard)\programs\scholarships\loading.tsx

```tsx
export default function Loading() {
  return null
}

```

# app\(dashboard)\programs\scholarships\page.tsx

```tsx
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

```

# app\(dashboard)\programs\social-aid\page.tsx

```tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, MapPin, Calendar, DollarSign, TrendingUp } from "lucide-react"

const socialAidPrograms = [
  {
    id: 1,
    name: "Bantuan Pangan Darurat",
    description: "Program bantuan pangan untuk keluarga kurang mampu",
    category: "Pangan",
    status: "Aktif",
    budget: "Rp 500,000,000",
    recipients: 1250,
    distributed: 850,
    progress: 68,
    location: "Jakarta, Bogor, Depok",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Bantuan Kesehatan Gratis",
    description: "Layanan kesehatan gratis untuk masyarakat tidak mampu",
    category: "Kesehatan",
    status: "Aktif",
    budget: "Rp 750,000,000",
    recipients: 2000,
    distributed: 1650,
    progress: 82,
    location: "Seluruh Indonesia",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
  },
  {
    id: 3,
    name: "Bantuan Bencana Alam",
    description: "Bantuan darurat untuk korban bencana alam",
    category: "Darurat",
    status: "Selesai",
    budget: "Rp 300,000,000",
    recipients: 500,
    distributed: 500,
    progress: 100,
    location: "Sulawesi Tengah",
    startDate: "2024-03-10",
    endDate: "2024-06-10",
  },
  {
    id: 4,
    name: "Renovasi Fasilitas Umum",
    description: "Perbaikan dan renovasi fasilitas umum di daerah terpencil",
    category: "Infrastruktur",
    status: "Perencanaan",
    budget: "Rp 1,200,000,000",
    recipients: 5000,
    distributed: 0,
    progress: 15,
    location: "Papua, NTT, NTB",
    startDate: "2024-07-01",
    endDate: "2025-06-30",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aktif":
      return "bg-green-100 text-green-800"
    case "Selesai":
      return "bg-blue-100 text-blue-800"
    case "Perencanaan":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Pangan":
      return "bg-orange-100 text-orange-800"
    case "Kesehatan":
      return "bg-red-100 text-red-800"
    case "Darurat":
      return "bg-purple-100 text-purple-800"
    case "Infrastruktur":
      return "bg-indigo-100 text-indigo-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function SocialAidPage() {
  const totalBudget = socialAidPrograms.reduce((sum, program) => {
    return sum + Number.parseInt(program.budget.replace(/[^\d]/g, ""))
  }, 0)

  const totalRecipients = socialAidPrograms.reduce((sum, program) => sum + program.recipients, 0)
  const totalDistributed = socialAidPrograms.reduce((sum, program) => sum + program.distributed, 0)
  const activePrograms = socialAidPrograms.filter((p) => p.status === "Aktif").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Bantuan Sosial</h1>
          <p className="text-muted-foreground">Kelola dan pantau program bantuan sosial untuk masyarakat</p>
        </div>
        <Button>
          <Heart className="mr-2 h-4 w-4" />
          Tambah Program
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggaran</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {(totalBudget / 1000000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Dari {socialAidPrograms.length} program</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penerima</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecipients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Target penerima bantuan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sudah Disalurkan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDistributed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalDistributed / totalRecipients) * 100).toFixed(1)}% dari target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePrograms}</div>
            <p className="text-xs text-muted-foreground">Sedang berjalan</p>
          </CardContent>
        </Card>
      </div>

      {/* Programs List */}
      <div className="grid gap-6 md:grid-cols-2">
        {socialAidPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{program.name}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                  <Badge variant="outline" className={getCategoryColor(program.category)}>
                    {program.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{program.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{program.recipients.toLocaleString()} penerima</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{program.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(program.startDate).toLocaleDateString("id-ID")}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress Penyaluran</span>
                  <span className="font-medium">{program.progress}%</span>
                </div>
                <Progress value={program.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {program.distributed.toLocaleString()} dari {program.recipients.toLocaleString()} penerima
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Lihat Detail
                </Button>
                <Button size="sm" className="flex-1">
                  Kelola Program
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

```

# app\favicon.ico

This is a binary file of the type: Binary

# app\globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

# app\layout.tsx

```tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ziswaf KMS - Knowledge Management System",
  description: "Sistem Manajemen Pengetahuan untuk Ziswaf",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

```

# app\login\page.tsx

```tsx
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Eye,
  EyeOff,
  BookOpen,
  Users,
  FileText,
  Shield,
  Zap,
  TrendingUp,
  Sparkles,
  Star,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(email, password)
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Email atau password tidak valid")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Enhanced Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                    Ziswaf KMS
                  </h1>
                  <p className="text-xl text-cyan-200 font-medium">Knowledge Management System</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300 ml-2">Trusted by 500+ users</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-gray-200 leading-relaxed">
                  Platform revolusioner untuk mengelola pengetahuan ziswaf dengan teknologi AI terdepan dan interface
                  yang memukau.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center space-x-2 text-cyan-300">
                    <Shield className="w-4 h-4" />
                    <span>Enterprise Security</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <Zap className="w-4 h-4" />
                    <span>Lightning Fast</span>
                  </div>
                  <div className="flex items-center space-x-2 text-pink-300">
                    <TrendingUp className="w-4 h-4" />
                    <span>Advanced Analytics</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="group p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-xl mb-3">Smart Document Management</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Kelola dokumen dengan AI-powered search, auto-categorization, dan version control yang canggih
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-xl mb-3">Collaborative Workspace</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Fasilitasi kolaborasi real-time antar departemen dengan tools komunikasi terintegrasi
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-xl mb-3">Advanced Analytics</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Dashboard analytics mendalam untuk tracking performance dan insights bisnis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Login Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
              <CardHeader className="space-y-4 text-center pb-8">
                <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:hidden shadow-2xl">
                  <BookOpen className="w-12 h-12 text-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Selamat Datang Kembali
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    Masuk ke akun Anda untuk mengakses sistem knowledge management terdepan
                  </CardDescription>
                </div>
              </CardHeader>

              <form onSubmit={handleLogin}>
                <CardContent className="space-y-6">
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-700">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@perusahaan.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password Anda"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 via-cyan-50 to-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <p className="font-semibold text-emerald-800 mb-3 text-sm flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />🚀 Demo Credentials:
                    </p>
                    <div className="space-y-2 text-sm text-emerald-700">
                      <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <span className="font-medium">Admin:</span>
                        <span className="text-xs">admin@ziswaf.com / admin123</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <span className="font-medium">User:</span>
                        <span className="text-xs">user@ziswaf.com / user123</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-6">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 hover:from-emerald-700 hover:via-cyan-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Memproses...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Masuk ke Dashboard</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    Belum memiliki akun?{" "}
                    <Link
                      href="/register"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                    >
                      Daftar sekarang
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  )
}

```

# app\page.tsx

```tsx
import { redirect } from "next/navigation"

export default function HomePage() {
  // Automatically redirect users from the root URL to the login page.
  redirect("/login")
}
```

# app\register\page.tsx

```tsx
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, BookOpen, CheckCircle, Users, Shield, Zap, Star, Sparkles, Crown, Gift } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const departments = ["Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing", "Operasional"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok")
      setIsLoading(false)
      return
    }

    // Simulate registration process
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
            <CardContent className="pt-8 text-center space-y-6">
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Pendaftaran Berhasil!
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  🎉 Selamat! Akun Anda telah berhasil dibuat. Tim admin akan segera memverifikasi akun Anda dan
                  mengirimkan konfirmasi melalui email.
                </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 via-cyan-50 to-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <div className="flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5 text-emerald-600 mr-2" />
                  <p className="text-sm font-semibold text-emerald-700">Langkah Selanjutnya:</p>
                </div>
                <p className="text-sm text-emerald-700">
                  📧 Periksa email Anda untuk instruksi aktivasi akun dan panduan memulai
                </p>
              </div>
              <Button
                asChild
                className="w-full h-14 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 hover:from-emerald-700 hover:via-cyan-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-base"
              >
                <Link href="/login">
                  <div className="flex items-center space-x-2">
                    <span>Kembali ke Halaman Login</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Enhanced Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                    Bergabung dengan Ziswaf KMS
                  </h1>
                  <p className="text-xl text-cyan-200 font-medium">Mulai perjalanan knowledge sharing Anda</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                <h3 className="font-bold text-white text-2xl mb-6 flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 mr-3 fill-current" />
                  Keuntungan Bergabung
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200">Akses unlimited ke seluruh knowledge base perusahaan</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200">Kolaborasi real-time dengan tim lintas departemen</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200">Dashboard analytics untuk tracking performance</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200">AI-powered search dan smart recommendations</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200">Mobile app untuk akses knowledge on-the-go</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                  <Users className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="text-sm text-gray-300">Active Users</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                  <Shield className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">99.9%</p>
                  <p className="text-sm text-gray-300">Uptime</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                  <Zap className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-sm text-gray-300">Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Register Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
              <CardHeader className="space-y-4 text-center pb-6">
                <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:hidden shadow-2xl">
                  <BookOpen className="w-12 h-12 text-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Buat Akun Baru
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    Lengkapi informasi di bawah untuk bergabung dengan tim terbaik
                  </CardDescription>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5">
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-700">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@perusahaan.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-semibold text-gray-700">
                      Departemen
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleInputChange("department", value)}
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue placeholder="Pilih departemen Anda" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 8 karakter"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                        className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                      Konfirmasi Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ulangi password Anda"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                        className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-4">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 hover:from-emerald-700 hover:via-cyan-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Memproses...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Daftar Sekarang</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    Sudah memiliki akun?{" "}
                    <Link
                      href="/login"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                    >
                      Masuk di sini
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  )
}

```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# components\admin-route-guard.tsx

```tsx
"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"

interface AdminRouteGuardProps {
  children: React.ReactNode
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { user, userRole, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || userRole !== "admin")) {
      // Redirect non-admin users to dashboard
      router.push("/dashboard")
    }
  }, [user, userRole, loading, router])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  // Show access denied for non-admin users
  if (!user || userRole !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Akses Ditolak</h2>
            <p className="text-gray-600 mb-6">
              Halaman ini hanya dapat diakses oleh administrator. Silakan hubungi admin jika Anda memerlukan akses.
            </p>
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render admin content
  return <>{children}</>
}

```

# components\app-sidebar.tsx

```tsx
"use client"

import type * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Shield,
  Users,
  CheckCircle,
  GalleryVerticalEnd, 
} from "lucide-react"

import { useAuth } from "@/hooks/use-auth"
import { NavMain } from "@/components/nav-main"
// NavProjects is no longer needed
// import { NavProjects } from "@/components/nav-projects" 
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

// ... (NavAdmin component remains the same) ...
function NavAdmin({ items }: { items: { name: string, url: string, icon: React.ElementType }[] }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center">
        <Shield className="mr-2 h-4 w-4" />
        Admin Panel
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}


const data = {
  teams: [
    {
      name: "KMS Ziswaf",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  // UPDATED: All main navigation items are now in this single array
  navMain: [
    // { 
    //   title: "Dashboard",
    //   url: "/dashboard", 
    //   icon: SquareTerminal, 
    // },
    {
      title: "Dokumen",
      url: "/documents",
      icon: Bot,
      items: [
        { title: "Semua Dokumen", url: "/documents" },
        { title: "Dokumen Terbaru", url: "/documents/recent" },
      ],
    },
    {
      title: "Departemen",
      url: "/departments",
      icon: BookOpen,
      items: [
        { title: "Pendayagunaan", url: "/departments/pendayagunaan" },
        { title: "Penghimpunan", url: "/departments/penghimpunan" },
        { title: "Penyaluran", url: "/departments/penyaluran" },
        { title: "Keuangan", url: "/departments/keuangan" },
      ],
    },
    {
      title: "Program",
      url: "/programs",
      icon: Settings2,
      items: [
        { title: "Beasiswa", url: "/programs/scholarships" },
        { title: "Bantuan Sosial", url: "/programs/social-aid" },
      ],
    },
    // { title: "Aktivitas", url: "/activities", icon: Frame },
    { title: "Permintaan Pengetahuan", url: "/knowledge-requests", icon: PieChart },
    { title: "Notifikasi", url: "/notifications", icon: Map },
  ],
  adminNav: [
    {
      name: "Manajemen Pengguna",
      url: "/admin/users",
      icon: Users,
    },
    {
      name: "Verifikasi Dokumen",
      url: "/admin/verification",
      icon: CheckCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userRole } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* The single NavMain component now renders everything */}
        <NavMain items={data.navMain} />
        
        {/* The NavProjects component is now removed */}
        
        {userRole === 'admin' && <NavAdmin items={data.adminNav} />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
```

# components\breadcrumb-nav.tsx

```tsx
"use client"

import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const pathLabels: Record<string, string> = {
  dashboard: "Dashboard",
  documents: "Dokumen",
  departments: "Departemen",
  programs: "Program",
  activities: "Aktivitas",
  notifications: "Notifikasi",
  admin: "Admin",
  users: "Manajemen User",
  verification: "Verifikasi Dokumen",
  "data-input": "Input Data",
  recent: "Dokumen Terbaru",
  mandatory: "Dokumen Wajib",
  favorites: "Favorit",
  search: "Pencarian",
  add: "Tambah Dokumen",
  scholarships: "Beasiswa",
  "social-aid": "Bantuan Sosial",
  "knowledge-requests": "Permintaan Pengetahuan",
  pendayagunaan: "Pendayagunaan",
  penghimpunan: "Penghimpunan",
  penyaluran: "Penyaluran",
  keuangan: "Keuangan",
  profile: "Profil",
  settings: "Pengaturan",
  password: "Ubah Password",
  preferences: "Preferensi",
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  if (pathSegments.length === 0 || pathSegments[0] === "dashboard") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/")
          const label = pathLabels[segment] || segment
          const isLast = index === pathSegments.length - 1

          return (
            <div key={segment} className="flex items-center gap-1">
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

```

# components\dashboard-header.tsx

```tsx
"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { UserNav } from "@/components/user-nav" // <-- Import UserNav

export function DashboardHeader({ showBreadcrumb = true }: { showBreadcrumb?: boolean }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        
        {/* Conditionally render the separator and breadcrumb */}
        {showBreadcrumb && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </>
        )}

      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  )
}
```

# components\document-filters.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List, Heart, Star, RotateCcw } from "lucide-react"

// Define the shape of the filter values
export interface DocumentFilterValues {
  searchQuery: string;
  category: string;
  department: string;
  // priority: string;
  time: string;
  showFavoritesOnly: boolean;
  showMandatoryOnly: boolean;
}

// Define the props for our new component
interface DocumentFiltersProps {
  onFilterChange: (filters: DocumentFilterValues) => void;
  onViewChange: (view: 'grid' | 'list') => void;
  visibleFilters?: ('category' | 'department' | 'priority' | 'time' | 'favorites' | 'mandatory')[];
  resultCount: number;
}

// Lists of options for the dropdowns
const categories = ["Semua", "Panduan", "Template", "SOP", "Laporan", "Strategi", "Checklist"];
const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "SDM", "IT", "Keuangan", "Marketing", "Audit"];
// const priorities = ["Semua", "high", "medium", "low"];
// const timeFilters = ["Semua", "today", "week", "month"];

const initialFilters: DocumentFilterValues = {
  searchQuery: "",
  category: "Semua",
  department: "Semua",
  // priority: "Semua",
  time: "Semua",
  showFavoritesOnly: false,
  showMandatoryOnly: false,
};

export function DocumentFilters({ onFilterChange, onViewChange, visibleFilters = ['category', 'department', 'priority', 'favorites', 'mandatory'], resultCount }: DocumentFiltersProps) {
  const [filters, setFilters] = useState<DocumentFilterValues>(initialFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFilterChange = (key: keyof DocumentFilterValues, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleViewChange = (view: 'grid' | 'list') => {
      setViewMode(view);
      onViewChange(view);
  }

  const handleReset = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  }

  const isFilterVisible = (filterName: string) => visibleFilters.includes(filterName as any);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filter & Pencarian</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Filter
            </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Cari dokumen..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <div className="flex flex-col gap-4">
          {/* --- START OF FIX --- */}
          {/* This div contains the dropdowns and will be rendered conditionally */}
          <div className="flex flex-wrap gap-4">
            {isFilterVisible('category') && (
                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-full sm:w-auto flex-1"><SelectValue placeholder="Kategori" /></SelectTrigger>
                <SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                </Select>
            )}
            {isFilterVisible('department') && (
                <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
                <SelectTrigger className="w-full sm:w-auto flex-1"><SelectValue placeholder="Departemen" /></SelectTrigger>
                <SelectContent>{departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent>
                </Select>
            )}
            {/* {isFilterVisible('priority') && (
                <Select value={filters.priority} onValueChange={(value) => handleFilterChange('priority', value)}>
                <SelectTrigger className="w-full sm:w-auto flex-1"><SelectValue placeholder="Prioritas" /></SelectTrigger>
                <SelectContent>{priorities.map(p => <SelectItem key={p} value={p}>{p === "Semua" ? "Semua" : p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}</SelectContent>
                </Select>
            )} */}
            {isFilterVisible('time') && (
                <Select value={filters.time} onValueChange={(value) => handleFilterChange('time', value)}>
                <SelectTrigger className="w-full sm:w-auto flex-1"><SelectValue placeholder="Waktu" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Semua Waktu</SelectItem>
                  <SelectItem value="today">Hari Ini</SelectItem>
                  <SelectItem value="week">Minggu Ini</SelectItem>
                  <SelectItem value="month">Bulan Ini</SelectItem>
                </SelectContent>
                </Select>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isFilterVisible('favorites') && (
                <Button variant={filters.showFavoritesOnly ? "secondary" : "outline"} size="sm" onClick={() => handleFilterChange('showFavoritesOnly', !filters.showFavoritesOnly)}>
                  <Heart className={`w-4 h-4 mr-2 ${filters.showFavoritesOnly ? 'text-red-500 fill-current' : ''}`} />
                  Favorit
                </Button>
              )}
              {isFilterVisible('mandatory') && (
                <Button variant={filters.showMandatoryOnly ? "secondary" : "outline"} size="sm" onClick={() => handleFilterChange('showMandatoryOnly', !filters.showMandatoryOnly)}>
                  <Star className={`w-4 h-4 mr-2 ${filters.showMandatoryOnly ? 'text-yellow-500 fill-current' : ''}`} />
                  Wajib Saja
                </Button>
              )}
              <Badge variant="outline">{resultCount} dokumen</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => handleViewChange('grid')}><Grid className="w-4 h-4" /></Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => handleViewChange('list')}><List className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

# components\document-request-detail.tsx

```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  FileText,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Upload,
  Download,
  Eye,
  Edit,
  Send,
} from "lucide-react"

interface DocumentRequestDetailProps {
  request: {
    id: number
    title: string
    description: string
    requestedBy: string
    assignedTo: string
    priority: string
    dueDate: string
    status: string
    dataRequirements: string[]
    deliverables: string[]
    createdAt: string
  }
}

export default function DocumentRequestDetail({ request }: DocumentRequestDetailProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateNote, setUpdateNote] = useState("")
  const [progress, setProgress] = useState(65)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
      case "urgent":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in_progress":
        return "secondary"
      default:
        return "outline"
    }
  }

  const handleStatusUpdate = () => {
    // Handle status update logic
    console.log("Status update:", updateNote)
    setIsUpdating(false)
    setUpdateNote("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{request.title}</h2>
          <p className="text-gray-600 mt-1">{request.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={getPriorityColor(request.priority)}>
            {request.priority === "high"
              ? "Tinggi"
              : request.priority === "medium"
                ? "Sedang"
                : request.priority === "urgent"
                  ? "Mendesak"
                  : "Rendah"}
          </Badge>
          <Badge variant={getStatusColor(request.status)}>
            {request.status === "completed" ? "Selesai" : request.status === "in_progress" ? "In Progress" : "Pending"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Data Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Spesifikasi Data yang Dibutuhkan</span>
              </CardTitle>
              <CardDescription>Detail data dan informasi yang harus disertakan dalam dokumen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {request.dataRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{requirement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Output/Deliverables yang Diharapkan</span>
              </CardTitle>
              <CardDescription>Format dan jenis output yang harus diserahkan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {request.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{deliverable}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Progress Updates</span>
                </div>
                <Dialog open={isUpdating} onOpenChange={setIsUpdating}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Update Progress
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Progress</DialogTitle>
                      <DialogDescription>Berikan update terkini tentang progress pengerjaan dokumen</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="progress">Progress (%)</Label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="range"
                            id="progress"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(Number.parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-12">{progress}%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="updateNote">Catatan Update</Label>
                        <Textarea
                          id="updateNote"
                          placeholder="Jelaskan progress yang telah dicapai, kendala yang dihadapi, atau informasi penting lainnya..."
                          value={updateNote}
                          onChange={(e) => setUpdateNote(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsUpdating(false)}>
                        Batal
                      </Button>
                      <Button onClick={handleStatusUpdate}>Kirim Update</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress Keseluruhan</span>
                  <span className="text-sm text-gray-600">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />

                {/* Sample progress updates */}
                <div className="space-y-4 mt-6">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Data collection completed</span>
                      <span className="text-xs text-gray-500">2 hari lalu</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Berhasil mengumpulkan data dari 150 penerima beasiswa. Sedang dalam proses analisis dan
                      visualisasi.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Dashboard prototype ready</span>
                      <span className="text-xs text-gray-500">1 hari lalu</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Prototype dashboard interaktif sudah siap untuk review. Menunggu feedback sebelum finalisasi.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Request Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Requested by</p>
                  <p className="text-sm text-gray-600">{request.requestedBy}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Assigned to</p>
                  <p className="text-sm text-gray-600">{request.assignedTo}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-gray-600">{new Date(request.createdAt).toLocaleDateString("id-ID")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm text-gray-600">{new Date(request.dueDate).toLocaleDateString("id-ID")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Dokumen
              </Button>
              <Button variant="outline" className="w-full">
                <Edit className="w-4 h-4 mr-2" />
                Edit Request
              </Button>
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>

          {/* Status Alert */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-900">Deadline Alert</p>
                  <p className="text-sm text-orange-700">
                    Deadline dalam{" "}
                    {Math.ceil((new Date(request.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                    hari
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

```

# components\document-viewer.tsx

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  ExternalLink,
  Share2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Copy,
  Link,
  FileImage,
  FileSpreadsheet,
  Presentation,
  Globe,
} from "lucide-react"

interface DocumentViewerProps {
  document: {
    id: string
    title: string
    file_url?: string
    external_url?: string
    preview_url?: string
    file_type: string
    document_type: "file" | "link"
    platform?: string
    description?: string
    author: string
    department: string
    created_at: string
  }
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [showShareDialog, setShowShareDialog] = useState(false)

  const getPlatformIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case "google-docs":
        return <FileText className="w-4 h-4 text-blue-600" />
      case "google-sheets":
        return <FileSpreadsheet className="w-4 h-4 text-green-600" />
      case "google-slides":
        return <Presentation className="w-4 h-4 text-orange-600" />
      case "canva":
        return <FileImage className="w-4 h-4 text-purple-600" />
      case "figma":
        return <FileImage className="w-4 h-4 text-pink-600" />
      case "notion":
        return <FileText className="w-4 h-4 text-gray-800" />
      default:
        return <Globe className="w-4 h-4 text-gray-600" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case "google-docs":
        return "bg-blue-100 text-blue-700"
      case "google-sheets":
        return "bg-green-100 text-green-700"
      case "google-slides":
        return "bg-orange-100 text-orange-700"
      case "canva":
        return "bg-purple-100 text-purple-700"
      case "figma":
        return "bg-pink-100 text-pink-700"
      case "notion":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleShare = async () => {
    const shareUrl = document.document_type === "link" ? document.external_url : document.file_url
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: document.title,
          text: document.description,
          url: shareUrl,
        })
      } catch (error) {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(shareUrl)
      }
    } else if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
    }
  }

  const openInNewTab = () => {
    const url = document.document_type === "link" ? document.external_url : document.file_url
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const renderViewer = () => {
    if (document.document_type === "link") {
      return (
        <div className="aspect-[4/3] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-4">
            {getPlatformIcon(document.platform || "")}
            <div>
              <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{document.description}</p>
              {document.platform && (
                <Badge className={`mt-2 ${getPlatformColor(document.platform)}`}>
                  {document.platform.replace("-", " ").toUpperCase()}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={openInNewTab}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Buka Dokumen
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </div>
        </div>
      )
    }

    // File-based document viewer
    if (document.file_type.toUpperCase() === "PDF" && document.preview_url) {
      return (
        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border">
          <iframe
            src={document.preview_url}
            className="w-full h-full border-0"
            allow="autoplay"
            title={document.title}
          />
        </div>
      )
    }

    if (["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(document.file_type.toUpperCase())) {
      return (
        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={document.file_url || "/placeholder.svg"}
            alt={document.title}
            className="max-w-full max-h-full object-contain"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: "transform 0.2s ease",
            }}
          />
        </div>
      )
    }

    // Default viewer for other file types
    return (
      <div className="aspect-[4/3] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4">
          <FileText className="w-16 h-16 text-gray-400 mx-auto" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">Preview Tidak Tersedia</h3>
            <p className="text-sm text-gray-600 mt-1">
              File {document.file_type} tidak dapat ditampilkan dalam browser
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={openInNewTab}>
              <Download className="w-4 h-4 mr-2" />
              Download File
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan Link
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Viewer Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            {document.document_type === "link" ? <Link className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
            <span>{document.document_type === "link" ? "Link" : document.file_type}</span>
          </Badge>
          {document.platform && (
            <Badge className={getPlatformColor(document.platform)}>
              {document.platform.replace("-", " ").toUpperCase()}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {document.document_type === "file" &&
            ["PDF", "JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(document.file_type.toUpperCase()) && (
              <>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 min-w-[50px] text-center">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="outline" size="sm" onClick={() => setRotation((rotation + 90) % 360)}>
                  <RotateCw className="w-4 h-4" />
                </Button>
              </>
            )}

          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl h-[90vh]">
              <DialogHeader>
                <DialogTitle>{document.title}</DialogTitle>
                <DialogDescription>
                  {document.author} • {document.department} •{" "}
                  {new Date(document.created_at).toLocaleDateString("id-ID")}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-hidden">{renderViewer()}</div>
            </DialogContent>
          </Dialog>

          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bagikan Dokumen</DialogTitle>
                <DialogDescription>Pilih cara untuk membagikan dokumen ini</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{document.title}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {document.document_type === "link" ? document.external_url : document.file_url}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const url = document.document_type === "link" ? document.external_url : document.file_url
                        if (url) navigator.clipboard.writeText(url)
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleShare} className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan Link
                  </Button>
                  <Button variant="outline" onClick={openInNewTab} className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buka di Tab Baru
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Viewer */}
      {renderViewer()}
    </div>
  )
}

```

# components\nav-main.tsx

```tsx
"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // If an item has a sub-menu, render it as a Collapsible
          if (item.items && item.items.length > 0) {
            return (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }

          // Otherwise, render a simple link
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton href={item.url} asChild>
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
```

# components\nav-projects.tsx

```tsx
"use client"

import { Folder, Forward, MoreHorizontal, Trash2, type LucideIcon } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications" // <-- Use our hook
import { Badge } from "@/components/ui/badge" // <-- Import Badge
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()
  const { unreadCount } = useNotifications() // <-- Get the unread count

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <item.icon />
                  <span>{item.name}</span>
                </div>
                {/* Conditionally render the badge for the "Notifikasi" item */}
                {item.name === "Notifikasi" && unreadCount > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {unreadCount}
                    </Badge>
                )}
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
```

# components\nav-user.tsx

```tsx
"use client"

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles, User, Lock, Settings } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Pengaturan Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Lock />
                Ubah Password
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Preferensi
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

```

# components\quick-data-input.tsx

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp, Target, FileText, Users, DollarSign, Activity } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const ziswafAreas = ["Pendidikan", "Kesehatan", "Ekonomi", "Sosial", "Dakwah"]
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

export function QuickDataInput() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("ziswaf")

  // Ziswaf Data State
  const [ziswafData, setZiswafData] = useState({
    area: "",
    targetAmount: "",
    realizedAmount: "",
    month: "",
    year: new Date().getFullYear().toString(),
  })

  // Dashboard Metrics State
  const [metricsData, setMetricsData] = useState({
    totalDocuments: "",
    totalUsers: "",
    totalActivities: "",
    monthlyTarget: "",
    monthlyRealized: "",
  })

  // Activity Data State
  const [activityData, setActivityData] = useState({
    name: "",
    description: "",
    status: "planning",
    participants: "",
    budget: "",
    targetBeneficiaries: "",
  })

  const handleZiswafSubmit = () => {
    if (!ziswafData.area || !ziswafData.targetAmount || !ziswafData.realizedAmount || !ziswafData.month) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      })
      return
    }

    // Here you would typically save to database
    console.log("Saving Ziswaf data:", ziswafData)

    toast({
      title: "Berhasil",
      description: "Data laporan ziswaf berhasil disimpan",
    })

    // Reset form
    setZiswafData({
      area: "",
      targetAmount: "",
      realizedAmount: "",
      month: "",
      year: new Date().getFullYear().toString(),
    })
  }

  const handleMetricsSubmit = () => {
    if (!metricsData.totalDocuments || !metricsData.totalUsers) {
      toast({
        title: "Error",
        description: "Mohon lengkapi data yang diperlukan",
        variant: "destructive",
      })
      return
    }

    console.log("Saving Metrics data:", metricsData)

    toast({
      title: "Berhasil",
      description: "Data dashboard berhasil diperbarui",
    })

    setMetricsData({
      totalDocuments: "",
      totalUsers: "",
      totalActivities: "",
      monthlyTarget: "",
      monthlyRealized: "",
    })
  }

  const handleActivitySubmit = () => {
    if (!activityData.name || !activityData.description) {
      toast({
        title: "Error",
        description: "Nama dan deskripsi aktivitas harus diisi",
        variant: "destructive",
      })
      return
    }

    console.log("Saving Activity data:", activityData)

    toast({
      title: "Berhasil",
      description: "Aktivitas baru berhasil ditambahkan",
    })

    setActivityData({
      name: "",
      description: "",
      status: "planning",
      participants: "",
      budget: "",
      targetBeneficiaries: "",
    })
  }

  const formatCurrency = (value: string) => {
    if (!value) return ""
    const number = Number.parseInt(value.replace(/\D/g, ""))
    return new Intl.NumberFormat("id-ID").format(number)
  }

  const handleCurrencyChange = (value: string, field: string, setState: any, state: any) => {
    const numericValue = value.replace(/\D/g, "")
    setState({ ...state, [field]: numericValue })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Input Data Cepat</span>
          </DialogTitle>
          <DialogDescription>Tambahkan data untuk dashboard dan laporan sistem dengan cepat</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ziswaf" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Ziswaf</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Metrik</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Aktivitas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ziswaf" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Laporan Pendayagunaan Ziswaf</CardTitle>
                <CardDescription>Input data realisasi pendayagunaan per area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ziswaf-area">Area Pendayagunaan</Label>
                    <Select
                      value={ziswafData.area}
                      onValueChange={(value) => setZiswafData({ ...ziswafData, area: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih area" />
                      </SelectTrigger>
                      <SelectContent>
                        {ziswafAreas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ziswaf-month">Bulan</Label>
                    <Select
                      value={ziswafData.month}
                      onValueChange={(value) => setZiswafData({ ...ziswafData, month: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih bulan" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => (
                          <SelectItem key={month} value={(index + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target-amount">Target (Rp)</Label>
                    <Input
                      id="target-amount"
                      placeholder="0"
                      value={formatCurrency(ziswafData.targetAmount)}
                      onChange={(e) => handleCurrencyChange(e.target.value, "targetAmount", setZiswafData, ziswafData)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="realized-amount">Realisasi (Rp)</Label>
                    <Input
                      id="realized-amount"
                      placeholder="0"
                      value={formatCurrency(ziswafData.realizedAmount)}
                      onChange={(e) =>
                        handleCurrencyChange(e.target.value, "realizedAmount", setZiswafData, ziswafData)
                      }
                    />
                  </div>
                </div>

                {ziswafData.targetAmount && ziswafData.realizedAmount && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pencapaian:</span>
                      <Badge
                        variant={
                          (Number.parseInt(ziswafData.realizedAmount) / Number.parseInt(ziswafData.targetAmount)) *
                            100 >=
                          90
                            ? "default"
                            : (Number.parseInt(ziswafData.realizedAmount) / Number.parseInt(ziswafData.targetAmount)) *
                                  100 >=
                                70
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {Math.round(
                          (Number.parseInt(ziswafData.realizedAmount) / Number.parseInt(ziswafData.targetAmount)) * 100,
                        )}
                        %
                      </Badge>
                    </div>
                  </div>
                )}

                <Button onClick={handleZiswafSubmit} className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Simpan Data Ziswaf
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metrik Dashboard</CardTitle>
                <CardDescription>Update data statistik untuk dashboard utama</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total-docs">Total Dokumen</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="total-docs"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={metricsData.totalDocuments}
                        onChange={(e) => setMetricsData({ ...metricsData, totalDocuments: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total-users">Total Pengguna</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="total-users"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={metricsData.totalUsers}
                        onChange={(e) => setMetricsData({ ...metricsData, totalUsers: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-activities">Total Aktivitas</Label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="total-activities"
                      type="number"
                      placeholder="0"
                      className="pl-10"
                      value={metricsData.totalActivities}
                      onChange={(e) => setMetricsData({ ...metricsData, totalActivities: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly-target">Target Bulan Ini (Rp)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="monthly-target"
                        placeholder="0"
                        className="pl-10"
                        value={formatCurrency(metricsData.monthlyTarget)}
                        onChange={(e) =>
                          handleCurrencyChange(e.target.value, "monthlyTarget", setMetricsData, metricsData)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthly-realized">Realisasi Bulan Ini (Rp)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="monthly-realized"
                        placeholder="0"
                        className="pl-10"
                        value={formatCurrency(metricsData.monthlyRealized)}
                        onChange={(e) =>
                          handleCurrencyChange(e.target.value, "monthlyRealized", setMetricsData, metricsData)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleMetricsSubmit} className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Update Metrik Dashboard
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Aktivitas Baru</CardTitle>
                <CardDescription>Tambah aktivitas kolaborasi antar departemen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activity-name">Nama Aktivitas</Label>
                  <Input
                    id="activity-name"
                    placeholder="Masukkan nama aktivitas"
                    value={activityData.name}
                    onChange={(e) => setActivityData({ ...activityData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-desc">Deskripsi</Label>
                  <Input
                    id="activity-desc"
                    placeholder="Deskripsi singkat aktivitas"
                    value={activityData.description}
                    onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-status">Status</Label>
                    <Select
                      value={activityData.status}
                      onValueChange={(value) => setActivityData({ ...activityData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Perencanaan</SelectItem>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-participants">Partisipan</Label>
                    <Input
                      id="activity-participants"
                      type="number"
                      placeholder="0"
                      value={activityData.participants}
                      onChange={(e) => setActivityData({ ...activityData, participants: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-budget">Budget (Rp)</Label>
                    <Input
                      id="activity-budget"
                      placeholder="0"
                      value={formatCurrency(activityData.budget)}
                      onChange={(e) => handleCurrencyChange(e.target.value, "budget", setActivityData, activityData)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-beneficiaries">Target Penerima Manfaat</Label>
                    <Input
                      id="target-beneficiaries"
                      type="number"
                      placeholder="0"
                      value={activityData.targetBeneficiaries}
                      onChange={(e) => setActivityData({ ...activityData, targetBeneficiaries: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleActivitySubmit} className="w-full">
                  <Activity className="h-4 w-4 mr-2" />
                  Tambah Aktivitas
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

```

# components\team-switcher.tsx

```tsx
"use client"

import * as React from "react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  // If there are no teams, render nothing.
  if (!teams || teams.length === 0) {
    return null
  }

  // Use the first team as the display.
  const activeTeam = teams[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* This is no longer a dropdown trigger, just a static button-like element */}
        <SidebarMenuButton size="lg" className="cursor-default hover:bg-transparent">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <activeTeam.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
```

# components\ui\alert.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

```

# components\ui\avatar.tsx

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

```

# components\ui\badge.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

# components\ui\breadcrumb.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```

# components\ui\button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

# components\ui\card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

# components\ui\checkbox.tsx

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

```

# components\ui\collapsible.tsx

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

# components\ui\dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

# components\ui\dropdown-menu.tsx

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```

# components\ui\input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

# components\ui\label.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

# components\ui\progress.tsx

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

```

# components\ui\radio-group.tsx

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

```

# components\ui\scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

```

# components\ui\select.tsx

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

# components\ui\separator.tsx

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

```

# components\ui\sheet.tsx

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

# components\ui\sidebar.tsx

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

# components\ui\skeleton.tsx

```tsx
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

# components\ui\slider.tsx

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }

```

# components\ui\switch.tsx

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

```

# components\ui\table.tsx

```tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

# components\ui\tabs.tsx

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

# components\ui\textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

# components\ui\tooltip.tsx

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

# components\user-nav.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth" // Import the useAuth hook

interface UserType {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  department: string
  avatar_url?: string
}

export function UserNav() {
  // Use the useAuth hook to get user and logout function
  const { user, logout } = useAuth()

  if (!user) {
    // Show a loading skeleton or nothing if the user isn't loaded yet
    return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.department} • {user.role === "admin" ? "Admin" : "User"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Only the Logout button remains */}
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

# components\user-tag-dialog.tsx

```tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, AtSign, Search, Plus, X } from "lucide-react"

// Mock users for tagging
const users = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad.fauzi@ziswaf.com", department: "Pendayagunaan" },
  { id: 2, name: "Siti Nurhaliza", email: "siti.nurhaliza@ziswaf.com", department: "Pendayagunaan" },
  { id: 3, name: "Budi Santoso", email: "budi.santoso@ziswaf.com", department: "IT" },
  { id: 4, name: "Maya Sari", email: "maya.sari@ziswaf.com", department: "Keuangan" },
  { id: 5, name: "Andi Rahman", email: "andi.rahman@ziswaf.com", department: "SDM" },
  { id: 6, name: "Dewi Sartika", email: "dewi.sartika@ziswaf.com", department: "Marketing" },
  { id: 7, name: "Rizki Pratama", email: "rizki.pratama@ziswaf.com", department: "Operasional" },
  { id: 8, name: "Fatimah Zahra", email: "fatimah.zahra@ziswaf.com", department: "Audit" },
]

interface UserTagDialogProps {
  taggedUsers: typeof users
  onUserTag: (user: (typeof users)[0]) => void
  onUserUntag: (userId: number) => void
  trigger?: React.ReactNode
}

export function UserTagDialog({ taggedUsers, onUserTag, onUserUntag, trigger }: UserTagDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const isUserTagged = (userId: number) => taggedUsers.some((user) => user.id === userId)

  const handleUserToggle = (user: (typeof users)[0]) => {
    if (isUserTagged(user.id)) {
      onUserUntag(user.id)
    } else {
      onUserTag(user)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <AtSign className="w-4 h-4 mr-2" />
            Tag Pengguna
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tag Pengguna untuk Request Dokumen</DialogTitle>
          <DialogDescription>
            Pilih pengguna yang perlu diberitahu tentang dokumen ini. Mereka akan menerima notifikasi.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari pengguna berdasarkan nama, email, atau departemen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tagged Users Summary */}
          {taggedUsers.length > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">Pengguna yang Di-tag ({taggedUsers.length}):</p>
              <div className="flex flex-wrap gap-1">
                {taggedUsers.map((user) => (
                  <Badge key={user.id} variant="secondary" className="text-xs">
                    <AtSign className="w-3 h-3 mr-1" />
                    {user.name}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => onUserUntag(user.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Users List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                  isUserTagged(user.id) ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">{user.department}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant={isUserTagged(user.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleUserToggle(user)}
                >
                  {isUserTagged(user.id) ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Untag
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Tag
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada pengguna ditemukan</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={() => setOpen(false)}>Selesai ({taggedUsers.length} pengguna di-tag)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

```

# eslint.config.mjs

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

# hooks\use-auth.tsx

```tsx
"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
  department?: string
}

interface AuthContextType {
  user: User | null
  userRole: "admin" | "user" | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    const storedRole = localStorage.getItem("userRole")

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser))
      setUserRole(storedRole as "admin" | "user")
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login logic - replace with actual API call
    if (email === "admin@ziswaf.com" && password === "admin123") {
      const adminUser = {
        id: "admin-1",
        name: "Admin System",
        email: "admin@ziswaf.com",
        avatar_url: "/placeholder.svg?height=32&width=32",
        department: "IT",
      }
      setUser(adminUser)
      setUserRole("admin")
      localStorage.setItem("user", JSON.stringify(adminUser))
      localStorage.setItem("userRole", "admin")
    } else if (email === "user@ziswaf.com" && password === "user123") {
      const regularUser = {
        id: "user-1",
        name: "Ahmad Fauzi",
        email: "user@ziswaf.com",
        avatar_url: "/placeholder.svg?height=32&width=32",
        department: "Pendayagunaan",
      }
      setUser(regularUser)
      setUserRole("user")
      localStorage.setItem("user", JSON.stringify(regularUser))
      localStorage.setItem("userRole", "user")
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    setUser(null)
    setUserRole(null)
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    window.location.href = "/login"
  }

  return <AuthContext.Provider value={{ user, userRole, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

```

# hooks\use-mobile.ts

```ts
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

# hooks\use-notifications.tsx

```tsx
"use client"

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Define the shape of a single notification
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "document" | "user" | "system" | "activity";
  time: string;
  read: boolean;
}

// Define the shape of the context's value
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  markAllAsRead: () => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// The initial mock data (moved from the dropdown component)
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Dokumen Baru",
    message: "Dokumen 'Laporan Keuangan Q4' telah ditambahkan",
    type: "document",
    time: "2 menit yang lalu",
    read: false,
  },
  {
    id: "2",
    title: "User Baru",
    message: "Ahmad Zulkarnain telah bergabung sebagai admin",
    type: "user",
    time: "1 jam yang lalu",
    read: false,
  },
  {
    id: "3",
    title: "Sistem Update",
    message: "Sistem akan maintenance pada 23:00 WIB",
    type: "system",
    time: "3 jam yang lalu",
    read: true,
  },
  {
    id: "4",
    title: "Aktivitas Baru",
    message: "Rapat koordinasi departemen telah dijadwalkan",
    type: "activity",
    time: "5 jam yang lalu",
    read: false,
  },
];

// Create the Provider component
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    markAllAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Create the custom hook for easy access
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
```

# lib\supabase.ts

```ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface User {
  id: string
  email: string
  name: string
  department: string
  role: "admin" | "user"
  status: "active" | "pending" | "inactive"
  avatar_url?: string
  created_at: string
  updated_at: string
  last_login?: string
}

export interface Document {
  id: string
  title: string
  description?: string
  file_url?: string
  external_url?: string
  document_type: "file" | "link"
  platform?: string
  file_type: string
  file_size?: number
  category: string
  department: string
  tags: string[]
  uploaded_by: string
  is_mandatory: boolean
  is_starred: boolean // Admin-controlled mandatory reading
  verification_status: "pending" | "approved" | "rejected" | "revision_requested"
  verified_by?: string
  verified_at?: string
  verification_requested_at?: string
  version: string
  location: string
  priority: "low" | "medium" | "high" | "critical"
  access_level: "departmental" | "organizational" | "public"
  language: string
  expiry_date?: string
  related_documents?: string
  author: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  type: "document_verification" | "read_request" | "read_confirmation" | "document_status"
  title: string
  message: string
  document_id?: string
  from_user_id?: string
  to_user_id: string
  is_read: boolean
  requires_action: boolean
  action_type?: "mark_as_read" | "verify_document" | "respond"
  metadata?: {
    verification_status?: "approved" | "rejected" | "revision_requested"
    priority?: "high" | "medium" | "low"
    deadline?: string
  }
  created_at: string
  updated_at: string
}

export interface NotificationPreferences {
  id: string
  user_id: string
  email_notifications: boolean
  push_notifications: boolean
  document_verification: boolean
  read_requests: boolean
  document_status: boolean
  created_at: string
  updated_at: string
}

export interface DocumentCategory {
  id: string
  name: string
  description?: string
  color: string
  icon?: string
  department?: string
  is_active: boolean
  created_at: string
}

export interface DocumentLocation {
  id: string
  path: string
  description?: string
  department?: string
  category?: string
  is_active: boolean
  created_at: string
}

export interface DocumentVersion {
  id: string
  document_id: string
  version: string
  file_url: string
  file_size: number
  change_notes?: string
  uploaded_by: string
  created_at: string
}

export interface DocumentComment {
  id: string
  document_id: string
  user_id: string
  comment: string
  comment_type: "feedback" | "revision_request" | "approval_note"
  is_internal: boolean
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  name: string
  description?: string
  status: "planning" | "active" | "completed" | "cancelled"
  priority: "high" | "medium" | "low"
  start_date?: string
  end_date?: string
  progress: number
  budget: number
  target_beneficiaries: number
  current_beneficiaries: number
  tags: string[]
  departments: string[]
  participants: number
  created_by: string
  created_at: string
  updated_at: string
}

export interface ActivityParticipant {
  id: string
  activity_id: string
  user_id: string
  role: string
  joined_at: string
}

export interface ActivityMeeting {
  id: string
  activity_id: string
  title: string
  description?: string
  meeting_date: string
  duration_minutes: number
  attendees_count: number
  meeting_notes?: string
  created_by: string
  created_at: string
}

export interface ActivityDiscussion {
  id: string
  activity_id: string
  user_id: string
  message: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface ActivityMilestone {
  id: string
  activity_id: string
  title: string
  description?: string
  target_date: string
  completion_date?: string
  status: "pending" | "active" | "completed" | "cancelled"
  created_by: string
  created_at: string
  updated_at: string
}

export interface ZiswafReport {
  id: string
  area: string
  target_amount: number
  realized_amount: number
  percentage: number
  report_month: number
  report_year: number
  created_at: string
  updated_at: string
}

// Helper functions for database operations

// Document functions
export const markDocumentAsMandatory = async (documentId: string, userId: string) => {
  // Only admins can mark documents as mandatory
  const { data: user } = await supabase.from("users").select("role").eq("id", userId).single()

  if (user?.role !== "admin") {
    throw new Error("Only admins can mark documents as mandatory")
  }

  const { error } = await supabase
    .from("documents")
    .update({
      is_starred: true,
      is_mandatory: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId)

  if (error) throw error
}

export const unmarkDocumentAsMandatory = async (documentId: string, userId: string) => {
  // Only admins can unmark documents as mandatory
  const { data: user } = await supabase.from("users").select("role").eq("id", userId).single()

  if (user?.role !== "admin") {
    throw new Error("Only admins can unmark documents as mandatory")
  }

  const { error } = await supabase
    .from("documents")
    .update({
      is_starred: false,
      is_mandatory: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId)

  if (error) throw error
}

export const getMandatoryDocuments = async () => {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaded_by:users(name, email)
    `)
    .eq("is_mandatory", true)
    .eq("is_starred", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Notification functions
export const getNotifications = async (userId: string, limit?: number) => {
  let query = supabase
    .from("notifications")
    .select(`
      *,
      from_user:users!notifications_from_user_id_fkey(id, name, avatar_url),
      document:documents(id, title)
    `)
    .eq("to_user_id", userId)
    .order("created_at", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) throw error
  return data as (Notification & {
    from_user?: Pick<User, "id" | "name" | "avatar_url">
    document?: Pick<Document, "id" | "title">
  })[]
}

export const getUnreadNotificationsCount = async (userId: string) => {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("to_user_id", userId)
    .eq("is_read", false)

  if (error) throw error
  return count || 0
}

export const markNotificationAsRead = async (notificationId: string) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true, updated_at: new Date().toISOString() })
    .eq("id", notificationId)

  if (error) throw error
}

export const markAllNotificationsAsRead = async (userId: string) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true, updated_at: new Date().toISOString() })
    .eq("to_user_id", userId)
    .eq("is_read", false)

  if (error) throw error
}

export const createNotification = async (notificationData: Partial<Notification>) => {
  const { data, error } = await supabase.from("notifications").insert(notificationData).select().single()

  if (error) throw error
  return data as Notification
}

export const createDocumentReadNotification = async (
  documentId: string,
  fromUserId: string,
  toUserId: string,
  documentTitle: string,
) => {
  return createNotification({
    type: "read_confirmation",
    title: "Konfirmasi Pembacaan",
    message: `Dokumen "${documentTitle}" telah dibaca`,
    document_id: documentId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    is_read: false,
    requires_action: false,
    metadata: {
      priority: "medium",
    },
  })
}

export const createDocumentVerificationNotification = async (
  documentId: string,
  fromUserId: string,
  toUserId: string,
  documentTitle: string,
) => {
  return createNotification({
    type: "document_verification",
    title: "Permintaan Verifikasi",
    message: `Dokumen baru memerlukan verifikasi: ${documentTitle}`,
    document_id: documentId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    is_read: false,
    requires_action: true,
    action_type: "verify_document",
    metadata: {
      priority: "high",
    },
  })
}

export const createReadRequestNotification = async (
  documentId: string,
  fromUserId: string,
  toUserId: string,
  documentTitle: string,
  deadline?: string,
) => {
  return createNotification({
    type: "read_request",
    title: "Permintaan Baca Dokumen",
    message: `Admin meminta Anda untuk membaca: ${documentTitle}`,
    document_id: documentId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    is_read: false,
    requires_action: true,
    action_type: "mark_as_read",
    metadata: {
      priority: "high",
      deadline: deadline,
    },
  })
}

export const createDocumentStatusNotification = async (
  documentId: string,
  fromUserId: string,
  toUserId: string,
  documentTitle: string,
  verificationStatus: "approved" | "rejected" | "revision_requested",
) => {
  const messages = {
    approved: `Dokumen Anda "${documentTitle}" telah disetujui`,
    rejected: `Dokumen Anda "${documentTitle}" ditolak`,
    revision_requested: `Dokumen Anda "${documentTitle}" memerlukan revisi`,
  }

  return createNotification({
    type: "document_status",
    title: "Status Verifikasi",
    message: messages[verificationStatus],
    document_id: documentId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    is_read: false,
    requires_action: verificationStatus === "revision_requested",
    action_type: verificationStatus === "revision_requested" ? "respond" : undefined,
    metadata: {
      verification_status: verificationStatus,
      priority: verificationStatus === "revision_requested" ? "medium" : "low",
    },
  })
}

export const getNotificationPreferences = async (userId: string) => {
  const { data, error } = await supabase.from("notification_preferences").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") throw error
  return data as NotificationPreferences | null
}

export const updateNotificationPreferences = async (userId: string, preferences: Partial<NotificationPreferences>) => {
  const { data, error } = await supabase
    .from("notification_preferences")
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data as NotificationPreferences
}

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data as User[]
}

export const getDocuments = async () => {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaded_by:users(name, email)
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const getDocumentsByDepartment = async (department: string) => {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaded_by:users(name, email),
      document_versions(*)
    `)
    .eq("department", department)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const getDocumentCategories = async (department?: string) => {
  let query = supabase.from("document_categories").select("*").eq("is_active", true)

  if (department) {
    query = query.eq("department", department)
  }

  const { data, error } = await query.order("name")

  if (error) throw error
  return data as DocumentCategory[]
}

export const getDocumentLocations = async (department?: string) => {
  let query = supabase.from("document_locations").select("*").eq("is_active", true)

  if (department) {
    query = query.eq("department", department)
  }

  const { data, error } = await query.order("path")

  if (error) throw error
  return data as DocumentLocation[]
}

export const createDocument = async (documentData: Partial<Document>) => {
  const { data, error } = await supabase.from("documents").insert(documentData).select().single()

  if (error) throw error
  return data as Document
}

export const createLinkDocument = async (documentData: Partial<Document>) => {
  const { data, error } = await supabase
    .from("documents")
    .insert({
      ...documentData,
      document_type: "link",
      file_size: null,
    })
    .select()
    .single()

  if (error) throw error
  return data as Document
}

export const createDocumentVersion = async (versionData: Partial<DocumentVersion>) => {
  const { data, error } = await supabase.from("document_versions").insert(versionData).select().single()

  if (error) throw error
  return data as DocumentVersion
}

export const getZiswafReports = async (year: number = new Date().getFullYear()) => {
  const { data, error } = await supabase
    .from("ziswaf_reports")
    .select("*")
    .eq("report_year", year)
    .order("report_month", { ascending: true })

  if (error) throw error
  return data as ZiswafReport[]
}

export const createZiswafReport = async (reportData: Partial<ZiswafReport>) => {
  const { data, error } = await supabase.from("ziswaf_reports").insert(reportData).select().single()

  if (error) throw error
  return data as ZiswafReport
}

export const getActivities = async () => {
  const { data, error } = await supabase
    .from("activities")
    .select(`
      *,
      created_by:users(name, email),
      activity_participants(
        user_id,
        role,
        users(name, email, department)
      )
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const getActivityById = async (id: string) => {
  const { data, error } = await supabase
    .from("activities")
    .select(`
      *,
      created_by:users(name, email),
      activity_participants(
        user_id,
        role,
        users(name, email, department, avatar_url)
      ),
      activity_meetings(*),
      activity_discussions(
        *,
        users(name, email)
      ),
      activity_milestones(*),
      activity_documents(
        documents(*)
      )
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export const getDocumentsForVerification = async () => {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaded_by:users(name, email),
      verified_by:users(name, email),
      document_comments(*)
    `)
    .order("verification_requested_at", { ascending: true })

  if (error) throw error
  return data
}

export const updateDocumentVerification = async (
  documentId: string,
  status: string,
  verifiedBy: string,
  comment?: string,
) => {
  const { error } = await supabase
    .from("documents")
    .update({
      verification_status: status,
      verified_by: verifiedBy,
      verified_at: new Date().toISOString(),
    })
    .eq("id", documentId)

  if (error) throw error

  // Add comment if provided
  if (comment) {
    const { error: commentError } = await supabase.from("document_comments").insert({
      document_id: documentId,
      user_id: verifiedBy,
      comment: comment,
      comment_type: status === "approved" ? "approval_note" : "feedback",
    })

    if (commentError) throw commentError
  }
}

export const requestDocumentVerification = async (documentId: string) => {
  const { error } = await supabase
    .from("documents")
    .update({
      verification_requested_at: new Date().toISOString(),
    })
    .eq("id", documentId)

  if (error) throw error
}

export const joinActivity = async (activityId: string, userId: string, role = "Participant") => {
  const { error } = await supabase.from("activity_participants").insert({
    activity_id: activityId,
    user_id: userId,
    role: role,
  })

  if (error) throw error
}

export const addActivityDiscussion = async (activityId: string, userId: string, message: string, parentId?: string) => {
  const { error } = await supabase.from("activity_discussions").insert({
    activity_id: activityId,
    user_id: userId,
    message: message,
    parent_id: parentId,
  })

  if (error) throw error
}

```

# lib\utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# package.json

```json
{
  "name": "ngejerwisokto",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@supabase/supabase-js": "^2.50.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.525.0",
    "next": "15.2.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "recharts": "^3.1.0",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.2.4",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.5",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;

```

# public\file.svg

This is a file of the type: SVG Image

# public\globe.svg

This is a file of the type: SVG Image

# public\next.svg

This is a file of the type: SVG Image

# public\vercel.svg

This is a file of the type: SVG Image

# public\window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# scripts\add-verification-system.sql

```sql
-- Add verification columns to documents table
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'revision_requested'));
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES users(id);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS verification_requested_at TIMESTAMP WITH TIME ZONE;

-- Create document_comments table for admin feedback
CREATE TABLE IF NOT EXISTS document_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  comment TEXT NOT NULL,
  comment_type VARCHAR(50) DEFAULT 'feedback' CHECK (comment_type IN ('feedback', 'revision_request', 'approval_note')),
  is_internal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_revisions table to track document versions
CREATE TABLE IF NOT EXISTS document_revisions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  revision_notes TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_documents_verification_status ON documents(verification_status);
CREATE INDEX IF NOT EXISTS idx_document_comments_document_id ON document_comments(document_id);
CREATE INDEX IF NOT EXISTS idx_document_revisions_document_id ON document_revisions(document_id);

-- Update existing documents to have pending status
UPDATE documents SET verification_status = 'pending' WHERE verification_status IS NULL;

```

# scripts\all-script.sql

```sql
-- =================================================================
--  Unified Database Initialization Script for Ziswaf KMS
-- =================================================================

-- Drop existing tables in reverse order of dependency to ensure a clean slate if needed
-- (Use with caution in production)
-- DROP TABLE IF EXISTS document_request_updates, document_request_attachments, document_requests, document_request_templates, knowledge_segments CASCADE;
-- DROP TABLE IF EXISTS scholarship_recipients, scholarship_programs CASCADE;
-- DROP TABLE IF EXISTS activity_milestones, activity_discussions, activity_meetings, activity_documents, activity_participants, activities CASCADE;
-- DROP TABLE IF EXISTS notification_actions, notification_preferences, notifications CASCADE;
-- DROP TABLE IF EXISTS document_versions, document_comments, document_favorites, document_downloads, document_views, document_locations, document_categories, documents CASCADE;
-- DROP TABLE IF EXISTS ziswaf_reports, users CASCADE;

-- =================================================================
--  1. USERS TABLE
-- =================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- =================================================================
--  2. DOCUMENTS AND RELATED TABLES
-- =================================================================

CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  document_type VARCHAR(10) DEFAULT 'file' CHECK (document_type IN ('file', 'link')),
  file_url TEXT,
  external_url TEXT,
  platform VARCHAR(50),
  file_type VARCHAR(10),
  file_size BIGINT,
  category VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  author VARCHAR(255),
  tags TEXT[],
  uploaded_by UUID REFERENCES users(id),
  is_mandatory BOOLEAN DEFAULT FALSE,
  is_starred BOOLEAN DEFAULT FALSE,
  version VARCHAR(20) DEFAULT '1.0',
  location VARCHAR(500),
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  access_level VARCHAR(50) DEFAULT 'departmental' CHECK (access_level IN ('departmental', 'organizational', 'public')),
  language VARCHAR(10) DEFAULT 'id',
  expiry_date DATE,
  related_documents TEXT,
  verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'revision_requested')),
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  verification_requested_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_document_url CHECK (
    (document_type = 'file' AND file_url IS NOT NULL) OR
    (document_type = 'link' AND external_url IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS document_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(document_id, user_id)
);

CREATE TABLE IF NOT EXISTS document_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(document_id, user_id)
);

CREATE TABLE IF NOT EXISTS document_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  comment TEXT NOT NULL,
  comment_type VARCHAR(50) DEFAULT 'feedback' CHECK (comment_type IN ('feedback', 'revision_request', 'approval_note')),
  is_internal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =================================================================
--  3. ACTIVITIES AND RELATED TABLES
-- =================================================================

CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  start_date DATE,
  end_date DATE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  budget BIGINT DEFAULT 0,
  target_beneficiaries INTEGER DEFAULT 0,
  current_beneficiaries INTEGER DEFAULT 0,
  tags TEXT[],
  departments TEXT[],
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(100),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, user_id)
);

CREATE TABLE IF NOT EXISTS activity_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_date DATE NOT NULL,
  completion_date DATE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- =================================================================
--  4. PROGRAMS (SCHOLARSHIPS) AND KNOWLEDGE REQUESTS
-- =================================================================

CREATE TABLE IF NOT EXISTS scholarship_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  budget BIGINT NOT NULL DEFAULT 0,
  recipients INTEGER DEFAULT 0,
  target_recipients INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  department VARCHAR(100) NOT NULL,
  coordinator_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES scholarship_programs(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  requested_by UUID REFERENCES users(id),
  assigned_to VARCHAR(100),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  data_requirements TEXT[] NOT NULL,
  deliverables TEXT[] NOT NULL,
  template_type VARCHAR(100),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- =================================================================
--  5. NOTIFICATIONS
-- =================================================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('document_verification', 'read_request', 'read_confirmation', 'document_status')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    requires_action BOOLEAN DEFAULT FALSE,
    action_type VARCHAR(50) CHECK (action_type IN ('mark_as_read', 'verify_document', 'respond')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- =================================================================
--  6. SEED DATA (INITIAL DATA)
-- =================================================================

-- Insert sample users
INSERT INTO users (email, name, department, role, status, last_login) VALUES
('admin@ziswaf.com', 'Admin System', 'IT', 'admin', 'active', NOW() - INTERVAL '1 hours'),
('user@ziswaf.com', 'Ahmad Fauzi', 'Pendayagunaan', 'user', 'active', NOW() - INTERVAL '2 hours'),
('siti.nurhaliza@ziswaf.com', 'Siti Nurhaliza', 'Penghimpunan', 'user', 'active', NOW() - INTERVAL '5 hours'),
('budi.santoso@ziswaf.com', 'Budi Santoso', 'Keuangan', 'user', 'active', NOW() - INTERVAL '1 day'),
('maya.sari@ziswaf.com', 'Maya Sari', 'Marketing', 'user', 'pending', NULL),
('rizki.pratama@ziswaf.com', 'Rizki Pratama', 'IT', 'user', 'inactive', NOW() - INTERVAL '25 days')
ON CONFLICT (email) DO NOTHING;

-- Insert sample documents
INSERT INTO documents (title, description, document_type, file_url, file_type, file_size, category, department, tags, uploaded_by, is_mandatory, is_starred, verification_status, author) VALUES
('Panduan Penyaluran Beasiswa 2024', 'Dokumen panduan lengkap untuk proses penyaluran beasiswa tahun 2024', 'file', '/documents/panduan-beasiswa-2024.pdf', 'PDF', 2516582, 'Panduan', 'Pendayagunaan', ARRAY['beasiswa', 'panduan', '2024'], (SELECT id FROM users WHERE email = 'user@ziswaf.com'), TRUE, TRUE, 'approved', 'Ahmad Fauzi'),
('Laporan Keuangan Q4 2023', 'Laporan keuangan triwulan keempat tahun 2023', 'file', '/documents/laporan-keuangan-q4-2023.xlsx', 'Excel', 1887436, 'Laporan', 'Keuangan', ARRAY['keuangan', 'laporan', 'Q4'], (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), TRUE, TRUE, 'approved', 'Siti Nurhaliza'),
('SOP Verifikasi Mustahik', 'Standar operasional prosedur untuk verifikasi penerima bantuan', 'file', '/documents/sop-verifikasi-mustahik.pdf', 'PDF', 1258291, 'SOP', 'Penyaluran', ARRAY['SOP', 'verifikasi', 'mustahik'], (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'), FALSE, FALSE, 'pending', 'Budi Santoso'),
('Proposal Program Kesehatan', 'Proposal program bantuan kesehatan untuk mustahik', 'file', '/documents/proposal-kesehatan.docx', 'Word', 3251200, 'Proposal', 'Pendayagunaan', ARRAY['proposal', 'kesehatan', 'bantuan'], (SELECT id FROM users WHERE email = 'user@ziswaf.com'), FALSE, FALSE, 'rejected', 'Ahmad Fauzi')
ON CONFLICT (title) DO NOTHING;
```

# scripts\create-knowledge-requests-tables.sql

```sql
-- Create knowledge segments table
CREATE TABLE IF NOT EXISTS knowledge_segments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attachment types table
CREATE TABLE IF NOT EXISTS attachment_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge requests table
CREATE TABLE IF NOT EXISTS knowledge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  segment_id UUID REFERENCES knowledge_segments(id),
  requested_by UUID REFERENCES users(id),
  department VARCHAR(100),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  due_date DATE NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  segment_specific JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge request attachments table
CREATE TABLE IF NOT EXISTS knowledge_request_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES knowledge_requests(id) ON DELETE CASCADE,
  attachment_type_id UUID REFERENCES attachment_types(id),
  description TEXT NOT NULL,
  is_required BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  uploaded_file_name VARCHAR(500),
  uploaded_file_path VARCHAR(1000),
  uploaded_file_size BIGINT,
  uploaded_by UUID REFERENCES users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge request updates table
CREATE TABLE IF NOT EXISTS knowledge_request_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES knowledge_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  progress INTEGER CHECK (progress >= 0 AND progress <= 100),
  attachment_files TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge request comments table
CREATE TABLE IF NOT EXISTS knowledge_request_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES knowledge_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  comment TEXT NOT NULL,
  parent_comment_id UUID REFERENCES knowledge_request_comments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge request assignments table
CREATE TABLE IF NOT EXISTS knowledge_request_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES knowledge_requests(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id),
  assigned_by UUID REFERENCES users(id),
  role VARCHAR(100), -- 'primary', 'reviewer', 'contributor'
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_segment_id ON knowledge_requests(segment_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_status ON knowledge_requests(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_priority ON knowledge_requests(priority);
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_due_date ON knowledge_requests(due_date);
CREATE INDEX IF NOT EXISTS idx_knowledge_requests_requested_by ON knowledge_requests(requested_by);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_attachments_request_id ON knowledge_request_attachments(request_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_attachments_status ON knowledge_request_attachments(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_updates_request_id ON knowledge_request_updates(request_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_comments_request_id ON knowledge_request_comments(request_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_request_assignments_request_id ON knowledge_request_assignments(request_id);

-- Enable Row Level Security
ALTER TABLE knowledge_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_request_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_request_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_request_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_request_assignments ENABLE ROW LEVEL SECURITY;

```

# scripts\create-notifications-tables.sql

```sql
-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('document_verification', 'read_request', 'read_confirmation', 'document_status')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    requires_action BOOLEAN DEFAULT FALSE,
    action_type VARCHAR(50) CHECK (action_type IN ('mark_as_read', 'verify_document', 'respond')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notification_actions table for tracking actions taken
CREATE TABLE IF NOT EXISTS notification_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL,
    action_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notification_preferences table for user preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    document_verification BOOLEAN DEFAULT TRUE,
    read_requests BOOLEAN DEFAULT TRUE,
    document_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_to_user_id ON notifications(to_user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_from_user_id ON notifications(from_user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_document_id ON notifications(document_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_requires_action ON notifications(requires_action);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_notifications_updated_at 
    BEFORE UPDATE ON notifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at 
    BEFORE UPDATE ON notification_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (to_user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (to_user_id = auth.uid());

CREATE POLICY "Users can create notifications" ON notifications
    FOR INSERT WITH CHECK (from_user_id = auth.uid());

-- Create RLS policies for notification_actions
CREATE POLICY "Users can view their own notification actions" ON notification_actions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own notification actions" ON notification_actions
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create RLS policies for notification_preferences
CREATE POLICY "Users can manage their own notification preferences" ON notification_preferences
    FOR ALL USING (user_id = auth.uid());

```

# scripts\create-scholarship-tables.sql

```sql
-- Create scholarship programs table
CREATE TABLE IF NOT EXISTS scholarship_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  budget BIGINT NOT NULL DEFAULT 0,
  recipients INTEGER DEFAULT 0,
  target_recipients INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  department VARCHAR(100) NOT NULL,
  coordinator_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document requests table
CREATE TABLE IF NOT EXISTS document_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES scholarship_programs(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  requested_by UUID REFERENCES users(id),
  assigned_to VARCHAR(100),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  data_requirements TEXT[] NOT NULL,
  deliverables TEXT[] NOT NULL,
  template_type VARCHAR(100),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document request updates table
CREATE TABLE IF NOT EXISTS document_request_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES document_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  progress INTEGER CHECK (progress >= 0 AND progress <= 100),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document request templates table
CREATE TABLE IF NOT EXISTS document_request_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  data_fields TEXT[] NOT NULL,
  deliverable_templates TEXT[] NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scholarship recipients table
CREATE TABLE IF NOT EXISTS scholarship_recipients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES scholarship_programs(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  education_level VARCHAR(50) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  gpa DECIMAL(3,2),
  family_income BIGINT,
  province VARCHAR(100),
  city VARCHAR(100),
  gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
  birth_date DATE,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'graduated', 'dropped', 'suspended')),
  scholarship_amount BIGINT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scholarship_programs_status ON scholarship_programs(status);
CREATE INDEX IF NOT EXISTS idx_scholarship_programs_department ON scholarship_programs(department);
CREATE INDEX IF NOT EXISTS idx_document_requests_program_id ON document_requests(program_id);
CREATE INDEX IF NOT EXISTS idx_document_requests_status ON document_requests(status);
CREATE INDEX IF NOT EXISTS idx_document_requests_priority ON document_requests(priority);
CREATE INDEX IF NOT EXISTS idx_document_requests_due_date ON document_requests(due_date);
CREATE INDEX IF NOT EXISTS idx_scholarship_recipients_program_id ON scholarship_recipients(program_id);
CREATE INDEX IF NOT EXISTS idx_scholarship_recipients_status ON scholarship_recipients(status);
CREATE INDEX IF NOT EXISTS idx_scholarship_recipients_province ON scholarship_recipients(province);

-- Enable Row Level Security
ALTER TABLE scholarship_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_request_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_request_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship_recipients ENABLE ROW LEVEL SECURITY;

```

# scripts\create-tables.sql

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type VARCHAR(10) NOT NULL,
  file_size BIGINT NOT NULL,
  category VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  tags TEXT[],
  uploaded_by UUID REFERENCES users(id),
  is_mandatory BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_views table
CREATE TABLE IF NOT EXISTS document_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(document_id, user_id)
);

-- Create document_downloads table
CREATE TABLE IF NOT EXISTS document_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_favorites table
CREATE TABLE IF NOT EXISTS document_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(document_id, user_id)
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  participants INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ziswaf_reports table
CREATE TABLE IF NOT EXISTS ziswaf_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  area VARCHAR(100) NOT NULL,
  target_amount BIGINT NOT NULL,
  realized_amount BIGINT NOT NULL,
  percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN target_amount > 0 THEN (realized_amount::DECIMAL / target_amount::DECIMAL) * 100
      ELSE 0
    END
  ) STORED,
  report_month INTEGER NOT NULL CHECK (report_month BETWEEN 1 AND 12),
  report_year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(area, report_month, report_year)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_department ON documents(department);
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_document_views_user_id ON document_views(user_id);
CREATE INDEX IF NOT EXISTS idx_document_downloads_user_id ON document_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_ziswaf_reports_year_month ON ziswaf_reports(report_year, report_month);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ziswaf_reports ENABLE ROW LEVEL SECURITY;

```

# scripts\seed-activities-data.sql

```sql
-- Update existing activities with new fields
UPDATE activities SET 
  priority = 'high',
  start_date = '2024-11-01',
  end_date = '2025-03-31',
  progress = 65,
  budget = 2500000000,
  target_beneficiaries = 500,
  current_beneficiaries = 325,
  tags = ARRAY['beasiswa', 'pendidikan', 'kolaborasi'],
  departments = ARRAY['Pendayagunaan', 'Keuangan', 'Marketing']
WHERE name = 'Program Beasiswa';

UPDATE activities SET 
  priority = 'medium',
  start_date = '2025-01-15',
  end_date = '2025-06-30',
  progress = 15,
  budget = 800000000,
  target_beneficiaries = 1000,
  current_beneficiaries = 0,
  tags = ARRAY['kesehatan', 'sistem', 'monitoring'],
  departments = ARRAY['IT', 'Pendayagunaan', 'SDM']
WHERE name = 'Bantuan Kesehatan';

UPDATE activities SET 
  priority = 'high',
  start_date = '2024-09-01',
  end_date = '2025-08-31',
  progress = 45,
  budget = 3200000000,
  target_beneficiaries = 200,
  current_beneficiaries = 90,
  tags = ARRAY['umkm', 'pemberdayaan', 'ekonomi'],
  departments = ARRAY['Pendayagunaan', 'Marketing', 'Keuangan']
WHERE name = 'Pemberdayaan UMKM';

UPDATE activities SET 
  priority = 'high',
  start_date = '2024-01-01',
  end_date = '2024-10-31',
  progress = 100,
  budget = 1500000000,
  target_beneficiaries = 0,
  current_beneficiaries = 0,
  tags = ARRAY['digitalisasi', 'transformasi', 'sistem'],
  departments = ARRAY['IT', 'Penghimpunan', 'Pendayagunaan', 'Keuangan']
WHERE name = 'Infrastruktur Masjid';

-- Insert activity participants
INSERT INTO activity_participants (activity_id, user_id, role) VALUES
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), 'Lead'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), 'Finance Coordinator'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com'), 'Outreach Specialist'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'), 'Program Officer');

INSERT INTO activity_participants (activity_id, user_id, role) VALUES
((SELECT id FROM activities WHERE name = 'Bantuan Kesehatan'), (SELECT id FROM users WHERE email = 'rizki.pratama@ziswaf.com'), 'Tech Lead'),
((SELECT id FROM activities WHERE name = 'Bantuan Kesehatan'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), 'Business Analyst'),
((SELECT id FROM activities WHERE name = 'Bantuan Kesehatan'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), 'Process Coordinator');

-- Insert activity milestones
INSERT INTO activity_milestones (activity_id, title, description, target_date, completion_date, status, created_by) VALUES
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Project Initiation', 'Kick-off meeting dan pembentukan tim', '2024-11-01', '2024-11-01', 'completed', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Criteria Development', 'Pengembangan kriteria seleksi penerima', '2024-11-15', '2024-11-15', 'completed', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Marketing Campaign Launch', 'Peluncuran campaign awareness', '2024-12-01', '2024-12-01', 'completed', (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Application Period', 'Periode penerimaan aplikasi beasiswa', '2024-12-15', NULL, 'active', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Selection Process', 'Proses seleksi dan evaluasi aplikasi', '2025-01-15', NULL, 'pending', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Scholarship Distribution', 'Distribusi beasiswa kepada penerima', '2025-02-01', NULL, 'pending', (SELECT id FROM users WHERE email = 'admin@ziswaf.com'));

-- Insert activity meetings
INSERT INTO activity_meetings (activity_id, title, description, meeting_date, duration_minutes, attendees_count, meeting_notes, created_by) VALUES
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Kick-off Meeting', 'Initial planning and role assignment', '2024-11-01 10:00:00', 120, 8, 'Initial planning and role assignment completed successfully', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Budget Review', 'Budget allocation discussion', '2024-11-15 14:00:00', 90, 5, 'Budget allocation finalized and approved', (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com')),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), 'Marketing Strategy', 'Outreach strategy planning', '2024-12-01 09:00:00', 60, 6, 'Marketing campaign strategy approved and launched', (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com'));

-- Insert activity discussions
INSERT INTO activity_discussions (activity_id, user_id, message) VALUES
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), 'Tim, kita perlu finalisasi kriteria seleksi penerima beasiswa minggu ini.'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com'), 'Sudah ada update dari tim marketing terkait campaign awareness. Response rate cukup baik.'),
((SELECT id FROM activities WHERE name = 'Program Beasiswa'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), 'Budget tracking bulan ini sudah on track. Detailed report akan saya share besok.');

```

# scripts\seed-data.sql

```sql
-- Insert sample users
INSERT INTO users (email, name, department, role, status, last_login) VALUES
('admin@ziswaf.com', 'Ahmad Fauzi', 'Pendayagunaan', 'admin', 'active', NOW() - INTERVAL '2 hours'),
('siti.nurhaliza@ziswaf.com', 'Siti Nurhaliza', 'Penghimpunan', 'user', 'active', NOW() - INTERVAL '5 hours'),
('budi.santoso@ziswaf.com', 'Budi Santoso', 'Keuangan', 'user', 'active', NOW() - INTERVAL '1 day'),
('maya.sari@ziswaf.com', 'Maya Sari', 'Marketing', 'user', 'pending', NULL),
('rizki.pratama@ziswaf.com', 'Rizki Pratama', 'IT', 'user', 'inactive', NOW() - INTERVAL '25 days');

-- Insert sample documents
INSERT INTO documents (title, description, file_url, file_type, file_size, category, department, tags, uploaded_by, is_mandatory) VALUES
('Panduan Lengkap Pendayagunaan Ziswaf 2024', 'Dokumen komprehensif yang memuat seluruh prosedur dan panduan untuk pendayagunaan dana ziswaf', '/documents/panduan-ziswaf-2024.pdf', 'PDF', 2516582, 'Panduan', 'Pendayagunaan', ARRAY['ziswaf', 'panduan', 'prosedur'], (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), FALSE),
('Template Laporan Bulanan Pendayagunaan', 'Template standar untuk pembuatan laporan bulanan kegiatan pendayagunaan', '/documents/template-laporan-bulanan.xlsx', 'XLSX', 875264, 'Template', 'Pendayagunaan', ARRAY['template', 'laporan', 'bulanan'], (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), FALSE),
('SOP Verifikasi dan Validasi Mustahik', 'Standar operasional prosedur untuk proses verifikasi dan validasi penerima manfaat', '/documents/sop-verifikasi-mustahik.pdf', 'PDF', 1887436, 'SOP', 'Pendayagunaan', ARRAY['sop', 'verifikasi', 'mustahik'], (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'), FALSE),
('Kode Etik Perusahaan', 'Dokumen wajib yang memuat kode etik dan tata nilai perusahaan', '/documents/kode-etik-perusahaan.pdf', 'PDF', 1258742, 'Kepegawaian', 'SDM', ARRAY['kode-etik', 'wajib', 'kepegawaian'], (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), TRUE),
('Strategi Penghimpunan Dana Ziswaf 2025', 'Dokumen strategis untuk perencanaan penghimpunan dana ziswaf tahun 2025', '/documents/strategi-penghimpunan-2025.pdf', 'PDF', 3355648, 'Strategi', 'Penghimpunan', ARRAY['strategi', 'penghimpunan', '2025'], (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'), FALSE);

-- Insert sample activities
INSERT INTO activities (name, description, status, participants, created_by) VALUES
('Program Beasiswa', 'Program pemberian beasiswa untuk mahasiswa kurang mampu', 'active', 12, (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
('Bantuan Kesehatan', 'Program bantuan kesehatan untuk masyarakat dhuafa', 'planning', 8, (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com')),
('Pemberdayaan UMKM', 'Program pemberdayaan usaha mikro kecil menengah', 'active', 15, (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com')),
('Infrastruktur Masjid', 'Program pembangunan dan renovasi masjid', 'completed', 6, (SELECT id FROM users WHERE email = 'admin@ziswaf.com'));

-- Insert sample ziswaf reports
INSERT INTO ziswaf_reports (area, target_amount, realized_amount, report_month, report_year) VALUES
('Pendidikan', 2000000000, 1800000000, 12, 2024),
('Kesehatan', 1500000000, 1350000000, 12, 2024),
('Ekonomi', 1800000000, 1620000000, 12, 2024),
('Sosial', 1200000000, 960000000, 12, 2024),
('Dakwah', 800000000, 720000000, 12, 2024),
('Pendidikan', 1800000000, 1710000000, 11, 2024),
('Kesehatan', 1400000000, 1260000000, 11, 2024),
('Ekonomi', 1700000000, 1530000000, 11, 2024),
('Sosial', 1100000000, 880000000, 11, 2024),
('Dakwah', 750000000, 675000000, 11, 2024);

-- Insert sample document views
INSERT INTO document_views (document_id, user_id) VALUES
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Template Laporan Bulanan Pendayagunaan'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'SOP Verifikasi dan Validasi Mustahik'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'));

-- Insert sample document favorites
INSERT INTO document_favorites (document_id, user_id) VALUES
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'SOP Verifikasi dan Validasi Mustahik'), (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'));

-- Insert sample document downloads
INSERT INTO document_downloads (document_id, user_id) VALUES
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Template Laporan Bulanan Pendayagunaan'), (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Kode Etik Perusahaan'), (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'));

```

# scripts\seed-departments-data.sql

```sql
-- Insert document categories
INSERT INTO document_categories (name, description, color, icon, department) VALUES
('Panduan', 'Dokumen panduan dan petunjuk teknis', '#blue', '📖', 'Pendayagunaan'),
('SOP', 'Standard Operating Procedures', '#green', '📋', 'Pendayagunaan'),
('Template', 'Template dokumen standar', '#purple', '📄', 'Pendayagunaan'),
('Laporan', 'Laporan kegiatan dan evaluasi', '#orange', '📊', 'Pendayagunaan'),
('Evaluasi', 'Dokumen evaluasi program', '#red', '📈', 'Pendayagunaan'),
('Database', 'Database dan data master', '#yellow', '🗃️', 'Pendayagunaan'),
('Formulir', 'Formulir dan form aplikasi', '#indigo', '📝', 'Pendayagunaan'),
('Presentasi', 'Materi presentasi', '#pink', '🎯', 'Pendayagunaan');

-- Insert document locations
INSERT INTO document_locations (path, description, department, category) VALUES
('/documents/pendayagunaan/panduan/', 'Lokasi penyimpanan panduan pendayagunaan', 'Pendayagunaan', 'Panduan'),
('/documents/pendayagunaan/sop/', 'Lokasi penyimpanan SOP pendayagunaan', 'Pendayagunaan', 'SOP'),
('/documents/pendayagunaan/template/', 'Lokasi penyimpanan template pendayagunaan', 'Pendayagunaan', 'Template'),
('/documents/pendayagunaan/laporan/', 'Lokasi penyimpanan laporan pendayagunaan', 'Pendayagunaan', 'Laporan'),
('/documents/pendayagunaan/evaluasi/', 'Lokasi penyimpanan evaluasi pendayagunaan', 'Pendayagunaan', 'Evaluasi'),
('/documents/pendayagunaan/database/', 'Lokasi penyimpanan database pendayagunaan', 'Pendayagunaan', 'Database'),
('/documents/penghimpunan/panduan/', 'Lokasi penyimpanan panduan penghimpunan', 'Penghimpunan', 'Panduan'),
('/documents/penghimpunan/sop/', 'Lokasi penyimpanan SOP penghimpunan', 'Penghimpunan', 'SOP'),
('/documents/keuangan/laporan/', 'Lokasi penyimpanan laporan keuangan', 'Keuangan', 'Laporan'),
('/documents/keuangan/template/', 'Lokasi penyimpanan template keuangan', 'Keuangan', 'Template'),
('/documents/sdm/kepegawaian/', 'Lokasi penyimpanan dokumen kepegawaian', 'SDM', 'Kepegawaian'),
('/documents/it/sistem/', 'Lokasi penyimpanan dokumen sistem IT', 'IT', 'Sistem');

-- Update existing documents with new fields
UPDATE documents SET 
  version = 'v2.1',
  location = '/documents/pendayagunaan/panduan/',
  priority = 'high',
  access_level = 'organizational',
  author = 'Ahmad Fauzi'
WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024';

UPDATE documents SET 
  version = 'v1.5',
  location = '/documents/pendayagunaan/sop/',
  priority = 'high',
  access_level = 'organizational',
  author = 'Budi Santoso'
WHERE title = 'SOP Verifikasi dan Validasi Mustahik';

UPDATE documents SET 
  version = 'v1.0',
  location = '/documents/pendayagunaan/template/',
  priority = 'medium',
  access_level = 'departmental',
  author = 'Siti Nurhaliza'
WHERE title = 'Template Laporan Bulanan Pendayagunaan';

UPDATE documents SET 
  version = 'v1.2',
  location = '/documents/pendayagunaan/evaluasi/',
  priority = 'medium',
  access_level = 'departmental',
  author = 'Maya Sari'
WHERE title = 'Strategi Penghimpunan Dana Ziswaf 2025';

UPDATE documents SET 
  version = 'v1.0',
  location = '/documents/sdm/kepegawaian/',
  priority = 'critical',
  access_level = 'organizational',
  author = 'HR Team',
  is_mandatory = TRUE
WHERE title = 'Kode Etik Perusahaan';

-- Insert document versions for version control
INSERT INTO document_versions (document_id, version, file_url, file_size, change_notes, uploaded_by) VALUES
((SELECT id FROM documents WHERE title = 'Panduan Lengkap Pendayagunaan Ziswaf 2024'), 'v2.1', '/files/panduan-ziswaf-v2.1.pdf', 2516582, 'Update prosedur verifikasi dan tambahan checklist', (SELECT id FROM users WHERE email = 'admin@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'SOP Verifikasi dan Validasi Mustahik'), 'v1.5', '/files/sop-verifikasi-v1.5.pdf', 1887436, 'Perbaikan flowchart dan penambahan kriteria validasi', (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com')),
((SELECT id FROM documents WHERE title = 'Template Laporan Bulanan Pendayagunaan'), 'v1.0', '/files/template-laporan-v1.0.xlsx', 875264, 'Template awal untuk laporan bulanan', (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com'));

-- Insert additional sample documents for departments
INSERT INTO documents (title, description, file_url, file_type, file_size, category, department, tags, uploaded_by, version, location, priority, access_level, author) VALUES
('Daftar Mitra Strategis Pendayagunaan', 'Database lengkap mitra strategis untuk program pendayagunaan ziswaf', '/documents/daftar-mitra-strategis.xlsx', 'XLSX', 1548672, 'Database', 'Pendayagunaan', ARRAY['mitra', 'database', 'strategis', 'kemitraan'], (SELECT id FROM users WHERE email = 'admin@ziswaf.com'), 'v3.0', '/documents/pendayagunaan/database/', 'medium', 'departmental', 'Ahmad Fauzi'),
('Formulir Aplikasi Beasiswa', 'Formulir standar untuk aplikasi program beasiswa mahasiswa', '/documents/formulir-beasiswa.pdf', 'PDF', 892456, 'Formulir', 'Pendayagunaan', ARRAY['formulir', 'beasiswa', 'aplikasi', 'mahasiswa'], (SELECT id FROM users WHERE email = 'budi.santoso@ziswaf.com'), 'v2.0', '/documents/pendayagunaan/formulir/', 'high', 'public', 'Budi Santoso'),
('Presentasi Program UMKM 2024', 'Materi presentasi program pemberdayaan UMKM tahun 2024', '/documents/presentasi-umkm-2024.pptx', 'PPTX', 3245789, 'Presentasi', 'Pendayagunaan', ARRAY['presentasi', 'umkm', 'pemberdayaan', '2024'], (SELECT id FROM users WHERE email = 'maya.sari@ziswaf.com'), 'v1.1', '/documents/pendayagunaan/presentasi/', 'medium', 'organizational', 'Maya Sari');

```

# scripts\seed-knowledge-requests-data.sql

```sql
-- Insert knowledge segments
INSERT INTO knowledge_segments (name, description, icon, color) VALUES
('Zakat', 'Pengetahuan tentang zakat dan pengelolaannya', '🕌', 'blue'),
('Infaq', 'Pengetahuan tentang infaq dan sedekah', '💰', 'green'),
('Wakaf', 'Pengetahuan tentang wakaf dan pengelolaannya', '🏛️', 'purple'),
('Pendayagunaan', 'Program dan strategi pendayagunaan', '🎯', 'orange'),
('Penghimpunan  '🏛️', 'purple'),
('Pendayagunaan', 'Program dan strategi pendayagunaan', '🎯', 'orange'),
('Penghimpunan', 'Strategi dan metode penghimpunan dana', '📈', 'red'),
('Keuangan', 'Manajemen keuangan dan akuntansi', '💼', 'indigo'),
('SDM', 'Manajemen sumber daya manusia', '👥', 'pink'),
('Teknologi', 'Sistem dan teknologi informasi', '💻', 'cyan'),
('Hukum & Regulasi', 'Aspek hukum dan regulasi ziswaf', '⚖️', 'yellow'),
('Audit & Compliance', 'Audit internal dan kepatuhan', '🔍', 'gray');

-- Insert attachment types
INSERT INTO attachment_types (name, description, icon, category) VALUES
('SOP (Standard Operating Procedure)', 'Prosedur operasional standar', '📋', 'procedure'),
('Template Dokumen', 'Template untuk berbagai dokumen', '📄', 'template'),
('Form & Formulir', 'Form dan formulir untuk input data', '📝', 'form'),
('Panduan & Petunjuk', 'Panduan dan petunjuk teknis', '📖', 'guide'),
('Regulasi & Kebijakan', 'Dokumen regulasi dan kebijakan', '⚖️', 'regulation'),
('Format Laporan', 'Template dan format laporan', '📊', 'report'),
('Checklist & Audit', 'Checklist untuk audit dan verifikasi', '✅', 'checklist'),
('Materi Training', 'Materi untuk pelatihan dan edukasi', '🎓', 'training'),
('Referensi & Rujukan', 'Dokumen referensi dan rujukan', '📚', 'reference'),
('Flowchart & Diagram', 'Diagram alur dan flowchart proses', '🔄', 'diagram');

-- Insert sample knowledge requests
INSERT INTO knowledge_requests (title, description, segment_id, requested_by, department, priority, status, due_date, progress, segment_specific) VALUES
(
  'SOP Verifikasi Mustahik Program Beasiswa',
  'Membutuhkan SOP lengkap untuk proses verifikasi calon penerima beasiswa dengan kriteria yang jelas dan terukur',
  (SELECT id FROM knowledge_segments WHERE name = 'Pendayagunaan'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'Pendayagunaan',
  'high',
  'in_progress',
  '2024-12-30',
  65,
  '{"targetGroup": "Mahasiswa kurang mampu", "criteria": ["IPK minimal 3.0", "Penghasilan keluarga < 3 juta", "Aktif berorganisasi"], "scope": "Nasional", "additionalRequirements": ["Surat keterangan tidak mampu dari kelurahan", "Transkrip nilai terbaru", "Surat rekomendasi dari dosen pembimbing"]}'
),
(
  'Template Laporan Keuangan Bulanan',
  'Template standar untuk laporan keuangan bulanan setiap departemen dengan format yang konsisten',
  (SELECT id FROM knowledge_segments WHERE name = 'Keuangan'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'Keuangan',
  'medium',
  'pending',
  '2024-12-25',
  25,
  '{"reportingPeriod": "Bulanan", "departments": ["Semua departemen"], "compliance": ["PSAK", "Regulasi OJK"], "format": "Excel dan PDF"}'
),
(
  'Panduan Audit Internal Ziswaf',
  'Panduan komprehensif untuk pelaksanaan audit internal program ziswaf sesuai standar internasional',
  (SELECT id FROM knowledge_segments WHERE name = 'Audit & Compliance'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'Audit Internal',
  'high',
  'completed',
  '2024-12-15',
  100,
  '{"auditScope": ["Program Zakat", "Program Infaq", "Program Wakaf"], "frequency": "Triwulanan", "standards": ["ISO 19011", "COSO Framework"]}'
);

-- Insert sample attachment requests
INSERT INTO knowledge_request_attachments (request_id, attachment_type_id, description, is_required, status, uploaded_file_name, uploaded_by, uploaded_at) VALUES
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM attachment_types WHERE name = 'SOP (Standard Operating Procedure)'),
  'SOP verifikasi dokumen mustahik dengan flowchart proses',
  TRUE,
  'completed',
  'SOP_Verifikasi_Mustahik_v1.pdf',
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  '2024-11-25'
),
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM attachment_types WHERE name = 'Form & Formulir'),
  'Form assessment kelayakan dengan scoring system',
  TRUE,
  'in_progress',
  NULL,
  NULL,
  NULL
),
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM attachment_types WHERE name = 'Checklist & Audit'),
  'Checklist verifikasi berkas dan dokumen pendukung',
  FALSE,
  'pending',
  NULL,
  NULL,
  NULL
);

-- Insert sample updates
INSERT INTO knowledge_request_updates (request_id, user_id, message, progress, attachment_files) VALUES
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'SOP verifikasi mustahik telah selesai dibuat dan sudah diupload. Sedang dalam proses review internal.',
  65,
  ARRAY['SOP_Verifikasi_Mustahik_v1.pdf']
),
(
  (SELECT id FROM knowledge_requests WHERE title = 'SOP Verifikasi Mustahik Program Beasiswa'),
  (SELECT id FROM users WHERE email = 'admin@ziswaf.com' LIMIT 1),
  'Terima kasih atas progress yang sudah dicapai. Mohon untuk form assessment juga segera diselesaikan.',
  45,
  ARRAY[]::TEXT[]
);

```

# scripts\seed-notifications-data.sql

```sql
-- Insert sample notification preferences for existing users
INSERT INTO notification_preferences (user_id, email_notifications, push_notifications, document_verification, read_requests, document_status)
SELECT 
    id,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE
FROM users
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample notifications for admin users
INSERT INTO notifications (type, title, message, document_id, from_user_id, to_user_id, is_read, requires_action, action_type, metadata)
SELECT 
    'read_confirmation',
    'Konfirmasi Pembacaan',
    'Ahmad Fauzi telah membaca dokumen ' || d.title,
    d.id,
    u1.id,
    u2.id,
    FALSE,
    FALSE,
    NULL,
    '{"priority": "medium"}'::jsonb
FROM documents d
CROSS JOIN (SELECT id FROM users WHERE role = 'user' LIMIT 1) u1
CROSS JOIN (SELECT id FROM users WHERE role = 'admin' LIMIT 1) u2
WHERE d.title LIKE '%SOP%'
LIMIT 3;

-- Insert sample verification requests for admin
INSERT INTO notifications (type, title, message, document_id, from_user_id, to_user_id, is_read, requires_action, action_type, metadata)
SELECT 
    'document_verification',
    'Permintaan Verifikasi',
    'Dokumen baru memerlukan verifikasi: ' || d.title,
    d.id,
    u1.id,
    u2.id,
    FALSE,
    TRUE,
    'verify_document',
    '{"priority": "high"}'::jsonb
FROM documents d
CROSS JOIN (SELECT id FROM users WHERE role = 'user' LIMIT 1) u1
CROSS JOIN (SELECT id FROM users WHERE role = 'admin' LIMIT 1) u2
WHERE d.verification_status = 'pending'
LIMIT 2;

-- Insert sample read requests for users
INSERT INTO notifications (type, title, message, document_id, from_user_id, to_user_id, is_read, requires_action, action_type, metadata)
SELECT 
    'read_request',
    'Permintaan Baca Dokumen',
    'Admin meminta Anda untuk membaca: ' || d.title,
    d.id,
    u1.id,
    u2.id,
    FALSE,
    TRUE,
    'mark_as_read',
    jsonb_build_object(
        'priority', 'high',
        'deadline', (NOW() + INTERVAL '7 days')::text
    )
FROM documents d
CROSS JOIN (SELECT id FROM users WHERE role = 'admin' LIMIT 1) u1
CROSS JOIN (SELECT id FROM users WHERE role = 'user' LIMIT 1) u2
WHERE d.is_mandatory = TRUE
LIMIT 2;

-- Insert sample document status notifications for users
INSERT INTO notifications (type, title, message, document_id, from_user_id, to_user_id, is_read, requires_action, action_type, metadata)
SELECT 
    'document_status',
    'Status Verifikasi',
    CASE 
        WHEN d.verification_status = 'approved' THEN 'Dokumen Anda "' || d.title || '" telah disetujui'
        WHEN d.verification_status = 'rejected' THEN 'Dokumen Anda "' || d.title || '" ditolak'
        ELSE 'Dokumen Anda "' || d.title || '" memerlukan revisi'
    END,
    d.id,
    u1.id,
    u2.id,
    FALSE,
    CASE WHEN d.verification_status = 'revision_requested' THEN TRUE ELSE FALSE END,
    CASE WHEN d.verification_status = 'revision_requested' THEN 'respond' ELSE NULL END,
    jsonb_build_object(
        'verification_status', d.verification_status,
        'priority', CASE WHEN d.verification_status = 'revision_requested' THEN 'medium' ELSE 'low' END
    )
FROM documents d
CROSS JOIN (SELECT id FROM users WHERE role = 'admin' LIMIT 1) u1
CROSS JOIN (SELECT id FROM users WHERE role = 'user' LIMIT 1) u2
WHERE d.verification_status IN ('approved', 'rejected', 'revision_requested')
LIMIT 3;

-- Update timestamps to make notifications appear recent
UPDATE notifications 
SET created_at = NOW() - (RANDOM() * INTERVAL '7 days')
WHERE created_at < NOW() - INTERVAL '1 day';

```

# scripts\seed-scholarship-data.sql

```sql
-- Insert sample scholarship programs
INSERT INTO scholarship_programs (name, description, status, budget, recipients, target_recipients, start_date, end_date, department, coordinator_id) VALUES
('Beasiswa Mahasiswa Dhuafa 2024', 'Program beasiswa untuk mahasiswa kurang mampu tingkat S1', 'active', 2000000000, 150, 200, '2024-01-01', '2024-12-31', 'Pendayagunaan', (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1)),
('Beasiswa Santri Berprestasi', 'Beasiswa untuk santri berprestasi di pondok pesantren', 'planning', 1500000000, 0, 100, '2024-03-01', '2024-12-31', 'Pendayagunaan', (SELECT id FROM users WHERE email = 'siti.nurhaliza@ziswaf.com' LIMIT 1)),
('Beasiswa Mahasiswa S2 Unggulan', 'Program beasiswa untuk mahasiswa S2 dengan prestasi akademik tinggi', 'active', 3000000000, 25, 50, '2024-02-01', '2025-01-31', 'Pendayagunaan', (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1));

-- Insert document request templates
INSERT INTO document_request_templates (name, description, category, data_fields, deliverable_templates) VALUES
('Profil Penerima Beasiswa', 'Template untuk laporan profil dan karakteristik penerima beasiswa', 'reporting', 
 ARRAY['Jumlah penerima per wilayah', 'Distribusi jenjang pendidikan', 'Profil ekonomi keluarga', 'Prestasi akademik'],
 ARRAY['Dashboard interaktif profil penerima', 'Laporan PDF dengan visualisasi data', 'Dataset Excel untuk analisis lanjutan']),
('Evaluasi Dampak Program', 'Template untuk evaluasi dampak dan efektivitas program beasiswa', 'evaluation',
 ARRAY['Perbandingan prestasi akademik', 'Tingkat kelulusan', 'Dampak sosial ekonomi', 'Feedback penerima'],
 ARRAY['Laporan evaluasi dampak', 'Rekomendasi perbaikan program', 'Presentasi untuk stakeholder']),
('Laporan Keuangan Program', 'Template untuk laporan penggunaan dana dan alokasi budget', 'financial',
 ARRAY['Total dana tersalurkan', 'Breakdown per kategori', 'Efisiensi penggunaan dana', 'Proyeksi kebutuhan'],
 ARRAY['Laporan keuangan lengkap', 'Dashboard monitoring budget', 'Analisis cost-effectiveness']);

-- Insert sample document requests
INSERT INTO document_requests (program_id, title, description, requested_by, assigned_to, priority, due_date, status, data_requirements, deliverables, template_type, progress) VALUES
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Laporan Profil Penerima Beasiswa Q4 2024',
 'Laporan komprehensif tentang profil dan karakteristik penerima beasiswa',
 (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1),
 'Tim Data',
 'high',
 '2024-12-31',
 'in_progress',
 ARRAY['Jumlah total penerima beasiswa per wilayah', 'Distribusi penerima berdasarkan jenjang pendidikan', 'Profil ekonomi keluarga penerima', 'Prestasi akademik rata-rata penerima', 'Tingkat kelulusan dan keberlanjutan studi'],
 ARRAY['Dashboard interaktif profil penerima', 'Laporan PDF dengan visualisasi data', 'Dataset Excel untuk analisis lanjutan'],
 'recipient_profile',
 65),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Evaluasi Dampak Program Beasiswa',
 'Analisis dampak program beasiswa terhadap prestasi dan kondisi sosial ekonomi penerima',
 (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1),
 'Tim Evaluasi',
 'medium',
 '2025-01-15',
 'pending',
 ARRAY['Perbandingan IPK sebelum dan sesudah menerima beasiswa', 'Tingkat partisipasi dalam kegiatan kampus', 'Perubahan kondisi ekonomi keluarga', 'Feedback dan testimoni penerima beasiswa'],
 ARRAY['Laporan evaluasi dampak', 'Rekomendasi perbaikan program', 'Presentasi untuk stakeholder'],
 'impact_evaluation',
 0);

-- Insert sample scholarship recipients
INSERT INTO scholarship_recipients (program_id, name, email, phone, address, education_level, institution, gpa, family_income, province, city, gender, birth_date, status, scholarship_amount, start_date, end_date) VALUES
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Ahmad Rizki Pratama', 'ahmad.rizki@email.com', '081234567890', 'Jl. Merdeka No. 123, Jakarta', 'S1', 'Universitas Indonesia', 3.75, 2500000, 'DKI Jakarta', 'Jakarta Pusat', 'male', '2002-05-15', 'active', 5000000, '2024-01-15', '2024-12-31'),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Siti Nurhaliza Putri', 'siti.nurhaliza@email.com', '081234567891', 'Jl. Sudirman No. 456, Bandung', 'S1', 'Institut Teknologi Bandung', 3.85, 2000000, 'Jawa Barat', 'Bandung', 'female', '2001-08-22', 'active', 5000000, '2024-01-15', '2024-12-31'),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa Dhuafa 2024' LIMIT 1),
 'Muhammad Fajar Sidiq', 'fajar.sidiq@email.com', '081234567892', 'Jl. Diponegoro No. 789, Yogyakarta', 'S1', 'Universitas Gadjah Mada', 3.65, 1800000, 'DI Yogyakarta', 'Yogyakarta', 'male', '2002-12-10', 'active', 5000000, '2024-01-15', '2024-12-31'),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa S2 Unggulan' LIMIT 1),
 'Dr. Andi Wijaya', 'andi.wijaya@email.com', '081234567893', 'Jl. Thamrin No. 321, Jakarta', 'S2', 'Universitas Indonesia', 3.90, 3000000, 'DKI Jakarta', 'Jakarta Selatan', 'male', '1995-03-18', 'active', 10000000, '2024-02-01', '2025-01-31'),
((SELECT id FROM scholarship_programs WHERE name = 'Beasiswa Mahasiswa S2 Unggulan' LIMIT 1),
 'Dewi Sartika Maharani', 'dewi.sartika@email.com', '081234567894', 'Jl. Gatot Subroto No. 654, Surabaya', 'S2', 'Institut Teknologi Sepuluh Nopember', 3.95, 2800000, 'Jawa Timur', 'Surabaya', 'female', '1994-07-25', 'active', 10000000, '2024-02-01', '2025-01-31');

-- Insert sample document request updates
INSERT INTO document_request_updates (request_id, user_id, progress, note) VALUES
((SELECT id FROM document_requests WHERE title = 'Laporan Profil Penerima Beasiswa Q4 2024' LIMIT 1),
 (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1),
 30,
 'Data collection phase completed. Started data analysis and visualization.'),
((SELECT id FROM document_requests WHERE title = 'Laporan Profil Penerima Beasiswa Q4 2024' LIMIT 1),
 (SELECT id FROM users WHERE email = 'ahmad.fauzi@ziswaf.com' LIMIT 1),
 65,
 'Dashboard prototype ready for review. Waiting for feedback before finalization.');

```

# scripts\update-activities-schema.sql

```sql
-- Update activities table with more detailed fields
ALTER TABLE activities ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low'));
ALTER TABLE activities ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100);
ALTER TABLE activities ADD COLUMN IF NOT EXISTS budget BIGINT DEFAULT 0;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS target_beneficiaries INTEGER DEFAULT 0;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS current_beneficiaries INTEGER DEFAULT 0;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE activities ADD COLUMN IF NOT EXISTS departments TEXT[];

-- Create activity_participants table
CREATE TABLE IF NOT EXISTS activity_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(100),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, user_id)
);

-- Create activity_documents table
CREATE TABLE IF NOT EXISTS activity_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, document_id)
);

-- Create activity_meetings table
CREATE TABLE IF NOT EXISTS activity_meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  attendees_count INTEGER DEFAULT 0,
  meeting_notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_discussions table
CREATE TABLE IF NOT EXISTS activity_discussions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  parent_id UUID REFERENCES activity_discussions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_milestones table
CREATE TABLE IF NOT EXISTS activity_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_date DATE NOT NULL,
  completion_date DATE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activity_participants_activity_id ON activity_participants(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_participants_user_id ON activity_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_documents_activity_id ON activity_documents(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_meetings_activity_id ON activity_meetings(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_discussions_activity_id ON activity_discussions(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_milestones_activity_id ON activity_milestones(activity_id);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_priority ON activities(priority);

```

# scripts\update-documents-link-support.sql

```sql
-- Add support for link-based documents
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS external_url TEXT,
ADD COLUMN IF NOT EXISTS document_type VARCHAR(10) DEFAULT 'file' CHECK (document_type IN ('file', 'link')),
ADD COLUMN IF NOT EXISTS platform VARCHAR(50);

-- Update existing documents to have document_type = 'file'
UPDATE documents SET document_type = 'file' WHERE document_type IS NULL;

-- Make file_url nullable for link documents
ALTER TABLE documents ALTER COLUMN file_url DROP NOT NULL;
ALTER TABLE documents ALTER COLUMN file_size DROP NOT NULL;

-- Add constraint to ensure either file_url or external_url is provided
ALTER TABLE documents ADD CONSTRAINT check_document_url 
CHECK (
  (document_type = 'file' AND file_url IS NOT NULL) OR 
  (document_type = 'link' AND external_url IS NOT NULL)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);
CREATE INDEX IF NOT EXISTS idx_documents_platform ON documents(platform) WHERE platform IS NOT NULL;

-- Insert sample link documents
INSERT INTO documents (
  id, title, description, external_url, document_type, platform, file_type, 
  category, department, tags, uploaded_by, author, version, location, 
  priority, access_level, language, created_at, updated_at
) VALUES 
(
  gen_random_uuid(),
  'Template Proposal Kegiatan Ziswaf',
  'Template Google Docs untuk membuat proposal kegiatan pendayagunaan ziswaf',
  'https://docs.google.com/document/d/1234567890/edit',
  'link',
  'google-docs',
  'GDOC',
  'Template',
  'Pendayagunaan',
  ARRAY['template', 'proposal', 'ziswaf'],
  (SELECT id FROM users WHERE role = 'admin' LIMIT 1),
  'Tim Pendayagunaan',
  '2.0',
  '/templates/pendayagunaan/',
  'medium',
  'organizational',
  'id',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Dashboard Monitoring Penyaluran',
  'Dashboard Google Sheets untuk monitoring real-time penyaluran dana ziswaf',
  'https://docs.google.com/spreadsheets/d/0987654321/edit',
  'link',
  'google-sheets',
  'GSHEET',
  'Dashboard',
  'Pendayagunaan',
  ARRAY['monitoring', 'dashboard', 'penyaluran'],
  (SELECT id FROM users WHERE role = 'admin' LIMIT 1),
  'Tim Monitoring',
  '1.5',
  '/dashboards/pendayagunaan/',
  'high',
  'departmental',
  'id',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Presentasi Laporan Tahunan 2024',
  'Presentasi Google Slides untuk laporan tahunan kegiatan ziswaf 2024',
  'https://docs.google.com/presentation/d/1122334455/edit',
  'link',
  'google-slides',
  'GSLIDE',
  'Presentasi',
  'Keuangan',
  ARRAY['laporan', 'tahunan', '2024', 'presentasi'],
  (SELECT id FROM users WHERE role = 'admin' LIMIT 1),
  'Tim Keuangan',
  '3.1',
  '/presentations/keuangan/',
  'high',
  'organizational',
  'id',
  NOW(),
  NOW()
);

```

# scripts\update-documents-mandatory-fields.sql

```sql
-- Add mandatory and starred fields to documents table
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS is_starred BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_mandatory BOOLEAN DEFAULT FALSE;

-- Create index for better performance on mandatory document queries
CREATE INDEX IF NOT EXISTS idx_documents_mandatory ON documents(is_mandatory, is_starred);

-- Update some existing documents to be mandatory (example data)
UPDATE documents 
SET is_mandatory = TRUE, is_starred = TRUE, updated_at = NOW()
WHERE title LIKE '%Panduan%' OR title LIKE '%SOP%' OR category = 'Panduan';

-- Add comment to track changes
COMMENT ON COLUMN documents.is_starred IS 'Admin-controlled mandatory reading indicator';
COMMENT ON COLUMN documents.is_mandatory IS 'Whether document is mandatory for all users';

```

# scripts\update-documents-schema.sql

```sql
-- Add additional fields to documents table for comprehensive document management
ALTER TABLE documents ADD COLUMN IF NOT EXISTS version VARCHAR(20) DEFAULT '1.0';
ALTER TABLE documents ADD COLUMN IF NOT EXISTS location VARCHAR(500);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical'));
ALTER TABLE documents ADD COLUMN IF NOT EXISTS access_level VARCHAR(50) DEFAULT 'departmental' CHECK (access_level IN ('departmental', 'organizational', 'public'));
ALTER TABLE documents ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'id';
ALTER TABLE documents ADD COLUMN IF NOT EXISTS expiry_date DATE;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS related_documents TEXT;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS author VARCHAR(255);

-- Create document_categories table for better categorization
CREATE TABLE IF NOT EXISTS document_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(20) DEFAULT '#gray',
  icon VARCHAR(50),
  department VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_locations table for file organization
CREATE TABLE IF NOT EXISTS document_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path VARCHAR(500) NOT NULL UNIQUE,
  description TEXT,
  department VARCHAR(100),
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_versions table for version control
CREATE TABLE IF NOT EXISTS document_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  version VARCHAR(20) NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  change_notes TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_location ON documents(location);
CREATE INDEX IF NOT EXISTS idx_documents_priority ON documents(priority);
CREATE INDEX IF NOT EXISTS idx_documents_access_level ON documents(access_level);
CREATE INDEX IF NOT EXISTS idx_documents_expiry_date ON documents(expiry_date);
CREATE INDEX IF NOT EXISTS idx_documents_author ON documents(author);
CREATE INDEX IF NOT EXISTS idx_document_versions_document_id ON document_versions(document_id);
CREATE INDEX IF NOT EXISTS idx_document_categories_department ON document_categories(department);
CREATE INDEX IF NOT EXISTS idx_document_locations_department ON document_locations(department);

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

