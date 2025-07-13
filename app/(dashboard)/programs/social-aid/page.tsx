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
