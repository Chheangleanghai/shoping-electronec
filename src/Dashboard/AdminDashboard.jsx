"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2, Shield, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
const apiUrl = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState(null)
  const [newRole, setNewRole] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState("users")

  const navigate = useNavigate()

  //  Check if current user is admin
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    const fetchMe = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) throw new Error("Unauthorized")

        const data = await response.json()

        if (data.role !== 1 && data.role !== "admin") {
          alert("Access denied! Only admins can access the dashboard.")
          navigate("/")
          return
        }

        setCurrentUser(data)
        fetchUsers()
      } catch (error) {
        console.error("Error checking user role:", error)
        navigate("/login")
      }
    }

    fetchMe()
  }, [navigate])

  //  Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const response = await fetch(`${apiUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  //  Start editing role
  const handleEditRole = (user) => {
  setEditingUser(user)
  setNewRole(user.role === 1 ? "1" : "0") // <-- use string "1" or "0"
}


  //  Save updated role
 const handleSaveRole = async () => {
  if (!editingUser) return
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${apiUrl}/api/users/${editingUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: parseInt(newRole) }), // ensure number
    })

    if (!response.ok) throw new Error("Failed to update role")

    const data = await response.json()

    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? { ...u, role: data.user.role } : u))
    )

    setEditingUser(null)
    alert("Role updated successfully!")
  } catch (error) {
    console.error("Error updating role:", error)
    alert("Failed to update role. Please try again.")
  }
}

  //  Delete user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${apiUrl}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to delete user")

      setUsers(users.filter((u) => u.id !== id))
      alert("🗑️ User deleted successfully.")
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  //  Tabs navigation
  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if (tab === "products") navigate("/productdashboard")
    else if (tab === "padiusers") navigate("/paidusersdashboard")
    else if (tab === "/") navigate("/")
    else navigate("/admin/users")
  }

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-700">Manage users and products efficiently</p>
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

        {/* Content */}
        {activeTab === "users" && (
          <>
            {loading ? (
              <div className="text-center py-20 text-gray-600">Loading users...</div>
            ) : (
              <div className="overflow-x-auto border border-gray-300 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Role</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium">{user.id}</td>
                        <td className="px-6 py-4 flex items-center gap-3">
                          <User size={18} className="text-gray-600" />
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{user.email}</td>
                        <td className="px-6 py-4">
                          {editingUser?.id === user.id ? (
                            <select
                              value={newRole}
                              onChange={(e) => setNewRole(e.target.value)}
                              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                            >
                              <option value="0">User</option>
                              <option value="1">Admin</option>
                            </select>
                          ) : (
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.role === "admin" || user.role === 1
                                  ? "bg-black text-white"
                                  : "bg-gray-200 text-black"
                              }`}
                            >
                              {user.role === 1 ? "admin" : "user"}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right space-x-3">
                          {editingUser?.id === user.id ? (
                            <button
                              onClick={handleSaveRole}
                              className="px-3 py-1 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditRole(user)}
                              className="text-black hover:text-gray-700"
                            >
                              <Pencil size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
