import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// This would connect to a real database in production
const MOCK_USERS = [
  {
    id: "1",
    email: "faculty@example.com",
    password: "password123", // In production, this would be hashed
    name: "John Doe",
    role: "faculty",
  },
  {
    id: "2",
    email: "hod@example.com",
    password: "password123",
    name: "Jane Smith",
    role: "hod",
  },
  {
    id: "3",
    email: "admin@example.com",
    password: "password123",
    name: "Admin User",
    role: "admin",
  },
]

// JWT Secret (would be in environment variables in production)
const JWT_SECRET = "your-secret-key"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = MOCK_USERS.find((u) => u.email === email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" },
    )

    // Return user info and token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
