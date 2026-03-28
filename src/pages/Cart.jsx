"use client";

import { API_BASE_URL, buildApiUrl, authHeaders } from "../api";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import qrImage from "../asset/img/qr.png"; //  your QR image

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  //  Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //  Handle checkout submit
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsQRModalOpen(true);
  };

  
  //  When user clicks "I Paid"
const handlePaymentConfirm = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/orders`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    ...formData,
    cart,
    total: cartTotal,
    paid: true
  }),
});


    if (!res.ok) {
      const text = await res.text(); // <-- log raw response if error
      console.error("Server response:", text);
      throw new Error("Payment submission failed");
    }

    const data = await res.json();
    alert("Payment successful! Info sent to dashboard.");
    clearCart();
    setIsQRModalOpen(false);
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
};



  //  If cart empty
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-black">
        <div className="max-w-2xl mx-auto text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 bg-white text-black  ">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white border border-gray-300 rounded-lg p-6">
              <div className="flex gap-6">
                <img
                  src={item.images?.[0] || `/placeholder.svg`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-sm mb-3">{item.brand}</p>
                  <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-black hover:text-gray-700 transition-colors"
                  >
                    ✕
                  </button>
                  <div className="flex items-center border border-gray-300 rounded-lg mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm hover:text-gray-700 transition-colors mt-2">
            Clear cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-300 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="w-full px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3"
              onClick={() => setIsModalOpen(true)}
            >
              Proceed to Checkout
            </button>
            <Link to="/products" className="block text-center text-sm hover:text-gray-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Checkout Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md text-black">
            <h2 className="text-2xl font-bold mb-4">Checkout Form</h2>
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {["name", "email", "address", "city", "postalCode", "country"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              ))}
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Payment Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-sm text-center text-black">
            <h2 className="text-2xl font-bold mb-4">Scan to Pay</h2>

            {/*  Show your QR image */}
            <img
              src={qrImage}
              alt="QR Payment"
              className="w-48 h-48 mx-auto rounded-lg shadow-md"
            />

            <p className="mt-4 mb-4 text-gray-700">
              Scan this QR to pay ${cartTotal.toFixed(2)}. After payment, click confirm.
            </p>

            <button
              onClick={handlePaymentConfirm}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              I Paid
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
