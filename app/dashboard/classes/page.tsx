"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Book,
  Search,
  Download,
  Users,
  Calendar,
  Clock,
  MoreVertical,
  Plus,
  ChevronRight,
  GraduationCap,
  BarChart,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
  FileText
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

const DashboardLayout = dynamic(() => import("@/components/dashboard-layout"), {
  ssr: false
})

interface Class {
  id: string;
  name: string;
  code: string;
  department: string;
  instructor: string;
  schedule: string;
  time: string;
  totalStudents: number;
  averageAttendance: number;
  averagePerformance: number;
  status: "Active" | "Completed" | "Upcoming";
  syllabus: string[];
  assignments: Assignment[];
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: "Pending" | "Completed";
  averageScore?: number;
}

// Mock data for classes
const classes: Class[] = [
  {
    id: "1",
    name: "Advanced Database Systems",
    code: "CS401",
    department: "Computer Science",
    instructor: "Dr. John Smith",
    schedule: "Monday, Wednesday",
    time: "10:00 AM - 11:30 AM",
    totalStudents: 45,
    averageAttendance: 88,
    averagePerformance: 82,
    status: "Active",
    syllabus: [
      "Introduction to Advanced Database Concepts",
      "Query Optimization",
      "Transaction Management",
      "Distributed Databases",
      "Data Warehousing"
    ],
    assignments: [
      {
        id: "a1",
        title: "Database Design Project",
        dueDate: "2024-04-15",
        status: "Pending"
      },
      {
        id: "a2",
        title: "Query Optimization Lab",
        dueDate: "2024-04-01",
        status: "Completed",
        averageScore: 85
      }
    ]
  },
  {
    id: "2",
    name: "Machine Learning",
    code: "CS402",
    department: "Computer Science",
    instructor: "Dr. Sarah Johnson",
    schedule: "Tuesday, Thursday",
    time: "2:00 PM - 3:30 PM",
    totalStudents: 38,
    averageAttendance: 92,
    averagePerformance: 78,
    status: "Active",
    syllabus: [
      "Introduction to Machine Learning",
      "Supervised Learning",
      "Unsupervised Learning",
      "Neural Networks",
      "Deep Learning"
    ],
    assignments: [
      {
        id: "a3",
        title: "Classification Algorithm Implementation",
        dueDate: "2024-04-20",
        status: "Pending"
      }
    ]
  }
]

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddClass, setShowAddClass] = useState(false)
  const [newClass, setNewClass] = useState({
    name: "",
    code: "",
    department: "Computer Science",
    instructor: "",
    schedule: "",
    time: "",
    syllabus: [] as string[],
  })
  const [newSyllabusItem, setNewSyllabusItem] = useState("")

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || cls.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || cls.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleAddSyllabusItem = () => {
    if (newSyllabusItem && !newClass.syllabus.includes(newSyllabusItem)) {
      setNewClass(prev => ({
        ...prev,
        syllabus: [...prev.syllabus, newSyllabusItem]
      }))
      setNewSyllabusItem("")
    }
  }

  const handleAddClass = () => {
    // In a real application, this would send the data to your backend
    const newClassData: Class = {
      ...newClass,
      id: `CS${Math.floor(Math.random() * 10000)}`,
      totalStudents: 0,
      averageAttendance: 0,
      averagePerformance: 0,
      status: "Upcoming",
      assignments: []
    }
    
    classes.push(newClassData)
    setShowAddClass(false)
    alert("Class added successfully!")
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
              <p className="text-gray-500">Manage and monitor class information</p>
            </div>
            <Dialog open={showAddClass} onOpenChange={setShowAddClass}>
              <DialogTrigger asChild>
                <Button className="bg-[#8e3fa8] hover:bg-[#7a3590]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Class
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                  <DialogDescription>
                    Enter the class information below
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class Name</label>
                      <Input
                        value={newClass.name}
                        onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Advanced Database Systems"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class Code</label>
                      <Input
                        value={newClass.code}
                        onChange={(e) => setNewClass(prev => ({ ...prev, code: e.target.value }))}
                        placeholder="e.g., CS401"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <select
                        className="w-full border rounded-md px-3 py-2"
                        value={newClass.department}
                        onChange={(e) => setNewClass(prev => ({ ...prev, department: e.target.value }))}
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Instructor</label>
                      <Input
                        value={newClass.instructor}
                        onChange={(e) => setNewClass(prev => ({ ...prev, instructor: e.target.value }))}
                        placeholder="Instructor name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Schedule</label>
                      <Input
                        value={newClass.schedule}
                        onChange={(e) => setNewClass(prev => ({ ...prev, schedule: e.target.value }))}
                        placeholder="e.g., Monday, Wednesday"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time</label>
                      <Input
                        value={newClass.time}
                        onChange={(e) => setNewClass(prev => ({ ...prev, time: e.target.value }))}
                        placeholder="e.g., 10:00 AM - 11:30 AM"
                      />
                    </div>
                  </div>

                  {/* Syllabus Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Syllabus</label>
                    <div className="flex gap-2">
                      <Input
                        value={newSyllabusItem}
                        onChange={(e) => setNewSyllabusItem(e.target.value)}
                        placeholder="Add a syllabus item"
                      />
                      <Button onClick={handleAddSyllabusItem} variant="outline">Add</Button>
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {newClass.syllabus.map((item, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{item}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setNewClass(prev => ({
                              ...prev,
                              syllabus: prev.syllabus.filter((_, i) => i !== index)
                            }))}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddClass(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddClass}
                    className="bg-[#8e3fa8] hover:bg-[#7a3590]"
                  >
                    Add Class
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
                      placeholder="Search classes..."
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
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{cls.name}</CardTitle>
                      <CardDescription>{cls.code}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Class Details - {cls.name}</DialogTitle>
                              <DialogDescription>{cls.code}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              {/* Basic Information */}
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Basic Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Department</p>
                                    <p className="font-medium">{cls.department}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Instructor</p>
                                    <p className="font-medium">{cls.instructor}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Schedule</p>
                                    <p className="font-medium">{cls.schedule}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Time</p>
                                    <p className="font-medium">{cls.time}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Performance Metrics */}
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Performance Metrics</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Average Attendance</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Progress value={cls.averageAttendance} className="w-[100px]" />
                                      <span>{cls.averageAttendance}%</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Average Performance</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Progress value={cls.averagePerformance} className="w-[100px]" />
                                      <span>{cls.averagePerformance}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Syllabus */}
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Syllabus</h3>
                                <ul className="list-disc list-inside space-y-1">
                                  {cls.syllabus.map((item, index) => (
                                    <li key={index} className="text-sm">{item}</li>
                                  ))}
                                </ul>
                              </div>

                              {/* Assignments */}
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Assignments</h3>
                                <div className="space-y-2">
                                  {cls.assignments.map((assignment) => (
                                    <div key={assignment.id} className="flex items-center justify-between p-2 border rounded-md">
                                      <div>
                                        <p className="font-medium">{assignment.title}</p>
                                        <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {assignment.averageScore && (
                                          <Badge variant="outline">
                                            Avg. Score: {assignment.averageScore}%
                                          </Badge>
                                        )}
                                        <Badge variant={assignment.status === "Completed" ? "default" : "secondary"}>
                                          {assignment.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Class
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Class
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GraduationCap className="h-4 w-4" />
                      <span>{cls.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{cls.totalStudents} Students</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance</span>
                        <span>{cls.averageAttendance}%</span>
                      </div>
                      <Progress value={cls.averageAttendance} />
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant={
                        cls.status === "Active" ? "default" :
                        cls.status === "Completed" ? "secondary" :
                        "outline"
                      }>
                        {cls.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
} 