import { motion } from 'framer-motion';
import { Search, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Smocked Dresses' },
  { to: '/accessories', label: 'Accessories' },
  { to: '/catalog', label: 'Fabrics' },
  { to: '/faq', label: 'FAQ' },
];

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
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative font-body py-1 transition after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-primary-600 after:transition-all ${
                    isActive ? 'text-primary-600 after:w-full' : 'text-gray-700 hover:text-primary-600 after:w-0 hover:after:w-full'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
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
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `block transition font-body py-2 ${isActive ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
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
