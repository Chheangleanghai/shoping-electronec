import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Login from "./pages/login"
import Register from "./pages/Register"
import AdminDashboard from "./Dashboard/AdminDashboard"
import AdminRoute from "./Dashboard/AdminRoute"
import ProductDashboard from "./Dashboard/ProductDashboard"
import PaidUsersDashboard from "./Dashboard/PaidUsersDashboard"
import About from "./pages/About"
import Contact from "./pages/Contact"

// ✅ A wrapper component so we can use hooks like useLocation
function AppContent() {
  const location = useLocation()

  // ✅ Hide header/footer on dashboard routes
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/productdashboard") ||
    location.pathname.startsWith("/paidusersdashboard")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show header only if not dashboard */}
      {!isDashboardRoute && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/productdashboard"
            element={
              <AdminRoute>
                <ProductDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/paidusersdashboard"
            element={
              <AdminRoute>
                <PaidUsersDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      {/* Show footer only if not dashboard */}
      {!isDashboardRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  )
}

export default App
