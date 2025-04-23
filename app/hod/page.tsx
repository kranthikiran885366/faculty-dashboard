'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  BarChart2,
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

interface DepartmentStats {
  totalFaculty: number;
  totalStudents: number;
  totalCourses: number;
  activeClasses: number;
  averageAttendance: number;
  performanceRating: number;
  upcomingEvents: number;
  pendingRequests: number;
}

interface PerformanceMetric {
  category: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface AttendanceData {
  course: string;
  percentage: number;
  total: number;
  present: number;
}

interface CoursePerformance {
  course: string;
  averageScore: number;
  passRate: number;
  studentCount: number;
}

export default function HODDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const departmentStats: DepartmentStats = {
    totalFaculty: 45,
    totalStudents: 850,
    totalCourses: 32,
    activeClasses: 28,
    averageAttendance: 88,
    performanceRating: 4.2,
    upcomingEvents: 12,
    pendingRequests: 8,
  };

  const performanceMetrics: PerformanceMetric[] = [
    { category: 'Student Performance', value: 85, trend: 'up', change: 5 },
    { category: 'Faculty Engagement', value: 92, trend: 'up', change: 3 },
    { category: 'Course Completion', value: 95, trend: 'stable', change: 0 },
    { category: 'Research Output', value: 78, trend: 'up', change: 8 },
  ];

  const attendanceData: AttendanceData[] = [
    { course: 'Advanced Database Systems', percentage: 92, total: 120, present: 110 },
    { course: 'Machine Learning', percentage: 88, total: 150, present: 132 },
    { course: 'Software Engineering', percentage: 85, total: 100, present: 85 },
    { course: 'Network Security', percentage: 90, total: 80, present: 72 },
  ];

  const coursePerformance: CoursePerformance[] = [
    { course: 'Advanced Database Systems', averageScore: 85, passRate: 95, studentCount: 120 },
    { course: 'Machine Learning', averageScore: 82, passRate: 92, studentCount: 150 },
    { course: 'Software Engineering', averageScore: 88, passRate: 97, studentCount: 100 },
    { course: 'Network Security', averageScore: 84, passRate: 94, studentCount: 80 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Department Overview</h1>
          <p className="text-gray-500">Computer Science Department Dashboard</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-semester">This Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Faculty</p>
                <h3 className="text-2xl font-bold">{departmentStats.totalFaculty}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">{departmentStats.totalStudents}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Courses</p>
                <h3 className="text-2xl font-bold">{departmentStats.activeClasses}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Attendance</p>
                <h3 className="text-2xl font-bold">{departmentStats.averageAttendance}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators across different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {performanceMetrics.map((metric) => (
                <div key={metric.category} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{metric.category}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{metric.value}%</span>
                      <span className={`flex items-center text-sm ${
                        metric.trend === 'up' ? 'text-green-600' :
                        metric.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {metric.trend === 'up' && '↑'}
                        {metric.trend === 'down' && '↓'}
                        {metric.trend === 'stable' && '→'}
                        {metric.change}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Average scores and pass rates by course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {coursePerformance.map((course) => (
                <div key={course.course} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{course.course}</p>
                    <span className="text-sm text-gray-500">{course.studentCount} students</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Average Score</p>
                      <p className="text-lg font-bold">{course.averageScore}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pass Rate</p>
                      <p className="text-lg font-bold">{course.passRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Course-wise attendance statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {attendanceData.map((course) => (
                <div key={course.course} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{course.course}</p>
                    <span className="text-sm text-gray-500">
                      {course.present}/{course.total} present
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${course.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-right">{course.percentage}% attendance</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Pending Approvals</p>
                    <p className="text-xs text-gray-500">8 items need your attention</p>
                  </div>
                </div>
                <button className="text-sm text-yellow-600 hover:text-yellow-700">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Upcoming Events</p>
                    <p className="text-xs text-gray-500">12 events scheduled this week</p>
                  </div>
                </div>
                <button className="text-sm text-green-600 hover:text-green-700">
                  View All
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Today's Classes</p>
                    <p className="text-xs text-gray-500">6 classes scheduled</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Schedule
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Performance Reports</p>
                    <p className="text-xs text-gray-500">Monthly reports ready</p>
                  </div>
                </div>
                <button className="text-sm text-purple-600 hover:text-purple-700">
                  Generate
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 