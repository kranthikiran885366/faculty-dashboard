"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Calendar, CheckCircle, Clock, AlertCircle, BarChart3, Download, Eye, Edit } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExamsDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock exams data
  const exams = [
    {
      id: "1",
      title: "CS101 Midterm Exam",
      courseCode: "CS101",
      date: "2023-10-15",
      time: "10:00 AM - 12:00 PM",
      duration: 120,
      location: "Examination Hall A",
      status: "Completed",
      totalStudents: 45,
      submitted: 45,
      graded: 42,
      averageScore: 78.5,
    },
    {
      id: "2",
      title: "CS305 Database Design Quiz",
      courseCode: "CS305",
      date: "2023-10-20",
      time: "02:00 PM - 03:00 PM",
      duration: 60,
      location: "Online",
      status: "Completed",
      totalStudents: 32,
      submitted: 30,
      graded: 30,
      averageScore: 82.3,
    },
    {
      id: "3",
      title: "CS210 Data Structures Final Exam",
      courseCode: "CS210",
      date: "2023-12-05",
      time: "09:00 AM - 12:00 PM",
      duration: 180,
      location: "Examination Hall B",
      status: "Scheduled",
      totalStudents: 38,
      submitted: 0,
      graded: 0,
      averageScore: 0,
    },
    {
      id: "4",
      title: "CS401 AI Concepts Quiz",
      courseCode: "CS401",
      date: "2023-10-25",
      time: "11:00 AM - 12:00 PM",
      duration: 60,
      location: "Online",
      status: "Grading",
      totalStudents: 28,
      submitted: 28,
      graded: 15,
      averageScore: 75.8,
    },
    {
      id: "5",
      title: "CS450 Machine Learning Assignment",
      courseCode: "CS450",
      date: "2023-11-10",
      time: "Due by 11:59 PM",
      duration: 0,
      location: "Online Submission",
      status: "Active",
      totalStudents: 35,
      submitted: 20,
      graded: 0,
      averageScore: 0,
    },
  ]

  // Filter exams based on search term and status
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || exam.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Exam Management</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Exam
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
              <FileText className="h-4 w-4 text-[#FF4EB8]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">5 active, 7 completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
              <Calendar className="h-4 w-4 text-[#B23EFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next: CS210 Final on Dec 5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <Clock className="h-4 w-4 text-[#00CFFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">33</div>
              <p className="text-xs text-muted-foreground">From 2 different exams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-[#FF4EB8]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">79.2%</div>
              <p className="text-xs text-muted-foreground">Across all graded exams</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all-exams" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all-exams">All Exams</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="grading">Grading</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all-exams" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exam Management</CardTitle>
                <CardDescription>View and manage all exams</CardDescription>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search exams..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="grading">Grading</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredExams.length > 0 ? (
                    filteredExams.map((exam) => <ExamItem key={exam.id} exam={exam} />)
                  ) : (
                    <div className="text-center py-8 text-gray-500">No exams found matching your criteria</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Exams</CardTitle>
                <CardDescription>Upcoming exams that are scheduled but not yet active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exams
                    .filter((exam) => exam.status === "Scheduled")
                    .map((exam) => (
                      <ExamItem key={exam.id} exam={exam} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Exams</CardTitle>
                <CardDescription>Currently active exams that students can take</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exams
                    .filter((exam) => exam.status === "Active")
                    .map((exam) => (
                      <ExamItem key={exam.id} exam={exam} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grading" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exams Pending Grading</CardTitle>
                <CardDescription>Exams that need to be graded</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exams
                    .filter((exam) => exam.status === "Grading")
                    .map((exam) => (
                      <ExamItem key={exam.id} exam={exam} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Exams</CardTitle>
                <CardDescription>Exams that have been completed and fully graded</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exams
                    .filter((exam) => exam.status === "Completed")
                    .map((exam) => (
                      <ExamItem key={exam.id} exam={exam} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function ExamItem({ exam }) {
  const getStatusBadge = () => {
    switch (exam.status) {
      case "Scheduled":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{exam.status}</Badge>
      case "Active":
        return <Badge className="bg-green-500 hover:bg-green-600">{exam.status}</Badge>
      case "Grading":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{exam.status}</Badge>
      case "Completed":
        return <Badge className="bg-gray-500 hover:bg-gray-600">{exam.status}</Badge>
      default:
        return <Badge>{exam.status}</Badge>
    }
  }

  const getStatusIcon = () => {
    switch (exam.status) {
      case "Scheduled":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "Active":
        return <Clock className="h-5 w-5 text-green-500" />
      case "Grading":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-gray-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getGradingProgress = () => {
    if (exam.status === "Scheduled" || exam.status === "Active") {
      return 0
    }
    return Math.round((exam.graded / exam.totalStudents) * 100) || 0
  }

  const getSubmissionProgress = () => {
    if (exam.status === "Scheduled") {
      return 0
    }
    return Math.round((exam.submitted / exam.totalStudents) * 100) || 0
  }

  return (
    <div className="rounded-md border p-4 hover:bg-gray-50">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">{getStatusIcon()}</div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{exam.title}</h3>
              <div className="ml-2">{getStatusBadge()}</div>
            </div>
            <p className="text-sm text-gray-500">
              {exam.courseCode} • {exam.date} • {exam.time}
            </p>
            <p className="text-sm text-gray-500">
              {exam.duration > 0 ? `${exam.duration} minutes` : "No time limit"} • {exam.location}
            </p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          {exam.status === "Completed" && (
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Results
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Submissions</span>
            <span>
              {exam.submitted}/{exam.totalStudents} ({getSubmissionProgress()}%)
            </span>
          </div>
          <Progress value={getSubmissionProgress()} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Grading Progress</span>
            <span>
              {exam.graded}/{exam.totalStudents} ({getGradingProgress()}%)
            </span>
          </div>
          <Progress value={getGradingProgress()} className="h-2" />
        </div>
      </div>

      {exam.status === "Completed" && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Average Score</span>
            <span className="text-sm font-medium">{exam.averageScore.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
