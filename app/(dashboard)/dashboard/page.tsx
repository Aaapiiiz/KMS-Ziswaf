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
