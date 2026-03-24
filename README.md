# Task Management System

A full-stack Task Tracker web app built with React, Node.js, Express, and MongoDB.

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

## Deployment on Vercel

### Step 1: Set up MongoDB Atlas (free cloud database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a free cluster (M0 tier)
3. Go to **Database Access** → Add a database user with a password
4. Go to **Network Access** → Click **Allow Access from Anywhere** (0.0.0.0/0)
5. Go to **Database** → Click **Connect** → Choose **Drivers** → Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager`

### Step 2: Push to GitHub

Create two separate GitHub repositories (or one monorepo):

```bash
# Option A: Two separate repos (recommended for Vercel)

# Backend repo
cd backend
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tasktracker-backend.git
git push -u origin main

# Frontend repo
cd ../frontend
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tasktracker-frontend.git
git push -u origin main
```

### Step 3: Deploy Backend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your **backend** repository
4. In **Settings**, set the **Root Directory** to `.` (or `backend` if monorepo)
5. Add these **Environment Variables**:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a strong random secret string
6. Click **Deploy**
7. After deployment, copy the backend URL (e.g., `https://tasktracker-backend.vercel.app`)

### Step 4: Deploy Frontend on Vercel

1. Click **Add New → Project** again
2. Import your **frontend** repository
3. Framework Preset should auto-detect as **Create React App**
4. Add this **Environment Variable**:
   - `REACT_APP_API_URL` = `https://tasktracker-backend.vercel.app/api`
   (use your actual backend URL from Step 3)
5. Click **Deploy**

### Step 5: Update Backend CORS (important)

After deploying the frontend, update `backend/server.js` to allow your frontend domain:

```js
app.use(cors({
  origin: "https://tasktracker-frontend.vercel.app"
}));
```

Then push and redeploy the backend.

Your app is now live!
