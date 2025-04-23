"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  GraduationCap,
  Users,
  FileText,
  BookOpen,
  Clock,
  BellRing,
  BarChart3,
  Calendar,
  CheckCircle,
  ClipboardList,
  Video,
  MessageSquare,
  Mail,
  Phone,
  Award,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Footer } from "@/components/footer"
import Image from "next/image"
import FacultyGrid from "../components/FacultyGrid"

const DashboardLayoutComponent = dynamic(() => import("@/components/dashboard-layout"), {
  ssr: false
})

interface FacultyMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  expertise: string[];
  achievements: string[];
}

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Professor & HOD",
    department: "Computer Science",
    email: "sarah.johnson@faculty.edu",
    phone: "+1 234 567 890",
    expertise: ["Machine Learning", "Artificial Intelligence", "Data Science"],
    achievements: ["Best Research Paper 2023", "Excellence in Teaching Award"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Associate Professor",
    department: "Computer Science",
    email: "michael.chen@faculty.edu",
    phone: "+1 234 567 891",
    expertise: ["Software Engineering", "Cloud Computing", "Cybersecurity"],
    achievements: ["Outstanding Faculty Award", "Industry Partnership Award"]
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    role: "Assistant Professor",
    department: "Computer Science",
    email: "emily.brown@faculty.edu",
    phone: "+1 234 567 892",
    expertise: ["Web Technologies", "Mobile Computing", "IoT"],
    achievements: ["Innovation in Teaching Award", "Research Excellence Award"]
  },
  {
    id: 4,
    name: "Prof. David Wilson",
    role: "Professor",
    department: "Computer Science",
    email: "david.wilson@faculty.edu",
    phone: "+1 234 567 893",
    expertise: ["Database Systems", "Big Data Analytics", "Data Mining"],
    achievements: ["Research Excellence Award", "Best Mentor Award"]
  },
  {
    id: 5,
    name: "Dr. Lisa Wang",
    role: "Associate Professor",
    department: "Computer Science",
    email: "lisa.wang@faculty.edu",
    phone: "+1 234 567 894",
    expertise: ["Computer Vision", "Deep Learning", "Pattern Recognition"],
    achievements: ["Innovation Award", "Outstanding Research Award"]
  },
  {
    id: 6,
    name: "Dr. James Anderson",
    role: "Professor",
    department: "Computer Science",
    email: "james.anderson@faculty.edu",
    phone: "+1 234 567 895",
    expertise: ["Network Security", "Cryptography", "Information Security"],
    achievements: ["Security Research Award", "Teaching Excellence Award"]
  },
  {
    id: 7,
    name: "Dr. Maria Garcia",
    role: "Assistant Professor",
    department: "Computer Science",
    email: "maria.garcia@faculty.edu",
    phone: "+1 234 567 896",
    expertise: ["Human-Computer Interaction", "UX Design", "Mobile Computing"],
    achievements: ["Best Paper Award", "Innovation in Teaching"]
  },
  {
    id: 8,
    name: "Prof. Robert Taylor",
    role: "Professor",
    department: "Computer Science",
    email: "robert.taylor@faculty.edu",
    phone: "+1 234 567 897",
    expertise: ["Algorithms", "Theory of Computation", "Discrete Mathematics"],
    achievements: ["Lifetime Achievement Award", "Best Faculty Award"]
  },
  {
    id: 9,
    name: "Dr. Jennifer Lee",
    role: "Associate Professor",
    department: "Computer Science",
    email: "jennifer.lee@faculty.edu",
    phone: "+1 234 567 898",
    expertise: ["Software Testing", "Quality Assurance", "Agile Methodologies"],
    achievements: ["Software Engineering Award", "Teaching Innovation Award"]
  },
  {
    id: 10,
    name: "Dr. Thomas Moore",
    role: "Professor",
    department: "Computer Science",
    email: "thomas.moore@faculty.edu",
    phone: "+1 234 567 899",
    expertise: ["Parallel Computing", "High Performance Computing", "Distributed Systems"],
    achievements: ["Research Impact Award", "Excellence in Mentoring"]
  }
];

export default function DashboardPage() {
  return (
    <DashboardLayoutComponent>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="container mx-auto p-6 space-y-6">
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <Button>
                  <BellRing className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </div>
            </motion.div>

            {/* Faculty Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Faculty Members</CardTitle>
                  <CardDescription>View all faculty members and their profiles</CardDescription>
                </CardHeader>
                <CardContent>
                  <FacultyGrid />
                </CardContent>
              </Card>
            </motion.div>

            {/* Overview Cards */}
            <motion.div 
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
                    <CalendarDays className="h-4 w-4 text-[#FF4EB8]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Next class: Advanced Database Systems at 11:30 AM</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                    <ClipboardList className="h-4 w-4 text-[#B23EFF]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">5 need grading by tomorrow</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Student Appointments</CardTitle>
                    <Users className="h-4 w-4 text-[#00CFFF]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">2 scheduled for today</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Research Projects</CardTitle>
                    <FileText className="h-4 w-4 text-[#FF4EB8]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">1 deadline approaching in 3 days</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Main Content Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="students">
                    <Link href="/students" className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Students
                    </Link>
                  </TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                <TabsContent value="schedule" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                        <CardDescription>Your classes and appointments for today</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <ScheduleItem
                            time="09:00 AM - 10:30 AM"
                            title="Introduction to Computer Science"
                            location="Room 101, Computer Science Building"
                            type="class"
                          />
                          <ScheduleItem
                            time="11:30 AM - 01:00 PM"
                            title="Advanced Database Systems"
                            location="Room 203, Computer Science Building"
                            type="class"
                          />
                          <ScheduleItem
                            time="02:00 PM - 03:00 PM"
                            title="Student Consultation"
                            location="Office 305"
                            type="appointment"
                          />
                          <ScheduleItem
                            time="03:30 PM - 05:00 PM"
                            title="Research Team Meeting"
                            location="Conference Room B"
                            type="meeting"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="classes" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Classes</CardTitle>
                        <CardDescription>Overview of your current classes and student performance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <ClassItem
                            code="CS101"
                            title="Introduction to Computer Science"
                            students={120}
                            progress={85}
                          />
                          <ClassItem
                            code="CS301"
                            title="Advanced Database Systems"
                            students={45}
                            progress={72}
                          />
                          <ClassItem
                            code="CS401"
                            title="Machine Learning Fundamentals"
                            students={38}
                            progress={90}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Student Overview</CardTitle>
                        <CardDescription>Key metrics and information about your students</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <div className="text-center">
                            <Users className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium">Student Analytics</h3>
                            <p className="text-sm text-gray-500">Student performance charts would appear here</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="research" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Research Projects</CardTitle>
                        <CardDescription>Your ongoing research initiatives and publications</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <ResearchItem
                            title="Machine Learning for Educational Assessment"
                            status="In Progress"
                            collaborators={5}
                            funding="$75,000"
                            deadline="2023-12-15"
                          />
                          <ResearchItem
                            title="Blockchain Applications in Academic Credentialing"
                            status="Planning"
                            collaborators={3}
                            funding="$50,000"
                            deadline="2024-03-30"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayoutComponent>
  )
}

interface ScheduleItemProps {
  time: string;
  title: string;
  location: string;
  type: string;
}

function ScheduleItem({ time, title, location, type }: ScheduleItemProps) {
  const getIcon = () => {
    switch (type) {
      case "class":
        return <BookOpen className="h-4 w-4 text-[#FF4EB8]" />
      case "appointment":
        return <Users className="h-4 w-4 text-[#B23EFF]" />
      case "meeting":
        return <MessageSquare className="h-4 w-4 text-[#00CFFF]" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <motion.div 
      className="flex items-start space-x-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.01, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-gray-500">{time}</p>
        <p className="text-xs text-gray-400">{location}</p>
      </div>
    </motion.div>
  )
}

interface TaskItemProps {
  title: string;
  dueDate: string;
  priority: string;
}

function TaskItem({ title, dueDate, priority }: TaskItemProps) {
  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <motion.div 
      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.01, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-3">
        <CheckCircle className={`h-5 w-5 ${getPriorityColor()}`} />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500">Due: {dueDate}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <CheckCircle className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  type: string;
}

function NotificationItem({ title, description, time, type }: NotificationItemProps) {
  const getIcon = () => {
    switch (type) {
      case "alert":
        return <BellRing className="h-4 w-4 text-red-500" />
      case "info":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <BellRing className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <motion.div 
      className="flex items-start space-x-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.01, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </motion.div>
  )
}

interface ClassItemProps {
  code: string;
  title: string;
  students: number;
  progress: number;
}

function ClassItem({ code, title, students, progress }: ClassItemProps) {
  return (
    <motion.div 
      className="p-4 rounded-lg border hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.01, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-medium">{code}</h3>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{students} Students</p>
          <p className="text-xs text-gray-500">Enrolled</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Class Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-[#FF4EB8] to-[#B23EFF] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

interface ResearchItemProps {
  title: string;
  status: string;
  collaborators: number;
  funding: string;
  deadline: string;
}

function ResearchItem({ title, status, collaborators, funding, deadline }: ResearchItemProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div 
      className="p-4 rounded-lg border hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.01, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor()}`}>
          {status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Collaborators</p>
          <p className="font-medium">{collaborators}</p>
        </div>
        <div>
          <p className="text-gray-500">Funding</p>
          <p className="font-medium">{funding}</p>
        </div>
        <div>
          <p className="text-gray-500">Deadline</p>
          <p className="font-medium">{deadline}</p>
        </div>
      </div>
    </motion.div>
  )
}
