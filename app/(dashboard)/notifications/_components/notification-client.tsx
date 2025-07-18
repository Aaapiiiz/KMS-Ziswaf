// ngejerwisokto/app/(dashboard)/notifications/_components/notification-client.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, FileText, Users, Settings, Trash2, Loader2 } from "lucide-react";

// This interface must match the shape of the data we fetch
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  requires_action: boolean;
  created_at: string;
  // This is how the JOIN result will be structured
  sender: {
    name: string | null;
    avatar_url: string | null;
  } | null;
}

export function NotificationClient() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // FIX: Use `!inner` to ensure the join returns a single object, not an array.
        const { data, error } = await supabase
          .from('notifications')
          .select(`
            id,
            type,
            title,
            message,
            is_read,
            requires_action,
            created_at,
            sender:from_user_id!inner ( name, avatar_url )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

      // FIX for TypeScript error: Transform the data to ensure sender is an object
      const transformedData = data.map(n => ({
        ...n,
        // Ensure sender is an object, not an array with one object
        sender: Array.isArray(n.sender) ? n.sender[0] : n.sender,
      }));
      
      setNotifications((transformedData as Notification[]) || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        alert("Gagal memuat notifikasi.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (activeTab === "unread" && notification.is_read) return false;
      if (activeTab === "action_required" && !notification.requires_action) return false;
      if (filterType !== "all" && notification.type !== filterType) return false;
      return true;
    });
  }, [notifications, activeTab, filterType]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "document_verification": return <FileText className="w-5 h-5 text-blue-500" />;
      case "activity_update": return <Users className="w-5 h-5 text-green-500" />;
      case "knowledge_request": return <Bell className="w-5 h-5 text-purple-500" />;
      case "system": return <Settings className="w-5 h-5 text-gray-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    return date.toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const markAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
  };

  const deleteNotification = async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    await supabase.from('notifications').delete().eq('id', id);
  };
  
  const unreadCount = useMemo(() => notifications.filter(n => !n.is_read).length, [notifications]);
  const actionRequiredCount = useMemo(() => notifications.filter(n => n.requires_action && !n.is_read).length, [notifications]);

  return (
    <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
            <p className="text-gray-600">Kelola dan pantau semua notifikasi sistem</p>
            </div>
            <div className="flex items-center gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Filter Tipe" /></SelectTrigger>
                <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="document_verification">Verifikasi Dokumen</SelectItem>
                <SelectItem value="activity_update">Update Aktivitas</SelectItem>
                <SelectItem value="knowledge_request">Knowledge Request</SelectItem>
                <SelectItem value="system">Sistem</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Daftar Notifikasi</CardTitle>
                <CardDescription>Kelola notifikasi berdasarkan kategori</CardDescription>
            </CardHeader>
            <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Semua ({notifications.length})</TabsTrigger>
                    <TabsTrigger value="unread">Belum Dibaca ({unreadCount})</TabsTrigger>
                    <TabsTrigger value="action_required">Perlu Tindakan ({actionRequiredCount})</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="space-y-4 mt-6">
                {loading ? (
                    <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
                ) : filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border rounded-lg transition-colors ${!notification.is_read ? "bg-blue-50 border-blue-200" : "bg-white"}`}>
                        <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                            <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1">
                            <h4 className={`font-medium ${!notification.is_read ? "text-gray-900" : "text-gray-700"}`}>{notification.title}</h4>
                            <p className="text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-2">
                                <Avatar className="w-5 h-5">
                                    <AvatarImage src={notification.sender?.avatar_url || "/placeholder.svg"} alt={notification.sender?.name || 'System'} />
                                    <AvatarFallback className="text-xs">S</AvatarFallback>
                                </Avatar>
                                <span>{notification.sender?.name || 'System'}</span>
                                </div>
                                <span>{formatTimestamp(notification.created_at)}</span>
                            </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                            {!notification.is_read && <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} className="text-blue-600 hover:text-blue-700"><Check className="w-4 h-4" /></Button>}
                            <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <div className="text-center py-12"><Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada notifikasi</h3><p className="text-gray-600">Semua notifikasi telah dibaca atau tidak ada yang sesuai filter</p></div>
                )}
                </TabsContent>
            </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}