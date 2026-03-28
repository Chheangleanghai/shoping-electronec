import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
import About from "./pages/About"
import Contact from "./pages/Contact"
import PaidUsersDashboard from "./Dashboard/PaidUsersDashboard"


export const Routee = () => {
  return (
    <div>
        <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About/>}></Route>
              <Route path="/contact" element={<Contact/>}></Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/dashboard"element={ <AdminRoute> <AdminDashboard /> </AdminRoute>}/>
              <Route path="/productdashboard"element={ <AdminRoute> <ProductDashboard/> </AdminRoute>}/>
              <Route path="/paidusersdashboard"element={ <AdminRoute> <PaidUsersDashboard/> </AdminRoute>}/>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
    </div>
  )
}
