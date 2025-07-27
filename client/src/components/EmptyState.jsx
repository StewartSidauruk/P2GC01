import { Search } from "lucide-react";

export default function EmptyState({ onClear }) {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your search or filter criteria
      </p>
      <button
        onClick={onClear}
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        Clear filters
      </button>
    </div>
  );
}