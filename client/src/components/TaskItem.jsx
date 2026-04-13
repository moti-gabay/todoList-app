import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;
    setIsDeleting(true);
    await onDelete(task._id);
  }

  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 group">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task._id, !task.isCompleted)}
        className="w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0"
      />
      <span
        className={`flex-1 text-gray-800 break-words ${
          task.isCompleted ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title}
      </span>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 disabled:opacity-30 transition text-lg leading-none"
      >
        ✕
      </button>
    </li>
  );
}
