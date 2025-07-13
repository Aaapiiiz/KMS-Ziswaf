"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Clock, User, Calendar, Plus, Eye, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import Link from "next/link"

// Mock data
const knowledgeRequests = [
  {
    id: 1,
    title: "Prosedur Penyaluran Bantuan Pendidikan",
    description:
      "Saya membutuhkan informasi detail tentang prosedur dan persyaratan penyaluran bantuan pendidikan untuk mahasiswa.",
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
    description:
      "Apakah ada template standar untuk laporan keuangan bulanan yang harus digunakan oleh semua departemen?",
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
]

export default function KnowledgeRequestsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Terbuka"
      case "in_progress":
        return "Dalam Proses"
      case "resolved":
        return "Terjawab"
      case "closed":
        return "Ditutup"
      default:
        return "Unknown"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <XCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permintaan Pengetahuan</h1>
          <p className="text-muted-foreground">Ajukan pertanyaan dan berbagi pengetahuan dengan tim</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajukan Pertanyaan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Permintaan</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terbuka</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Menunggu jawaban</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Sedang diproses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terjawab</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">118</div>
            <p className="text-xs text-muted-foreground">Sudah terjawab</p>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Requests List */}
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
                      <Link href={`/knowledge-requests/${request.id}`} className="hover:underline">
                        {request.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(request.priority)}>{request.priority.toUpperCase()}</Badge>
                    <Badge className={getStatusColor(request.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {getStatusText(request.status)}
                      </div>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Request Details */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {request.requester}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {request.requestDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {request.responses} respons
                    </div>
                  </div>

                  {/* Category and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{request.category}</Badge>
                      <span className="text-sm text-muted-foreground">Departemen {request.department}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/knowledge-requests/${request.id}`}>
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

        <TabsContent value="open">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Menampilkan permintaan yang masih terbuka</p>
          </div>
        </TabsContent>

        <TabsContent value="in_progress">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Menampilkan permintaan yang sedang diproses</p>
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Menampilkan permintaan yang sudah terjawab</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
