import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// JWT secret key - in a real app, this would be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 