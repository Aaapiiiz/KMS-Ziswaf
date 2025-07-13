"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Settings, Moon, Sun, Monitor, Bell, Globe, Palette, Volume2, Save, RotateCcw } from "lucide-react"

export default function PreferencesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("id")
  const [timezone, setTimezone] = useState("Asia/Jakarta")
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy")
  const [soundVolume, setSoundVolume] = useState([75])

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleReset = () => {
    setTheme("system")
    setLanguage("id")
    setTimezone("Asia/Jakarta")
    setDateFormat("dd/mm/yyyy")
    setSoundVolume([75])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Preferensi</h1>
        <p className="text-muted-foreground">Sesuaikan pengalaman menggunakan aplikasi sesuai keinginan Anda</p>
      </div>

      <div className="grid gap-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Tampilan
            </CardTitle>
            <CardDescription>Atur tema dan tampilan aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Tema</Label>
              <RadioGroup value={theme} onValueChange={setTheme}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Terang
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Gelap
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Ikuti Sistem
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mode Kompak</Label>
                <p className="text-sm text-muted-foreground">
                  Tampilkan lebih banyak konten dalam ruang yang lebih kecil
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animasi</Label>
                <p className="text-sm text-muted-foreground">Aktifkan animasi dan transisi</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Bahasa & Wilayah
            </CardTitle>
            <CardDescription>Atur bahasa, zona waktu, dan format tampilan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Bahasa</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Zona Waktu</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Jakarta">WIB (Jakarta)</SelectItem>
                    <SelectItem value="Asia/Makassar">WITA (Makassar)</SelectItem>
                    <SelectItem value="Asia/Jayapura">WIT (Jayapura)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Format Tanggal</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifikasi
            </CardTitle>
            <CardDescription>Atur bagaimana dan kapan Anda menerima notifikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Desktop</Label>
                <p className="text-sm text-muted-foreground">Tampilkan notifikasi di desktop</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Suara Notifikasi</Label>
                <p className="text-sm text-muted-foreground">Putar suara saat ada notifikasi baru</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Volume Suara
                </Label>
                <Badge variant="outline">{soundVolume[0]}%</Badge>
              </div>
              <Slider value={soundVolume} onValueChange={setSoundVolume} max={100} step={5} className="w-full" />
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-base">Jenis Notifikasi</Label>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-normal">Dokumen Baru</Label>
                    <p className="text-xs text-muted-foreground">Saat ada dokumen baru ditambahkan</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-normal">Permintaan Verifikasi</Label>
                    <p className="text-xs text-muted-foreground">Saat dokumen memerlukan verifikasi</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-normal">Aktivitas Tim</Label>
                    <p className="text-xs text-muted-foreground">Saat ada aktivitas dari anggota tim</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-normal">Laporan Sistem</Label>
                    <p className="text-xs text-muted-foreground">Laporan otomatis dan pemeliharaan sistem</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Pengaturan Umum
            </CardTitle>
            <CardDescription>Pengaturan aplikasi dan perilaku sistem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-save</Label>
                <p className="text-sm text-muted-foreground">Simpan perubahan secara otomatis</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Konfirmasi Sebelum Hapus</Label>
                <p className="text-sm text-muted-foreground">Tampilkan konfirmasi sebelum menghapus item</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sinkronisasi Otomatis</Label>
                <p className="text-sm text-muted-foreground">Sinkronkan data secara otomatis</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Jumlah Item per Halaman</Label>
              <Select defaultValue="20">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 item</SelectItem>
                  <SelectItem value="20">20 item</SelectItem>
                  <SelectItem value="50">50 item</SelectItem>
                  <SelectItem value="100">100 item</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset ke Default
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Menyimpan..." : "Simpan Preferensi"}
          </Button>
        </div>
      </div>
    </div>
  )
}
