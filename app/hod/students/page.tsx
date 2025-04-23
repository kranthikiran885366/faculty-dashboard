'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  BookOpen,
  Clock,
  Edit,
  Trash2,
  Star,
  FileText,
  Building,
  Award,
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

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  semester: number;
  batch: string;
  advisor: string;
  cgpa: number;
  attendance: number;
  courses: {
    code: string;
    name: string;
    grade?: string;
    attendance: number;
  }[];
  achievements: string[];
  activities: string[];
  status: 'active' | 'inactive' | 'graduated' | 'on-leave';
  personalInfo: {
    dateOfBirth: string;
    gender: string;
    address: string;
    guardianName: string;
    guardianContact: string;
  };
  academicHistory: {
    semester: number;
    gpa: number;
    credits: number;
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

const initialStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "CS20001",
    email: "john.doe@student.edu",
    phone: "+1 234 567 8901",
    department: "Computer Science",
    semester: 6,
    batch: "2020-2024",
    advisor: "Dr. Sarah Johnson",
    cgpa: 3.8,
    attendance: 92,
    courses: [
      { code: "CS301", name: "Database Systems", grade: "A", attendance: 95 },
      { code: "CS302", name: "Software Engineering", grade: "A-", attendance: 88 },
      { code: "CS303", name: "Computer Networks", grade: "B+", attendance: 90 }
    ],
    achievements: [
      "First Prize in Hackathon 2023",
      "Dean's List - Fall 2022"
    ],
    activities: [
      "Technical Club Secretary",
      "IEEE Student Member"
    ],
    status: "active",
    personalInfo: {
      dateOfBirth: "2002-05-15",
      gender: "Male",
      address: "123 College Ave, City, State",
      guardianName: "Robert Doe",
      guardianContact: "+1 234 567 8900"
    },
    academicHistory: [
      { semester: 1, gpa: 3.7, credits: 18 },
      { semester: 2, gpa: 3.8, credits: 18 },
      { semester: 3, gpa: 3.9, credits: 20 },
      { semester: 4, gpa: 3.7, credits: 19 },
      { semester: 5, gpa: 3.8, credits: 18 }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNumber: "CS20002",
    email: "jane.smith@student.edu",
    phone: "+1 234 567 8902",
    department: "Computer Science",
    semester: 6,
    batch: "2020-2024",
    advisor: "Dr. John Smith",
    cgpa: 3.9,
    attendance: 95,
    courses: [
      { code: "CS301", name: "Database Systems", grade: "A+", attendance: 98 },
      { code: "CS302", name: "Software Engineering", grade: "A", attendance: 92 },
      { code: "CS303", name: "Computer Networks", grade: "A", attendance: 95 }
    ],
    achievements: [
      "Best Project Award 2023",
      "Research Paper Publication"
    ],
    activities: [
      "Student Council Member",
      "Programming Club Lead"
    ],
    status: "active",
    personalInfo: {
      dateOfBirth: "2002-08-20",
      gender: "Female",
      address: "456 University Rd, City, State",
      guardianName: "Mary Smith",
      guardianContact: "+1 234 567 8903"
    },
    academicHistory: [
      { semester: 1, gpa: 3.8, credits: 18 },
      { semester: 2, gpa: 3.9, credits: 18 },
      { semester: 3, gpa: 4.0, credits: 20 },
      { semester: 4, gpa: 3.9, credits: 19 },
      { semester: 5, gpa: 3.9, credits: 18 }
    ]
  }
];

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({});
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    const matchesSemester = semesterFilter === 'all' || student.semester.toString() === semesterFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesTab = activeTab === 'all' || student.status === activeTab;
    return matchesSearch && matchesDepartment && matchesSemester && matchesStatus && matchesTab;
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.rollNumber) {
      setStudents([...students, {
        id: students.length + 1,
        name: newStudent.name,
        rollNumber: newStudent.rollNumber,
        email: newStudent.email || '',
        phone: newStudent.phone || '',
        department: newStudent.department || '',
        semester: newStudent.semester || 1,
        batch: newStudent.batch || '',
        advisor: newStudent.advisor || '',
        cgpa: 0,
        attendance: 0,
        courses: [],
        achievements: [],
        activities: [],
        status: 'active',
        personalInfo: {
          dateOfBirth: newStudent.personalInfo?.dateOfBirth || '',
          gender: newStudent.personalInfo?.gender || '',
          address: newStudent.personalInfo?.address || '',
          guardianName: newStudent.personalInfo?.guardianName || '',
          guardianContact: newStudent.personalInfo?.guardianContact || ''
        },
        academicHistory: []
      } as Student]);
      setNewStudent({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditStudent = (updatedStudent: Student) => {
    setStudents(students.map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: number) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const StudentForm = ({ data, onChange, onSubmit, submitText }: any) => (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={data.name || ''}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rollNumber">Roll Number</Label>
        <Input
          id="rollNumber"
          value={data.rollNumber || ''}
          onChange={(e) => onChange({ ...data, rollNumber: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email || ''}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={data.phone || ''}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
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
        <Label htmlFor="batch">Batch</Label>
        <Input
          id="batch"
          value={data.batch || ''}
          onChange={(e) => onChange({ ...data, batch: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="advisor">Faculty Advisor</Label>
        <Input
          id="advisor"
          value={data.advisor || ''}
          onChange={(e) => onChange({ ...data, advisor: e.target.value })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Personal Information</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={data.personalInfo?.dateOfBirth || ''}
              onChange={(e) => onChange({
                ...data,
                personalInfo: { ...data.personalInfo, dateOfBirth: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={data.personalInfo?.gender || ''}
              onValueChange={(value) => onChange({
                ...data,
                personalInfo: { ...data.personalInfo, gender: value }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={data.personalInfo?.address || ''}
              onChange={(e) => onChange({
                ...data,
                personalInfo: { ...data.personalInfo, address: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardianName">Guardian Name</Label>
            <Input
              id="guardianName"
              value={data.personalInfo?.guardianName || ''}
              onChange={(e) => onChange({
                ...data,
                personalInfo: { ...data.personalInfo, guardianName: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardianContact">Guardian Contact</Label>
            <Input
              id="guardianContact"
              value={data.personalInfo?.guardianContact || ''}
              onChange={(e) => onChange({
                ...data,
                personalInfo: { ...data.personalInfo, guardianContact: e.target.value }
              })}
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-end gap-4">
        <Button variant="outline" onClick={() => {
          if (submitText === 'Add Student') setIsAddDialogOpen(false);
          else setEditingStudent(null);
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
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-gray-500">Manage students and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <StudentForm
              data={newStudent}
              onChange={setNewStudent}
              onSubmit={handleAddStudent}
              submitText="Add Student"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search students..."
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
            <SelectItem value="graduated">Graduated</SelectItem>
            <SelectItem value="on-leave">On Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="graduated">Graduated</TabsTrigger>
          <TabsTrigger value="on-leave">On Leave</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{student.name}</h3>
                      <p className="text-gray-500">{student.rollNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{student.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4" />
                      <span>{student.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Semester {student.semester} | Batch {student.batch}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <div>
                            <p className="text-sm text-gray-500">CGPA</p>
                            <p className="text-lg font-bold">{student.cgpa}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-500">Attendance</p>
                            <p className="text-lg font-bold">{student.attendance}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Current Courses</h4>
                    <div className="space-y-2">
                      {student.courses.map((course, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{course.code} - {course.name}</span>
                          <span className="font-medium">{course.grade || 'N/A'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm px-2 py-1 rounded-full capitalize ${
                      student.status === 'active' ? 'bg-green-100 text-green-600' :
                      student.status === 'inactive' ? 'bg-red-100 text-red-600' :
                      student.status === 'graduated' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {student.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingStudent(student)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Achievements</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {student.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Activities</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {student.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Student Dialog */}
      {editingStudent && (
        <Dialog open={!!editingStudent} onOpenChange={() => setEditingStudent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
            </DialogHeader>
            <StudentForm
              data={editingStudent}
              onChange={setEditingStudent}
              onSubmit={() => handleEditStudent(editingStudent)}
              submitText="Save Changes"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 