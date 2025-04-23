"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  BookOpen,
  FileText,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"

export default function HODDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">HOD Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Department Calendar
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
              <Users className="h-4 w-4 text-[#FF4EB8]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">3 on leave today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-[#B23EFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">12 undergraduate, 30 graduate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Research Projects</CardTitle>
              <FileText className="h-4 w-4 text-[#00CFFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">$1.2M in active funding</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Department Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-[#FF4EB8]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">68% utilized this fiscal year</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="faculty" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="faculty" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Overview</CardTitle>
                <CardDescription>Faculty workload and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <FacultyWorkloadItem
                    name="Dr. John Doe"
                    position="Associate Professor"
                    courses={3}
                    students={85}
                    research={2}
                    workload={85}
                  />
                  <FacultyWorkloadItem
                    name="Dr. Jane Smith"
                    position="Professor"
                    courses={2}
                    students={45}
                    research={4}
                    workload={90}
                  />
                  <FacultyWorkloadItem
                    name="Dr. Robert Johnson"
                    position="Assistant Professor"
                    courses={4}
                    students={120}
                    research={1}
                    workload={95}
                  />
                  <FacultyWorkloadItem
                    name="Dr. Emily Davis"
                    position="Associate Professor"
                    courses={3}
                    students={75}
                    research={3}
                    workload={80}
                  />
                  <FacultyWorkloadItem
                    name="Dr. Michael Brown"
                    position="Assistant Professor"
                    courses={4}
                    students={110}
                    research={1}
                    workload={75}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>Pending faculty leave requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <LeaveRequestItem
                      name="Dr. Sarah Williams"
                      type="Sick Leave"
                      dates="Oct 15 - Oct 18, 2023"
                      status="pending"
                    />
                    <LeaveRequestItem
                      name="Dr. Thomas Garcia"
                      type="Conference"
                      dates="Nov 5 - Nov 10, 2023"
                      status="pending"
                    />
                    <LeaveRequestItem
                      name="Dr. Lisa Chen"
                      type="Personal Leave"
                      dates="Oct 25 - Oct 27, 2023"
                      status="approved"
                    />
                    <LeaveRequestItem
                      name="Dr. David Wilson"
                      type="Research Visit"
                      dates="Nov 15 - Nov 30, 2023"
                      status="pending"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Faculty Performance</CardTitle>
                  <CardDescription>Teaching evaluations and research output</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <PerformanceItem
                      name="Dr. John Doe"
                      teachingScore={4.7}
                      publications={3}
                      studentFeedback="Excellent"
                    />
                    <PerformanceItem
                      name="Dr. Jane Smith"
                      teachingScore={4.9}
                      publications={5}
                      studentFeedback="Outstanding"
                    />
                    <PerformanceItem
                      name="Dr. Robert Johnson"
                      teachingScore={4.2}
                      publications={1}
                      studentFeedback="Good"
                    />
                    <PerformanceItem
                      name="Dr. Emily Davis"
                      teachingScore={4.5}
                      publications={4}
                      studentFeedback="Very Good"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Current semester course completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <CourseProgressItem
                    code="CS101"
                    title="Introduction to Computer Science"
                    instructor="Dr. John Doe"
                    students={45}
                    progress={75}
                  />
                  <CourseProgressItem
                    code="CS305"
                    title="Advanced Database Systems"
                    instructor="Dr. Jane Smith"
                    students={32}
                    progress={60}
                  />
                  <CourseProgressItem
                    code="CS210"
                    title="Data Structures and Algorithms"
                    instructor="Dr. Robert Johnson"
                    students={38}
                    progress={80}
                  />
                  <CourseProgressItem
                    code="CS401"
                    title="Artificial Intelligence"
                    instructor="Dr. Emily Davis"
                    students={28}
                    progress={40}
                  />
                  <CourseProgressItem
                    code="CS450"
                    title="Machine Learning"
                    instructor="Dr. Michael Brown"
                    students={35}
                    progress={55}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Department-wide student metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">Student Performance Analytics</h3>
                    <p className="text-sm text-gray-500">
                      Department-wide student performance charts would appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Research Projects</CardTitle>
                <CardDescription>Department research initiatives and funding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResearchProjectItem
                    title="Machine Learning for Educational Assessment"
                    pi="Dr. John Doe"
                    funding="$75,000"
                    status="In Progress"
                    completion={65}
                  />
                  <ResearchProjectItem
                    title="Blockchain Applications in Academic Credentialing"
                    pi="Dr. Jane Smith"
                    funding="$50,000"
                    status="Planning"
                    completion={15}
                  />
                  <ResearchProjectItem
                    title="Virtual Reality in Engineering Education"
                    pi="Dr. Emily Davis"
                    funding="$120,000"
                    status="Completed"
                    completion={100}
                  />
                  <ResearchProjectItem
                    title="AI-Powered Tutoring Systems"
                    pi="Dr. Lisa Chen"
                    funding="$90,000"
                    status="In Progress"
                    completion={45}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
                <CardDescription>Department budget breakdown and expenditure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <BudgetItem
                    category="Faculty Salaries"
                    allocated="$1,200,000"
                    spent="$800,000"
                    remaining="$400,000"
                    percentage={67}
                  />
                  <BudgetItem
                    category="Research Grants"
                    allocated="$500,000"
                    spent="$350,000"
                    remaining="$150,000"
                    percentage={70}
                  />
                  <BudgetItem
                    category="Equipment & Labs"
                    allocated="$300,000"
                    spent="$275,000"
                    remaining="$25,000"
                    percentage={92}
                  />
                  <BudgetItem
                    category="Conference Travel"
                    allocated="$150,000"
                    spent="$85,000"
                    remaining="$65,000"
                    percentage={57}
                  />
                  <BudgetItem
                    category="Administrative Expenses"
                    allocated="$250,000"
                    spent="$125,000"
                    remaining="$125,000"
                    percentage={50}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function FacultyWorkloadItem({ name, position, courses, students, research, workload }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1 text-[#FF4EB8]" />
            <span>{courses} courses</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-[#B23EFF]" />
            <span>{students} students</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1 text-[#00CFFF]" />
            <span>{research} projects</span>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Workload</span>
          <span>{workload}%</span>
        </div>
        <Progress value={workload} className="h-2" />
      </div>
    </div>
  )
}

function LeaveRequestItem({ name, type, dates, status }) {
  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return "text-green-500"
      case "rejected":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "approved":
        return <CheckCircle className={`h-5 w-5 ${getStatusColor()}`} />
      case "rejected":
        return <AlertCircle className={`h-5 w-5 ${getStatusColor()}`} />
      default:
        return <Clock className={`h-5 w-5 ${getStatusColor()}`} />
    }
  }

  return (
    <div className="flex items-start space-x-4 rounded-md border p-3 hover:bg-gray-50">
      <div className="mt-0.5">{getStatusIcon()}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{name}</p>
          <span className="text-xs capitalize">{status}</span>
        </div>
        <p className="text-xs text-gray-500">{type}</p>
        <p className="text-xs text-gray-500">{dates}</p>
      </div>
      {status === "pending" && (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-7 text-xs">
            Approve
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            Reject
          </Button>
        </div>
      )}
    </div>
  )
}

function PerformanceItem({ name, teachingScore, publications, studentFeedback }) {
  return (
    <div className="flex items-start space-x-4 rounded-md border p-3 hover:bg-gray-50">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{name}</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
          <div>
            <p className="font-medium text-gray-700">Teaching</p>
            <p>{teachingScore}/5.0</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Publications</p>
            <p>{publications} this year</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Feedback</p>
            <p>{studentFeedback}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseProgressItem({ code, title, instructor, students, progress }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">
            {code} • {instructor}
          </p>
        </div>
        <div className="text-sm">
          <span>{students} students</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Course Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  )
}

function ResearchProjectItem({ title, pi, funding, status, completion }) {
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="rounded-md border p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor()}`}>{status}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 mb-2">
        <div>
          <p className="text-xs font-medium text-gray-700">Principal Investigator</p>
          <p>{pi}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-700">Funding</p>
          <p>{funding}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-700">Completion</p>
          <p>{completion}%</p>
        </div>
      </div>
      <Progress value={completion} className="h-2" />
    </div>
  )
}

function BudgetItem({ category, allocated, spent, remaining, percentage }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{category}</h3>
        <div className="text-sm font-medium">{percentage}% utilized</div>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
        <div>
          <p className="text-xs font-medium text-gray-700">Allocated</p>
          <p>{allocated}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-700">Spent</p>
          <p>{spent}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-700">Remaining</p>
          <p>{remaining}</p>
        </div>
      </div>
    </div>
  )
}
