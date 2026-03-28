// Centralized API URL configuration for frontend app
// - VITE_API_URL from .env / Vercel is preferred at build time.
// - When the app runs on a public host (e.g. Vercel) without that env, we must not call
//   localhost — browsers block HTTPS pages from reaching loopback (CORS / Private Network).

const DEFAULT_DEV_URL = "http://localhost:8000";
const PRODUCTION_API_FALLBACK = "https://shoping-electronec.onrender.com";

function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}

function isBrowserLocalhost() {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
}

function resolveApiUrl() {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) return stripTrailingSlash(fromEnv);

  if (import.meta.env.DEV) {
    return DEFAULT_DEV_URL;
  }

  // Production bundle opened on a deployed host → use public API (never loopback).
  if (typeof window !== "undefined" && !isBrowserLocalhost()) {
    return PRODUCTION_API_FALLBACK;
  }

  // Production build without window (unlikely here) — safe default for CI/static prerender.
  if (import.meta.env.PROD && typeof window === "undefined") {
    return PRODUCTION_API_FALLBACK;
  }

  // e.g. `vite preview` on localhost against local Laravel
  return DEFAULT_DEV_URL;
}

export const API_URL = resolveApiUrl();
export const API_BASE_URL = `${API_URL}/api`;

export function buildApiUrl(path = "") {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${safePath}`;
}

export function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
