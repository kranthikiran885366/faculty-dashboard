'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart2,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Download,
  Filter,
  PieChart,
  Activity,
  Star,
  Calendar,
  Clock,
  Bell,
} from 'lucide-react';

interface DepartmentMetrics {
  overallPerformance: number;
  studentCount: number;
  coursesOffered: number;
  averageGPA: number;
  passRate: number;
  topPerformers: number;
  needsImprovement: number;
  facultyRating: number;
}

interface CoursePerformance {
  code: string;
  name: string;
  instructor: string;
  averageScore: number;
  passRate: number;
  gradeDistribution: {
    grade: string;
    count: number;
    percentage: number;
  }[];
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

interface StudentPerformance {
  semester: number;
  averageGPA: number;
  passRate: number;
  topPerformers: number;
  needsImprovement: number;
}

const departmentMetrics: DepartmentMetrics = {
  overallPerformance: 85,
  studentCount: 850,
  coursesOffered: 32,
  averageGPA: 3.4,
  passRate: 92,
  topPerformers: 125,
  needsImprovement: 45,
  facultyRating: 4.2
};

const coursePerformance: CoursePerformance[] = [
  {
    code: "CS301",
    name: "Database Systems",
    instructor: "Dr. Sarah Johnson",
    averageScore: 82,
    passRate: 95,
    gradeDistribution: [
      { grade: "A", count: 15, percentage: 25 },
      { grade: "B", count: 20, percentage: 33.33 },
      { grade: "C", count: 18, percentage: 30 },
      { grade: "D", count: 5, percentage: 8.33 },
      { grade: "F", count: 2, percentage: 3.33 }
    ],
    trend: "up",
    trendValue: 5
  },
  {
    code: "CS302",
    name: "Software Engineering",
    instructor: "Dr. Michael Brown",
    averageScore: 78,
    passRate: 92,
    gradeDistribution: [
      { grade: "A", count: 12, percentage: 20 },
      { grade: "B", count: 25, percentage: 41.67 },
      { grade: "C", count: 15, percentage: 25 },
      { grade: "D", count: 6, percentage: 10 },
      { grade: "F", count: 2, percentage: 3.33 }
    ],
    trend: "stable",
    trendValue: 0
  }
];

const semesterPerformance: StudentPerformance[] = [
  {
    semester: 1,
    averageGPA: 3.2,
    passRate: 90,
    topPerformers: 25,
    needsImprovement: 12
  },
  {
    semester: 2,
    averageGPA: 3.3,
    passRate: 91,
    topPerformers: 28,
    needsImprovement: 10
  },
  {
    semester: 3,
    averageGPA: 3.4,
    passRate: 93,
    topPerformers: 30,
    needsImprovement: 8
  },
  {
    semester: 4,
    averageGPA: 3.5,
    passRate: 94,
    topPerformers: 32,
    needsImprovement: 7
  }
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('this-semester');
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Department Dashboard</h1>
          <p className="text-gray-500">Overview and key performance metrics</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-semester">This Semester</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Overall Performance</p>
                <h3 className="text-2xl font-bold">{departmentMetrics.overallPerformance}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average GPA</p>
                <h3 className="text-2xl font-bold">{departmentMetrics.averageGPA}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pass Rate</p>
                <h3 className="text-2xl font-bold">{departmentMetrics.passRate}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Top Performers</p>
                <h3 className="text-2xl font-bold">{departmentMetrics.topPerformers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {coursePerformance.map((course) => (
                <div key={course.code} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-gray-500">{course.code} - {course.instructor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${
                        course.trend === 'up' ? 'text-green-600' :
                        course.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {course.trend === 'up' && '↑'}
                        {course.trend === 'down' && '↓'}
                        {course.trend === 'stable' && '→'}
                        {course.trendValue}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Average Score</p>
                      <p className="text-lg font-bold">{course.averageScore}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pass Rate</p>
                      <p className="text-lg font-bold">{course.passRate}%</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Grade Distribution</p>
                    {course.gradeDistribution.map((grade) => (
                      <div key={grade.grade} className="flex items-center gap-2">
                        <span className="text-sm w-8">{grade.grade}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${grade.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">{grade.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Semester-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {semesterPerformance.map((semester) => (
                <div key={semester.semester} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Semester {semester.semester}</h4>
                    <span className="text-sm text-gray-500">GPA: {semester.averageGPA}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Pass Rate</p>
                          <p className="text-lg font-bold">{semester.passRate}%</p>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full"
                              style={{ width: `${semester.passRate}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-gray-500">Top Performers</p>
                            <p className="text-lg font-bold">{semester.topPerformers}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Needs Improvement</p>
                            <p className="text-lg font-bold">{semester.needsImprovement}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Top Performing Areas</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Database Systems (95% Pass Rate)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Software Engineering (92% Pass Rate)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Computer Networks (90% Pass Rate)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Areas for Improvement</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span>Operating Systems (75% Pass Rate)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span>Computer Architecture (78% Pass Rate)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Recommendations</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Increase tutorial sessions for OS</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Review teaching methods in Architecture</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Implement peer learning programs</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 