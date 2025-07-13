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
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Pengaturan
          </Button>
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
