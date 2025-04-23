'use client';

import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Mail, Phone, BookOpen, Award } from 'lucide-react';
import { useState } from 'react';

interface FacultyMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  expertise: string[];
  achievements: string[];
  image: string;
}

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: "Dr. Lalli",
    role: "Professor & HOD",
    department: "Computer Science",
    email: "lalli@faculty.edu",
    phone: "+1 234 567 890",
    expertise: ["Machine Learning", "Artificial Intelligence", "Data Science"],
    achievements: ["Best Research Paper 2023", "Excellence in Teaching Award"],
    image: "/gallery/lalli.jpg"
  },
  {
    id: 2,
    name: "Dr. Pravalli",
    role: "Associate Professor",
    department: "Computer Science",
    email: "pravalli@faculty.edu",
    phone: "+1 234 567 891",
    expertise: ["Software Engineering", "Cloud Computing", "Cybersecurity"],
    achievements: ["Outstanding Faculty Award", "Industry Partnership Award"],
    image: "/gallery/pravali.jpg"
  },
  {
    id: 3,
    name: "Dr. Shoyab",
    role: "Assistant Professor",
    department: "Computer Science",
    email: "shoyab@faculty.edu",
    phone: "+1 234 567 892",
    expertise: ["Web Technologies", "Mobile Computing", "IoT"],
    achievements: ["Innovation in Teaching Award", "Research Excellence Award"],
    image: "/gallery/shoyab.jpg"
  },
  {
    id: 4,
    name: "Prof. David Wilson",
    role: "Professor",
    department: "Computer Science",
    email: "david.wilson@faculty.edu",
    phone: "+1 234 567 893",
    expertise: ["Database Systems", "Big Data Analytics", "Data Mining"],
    achievements: ["Research Excellence Award", "Best Mentor Award"],
    image: "/gallery/g8.jpg"
  },
  {
    id: 5,
    name: "Dr. Lisa Wang",
    role: "Associate Professor",
    department: "Computer Science",
    email: "lisa.wang@faculty.edu",
    phone: "+1 234 567 894",
    expertise: ["Computer Vision", "Deep Learning", "Pattern Recognition"],
    achievements: ["Innovation Award", "Outstanding Research Award"],
    image: "/gallery/g9.jpg"
  },
  {
    id: 6,
    name: "Dr. James Anderson",
    role: "Professor",
    department: "Computer Science",
    email: "james.anderson@faculty.edu",
    phone: "+1 234 567 895",
    expertise: ["Network Security", "Cryptography", "Information Security"],
    achievements: ["Security Research Award", "Teaching Excellence Award"],
    image: "/gallery/g7.jpg"
  },
  {
    id: 7,
    name: "Dr. Maria Garcia",
    role: "Assistant Professor",
    department: "Computer Science",
    email: "maria.garcia@faculty.edu",
    phone: "+1 234 567 896",
    expertise: ["Human-Computer Interaction", "UX Design", "Mobile Computing"],
    achievements: ["Best Paper Award", "Innovation in Teaching"],
    image: "/gallery/g10.jpg"
  },
  {
    id: 8,
    name: "Prof. Robert Taylor",
    role: "Professor",
    department: "Computer Science",
    email: "robert.taylor@faculty.edu",
    phone: "+1 234 567 897",
    expertise: ["Algorithms", "Theory of Computation", "Discrete Mathematics"],
    achievements: ["Lifetime Achievement Award", "Best Faculty Award"],
    image: "/galleryy/g6.jpg"
  },
  {
    id: 9,
    name: "Dr. Jennifer Lee",
    role: "Associate Professor",
    department: "Computer Science",
    email: "jennifer.lee@faculty.edu",
    phone: "+1 234 567 898",
    expertise: ["Software Testing", "Quality Assurance", "Agile Methodologies"],
    achievements: ["Software Engineering Award", "Teaching Innovation Award"],
    image: "/gallery/g12.jpg"
  },
  {
    id: 10,
    name: "Dr. Thomas Moore",
    role: "Professor",
    department: "Computer Science",
    email: "thomas.moore@faculty.edu",
    phone: "+1 234 567 899",
    expertise: ["Parallel Computing", "High Performance Computing", "Distributed Systems"],
    achievements: ["Research Impact Award", "Excellence in Mentoring"],
    image: "/gallery/g11.jpg"
  }
];

export default function FacultyGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {facultyMembers.map((faculty) => (
        <Card 
          key={faculty.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
          onMouseEnter={() => setHoveredId(faculty.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative h-48 w-full group">
            <Image
              src={faculty.image}
              alt={faculty.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={faculty.id <= 4}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <CardContent className="p-4 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">{faculty.name}</h3>
              <p className="text-sm font-medium text-purple-600">{faculty.role}</p>
              <p className="text-sm text-gray-600">{faculty.department}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{faculty.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{faculty.phone}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Expertise</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {faculty.expertise.map((item, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Achievements</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                {faculty.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 