// Centralized API URL configuration for frontend app
// Set VITE_API_URL in your deployment environment (Render Dashboard -> Environment -> VITE_API_URL)
// Example: https://your-backend-service.onrender.com

const DEFAULT_API_URL = "http://localhost:8000";

const rawApiUrl = import.meta.env.VITE_API_URL;
if (!rawApiUrl || rawApiUrl.trim() === "") {
  if (process.env.NODE_ENV === "production") {
    console.error(
      "VITE_API_URL is not set. production frontend will try localhost and fail.\n" +
        "Set VITE_API_URL to your backend URL (e.g. https://<your-backend>.onrender.com) in your deployment environment."
    );
  }
}

export const API_URL = (rawApiUrl || DEFAULT_API_URL).replace(/\/$/, "");
export const API_BASE_URL = `${API_URL}/api`;

export function buildApiUrl(path = "") {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${safePath}`;
}

export function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
