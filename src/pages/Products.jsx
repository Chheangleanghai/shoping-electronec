"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // ✅ Mobile category menu
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "keyboard", name: "Keyboards" },
    { id: "laptops", name: "Laptops" },
    { id: "mice", name: "Mice" },
    { id: "monitors", name: "Monitors" },
    { id: "mouse", name: "Mouses" },
    { id: "accessories", name: "Accessories" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = new URL("http://127.0.0.1:8000/api/products");

      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      let data = await res.json();

      data = data.map((p) => ({
        ...p,
        price: Number(p.price || 0),
        original_price: Number(p.original_price || 0),
        rating: Number(p.rating || 0),
        category: p.category?.toLowerCase() || "other",
        images: Array.isArray(p.images) ? p.images : JSON.parse(p.images || "[]"),
      }));

      const filteredByCategory =
        selectedCategory === "all"
          ? data
          : data.filter((p) => p.category.includes(selectedCategory.toLowerCase()));

      if (sortBy === "price-low")
        filteredByCategory.sort((a, b) => a.price - b.price);
      else if (sortBy === "price-high")
        filteredByCategory.sort((a, b) => b.price - a.price);
      else if (sortBy === "rating")
        filteredByCategory.sort((a, b) => b.rating - a.rating);

      setProducts(filteredByCategory);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams(categoryId === "all" ? {} : { category: categoryId });
    setCurrentPage(1);
    setShowMobileMenu(false); // close mobile menu after select
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white text-black min-h-screen mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10 border-b border-gray-300 pb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Products</h1>
            <p className="text-gray-600">Browse our premium tech collection</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* ✅ Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-full px-4 py-3 bg-black text-white rounded-lg font-medium"
            >
              {showMobileMenu ? "Close Filters" : "Filter Categories"}
            </button>
          </div>

          {/* ✅ Mobile Category Dropdown */}
          {showMobileMenu && (
            <div className="lg:hidden bg-white border border-gray-300 rounded-2xl p-6 shadow-sm mb-4">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategoryChange(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      selectedCategory === c.id
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ✅ Sidebar (hide on mobile) */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-300 rounded-2xl p-6 sticky top-24 shadow-sm">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategoryChange(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      selectedCategory === c.id
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 text-sm text-gray-500">
              {loading
                ? "Loading products..."
                : `${filteredProducts.length} products found`}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-300 rounded-lg overflow-hidden animate-pulse"
                  >
                    <div className="aspect-square bg-gray-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                No products found.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className="flex justify-center mt-8 gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === i + 1 ? "bg-black text-white" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
