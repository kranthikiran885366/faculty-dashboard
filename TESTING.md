# Testing Documentation

## Faculty Dashboard Management System

**Version:** 1.0  
**Last Updated:** October 2025

---

## Table of Contents
1. [Testing Strategy](#testing-strategy)
2. [Testing Levels](#testing-levels)
3. [Test Environment Setup](#test-environment-setup)
4. [Unit Testing](#unit-testing)
5. [Integration Testing](#integration-testing)
6. [End-to-End Testing](#end-to-end-testing)
7. [API Testing](#api-testing)
8. [Performance Testing](#performance-testing)
9. [Security Testing](#security-testing)
10. [Test Coverage](#test-coverage)
11. [Continuous Testing](#continuous-testing)

---

## Testing Strategy

### Testing Philosophy
We follow a comprehensive testing approach that ensures code quality, reliability, and maintainability. Our testing pyramid prioritizes:

```
         /\
        /E2E\          ← Few, Critical User Flows
       /------\
      /  INT   \       ← API & Component Integration
     /----------\
    /   UNIT     \     ← Many, Fast, Isolated Tests
   /--------------\
```

### Testing Objectives
- **Reliability**: Ensure the application works as expected
- **Quality**: Maintain high code quality standards
- **Confidence**: Deploy with confidence
- **Documentation**: Tests serve as living documentation
- **Regression Prevention**: Catch bugs before production

### Testing Principles
1. **Fast**: Tests should run quickly
2. **Isolated**: Tests should not depend on each other
3. **Repeatable**: Same result every time
4. **Self-Validating**: Pass or fail, no manual verification
5. **Timely**: Written before or alongside code (TDD)

---

## Testing Levels

### 1. Unit Tests (70%)
- Test individual functions and components
- Fast execution
- No external dependencies
- **Tools**: Jest, React Testing Library

### 2. Integration Tests (20%)
- Test component interactions
- Test API routes with database
- Test authentication flows
- **Tools**: Jest, Supertest, Testing Library

### 3. End-to-End Tests (10%)
- Test complete user workflows
- Test across multiple pages
- Test in real browser environment
- **Tools**: Playwright, Cypress

---

## Test Environment Setup

### Installation

```bash
# Install testing dependencies
npm install --save-dev \
  jest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  @types/jest \
  jest-environment-jsdom \
  ts-jest \
  supertest \
  @playwright/test
```

### Jest Configuration

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock environment variables
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key'
process.env.JWT_SECRET = 'test-secret'
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## Unit Testing

### Testing React Components

#### Example: Button Component Test

```typescript
// components/ui/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button Component', () => {
  it('renders with correct label', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    
    fireEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toHaveClass('btn-primary')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeDisabled()
  })
})
```

#### Example: Utility Function Test

```typescript
// lib/utils.test.ts
import { formatDate, calculateGPA } from './utils'

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2025-10-01')
      expect(formatDate(date)).toBe('October 1, 2025')
    })

    it('handles invalid dates', () => {
      expect(formatDate(null)).toBe('Invalid Date')
    })
  })

  describe('calculateGPA', () => {
    it('calculates GPA correctly', () => {
      const grades = [
        { credits: 3, grade: 'A' },
        { credits: 4, grade: 'B' },
      ]
      expect(calculateGPA(grades)).toBe(3.43)
    })

    it('returns 0 for empty grades', () => {
      expect(calculateGPA([])).toBe(0)
    })
  })
})
```

### Testing Custom Hooks

```typescript
// hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './useAuth'

describe('useAuth Hook', () => {
  it('initializes with null user', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.user).toBeNull()
  })

  it('logs in user successfully', async () => {
    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })

    expect(result.current.user).toBeDefined()
    expect(result.current.user?.email).toBe('test@example.com')
  })
})
```

---

## Integration Testing

### Testing API Routes

```typescript
// app/api/auth/login/route.test.ts
import { POST } from './route'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

jest.mock('@/lib/mongodb')
jest.mock('@/models/User')

describe('/api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns token on successful login', async () => {
    const mockUser = {
      _id: '123',
      email: 'test@example.com',
      password: 'password123',
      role: 'faculty',
      name: 'Test User',
    }

    ;(User.findOne as jest.Mock).mockResolvedValue(mockUser)

    const request = new Request('http://localhost:5000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('token')
    expect(data.user.email).toBe('test@example.com')
  })

  it('returns 401 on invalid credentials', async () => {
    ;(User.findOne as jest.Mock).mockResolvedValue(null)

    const request = new Request('http://localhost:5000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(401)
  })
})
```

### Testing Component Integration

```typescript
// app/dashboard/page.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from './page'

// Mock the API calls
jest.mock('@/lib/api', () => ({
  fetchClasses: jest.fn(() => Promise.resolve([
    { id: '1', name: 'Math 101' },
    { id: '2', name: 'Physics 201' },
  ])),
}))

describe('Dashboard Page', () => {
  it('displays loading state initially', () => {
    render(<Dashboard />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays classes after loading', async () => {
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Math 101')).toBeInTheDocument()
      expect(screen.getByText('Physics 201')).toBeInTheDocument()
    })
  })
})
```

---

## End-to-End Testing

### Playwright Configuration

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### E2E Test Example

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('user can login successfully', async ({ page }) => {
    await page.goto('/')
    
    // Click login button
    await page.click('text=Login')
    
    // Fill in credentials
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Wait for navigation to dashboard
    await page.waitForURL('/dashboard')
    
    // Verify we're on the dashboard
    expect(page.url()).toContain('/dashboard')
    expect(await page.textContent('h1')).toContain('Dashboard')
  })

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('input[name="email"]', 'wrong@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    // Check for error message
    await expect(page.locator('.error-message')).toBeVisible()
    await expect(page.locator('.error-message')).toContainText('Invalid')
  })
})

test.describe('Dashboard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('displays user classes', async ({ page }) => {
    // Wait for classes to load
    await page.waitForSelector('.class-card')
    
    // Verify classes are displayed
    const classes = await page.locator('.class-card').count()
    expect(classes).toBeGreaterThan(0)
  })

  test('can navigate to class details', async ({ page }) => {
    await page.click('.class-card:first-child')
    
    // Verify we're on class details page
    expect(page.url()).toContain('/dashboard/classes/')
    await expect(page.locator('h1')).toBeVisible()
  })
})
```

---

## API Testing

### Using Supertest

```typescript
// tests/api/classes.test.ts
import request from 'supertest'
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const app = next({ dev: false })
const handle = app.getRequestHandler()

describe('Classes API', () => {
  let server: any

  beforeAll(async () => {
    await app.prepare()
    server = createServer((req, res) => {
      const parsedUrl = parse(req.url!, true)
      handle(req, res, parsedUrl)
    })
  })

  afterAll(() => {
    server.close()
  })

  it('GET /api/classes returns classes list', async () => {
    const response = await request(server)
      .get('/api/classes')
      .set('Authorization', 'Bearer test-token')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
  })

  it('POST /api/classes creates new class', async () => {
    const newClass = {
      courseCode: 'CS101',
      courseName: 'Introduction to CS',
      instructor: '123',
    }

    const response = await request(server)
      .post('/api/classes')
      .set('Authorization', 'Bearer test-token')
      .send(newClass)

    expect(response.status).toBe(201)
    expect(response.body.data).toHaveProperty('_id')
  })
})
```

---

## Performance Testing

### Load Testing with K6

Create `k6-load-test.js`:

```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up
    { duration: '1m', target: 20 },  // Stay at 20 users
    { duration: '30s', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],   // Less than 1% failure
  },
}

export default function () {
  const res = http.get('http://localhost:5000')
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  })

  sleep(1)
}
```

Run: `k6 run k6-load-test.js`

### Lighthouse Performance Testing

```bash
# Install Lighthouse
npm install -g lighthouse

# Run Lighthouse
lighthouse http://localhost:5000 --output html --output-path ./lighthouse-report.html
```

---

## Security Testing

### Automated Security Scanning

```bash
# Install npm audit
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

### OWASP ZAP Integration

```yaml
# .github/workflows/security-scan.yml
name: Security Scan
on: [push]
jobs:
  zap-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: ZAP Scan
        uses: zaproxy/action-baseline@v0.6.1
        with:
          target: 'http://localhost:5000'
```

---

## Test Coverage

### Viewing Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# Open HTML report
open coverage/lcov-report/index.html
```

### Coverage Goals

| Area              | Target |
|-------------------|--------|
| Statements        | 80%    |
| Branches          | 75%    |
| Functions         | 80%    |
| Lines             | 80%    |
| Critical Paths    | 100%   |

---

## Continuous Testing

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results/
```

---

## Best Practices

### Writing Good Tests

1. **Arrange-Act-Assert Pattern**
   ```typescript
   it('calculates total correctly', () => {
     // Arrange
     const items = [{ price: 10 }, { price: 20 }]
     
     // Act
     const total = calculateTotal(items)
     
     // Assert
     expect(total).toBe(30)
   })
   ```

2. **Descriptive Test Names**
   ```typescript
   // ✅ Good
   it('returns 404 when user is not found')
   
   // ❌ Bad
   it('test user')
   ```

3. **One Assertion Per Test** (when possible)
   ```typescript
   // ✅ Good
   it('returns correct status code', () => {
     expect(response.status).toBe(200)
   })
   
   it('returns user data', () => {
     expect(response.body).toHaveProperty('user')
   })
   ```

4. **Avoid Test Interdependence**
   ```typescript
   // Each test should be independent
   beforeEach(() => {
     // Reset state before each test
     resetDatabase()
   })
   ```

---

**Last Updated:** October 1, 2025  
**Review Cycle:** Quarterly
