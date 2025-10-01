# Faculty Dashboard Management System

## Overview
A comprehensive Next.js 14 faculty management system for universities with role-based dashboards for faculty, HOD (Head of Department), and administrators. The platform provides tools for class management, student performance tracking, research management, and academic workflows.

## Project Structure
- **Frontend**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Radix UI primitives with custom components
- **Animations**: Framer Motion
- **Authentication**: Firebase Authentication (optional) and MongoDB-based auth
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Context API

## Recent Changes (October 2025)
- Removed static export configuration to support API routes
- Fixed MongoDB and User model to use ES modules (import/export)
- Configured Next.js dev server to run on 0.0.0.0:5000 for Replit environment
- Made Firebase authentication optional with graceful fallback
- Added .env.example file for environment variable reference
- Set up development workflow on port 5000

## Environment Variables Required

### MongoDB (Required for database features)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

### Firebase (Optional - for Firebase authentication)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Key Features
- **Role-Based Access**: Separate dashboards for Faculty, HOD, and Admin
- **Class Management**: Schedule classes, track attendance, manage course materials
- **Student Performance**: Grade assignments, analyze performance trends
- **Research Tracking**: Manage research projects and publications
- **Department Management**: Faculty workload and course assignments
- **Leave Management**: Request and approve leaves
- **Gallery**: Image gallery for institutional photos

## Development
- Run `npm install` to install dependencies
- Run `npm run dev` to start the development server on port 5000
- Server is configured to bind to 0.0.0.0 for Replit proxy compatibility

## Production Deployment
- Configure environment variables in Replit Secrets
- The app uses Next.js server-side features (API routes, server components)
- Build command: `npm run build`
- Start command: `npm start`

## User Preferences
None documented yet.

## Project Architecture
- **App Router**: Using Next.js 14 App Router with server and client components
- **API Routes**: RESTful API endpoints in `/app/api/`
- **Database Models**: Mongoose schemas in `/models/`
- **Shared Libraries**: Utility functions and configurations in `/lib/`
- **UI Components**: Reusable components in `/components/`
- **Static Assets**: Public files and images in `/public/`

## Notes
- The application supports both Firebase and MongoDB authentication
- Firebase is optional - the app will run without Firebase configuration
- The app has API routes, so static export is disabled
