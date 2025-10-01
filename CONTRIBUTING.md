# Contributing to Faculty Dashboard Management System

First off, thank you for considering contributing to the Faculty Dashboard Management System! It's people like you that make this project better for everyone.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Bugs](#reporting-bugs)
8. [Suggesting Features](#suggesting-features)
9. [Community](#community)

---

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behaviors include:**
- Use of sexualized language or imagery
- Trolling, insulting comments, or personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct that would be considered inappropriate in a professional setting

---

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git
- MongoDB (local or cloud)
- Code editor (VS Code recommended)

### Initial Setup

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/faculty-dashboard.git
   cd faculty-dashboard
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/faculty-dashboard.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your local configuration
   ```bash
   cp .env.example .env
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Verify everything works**
   - Open http://localhost:5000
   - Check for any console errors

---

## Development Process

### Branching Strategy

We follow the Git Flow branching model:

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/**: New features (`feature/user-profile`)
- **bugfix/**: Bug fixes (`bugfix/login-error`)
- **hotfix/**: Critical production fixes (`hotfix/security-patch`)
- **release/**: Release preparation (`release/v1.2.0`)

### Working on an Issue

1. **Check existing issues**
   - Look for existing issues or create a new one
   - Comment on the issue to let others know you're working on it

2. **Create a feature branch**
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write code following our coding standards
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run lint          # Check code style
   npm run test          # Run tests
   npm run build         # Test production build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add user profile page"
   ```

6. **Keep your branch updated**
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to GitHub and create a PR
   - Fill out the PR template
   - Link related issues

---

## Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Use explicit types
interface User {
  id: string;
  name: string;
  role: 'faculty' | 'hod' | 'admin';
}

function getUser(id: string): User {
  // implementation
}

// ❌ Bad: Avoid 'any' type
function getUser(id: any): any {
  // implementation
}
```

### React Component Guidelines

```typescript
// ✅ Good: Functional component with proper typing
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}

// ❌ Bad: No types, no export
function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### File Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Pages**: kebab-case or folders (`user-profile/page.tsx`)

### Code Organization

```typescript
// 1. Imports - grouped and ordered
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { formatDate } from '@/lib/utils';
import type { User } from '@/types';

// 2. Types and Interfaces
interface ComponentProps {
  user: User;
}

// 3. Component
export function Component({ user }: ComponentProps) {
  // 3a. Hooks
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 3b. Effects
  useEffect(() => {
    // effect code
  }, []);

  // 3c. Event handlers
  const handleClick = () => {
    // handler code
  };

  // 3d. Render helpers
  const renderContent = () => {
    // helper code
  };

  // 3e. Return
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### CSS/Tailwind Guidelines

```tsx
// ✅ Good: Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>

// ✅ Good: Extract repeated patterns into components
<Card className="p-6">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Bad: Inline styles (unless absolutely necessary)
<div style={{ padding: '16px', backgroundColor: 'white' }}>
  Content
</div>
```

### API Route Guidelines

```typescript
// ✅ Good: Proper error handling and response format
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Business logic
    const result = await processLogin(body);

    // Success response
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system changes
- **ci**: CI/CD changes
- **chore**: Other changes that don't modify src or test files

### Examples

```bash
# Feature
feat(auth): add Google OAuth login

# Bug fix
fix(dashboard): resolve data loading issue on refresh

# Documentation
docs(readme): update installation instructions

# Refactoring
refactor(api): simplify authentication middleware

# Style
style(components): format code with prettier

# Performance
perf(database): add indexes for faster queries
```

### Commit Message Guidelines

1. Use the imperative mood ("add" not "added" or "adds")
2. Don't capitalize the first letter
3. No period at the end of the subject line
4. Limit subject line to 50 characters
5. Separate subject from body with a blank line
6. Wrap body at 72 characters
7. Use body to explain what and why, not how

---

## Pull Request Process

### Before Creating a PR

- [ ] Code follows project coding standards
- [ ] All tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Branch is up to date with develop

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added
- [ ] All tests passing
```

### PR Review Process

1. **Automated checks**: CI/CD runs tests and linting
2. **Code review**: At least one maintainer reviews
3. **Feedback**: Address any requested changes
4. **Approval**: PR gets approved by maintainer
5. **Merge**: Maintainer merges the PR

### After Your PR is Merged

1. Delete your feature branch
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. Update your local repository
   ```bash
   git checkout develop
   git pull upstream develop
   ```

---

## Reporting Bugs

### Before Submitting a Bug Report

- Check existing issues to avoid duplicates
- Verify the bug in the latest version
- Collect relevant information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen

**Screenshots**
Add screenshots if applicable

**Environment:**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome 96]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

---

## Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives you've considered**
Other solutions you've thought about

**Additional context**
Mockups, examples, or references

**Priority**
How important is this feature?
- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Critical
```

---

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Discord**: Real-time chat (link in README)
- **Email**: contact@example.com

### Getting Help

- Check the [documentation](./README.md)
- Search existing issues and discussions
- Ask in Discord or GitHub Discussions
- Be respectful and patient

### Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the about section

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing! 🎉**

Your efforts help make this project better for everyone in the academic community.
