  // "use client";

  // import { useEffect, useState } from "react";
  // import { Pencil, Trash2, PlusCircle, Eye, Shield } from "lucide-react";
  // import { useNavigate } from "react-router-dom";

  // export default function ProductDashboard() {
  //   const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [modalOpen, setModalOpen] = useState(false);
  //   const [editingProduct, setEditingProduct] = useState(null);
  //   const [detailProduct, setDetailProduct] = useState(null);
  //   const navigate = useNavigate();

  //   const emptyForm = {
  //     name: "",
  //     category: "",
  //     price: "",
  //     original_price: "",
  //     description: "",
  //     features: [],
  //     rating: "",
  //     reviews: "",
  //     qty: "",
  //     brand: "",
  //     in_stock: true,
  //     images: [],
  //   };

  //   const [form, setForm] = useState(emptyForm);

  //   //  Fetch products
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) return navigate("/login");

  //     const fetchMe = async () => {
  //       try {
  //         const res = await fetch("http://127.0.0.1:8000/api/me", {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         if (!res.ok) throw new Error("Unauthorized");
  //         const data = await res.json();
  //         if (data.role !== 1 && data.role !== "admin") {
  //           alert("Access denied!");
  //           navigate("/");
  //         }
  //       } catch {
  //         navigate("/login");
  //       }
  //     };

  //     const fetchProducts = async () => {
  //       try {
  //         setLoading(true);
  //         const res = await fetch("http://127.0.0.1:8000/api/products", {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         const data = await res.json();
  //         setProducts(
  //           data.map((p) => ({
  //             ...p,
  //             features: Array.isArray(p.features)
  //               ? p.features
  //               : JSON.parse(p.features || "[]"),
  //             images: Array.isArray(p.images)
  //               ? p.images
  //               : JSON.parse(p.images || "[]"),
  //           }))
  //         );
  //       } catch (err) {
  //         console.error("Fetch error:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchMe();
  //     fetchProducts();
  //   }, [navigate]);

  //   //  Open modal
  //   const openModal = (product = null) => {
  //     if (product) {
  //       setEditingProduct(product);
  //       setForm({
  //         ...product,
  //         features: Array.isArray(product.features)
  //           ? product.features
  //           : JSON.parse(product.features || "[]"),
  //         images: Array.isArray(product.images)
  //           ? product.images
  //           : JSON.parse(product.images || "[]"),
  //       });
  //     } else {
  //       setEditingProduct(null);
  //       setForm(emptyForm);
  //     }
  //     setModalOpen(true);
  //   };

  //   //  Handle input
  //   const handleChange = (e) => {
  //     const { name, value, files, type, checked } = e.target;
  //     if (name === "images") {
  //       const newFiles = Array.from(files).slice(0, 4);
  //       setForm((prev) => ({
  //         ...prev,
  //         images: [
  //           ...prev.images.filter((img) => typeof img === "string"),
  //           ...newFiles,
  //         ].slice(0, 4), // limit 4
  //       }));
  //     } else if (name === "features") {
  //       setForm((prev) => ({ ...prev, features: value.split(",") }));
  //     } else if (type === "checkbox") {
  //       setForm((prev) => ({ ...prev, in_stock: checked }));
  //     } else {
  //       setForm((prev) => ({ ...prev, [name]: value }));
  //     }
  //   };

  //   //  Save product (add or edit)
  //   const handleSave = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const formData = new FormData();

  //       // Normal fields
  //       Object.keys(form).forEach((key) => {
  //         if (key === "images" || key === "features") return;
  //         formData.append(key, form[key]);
  //       });

  //       // Features
  //       form.features.forEach((f) => formData.append("features[]", f));

  //       // Keep old images
  //       form.images
  //         .filter((img) => typeof img === "string")
  //         .forEach((img) => formData.append("old_images[]", img));

  //       // New image files
  //       form.images
  //         .filter((img) => img instanceof File)
  //         .forEach((file) => formData.append("images[]", file));

  //       let url = "http://127.0.0.1:8000/api/products";
  //       let method = "POST";

  //       if (editingProduct) {
  //         url = `http://127.0.0.1:8000/api/products/${editingProduct.id}`;
  //         method = "POST"; // Laravel accepts POST with _method override
  //         formData.append("_method", "POST");
  //       }

  //       const res = await fetch(url, {
  //         method,
  //         headers: { Authorization: `Bearer ${token}` },
  //         body: formData,
  //       });

  //       const data = await res.json();
  //       if (!res.ok) throw new Error(data.message || "Save failed");

  //       const updated = {
  //         ...data,
  //         features: Array.isArray(data.features)
  //           ? data.features
  //           : JSON.parse(data.features || "[]"),
  //         images: Array.isArray(data.images)
  //           ? data.images
  //           : JSON.parse(data.images || "[]"),
  //       };

  //       if (editingProduct) {
  //         setProducts((prev) =>
  //           prev.map((p) => (p.id === editingProduct.id ? updated : p))
  //         );
  //       } else {
  //         setProducts((prev) => [...prev, updated]);
  //       }

  //       setModalOpen(false);
  //       setEditingProduct(null);
  //       setForm(emptyForm);
  //     } catch (err) {
  //       console.error(err);
  //       alert(err.message);
  //     }
  //   };

  //   //  Delete
  //   const handleDelete = async (id) => {
  //     if (!confirm("Delete this product?")) return;
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
  //         method: "DELETE",
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       if (!res.ok) throw new Error("Delete failed");
  //       setProducts((prev) => prev.filter((p) => p.id !== id));
  //     } catch (err) {
  //       console.error(err);
  //       alert(err.message);
  //     }
  //   };

  //   //  Remove image
  //   const handleRemoveImage = (idx) => {
  //     setForm((prev) => ({
  //       ...prev,
  //       images: prev.images.filter((_, i) => i !== idx),
  //     }));
  //   };

  //   return (
  //     <div className="bg-white min-h-screen mt-16 text-black">
  //       <div className="container mx-auto px-6 py-12">
  //         {/* Header */}
  //         <div className="flex items-center justify-between mb-6">
  //           <div>
  //             <h1 className="text-4xl font-bold">Admin Dashboard</h1>
  //             <p className="text-gray-700">Manage products professionally</p>
  //           </div>
  //           <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl">
  //             <Shield size={20} />
  //             <span className="font-semibold">Admin Panel</span>
  //           </div>
  //         </div>

  //         {/* Buttons */}
  //         <div className="flex justify-end mb-8">
  //           <button
  //             onClick={() => openModal()}
  //             className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
  //           >
  //             <PlusCircle size={20} /> Add Product
  //           </button>
  //         </div>

  //         {/* Table */}
  //         {loading ? (
  //           <div className="text-center py-20 text-gray-600">Loading...</div>
  //         ) : (
  //           <div className="overflow-x-auto border border-gray-300 rounded-xl">
  //             <table className="min-w-full divide-y divide-gray-200">
  //               <thead className="bg-black text-white">
  //                 <tr>
  //                   {[
  //                     "ID",
  //                     "Name",
  //                     "Category",
  //                     "Price",
  //                     "Qty",
  //                     "Brand",
  //                     "Rating",
  //                     "In Stock",
  //                     "Actions",
  //                   ].map((col) => (
  //                     <th
  //                       key={col}
  //                       className="px-6 py-3 text-left text-sm font-semibold uppercase"
  //                     >
  //                       {col}
  //                     </th>
  //                   ))}
  //                 </tr>
  //               </thead>
  //               <tbody className="bg-white divide-y divide-gray-200">
  //                 {products.map((p) => (
  //                   <tr key={p.id} className="hover:bg-gray-50 transition">
  //                     <td className="px-6 py-3">{p.id}</td>
  //                     <td className="px-6 py-3">{p.name}</td>
  //                     <td className="px-6 py-3">{p.category}</td>
  //                     <td className="px-6 py-3">${p.price}</td>
  //                     <td className="px-6 py-3">{p.qty}</td>
  //                     <td className="px-6 py-3">{p.brand}</td>
  //                     <td className="px-6 py-3">{p.rating}</td>
  //                     <td className="px-6 py-3">{p.in_stock ? "" : "❌"}</td>
  //                     <td className="px-6 py-3 flex gap-2">
  //                       <button
  //                         onClick={() => openModal(p)}
  //                         className="text-blue-600 hover:text-blue-800"
  //                       >
  //                         <Pencil size={18} />
  //                       </button>
  //                       <button
  //                         onClick={() => handleDelete(p.id)}
  //                         className="text-red-600 hover:text-red-800"
  //                       >
  //                         <Trash2 size={18} />
  //                       </button>
  //                       <button
  //                         onClick={() => setDetailProduct(p)}
  //                         className="text-green-600 hover:text-green-800"
  //                       >
  //                         <Eye size={18} />
  //                       </button>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         )}

  //         {/* Modal */}
  //         {modalOpen && (
  //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //             <div className="bg-white p-6 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto">
  //               <h2 className="text-2xl font-bold mb-4">
  //                 {editingProduct ? "Edit Product" : "Add Product"}
  //               </h2>

  //               <div className="space-y-3">
  //                 {[
  //                   { name: "name", type: "text", placeholder: "Name" },
  //                   { name: "category", type: "text", placeholder: "Category" },
  //                   { name: "price", type: "number", placeholder: "Price" },
  //                   { name: "original_price", type: "number", placeholder: "Original Price" },
  //                   { name: "qty", type: "number", placeholder: "Quantity" },
  //                   { name: "brand", type: "text", placeholder: "Brand" },
  //                   { name: "rating", type: "number", placeholder: "Rating (0-5)" },
  //                   { name: "reviews", type: "number", placeholder: "Reviews" },
  //                 ].map((f) => (
  //                   <input
  //                     key={f.name}
  //                     type={f.type}
  //                     name={f.name}
  //                     placeholder={f.placeholder}
  //                     value={form[f.name]}
  //                     onChange={handleChange}
  //                     className="w-full border px-3 py-2 rounded-lg"
  //                   />
  //                 ))}

  //                 <textarea
  //                   name="description"
  //                   placeholder="Description"
  //                   value={form.description}
  //                   onChange={handleChange}
  //                   className="w-full border px-3 py-2 rounded-lg"
  //                   rows="3"
  //                 />

  //                 <input
  //                   type="text"
  //                   name="features"
  //                   placeholder="Features (comma separated)"
  //                   value={form.features.join(",")}
  //                   onChange={handleChange}
  //                   className="w-full border px-3 py-2 rounded-lg"
  //                 />

  //                 <label className="flex items-center gap-2">
  //                   <input
  //                     type="checkbox"
  //                     name="in_stock"
  //                     checked={form.in_stock}
  //                     onChange={handleChange}
  //                   />
  //                   In Stock
  //                 </label>

  //                 <input
  //                   type="file"
  //                   multiple
  //                   name="images"
  //                   onChange={handleChange}
  //                   className="w-full"
  //                 />

  //                 <div className="flex flex-wrap gap-2 mt-2">
  //                   {form.images.map((img, idx) => {
  //                     const src =
  //                       typeof img === "string"
  //                         ? img
  //                         : URL.createObjectURL(img);
  //                     return (
  //                       <div key={idx} className="relative">
  //                         <img
  //                           src={src}
  //                           className="w-20 h-20 object-cover rounded-lg"
  //                         />
  //                         <button
  //                           onClick={() => handleRemoveImage(idx)}
  //                           className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
  //                         >
  //                           x
  //                         </button>
  //                       </div>
  //                     );
  //                   })}
  //                 </div>
  //               </div>

  //               <div className="flex justify-end mt-4 gap-2">
  //                 <button
  //                   onClick={() => setModalOpen(false)}
  //                   className="px-4 py-2 border rounded-lg"
  //                 >
  //                   Cancel
  //                 </button>
  //                 <button
  //                   onClick={handleSave}
  //                   className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
  //                 >
  //                   Save
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         )}

  //         {/* Detail */}
  //         {detailProduct && (
  //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //             <div className="bg-white p-6 rounded-xl w-[700px] max-h-[90vh] overflow-y-auto">
  //               <h2 className="text-2xl font-bold mb-4">
  //                 {detailProduct.name} Details
  //               </h2>
  //               <div className="grid grid-cols-2 gap-4">
  //                 <p><b>Category:</b> {detailProduct.category}</p>
  //                 <p><b>Price:</b> ${detailProduct.price}</p>
  //                 <p><b>Original:</b> ${detailProduct.original_price}</p>
  //                 <p><b>Qty:</b> {detailProduct.qty}</p>
  //                 <p><b>Brand:</b> {detailProduct.brand}</p>
  //                 <p><b>Rating:</b> {detailProduct.rating}</p>
  //                 <p><b>Reviews:</b> {detailProduct.reviews}</p>
  //                 <p><b>Stock:</b> {detailProduct.in_stock ? "Yes" : "No"}</p>
  //                 <p className="col-span-2"><b>Description:</b> {detailProduct.description}</p>
  //               </div>

  //               <div className="mt-4">
  //                 <b>Images:</b>
  //                 <div className="flex flex-wrap gap-2 mt-2">
  //                   {detailProduct.images.map((img, idx) => (
  //                     <img
  //                       key={idx}
  //                       src={img}
  //                       alt=""
  //                       className="w-20 h-20 object-cover rounded-lg"
  //                     />
  //                   ))}
  //                 </div>
  //               </div>

  //               <div className="flex justify-end mt-4">
  //                 <button
  //                   onClick={() => setDetailProduct(null)}
  //                   className="px-4 py-2 bg-black text-white rounded-lg"
  //                 >
  //                   Close
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }


"use client";

import { API_BASE_URL, buildApiUrl, authHeaders } from "../api";
import { useEffect, useState } from "react";
import { Pencil, Trash2, PlusCircle, Eye, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

  
  export default function ProductDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [detailProduct, setDetailProduct] = useState(null);
    const [filterCategory, setFilterCategory] = useState("all");
    const [activeTab, setActiveTab] = useState("products"); // default tab

    const navigate = useNavigate();

    const emptyForm = {
      name: "",
      category: "",
      price: "",
      original_price: "",
      description: "",
      features: [],
      rating: "",
      reviews: "",
      qty: "",
      brand: "",
      in_stock: true,
      images: [],
    };

    const [form, setForm] = useState(emptyForm);

    // Fetch products
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const fetchMe = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Unauthorized");
          const data = await res.json();
          if (data.role !== 1 && data.role !== "admin") {
            alert("Access denied!");
            navigate("/");
          }
        } catch {
          navigate("/login");
        }
      };

      const fetchProducts = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${API_BASE_URL}/products`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setProducts(
            data.map((p) => ({
              ...p,
              features: Array.isArray(p.features)
                ? p.features
                : JSON.parse(p.features || "[]"),
              images: Array.isArray(p.images)
                ? p.images
                : JSON.parse(p.images || "[]"),
            }))
          );
        } catch (err) {
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchMe();
      fetchProducts();
    }, [navigate]);

    // Open modal
    const openModal = (product = null) => {
      if (product) {
        setEditingProduct(product);
        setForm({
          ...product,
          features: Array.isArray(product.features)
            ? product.features
            : JSON.parse(product.features || "[]"),
          images: Array.isArray(product.images)
            ? product.images
            : JSON.parse(product.images || "[]"),
        });
      } else {
        setEditingProduct(null);
        setForm(emptyForm);
      }
      setModalOpen(true);
      setDetailProduct(null); // ensure only one modal open
    };

    // Handle input
    const handleChange = (e) => {
      const { name, value, files, type, checked } = e.target;
      if (name === "images") {
        const newFiles = Array.from(files).slice(0, 4);
        setForm((prev) => ({
          ...prev,
          images: [
            ...prev.images.filter((img) => typeof img === "string"),
            ...newFiles,
          ].slice(0, 4),
        }));
      } else if (name === "features") {
        setForm((prev) => ({ ...prev, features: value.split(",") }));
      } else if (type === "checkbox") {
        setForm((prev) => ({ ...prev, in_stock: checked }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    };

    // Save product
    const handleSave = async () => {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        Object.keys(form).forEach((key) => {
          if (key === "images" || key === "features") return;
          formData.append(key, form[key]);
        });

        form.features.forEach((f) => formData.append("features[]", f));

        form.images
          .filter((img) => typeof img === "string")
          .forEach((img) => formData.append("old_images[]", img));

        form.images
          .filter((img) => img instanceof File)
          .forEach((file) => formData.append("images[]", file));

        let url = `${API_BASE_URL}/products`;
        let method = "POST";

        if (editingProduct) {
          url = `${API_BASE_URL}/products/${editingProduct.id}`;
          method = "POST";
          formData.append("_method", "POST");
        }

        const res = await fetch(url, {
          method,
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Save failed");

        const updated = {
          ...data,
          features: Array.isArray(data.features)
            ? data.features
            : JSON.parse(data.features || "[]"),
          images: Array.isArray(data.images)
            ? data.images
            : JSON.parse(data.images || "[]"),
        };

        if (editingProduct) {
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? updated : p))
          );
        } else {
          setProducts((prev) => [...prev, updated]);
        }

        setModalOpen(false);
        setEditingProduct(null);
        setForm(emptyForm);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    // Delete product
    const handleDelete = async (id) => {
      if (!confirm("Delete this product?")) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Delete failed");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    // Remove image
    const handleRemoveImage = (idx) => {
      setForm((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== idx),
      }));
    };

     const handleTabClick = (tab) => {
  setActiveTab(tab)
  if (tab === "products") navigate("/productdashboard")
  else if (tab === "padiusers") navigate("/paidusersdashboard")
  else if (tab === "/") navigate("/")
  else navigate("/dashboard")
}


    // Filtered products
    const filteredProducts =
      filterCategory === "all"
        ? products
        : products.filter((p) => p.category === filterCategory);

    return (
      <div className="bg-white min-h-screen text-black">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-700">Manage products professionally</p>
            </div>
            <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl">
              <Shield size={20} />
              <span className="font-semibold">Admin Panel</span>
            </div>
          </div>
          {/* Tabs */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => handleTabClick("users")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              activeTab === "users" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => handleTabClick("products")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              activeTab === "products" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => handleTabClick("padiusers")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              activeTab === "padiusers" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            PaidUsers
          </button>
          <button
            onClick={() => handleTabClick("/")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              activeTab === "/" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            Frontend
          </button>
        </div>

          {/* Filter + Add */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Filter:</span>
              <select
                className="border rounded-lg px-3 py-2"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All</option>
                <option value="keyboard">Keyboards</option>
                <option value="laptops">Laptops</option>
                <option value="mice">Mice</option>
                <option value="mouse">Mouse</option>
              </select>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              <PlusCircle size={20} /> Add Product
            </button>
          </div>

          {/* Table */}
          {activeTab === "products" && (
            <>
            {loading ? (
            <div className="text-center py-20 text-gray-600">Loading...</div>
          ) : (
            <div className="overflow-x-auto border max-h-[450px] border-gray-300 rounded-xl relative z-0">
              <table className="min-w-full divide-y divide-gray-200  ">
                <thead className="bg-black text-white sticky top-0 z-50">
                  <tr>
                    {[
                      "ID",
                      "Name",
                      "Category",
                      "Price",
                      "Qty",
                      "Brand",
                      "Rating",
                      "In Stock",
                      "Actions",
                    ].map((col) => (
                      <th
                        key={col}
                        className="px-6 py-3 text-left text-sm font-semibold uppercase"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-3">{p.id}</td>
                      <td className="px-6  w-[350px]  line-clamp-1">{p.name}</td>
                      <td className="px-6 py-3">{p.category}</td>
                      <td className="px-6 py-3">${p.price}</td>
                      <td className="px-6 py-3">{p.qty}</td>
                      <td className="px-6 py-3">{p.brand}</td>
                      <td className="px-6 py-3">{p.rating}</td>
                      <td className="px-6 py-3">{p.in_stock ? "✅" : "❌"}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => openModal(p)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setDetailProduct(p);
                            setModalOpen(false);
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>
                <div className="space-y-3">
                  {[
                    { name: "name", type: "text", placeholder: "Name" },
                    { name: "category", type: "text", placeholder: "Category" },
                    { name: "price", type: "number", placeholder: "Price" },
                    { name: "original_price", type: "number", placeholder: "Original Price" },
                    { name: "qty", type: "number", placeholder: "Quantity" },
                    { name: "brand", type: "text", placeholder: "Brand" },
                    { name: "rating", type: "number", placeholder: "Rating (0-5)" },
                    { name: "reviews", type: "number", placeholder: "Reviews" },
                  ].map((f) => (
                    <input
                      key={f.name}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg"
                    />
                  ))}
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                    rows="3"
                  />
                  <input
                    type="text"
                    name="features"
                    placeholder="Features (comma separated)"
                    value={form.features.join(",")}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="in_stock"
                      checked={form.in_stock}
                      onChange={handleChange}
                    />
                    In Stock
                  </label>
                  <input
                    type="file"
                    multiple
                    name="images"
                    onChange={handleChange}
                    className="w-full"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.images.map((img, idx) => {
                      const src = typeof img === "string" ? img : URL.createObjectURL(img);
                      return (
                        <div key={idx} className="relative">
                          <img src={src} className="w-20 h-20 object-cover rounded-lg" />
                          <button
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            x
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Detail */}
          {detailProduct && (
            <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-auto bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-xl w-[700px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{detailProduct.name} Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <p><b>Category:</b> {detailProduct.category}</p>
                  <p><b>Price:</b> ${detailProduct.price}</p>
                  <p><b>Original:</b> ${detailProduct.original_price}</p>
                  <p><b>Qty:</b> {detailProduct.qty}</p>
                  <p><b>Brand:</b> {detailProduct.brand}</p>
                  <p><b>Rating:</b> {detailProduct.rating}</p>
                  <p><b>Reviews:</b> {detailProduct.reviews}</p>
                  <p><b>Stock:</b> {detailProduct.in_stock ? "Yes" : "No"}</p>
                  <p className="col-span-2"><b>Description:</b> {detailProduct.description}</p>
                </div>
                <div className="mt-4">
                  <b>Images:</b>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {detailProduct.images.map((img, idx) => (
                      <img key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setDetailProduct(null)}
                    className="px-4 py-2 bg-black text-white rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
            </>
          )}
          
        </div>
      </div>
    );
  }
