// app/(dashboard)/admin/users/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Mail, UserCheck, UserX, Loader2 } from "lucide-react"
import { AdminRouteGuard } from "@/components/admin-route-guard"
import { getUsers, supabase, updateUser } from "@/lib/supabase" // MODIFIED: import updateUser
import type { User } from "@/lib/supabase"

const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "Keuangan", "SDM", "IT", "Marketing", "Operasional", "Audit", "Penyaluran"]
const roles = ["Semua", "admin", "user"]
const statuses = ["Semua", "active", "inactive", "pending"]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("Semua")
  const [roleFilter, setRoleFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState("Semua")

  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", department: "", role: "user" as "admin" | "user", password: "" })

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers || [])
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "Semua" || user.department === departmentFilter
    const matchesRole = roleFilter === "Semua" || user.role === roleFilter
    const matchesStatus = statusFilter === "Semua" || user.status === statusFilter
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.department || !newUser.password) {
      alert("Please fill all required fields.")
      return
    }
    
    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: newUser.email,
      password: newUser.password,
      options: {
        data: {
          name: newUser.name,
          department: newUser.department,
        },
      },
    })

    if (authError) {
      console.error("Error creating auth user:", authError)
      alert(`Failed to create user: ${authError.message}`)
      return
    }
    
    // The handle_new_user trigger should have created the user in public.users table.
    // We just need to update its role if it's admin.
    if (authData.user && newUser.role === 'admin') {
        const { error: roleError } = await updateUser(authData.user.id, { role: 'admin' });
        if (roleError) {
            console.error("Error setting user role to admin:", roleError);
            alert("User created, but failed to set admin role.");
        }
    }
    
    alert("User added successfully!");
    await fetchUsers(); // Refresh the user list
    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", department: "", role: "user", password: "" });
  }

  const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
    const { data, error } = await updateUser(userId, updates);
    if(error) {
        alert(`Failed to update user: ${error.message}`);
    } else {
        alert("User updated successfully!");
        setUsers(users.map(u => u.id === userId ? { ...u, ...data } : u));
        setEditingUser(null);
    }
  }


  const getRoleColor = (role: string) => (role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700")
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700"
      case "inactive": return "bg-red-100 text-red-700"
      case "pending": return "bg-yellow-100 text-yellow-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }
  const getRoleText = (role: string) => role.charAt(0).toUpperCase() + role.slice(1)
  const getStatusText = (status: string) => status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <AdminRouteGuard>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
            <p className="text-gray-600">Kelola pengguna dan hak akses sistem</p>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" /> Tambah Pengguna
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                <DialogDescription>Buat akun baru dan tentukan role serta departemen.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="add-name" className="text-right">Nama</Label><Input id="add-name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="col-span-3"/></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="add-email" className="text-right">Email</Label><Input id="add-email" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="col-span-3"/></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="add-password" className="text-right">Password</Label><Input id="add-password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="col-span-3"/></div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="add-department" className="text-right">Departemen</Label>
                  <Select value={newUser.department} onValueChange={(value) => setNewUser({ ...newUser, department: value })}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih Departemen" /></SelectTrigger>
                    <SelectContent>{departments.filter((d) => d !== "Semua").map((dept) => (<SelectItem key={dept} value={dept}>{dept}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="add-role" className="text-right">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value as "admin" | "user" })}>
                    <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="user">User</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Batal</Button><Button type="submit" onClick={handleAddUser}>Tambah</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><Input placeholder="Cari nama atau email pengguna..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/></div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}><SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Departemen" /></SelectTrigger><SelectContent>{departments.map((dept) => (<SelectItem key={dept} value={dept}>{dept}</SelectItem>))}</SelectContent></Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}><SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Role" /></SelectTrigger><SelectContent>{roles.map((role) => (<SelectItem key={role} value={role}>{getRoleText(role)}</SelectItem>))}</SelectContent></Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent>{statuses.map((status) => (<SelectItem key={status} value={status}>{getStatusText(status)}</SelectItem>))}</SelectContent></Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Daftar Pengguna</CardTitle><CardDescription>Total {filteredUsers.length} pengguna ditemukan</CardDescription></CardHeader>
          <CardContent>
            <Table>
              
              <TableHeader><TableRow><TableHead>Pengguna</TableHead><TableHead>Departemen</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
              <TableBody>
                {loading ? (<TableRow><TableCell colSpan={6} className="text-center py-8"><Loader2 className="mx-auto w-6 h-6 animate-spin" /></TableCell></TableRow>) 
                : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell><div className="flex items-center space-x-3"><Avatar className="w-8 h-8"><AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.name} /><AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar><div><div className="font-medium">{user.name}</div><div className="text-sm text-gray-500">{user.email}</div></div></div></TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell><Badge className={getRoleColor(user.role)}>{getRoleText(user.role)}</Badge></TableCell>
                      <TableCell><Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge></TableCell>
                      {/* <TableCell className="text-sm text-gray-500">{user.last_login ? new Date(user.last_login).toLocaleString("id-ID") : "Never"}</TableCell> */}
                      <TableCell className="text-right">
                        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end"><DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => setEditingUser(user)}><Edit className="mr-2 h-4 w-4" />Edit Pengguna</DropdownMenuItem>
                            <DropdownMenuItem><Mail className="mr-2 h-4 w-4" />Kirim Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (<DropdownMenuItem onClick={() => handleUpdateUser(user.id, { status: 'inactive' })}><UserX className="mr-2 h-4 w-4" />Nonaktifkan</DropdownMenuItem>) 
                            : (<DropdownMenuItem onClick={() => handleUpdateUser(user.id, { status: 'active' })}><UserCheck className="mr-2 h-4 w-4" />Aktifkan</DropdownMenuItem>)}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Hapus Pengguna</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (<TableRow><TableCell colSpan={6} className="py-8 text-center text-gray-500">Tidak ada pengguna ditemukan.</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Edit Pengguna</DialogTitle><DialogDescription>Perbarui informasi dan role untuk {editingUser?.name}.</DialogDescription></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-name" className="text-right">Nama</Label><Input id="edit-name" defaultValue={editingUser?.name} className="col-span-3" onBlur={(e) => setEditingUser(u => u ? {...u, name: e.target.value} : null)} /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-email" className="text-right">Email</Label><Input id="edit-email" type="email" defaultValue={editingUser?.email} className="col-span-3" disabled /></div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">Departemen</Label>
                <Select defaultValue={editingUser?.department} onValueChange={(v) => setEditingUser(u => u ? {...u, department: v} : null)}>
                    <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                    <SelectContent>{departments.filter((d) => d !== "Semua").map((dept) => (<SelectItem key={dept} value={dept}>{dept}</SelectItem>))}</SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">Role</Label>
                <Select defaultValue={editingUser?.role} onValueChange={(v) => setEditingUser(u => u ? {...u, role: v as "admin" | "user"} : null)}>
                    <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                    <SelectContent>{roles.filter((r) => r !== "Semua").map((role) => (<SelectItem key={role} value={role}>{getRoleText(role)}</SelectItem>))}</SelectContent>
                </Select>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEditingUser(null)}>Batal</Button><Button type="submit" onClick={() => editingUser && handleUpdateUser(editingUser.id, { name: editingUser.name, department: editingUser.department, role: editingUser.role })}>Simpan Perubahan</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminRouteGuard>
  )
}