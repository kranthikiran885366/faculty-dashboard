'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Building, Calendar } from "lucide-react";

const stats = [
  {
    title: "Total Faculty",
    value: "45",
    icon: Users,
    description: "Active faculty members",
  },
  {
    title: "Departments",
    value: "8",
    icon: Building,
    description: "Academic departments",
  },
  {
    title: "Total Courses",
    value: "124",
    icon: GraduationCap,
    description: "Active courses",
  },
  {
    title: "Upcoming Events",
    value: "12",
    icon: Calendar,
    description: "This month",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome to the admin portal</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-5 h-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium">New faculty member added</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium">Course schedule updated</p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium">Department report generated</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                Add New Faculty
              </button>
              <button className="w-full px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                Create Department
              </button>
              <button className="w-full px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                Generate Reports
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 