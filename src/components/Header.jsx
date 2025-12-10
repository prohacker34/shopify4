import { ShoppingCart, Search, Menu, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom'; // <-- Add this import

export function Header({ cartItemCount, onCartClick }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
              <span className="text-blue-600">QuickCart</span>
            </div>

            <nav className="hidden md:flex">
              <ul className="flex gap-6">
                <li>
                  <Link
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    to="/products"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    to="/categories"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    to="/about"
                  >
                    About <LinkIcon />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none ml-2 w-full"
              />
            </div>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
