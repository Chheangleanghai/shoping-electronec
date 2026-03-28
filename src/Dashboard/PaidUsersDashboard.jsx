"use client";

import { useEffect, useState } from "react";
import { Shield, User, Eye, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaidUsersDashboard() {
  const [paidUsers, setPaidUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailUser, setDetailUser] = useState(null);
  const [activeTab, setActiveTab] = useState("padiusers"); // current tab
  const navigate = useNavigate();

  //  Fetch current user & paid users
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const fetchMe = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/me", {
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

   const fetchPaidUsers = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/api/orders/paid", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch paid users");
    const data = await res.json();
    setPaidUsers(data);
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    setLoading(false);
  }
};


    fetchMe();
    fetchPaidUsers();
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "users") navigate("/dashboard");
    else if (tab === "products") navigate("/productdashboard");
    else if (tab === "padiusers") navigate("/paidusersdashboard");
    else navigate("/");
  };

  return (
    <div className="bg-white min-h-screen  text-black">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">Paid Users Dashboard</h1>
            <p className="text-gray-700">List of users who completed payment via QR</p>
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

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-600">Loading...</div>
        ) : (
          <div className="overflow-x-auto border border-gray-300 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-black text-white">
                <tr>
                  {[
                    "ID",
                    "Name",
                    "Email",
                    "Address",
                    "City",
                    "Postal Code",
                    "Country",
                    "Total Paid",
                    "Purchased Items",
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
                {paidUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3">{user.id}</td>
                    <td className="px-6 py-3 flex items-center gap-2">
                      <User size={18} className="text-gray-600" />
                      {user.name}
                    </td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{user.address}</td>
                    <td className="px-6 py-3">{user.city}</td>
                    <td className="px-6 py-3">{user.postalCode}</td>
                    <td className="px-6 py-3">{user.country}</td>
                    <td className="px-6 py-3 font-bold">${user.total.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      {JSON.parse(user.cart).map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => setDetailUser(user)}
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

        {/* Detail Modal */}
        {detailUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[700px] max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{detailUser.name} Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <p><b>Email:</b> {detailUser.email}</p>
                <p><b>Address:</b> {detailUser.address}</p>
                <p><b>City:</b> {detailUser.city}</p>
                <p><b>Postal Code:</b> {detailUser.postalCode}</p>
                <p><b>Country:</b> {detailUser.country}</p>
                <p><b>Total Paid:</b> ${detailUser.total.toFixed(2)}</p>
                <p className="col-span-2"><b>Purchased Items:</b></p>
                <div className="col-span-2">
                  {JSON.parse(detailUser.cart).map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setDetailUser(null)}
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
