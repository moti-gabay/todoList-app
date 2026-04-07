# Todo List App

A full-stack Todo List application built with React, Vite, Tailwind CSS, and Node.js/Express. Tasks are persisted in a local JSON file.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Axios |
| Backend | Node.js, Express |
| Storage | Local JSON file (`server/data/tasks.json`) |

## Project Structure

```
todoList-app/
├── package.json          ← root scripts
├── client/               ← React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── vite.config.js
└── server/               ← Express backend
    ├── nodemon.json
    ├── data/tasks.json
    └── src/
        ├── app.js
        ├── routes/tasks.js
        ├── middleware/validateTask.js
        └── utils/fileUtils.js
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
# Install all dependencies (root + client + server)
npm install
cd client && npm install
cd ../server && npm install
```

### Running in Development

From the root directory:

```bash
npm run dev
```

This starts both servers concurrently:

| Service | URL |
|---|---|
| Frontend (Vite) | http://localhost:5173 |
| Backend (Express) | http://localhost:5000 |

Or run them separately:

```bash
npm run server   # backend with nodemon
npm run client   # frontend with Vite HMR
```

## API Reference

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all tasks |
| POST | `/` | Create a new task |
| PATCH | `/:id` | Update title or completion status |
| DELETE | `/:id` | Delete a task |

### POST `/` — Create Task

**Request body:**
```json
{ "title": "Buy groceries" }
```

**Validation:**
- `title` is required, minimum 3 characters
- Returns `400` on invalid input, `404` if task not found

**Response:**
```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "isCompleted": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Features

- Add tasks with client-side and server-side validation
- Toggle task completion with a checkbox
- Delete tasks
- Filter tasks by **All**, **Pending**, or **Completed**
- Loading spinner and empty state messages
- Persistent storage via JSON file (survives server restarts)

## Deployment

See the [Deployment Guide](#deployment-guide) below for instructions on deploying to Render or Railway.

### Required changes before deploying

**1. Update CORS in `server/src/app.js`:**
```js
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
```

**2. Update API base URL in `client/src/services/api.js`:**
```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/tasks",
});
```

**3. Create `client/.env.production`:**
```
VITE_API_URL=https://your-backend-url.com/api/tasks
```
