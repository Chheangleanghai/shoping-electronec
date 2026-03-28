import { Link } from "react-router-dom"
import logo from '../asset/img/logo.png'
export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className=" rounded" />
              <span className="text-xl font-bold text-black">
                <img className="w-[70px]" src={logo} alt="" />
              </span>
            </div>
            <p className="text-sm text-black leading-relaxed">
              Premium tech products for professionals and enthusiasts.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-black">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-black hover:text-gray-700 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=keyboards" className="text-black hover:text-gray-700 transition-colors">
                  Keyboards
                </Link>
              </li>
              <li>
                <Link to="/products?category=laptops" className="text-black hover:text-gray-700 transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=mice" className="text-black hover:text-gray-700 transition-colors">
                  Mice
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-black">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-black hover:text-gray-700 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-700 transition-colors">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-700 transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-700 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-black">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-black hover:text-gray-700 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-700 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-700 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  )
}
