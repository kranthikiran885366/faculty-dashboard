'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Mail,
  Lock,
  User,
  Palette,
  Globe,
  Calendar,
  BookOpen,
  Users,
  Building,
  Save,
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface NotificationSetting {
  type: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface ThemeSetting {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  density: 'compact' | 'comfortable' | 'spacious';
}

interface SecuritySetting {
  twoFactorAuth: boolean;
  sessionTimeout: '15min' | '30min' | '1hour' | '4hours' | 'never';
  passwordExpiry: '30days' | '60days' | '90days' | 'never';
  loginAttempts: number;
}

interface DisplaySetting {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

interface AcademicSetting {
  defaultDepartment: string;
  academicYear: string;
  gradeScale: string;
  attendanceThreshold: number;
}

export default function Settings() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { type: 'New Assignments', email: true, push: true, sms: false },
    { type: 'Due Dates', email: true, push: true, sms: true },
    { type: 'Schedule Changes', email: true, push: true, sms: true },
    { type: 'Student Performance', email: true, push: false, sms: false },
    { type: 'Department Updates', email: true, push: true, sms: false },
  ]);

  const [theme, setTheme] = useState<ThemeSetting>({
    mode: 'system',
    primaryColor: '#0066cc',
    fontSize: 'medium',
    density: 'comfortable',
  });

  const [security, setSecurity] = useState<SecuritySetting>({
    twoFactorAuth: true,
    sessionTimeout: '30min',
    passwordExpiry: '90days',
    loginAttempts: 3,
  });

  const [display, setDisplay] = useState<DisplaySetting>({
    language: 'English',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '24h',
  });

  const [academic, setAcademic] = useState<AcademicSetting>({
    defaultDepartment: 'Computer Science',
    academicYear: '2023-2024',
    gradeScale: 'A-F',
    attendanceThreshold: 75,
  });

  const handleNotificationChange = (type: string, channel: 'email' | 'push' | 'sms', value: boolean) => {
    setNotifications(notifications.map(notification =>
      notification.type === type ? { ...notification, [channel]: value } : notification
    ));
  };

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
  const timezones = ['UTC', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC-4', 'UTC-5', 'UTC-6'];
  const dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical', 'Electrical'];
  const gradeScales = ['A-F', '0-100', '0-10', '0-4'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your preferences and system settings</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Display
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Academic
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about different events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4 items-center font-medium">
                  <div>Notification Type</div>
                  <div className="text-center">Email</div>
                  <div className="text-center">Push</div>
                  <div className="text-center">SMS</div>
                </div>
                <Separator />
                {notifications.map((notification) => (
                  <div key={notification.type} className="grid grid-cols-4 gap-4 items-center">
                    <div>{notification.type}</div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.email}
                        onCheckedChange={(checked) => handleNotificationChange(notification.type, 'email', checked)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.push}
                        onCheckedChange={(checked) => handleNotificationChange(notification.type, 'push', checked)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.sms}
                        onCheckedChange={(checked) => handleNotificationChange(notification.type, 'sms', checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the dashboard looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <Select
                    value={theme.mode}
                    onValueChange={(value: 'light' | 'dark' | 'system') => setTheme({ ...theme, mode: value })}
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
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select
                    value={theme.fontSize}
                    onValueChange={(value: 'small' | 'medium' | 'large') => setTheme({ ...theme, fontSize: value })}
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
                <div className="space-y-2">
                  <Label>Density</Label>
                  <Select
                    value={theme.density}
                    onValueChange={(value: 'compact' | 'comfortable' | 'spacious') => setTheme({ ...theme, density: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select
                  value={security.sessionTimeout}
                  onValueChange={(value: '15min' | '30min' | '1hour' | '4hours' | 'never') =>
                    setSecurity({ ...security, sessionTimeout: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="4hours">4 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Password Expiry</Label>
                <Select
                  value={security.passwordExpiry}
                  onValueChange={(value: '30days' | '60days' | '90days' | 'never') =>
                    setSecurity({ ...security, passwordExpiry: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">30 days</SelectItem>
                    <SelectItem value="60days">60 days</SelectItem>
                    <SelectItem value="90days">90 days</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Maximum Login Attempts</Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={security.loginAttempts}
                  onChange={(e) => setSecurity({ ...security, loginAttempts: parseInt(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Configure language and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={display.language}
                    onValueChange={(value) => setDisplay({ ...display, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={display.timezone}
                    onValueChange={(value) => setDisplay({ ...display, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select
                    value={display.dateFormat}
                    onValueChange={(value) => setDisplay({ ...display, dateFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dateFormats.map((format) => (
                        <SelectItem key={format} value={format}>{format}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <Select
                    value={display.timeFormat}
                    onValueChange={(value: '12h' | '24h') => setDisplay({ ...display, timeFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Settings</CardTitle>
              <CardDescription>Configure academic preferences and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Department</Label>
                  <Select
                    value={academic.defaultDepartment}
                    onValueChange={(value) => setAcademic({ ...academic, defaultDepartment: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Academic Year</Label>
                  <Input
                    value={academic.academicYear}
                    onChange={(e) => setAcademic({ ...academic, academicYear: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Grade Scale</Label>
                  <Select
                    value={academic.gradeScale}
                    onValueChange={(value) => setAcademic({ ...academic, gradeScale: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeScales.map((scale) => (
                        <SelectItem key={scale} value={scale}>{scale}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Attendance Threshold (%)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={academic.attendanceThreshold}
                    onChange={(e) => setAcademic({ ...academic, attendanceThreshold: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
} 