import { NextResponse } from "next/server"

// Mock data for classes
const MOCK_CLASSES = [
  {
    id: "1",
    code: "CS101",
    title: "Introduction to Computer Science",
    description: "Fundamental concepts of computer science and programming",
    students: 45,
    progress: 75,
    schedule: [
      { day: "Monday", time: "09:00 AM - 10:30 AM", room: "Room 101" },
      { day: "Wednesday", time: "09:00 AM - 10:30 AM", room: "Room 101" },
    ],
  },
  {
    id: "2",
    code: "CS305",
    title: "Advanced Database Systems",
    description: "Advanced concepts in database design and implementation",
    students: 32,
    progress: 60,
    schedule: [
      { day: "Tuesday", time: "11:30 AM - 01:00 PM", room: "Room 205" },
      { day: "Thursday", time: "11:30 AM - 01:00 PM", room: "Room 205" },
    ],
  },
  {
    id: "3",
    code: "CS210",
    title: "Data Structures and Algorithms",
    description: "Implementation and analysis of data structures and algorithms",
    students: 38,
    progress: 80,
    schedule: [
      { day: "Monday", time: "02:00 PM - 03:30 PM", room: "Room 103" },
      { day: "Wednesday", time: "02:00 PM - 03:30 PM", room: "Room 103" },
    ],
  },
  {
    id: "4",
    code: "CS401",
    title: "Artificial Intelligence",
    description: "Introduction to AI concepts, algorithms, and applications",
    students: 28,
    progress: 40,
    schedule: [
      { day: "Tuesday", time: "09:00 AM - 10:30 AM", room: "Room 302" },
      { day: "Thursday", time: "09:00 AM - 10:30 AM", room: "Room 302" },
    ],
  },
]

export async function GET() {
  try {
    // In a real app, we would fetch from database and apply authentication/authorization
    return NextResponse.json(MOCK_CLASSES)
  } catch (error) {
    console.error("Error fetching classes:", error)
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const classData = await request.json()

    // In a real app, we would validate and save to database
    const newClass = {
      id: (MOCK_CLASSES.length + 1).toString(),
      ...classData,
    }

    return NextResponse.json(newClass, { status: 201 })
  } catch (error) {
    console.error("Error creating class:", error)
    return NextResponse.json({ error: "Failed to create class" }, { status: 500 })
  }
}
