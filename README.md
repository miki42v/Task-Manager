# Task Management Application

A full-stack Task Management application built with Node.js/TypeScript backend and Next.js frontend.

## Features

### Backend API (Node.js + TypeScript)
- JWT Authentication with dual-token system (access + refresh)
- Password hashing with bcrypt
- User registration and login
- Task CRUD operations with user scope
- Pagination, status filtering, and search
- Input validation with Zod

### Frontend (Next.js + TypeScript)
- Login and Registration pages
- Protected Dashboard with task list
- Add/Edit/Delete tasks via modal
- Status toggle functionality
- Search and filter controls
- Toast notifications
- Responsive design

## Tech Stack

**Backend:**
- Node.js + Express.js
- TypeScript
- Prisma ORM (SQLite)
- JWT for authentication
- Zod for validation

**Frontend:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Axios

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Backend Setup
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
# Server runs on http://localhost:3001
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | Create new user |
| `/auth/login` | POST | Login and get tokens |
| `/auth/refresh` | POST | Refresh access token |
| `/auth/logout` | POST | Revoke refresh token |
| `/tasks` | GET | List tasks (paginated) |
| `/tasks` | POST | Create task |
| `/tasks/:id` | GET | Get task details |
| `/tasks/:id` | PATCH | Update task |
| `/tasks/:id/toggle` | PATCH | Toggle status |
| `/tasks/:id` | DELETE | Delete task |

## License
ISC
