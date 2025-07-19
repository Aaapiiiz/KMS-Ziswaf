"use client"

import type React from "react"
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
      // toast({
      //   title: "Error",
      //   description: "Mohon lengkapi semua field yang diperlukan",
      //   variant: "destructive",
      // })
      return
    }

    // Here you would typically save to database
    console.log("Saving Ziswaf data:", ziswafData)

    // toast({
    //   title: "Berhasil",
    //   description: "Data laporan ziswaf berhasil disimpan",
    // })

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
      // toast({
      //   title: "Error",
      //   description: "Mohon lengkapi data yang diperlukan",
      //   variant: "destructive",
      // })
      return
    }

    console.log("Saving Metrics data:", metricsData)

    // toast({
    //   title: "Berhasil",
    //   description: "Data dashboard berhasil diperbarui",
    // })

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
      // toast({
      //   title: "Error",
      //   description: "Nama dan deskripsi aktivitas harus diisi",
      //   variant: "destructive",
      // })
      return
    }

    console.log("Saving Activity data:", activityData)

    // toast({
    //   title: "Berhasil",
    //   description: "Aktivitas baru berhasil ditambahkan",
    // })

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

  // --- PERBAIKAN DI SINI ---
  // Fungsi ini dibuat generik untuk menerima berbagai bentuk state object
  // dengan aman, yang menyelesaikan semua error TypeScript.
  const handleCurrencyChange = <T extends Record<string, string>>(
    value: string,
    field: keyof T,
    setState: React.Dispatch<React.SetStateAction<T>>,
    state: T
  ) => {
    const numericValue = value.replace(/\D/g, "");
    setState({
      ...state,
      [field]: numericValue,
    });
  };


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