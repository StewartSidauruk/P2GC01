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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../redux/features/products/productSlice";
import Swal from "sweetalert2";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { products, isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const handleCreateProduct = () => navigate("/products/add");
  const handleEditProduct = (id) => navigate(`/products/edit/${id}`);
  const handleDeleteProduct = (id, productName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting "${productName}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

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
