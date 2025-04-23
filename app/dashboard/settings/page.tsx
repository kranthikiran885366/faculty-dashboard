'use client';

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Mail,
  Phone,
  User,
  Shield,
  Save,
  Clock,
  Calendar,
  BookOpen,
  Users,
} from "lucide-react";

interface UserSettings {
  profile: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    officeLocation: string;
    bio: string;
    profileVisibility: "public" | "faculty" | "private";
  };
  notifications: {
    email: boolean;
    desktop: boolean;
    mobile: boolean;
    scheduleReminders: boolean;
    studentMessages: boolean;
    departmentUpdates: boolean;
    classNotifications: boolean;
    researchUpdates: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "system";
    fontSize: "small" | "medium" | "large";
    compactMode: boolean;
    highContrast: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    allowMessaging: boolean;
    publicProfile: boolean;
    showContactInfo: boolean;
  };
  calendar: {
    defaultView: "day" | "week" | "month";
    startOfWeek: "sunday" | "monday";
    workingHours: {
      start: string;
      end: string;
    };
    showDeclinedEvents: boolean;
  };
  academic: {
    defaultGradingScale: string;
    showStudentPhotos: boolean;
    autoSaveGrades: boolean;
    exportFormat: "csv" | "excel" | "pdf";
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      title: "Professor",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      officeLocation: "Building A, Room 301",
      bio: "Professor of Computer Science with research interests in AI and Machine Learning.",
      profileVisibility: "faculty"
    },
    notifications: {
      email: true,
      desktop: true,
      mobile: true,
      scheduleReminders: true,
      studentMessages: true,
      departmentUpdates: true,
      classNotifications: true,
      researchUpdates: true
    },
    appearance: {
      theme: "system",
      fontSize: "medium",
      compactMode: false,
      highContrast: false
    },
    privacy: {
      showOnlineStatus: true,
      showLastSeen: true,
      allowMessaging: true,
      publicProfile: false,
      showContactInfo: false
    },
    calendar: {
      defaultView: "week",
      startOfWeek: "monday",
      workingHours: {
        start: "09:00",
        end: "17:00"
      },
      showDeclinedEvents: false
    },
    academic: {
      defaultGradingScale: "letter",
      showStudentPhotos: true,
      autoSaveGrades: true,
      exportFormat: "excel"
    }
  });

  const handleProfileChange = (field: keyof UserSettings['profile'], value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (field: keyof UserSettings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handleAppearanceChange = (field: keyof UserSettings['appearance'], value: any) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: value
      }
    }));
  };

  const handlePrivacyChange = (field: keyof UserSettings['privacy'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  const handleCalendarChange = (field: keyof UserSettings['calendar'], value: any) => {
    setSettings(prev => ({
      ...prev,
      calendar: {
        ...prev.calendar,
        [field]: value
      }
    }));
  };

  const handleAcademicChange = (field: keyof UserSettings['academic'], value: any) => {
    setSettings(prev => ({
      ...prev,
      academic: {
        ...prev.academic,
        [field]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
    // Show success message
    alert('Settings saved successfully!');
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
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <p className="text-gray-500">Manage your account preferences and settings</p>
          </div>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-6 gap-4">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Sun className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Lock className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="academic">
              <BookOpen className="mr-2 h-4 w-4" />
              Academic
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={settings.profile.title}
                      onChange={(e) => handleProfileChange('title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={settings.profile.department}
                      onChange={(e) => handleProfileChange('department', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={settings.profile.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={settings.profile.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={settings.profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officeLocation">Office Location</Label>
                  <Input
                    id="officeLocation"
                    value={settings.profile.officeLocation}
                    onChange={(e) => handleProfileChange('officeLocation', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={settings.profile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select
                    value={settings.profile.profileVisibility}
                    onValueChange={(value: "public" | "faculty" | "private") => 
                      handleProfileChange('profileVisibility', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="faculty">Faculty Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Desktop Notifications</Label>
                      <p className="text-sm text-gray-500">Show notifications on your desktop</p>
                    </div>
                    <Switch
                      checked={settings.notifications.desktop}
                      onCheckedChange={(checked) => handleNotificationChange('desktop', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Schedule Reminders</Label>
                      <p className="text-sm text-gray-500">Get reminders for upcoming events</p>
                    </div>
                    <Switch
                      checked={settings.notifications.scheduleReminders}
                      onCheckedChange={(checked) => handleNotificationChange('scheduleReminders', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Student Messages</Label>
                      <p className="text-sm text-gray-500">Notifications for student communications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.studentMessages}
                      onCheckedChange={(checked) => handleNotificationChange('studentMessages', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the dashboard looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={settings.appearance.theme}
                      onValueChange={(value: "light" | "dark" | "system") => 
                        handleAppearanceChange('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select
                      value={settings.appearance.fontSize}
                      onValueChange={(value: "small" | "medium" | "large") => 
                        handleAppearanceChange('fontSize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact Mode</Label>
                      <p className="text-sm text-gray-500">Use a more compact layout</p>
                    </div>
                    <Switch
                      checked={settings.appearance.compactMode}
                      onCheckedChange={(checked) => handleAppearanceChange('compactMode', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Online Status</Label>
                      <p className="text-sm text-gray-500">Show when you're online</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showOnlineStatus}
                      onCheckedChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Last Seen</Label>
                      <p className="text-sm text-gray-500">Show your last active time</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showLastSeen}
                      onCheckedChange={(checked) => handlePrivacyChange('showLastSeen', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Messaging</Label>
                      <p className="text-sm text-gray-500">Let others send you messages</p>
                    </div>
                    <Switch
                      checked={settings.privacy.allowMessaging}
                      onCheckedChange={(checked) => handlePrivacyChange('allowMessaging', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Calendar Settings</CardTitle>
                <CardDescription>
                  Customize your calendar preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default View</Label>
                    <Select
                      value={settings.calendar.defaultView}
                      onValueChange={(value: "day" | "week" | "month") => 
                        handleCalendarChange('defaultView', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Start of Week</Label>
                    <Select
                      value={settings.calendar.startOfWeek}
                      onValueChange={(value: "sunday" | "monday") => 
                        handleCalendarChange('startOfWeek', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Working Hours Start</Label>
                      <Input
                        type="time"
                        value={settings.calendar.workingHours.start}
                        onChange={(e) => handleCalendarChange('workingHours', {
                          ...settings.calendar.workingHours,
                          start: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Working Hours End</Label>
                      <Input
                        type="time"
                        value={settings.calendar.workingHours.end}
                        onChange={(e) => handleCalendarChange('workingHours', {
                          ...settings.calendar.workingHours,
                          end: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Settings</CardTitle>
                <CardDescription>
                  Configure your academic preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Grading Scale</Label>
                    <Select
                      value={settings.academic.defaultGradingScale}
                      onValueChange={(value) => handleAcademicChange('defaultGradingScale', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="letter">Letter Grade (A-F)</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="points">Points</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Export Format</Label>
                    <Select
                      value={settings.academic.exportFormat}
                      onValueChange={(value: "csv" | "excel" | "pdf") => 
                        handleAcademicChange('exportFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Student Photos</Label>
                      <p className="text-sm text-gray-500">Display student photos in roster</p>
                    </div>
                    <Switch
                      checked={settings.academic.showStudentPhotos}
                      onCheckedChange={(checked) => handleAcademicChange('showStudentPhotos', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-save Grades</Label>
                      <p className="text-sm text-gray-500">Automatically save grade changes</p>
                    </div>
                    <Switch
                      checked={settings.academic.autoSaveGrades}
                      onCheckedChange={(checked) => handleAcademicChange('autoSaveGrades', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 