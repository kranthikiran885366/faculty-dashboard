"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Bell, User, ChevronDown, Home } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Any localStorage operations are safe here
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <nav className="sticky top-0 z-50" style={{ background: 'linear-gradient(to right, #f14e9b, #8e3fa8, #2b59c3)' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/vignanlogo.png"
              alt="Vignan's Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-white">
              FacultyDash
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link href="/dashboard" className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/about" className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </Link>
            <Link href="/gallery" className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/features" className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="/contact" className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-colors">
                  <Bell className="h-5 w-5 mr-2" />
                  <span className="sr-only">Notifications</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-colors flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span>{user?.name || "Account"}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  className="bg-white text-[#8e3fa8] hover:bg-white/90 transition-colors"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <Button 
                className="bg-white text-[#8e3fa8] hover:bg-white/90 transition-colors"
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" style={{ background: '#8e3fa8' }}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/gallery"
              className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/features"
              className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/contact"
              className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <Link
                href="/login"
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
