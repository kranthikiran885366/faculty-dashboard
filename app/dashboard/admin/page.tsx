"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, Server, AlertTriangle, CheckCircle, Clock, Activity, FileText } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-[#FF4EB8]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">124 faculty, 1,124 students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Server className="h-4 w-4 text-[#B23EFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Operational</div>
              <p className="text-xs text-muted-foreground">All systems running normally</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-[#00CFFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">45 faculty, 297 students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-[#FF4EB8]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">0 critical, 2 warnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <UserItem
                    name="Dr. John Doe"
                    email="john.doe@university.edu"
                    role="Faculty"
                    department="Computer Science"
                    status="Active"
                  />
                  <UserItem
                    name="Dr. Jane Smith"
                    email="jane.smith@university.edu"
                    role="HOD"
                    department="Computer Science"
                    status="Active"
                  />
                  <UserItem
                    name="Admin User"
                    email="admin@university.edu"
                    role="Admin"
                    department="IT Services"
                    status="Active"
                  />
                  <UserItem
                    name="Dr. Robert Johnson"
                    email="robert.j@university.edu"
                    role="Faculty"
                    department="Computer Science"
                    status="Inactive"
                  />
                  <UserItem
                    name="Dr. Emily Davis"
                    email="emily.d@university.edu"
                    role="Faculty"
                    department="Computer Science"
                    status="Active"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Server and service health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <SystemStatusItem name="Web Server" status="Operational" uptime="99.98%" load={42} />
                  <SystemStatusItem name="Database Server" status="Operational" uptime="99.95%" load={65} />
                  <SystemStatusItem name="Authentication Service" status="Operational" uptime="100%" load={28} />
                  <SystemStatusItem name="Storage Service" status="Warning" uptime="99.87%" load={85} />
                  <SystemStatusItem name="Email Service" status="Operational" uptime="99.92%" load={35} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Server resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ResourceItem name="CPU Usage" used="42%" total="100%" percentage={42} />
                  <ResourceItem name="Memory Usage" used="12.4 GB" total="32 GB" percentage={39} />
                  <ResourceItem name="Storage" used="1.2 TB" total="4 TB" percentage={30} />
                  <ResourceItem name="Network Bandwidth" used="450 Mbps" total="1 Gbps" percentage={45} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>System security status and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <SecurityAlertItem
                    title="Failed Login Attempts"
                    description="Multiple failed login attempts detected for user admin@university.edu"
                    severity="Medium"
                    time="2 hours ago"
                  />
                  <SecurityAlertItem
                    title="System Update Available"
                    description="Security update available for authentication module"
                    severity="Low"
                    time="1 day ago"
                  />
                  <SecurityAlertItem
                    title="Unusual Access Pattern"
                    description="Unusual access pattern detected from IP 192.168.1.45"
                    severity="High"
                    time="30 minutes ago"
                  />
                  <SecurityAlertItem
                    title="Password Policy Violation"
                    description="5 users have passwords that don't meet the security policy"
                    severity="Medium"
                    time="3 days ago"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>Generated system reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ReportItem
                    title="Monthly User Activity Report"
                    description="User login and activity statistics for September 2023"
                    generated="Oct 1, 2023"
                    format="PDF"
                  />
                  <ReportItem
                    title="System Performance Analysis"
                    description="Performance metrics and bottleneck analysis"
                    generated="Sep 25, 2023"
                    format="Excel"
                  />
                  <ReportItem
                    title="Security Audit Report"
                    description="Comprehensive security audit findings and recommendations"
                    generated="Sep 15, 2023"
                    format="PDF"
                  />
                  <ReportItem
                    title="Database Usage Statistics"
                    description="Database performance and usage patterns"
                    generated="Sep 10, 2023"
                    format="Excel"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>Recent system events and logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <LogItem
                    event="User Login"
                    details="User john.doe@university.edu logged in successfully"
                    time="10 minutes ago"
                    level="Info"
                  />
                  <LogItem
                    event="Course Created"
                    details="New course CS505: Advanced AI created by jane.smith@university.edu"
                    time="1 hour ago"
                    level="Info"
                  />
                  <LogItem
                    event="Failed Login Attempt"
                    details="Failed login attempt for user admin@university.edu from IP 192.168.1.45"
                    time="2 hours ago"
                    level="Warning"
                  />
                  <LogItem
                    event="System Backup"
                    details="Automated system backup completed successfully"
                    time="6 hours ago"
                    level="Info"
                  />
                  <LogItem
                    event="Database Error"
                    details="Temporary database connection error - automatically resolved"
                    time="1 day ago"
                    level="Error"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function UserItem({ name, email, role, department, status }) {
  const getStatusColor = () => {
    return status === "Active" ? "text-green-500" : "text-red-500"
  }

  return (
    <div className="flex items-center justify-between space-x-4 rounded-md border p-3 hover:bg-gray-50">
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <p className="text-sm font-medium">{name}</p>
          <span className={`ml-2 text-xs ${getStatusColor()}`}>• {status}</span>
        </div>
        <p className="text-xs text-gray-500">{email}</p>
        <div className="flex space-x-4 text-xs text-gray-500">
          <span>{role}</span>
          <span>•</span>
          <span>{department}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Edit
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Reset Password
        </Button>
      </div>
    </div>
  )
}

function SystemStatusItem({ name, status, uptime, load }) {
  const getStatusColor = () => {
    switch (status) {
      case "Operational":
        return "text-green-500"
      case "Warning":
        return "text-yellow-500"
      case "Critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "Operational":
        return <CheckCircle className={`h-5 w-5 ${getStatusColor()}`} />
      case "Warning":
        return <AlertTriangle className={`h-5 w-5 ${getStatusColor()}`} />
      case "Critical":
        return <AlertTriangle className={`h-5 w-5 ${getStatusColor()}`} />
      default:
        return <Clock className={`h-5 w-5 ${getStatusColor()}`} />
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2">{getStatusIcon()}</div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-500">Uptime: {uptime}</p>
          </div>
        </div>
        <div className="text-sm">
          <span className={getStatusColor()}>{status}</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>System Load</span>
          <span>{load}%</span>
        </div>
        <Progress value={load} className="h-2" />
      </div>
    </div>
  )
}

function ResourceItem({ name, used, total, percentage }) {
  const getColorClass = () => {
    if (percentage > 80) return "text-red-500"
    if (percentage > 60) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{name}</h3>
        <div className="text-sm">
          <span>{used}</span> / <span>{total}</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Usage</span>
          <span className={getColorClass()}>{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
    </div>
  )
}

function SecurityAlertItem({ title, description, severity, time }) {
  const getSeverityColor = () => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex items-start space-x-4 rounded-md border p-3 hover:bg-gray-50">
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor()}`}>{severity}</span>
        </div>
        <p className="text-xs text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
      <div>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Resolve
        </Button>
      </div>
    </div>
  )
}

function ReportItem({ title, description, generated, format }) {
  const getFormatIcon = () => {
    switch (format) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />
      case "Excel":
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex items-start space-x-4 rounded-md border p-3 hover:bg-gray-50">
      <div className="mt-0.5">{getFormatIcon()}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <span className="text-xs text-gray-500">{format}</span>
        </div>
        <p className="text-xs text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">Generated: {generated}</p>
      </div>
      <div>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Download
        </Button>
      </div>
    </div>
  )
}

function LogItem({ event, details, time, level }) {
  const getLevelColor = () => {
    switch (level) {
      case "Error":
        return "text-red-500"
      case "Warning":
        return "text-yellow-500"
      case "Info":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="flex items-start space-x-4 rounded-md border p-3 hover:bg-gray-50">
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{event}</p>
          <span className={`text-xs ${getLevelColor()}`}>{level}</span>
        </div>
        <p className="text-xs text-gray-500">{details}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  )
}
