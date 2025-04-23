import { NextResponse } from "next/server"

// Mock data for exams
const MOCK_EXAMS = [
  {
    id: "1",
    title: "CS101 Midterm Exam",
    courseCode: "CS101",
    date: "2023-10-15",
    time: "10:00 AM - 12:00 PM",
    duration: 120,
    location: "Examination Hall A",
    status: "Completed",
    totalStudents: 45,
    submitted: 45,
    graded: 42,
    averageScore: 78.5,
  },
  {
    id: "2",
    title: "CS305 Database Design Quiz",
    courseCode: "CS305",
    date: "2023-10-20",
    time: "02:00 PM - 03:00 PM",
    duration: 60,
    location: "Online",
    status: "Completed",
    totalStudents: 32,
    submitted: 30,
    graded: 30,
    averageScore: 82.3,
  },
  {
    id: "3",
    title: "CS210 Data Structures Final Exam",
    courseCode: "CS210",
    date: "2023-12-05",
    time: "09:00 AM - 12:00 PM",
    duration: 180,
    location: "Examination Hall B",
    status: "Scheduled",
    totalStudents: 38,
    submitted: 0,
    graded: 0,
    averageScore: 0,
  },
  {
    id: "4",
    title: "CS401 AI Concepts Quiz",
    courseCode: "CS401",
    date: "2023-10-25",
    time: "11:00 AM - 12:00 PM",
    duration: 60,
    location: "Online",
    status: "Grading",
    totalStudents: 28,
    submitted: 28,
    graded: 15,
    averageScore: 75.8,
  },
]

export async function GET() {
  try {
    // In a real app, we would fetch from database and apply authentication/authorization
    return NextResponse.json(MOCK_EXAMS)
  } catch (error) {
    console.error("Error fetching exams:", error)
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const examData = await request.json()

    // In a real app, we would validate and save to database
    const newExam = {
      id: (MOCK_EXAMS.length + 1).toString(),
      ...examData,
      status: "Scheduled",
      submitted: 0,
      graded: 0,
      averageScore: 0,
    }

    return NextResponse.json(newExam, { status: 201 })
  } catch (error) {
    console.error("Error creating exam:", error)
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 })
  }
}
