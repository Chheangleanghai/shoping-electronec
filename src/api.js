// Centralized API URL configuration for frontend app
// Prefer VITE_API_URL from .env.production or Vercel/CI env at build time.
// Fallback matches the deployed Laravel API on Render when the env var is missing.

const DEFAULT_DEV_URL = "http://localhost:8000";
const PRODUCTION_API_FALLBACK = "https://shoping-electronec.onrender.com";

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const resolvedUrl =
  rawApiUrl ||
  (import.meta.env.PROD ? PRODUCTION_API_FALLBACK : DEFAULT_DEV_URL);

export const API_URL = resolvedUrl.replace(/\/$/, "");
export const API_BASE_URL = `${API_URL}/api`;

export function buildApiUrl(path = "") {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${safePath}`;
}

export function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
