// Centralized API URL configuration for frontend app
// Set VITE_API_URL in your deployment environment (Render Dashboard -> Environment -> VITE_API_URL)
// Example: https://your-backend-service.onrender.com

const DEFAULT_API_URL = "http://localhost:8000";

export const API_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, "");
export const API_BASE_URL = `${API_URL}/api`;

export function buildApiUrl(path = "") {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${safePath}`;
}

export function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
