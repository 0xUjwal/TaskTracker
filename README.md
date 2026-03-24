# Task Management System

A full-stack Task Tracker web app built with React, Node.js, Express, and MongoDB.

**Live Demo:** [https://task-tracker-project-alpha.vercel.app](https://task-tracker-project-alpha.vercel.app)

## Features

- User signup & login with JWT authentication
- Create, read, update, delete tasks
- Mark tasks as completed
- Filter tasks by status and priority
- Search tasks by title
- Sort by due date, priority, or creation date
- Pagination on task list
- Analytics dashboard with completion stats
- Dark / Light mode toggle
- Responsive design
- Loading & error states

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB

## Setup Steps

### Prerequisites

- Node.js (v16+)
- MongoDB (running locally on port 27017 or a MongoDB Atlas URI)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here
```

Start the server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app opens at `http://localhost:3000`.

## API Endpoints

### Auth

| Method | Endpoint          | Description       |
|--------|-------------------|--------------------|
| POST   | /api/auth/signup  | Register new user  |
| POST   | /api/auth/login   | Login user         |

### Tasks (requires JWT token)

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| GET    | /api/tasks            | Get all tasks (filtered)  |
| POST   | /api/tasks            | Create a new task         |
| PUT    | /api/tasks/:id        | Update a task             |
| DELETE | /api/tasks/:id        | Delete a task             |
| GET    | /api/tasks/analytics  | Get task analytics        |

### Query Parameters for GET /api/tasks

- `status` - Filter by status (Todo, In Progress, Done)
- `priority` - Filter by priority (Low, Medium, High)
- `search` - Search by title
- `sortBy` - Sort field (createdAt, dueDate, priority)
- `order` - Sort order (asc, desc)
- `page` - Page number
- `limit` - Items per page

## Design Decisions

- **JWT Authentication:** Stateless auth using Bearer tokens stored in localStorage. Simple and works well for SPAs.
- **MongoDB Indexes:** Added compound indexes on user+status, user+priority, and user+dueDate for fast filtered queries.
- **Component Architecture:** Separated concerns into pages (Login, Signup, Dashboard) and reusable components (TaskCard, TaskForm, Analytics, Navbar).
- **Context API:** Used React Context for auth state and theme (dark mode) instead of Redux — keeps it simple for a mini project.
- **CSS Variables:** Theme switching via CSS custom properties on the body class — no library needed.
- **Global Error Middleware:** All backend errors funnel through a single Express error handler for consistent error responses.

