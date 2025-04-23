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
  Award,
  BookOpen,
  Calendar,
  GraduationCap,
  Building,
  Clock,
  Edit,
  Trash2,
  Star,
  FileText,
  MessageSquare,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  specialization: string;
  joinDate: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  experience: number;
  courses: {
    code: string;
    name: string;
    semester: string;
  }[];
  publications: number;
  research: string[];
  rating: number;
  status: 'active' | 'on-leave' | 'inactive';
  image: string;
}

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Chemical',
  'Electrical',
];

const designations = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Senior Lecturer',
  'Lecturer',
];

const initialFaculty: Faculty[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1-234-567-8901",
    department: "Computer Science",
    designation: "Associate Professor",
    specialization: "Database Systems",
    joinDate: "2020-01-15",
    education: [
      {
        degree: "Ph.D.",
        institution: "Stanford University",
        year: 2018
      },
      {
        degree: "M.S.",
        institution: "MIT",
        year: 2014
      }
    ],
    experience: 8,
    courses: [
      {
        code: "CS301",
        name: "Database Systems",
        semester: "Fall 2024"
      },
      {
        code: "CS401",
        name: "Advanced Database Management",
        semester: "Spring 2024"
      }
    ],
    publications: 15,
    research: [
      "Distributed Database Systems",
      "Query Optimization",
      "Big Data Analytics"
    ],
    rating: 4.8,
    status: "active",
    image: "/faculty/sarah-johnson.jpg"
  },
  {
    id: "2",
    name: "Dr. Michael Brown",
    email: "michael.brown@university.edu",
    phone: "+1-234-567-8902",
    department: "Computer Science",
    designation: "Professor",
    specialization: "Software Engineering",
    joinDate: "2018-08-20",
    education: [
      {
        degree: "Ph.D.",
        institution: "UC Berkeley",
        year: 2015
      },
      {
        degree: "M.S.",
        institution: "Carnegie Mellon",
        year: 2011
      }
    ],
    experience: 12,
    courses: [
      {
        code: "CS302",
        name: "Software Engineering",
        semester: "Fall 2024"
      },
      {
        code: "CS402",
        name: "Software Architecture",
        semester: "Spring 2024"
      }
    ],
    publications: 25,
    research: [
      "Software Architecture",
      "Design Patterns",
      "Agile Methodologies"
    ],
    rating: 4.6,
    status: "active",
    image: "/faculty/michael-brown.jpg"
  }
];

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [designationFilter, setDesignationFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesDesignation = designationFilter === 'all' || member.designation === designationFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus;
  });

  const handleAddFaculty = (newFaculty: Partial<Faculty>) => {
    const facultyMember: Faculty = {
      id: String(faculty.length + 1),
      name: newFaculty.name || '',
      email: newFaculty.email || '',
      phone: newFaculty.phone || '',
      department: newFaculty.department || '',
      designation: newFaculty.designation || '',
      specialization: newFaculty.specialization || '',
      joinDate: newFaculty.joinDate || new Date().toISOString().split('T')[0],
      education: newFaculty.education || [],
      experience: newFaculty.experience || 0,
      courses: newFaculty.courses || [],
      publications: newFaculty.publications || 0,
      research: newFaculty.research || [],
      rating: newFaculty.rating || 0,
      status: 'active',
      image: newFaculty.image || '/placeholder.svg'
    };
    setFaculty([...faculty, facultyMember]);
    setIsAddDialogOpen(false);
  };

  const handleEditFaculty = (updatedFaculty: Faculty) => {
    setFaculty(faculty.map(member => 
      member.id === updatedFaculty.id ? updatedFaculty : member
    ));
    setEditingFaculty(null);
  };

  const handleDeleteFaculty = (facultyId: string) => {
    setFaculty(faculty.filter(member => member.id !== facultyId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Faculty Management</h1>
          <p className="text-gray-500">Manage department faculty members</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Faculty Member</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Full name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Email address" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="Phone number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Designation</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map(designation => (
                        <SelectItem key={designation} value={designation}>
                          {designation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Specialization</label>
                  <Input placeholder="Area of specialization" />
                </div>
                <div>
                  <label className="text-sm font-medium">Join Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium">Experience (years)</label>
                  <Input type="number" min="0" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium">Research Interests</label>
              <Textarea placeholder="Enter research interests (comma separated)" />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAddFaculty({})}>Add Faculty</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Faculty</p>
                <h3 className="text-2xl font-bold">{faculty.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Courses</p>
                <h3 className="text-2xl font-bold">
                  {faculty.reduce((sum, member) => sum + member.courses.length, 0)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Publications</p>
                <h3 className="text-2xl font-bold">
                  {faculty.reduce((sum, member) => sum + member.publications, 0)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Rating</p>
                <h3 className="text-2xl font-bold">
                  {(faculty.reduce((sum, member) => sum + member.rating, 0) / faculty.length).toFixed(1)}
                </h3>
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
            placeholder="Search faculty..."
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
        <Select value={designationFilter} onValueChange={setDesignationFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Designation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Designations</SelectItem>
            {designations.map(designation => (
              <SelectItem key={designation} value={designation}>
                {designation}
              </SelectItem>
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
            <SelectItem value="on-leave">On Leave</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredFaculty.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="flex gap-6">
                  <div className="h-24 w-24 rounded-lg overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-gray-500">{member.designation}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(member.joinDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {member.experience} years experience
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingFaculty(member)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteFaculty(member.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Education</h4>
                  <div className="space-y-2">
                    {member.education.map((edu, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-gray-600">{edu.institution}, {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Current Courses</h4>
                  <div className="space-y-2">
                    {member.courses.map((course, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">{course.name}</p>
                        <p className="text-gray-600">{course.code} - {course.semester}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Research Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.research.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingFaculty && (
        <Dialog open={!!editingFaculty} onOpenChange={() => setEditingFaculty(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Faculty Member</DialogTitle>
            </DialogHeader>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setEditingFaculty(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleEditFaculty(editingFaculty)}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 