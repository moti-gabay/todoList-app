import { useState } from "react";

const MIN_TITLE_LENGTH = 3;

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmedTitle = title.trim();
  const isInputTooShort = trimmedTitle.length > 0 && trimmedTitle.length < MIN_TITLE_LENGTH;
  const isAddDisabled = trimmedTitle.length < MIN_TITLE_LENGTH || isSubmitting;

  async function handleSubmit(e) {
    e.preventDefault();
    if (isAddDisabled) return;

    setError("");
    setIsSubmitting(true);
    try {
      await onAdd(trimmedTitle);
      setTitle("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add task. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={isAddDisabled}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>

      {isInputTooShort && (
        <p className="mt-2 text-sm text-amber-600">
          Title must be at least {MIN_TITLE_LENGTH} characters.
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
