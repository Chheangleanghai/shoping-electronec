"use client";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import slide3 from "../asset/img/slide2.jpg";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/products", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      let data = await res.json();

      // ✅ Make sure data is valid and normalize fields
      data = data.map((p) => ({
        ...p,
        price: Number(p.price || 0),
        original_price: Number(p.original_price || 0),
        rating: Number(p.rating || 0),
        category: p.category?.toLowerCase() || "other",
        images: Array.isArray(p.images)
          ? p.images
          : JSON.parse(p.images || "[]"),
      }));

      //  Only take 8 products for the homepage
      setFeaturedProducts(data.slice(0, 8));
    } catch (error) {
      console.error("Error fetching products:", error);
      setFeaturedProducts([]); // fallback if error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-black">
              Premium tech for professionals
            </h1>
            <p className="text-xl mb-8 leading-relaxed text-black">
              Discover our curated collection of high-performance keyboards,
              laptops, mice, and accessories designed for those who demand
              excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Shop Now
              </Link>
              <a
                href="#featured"
                className="px-8 py-3 bg-gray-200 text-black rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Explore Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/products?category=keyboards" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-8 hover:border-black transition-all">
              <div className="h-16 w-16 bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <svg
                  className="h-8 w-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">
                Keyboards
              </h3>
              <p className="text-sm text-black">
                Mechanical and wireless keyboards for every need
              </p>
            </div>
          </Link>

          <Link to="/products?category=laptops" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-8 hover:border-black transition-all">
              <div className="h-16 w-16 bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <svg
                  className="h-8 w-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Laptops</h3>
              <p className="text-sm text-black">
                High-performance laptops for work and play
              </p>
            </div>
          </Link>

          <Link to="/products?category=mice" className="group">
            <div className="bg-white border border-gray-300 rounded-lg p-8 hover:border-black transition-all">
              <div className="h-16 w-16 bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <svg
                  className="h-8 w-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Mice</h3>
              <p className="text-sm text-black">
                Precision mice for gaming and productivity
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section
        id="featured"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-black">
              Featured Products
            </h2>
            <p className="text-black">Handpicked items from our collection</p>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium text-black hover:text-gray-700 transition-colors"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
  <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-2xl p-12 shadow-md hover:shadow-xl transition-shadow duration-500">
    
    {/* Left Content */}
    <div className="text-center lg:text-left space-y-6">
      <h2 className="text-4xl font-bold text-black leading-tight">
        Ready to upgrade your setup?
      </h2>
      <p className="text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
        Browse our complete collection of premium tech products and find the perfect gear for your workspace.
      </p>

      <Link
        to="/products"
        className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        Browse All Products
      </Link>
    </div>

    {/* Right Image */}
    <div className="mt-10 lg:mt-0 relative flex justify-center">
      <img
        src={slide3} // 👉 put your image in /public folder
        alt="Modern workspace setup"
        className="w-full max-w-md rounded-xl shadow-lg object-cover animate-fade-slide"
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
    </div>
  </div>
</section>

    </div>
  );
}
