"use client"

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white w-full mt-auto">
      <div className="w-full px-6 py-12">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About Us</h3>
              <p className="text-gray-300 text-sm">
                We are dedicated to providing quality education and fostering academic excellence through innovative teaching methods and personalized learning experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/students" className="text-gray-300 hover:text-white transition-colors">
                    Students
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/classes" className="text-gray-300 hover:text-white transition-colors">
                    Classes
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/calendar" className="text-gray-300 hover:text-white transition-colors">
                    Calendar
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Info</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-300">
                  <Mail className="h-4 w-4" />
                  <span>contact@faculty.edu</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Phone className="h-4 w-4" />
                  <span>+1 234 567 890</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span>123 Education St, City, Country</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Faculty Dashboard. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
} 