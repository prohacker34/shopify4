import { useState, useEffect } from "react";
import { Pencil, Trash, Plus, X } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { API } from "../../config";

// Fallback icons
const PencilIcon = Pencil || (() => <span>Edit</span>);
const TrashIcon = Trash || (() => <span>Delete</span>);
const PlusIcon = Plus || (() => <span>Add</span>);
const XIcon = X || (() => <span>Close</span>);

// AdminLogin component
function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API}/auth/login`, { username, password });
      const token = res.data.token;
      if (!token) throw new Error("No token received");
      localStorage.setItem("token", token);
      onLogin(token);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-slate-900 text-white p-2 rounded hover:bg-slate-800"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default function AdminProducts() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    featured: false,
  });
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Load user from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("DECODED TOKEN:", decoded);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  // Called after login
  const handleLogin = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token on login:", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // Fetch products only if user is admin
  useEffect(() => {
    if (user?.admin_id) fetchProducts();
  }, [user]);

  const authHeaders = user
    ? {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      }
    : {};

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await axios.get(`${API}/api/products`, { headers: authHeaders });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      alert("Failed to fetch products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    if (type === "file") setFormData({ ...formData, [name]: files[0] });
    else if (type === "checkbox") setFormData({ ...formData, [name]: checked });
    else setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", category: "", image: null, featured: false });
    setEditingProduct(null);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) payload.append(key, formData[key]);
    });

    try {
      const res = await axios.post(`${API}/api/products`, payload, { headers: authHeaders });
      setProducts([...products, res.data]);
      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error("Add product failed:", err);
      alert("Failed to add product.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) payload.append(key, formData[key]);
    });

    try {
      const res = await axios.put(`${API}/api/products/${editingProduct.id}`, payload, { headers: authHeaders });
      setProducts(products.map((p) => (p.id === res.data.id ? res.data : p)));
      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error("Update product failed:", err);
      alert("Failed to update product.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API}/api/products/${id}`, { headers: authHeaders });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete product failed:", err);
      alert("Failed to delete product.");
    }
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: null,
      featured: product.featured,
    });
    setShowForm(true);
  };

  // Render login if no user
  if (!user) return <AdminLogin onLogin={handleLogin} />;

  if (loadingUser) return <p className="p-6">Loading user...</p>;
  if (!user.admin_id) return <p className="p-6">Access Denied</p>;
  if (loadingProducts) return <p className="p-6">Loading products...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => { setShowForm(true); resetForm(); }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800"
        >
          <PlusIcon className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded p-4 relative">
            {product.image && (
              <img src={`${API}${product.image}`} alt={product.name} className="h-40 w-full object-cover rounded mb-2" />
            )}
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-slate-600">${product.price}</p>
            <p className="text-slate-500 text-sm">{product.category}</p>
            {product.featured && (
              <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                Featured
              </span>
            )}
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={() => openEdit(product)} className="text-blue-500 hover:text-blue-700">
                <PencilIcon className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={editingProduct ? handleUpdate : handleAdd}
            className="bg-white p-6 rounded-lg w-full max-w-md relative"
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
              onClick={() => { setShowForm(false); resetForm(); }}
            >
              <XIcon className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              placeholder="Price"
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured on Home Page
            </label>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
