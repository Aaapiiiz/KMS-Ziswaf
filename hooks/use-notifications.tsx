"use client"

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Define the shape of a single notification
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "document" | "user" | "system" | "activity";
  time: string;
  read: boolean;
}

// Define the shape of the context's value
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  markAllAsRead: () => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// The initial mock data (moved from the dropdown component)
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Dokumen Baru",
    message: "Dokumen 'Laporan Keuangan Q4' telah ditambahkan",
    type: "document",
    time: "2 menit yang lalu",
    read: false,
  },
  {
    id: "2",
    title: "User Baru",
    message: "Ahmad Zulkarnain telah bergabung sebagai admin",
    type: "user",
    time: "1 jam yang lalu",
    read: false,
  },
  {
    id: "3",
    title: "Sistem Update",
    message: "Sistem akan maintenance pada 23:00 WIB",
    type: "system",
    time: "3 jam yang lalu",
    read: true,
  },
  {
    id: "4",
    title: "Aktivitas Baru",
    message: "Rapat koordinasi departemen telah dijadwalkan",
    type: "activity",
    time: "5 jam yang lalu",
    read: false,
  },
];

// Create the Provider component
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    markAllAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Create the custom hook for easy access
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}