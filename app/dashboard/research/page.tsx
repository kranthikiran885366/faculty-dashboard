"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Plus,
  Users,
  DollarSign,
  Calendar,
  BookOpen,
  BarChart3,
  Download,
  ExternalLink,
  Edit,
  Search,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ResearchDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock research projects data
  const researchProjects = [
    {
      id: "1",
      title: "Machine Learning for Educational Assessment",
      description: "Applying machine learning algorithms to improve educational assessment methods",
      status: "In Progress",
      collaborators: [
        { id: "1", name: "John Doe", role: "Principal Investigator", avatar: "/placeholder.svg" },
        { id: "2", name: "Jane Smith", role: "Co-Investigator", avatar: "/placeholder.svg" },
        { id: "3", name: "Robert Johnson", role: "Research Assistant", avatar: "/placeholder.svg" },
      ],
      funding: "$75,000",
      startDate: "2023-01-15",
      deadline: "2023-12-15",
      completion: 65,
      publications: [
        {
          title: "Preliminary Results on ML-based Assessment",
          journal: "Journal of Educational Technology",
          date: "2023-06-10",
          url: "#",
        },
      ],
    },
    {
      id: "2",
      title: "Blockchain Applications in Academic Credentialing",
      description: "Exploring the use of blockchain technology for secure academic credentials",
      status: "Planning",
      collaborators: [
        { id: "1", name: "John Doe", role: "Co-Investigator", avatar: "/placeholder.svg" },
        { id: "4", name: "Sarah Williams", role: "Principal Investigator", avatar: "/placeholder.svg" },
      ],
      funding: "$50,000",
      startDate: "2023-09-01",
      deadline: "2024-03-30",
      completion: 15,
      publications: [],
    },
    {
      id: "3",
      title: "Virtual Reality in Engineering Education",
      description: "Implementing and evaluating VR technologies in engineering education",
      status: "Completed",
      collaborators: [
        { id: "1", name: "John Doe", role: "Principal Investigator", avatar: "/placeholder.svg" },
        { id: "5", name: "Michael Brown", role: "Co-Investigator", avatar: "/placeholder.svg" },
        { id: "6", name: "Emily Davis", role: "Research Assistant", avatar: "/placeholder.svg" },
        { id: "7", name: "David Wilson", role: "Technical Specialist", avatar: "/placeholder.svg" },
      ],
      funding: "$120,000",
      startDate: "2022-03-15",
      deadline: "2023-03-15",
      completion: 100,
      publications: [
        {
          title: "VR Applications in Engineering Education",
          journal: "IEEE Transactions on Education",
          date: "2022-11-20",
          url: "#",
        },
        {
          title: "Student Engagement with VR Learning Environments",
          journal: "Journal of Engineering Education",
          date: "2023-02-05",
          url: "#",
        },
      ],
    },
    {
      id: "4",
      title: "AI-Powered Tutoring Systems",
      description: "Developing intelligent tutoring systems using artificial intelligence",
      status: "In Progress",
      collaborators: [
        { id: "1", name: "John Doe", role: "Co-Investigator", avatar: "/placeholder.svg" },
        { id: "8", name: "Lisa Chen", role: "Principal Investigator", avatar: "/placeholder.svg" },
        { id: "9", name: "Thomas Garcia", role: "Research Assistant", avatar: "/placeholder.svg" },
      ],
      funding: "$90,000",
      startDate: "2023-02-01",
      deadline: "2024-01-31",
      completion: 45,
      publications: [
        {
          title: "Framework for AI-Based Tutoring Systems",
          journal: "AI in Education Conference Proceedings",
          date: "2023-07-15",
          url: "#",
        },
      ],
    },
  ]

  // Filter research projects based on search term
  const filteredProjects = researchProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate total funding
  const totalFunding = researchProjects.reduce((sum, project) => {
    return sum + Number.parseInt(project.funding.replace(/[^0-9]/g, ""))
  }, 0)

  // Count publications
  const totalPublications = researchProjects.reduce((sum, project) => {
    return sum + project.publications.length
  }, 0)

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Research Management</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FileText className="h-4 w-4 text-[#FF4EB8]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{researchProjects.length}</div>
              <p className="text-xs text-muted-foreground">
                {researchProjects.filter((p) => p.status === "In Progress").length} in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
              <DollarSign className="h-4 w-4 text-[#B23EFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalFunding.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collaborators</CardTitle>
              <Users className="h-4 w-4 text-[#00CFFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">From 3 different institutions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publications</CardTitle>
              <BookOpen className="h-4 w-4 text-[#FF4EB8]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPublications}</div>
              <p className="text-xs text-muted-foreground">In peer-reviewed journals</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Research Projects</CardTitle>
                <CardDescription>Manage your research projects and track progress</CardDescription>
                <div className="flex items-center mt-4">
                  <Search className="h-4 w-4 mr-2 text-gray-500" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => <ResearchProjectItem key={project.id} project={project} />)
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No research projects found matching your criteria
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Publications</CardTitle>
                <CardDescription>Track your research publications and citations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {researchProjects.flatMap((project) =>
                    project.publications.map((publication, index) => (
                      <PublicationItem
                        key={`${project.id}-${index}`}
                        publication={publication}
                        project={project.title}
                      />
                    )),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Funding Overview</CardTitle>
                <CardDescription>Track research funding and expenditures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">Funding Analytics</h3>
                    <p className="text-sm text-gray-500">Funding allocation and expenditure charts would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaborators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Research Collaborators</CardTitle>
                <CardDescription>Manage your research team and external collaborators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(
                    new Set(
                      researchProjects.flatMap((project) =>
                        project.collaborators.map((collaborator) => collaborator.id),
                      ),
                    ),
                  ).map((id) => {
                    const collaborator = researchProjects
                      .flatMap((project) => project.collaborators)
                      .find((c) => c.id === id)

                    return (
                      <CollaboratorItem
                        key={id}
                        collaborator={collaborator}
                        projects={researchProjects
                          .filter((project) => project.collaborators.some((c) => c.id === id))
                          .map((p) => p.title)}
                      />
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function ResearchProjectItem({ project }) {
  const getStatusBadge = () => {
    switch (project.status) {
      case "In Progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{project.status}</Badge>
      case "Planning":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{project.status}</Badge>
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">{project.status}</Badge>
      default:
        return <Badge>{project.status}</Badge>
    }
  }

  return (
    <div className="rounded-md border p-4 hover:bg-gray-50">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">{project.title}</h3>
            <div className="ml-2">{getStatusBadge()}</div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="text-xs text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {project.startDate} to {project.deadline}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {project.funding}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {project.collaborators.length} collaborators
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              {project.publications.length} publications
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Report
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Project Progress</span>
          <span>{project.completion}%</span>
        </div>
        <Progress value={project.completion} className="h-2" />
      </div>

      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-medium mb-2">Team</h4>
        <div className="flex flex-wrap gap-2">
          {project.collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{collaborator.name}</span>
              <span className="text-xs text-gray-500">({collaborator.role})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PublicationItem({ publication, project }) {
  return (
    <div className="flex items-start space-x-4 rounded-md border p-3 hover:bg-gray-50">
      <div className="mt-0.5">
        <BookOpen className="h-5 w-5 text-[#B23EFF]" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{publication.title}</p>
          <span className="text-xs text-gray-500">{publication.date}</span>
        </div>
        <p className="text-xs text-gray-500">{publication.journal}</p>
        <p className="text-xs text-gray-500">Project: {project}</p>
      </div>
      <div>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          <ExternalLink className="h-3 w-3 mr-1" />
          View
        </Button>
      </div>
    </div>
  )
}

function CollaboratorItem({ collaborator, projects }) {
  return (
    <div className="flex items-start space-x-4 rounded-md border p-3 hover:bg-gray-50">
      <Avatar className="h-10 w-10">
        <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
        <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{collaborator.name}</p>
          <span className="text-xs text-gray-500">{collaborator.role}</span>
        </div>
        <p className="text-xs text-gray-500">Projects: {projects.join(", ")}</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Contact
        </Button>
      </div>
    </div>
  )
}
