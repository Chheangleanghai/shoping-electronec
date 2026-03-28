"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);
const apiUrl = import.meta.env.VITE_API_URL;
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();

      // Ensure numeric values and images array
      setProduct({
        ...data,
        price: Number(data.price || 0),
        original_price: Number(data.original_price || 0),
        rating: Number(data.rating || 0),
        qty: Number(data.qty || 0),
        images: Array.isArray(data.images) ? data.images : JSON.parse(data.images || "[]"),
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product && product.qty > 0) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-6 bg-gray-100 rounded w-1/2" />
            <div className="h-24 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Product not found</h2>
        <Link to="/products" className="text-black hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const discount = product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-black mt-16 ">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-black">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:px-32 ">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 border border-gray-300">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-black" : "border-gray-200"}`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <h1 className="text-4xl font-bold mb-4 text-black">{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-500" : "fill-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
              </div>
              {product.reviews && <span className="text-sm text-gray-500">({product.reviews} reviews)</span>}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
            {discount > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.original_price.toFixed(2)}</span>
                <span className="px-3 py-1 bg-black text-white rounded-full text-sm font-semibold">Save {discount}%</span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.qty > 0 ? (
              <p className="text-sm text-green-500">In stock ({product.qty} available)</p>
            ) : (
              <p className="text-sm text-red-500">Out of stock</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-semibold mb-2 text-black">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-black">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="h-5 w-5 text-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart */}
          {/* Add to Cart */}
<div className="flex gap-4">
  <div className="flex items-center border border-gray-300 rounded-lg">
    <button
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="px-4 py-3 hover:bg-gray-100 transition-colors"
      disabled={product.qty === 0}
    >
      -
    </button>
    <span className="px-6 py-3 border-x border-gray-300">{quantity}</span>
    <button
      onClick={() => setQuantity(Math.min(product.qty, quantity + 1))}
      className="px-4 py-3 hover:bg-gray-100 transition-colors"
      disabled={product.qty === 0}
    >
      +
    </button>
  </div>
  <button
    onClick={handleAddToCart} // <-- THIS BUTTON ADDS TO CART
    disabled={product.qty === 0}
    className="flex-1 px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {addedToCart ? "Added to Cart!" : "Add to Cart"}
  </button>
</div>

        </div>
      </div>
    </div>
  );
}
