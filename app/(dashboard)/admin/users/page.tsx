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