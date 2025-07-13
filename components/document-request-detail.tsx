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
