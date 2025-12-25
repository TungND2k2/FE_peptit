import { motion } from 'framer-motion';
import { Search, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdminLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-display text-3xl font-bold text-primary-600"
            >
              Peptit Elegance
            </motion.div>
            <span className="text-sm text-gray-500 hidden sm:block">
              Smocked Dresses
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition font-body">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition font-body">
              Smocked Dresses
            </Link>
            <Link to="/accessories" className="text-gray-700 hover:text-primary-600 transition font-body">
              Accessories
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-primary-600 transition font-body">
              Fabrics
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary-600 transition font-body">
              Blog
            </Link>
          </nav>

          {/* WhatsApp Contact */}
          <div className="hidden lg:flex flex-col items-end pr-4 border-r-2 border-primary-600">
            <span className="text-primary-600 font-body text-sm font-semibold">Have any questions?</span>
            <a href="https://wa.me/84877336320" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary-600 transition font-body text-sm">
              <span>Free: +84 877336320</span>
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {isAdminLoggedIn && (
              <Link 
                to="/admin/dashboard" 
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-body text-sm font-semibold"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}
            <button className="p-2 hover:bg-smocked-rose rounded-full transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-smocked-rose rounded-full transition"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 space-y-3"
          >
            <Link
              to="/"
              className="block text-gray-700 hover:text-primary-600 transition font-body py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 hover:text-primary-600 transition font-body py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Smocked Dresses
            </Link>
            <Link
              to="/accessories"
              className="block text-gray-700 hover:text-primary-600 transition font-body py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </Link>
            <Link
              to="/catalog"
              className="block text-gray-700 hover:text-primary-600 transition font-body py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Fabrics
            </Link>
            <Link
              to="/blog"
              className="block text-gray-700 hover:text-primary-600 transition font-body py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            {isAdminLoggedIn && (
              <Link
                to="/admin/dashboard"
                className="block text-primary-600 hover:text-primary-700 transition font-body py-2 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;
