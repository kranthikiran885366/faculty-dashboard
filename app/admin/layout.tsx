'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Calendar,
  Settings,
  BarChart,
  FileText,
  Building,
  LogOut,
} from "lucide-react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart,
  },
  {
    title: "Faculty Management",
    href: "/admin/faculty",
    icon: Users,
  },
  {
    title: "Department Management",
    href: "/admin/departments",
    icon: Building,
  },
  {
    title: "Course Management",
    href: "/admin/courses",
    icon: GraduationCap,
  },
  {
    title: "Schedule Management",
    href: "/admin/schedule",
    icon: Calendar,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-purple-600">Admin Portal</h1>
          </div>
          <ul className="space-y-2">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-lg hover:bg-purple-50 group ${
                      isActive
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-700 hover:text-purple-600"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="ml-3">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-4 mt-4 border-t">
              <button className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 group">
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="p-4 rounded-lg bg-white min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
} 