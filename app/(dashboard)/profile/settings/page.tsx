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
