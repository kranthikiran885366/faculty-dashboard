'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Course Assignment",
    message: "You have been assigned to teach CS401 - Advanced Database Systems",
    type: "info",
    timestamp: "2024-03-15T10:30:00",
    read: false
  },
  {
    id: "2",
    title: "Student Performance Alert",
    message: "5 students in CS301 have attendance below 75%",
    type: "warning",
    timestamp: "2024-03-15T09:15:00",
    read: false
  },
  {
    id: "3",
    title: "Meeting Scheduled",
    message: "Department meeting scheduled for March 20th at 2:00 PM",
    type: "info",
    timestamp: "2024-03-14T16:45:00",
    read: false
  },
  {
    id: "4",
    title: "Grade Submission Reminder",
    message: "Please submit mid-term grades by March 25th",
    type: "warning",
    timestamp: "2024-03-14T14:20:00",
    read: true
  },
  {
    id: "5",
    title: "Course Evaluation Complete",
    message: "Student evaluations for CS302 are now available",
    type: "success",
    timestamp: "2024-03-14T11:00:00",
    read: true
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearNotifications}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center h-20 text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-2 w-2 mt-2 rounded-full ${
                      notification.type === 'info' ? 'bg-blue-500' :
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
} 