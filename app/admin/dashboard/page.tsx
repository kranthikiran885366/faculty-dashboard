'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Building,
  GraduationCap,
  Calendar,
  TrendingUp,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart,
  PieChart,
  Activity,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Stats {
  totalStudents: number;
  totalFaculty: number;
  totalDepartments: number;
  totalCourses: number;
  activeStudents: number;
  activeFaculty: number;
  upcomingEvents: number;
  pendingRequests: number;
}

interface RecentActivity {
  id: number;
  type: 'student' | 'faculty' | 'course' | 'department';
  action: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'in-progress';
}

interface Alert {
  id: number;
  type: 'info' | 'warning' | 'success';
  message: string;
  timestamp: string;
}

const initialStats: Stats = {
  totalStudents: 1200,
  totalFaculty: 85,
  totalDepartments: 6,
  totalCourses: 48,
  activeStudents: 1150,
  activeFaculty: 80,
  upcomingEvents: 12,
  pendingRequests: 15,
};

const recentActivities: RecentActivity[] = [
  {
    id: 1,
    type: 'student',
    action: 'New Registration',
    description: 'New student registered in Computer Science department',
    timestamp: '2 hours ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'faculty',
    action: 'Leave Request',
    description: 'Dr. Smith requested leave for next week',
    timestamp: '3 hours ago',
    status: 'pending',
  },
  {
    id: 3,
    type: 'course',
    action: 'Course Update',
    description: 'Advanced Database Systems syllabus updated',
    timestamp: '5 hours ago',
    status: 'completed',
  },
  {
    id: 4,
    type: 'department',
    action: 'New Equipment',
    description: 'New lab equipment request for Electronics department',
    timestamp: '1 day ago',
    status: 'in-progress',
  },
];

const alerts: Alert[] = [
  {
    id: 1,
    type: 'warning',
    message: 'Low attendance in Advanced Programming class',
    timestamp: '1 hour ago',
  },
  {
    id: 2,
    type: 'success',
    message: 'Faculty evaluation reports completed',
    timestamp: '2 hours ago',
  },
  {
    id: 3,
    type: 'info',
    message: 'System maintenance scheduled for tonight',
    timestamp: '3 hours ago',
  },
];

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Chemical',
  'Electrical',
];

export default function AdminDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'in-progress':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info':
        return <Bell className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Overview and analytics of the institution</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">{initialStats.totalStudents}</h3>
                <p className="text-sm text-green-600">+5% from last month</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Faculty</p>
                <h3 className="text-2xl font-bold">{initialStats.totalFaculty}</h3>
                <p className="text-sm text-green-600">+2% from last month</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Courses</p>
                <h3 className="text-2xl font-bold">{initialStats.totalCourses}</h3>
                <p className="text-sm text-blue-600">Same as last month</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Departments</p>
                <h3 className="text-2xl font-bold">{initialStats.totalDepartments}</h3>
                <p className="text-sm text-gray-600">No change</p>
              </div>
              <Building className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <BarChart className="w-12 h-12 text-gray-300" />
              <p className="text-sm text-gray-500 ml-2">Performance chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Department Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <PieChart className="w-12 h-12 text-gray-300" />
              <p className="text-sm text-gray-500 ml-2">Distribution chart will be rendered here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`mt-1 ${getStatusColor(activity.status)}`}>
                    {activity.type === 'student' && <Users className="w-5 h-5" />}
                    {activity.type === 'faculty' && <GraduationCap className="w-5 h-5" />}
                    {activity.type === 'course' && <BookOpen className="w-5 h-5" />}
                    {activity.type === 'department' && <Building className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{activity.action}</h4>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <span className={`text-xs ${getStatusColor(activity.status)} capitalize`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Add Student</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span>Add Faculty</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Add Course</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule Event</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 