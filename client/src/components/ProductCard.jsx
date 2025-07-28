import { Edit, Trash2 } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete }) {
  const getStatusColor = (stock) => {
    if (stock === 0) return "bg-red-100 text-red-800";
    if (stock < 15) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getStatusText = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 15) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <div className="aspect-w-16 aspect-h-12 bg-gray-100 rounded-t-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              product.stock
            )}`}
          >
            {getStatusText(product.stock)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              Rp. {product.price.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Stock</p>
            <p className="font-semibold text-gray-900">{product.stock} units</p>
          </div>
        </div>

        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(product.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
            <span className="text-sm">Edit</span>
          </button>

          <button
            onClick={() => onDelete(product.id, product.name)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}