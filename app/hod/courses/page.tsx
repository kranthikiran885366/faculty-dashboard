'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Search,
  Plus,
  Users,
  Calendar,
  Clock,
  Edit,
  Trash2,
  GraduationCap,
  FileText,
  BarChart2,
  Activity,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  instructor: string;
  description: string;
  prerequisites: string[];
  objectives: string[];
  syllabus: string;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  enrolledStudents: number;
  maxCapacity: number;
  status: 'active' | 'inactive' | 'upcoming';
  assessments: {
    type: string;
    weightage: number;
    date?: string;
  }[];
  performance: {
    averageScore: number;
    passRate: number;
    gradeDistribution: {
      grade: string;
      count: number;
    }[];
  };
}

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Chemical',
  'Electrical',
];

const initialCourses: Course[] = [
  {
    id: "1",
    code: "CS301",
    name: "Database Systems",
    department: "Computer Science",
    semester: 5,
    credits: 4,
    instructor: "Dr. Sarah Johnson",
    description: "Introduction to database concepts and systems",
    prerequisites: ["CS201", "CS202"],
    objectives: [
      "Understand database fundamentals",
      "Learn SQL and database design",
      "Implement database systems"
    ],
    syllabus: "1. Introduction to DBMS\n2. ER Modeling\n3. SQL\n4. Normalization",
    schedule: [
      { day: "Monday", time: "10:00 AM", room: "Lab 301" },
      { day: "Wednesday", time: "10:00 AM", room: "Lab 301" }
    ],
    enrolledStudents: 55,
    maxCapacity: 60,
    status: "active",
    assessments: [
      { type: "Mid-term", weightage: 30, date: "2024-03-15" },
      { type: "Assignments", weightage: 20 },
      { type: "Final", weightage: 50, date: "2024-05-20" }
    ],
    performance: {
      averageScore: 85,
      passRate: 92,
      gradeDistribution: [
        { grade: "A", count: 15 },
        { grade: "B", count: 20 },
        { grade: "C", count: 8 },
        { grade: "D", count: 2 }
      ]
    }
  },
  {
    id: "2",
    code: "CS302",
    name: "Software Engineering",
    department: "Computer Science",
    semester: 5,
    credits: 4,
    instructor: "Dr. Michael Brown",
    description: "Software development lifecycle and methodologies",
    prerequisites: ["CS201"],
    objectives: [
      "Understand software development processes",
      "Learn project management techniques",
      "Practice software design patterns"
    ],
    syllabus: "1. SDLC\n2. Agile Methodology\n3. Testing\n4. Project Management",
    schedule: [
      { day: "Tuesday", time: "11:00 AM", room: "Room 201" },
      { day: "Thursday", time: "11:00 AM", room: "Room 201" }
    ],
    enrolledStudents: 50,
    maxCapacity: 55,
    status: "active",
    assessments: [
      { type: "Project", weightage: 40 },
      { type: "Mid-term", weightage: 20, date: "2024-03-20" },
      { type: "Final", weightage: 40, date: "2024-05-25" }
    ],
    performance: {
      averageScore: 82,
      passRate: 88,
      gradeDistribution: [
        { grade: "A", count: 12 },
        { grade: "B", count: 25 },
        { grade: "C", count: 10 },
        { grade: "D", count: 3 }
      ]
    }
  }
];

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({});
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || course.department === departmentFilter;
    const matchesSemester = semesterFilter === 'all' || course.semester.toString() === semesterFilter;
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesTab = activeTab === 'all' || course.status === activeTab;
    return matchesSearch && matchesDepartment && matchesSemester && matchesStatus && matchesTab;
  });

  const handleAddCourse = () => {
    if (newCourse.code && newCourse.name) {
      setCourses([...courses, {
        id: String(courses.length + 1),
        code: newCourse.code,
        name: newCourse.name,
        department: newCourse.department || '',
        semester: newCourse.semester || 1,
        credits: newCourse.credits || 0,
        instructor: newCourse.instructor || '',
        description: newCourse.description || '',
        prerequisites: newCourse.prerequisites || [],
        objectives: newCourse.objectives || [],
        syllabus: newCourse.syllabus || '',
        schedule: newCourse.schedule || [],
        enrolledStudents: 0,
        maxCapacity: newCourse.maxCapacity || 60,
        status: 'upcoming',
        assessments: [],
        performance: {
          averageScore: 0,
          passRate: 0,
          gradeDistribution: []
        }
      } as Course]);
      setNewCourse({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course =>
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const CourseForm = ({ data, onChange, onSubmit, submitText }: any) => (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="code">Course Code</Label>
        <Input
          id="code"
          value={data.code || ''}
          onChange={(e) => onChange({ ...data, code: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Course Name</Label>
        <Input
          id="name"
          value={data.name || ''}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select
          value={data.department || ''}
          onValueChange={(value) => onChange({ ...data, department: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="semester">Semester</Label>
        <Input
          id="semester"
          type="number"
          min={1}
          max={8}
          value={data.semester || ''}
          onChange={(e) => onChange({ ...data, semester: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="credits">Credits</Label>
        <Input
          id="credits"
          type="number"
          min={1}
          max={6}
          value={data.credits || ''}
          onChange={(e) => onChange({ ...data, credits: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="instructor">Instructor</Label>
        <Input
          id="instructor"
          value={data.instructor || ''}
          onChange={(e) => onChange({ ...data, instructor: e.target.value })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description || ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxCapacity">Maximum Capacity</Label>
        <Input
          id="maxCapacity"
          type="number"
          min={1}
          value={data.maxCapacity || ''}
          onChange={(e) => onChange({ ...data, maxCapacity: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={data.status || ''}
          onValueChange={(value) => onChange({ ...data, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex justify-end gap-4">
        <Button variant="outline" onClick={() => {
          if (submitText === 'Add Course') setIsAddDialogOpen(false);
          else setEditingCourse(null);
        }}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>{submitText}</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-gray-500">Manage department courses and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <CourseForm
              data={newCourse}
              onChange={setNewCourse}
              onSubmit={handleAddCourse}
              submitText="Add Course"
            />
          </DialogContent>
        </Dialog>
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
        <Select value={semesterFilter} onValueChange={setSemesterFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{course.name}</h3>
                      <p className="text-gray-500">{course.code}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>{course.department} | Semester {course.semester}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.credits} Credits</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Enrolled</p>
                            <p className="text-lg font-bold">{course.enrolledStudents}/{course.maxCapacity}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <BarChart2 className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-500">Pass Rate</p>
                            <p className="text-lg font-bold">{course.performance.passRate}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Schedule</h4>
                    <div className="space-y-2">
                      {course.schedule.map((schedule, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{schedule.day}</span>
                          <span>{schedule.time} - Room {schedule.room}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm px-2 py-1 rounded-full capitalize ${
                      course.status === 'active' ? 'bg-green-100 text-green-600' :
                      course.status === 'inactive' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {course.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCourse(course)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Assessments</h4>
                    <div className="space-y-2">
                      {course.assessments.map((assessment, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{assessment.type}</span>
                          <span>{assessment.weightage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Grade Distribution</h4>
                    <div className="space-y-2">
                      {course.performance.gradeDistribution.map((grade, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>Grade {grade.grade}</span>
                          <span>{grade.count} students</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Course Dialog */}
      {editingCourse && (
        <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            <CourseForm
              data={editingCourse}
              onChange={setEditingCourse}
              onSubmit={() => handleEditCourse(editingCourse)}
              submitText="Save Changes"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 