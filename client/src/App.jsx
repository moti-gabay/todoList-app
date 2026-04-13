import { useState, useEffect, useMemo } from "react";
import { useAuth } from "./context/AuthContext";
import { fetchTasks, createTask, toggleTask, deleteTask } from "./services/api";
import AuthForm from "./components/AuthForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

export default function App() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch(() => setGlobalError("Could not load tasks. Is the server running?"))
      .finally(() => setIsLoading(false));
  }, [user]);

  const filteredTasks = useMemo(() => {
    if (activeFilter === "Pending") return tasks.filter((t) => !t.isCompleted);
    if (activeFilter === "Completed") return tasks.filter((t) => t.isCompleted);
    return tasks;
  }, [tasks, activeFilter]);

  async function handleAddTask(title) {
    const newTask = await createTask(title);
    setTasks((prev) => [...prev, newTask]);
  }

  async function handleToggleTask(id, isCompleted) {
    const updatedTask = await toggleTask(id, isCompleted);
    setTasks((prev) => prev.map((task) => (task._id === id ? updatedTask : task)));
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  }

  if (!user) return <AuthForm />;

  const pendingCount = tasks.filter((t) => !t.isCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Todo List
            </h1>
            {!isLoading && tasks.length > 0 && (
              <p className="mt-1 text-gray-500 text-sm">
                {pendingCount} task{pendingCount !== 1 ? "s" : ""} remaining
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              Hi, <span className="font-medium text-gray-700">{user.name}</span>
            </span>
            <button
              onClick={logout}
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Sign out
            </button>
          </div>
        </div>

        {globalError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {globalError}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <TaskForm onAdd={handleAddTask} />
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <TaskList
            tasks={filteredTasks}
            isLoading={isLoading}
            activeFilter={activeFilter}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}
