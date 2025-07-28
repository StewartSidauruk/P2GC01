export default function StatsCards({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[
        {
          label: "Total Products",
          count: products.length,
          color: "blue",
        },
        {
          label: "In Stock",
          count: products.filter((p) => p.stock > 15).length,
          color: "green",
        },
        {
          label: "Low Stock",
          count: products.filter((p) => p.stock <= 15 && p.stock > 0).length,
          color: "yellow",
        },
        {
          label: "Out of Stock",
          count: products.filter((p) => p.stock === 0).length,
          color: "red",
        },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
              <div className={`w-6 h-6 bg-${stat.color}-600 rounded`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}