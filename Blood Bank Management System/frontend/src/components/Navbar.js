import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaDroplet } from 'react-icons/fa6';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/donate', label: 'Donate' },
    { path: '/request', label: 'Request' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blood-600 to-blood-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                <FaDroplet className="text-blood-600 text-xl" />
              </div>
              <span className="text-white font-bold text-lg hidden sm:inline">
                🩸 Blood Bank
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-white text-blood-600 shadow-md'
                    : 'text-white hover:bg-blood-700 hover:bg-opacity-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-blood-700 rounded-lg transition"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition ${
                  isActive(link.path)
                    ? 'bg-white text-blood-600'
                    : 'text-white hover:bg-blood-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
