'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  BookOpen,
  Users,
  Calendar,
  BarChart2,
  Settings,
  Bell,
  Shield,
  Zap,
  Clock,
  Layout,
  CheckCircle,
  ArrowRight,
  Play,
} from 'lucide-react';
import { useState } from 'react';

export default function LearnMore() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Faculty Dashboard System
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              A comprehensive solution for managing academic departments, faculty, courses, and student performance
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Button 
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={() => setShowDemo(true)}
              >
                <Play className="w-4 h-4" />
                Request Demo
              </Button>
              <Button variant="outline" className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto">
                Contact Us
                </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Video Dialog */}
      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Product Demo</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/your-video-id"
              title="Faculty Dashboard Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Comprehensive Features
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to manage your academic department efficiently
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Faculty Management</h3>
                    <p className="mt-2 text-gray-500">
                      Efficiently manage faculty profiles, assignments, and performance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Course Management</h3>
                    <p className="mt-2 text-gray-500">
                      Create and manage courses, syllabi, and academic resources
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <BarChart2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Performance Analytics</h3>
                    <p className="mt-2 text-gray-500">
                      Track and analyze academic performance metrics
                </p>
              </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Schedule Management</h3>
                    <p className="mt-2 text-gray-500">
                      Organize classes, meetings, and academic events
                </p>
              </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <Bell className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <p className="mt-2 text-gray-500">
                      Stay updated with real-time alerts and announcements
                </p>
              </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Settings className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Customization</h3>
                    <p className="mt-2 text-gray-500">
                      Personalize settings and preferences
                </p>
              </div>
            </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Our System?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Designed to enhance productivity and streamline academic operations
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium">Increased Efficiency</h3>
              <p className="mt-2 text-gray-500">
                Automate routine tasks and streamline administrative processes
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">Secure & Reliable</h3>
              <p className="mt-2 text-gray-500">
                Built with industry-standard security measures and data protection
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Layout className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium">User-Friendly Interface</h3>
              <p className="mt-2 text-gray-500">
                Intuitive design for easy navigation and quick access to features
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Getting Started is Easy
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Follow these simple steps to begin using our system
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="relative flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
                </div>
              <h3 className="text-lg font-medium">Create Account</h3>
              <p className="mt-2 text-gray-500">
                Contact your administrator to set up your account
              </p>
              <ArrowRight className="absolute right-0 top-6 h-6 w-6 text-gray-300 hidden md:block" />
                </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-medium">Complete Profile</h3>
              <p className="mt-2 text-gray-500">
                Fill in your details and preferences
              </p>
              <ArrowRight className="absolute right-0 top-6 h-6 w-6 text-gray-300 hidden md:block" />
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-medium">Start Managing</h3>
              <p className="mt-2 text-gray-500">
                Begin using the system's features
              </p>
            </div>
          </div>
          </div>
        </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Contact us today to learn more.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button variant="secondary" size="lg">
                Get Started
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button variant="outline" size="lg" className="bg-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
