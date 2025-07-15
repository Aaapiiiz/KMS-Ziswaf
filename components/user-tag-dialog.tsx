"use client"

import type React from "react";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, AtSign, Search, Plus, X } from "lucide-react"

// Mock users for tagging
const users = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad.fauzi@ziswaf.com", department: "Pendayagunaan" },
  { id: 2, name: "Siti Nurhaliza", email: "siti.nurhaliza@ziswaf.com", department: "Pendayagunaan" },
  { id: 3, name: "Budi Santoso", email: "budi.santoso@ziswaf.com", department: "IT" },
  { id: 4, name: "Maya Sari", email: "maya.sari@ziswaf.com", department: "Keuangan" },
  { id: 5, name: "Andi Rahman", email: "andi.rahman@ziswaf.com", department: "SDM" },
  { id: 6, name: "Dewi Sartika", email: "dewi.sartika@ziswaf.com", department: "Marketing" },
  { id: 7, name: "Rizki Pratama", email: "rizki.pratama@ziswaf.com", department: "Operasional" },
  { id: 8, name: "Fatimah Zahra", email: "fatimah.zahra@ziswaf.com", department: "Audit" },
]

interface UserTagDialogProps {
  taggedUsers: typeof users
  onUserTag: (user: (typeof users)[0]) => void
  onUserUntag: (userId: number) => void
  trigger?: React.ReactNode
}

export function UserTagDialog({ taggedUsers, onUserTag, onUserUntag, trigger }: UserTagDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const isUserTagged = (userId: number) => taggedUsers.some((user) => user.id === userId)

  const handleUserToggle = (user: (typeof users)[0]) => {
    if (isUserTagged(user.id)) {
      onUserUntag(user.id)
    } else {
      onUserTag(user)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <AtSign className="w-4 h-4 mr-2" />
            Tag Pengguna
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tag Pengguna untuk Request Dokumen</DialogTitle>
          <DialogDescription>
            Pilih pengguna yang perlu diberitahu tentang dokumen ini. Mereka akan menerima notifikasi.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari pengguna berdasarkan nama, email, atau departemen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tagged Users Summary */}
          {taggedUsers.length > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">Pengguna yang Di-tag ({taggedUsers.length}):</p>
              <div className="flex flex-wrap gap-1">
                {taggedUsers.map((user) => (
                  <Badge key={user.id} variant="secondary" className="text-xs">
                    <AtSign className="w-3 h-3 mr-1" />
                    {user.name}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => onUserUntag(user.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Users List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                  isUserTagged(user.id) ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">{user.department}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant={isUserTagged(user.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleUserToggle(user)}
                >
                  {isUserTagged(user.id) ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Untag
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Tag
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada pengguna ditemukan</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={() => setOpen(false)}>Selesai ({taggedUsers.length} pengguna di-tag)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
