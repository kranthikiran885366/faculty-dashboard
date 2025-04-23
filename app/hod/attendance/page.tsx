'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Calendar,
  Search,
  BarChart2,
  Clock,
  AlertCircle,
  CheckCircle,
  Download,
  Filter,
} from 'lucide-react';

interface AttendanceRecord {
  id: number;
  courseCode: string;
  courseName: string;
  instructor: string;
  date: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  attendancePercentage: number;
  status: 'completed' | 'pending' | 'missed';
}

interface CourseAttendance {
  courseCode: string;
  courseName: string;
  instructor: string;
  overallAttendance: number;
  records: {
    date: string;
    percentage: number;
  }[];
}

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Chemical',
  'Electrical',
];

const initialAttendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    courseCode: "CS301",
    courseName: "Database Systems",
    instructor: "Dr. Sarah Johnson",
    date: "2024-03-15",
    totalStudents: 60,
    presentStudents: 55,
    absentStudents: 5,
    attendancePercentage: 91.67,
    status: 'completed'
  },
  {
    id: 2,
    courseCode: "CS302",
    courseName: "Software Engineering",
    instructor: "Dr. Michael Brown",
    date: "2024-03-15",
    totalStudents: 55,
    presentStudents: 48,
    absentStudents: 7,
    attendancePercentage: 87.27,
    status: 'completed'
  }
];

const courseAttendance: CourseAttendance[] = [
  {
    courseCode: "CS301",
    courseName: "Database Systems",
    instructor: "Dr. Sarah Johnson",
    overallAttendance: 92,
    records: [
      { date: "2024-03-15", percentage: 91.67 },
      { date: "2024-03-14", percentage: 93.33 },
      { date: "2024-03-13", percentage: 90.00 },
      { date: "2024-03-12", percentage: 95.00 },
    ]
  },
  {
    courseCode: "CS302",
    courseName: "Software Engineering",
    instructor: "Dr. Michael Brown",
    overallAttendance: 88,
    records: [
      { date: "2024-03-15", percentage: 87.27 },
      { date: "2024-03-14", percentage: 89.09 },
      { date: "2024-03-13", percentage: 85.45 },
      { date: "2024-03-12", percentage: 90.91 },
    ]
  }
];

export default function AttendanceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRecords = initialAttendanceRecords.filter(record => {
    const matchesSearch = 
      record.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesDate = !dateFilter || record.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-gray-500">Monitor and manage course attendance</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Attendance</p>
                <h3 className="text-2xl font-bold">89.5%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Classes Today</p>
                <h3 className="text-2xl font-bold">12/15</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Attendance</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">This Week</p>
                <h3 className="text-2xl font-bold">91.2%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-[180px]"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {courseAttendance.map((course) => (
          <Card key={course.courseCode}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{course.courseName}</h3>
                      <p className="text-gray-500">{course.courseCode}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BarChart2 className="w-4 h-4" />
                      <span>Overall: {course.overallAttendance}%</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Recent Attendance</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {course.records.map((record, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-500">{record.date}</p>
                              <p className="text-lg font-bold">{record.percentage}%</p>
                              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${record.percentage}%` }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{record.courseName}</h4>
                    <p className="text-sm text-gray-500">{record.courseCode} - {record.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Present/Total</p>
                    <p className="font-medium">{record.presentStudents}/{record.totalStudents}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Percentage</p>
                    <p className="font-medium">{record.attendancePercentage}%</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm capitalize ${
                    record.status === 'completed' ? 'bg-green-100 text-green-600' :
                    record.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 