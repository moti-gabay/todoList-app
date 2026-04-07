import axios from "axios";

const serverBase = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/tasks`
  : "/api/tasks";

const api = axios.create({
  baseURL: serverBase,
  headers: { "Content-Type": "application/json" },
});

export const fetchTasks = () => api.get("/").then((res) => res.data);

export const createTask = (title) =>
  api.post("/", { title }).then((res) => res.data);

export const toggleTask = (id, isCompleted) =>
  api.patch(`/${id}`, { isCompleted }).then((res) => res.data);

export const deleteTask = (id) =>
  api.delete(`/${id}`).then((res) => res.data);
