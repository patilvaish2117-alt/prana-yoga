import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  LogOut, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, isAuthenticated, logout, loginAsDemo } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-cream-50/95 backdrop-blur-md border-b border-cream-200 transition-all">
      {/* Top Announcement Strip */}
      <div className="bg-sage-800 text-cream-100 text-xs py-1.5 px-4 text-center tracking-wide font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-terracotta-300 animate-pulse" />
          <span>Find Your Balance • Use promo code <strong>PRANA10</strong> for 10% off your first practice or order</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sage-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 shadow-sm group-hover:bg-sage-200 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 18C44 33 30 48 30 63C30 74 39 80 50 80C61 80 70 74 70 63C70 48 56 33 50 18Z" fill="#4A6C4F" />
                <path d="M50 32C41 43 24 53 22 65C20 75 29 79 38 79C47 79 50 70 50 70C50 70 53 79 62 79C71 79 80 75 78 65C76 53 59 43 50 32Z" fill="#7FA483" fillOpacity="0.85" />
                <circle cx="50" cy="62" r="4" fill="#FAF7F2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-sage-900 leading-none">
                Prana Yoga
              </span>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-700 font-semibold mt-1">
                Mind • Body • Spirit
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-sage-800 bg-sage-100/70 font-semibold'
                      : 'text-charcoal-700 hover:text-sage-800 hover:bg-cream-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Controls: Cart & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Cart Button with Count Badge */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-charcoal-800 hover:text-sage-800 hover:bg-sage-100/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Auth Controls */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sage-200 bg-white hover:bg-sage-50 transition-colors text-sm font-medium text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    <div className="w-6 h-6 rounded-full bg-sage-700 text-cream-50 flex items-center justify-center text-xs font-semibold">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-charcoal-700" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lift border border-cream-200 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2.5 border-b border-cream-200">
                        <p className="text-xs text-charcoal-700">Signed in as</p>
                        <p className="text-sm font-semibold text-charcoal-900 truncate">{currentUser.email}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal-700 hover:bg-cream-100 hover:text-sage-800 transition-colors"
                      >
                        <User className="w-4 h-4 text-sage-600" />
                        My Account & Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-1.5 text-sm font-medium text-charcoal-700 hover:text-sage-800 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-sage-700 hover:bg-sage-800 rounded-lg shadow-sm transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-charcoal-800 hover:bg-cream-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50 border-b border-cream-300 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-sage-800 bg-sage-100 font-semibold'
                      : 'text-charcoal-800 hover:bg-cream-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-cream-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-white rounded-lg border border-cream-200">
                  <p className="text-xs text-charcoal-700">Signed in as</p>
                  <p className="text-sm font-semibold text-charcoal-900">{currentUser.name}</p>
                  <p className="text-xs text-charcoal-700 truncate">{currentUser.email}</p>
                </div>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-charcoal-800 hover:bg-cream-100 rounded-lg"
                >
                  <User className="w-5 h-5 text-sage-600" />
                  My Account & Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center font-medium text-charcoal-800 border border-cream-300 rounded-lg hover:bg-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center font-medium text-white bg-sage-700 hover:bg-sage-800 rounded-lg shadow-sm transition-all"
                >
                  Create Account
                </Link>
                <button
                  onClick={() => {
                    loginAsDemo();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-xs text-center text-sage-800 hover:underline py-1"
                >
                  ⚡ Instant Sign In (Aarav Sharma)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
