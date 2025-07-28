import { useEffect, useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  editProductById,
  fetchProductById,
} from "../redux/features/products/productSlice";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export default function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("smartphone");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const categories = [
    { value: "smartphone", label: "Smartphone" },
    { value: "tablet", label: "Tablet" },
    { value: "wearable", label: "Wearable" },
    { value: "audio", label: "Audio" },
    { value: "tv", label: "TV" },
    { value: "laptop", label: "Laptop" },
  ];

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setStock(product.stock || 0);
      setCategory(product.category || "smartphone");
      setImage(product.image || "");
    }
  }, [product]);

  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const removeImage = () => {
    setImage("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price || parseFloat(price) <= 0) newErrors.price = "Valid price is required";
    if (!stock || parseInt(stock) < 0) newErrors.stock = "Valid stock quantity is required";
    if (!image) newErrors.image = "Product image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const productData = {
        id, name, description, image, category,
        price: parseFloat(price),
        stock: parseInt(stock),
      };
      dispatch(editProductById(productData));
      navigate("/");
    }
  };

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Samsung Admin</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit Product</h2>
          <p className="text-gray-600">Update Samsung product information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                  <input type="text" value={name} onChange={handleInputChange(setName, "name")} className={`w-full px-4 py-3 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`} />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea value={description} onChange={handleInputChange(setDescription, "description")} rows={4} className={`w-full px-4 py-3 border rounded-lg resize-none ${errors.description ? "border-red-500" : "border-gray-300"}`} />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rp) *</label>
                    <input type="number" value={price} onChange={handleInputChange(setPrice, "price")} className={`w-full px-4 py-3 border rounded-lg ${errors.price ? "border-red-500" : "border-gray-300"}`} />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                    <input type="number" value={stock} onChange={handleInputChange(setStock, "stock")} className={`w-full px-4 py-3 border rounded-lg ${errors.stock ? "border-red-500" : "border-gray-300"}`} />
                    {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select value={category} onChange={handleInputChange(setCategory, "category")} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
                    {categories.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
                <div className="mb-4">
                  <input
                    type="text"
                    value={image}
                    readOnly
                    placeholder="Image URL will appear here"
                    className={`w-full px-4 py-3 border rounded-lg bg-gray-50 mb-2 ${errors.image ? "border-red-500" : "border-gray-300"}`}
                  />
                  <FileUploaderRegular
                    pubkey="add784b2978230948eac"
                    onFileUploadSuccess={(result) => {
                      setImage(result.cdnUrl);
                    }}
                  />
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                </div>
                {image ? (
                  <div className="relative">
                    <img src={image} alt="Product preview" className="w-full h-64 object-cover rounded-lg border"/>
                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Upload an image to see preview</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Product</button>
          </div>
        </form>
      </main>
    </div>
  );
}