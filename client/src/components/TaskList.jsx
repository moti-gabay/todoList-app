import TaskItem from "./TaskItem";

export default function TaskList({ tasks, isLoading, activeFilter, onToggle, onDelete }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    const emptyMessages = {
      All: "No tasks yet. Add one above!",
      Pending: "No pending tasks. Great job!",
      Completed: "No completed tasks yet.",
    };

    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">📋</p>
        <p>{emptyMessages[activeFilter]}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
