import axios from "axios";

const serverBase = "http://51.21.223.143:5000";

const api = axios.create({
  baseURL: serverBase,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth ---
export const registerUser = (name, email, password) =>
  api.post("/api/auth/register", { name, email, password }).then((res) => res.data);

export const loginUser = (email, password) =>
  api.post("/api/auth/login", { email, password }).then((res) => res.data);

// --- Tasks ---
export const fetchTasks = () =>
  api.get("/api/tasks/").then((res) => res.data);

export const createTask = (title) =>
  api.post("/api/tasks/", { title }).then((res) => res.data);

export const toggleTask = (id, isCompleted) =>
  api.patch(`/api/tasks/${id}`, { isCompleted }).then((res) => res.data);

export const deleteTask = (id) =>
  api.delete(`/api/tasks/${id}`).then((res) => res.data);
