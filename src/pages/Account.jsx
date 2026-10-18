import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { STORAGE_KEYS, getFromStorage } from '../utils/storage';
import { formatCurrency } from '../utils/formatCurrency';
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  ShoppingBag, 
  BookOpen, 
  Package, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Account = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // If user is not logged in, show guest state with login & signup buttons
  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-cream-100 border border-cream-200 flex items-center justify-center text-charcoal-700/60 shadow-soft">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900">Guest Visitor Mode</h2>
          <p className="text-sm text-charcoal-700 leading-relaxed">
            You are currently browsing Prana Yoga as a guest. Log in or create an account to view your enrolled courses and order history.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-sage-700 hover:bg-sage-800 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Log In to Account
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-charcoal-800 text-xs font-semibold transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  // Retrieve orders from localStorage
  const allOrders = getFromStorage(STORAGE_KEYS.ORDERS, []);
  // Filter for this user's email or orders created during session
  const userOrders = allOrders.filter(
    (o) => !o.userId || o.userId === currentUser.id || o.customer?.email?.toLowerCase() === currentUser.email?.toLowerCase()
  );

  // Extract digital programs enrolled from orders
  const enrolledPrograms = [];
  userOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (item.type === 'program' && !enrolledPrograms.some((p) => p.id === item.id)) {
        enrolledPrograms.push(item);
      }
    });
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-lift flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-sage-700 text-cream-50 flex items-center justify-center font-serif text-2xl font-bold shadow-md shrink-0">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                Namaste, {currentUser.name}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sage-100 text-sage-800">
                {currentUser.role || 'Practitioner'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-700">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sage-600" />
                <span>{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sage-600" />
                <span>Member since {new Date(currentUser.joinedAt || Date.now()).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/programs"
          className="p-6 rounded-2xl bg-cream-100/80 border border-cream-200 hover:border-sage-300 shadow-xs hover:shadow-soft transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sage-700 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-charcoal-900">Browse Programs Catalog</h3>
              <p className="text-xs text-charcoal-700">Discover 14 guided asana & breathwork courses</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-charcoal-700/60 group-hover:translate-x-1 group-hover:text-sage-700 transition-all" />
        </Link>

        <Link
          to="/shop"
          className="p-6 rounded-2xl bg-cream-100/80 border border-cream-200 hover:border-terracotta-300 shadow-xs hover:shadow-soft transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-terracotta-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-charcoal-900">Shop Yoga Storefront</h3>
              <p className="text-xs text-charcoal-700">Eco-friendly mats, straps, and meditation cushions</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-charcoal-700/60 group-hover:translate-x-1 group-hover:text-terracotta-600 transition-all" />
        </Link>
      </div>

      {/* Digital Program Library Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-terracotta-500" />
            <span>My Enrolled Yoga Programs ({enrolledPrograms.length})</span>
          </h2>
          {enrolledPrograms.length > 0 && (
            <span className="text-xs text-sage-800 font-semibold">
              Unlimited Online Access
            </span>
          )}
        </div>

        {enrolledPrograms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledPrograms.map((prog) => (
              <div
                key={prog.id}
                className="p-4 rounded-2xl bg-white border border-cream-200 shadow-sm flex items-center gap-3"
              >
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-14 h-14 rounded-xl object-cover bg-cream-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-charcoal-700/60 block">
                    {prog.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-charcoal-900 truncate">
                    {prog.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-sage-700 font-medium mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Enrolled & Ready</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-cream-200 text-center space-y-2">
            <p className="text-xs sm:text-sm text-charcoal-700">
              You haven't enrolled in any digital programs yet.
            </p>
            <Link
              to="/programs"
              className="inline-block text-xs font-semibold text-sage-800 hover:underline"
            >
              Browse 14 Yoga Programs →
            </Link>
          </div>
        )}
      </div>

      {/* Previous Orders Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 flex items-center gap-2">
            <Package className="w-5 h-6 text-sage-600" />
            <span>Order History ({userOrders.length})</span>
          </h2>
        </div>

        {userOrders.length > 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 shadow-soft overflow-hidden">
            <div className="divide-y divide-cream-100">
              {userOrders.map((order) => (
                <div key={order.orderId} className="p-5 space-y-3 hover:bg-cream-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-charcoal-900 bg-cream-100 px-2.5 py-1 rounded-md">
                        {order.orderId}
                      </span>
                      <span className="text-xs text-charcoal-700/70">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sage-100 text-sage-800">
                        {order.orderStatus}
                      </span>
                      <span className="font-serif font-bold text-sm text-charcoal-900">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items brief */}
                  <div className="text-xs text-charcoal-700 flex flex-wrap gap-2 pt-1">
                    {order.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-cream-100/70 px-2 py-0.5 rounded text-[11px]"
                      >
                        {item.type === 'program' ? (
                          <BookOpen className="w-3 h-3 text-sage-600" />
                        ) : (
                          <Package className="w-3 h-3 text-terracotta-600" />
                        )}
                        <span>{item.title} (×{item.quantity})</span>
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-charcoal-700/60 pt-1 flex justify-between items-center">
                    <span>Payment: {order.paymentMethod}</span>
                    <Link
                      to={`/order-confirmation/${order.orderId}`}
                      className="font-semibold text-sage-800 hover:underline"
                    >
                      View Receipt →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-cream-200 text-center space-y-3">
            <p className="text-xs sm:text-sm text-charcoal-700">
              No previous orders found in your account.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/shop"
                className="px-4 py-2 rounded-xl bg-terracotta-500 text-white text-xs font-semibold hover:bg-terracotta-600"
              >
                Shop Props
              </Link>
              <Link
                to="/programs"
                className="px-4 py-2 rounded-xl bg-sage-700 text-white text-xs font-semibold hover:bg-sage-800"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Account;
