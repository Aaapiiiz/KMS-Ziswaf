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
import { Search, Plus, MoreHorizontal, Edit, Trash2, UserCheck, UserX, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { AdminRouteGuard } from "@/components/admin-route-guard"

const users = [
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
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("Semua")
  const [roleFilter, setRoleFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState("Semua")
  const router = useRouter()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "Semua" || user.department === departmentFilter
    const matchesRole = roleFilter === "Semua" || user.role === roleFilter
    const matchesStatus = statusFilter === "Semua" || user.status === statusFilter

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

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
    switch (role) {
      case "admin":
        return "Admin"
      case "user":
        return "User"
      default:
        return role
    }
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
        {/* Breadcrumb Navigation */}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
            <p className="text-gray-600">Kelola pengguna dan hak akses sistem</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Pengguna
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari nama atau email pengguna..."
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

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role === "Semua" ? "Semua" : getRoleText(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "Semua" ? "Semua" : getStatusText(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
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
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>{getRoleText(user.role)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Pengguna
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Kirim Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem>
                              <UserX className="mr-2 h-4 w-4" />
                              Nonaktifkan
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Aktifkan
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus Pengguna
                          </DropdownMenuItem>
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
    </AdminRouteGuard>
  )
}
