'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Calendar,
  Award,
  BookOpen,
  Edit,
  Trash2,
  FileText,
  Star,
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
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  specialization: string;
  joiningDate: string;
  qualifications: string[];
  experience: number;
  publications: number;
  courses: string[];
  status: 'active' | 'on-leave' | 'retired';
  rating: number;
  researchAreas: string[];
  achievements: string[];
}

const initialFaculty: Faculty[] = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    phone: "+1 234-567-8901",
    department: "Computer Science",
    designation: "Professor",
    specialization: "Artificial Intelligence",
    joiningDate: "2018-09-01",
    qualifications: ["Ph.D. in Computer Science", "M.Tech in AI"],
    experience: 12,
    publications: 45,
    courses: ["Introduction to AI", "Machine Learning"],
    status: "active",
    rating: 4.8,
    researchAreas: ["Machine Learning", "Neural Networks", "Computer Vision"],
    achievements: ["Best Teacher Award 2022", "Research Excellence Award"]
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 234-567-8902",
    department: "Electronics",
    designation: "Associate Professor",
    specialization: "VLSI Design",
    joiningDate: "2019-01-15",
    qualifications: ["Ph.D. in Electronics", "M.S. in VLSI"],
    experience: 8,
    publications: 28,
    courses: ["Digital Electronics", "VLSI Design"],
    status: "active",
    rating: 4.6,
    researchAreas: ["VLSI", "Embedded Systems", "IoT"],
    achievements: ["Outstanding Research Paper 2023"]
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

const designations = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Visiting Professor',
  'Adjunct Professor',
];

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [designationFilter, setDesignationFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState<Partial<Faculty>>({});
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || f.department === departmentFilter;
    const matchesDesignation = designationFilter === 'all' || f.designation === designationFilter;
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'active' && f.status === 'active') ||
      (activeTab === 'on-leave' && f.status === 'on-leave') ||
      (activeTab === 'retired' && f.status === 'retired');
    return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus && matchesTab;
  });

  const handleAddFaculty = () => {
    if (newFaculty.name && newFaculty.email) {
      setFaculty([...faculty, {
        id: faculty.length + 1,
        name: newFaculty.name,
        email: newFaculty.email,
        phone: newFaculty.phone || '',
        department: newFaculty.department || '',
        designation: newFaculty.designation || '',
        specialization: newFaculty.specialization || '',
        joiningDate: newFaculty.joiningDate || new Date().toISOString().split('T')[0],
        qualifications: newFaculty.qualifications || [],
        experience: newFaculty.experience || 0,
        publications: newFaculty.publications || 0,
        courses: newFaculty.courses || [],
        status: 'active',
        rating: 0,
        researchAreas: newFaculty.researchAreas || [],
        achievements: newFaculty.achievements || []
      } as Faculty]);
      setNewFaculty({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditFaculty = (updatedFaculty: Faculty) => {
    setFaculty(faculty.map(f =>
      f.id === updatedFaculty.id ? updatedFaculty : f
    ));
    setEditingFaculty(null);
  };

  const handleDeleteFaculty = (id: number) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      setFaculty(faculty.filter(f => f.id !== id));
    }
  };

  const FacultyForm = ({ data, onChange, onSubmit, submitText }: any) => (
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
        <Label htmlFor="designation">Designation</Label>
        <Select
          value={data.designation || ''}
          onValueChange={(value) => onChange({ ...data, designation: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select designation" />
          </SelectTrigger>
          <SelectContent>
            {designations.map((desig) => (
              <SelectItem key={desig} value={desig}>{desig}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="specialization">Specialization</Label>
        <Input
          id="specialization"
          value={data.specialization || ''}
          onChange={(e) => onChange({ ...data, specialization: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Experience (Years)</Label>
        <Input
          id="experience"
          type="number"
          value={data.experience || ''}
          onChange={(e) => onChange({ ...data, experience: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="publications">Publications</Label>
        <Input
          id="publications"
          type="number"
          value={data.publications || ''}
          onChange={(e) => onChange({ ...data, publications: parseInt(e.target.value) })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="qualifications">Qualifications (comma-separated)</Label>
        <Input
          id="qualifications"
          value={data.qualifications?.join(', ') || ''}
          onChange={(e) => onChange({ ...data, qualifications: e.target.value.split(',').map(q => q.trim()) })}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="researchAreas">Research Areas (comma-separated)</Label>
        <Input
          id="researchAreas"
          value={data.researchAreas?.join(', ') || ''}
          onChange={(e) => onChange({ ...data, researchAreas: e.target.value.split(',').map(r => r.trim()) })}
        />
      </div>
      <div className="col-span-2 flex justify-end gap-4">
        <Button variant="outline" onClick={() => {
          if (submitText === 'Add Faculty') setIsAddDialogOpen(false);
          else setEditingFaculty(null);
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
          <h1 className="text-3xl font-bold">Faculty Management</h1>
          <p className="text-gray-500">Manage faculty members and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Faculty</DialogTitle>
            </DialogHeader>
            <FacultyForm
              data={newFaculty}
              onChange={setNewFaculty}
              onSubmit={handleAddFaculty}
              submitText="Add Faculty"
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
              {designations.map(desig => (
                <SelectItem key={desig} value={desig}>{desig}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Faculty</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="on-leave">On Leave</TabsTrigger>
            <TabsTrigger value="retired">Retired</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6">
        {filteredFaculty.map((f) => (
          <Card key={f.id}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{f.name}</h3>
                      <p className="text-gray-500">{f.designation}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{f.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{f.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4" />
                      <span>{f.department}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Specialization</h4>
                    <p className="text-sm text-gray-600">{f.specialization}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Research Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {f.researchAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Achievements</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {f.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-500">Publications</p>
                            <p className="text-lg font-semibold">{f.publications}</p>
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
                            <p className="text-lg font-semibold">{f.rating}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      f.status === 'active' ? 'bg-green-100 text-green-600' :
                      f.status === 'on-leave' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    } capitalize`}>
                      {f.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingFaculty(f)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteFaculty(f.id)}
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

      {/* Edit Faculty Dialog */}
      {editingFaculty && (
        <Dialog open={!!editingFaculty} onOpenChange={() => setEditingFaculty(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Faculty</DialogTitle>
            </DialogHeader>
            <FacultyForm
              data={editingFaculty}
              onChange={setEditingFaculty}
              onSubmit={() => handleEditFaculty(editingFaculty)}
              submitText="Save Changes"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 