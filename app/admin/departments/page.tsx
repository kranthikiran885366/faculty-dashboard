'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Award,
  FileText,
  BarChart,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  hodName: string;
  hodEmail: string;
  establishedYear: number;
  facultyCount: number;
  studentCount: number;
  coursesCount: number;
  researchProjects: number;
  publications: number;
  achievements: string[];
  facilities: string[];
  status: 'active' | 'inactive';
  budget: number;
  location: string;
  contactEmail: string;
  website: string;
}

const initialDepartments: Department[] = [
  {
    id: 1,
    name: "Computer Science",
    code: "CS",
    description: "Department of Computer Science and Engineering",
    hodName: "Dr. John Smith",
    hodEmail: "john.smith@university.edu",
    establishedYear: 1990,
    facultyCount: 25,
    studentCount: 450,
    coursesCount: 32,
    researchProjects: 15,
    publications: 85,
    achievements: [
      "Best Department Award 2023",
      "Research Excellence Award",
      "Industry Collaboration Award"
    ],
    facilities: [
      "AI Research Lab",
      "High Performance Computing Lab",
      "Software Development Center"
    ],
    status: 'active',
    budget: 2500000,
    location: "Block A, Floor 2",
    contactEmail: "cs@university.edu",
    website: "cs.university.edu"
  },
  {
    id: 2,
    name: "Electronics",
    code: "ECE",
    description: "Department of Electronics and Communication Engineering",
    hodName: "Dr. Sarah Johnson",
    hodEmail: "sarah.johnson@university.edu",
    establishedYear: 1985,
    facultyCount: 20,
    studentCount: 380,
    coursesCount: 28,
    researchProjects: 12,
    publications: 65,
    achievements: [
      "Innovation Award 2023",
      "Best Research Infrastructure"
    ],
    facilities: [
      "VLSI Design Lab",
      "Embedded Systems Lab",
      "IoT Research Center"
    ],
    status: 'active',
    budget: 2200000,
    location: "Block B, Floor 1",
    contactEmail: "ece@university.edu",
    website: "ece.university.edu"
  }
];

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({});
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.hodName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dept.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddDepartment = () => {
    if (newDepartment.name && newDepartment.code) {
      setDepartments([...departments, {
        id: departments.length + 1,
        name: newDepartment.name,
        code: newDepartment.code,
        description: newDepartment.description || '',
        hodName: newDepartment.hodName || '',
        hodEmail: newDepartment.hodEmail || '',
        establishedYear: newDepartment.establishedYear || new Date().getFullYear(),
        facultyCount: 0,
        studentCount: 0,
        coursesCount: 0,
        researchProjects: 0,
        publications: 0,
        achievements: [],
        facilities: [],
        status: 'active',
        budget: newDepartment.budget || 0,
        location: newDepartment.location || '',
        contactEmail: newDepartment.contactEmail || '',
        website: newDepartment.website || ''
      } as Department]);
      setNewDepartment({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditDepartment = (updatedDepartment: Department) => {
    setDepartments(departments.map(dept =>
      dept.id === updatedDepartment.id ? updatedDepartment : dept
    ));
    setEditingDepartment(null);
  };

  const handleDeleteDepartment = (id: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  const DepartmentForm = ({ data, onChange, onSubmit, submitText }: any) => (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Department Name</Label>
        <Input
          id="name"
          value={data.name || ''}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="code">Department Code</Label>
        <Input
          id="code"
          value={data.code || ''}
          onChange={(e) => onChange({ ...data, code: e.target.value })}
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
        <Label htmlFor="hodName">HOD Name</Label>
        <Input
          id="hodName"
          value={data.hodName || ''}
          onChange={(e) => onChange({ ...data, hodName: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hodEmail">HOD Email</Label>
        <Input
          id="hodEmail"
          type="email"
          value={data.hodEmail || ''}
          onChange={(e) => onChange({ ...data, hodEmail: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="establishedYear">Established Year</Label>
        <Input
          id="establishedYear"
          type="number"
          value={data.establishedYear || ''}
          onChange={(e) => onChange({ ...data, establishedYear: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Annual Budget</Label>
        <Input
          id="budget"
          type="number"
          value={data.budget || ''}
          onChange={(e) => onChange({ ...data, budget: parseFloat(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location || ''}
          onChange={(e) => onChange({ ...data, location: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          type="email"
          value={data.contactEmail || ''}
          onChange={(e) => onChange({ ...data, contactEmail: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={data.website || ''}
          onChange={(e) => onChange({ ...data, website: e.target.value })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="facilities">Facilities (comma-separated)</Label>
        <Input
          id="facilities"
          value={data.facilities?.join(', ') || ''}
          onChange={(e) => onChange({ ...data, facilities: e.target.value.split(',').map(f => f.trim()) })}
        />
      </div>
      <div className="col-span-2 flex justify-end gap-4">
        <Button variant="outline" onClick={() => {
          if (submitText === 'Add Department') setIsAddDialogOpen(false);
          else setEditingDepartment(null);
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
          <h1 className="text-3xl font-bold">Department Management</h1>
          <p className="text-gray-500">Manage academic departments and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
            </DialogHeader>
            <DepartmentForm
              data={newDepartment}
              onChange={setNewDepartment}
              onSubmit={handleAddDepartment}
              submitText="Add Department"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                      <Building className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{dept.name}</h3>
                      <p className="text-gray-500">{dept.code}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{dept.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>HOD: {dept.hodName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Established: {dept.establishedYear}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Faculty</p>
                          <p className="text-lg font-semibold">{dept.facultyCount}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Students</p>
                          <p className="text-lg font-semibold">{dept.studentCount}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Courses</p>
                          <p className="text-lg font-semibold">{dept.coursesCount}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Publications</p>
                          <p className="text-lg font-semibold">{dept.publications}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {dept.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Achievements</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {dept.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      dept.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    } capitalize`}>
                      {dept.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingDepartment(dept)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteDepartment(dept.id)}
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

      {/* Edit Department Dialog */}
      {editingDepartment && (
        <Dialog open={!!editingDepartment} onOpenChange={() => setEditingDepartment(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Department</DialogTitle>
            </DialogHeader>
            <DepartmentForm
              data={editingDepartment}
              onChange={setEditingDepartment}
              onSubmit={() => handleEditDepartment(editingDepartment)}
              submitText="Save Changes"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 