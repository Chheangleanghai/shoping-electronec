// API Configuration
export const API_BASE_URL = "YOUR_API_URL/api"

// API Endpoints
export const API_ENDPOINTS = {
  products: {
    list: `${API_BASE_URL}/products`,
    detail: (id) => `${API_BASE_URL}/products/${id}`,
  },
}

// Helper function to fetch products
export async function fetchProducts(params = {}) {
  const url = new URL(API_ENDPOINTS.products.list)
  Object.keys(params).forEach((key) => {
    if (params[key]) url.searchParams.append(key, params[key])
  })

  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch products")
  return response.json()
}

// Helper function to fetch single product
export async function fetchProduct(id) {
  const response = await fetch(API_ENDPOINTS.products.detail(id))
  if (!response.ok) throw new Error("Failed to fetch product")
  return response.json()
}
