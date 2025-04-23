'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Users,
  BookOpen,
  BarChart2,
  Clock,
  Mail,
  Printer,
  Share2,
  Search,
} from 'lucide-react';

interface Report {
  id: number;
  title: string;
  type: 'academic' | 'attendance' | 'performance' | 'faculty' | 'administrative';
  description: string;
  lastGenerated: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'semester' | 'yearly';
  status: 'available' | 'generating' | 'scheduled';
  format: 'pdf' | 'excel' | 'csv';
  size: string;
}

const reports: Report[] = [
  {
    id: 1,
    title: "Semester Performance Report",
    type: "performance",
    description: "Comprehensive analysis of student performance across all courses",
    lastGenerated: "2024-03-15",
    frequency: "semester",
    status: "available",
    format: "pdf",
    size: "2.5 MB"
  },
  {
    id: 2,
    title: "Monthly Attendance Summary",
    type: "attendance",
    description: "Detailed attendance records for all courses and students",
    lastGenerated: "2024-03-14",
    frequency: "monthly",
    status: "available",
    format: "excel",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Faculty Performance Review",
    type: "faculty",
    description: "Analysis of faculty teaching effectiveness and student feedback",
    lastGenerated: "2024-03-10",
    frequency: "semester",
    status: "available",
    format: "pdf",
    size: "3.2 MB"
  },
  {
    id: 4,
    title: "Course Progress Report",
    type: "academic",
    description: "Status of course completion and syllabus coverage",
    lastGenerated: "2024-03-13",
    frequency: "monthly",
    status: "available",
    format: "pdf",
    size: "1.5 MB"
  }
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesFormat = formatFilter === 'all' || report.format === formatFilter;
    const matchesFrequency = frequencyFilter === 'all' || report.frequency === frequencyFilter;
    return matchesSearch && matchesType && matchesFormat && matchesFrequency;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-500">Generate and manage department reports</p>
        </div>
        <Button className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Reports</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Generated This Month</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Share2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Shared Reports</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Input
            className="pl-10"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="attendance">Attendance</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="faculty">Faculty</SelectItem>
            <SelectItem value="administrative">Administrative</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formatFilter} onValueChange={setFormatFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Formats</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="excel">Excel</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>
        <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Frequencies</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="semester">Semester</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {report.type === 'academic' && <BookOpen className="h-6 w-6 text-blue-600" />}
                    {report.type === 'attendance' && <Users className="h-6 w-6 text-green-600" />}
                    {report.type === 'performance' && <BarChart2 className="h-6 w-6 text-purple-600" />}
                    {report.type === 'faculty' && <Users className="h-6 w-6 text-yellow-600" />}
                    {report.type === 'administrative' && <FileText className="h-6 w-6 text-gray-600" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{report.title}</h3>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last Generated</p>
                    <p className="text-sm font-medium">{report.lastGenerated}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Format</p>
                    <p className="text-sm font-medium uppercase">{report.format}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="text-sm font-medium">{report.size}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Printer className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 