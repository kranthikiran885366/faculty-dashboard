'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Users,
  BookOpen,
  MapPin,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Share2,
  Copy,
  AlertCircle,
  Repeat,
  Trash2,
  Edit2,
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
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Event {
  id: number;
  title: string;
  type: 'class' | 'meeting' | 'office-hours' | 'research' | 'exam' | 'deadline' | 'workshop';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  attendees: string[];
  recurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  priority: 'high' | 'medium' | 'low';
  category: 'academic' | 'administrative' | 'research' | 'other';
  reminder: boolean;
  reminderTime?: string;
  status: "scheduled" | "cancelled" | "completed" | "in-progress";
  color?: string;
}

interface EditingEvent extends Partial<Event> {
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Faculty Meeting",
    type: "meeting",
    date: "2024-03-20",
    startTime: "10:00",
    endTime: "11:30",
    location: "Conference Room A",
    description: "Monthly faculty meeting to discuss department updates",
    attendees: ["john.doe@university.edu", "jane.smith@university.edu"],
    recurring: true,
    recurrencePattern: "monthly",
    priority: "high",
    category: "administrative",
    reminder: true,
    reminderTime: "30min",
    status: "scheduled",
    color: "#4CAF50"
  },
  {
    id: 2,
    title: "Research Meeting",
    type: "meeting",
    date: "2024-03-20",
    startTime: "14:00",
    endTime: "15:00",
    location: "Conference Room A",
    description: "AI Research Project Discussion",
    attendees: ["Dr. Michael Chen", "Dr. Emily Brown"],
    recurring: false,
    priority: "medium",
    category: "research",
    reminder: true,
    reminderTime: "15min",
    status: "scheduled"
  },
  {
    id: 3,
    title: "Office Hours",
    type: "office-hours",
    date: "2024-03-20",
    startTime: "16:00",
    endTime: "18:00",
    location: "Office 405",
    description: "Student consultation hours",
    attendees: ["Dr. Sarah Johnson"],
    recurring: true,
    recurrencePattern: "weekly",
    priority: "low",
    category: "administrative",
    reminder: true,
    reminderTime: "30min",
    status: "scheduled"
  },
  {
    id: 4,
    title: "Department Meeting",
    type: "meeting",
    date: "2024-03-21",
    startTime: "09:00",
    endTime: "10:30",
    location: "Conference Room B",
    description: "Quarterly department review and planning session",
    attendees: ["all.faculty@university.edu"],
    recurring: true,
    recurrencePattern: "monthly",
    priority: "high",
    category: "administrative",
    reminder: true,
    reminderTime: "1hour",
    status: "scheduled",
    color: "#FF5722"
  },
  {
    id: 5,
    title: "Research Symposium",
    type: "workshop",
    date: "2024-03-22",
    startTime: "13:00",
    endTime: "17:00",
    location: "Main Auditorium",
    description: "Annual research presentation and networking event",
    attendees: ["researchers@university.edu", "students@university.edu"],
    recurring: false,
    priority: "high",
    category: "research",
    reminder: true,
    reminderTime: "1day",
    status: "scheduled",
    color: "#9C27B0"
  },
  {
    id: 6,
    title: "Final Exam Review",
    type: "class",
    date: "2024-03-23",
    startTime: "14:00",
    endTime: "16:00",
    location: "Room 201",
    description: "Pre-exam review session for Advanced Database Systems",
    attendees: ["class.db401@university.edu"],
    recurring: false,
    priority: "medium",
    category: "academic",
    reminder: true,
    reminderTime: "30min",
    status: "scheduled",
    color: "#2196F3"
  },
  {
    id: 7,
    title: "Thesis Defense",
    type: "exam",
    date: "2024-03-24",
    startTime: "10:00",
    endTime: "12:00",
    location: "Conference Room C",
    description: "PhD Thesis Defense: Machine Learning Applications in Healthcare",
    attendees: ["committee@university.edu", "student.phd@university.edu"],
    recurring: false,
    priority: "high",
    category: "academic",
    reminder: true,
    reminderTime: "1hour",
    status: "scheduled",
    color: "#E91E63"
  },
  {
    id: 8,
    title: "Grant Proposal Deadline",
    type: "deadline",
    date: "2024-03-25",
    startTime: "17:00",
    endTime: "17:00",
    location: "Online Submission",
    description: "NSF Research Grant Proposal submission deadline",
    attendees: ["research.team@university.edu"],
    recurring: false,
    priority: "high",
    category: "research",
    reminder: true,
    reminderTime: "1day",
    status: "scheduled",
    color: "#F44336"
  }
];

export default function SchedulePage() {
  const getWeekDays = (date: Date) => {
    const week = [];
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EditingEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCompletedEvents, setShowCompletedEvents] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<Date[]>(getWeekDays(new Date()));
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);

  const handleDateChange = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    if (!editingEvent) {
      alert("No event data available");
      return;
    }

    if (!editingEvent.title || !editingEvent.date || !editingEvent.startTime || !editingEvent.endTime) {
      alert("Please fill in all required fields");
      return;
    }

    const eventToAdd: Event = {
      id: events.length + 1,
      title: editingEvent.title,
      type: editingEvent.type || 'class',
      date: editingEvent.date,
      startTime: editingEvent.startTime,
      endTime: editingEvent.endTime,
      location: editingEvent.location || "TBD",
      description: editingEvent.description || "",
      attendees: editingEvent.attendees || [],
      recurring: editingEvent.recurring || false,
      recurrencePattern: editingEvent.recurring ? "weekly" : undefined,
      priority: editingEvent.priority || 'medium',
      category: editingEvent.category || 'academic',
      reminder: editingEvent.reminder || false,
      reminderTime: editingEvent.reminderTime,
      status: editingEvent.status || 'scheduled',
    };

    setEvents(prev => [...prev, eventToAdd]);
    setEditingEvent(null);
    setIsAddEventOpen(false);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent({ ...event });
    setIsEditEventOpen(true);
  };

  const handleFieldChange = (field: keyof EditingEvent, value: any) => {
    setEditingEvent(prev => prev ? { ...prev, [field]: value } as EditingEvent : null);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setIsEditEventOpen(false);
    setEditingEvent(null);
  };

  const handleShareEvent = (event: Event) => {
    const eventDetails = `
      Event: ${event.title}
      Date: ${event.date}
      Time: ${event.startTime} - ${event.endTime}
      Location: ${event.location}
      Description: ${event.description}
    `;
    navigator.clipboard.writeText(eventDetails);
    alert("Event details copied to clipboard!");
  };

  const handleDragStart = (event: Event) => {
    setDraggedEvent(event);
  };

  const handleDrop = (date: string) => {
    if (draggedEvent) {
      const updatedEvent = { ...draggedEvent, date };
      handleUpdateEvent(updatedEvent);
      setDraggedEvent(null);
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const firstDay = selectedWeek[0];
    const newDate = new Date(firstDay);
    newDate.setDate(firstDay.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(getWeekDays(newDate));
  };

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'class': return <BookOpen className="h-4 w-4" />;
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'office-hours': return <Clock className="h-4 w-4" />;
      case 'research': return <BookOpen className="h-4 w-4" />;
      case 'exam': return <AlertCircle className="h-4 w-4" />;
      case 'deadline': return <AlertCircle className="h-4 w-4" />;
      case 'workshop': return <AlertCircle className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-700';
      case 'meeting': return 'bg-purple-100 text-purple-700';
      case 'office-hours': return 'bg-green-100 text-green-700';
      case 'research': return 'bg-yellow-100 text-yellow-700';
      case 'exam': return 'bg-red-100 text-red-700';
      case 'deadline': return 'bg-red-100 text-red-700';
      case 'workshop': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEventPriorityColor = (priority: Event['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEventStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'scheduled': return <Badge variant="outline" className="bg-blue-100 text-blue-700">Scheduled</Badge>;
      case 'in-progress': return <Badge variant="outline" className="bg-yellow-100 text-yellow-700">In Progress</Badge>;
      case 'completed': return <Badge variant="outline" className="bg-green-100 text-green-700">Completed</Badge>;
      case 'cancelled': return <Badge variant="outline" className="bg-red-100 text-red-700">Cancelled</Badge>;
      default: return null;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || event.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesDate = event.date === selectedDate.toISOString().split('T')[0];
    return matchesSearch && matchesType && matchesCategory && matchesPriority && matchesStatus && matchesDate;
  });

  const statusOptions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ] as const;

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
            <p className="text-gray-500">Manage your classes, meetings, and events</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg border p-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
                Calendar
              </Button>
            </div>
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Schedule a new event by filling out the details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      value={editingEvent?.title}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select
                      value={editingEvent?.type}
                      onValueChange={(value) => handleFieldChange('type', value as Event['type'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class">Class</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="office-hours">Office Hours</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={editingEvent?.date}
                        onChange={(e) => handleFieldChange('date', e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={editingEvent?.startTime}
                        onChange={(e) => handleFieldChange('startTime', e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={editingEvent?.endTime}
                        onChange={(e) => handleFieldChange('endTime', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter location"
                      value={editingEvent?.location}
                      onChange={(e) => handleFieldChange('location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea
                      placeholder="Add any additional notes"
                      value={editingEvent?.description || ""}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={editingEvent?.recurring}
                      onChange={(e) => handleFieldChange('recurring', e.target.checked)}
                    />
                    <Label htmlFor="recurring">Recurring Event</Label>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={editingEvent?.priority}
                      onValueChange={(value) => handleFieldChange('priority', value as Event['priority'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={editingEvent?.category}
                      onValueChange={(value) => handleFieldChange('category', value as Event['category'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="reminder"
                      checked={editingEvent?.reminder}
                      onChange={(e) => handleFieldChange('reminder', e.target.checked)}
                    />
                    <Label htmlFor="reminder">Reminder</Label>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reminderTime">Reminder Time</Label>
                    <Select
                      value={editingEvent?.reminderTime}
                      onValueChange={(value) => handleFieldChange('reminderTime', value as Event['reminderTime'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select reminder time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5min">5 minutes before</SelectItem>
                        <SelectItem value="15min">15 minutes before</SelectItem>
                        <SelectItem value="30min">30 minutes before</SelectItem>
                        <SelectItem value="1hour">1 hour before</SelectItem>
                        <SelectItem value="1day">1 day before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editingEvent?.status}
                      onValueChange={(value) => handleFieldChange('status', value as Event['status'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEvent}>
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="class">Classes</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="office-hours">Office Hours</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="exam">Exams</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="administrative">Administrative</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center justify-end space-x-2">
            <Label htmlFor="show-completed">Show Completed</Label>
            <Switch
              id="show-completed"
              checked={showCompletedEvents}
              onCheckedChange={setShowCompletedEvents}
            />
          </div>
        </motion.div>

        {viewMode === 'calendar' && (
          <motion.div
            className="bg-white rounded-lg border p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {selectedWeek[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {
                  selectedWeek[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                }
              </span>
              <Button variant="outline" onClick={() => navigateWeek('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-medium p-2 bg-gray-50">
                  {day}
                </div>
              ))}
              {selectedWeek.map((date) => (
                <div
                  key={date.toISOString()}
                  className="min-h-[120px] border rounded-lg p-2"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(date.toISOString().split('T')[0])}
                >
                  <div className="text-sm text-gray-500 mb-2">
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {events
                      .filter(event => event.date === date.toISOString().split('T')[0])
                      .map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded cursor-pointer ${getEventPriorityColor(event.priority)}`}
                          draggable
                          onDragStart={() => handleDragStart(event)}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-40">
                <CalendarIcon className="h-8 w-8 text-gray-400 mb-4" />
                <p className="text-gray-500">No events scheduled for this day</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getEventPriorityColor(event.priority)}`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>
                        {event.startTime} - {event.endTime}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShareEvent(event)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600">{event.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {getEventStatusBadge(event.status)}
                      {event.category && (
                        <Badge variant="outline">{event.category}</Badge>
                      )}
                      {event.reminder && (
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">
                          Reminder: {event.reminderTime}
                        </Badge>
                      )}
                    </div>
                    {event.attendees.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {event.attendees.map((attendee, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
                          >
                            {attendee}
                          </span>
                        ))}
                      </div>
                    )}
                    {event.recurring && (
                      <span className="text-xs text-purple-600 font-medium flex items-center">
                        <Repeat className="h-3 w-3 mr-1" />
                        Recurring {event.recurrencePattern} event
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 