"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { GoogleLogin } from "@react-oauth/google"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // --- Normal email/password login ---
  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST", //  must match the route
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "user@example.com",
          password: "secret",
        }),
      });

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      navigate(data.user.role === 1 ? "/dashboard" : "/")
      window.location.reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // --- Google Login ---
  const handleGoogleSuccess = async (credentialResponse) => {
    setError("")
    setLoading(true)

    try {
      const token = credentialResponse.credential

      const res = await fetch(`${apiUrl}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Google login failed")

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      navigate(data.user.role === 1 ? "/dashboard" : "/")
      window.location.reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome Bacck" subtitle="Sign in to your account">
      {/* FULL SCREEN LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
          <svg
            className="animate-spin h-12 w-12 text-white mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-white text-lg font-semibold">Please wait...</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6 relative">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-semibold transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          {!loading && (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Login Failed")}
            />
          )}
        </div>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
