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
  Users,
  GraduationCap,
  Calendar,
  Clock,
  Search,
  Plus,
  Edit,
  Trash2,
  Building,
  FileText,
  BarChart,
  Star,
  CheckCircle,
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
  id: number;
  code: string;
  name: string;
  department: string;
  description: string;
  instructor: string;
  credits: number;
  semester: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  prerequisites: string[];
  maxStudents: number;
  enrolledStudents: number;
  syllabus: string;
  objectives: string[];
  assessmentCriteria: {
    type: string;
    weightage: number;
  }[];
  status: 'active' | 'inactive' | 'upcoming';
  rating: number;
  feedback: {
    positive: number;
    negative: number;
  };
  materials: string[];
  type: 'core' | 'elective';
  level: 'undergraduate' | 'postgraduate';
}

const initialCourses: Course[] = [
  {
    id: 1,
    code: "CS301",
    name: "Advanced Database Systems",
    department: "Computer Science",
    description: "Advanced concepts in database management and design",
    instructor: "Dr. John Smith",
    credits: 4,
    semester: "Fall 2024",
    schedule: [
      { day: "Monday", startTime: "10:00", endTime: "11:30", room: "CS-201" },
      { day: "Wednesday", startTime: "10:00", endTime: "11:30", room: "CS-201" }
    ],
    prerequisites: ["CS201", "CS202"],
    maxStudents: 40,
    enrolledStudents: 35,
    syllabus: "Introduction to advanced database concepts...",
    objectives: [
      "Understand advanced database concepts",
      "Design complex database systems",
      "Implement database optimization techniques"
    ],
    assessmentCriteria: [
      { type: "Assignments", weightage: 30 },
      { type: "Mid-term", weightage: 30 },
      { type: "Final", weightage: 40 }
    ],
    status: "active",
    rating: 4.5,
    feedback: {
      positive: 28,
      negative: 7
    },
    materials: ["Textbook", "Lecture Notes", "Practice Problems"],
    type: "core",
    level: "undergraduate"
  },
  {
    id: 2,
    code: "CS401",
    name: "Artificial Intelligence",
    department: "Computer Science",
    description: "Introduction to AI concepts and applications",
    instructor: "Dr. Sarah Johnson",
    credits: 4,
    semester: "Spring 2024",
    schedule: [
      { day: "Tuesday", startTime: "14:00", endTime: "15:30", room: "CS-301" },
      { day: "Thursday", startTime: "14:00", endTime: "15:30", room: "CS-301" }
    ],
    prerequisites: ["CS301", "CS303"],
    maxStudents: 35,
    enrolledStudents: 30,
    syllabus: "Introduction to AI and machine learning...",
    objectives: [
      "Understand AI fundamentals",
      "Implement machine learning algorithms",
      "Develop AI applications"
    ],
    assessmentCriteria: [
      { type: "Projects", weightage: 40 },
      { type: "Mid-term", weightage: 25 },
      { type: "Final", weightage: 35 }
    ],
    status: "active",
    rating: 4.8,
    feedback: {
      positive: 25,
      negative: 5
    },
    materials: ["Textbook", "Research Papers", "Project Materials"],
    type: "elective",
    level: "postgraduate"
  }
];

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Chemical',
  'Electrical',
];

const courseTypes = ['core', 'elective'];
const courseLevels = ['undergraduate', 'postgraduate'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
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
    const matchesType = typeFilter === 'all' || course.type === typeFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesTab = activeTab === 'all' || course.status === activeTab;
    return matchesSearch && matchesDepartment && matchesType && matchesLevel && matchesStatus && matchesTab;
  });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.code) {
      setCourses([...courses, {
        id: courses.length + 1,
        code: newCourse.code,
        name: newCourse.name,
        department: newCourse.department || '',
        description: newCourse.description || '',
        instructor: newCourse.instructor || '',
        credits: newCourse.credits || 0,
        semester: newCourse.semester || '',
        schedule: newCourse.schedule || [],
        prerequisites: newCourse.prerequisites || [],
        maxStudents: newCourse.maxStudents || 0,
        enrolledStudents: 0,
        syllabus: newCourse.syllabus || '',
        objectives: newCourse.objectives || [],
        assessmentCriteria: newCourse.assessmentCriteria || [],
        status: 'upcoming',
        rating: 0,
        feedback: { positive: 0, negative: 0 },
        materials: newCourse.materials || [],
        type: newCourse.type || 'core',
        level: newCourse.level || 'undergraduate'
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

  const handleDeleteCourse = (id: number) => {
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
        <Label htmlFor="instructor">Instructor</Label>
        <Input
          id="instructor"
          value={data.instructor || ''}
          onChange={(e) => onChange({ ...data, instructor: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="credits">Credits</Label>
        <Input
          id="credits"
          type="number"
          value={data.credits || ''}
          onChange={(e) => onChange({ ...data, credits: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="semester">Semester</Label>
        <Input
          id="semester"
          value={data.semester || ''}
          onChange={(e) => onChange({ ...data, semester: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxStudents">Maximum Students</Label>
        <Input
          id="maxStudents"
          type="number"
          value={data.maxStudents || ''}
          onChange={(e) => onChange({ ...data, maxStudents: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Course Type</Label>
        <Select
          value={data.type || 'core'}
          onValueChange={(value) => onChange({ ...data, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {courseTypes.map((type) => (
              <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="level">Course Level</Label>
        <Select
          value={data.level || 'undergraduate'}
          onValueChange={(value) => onChange({ ...data, level: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {courseLevels.map((level) => (
              <SelectItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description || ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="syllabus">Syllabus</Label>
        <Textarea
          id="syllabus"
          value={data.syllabus || ''}
          onChange={(e) => onChange({ ...data, syllabus: e.target.value })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="prerequisites">Prerequisites (comma-separated)</Label>
        <Input
          id="prerequisites"
          value={data.prerequisites?.join(', ') || ''}
          onChange={(e) => onChange({ ...data, prerequisites: e.target.value.split(',').map(p => p.trim()) })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="objectives">Learning Objectives (comma-separated)</Label>
        <Input
          id="objectives"
          value={data.objectives?.join(', ') || ''}
          onChange={(e) => onChange({ ...data, objectives: e.target.value.split(',').map(o => o.trim()) })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="materials">Course Materials (comma-separated)</Label>
        <Input
          id="materials"
          value={data.materials?.join(', ') || ''}
          onChange={(e) => onChange({ ...data, materials: e.target.value.split(',').map(m => m.trim()) })}
        />
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
          <p className="text-gray-500">Manage academic courses and their information</p>
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

      <div className="flex flex-col gap-4">
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {courseTypes.map(type => (
                <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {courseLevels.map(level => (
                <SelectItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{course.name}</h3>
                      <p className="text-gray-500">{course.code}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{course.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4" />
                      <span>Department: {course.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Semester: {course.semester}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-500">Enrolled</p>
                            <p className="text-lg font-semibold">{course.enrolledStudents}/{course.maxStudents}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-500">Rating</p>
                            <p className="text-lg font-semibold">{course.rating}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Prerequisites</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.prerequisites.map((prereq, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Schedule</h4>
                    <div className="space-y-1">
                      {course.schedule.map((slot, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {slot.day}: {slot.startTime} - {slot.endTime} ({slot.room})
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Assessment Criteria</h4>
                    <div className="space-y-1">
                      {course.assessmentCriteria.map((criteria, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>{criteria.type}</span>
                          <span>{criteria.weightage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Course Materials</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {course.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        course.status === 'active' ? 'bg-green-100 text-green-600' :
                        course.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      } capitalize`}>
                        {course.status}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        course.type === 'core' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
                      } capitalize`}>
                        {course.type}
                      </span>
                    </div>
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