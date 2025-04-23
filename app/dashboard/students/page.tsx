"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  Calendar,
  BookOpen,
  Award,
  Activity,
  ChevronDown,
  MoreVertical,
  X,
  Info,
  Send,
  GraduationCap,
  UserPlus,
  SlidersHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import dynamic from "next/dynamic"
import { Footer } from "@/components/footer"
import Image from "next/image"

const DashboardLayout = dynamic(() => import("@/components/dashboard-layout"), {
  ssr: false
})

interface Student {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  attendance: number;
  performance: number;
  status: string;
  courses: string[];
  achievements: string[];
  activities: string[];
}

interface Filters {
  attendance: string;
  performance: string;
  status: string;
}

// Mock data for students
const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    rollNo: "CS2023001",
    email: "john.doe@vignan.ac.in",
    phone: "+91 9876543210",
    department: "Computer Science",
    year: "3rd Year",
    attendance: 85,
    performance: 78,
    status: "Active",
    courses: ["Advanced Database Systems", "Machine Learning", "Web Development"],
    achievements: ["Best Project Award 2023", "Technical Quiz Winner"],
    activities: ["IEEE Student Member", "Coding Club Lead"]
  },
  {
    id: "2",
    name: "Jane Smith",
    rollNo: "CS2023002",
    email: "jane.smith@vignan.ac.in",
    phone: "+91 9876543211",
    department: "Computer Science",
    year: "3rd Year",
    attendance: 92,
    performance: 85,
    status: "Active",
    courses: ["Data Structures", "Operating Systems", "Computer Networks"],
    achievements: ["Academic Excellence Award", "Hackathon Winner"],
    activities: ["Student Council Member", "Research Assistant"]
  },
  // Add more mock students as needed
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [emailContent, setEmailContent] = useState("")
  const [meetingDate, setMeetingDate] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [meetingAgenda, setMeetingAgenda] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    attendance: "all",
    performance: "all",
    status: "all"
  })

  // New Student Form State
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    department: "Computer Science",
    year: "1st Year",
    status: "Active",
    courses: [],
    achievements: [],
    activities: []
  })
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [newCourse, setNewCourse] = useState("")
  const [newAchievement, setNewAchievement] = useState("")
  const [newActivity, setNewActivity] = useState("")

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment
    const matchesYear = selectedYear === "all" || student.year === selectedYear
    
    // Advanced Filters
    const matchesAttendance = filters.attendance === "all" || 
      (filters.attendance === "above90" && student.attendance >= 90) ||
      (filters.attendance === "above80" && student.attendance >= 80) ||
      (filters.attendance === "below80" && student.attendance < 80)

    const matchesPerformance = filters.performance === "all" ||
      (filters.performance === "excellent" && student.performance >= 90) ||
      (filters.performance === "good" && student.performance >= 75) ||
      (filters.performance === "average" && student.performance >= 60) ||
      (filters.performance === "poor" && student.performance < 60)

    const matchesStatus = filters.status === "all" || student.status === filters.status

    return matchesSearch && matchesDepartment && matchesYear && 
           matchesAttendance && matchesPerformance && matchesStatus
  })

  const handleSendEmail = (student: Student) => {
    // In a real application, this would send the email through your backend
    console.log(`Sending email to ${student.email}: ${emailContent}`)
    alert(`Email sent to ${student.name}!`)
    setEmailContent("")
  }

  const handleScheduleMeeting = (student: Student) => {
    // In a real application, this would schedule the meeting through your backend
    console.log(`Scheduling meeting with ${student.name} on ${meetingDate} at ${meetingTime}`)
    alert(`Meeting scheduled with ${student.name}!`)
    setMeetingDate("")
    setMeetingTime("")
    setMeetingAgenda("")
  }

  const handleContact = (student: Student) => {
    // In a real application, this might integrate with a messaging system or phone system
    window.location.href = `tel:${student.phone.replace(/\s/g, '')}`
  }

  const handleAddStudent = () => {
    // In a real application, this would send the data to your backend
    const newStudentData: Student = {
      ...newStudent as Student,
      id: `CS${Math.floor(Math.random() * 10000)}`,
      attendance: 100,
      performance: 100
    }
    
    // Add the new student to the list
    students.push(newStudentData)
    
    // Reset form and close dialog
    setNewStudent({
      name: "",
      rollNo: "",
      email: "",
      phone: "",
      department: "Computer Science",
      year: "1st Year",
      status: "Active",
      courses: [],
      achievements: [],
      activities: []
    })
    setShowAddStudent(false)
    alert("Student added successfully!")
  }

  const handleAddCourse = () => {
    if (newCourse && !newStudent.courses?.includes(newCourse)) {
      setNewStudent(prev => ({
        ...prev,
        courses: [...(prev.courses || []), newCourse]
      }))
      setNewCourse("")
    }
  }

  const handleAddAchievement = () => {
    if (newAchievement && !newStudent.achievements?.includes(newAchievement)) {
      setNewStudent(prev => ({
        ...prev,
        achievements: [...(prev.achievements || []), newAchievement]
      }))
      setNewAchievement("")
    }
  }

  const handleAddActivity = () => {
    if (newActivity && !newStudent.activities?.includes(newActivity)) {
      setNewStudent(prev => ({
        ...prev,
        activities: [...(prev.activities || []), newActivity]
      }))
      setNewActivity("")
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="container mx-auto p-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Students</h1>
                  <p className="text-gray-500">Manage and view student information</p>
                </div>
                <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#8e3fa8] hover:bg-[#7a3590]">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add New Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                      <DialogDescription>
                        Enter the student's information below
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name</label>
                          <Input
                            value={newStudent.name}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Student's full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Roll Number</label>
                          <Input
                            value={newStudent.rollNo}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, rollNo: e.target.value }))}
                            placeholder="e.g., CS2023001"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            type="email"
                            value={newStudent.email}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="student@vignan.ac.in"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <Input
                            value={newStudent.phone}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+91 XXXXXXXXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Department</label>
                          <select
                            className="w-full border rounded-md px-3 py-2"
                            value={newStudent.department}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, department: e.target.value }))}
                          >
                            <option value="Computer Science">Computer Science</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Mechanical">Mechanical</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Year</label>
                          <select
                            className="w-full border rounded-md px-3 py-2"
                            value={newStudent.year}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, year: e.target.value }))}
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                          </select>
                        </div>
                      </div>

                      {/* Courses Section */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Courses</label>
                        <div className="flex gap-2">
                          <Input
                            value={newCourse}
                            onChange={(e) => setNewCourse(e.target.value)}
                            placeholder="Add a course"
                          />
                          <Button onClick={handleAddCourse} variant="outline">Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {newStudent.courses?.map((course, index) => (
                            <Badge key={index} variant="outline">
                              {course}
                              <X
                                className="ml-2 h-3 w-3 cursor-pointer"
                                onClick={() => setNewStudent(prev => ({
                                  ...prev,
                                  courses: prev.courses?.filter((_, i) => i !== index)
                                }))}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements Section */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Achievements</label>
                        <div className="flex gap-2">
                          <Input
                            value={newAchievement}
                            onChange={(e) => setNewAchievement(e.target.value)}
                            placeholder="Add an achievement"
                          />
                          <Button onClick={handleAddAchievement} variant="outline">Add</Button>
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {newStudent.achievements?.map((achievement, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <span>{achievement}</span>
                              <X
                                className="h-4 w-4 cursor-pointer text-gray-500"
                                onClick={() => setNewStudent(prev => ({
                                  ...prev,
                                  achievements: prev.achievements?.filter((_, i) => i !== index)
                                }))}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activities Section */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Activities</label>
                        <div className="flex gap-2">
                          <Input
                            value={newActivity}
                            onChange={(e) => setNewActivity(e.target.value)}
                            placeholder="Add an activity"
                          />
                          <Button onClick={handleAddActivity} variant="outline">Add</Button>
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {newStudent.activities?.map((activity, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <span>{activity}</span>
                              <X
                                className="h-4 w-4 cursor-pointer text-gray-500"
                                onClick={() => setNewStudent(prev => ({
                                  ...prev,
                                  activities: prev.activities?.filter((_, i) => i !== index)
                                }))}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddStudent(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddStudent}
                        className="bg-[#8e3fa8] hover:bg-[#7a3590]"
                      >
                        Add Student
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filters and Search */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search students..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <select
                        className="border rounded-md px-3 py-2"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                      >
                        <option value="all">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                      </select>
                      <select
                        className="border rounded-md px-3 py-2"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                      >
                        <option value="all">All Years</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            More Filters
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Advanced Filters</DialogTitle>
                            <DialogDescription>
                              Filter students by additional criteria
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Attendance</label>
                              <select
                                className="w-full border rounded-md px-3 py-2"
                                value={filters.attendance}
                                onChange={(e) => setFilters(prev => ({ ...prev, attendance: e.target.value }))}
                              >
                                <option value="all">All Attendance</option>
                                <option value="above90">Above 90%</option>
                                <option value="above80">Above 80%</option>
                                <option value="below80">Below 80%</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Performance</label>
                              <select
                                className="w-full border rounded-md px-3 py-2"
                                value={filters.performance}
                                onChange={(e) => setFilters(prev => ({ ...prev, performance: e.target.value }))}
                              >
                                <option value="all">All Performance</option>
                                <option value="excellent">Excellent (90%+)</option>
                                <option value="good">Good (75-89%)</option>
                                <option value="average">Average (60-74%)</option>
                                <option value="poor">Needs Improvement (Less than 60%)</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Status</label>
                              <select
                                className="w-full border rounded-md px-3 py-2"
                                value={filters.status}
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                              >
                                <option value="all">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => setFilters({ attendance: "all", performance: "all", status: "all" })}
                            >
                              Reset Filters
                            </Button>
                            <DialogClose asChild>
                              <Button className="bg-[#8e3fa8] hover:bg-[#7a3590]">
                                Apply Filters
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Student Table */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Student List</CardTitle>
                      <CardDescription>View and manage student information</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.rollNo}</div>
                            </div>
                          </TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.year}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={student.attendance} className="w-[60px]" />
                              <span className="text-sm">{student.attendance}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={student.performance} className="w-[60px]" />
                              <span className="text-sm">{student.performance}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                  {/* Send Email Option */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Send Email
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Send Email to {student.name}</DialogTitle>
                                        <DialogDescription>
                                          Compose your email message below
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                          <p className="text-sm font-medium">To: {student.email}</p>
                                          <Textarea
                                            placeholder="Type your message here..."
                                            value={emailContent}
                                            onChange={(e) => setEmailContent(e.target.value)}
                                            rows={5}
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button 
                                          onClick={() => handleSendEmail(student)}
                                          className="bg-[#8e3fa8] hover:bg-[#7a3590]"
                                        >
                                          <Send className="mr-2 h-4 w-4" />
                                          Send Email
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>

                                  {/* Contact Option */}
                                  <DropdownMenuItem onClick={() => handleContact(student)}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Contact
                                  </DropdownMenuItem>

                                  {/* Schedule Meeting Option */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Schedule Meeting
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Schedule Meeting with {student.name}</DialogTitle>
                                        <DialogDescription>
                                          Set up a meeting time and agenda
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <label className="text-sm font-medium">Date</label>
                                            <Input
                                              type="date"
                                              value={meetingDate}
                                              onChange={(e) => setMeetingDate(e.target.value)}
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <label className="text-sm font-medium">Time</label>
                                            <Input
                                              type="time"
                                              value={meetingTime}
                                              onChange={(e) => setMeetingTime(e.target.value)}
                                            />
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Agenda</label>
                                          <Textarea
                                            placeholder="Meeting agenda..."
                                            value={meetingAgenda}
                                            onChange={(e) => setMeetingAgenda(e.target.value)}
                                            rows={3}
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button 
                                          onClick={() => handleScheduleMeeting(student)}
                                          className="bg-[#8e3fa8] hover:bg-[#7a3590]"
                                        >
                                          Schedule
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>

                                  {/* View Details Option */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Info className="mr-2 h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                      <DialogHeader>
                                        <DialogTitle>Student Details - {student.name}</DialogTitle>
                                        <DialogDescription>
                                          Comprehensive student information
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-6 py-4">
                                        {/* Basic Information */}
                                        <div className="space-y-2">
                                          <h3 className="text-lg font-semibold">Basic Information</h3>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <p className="text-sm text-gray-500">Roll Number</p>
                                              <p className="font-medium">{student.rollNo}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-gray-500">Department</p>
                                              <p className="font-medium">{student.department}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-gray-500">Year</p>
                                              <p className="font-medium">{student.year}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-gray-500">Status</p>
                                              <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                                                {student.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="space-y-2">
                                          <h3 className="text-lg font-semibold">Contact Information</h3>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <p className="text-sm text-gray-500">Email</p>
                                              <p className="font-medium">{student.email}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm text-gray-500">Phone</p>
                                              <p className="font-medium">{student.phone}</p>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Academic Performance */}
                                        <div className="space-y-2">
                                          <h3 className="text-lg font-semibold">Academic Performance</h3>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <p className="text-sm text-gray-500">Attendance</p>
                                              <div className="flex items-center gap-2 mt-1">
                                                <Progress value={student.attendance} className="w-[100px]" />
                                                <span>{student.attendance}%</span>
                                              </div>
                                            </div>
                                            <div>
                                              <p className="text-sm text-gray-500">Performance</p>
                                              <div className="flex items-center gap-2 mt-1">
                                                <Progress value={student.performance} className="w-[100px]" />
                                                <span>{student.performance}%</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Courses */}
                                        <div className="space-y-2">
                                          <h3 className="text-lg font-semibold">Current Courses</h3>
                                          <div className="flex flex-wrap gap-2">
                                            {student.courses.map((course, index) => (
                                              <Badge key={index} variant="outline">{course}</Badge>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="space-y-2">
                                          <h3 className="text-lg font-semibold">Achievements</h3>
                                          <ul className="list-disc list-inside space-y-1">
                                            {student.achievements.map((achievement, index) => (
                                              <li key={index} className="text-sm">{achievement}</li>
                                            ))}
                                          </ul>
                                        </div>

                                        {/* Activities */}
                                        <div className="space-y-2">
                                          <h3 className="text-lg font-semibold">Activities & Involvement</h3>
                                          <ul className="list-disc list-inside space-y-1">
                                            {student.activities.map((activity, index) => (
                                              <li key={index} className="text-sm">{activity}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button variant="outline">Close</Button>
                                        </DialogClose>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Student Information Section */}
            <div className="mt-12 mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Student Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Student 1 */}
                <div className="flex flex-col items-center space-y-4 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#8e3fa8] shadow-lg">
                    <Image
                      src="/gallery/lalli.jpg"
                      alt="Lalli"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">Lalli</h3>
                    <p className="text-gray-600">Computer Science</p>
                  </div>
                </div>

                {/* Student 2 */}
                <div className="flex flex-col items-center space-y-4 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#8e3fa8] shadow-lg">
                    <Image
                      src="/gallery/shoyab.jpg"
                      alt="Shoyab"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">Shoyab</h3>
                    <p className="text-gray-600">Computer Science</p>
                  </div>
                </div>

                {/* Student 3 */}
                <div className="flex flex-col items-center space-y-4 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#8e3fa8] shadow-lg">
                    <Image
                      src="/gallery/pravali.jpg"
                      alt="Pravalli"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">Pravalli</h3>
                    <p className="text-gray-600">Computer Science</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  )
} 