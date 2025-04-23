"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isMobile = useMobile()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? (isSidebarOpen ? "fixed inset-y-0 left-0 z-50" : "hidden") : "relative"}
          w-64 bg-white border-r
        `}
      >
        {isMobile && (
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF4EB8] to-[#B23EFF]">
                FacultyDash
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <NavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
            <NavItem href="/dashboard/classes" icon={<GraduationCap className="h-5 w-5" />} label="Classes" />
            <NavItem href="/dashboard/students" icon={<Users className="h-5 w-5" />} label="Students" />
            <NavItem href="/dashboard/research" icon={<FileText className="h-5 w-5" />} label="Research" />
            <NavItem href="/dashboard/schedule" icon={<Calendar className="h-5 w-5" />} label="Schedule" />

            <div className="pt-4 mt-4 border-t">
              <NavItem href="/dashboard/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 py-2 px-3"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-4">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            )}

            <div className={`${isMobile ? "ml-4" : ""}`}>
              <h1 className="text-lg font-medium">Faculty Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

function NavItem({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md py-2 px-3"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  )
}
