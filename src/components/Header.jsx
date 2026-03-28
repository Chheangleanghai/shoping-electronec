"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import logo from '../asset/img/logo.png'

export default function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart(); //  get cart count from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (token && storedUser) {
      storedUser.role = Number(storedUser.role);
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full bg-white text-black shadow-sm fixed top-0 left-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 ">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight hover:text-gray-700 transition-colors"
        >
          <img className="w-[70px] bg-slate-500" src={logo} alt="" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative hover:text-black font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-black hover:text-gray-700">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="hover:text-black font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-black text-white px-5 py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                <span>{user.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {user.role === 1 && (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block px-6 py-3 text-black hover:bg-gray-100 font-medium"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-3 text-black hover:bg-gray-100 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 text-center"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {user.role === 1 && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-3 text-black hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-6 py-3 text-black hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
