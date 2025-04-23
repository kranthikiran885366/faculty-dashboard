'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Edit,
  Trash2,
  Building,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

interface Event {
  id: number;
  title: string;
  type: 'class' | 'exam' | 'meeting' | 'workshop' | 'other';
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  organizer: string;
  department: string;
  attendees: string[];
  recurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  priority: 'high' | 'medium' | 'low';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notifications: boolean;
  reminderTime?: '30min' | '1hour' | '1day';
  color: string;
  notes?: string;
}

const eventTypes = ['class', 'exam', 'meeting', 'workshop', 'other'];
const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Chemical',
  'Electrical',
];
const priorities = ['high', 'medium', 'low'];
const statuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
const reminderTimes = ['30min', '1hour', '1day'];
const recurrencePatterns = ['daily', 'weekly', 'monthly'];

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Faculty Meeting",
    type: "meeting",
    date: new Date(),
    startTime: "10:00",
    endTime: "11:30",
    location: "Conference Room A",
    description: "Monthly faculty meeting to discuss department updates and initiatives",
    organizer: "Dr. John Smith",
    department: "Computer Science",
    attendees: ["All Faculty Members"],
    recurring: true,
    recurrencePattern: "monthly",
    priority: "high",
    status: "scheduled",
    notifications: true,
    reminderTime: "1hour",
    color: "#4CAF50",
    notes: "Agenda will be shared prior to the meeting"
  },
  {
    id: 2,
    title: "Database Systems Final Exam",
    type: "exam",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    startTime: "14:00",
    endTime: "16:00",
    location: "Exam Hall 1",
    description: "Final examination for CS301 Database Systems course",
    organizer: "Dr. Sarah Johnson",
    department: "Computer Science",
    attendees: ["CS301 Students"],
    recurring: false,
    priority: "high",
    status: "scheduled",
    notifications: true,
    reminderTime: "1day",
    color: "#F44336"
  }
];

export default function ScheduleManagement() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    const matchesDepartment = departmentFilter === 'all' || event.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesType && matchesDepartment && matchesStatus;
  });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, {
        id: events.length + 1,
        title: newEvent.title,
        type: newEvent.type || 'other',
        date: newEvent.date,
        startTime: newEvent.startTime || '',
        endTime: newEvent.endTime || '',
        location: newEvent.location || '',
        description: newEvent.description || '',
        organizer: newEvent.organizer || '',
        department: newEvent.department || '',
        attendees: newEvent.attendees || [],
        recurring: newEvent.recurring || false,
        recurrencePattern: newEvent.recurrencePattern,
        priority: newEvent.priority || 'medium',
        status: 'scheduled',
        notifications: newEvent.notifications || false,
        reminderTime: newEvent.reminderTime,
        color: newEvent.color || '#4CAF50',
        notes: newEvent.notes
      } as Event]);
      setNewEvent({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(events.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const EventForm = ({ data, onChange, onSubmit, submitText }: any) => (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Event Type</Label>
        <Select
          value={data.type || 'other'}
          onValueChange={(value) => onChange({ ...data, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((type) => (
              <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <div className="border rounded-md p-2">
          <Calendar
            mode="single"
            selected={data.date}
            onSelect={(date) => onChange({ ...data, date })}
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={data.startTime || ''}
            onChange={(e) => onChange({ ...data, startTime: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={data.endTime || ''}
            onChange={(e) => onChange({ ...data, endTime: e.target.value })}
          />
        </div>
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
      <div className="col-span-2 space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description || ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="organizer">Organizer</Label>
        <Input
          id="organizer"
          value={data.organizer || ''}
          onChange={(e) => onChange({ ...data, organizer: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={data.priority || 'medium'}
          onValueChange={(value) => onChange({ ...data, priority: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((priority) => (
              <SelectItem key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={data.status || 'scheduled'}
          onValueChange={(value) => onChange({ ...data, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          type="color"
          value={data.color || '#4CAF50'}
          onChange={(e) => onChange({ ...data, color: e.target.value })}
          className="h-10"
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="attendees">Attendees (comma-separated)</Label>
        <Input
          id="attendees"
          value={data.attendees?.join(', ') || ''}
          onChange={(e) => onChange({ ...data, attendees: e.target.value.split(',').map(a => a.trim()) })}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="recurring"
            checked={data.recurring || false}
            onChange={(e) => onChange({ ...data, recurring: e.target.checked })}
          />
          <Label htmlFor="recurring">Recurring Event</Label>
        </div>
        {data.recurring && (
          <Select
            value={data.recurrencePattern || 'weekly'}
            onValueChange={(value) => onChange({ ...data, recurrencePattern: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pattern" />
            </SelectTrigger>
            <SelectContent>
              {recurrencePatterns.map((pattern) => (
                <SelectItem key={pattern} value={pattern}>{pattern.charAt(0).toUpperCase() + pattern.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="notifications"
            checked={data.notifications || false}
            onChange={(e) => onChange({ ...data, notifications: e.target.checked })}
          />
          <Label htmlFor="notifications">Enable Notifications</Label>
        </div>
        {data.notifications && (
          <Select
            value={data.reminderTime || '1hour'}
            onValueChange={(value) => onChange({ ...data, reminderTime: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select reminder time" />
            </SelectTrigger>
            <SelectContent>
              {reminderTimes.map((time) => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
        />
      </div>
      <div className="col-span-2 flex justify-end gap-4">
        <Button variant="outline" onClick={() => {
          if (submitText === 'Add Event') setIsAddDialogOpen(false);
          else setEditingEvent(null);
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
          <h1 className="text-3xl font-bold">Schedule Management</h1>
          <p className="text-gray-500">Manage events and schedules</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <EventForm
              data={newEvent}
              onChange={setNewEvent}
              onSubmit={handleAddEvent}
              submitText="Add Event"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {eventTypes.map(type => (
              <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-none"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Events for {selectedDate.toLocaleDateString()}
          </h3>
          {filteredEvents
            .filter(event => event.date.toDateString() === selectedDate.toDateString())
            .map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-16 w-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${event.color}20`, color: event.color }}
                        >
                          {event.type === 'class' && <BookOpen className="w-8 h-8" />}
                          {event.type === 'exam' && <AlertCircle className="w-8 h-8" />}
                          {event.type === 'meeting' && <Users className="w-8 h-8" />}
                          {event.type === 'workshop' && <Building className="w-8 h-8" />}
                          {event.type === 'other' && <CalendarIcon className="w-8 h-8" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          <p className="text-gray-500 capitalize">{event.type}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="w-4 h-4" />
                          <span>{event.department}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>Organizer: {event.organizer}</span>
                        </div>
                      </div>
                      {event.recurring && (
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Recurring {event.recurrencePattern}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-sm px-2 py-1 rounded-full capitalize ${
                          event.priority === 'high' ? 'bg-red-100 text-red-600' :
                          event.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {event.priority} Priority
                        </span>
                        <span className={`text-sm px-2 py-1 rounded-full capitalize ${
                          event.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                          event.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
                          event.status === 'completed' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {event.status}
                        </span>
                        {event.notifications && (
                          <span className="text-sm px-2 py-1 rounded-full bg-purple-100 text-purple-600">
                            Reminder: {event.reminderTime}
                          </span>
                        )}
                      </div>
                      {event.notes && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Notes:</span> {event.notes}
                        </p>
                      )}
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingEvent(event)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Edit Event Dialog */}
      {editingEvent && (
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <EventForm
              data={editingEvent}
              onChange={setEditingEvent}
              onSubmit={() => handleEditEvent(editingEvent)}
              submitText="Save Changes"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 