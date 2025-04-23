'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Plus,
  Users,
  BookOpen,
  MapPin,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Event {
  id: number;
  title: string;
  type: 'class' | 'meeting' | 'office-hours' | 'research';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  attendees: string[];
  recurring: boolean;
  recurrencePattern?: string;
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Advanced Database Systems",
    type: "class",
    date: "2024-03-20",
    startTime: "10:00",
    endTime: "11:30",
    location: "Room 301",
    description: "Weekly lecture on advanced database concepts",
    attendees: ["Dr. Sarah Johnson"],
    recurring: true,
    recurrencePattern: "weekly"
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
    recurring: false
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
    recurrencePattern: "weekly"
  }
];

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    type: "class",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    attendees: [],
    recurring: false
  });

  const handleDateChange = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      alert("Please fill in all required fields");
      return;
    }

    const eventToAdd: Event = {
      id: events.length + 1,
      title: newEvent.title!,
      type: newEvent.type as Event['type'],
      date: newEvent.date!,
      startTime: newEvent.startTime!,
      endTime: newEvent.endTime!,
      location: newEvent.location || "TBD",
      description: newEvent.description || "",
      attendees: newEvent.attendees || [],
      recurring: newEvent.recurring || false,
      recurrencePattern: newEvent.recurring ? "weekly" : undefined
    };

    setEvents(prev => [...prev, eventToAdd]);
    setNewEvent({
      title: "",
      type: "class",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      description: "",
      attendees: [],
      recurring: false
    });
    setIsAddEventOpen(false);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    const matchesDate = event.date === selectedDate.toISOString().split('T')[0];
    return matchesSearch && matchesType && matchesDate;
  });

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'class': return <BookOpen className="h-4 w-4" />;
      case 'meeting': return <Users className="h-4 w-4" />;
      case 'office-hours': return <Clock className="h-4 w-4" />;
      case 'research': return <BookOpen className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-700';
      case 'meeting': return 'bg-purple-100 text-purple-700';
      case 'office-hours': return 'bg-green-100 text-green-700';
      case 'research': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
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
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
            <p className="text-gray-500">Manage your classes, meetings, and office hours</p>
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
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value as Event['type'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="office-hours">Office Hours</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={newEvent.recurring}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, recurring: e.target.checked }))}
                  />
                  <Label htmlFor="recurring">Recurring Event</Label>
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
        </motion.div>

        {/* Date Navigation and Filters */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between col-span-2 bg-white p-4 rounded-lg border">
            <Button variant="outline" size="icon" onClick={() => handleDateChange(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <Button variant="outline" size="icon" onClick={() => handleDateChange(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
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
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="class">Classes</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="office-hours">Office Hours</SelectItem>
              <SelectItem value="research">Research</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Events List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-40">
                <Calendar className="h-8 w-8 text-gray-400 mb-4" />
                <p className="text-gray-500">No events scheduled for this day</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>
                        {event.startTime} - {event.endTime}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </Button>
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
                      <span className="text-xs text-purple-600 font-medium">
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