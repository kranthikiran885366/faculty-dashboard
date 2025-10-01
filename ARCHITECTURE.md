# Architecture Documentation

## Faculty Dashboard Management System

**Version:** 1.0  
**Last Updated:** October 2025

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Database Architecture](#database-architecture)
6. [Authentication Architecture](#authentication-architecture)
7. [API Architecture](#api-architecture)
8. [State Management](#state-management)
9. [Routing Architecture](#routing-architecture)
10. [Deployment Architecture](#deployment-architecture)
11. [Security Architecture](#security-architecture)
12. [Scalability Considerations](#scalability-considerations)

---

## Architecture Overview

### System Architecture Diagram

```
┌───────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Browser    │  │   Tablet     │  │   Mobile     │           │
│  │   (Desktop)  │  │   (iPad)     │  │   (Phone)    │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
│         │                 │                   │                    │
│         └─────────────────┴───────────────────┘                    │
│                           │                                         │
│                           │ HTTPS/WebSocket                        │
└───────────────────────────┼─────────────────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────────────────┐
│                APPLICATION LAYER (Next.js 14)                       │
│                           │                                         │
│  ┌────────────────────────┴──────────────────────────┐             │
│  │             SERVER-SIDE RENDERING                 │             │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │             │
│  │  │  Pages   │  │Components│  │  Middleware  │   │             │
│  │  │ (App Dir)│  │  (React) │  │ (Auth Guard) │   │             │
│  │  └──────────┘  └──────────┘  └──────────────┘   │             │
│  └────────────────────────┬──────────────────────────┘             │
│                           │                                         │
│  ┌────────────────────────┴──────────────────────────┐             │
│  │              API ROUTES LAYER                     │             │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │             │
│  │  │ Auth │ │Class │ │Study │ │Rsrch │ │Exams │   │             │
│  │  │ /api │ │ /api │ │ /api │ │ /api │ │ /api │   │             │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   │             │
│  └────────────────────────┬──────────────────────────┘             │
└───────────────────────────┼─────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
│   DATABASE   │  │  AUTHENTICATION  │  │    STORAGE   │
│   MongoDB    │  │     Firebase     │  │   (Future)   │
│              │  │       JWT        │  │    S3/CDN    │
│  - Users     │  │                  │  │   - Images   │
│  - Classes   │  │  - Email/Pass    │  │   - Files    │
│  - Students  │  │  - OAuth         │  │   - Assets   │
│  - Research  │  │  - Tokens        │  │              │
└──────────────┘  └──────────────────┘  └──────────────┘
```

### Technology Stack

#### Core Technologies
- **Frontend Framework**: Next.js 14 with App Router
- **Programming Language**: TypeScript 5.0
- **UI Framework**: React 18
- **Styling**: Tailwind CSS 3.3
- **Database**: MongoDB 6.3 with Mongoose ODM
- **Authentication**: Firebase Auth 11.6 / JWT
- **Hosting**: Replit / Vercel

#### Supporting Libraries
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **State**: React Context API
- **Date Handling**: date-fns
- **HTTP Client**: Native Fetch API

---

## System Components

### Component Breakdown

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND COMPONENTS                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                  Layout Components                  │    │
│  │  • RootLayout    • Navbar      • Footer            │    │
│  │  • AdminLayout   • HODLayout   • ThemeProvider     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                   Page Components                   │    │
│  │  • HomePage      • Dashboard   • Gallery           │    │
│  │  • LoginPage     • ClassesPage • ResearchPage      │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                  Feature Components                 │    │
│  │  • ClassCard     • StudentTable • GradeForm        │    │
│  │  • FacultyGrid   • Notifications • Marquee         │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                   UI Components                     │    │
│  │  • Button        • Card        • Dialog            │    │
│  │  • Input         • Select      • Accordion         │    │
│  │  • Toast         • Tabs        • Progress          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     BACKEND COMPONENTS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                    API Routes                       │    │
│  │  • /api/auth/*   • /api/classes/*                  │    │
│  │  • /api/students/*  • /api/research/*              │    │
│  │  • /api/exams/*  • /api/reports/*                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                 Database Models                     │    │
│  │  • User Model    • Class Model (future)            │    │
│  │  • Student Model • Research Model (future)         │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                  Utility Modules                    │    │
│  │  • MongoDB Connection  • Firebase Config           │    │
│  │  • Auth Middleware     • Error Handlers            │    │
│  │  • Validation Utils    • Helper Functions          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Next.js App Router Structure

```
app/
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Home page
├── globals.css                # Global styles
│
├── (auth)/                    # Auth route group
│   ├── login/
│   │   └── page.tsx          # Login page
│   └── register/
│       └── page.tsx          # Registration page
│
├── dashboard/                 # Main dashboard
│   ├── layout.tsx            # Dashboard layout
│   ├── page.tsx              # Dashboard home
│   ├── classes/
│   │   ├── page.tsx          # Classes list
│   │   └── [id]/
│   │       └── page.tsx      # Class details
│   ├── students/
│   │   ├── page.tsx          # Students list
│   │   └── [id]/
│   │       └── page.tsx      # Student details
│   └── research/
│       └── page.tsx          # Research projects
│
├── admin/                     # Admin dashboard
│   ├── layout.tsx            # Admin layout
│   ├── dashboard/
│   │   └── page.tsx          # Admin home
│   └── faculty/
│       └── page.tsx          # Faculty management
│
├── hod/                       # HOD dashboard
│   ├── layout.tsx            # HOD layout
│   └── analytics/
│       └── page.tsx          # Department analytics
│
└── api/                       # API routes
    ├── auth/
    │   ├── route.ts          # Auth handler
    │   └── login/
    │       └── route.ts      # Login endpoint
    ├── classes/
    │   └── route.ts          # Classes CRUD
    └── students/
        └── route.ts          # Students CRUD
```

### Component Composition Pattern

```typescript
// Composition hierarchy example
<AuthProvider>
  <ThemeProvider>
    <Layout>
      <Navbar />
      <Main>
        <PageContent>
          <FeatureComponent>
            <UIComponent />
          </FeatureComponent>
        </PageContent>
      </Main>
      <Footer />
    </Layout>
    <Toaster />
  </ThemeProvider>
</AuthProvider>
```

### Data Flow Pattern

```
User Interaction
      ↓
Event Handler (Component)
      ↓
API Call (fetch/axios)
      ↓
Next.js API Route
      ↓
Database Query (Mongoose)
      ↓
Response Data
      ↓
State Update (Context/useState)
      ↓
Re-render (React)
      ↓
Updated UI
```

---

## Backend Architecture

### API Route Structure

```
app/api/
│
├── auth/
│   ├── route.ts              # GET /api/auth (check session)
│   ├── login/
│   │   └── route.ts          # POST /api/auth/login
│   ├── register/
│   │   └── route.ts          # POST /api/auth/register
│   └── logout/
│       └── route.ts          # POST /api/auth/logout
│
├── classes/
│   ├── route.ts              # GET, POST /api/classes
│   ├── [id]/
│   │   ├── route.ts          # GET, PUT, DELETE /api/classes/:id
│   │   ├── students/
│   │   │   └── route.ts      # GET /api/classes/:id/students
│   │   └── attendance/
│   │       └── route.ts      # POST /api/classes/:id/attendance
│
├── students/
│   ├── route.ts              # GET, POST /api/students
│   └── [id]/
│       ├── route.ts          # GET, PUT, DELETE /api/students/:id
│       └── grades/
│           └── route.ts      # GET /api/students/:id/grades
│
└── research/
    ├── route.ts              # GET, POST /api/research
    └── [id]/
        └── route.ts          # GET, PUT, DELETE /api/research/:id
```

### Request Processing Flow

```
Client Request
      ↓
Next.js Server
      ↓
Middleware (Auth Check)
      ↓
API Route Handler
      ↓
Input Validation
      ↓
Business Logic
      ↓
Database Operation
      ↓
Response Formatting
      ↓
Send Response
```

### Middleware Pattern

```typescript
// Authentication middleware example
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  try {
    const decoded = verifyToken(token)
    // Add user to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', decoded.id)
    requestHeaders.set('x-user-role', decoded.role)
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/hod/:path*'],
}
```

---

## Database Architecture

### MongoDB Collections

```
faculty_dashboard (Database)
│
├── users                      # User accounts
│   ├── _id: ObjectId
│   ├── email: String (indexed)
│   ├── password: String (hashed)
│   ├── name: String
│   ├── role: String (enum)
│   └── createdAt: Date
│
├── classes (future)           # Course classes
│   ├── _id: ObjectId
│   ├── courseCode: String (indexed)
│   ├── courseName: String
│   ├── instructor: ObjectId → users
│   ├── students: [ObjectId] → students
│   └── semester: String
│
├── students (future)          # Student records
│   ├── _id: ObjectId
│   ├── studentId: String (indexed, unique)
│   ├── name: String
│   ├── email: String (indexed)
│   └── enrolledCourses: [ObjectId] → classes
│
└── research (future)          # Research projects
    ├── _id: ObjectId
    ├── title: String
    ├── faculty: [ObjectId] → users
    ├── status: String
    └── publications: [String]
```

### Indexing Strategy

```javascript
// User collection indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

// Class collection indexes (future)
db.classes.createIndex({ courseCode: 1 })
db.classes.createIndex({ instructor: 1 })
db.classes.createIndex({ semester: 1 })

// Student collection indexes (future)
db.students.createIndex({ studentId: 1 }, { unique: true })
db.students.createIndex({ email: 1 })
```

### Data Relationships

```
User (1) ──────< (N) Classes (as instructor)
User (N) ──────< (M) Research (collaborators)
Class (N) ─────< (M) Students (enrollment)
Student (1) ───< (N) Grades
```

---

## Authentication Architecture

### Authentication Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ 1. Login Request
       │    {email, password}
       ▼
┌──────────────────┐
│  Login Endpoint  │
│   /api/auth/login│
└──────┬───────────┘
       │ 2. Verify Credentials
       ▼
┌──────────────────┐
│    MongoDB       │
│  Users Collection│
└──────┬───────────┘
       │ 3. User Found
       ▼
┌──────────────────┐
│  Generate JWT    │
│  Token with role │
└──────┬───────────┘
       │ 4. Return Token
       │    {user, token}
       ▼
┌─────────────┐
│   Client    │
│ Store Token │
│  localStorage│
└──────┬──────┘
       │ 5. Subsequent Requests
       │    Header: Authorization: Bearer <token>
       ▼
┌──────────────────┐
│   Middleware     │
│  Verify Token    │
└──────┬───────────┘
       │ 6. Token Valid
       ▼
┌──────────────────┐
│  Protected Route │
│  Return Data     │
└──────────────────┘
```

### JWT Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "faculty",
    "name": "John Doe",
    "iat": 1696176000,
    "exp": 1696262400
  },
  "signature": "encrypted-signature"
}
```

### Role-Based Access Control

```typescript
// Role hierarchy
const ROLE_HIERARCHY = {
  admin: 3,    // Full access
  hod: 2,      // Department level
  faculty: 1,  // Individual level
}

// Permission checker
function hasPermission(userRole: string, requiredRole: string): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

// Route protection
export function requireRole(role: string) {
  return async (req: Request) => {
    const userRole = req.headers.get('x-user-role')
    
    if (!hasPermission(userRole, role)) {
      return new Response('Forbidden', { status: 403 })
    }
  }
}
```

---

## API Architecture

### REST API Design Principles

1. **Resource-Based URLs**
   ```
   /api/classes          # Collection
   /api/classes/:id      # Single resource
   /api/classes/:id/students  # Nested resource
   ```

2. **HTTP Methods**
   - GET: Retrieve resources
   - POST: Create resources
   - PUT/PATCH: Update resources
   - DELETE: Delete resources

3. **Status Codes**
   - 200: Success
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Server Error

### API Response Format

```typescript
// Success response
{
  success: true,
  data: { /* response data */ },
  message: "Operation successful",
  timestamp: "2025-10-01T12:00:00Z"
}

// Error response
{
  success: false,
  error: "Error message",
  code: "ERROR_CODE",
  timestamp: "2025-10-01T12:00:00Z"
}

// Paginated response
{
  success: true,
  data: [ /* items */ ],
  pagination: {
    page: 1,
    limit: 20,
    total: 100,
    pages: 5
  }
}
```

---

## State Management

### React Context Architecture

```typescript
// Context structure
AuthContext
  ├── user: User | null
  ├── token: string | null
  ├── isLoading: boolean
  ├── login(email, password)
  ├── logout()
  └── loginWithGoogle()

ThemeContext
  ├── theme: 'light' | 'dark'
  └── toggleTheme()

NotificationContext
  ├── notifications: Notification[]
  ├── addNotification(notification)
  └── removeNotification(id)
```

### State Flow

```
Global State (Context)
  ↓
Provider Component
  ↓
Consumer Components
  ↓
Local State (useState)
  ↓
UI Updates
```

---

## Routing Architecture

### File-Based Routing

Next.js App Router provides file-based routing where:
- `page.tsx` creates a route
- `layout.tsx` creates shared layouts
- `[param]` creates dynamic routes
- `(group)` creates route groups (no URL segment)

### Route Protection

```typescript
// Middleware for protected routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public routes
  if (pathname === '/' || pathname.startsWith('/login')) {
    return NextResponse.next()
  }
  
  // Protected routes
  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}
```

---

## Deployment Architecture

### Production Deployment Flow

```
Developer
    ↓ git push
GitHub Repository
    ↓ webhook
CI/CD Pipeline (GitHub Actions)
    ├── Run Tests
    ├── Run Linter
    ├── Build Application
    └── Deploy
        ↓
Production Server (Replit/Vercel)
    ├── Next.js Server
    ├── MongoDB Connection
    └── Environment Variables
```

### Environment Configuration

```
Development
  ├── localhost:5000
  ├── Local MongoDB
  └── Test Firebase

Production
  ├── production-domain.com
  ├── MongoDB Atlas
  └── Production Firebase
```

---

## Security Architecture

### Security Layers

```
1. Network Layer
   └── HTTPS/TLS Encryption

2. Application Layer
   ├── Input Validation
   ├── Output Encoding
   └── CSRF Protection

3. Authentication Layer
   ├── JWT Tokens
   ├── Password Hashing
   └── Session Management

4. Authorization Layer
   ├── Role-Based Access
   └── Permission Checks

5. Data Layer
   ├── Encrypted Connections
   └── Parameterized Queries
```

---

## Scalability Considerations

### Horizontal Scaling

```
Load Balancer
    ├── App Instance 1
    ├── App Instance 2
    └── App Instance 3
         ↓
    Database Cluster
    ├── Primary
    └── Replicas
```

### Caching Strategy (Future)

```
Request
    ↓
CDN Cache (Static Assets)
    ↓
Application Cache (Redis)
    ↓
Database Query Cache
    ↓
Database
```

---

**Document Version:** 1.0  
**Last Review:** October 1, 2025  
**Next Review:** January 1, 2026
