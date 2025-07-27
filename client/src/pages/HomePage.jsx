import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../configs/firebase";
import { useNavigate } from "react-router";
import { collection, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import ProductControls from "../components/ProductControls";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function getProducts() {
      const querySnapshot = await getDocs(collection(db, "products"));
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(result);
    }
    getProducts();
  }, []);

  const categories = [
    "all",
    "smartphone",
    "tablet",
    "wearable",
    "audio",
    "tv",
    "laptop",
  ];

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateProduct = () => console.log("Create product clicked");
  const handleEditProduct = (id) => console.log("Edit product:", id);
  const handleDeleteProduct = (id) => console.log("Delete product:", id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header handleLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Management
          </h2>
          <p className="text-gray-600">Manage Samsung products inventory</p>
        </div>
        <StatsCards products={products} />
        <ProductControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          handleCreateProduct={handleCreateProduct}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <EmptyState
            onClear={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
          />
        )}
      </main>
    </div>
  );
}