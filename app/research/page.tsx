'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  Clock,
  Users,
  FileText,
  BarChart3,
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock4
} from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

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
  }
];

interface ResearchProject {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Not Started' | 'In Progress' | 'Under Review' | 'Completed';
  fundingAmount: string;
  collaborators: string[];
  publications: string[];
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
  department: string;
}

const researchProjects: ResearchProject[] = [
  {
    id: 1,
    title: "AI-Driven Educational Assessment",
    description: "Developing AI models to enhance educational assessment methods",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    status: "In Progress",
    fundingAmount: "$150,000",
    collaborators: ["Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Emily Brown"],
    publications: ["Initial Findings in Educational AI", "Assessment Methods Review"],
    progress: 45,
    priority: "High",
    department: "Computer Science"
  },
  {
    id: 2,
    title: "Quantum Computing Applications",
    description: "Exploring practical applications of quantum computing in data security",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    status: "Not Started",
    fundingAmount: "$300,000",
    collaborators: ["Dr. James Anderson", "Dr. Lisa Wang"],
    publications: [],
    progress: 0,
    priority: "Medium",
    department: "Computer Science"
  },
  {
    id: 3,
    title: "Sustainable Computing Practices",
    description: "Research on energy-efficient computing methods and green IT",
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    status: "Under Review",
    fundingAmount: "$120,000",
    collaborators: ["Dr. Maria Garcia", "Dr. Robert Taylor"],
    publications: ["Green Computing Survey", "Energy Efficiency in Data Centers"],
    progress: 75,
    priority: "Medium",
    department: "Computer Science"
  }
];

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Physics",
  "Mathematics"
];

export default function ResearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [projects, setProjects] = useState<ResearchProject[]>(researchProjects);
  const [newProject, setNewProject] = useState<Partial<ResearchProject>>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
    fundingAmount: "",
    collaborators: [],
    publications: [],
    progress: 0,
    priority: "Medium",
    department: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([]);

  const handleInputChange = (field: keyof ResearchProject, value: any) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateProject = () => {
    if (!newProject.title || !newProject.description || !newProject.startDate || !newProject.endDate) {
      alert("Please fill in all required fields");
      return;
    }

    const projectToAdd: ResearchProject = {
      id: projects.length + 1,
      title: newProject.title!,
      description: newProject.description!,
      startDate: newProject.startDate!,
      endDate: newProject.endDate!,
      status: newProject.status as ResearchProject['status'],
      fundingAmount: newProject.fundingAmount || "$0",
      collaborators: selectedCollaborators,
      publications: [],
      progress: 0,
      priority: newProject.priority as ResearchProject['priority'],
      department: newProject.department!
    };

    setProjects(prev => [...prev, projectToAdd]);
    setNewProject({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Not Started",
      fundingAmount: "",
      collaborators: [],
      publications: [],
      progress: 0,
      priority: "Medium",
      department: ""
    });
    setSelectedCollaborators([]);
    setIsDialogOpen(false);
  };

  const handleUpdateProgress = (projectId: number, newProgress: number) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, progress: Math.min(100, Math.max(0, newProgress)) }
          : project
      )
    );
  };

  const handleUpdateStatus = (projectId: number, newStatus: ResearchProject['status']) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, status: newStatus }
          : project
      )
    );
  };

  const handleDeleteProject = (projectId: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || project.department === departmentFilter;
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesDepartment && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'In Progress': return 'text-blue-600';
      case 'Under Review': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress': return <Clock4 className="h-4 w-4 text-blue-600" />;
      case 'Under Review': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Research Projects</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Research Project</DialogTitle>
                <DialogDescription>
                  Create a new research project by filling out the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter project title"
                    value={newProject.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter project description"
                    value={newProject.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newProject.status}
                      onValueChange={(value) => handleInputChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newProject.priority}
                      onValueChange={(value) => handleInputChange('priority', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="funding">Funding Amount</Label>
                  <Input
                    id="funding"
                    placeholder="Enter funding amount"
                    value={newProject.fundingAmount}
                    onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newProject.department}
                    onValueChange={(value) => handleInputChange('department', value)}
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
                <div className="grid gap-2">
                  <Label>Collaborators</Label>
                  <div className="flex flex-wrap gap-2">
                    {facultyMembers.map((faculty) => (
                      <Button
                        key={faculty.id}
                        variant={selectedCollaborators.includes(faculty.name) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedCollaborators(prev =>
                            prev.includes(faculty.name)
                              ? prev.filter(name => name !== faculty.name)
                              : [...prev, faculty.name]
                          );
                        }}
                      >
                        {faculty.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject}>
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.department}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{project.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateProgress(project.id, project.progress - 10)}
                        disabled={project.progress <= 0}
                      >
                        -
                      </Button>
                      <span className="font-medium">{project.progress}%</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateProgress(project.id, project.progress + 10)}
                        disabled={project.progress >= 100}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">End Date</p>
                    <p className="font-medium">{new Date(project.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Status</p>
                  <Select
                    value={project.status}
                    onValueChange={(value) => handleUpdateStatus(project.id, value as ResearchProject['status'])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Collaborators</p>
                  <div className="flex flex-wrap gap-2">
                    {project.collaborators.map((collaborator, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs"
                      >
                        {collaborator}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-purple-600">{project.fundingAmount}</span>
                  <span className={`font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 