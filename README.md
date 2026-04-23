# Task Management System

A full-stack **Task Management Application** built with **Node.js, Express, PostgreSQL, and React**.  
Users can create and manage their own tasks, while admins can manage users and assign tasks.

---

## Features

### User
- Register and Login
- Create Tasks
- Update Tasks
- Delete Tasks
- View tasks created by them
- View tasks assigned to them

### Admin
- View and edit all tasks in the system
- Assign tasks to users
- View all users
- Delete users

### System Features
- Secure authentication using JWT
- Password hashing using bcrypt
- Protected API routes
- Multi-user task isolation 
- Input validation on API requests
- Centralized error handling

---

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Bcrypt

### Frontend
- React (Vite)
- Tailwind CSS

---

## 🔑 API Endpoints

### Authentication

```text
POST /auth/signup
POST /auth/login
GET /auth/profile
```


### Tasks
```text
POST /tasks
GET /tasks
GET /tasks/:id
PATCH /tasks/:id
DELETE /tasks/:id
```


### Admin
```text
GET /admin/users
DELETE /admin/users/:id
GET /admin/tasks
PATCH /admin/tasks/:id/assign
```


---

## 🧑‍💻 Setup Instructions

### 1. Clone Repository
```text
git clone https://github.com/kritikaspidy/primetrade.git
cd project-folder
```

### 2. Backend Setup
```text
cd backend
npm install
npm start
```

### 3. Frontend Setup
```text
cd frontend
npm install
npm run dev
```






