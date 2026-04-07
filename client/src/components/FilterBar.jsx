export const FILTERS = ["All", "Pending", "Completed"];

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 mb-5">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            activeFilter === filter
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
