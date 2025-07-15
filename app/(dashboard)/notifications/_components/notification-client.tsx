"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, Clock, FileText, Users, AlertCircle, CheckCircle, Loader2, Trash2 } from "lucide-react";

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  requires_action: boolean;
  created_at: string;
  sender_name: string | null;
  sender_avatar: string | null;
}

export function NotificationClient() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [filterType, setFilterType] = useState("all");
  
  // This useEffect hook will run on the client-side after the component mounts.
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.rpc('get_user_notifications');
        if (error) {
          throw error;
        }
        setNotifications((data as Notification[]) || []);
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

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* ... The rest of the JSX is the same as before ... */}
    </div>
  );
}