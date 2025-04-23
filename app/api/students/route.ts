import { NextResponse } from "next/server"

// Mock data for students
const MOCK_STUDENTS = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.j@university.edu",
    studentId: "ST10001",
    courses: ["CS101", "CS210", "CS401"],
    performance: {
      gpa: 3.8,
      attendance: 92,
      assignments: {
        completed: 15,
        pending: 2,
      },
    },
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.s@university.edu",
    studentId: "ST10002",
    courses: ["CS101", "CS305"],
    performance: {
      gpa: 3.5,
      attendance: 85,
      assignments: {
        completed: 12,
        pending: 5,
      },
    },
  },
  {
    id: "3",
    name: "Charlie Davis",
    email: "charlie.d@university.edu",
    studentId: "ST10003",
    courses: ["CS210", "CS401"],
    performance: {
      gpa: 3.9,
      attendance: 98,
      assignments: {
        completed: 17,
        pending: 0,
      },
    },
  },
  {
    id: "4",
    name: "Diana Wilson",
    email: "diana.w@university.edu",
    studentId: "ST10004",
    courses: ["CS101", "CS305", "CS210"],
    performance: {
      gpa: 3.2,
      attendance: 78,
      assignments: {
        completed: 10,
        pending: 7,
      },
    },
  },
  {
    id: "5",
    name: "Evan Brown",
    email: "evan.b@university.edu",
    studentId: "ST10005",
    courses: ["CS305", "CS401"],
    performance: {
      gpa: 3.7,
      attendance: 90,
      assignments: {
        completed: 14,
        pending: 3,
      },
    },
  },
]

export async function GET() {
  try {
    // In a real app, we would fetch from database and apply authentication/authorization
    return NextResponse.json(MOCK_STUDENTS)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}
