import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import CartItem from '../components/CartItem';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  X 
} from 'lucide-react';

export const Cart = () => {
  const { 
    cart, 
    cartCount, 
    subtotal, 
    total, 
    discountAmount, 
    shippingFee, 
    couponCode, 
    couponDiscountPercent,
    applyCoupon, 
    removeCoupon, 
    clearCart,
    hasPhysicalItems
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCoupon('');
    }
  };

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-cream-100 border border-cream-200 flex items-center justify-center text-charcoal-700/60 shadow-soft">
          <ShoppingBag className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900">Your Cart is Peaceful & Empty</h2>
          <p className="text-sm text-charcoal-700 leading-relaxed">
            You haven't added any yoga programs or physical sanctuary essentials yet. Explore our mindful offerings to get started.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/programs"
            className="px-6 py-3 rounded-xl bg-sage-700 hover:bg-sage-800 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            Explore Yoga Programs
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-charcoal-800 text-sm font-semibold transition-colors"
          >
            Shop Yoga Props
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title & Clear Cart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-1">
            Review your selected digital programs and physical yoga essentials ({cartCount} {cartCount === 1 ? 'item' : 'items'}).
          </p>
        </div>

        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-700/70 hover:text-red-600 transition-colors self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear entire cart</span>
        </button>
      </div>

      {/* Grid: Cart Items List Left, Order Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: List of items */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-3">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Continue Shopping Link */}
          <div className="pt-4 flex items-center justify-between">
            <Link
              to="/programs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-800 hover:text-sage-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue browsing programs</span>
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-600 hover:text-terracotta-700"
            >
              <span>Browse yoga props</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl p-6 border border-cream-200 shadow-lift space-y-6">
            <h3 className="font-serif text-xl font-bold text-charcoal-900 pb-3 border-b border-cream-100">
              Order Summary
            </h3>

            {/* Calculations breakdown */}
            <div className="space-y-3 text-sm text-charcoal-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-terracotta-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon ({couponCode} - {couponDiscountPercent}%)</span>
                  </span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              {hasPhysicalItems ? (
                <div className="flex justify-between">
                  <span>Physical Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-sage-700 font-semibold">FREE (Over ₹999)</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between text-xs text-charcoal-700/70">
                  <span>Delivery (Digital only)</span>
                  <span className="text-sage-700 font-semibold">Instant Access</span>
                </div>
              )}

              <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
                <span className="font-serif text-lg font-bold text-charcoal-900">Total Amount</span>
                <span className="font-serif text-2xl font-bold text-sage-900">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2 border-t border-cream-100 space-y-2">
              <label className="text-xs font-semibold text-charcoal-800 block">
                Have a Promo Code?
              </label>

              {couponCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-sage-900">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-sage-700" />
                    <span>{couponCode} applied (-{couponDiscountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-charcoal-700/60 hover:text-charcoal-900"
                    title="Remove coupon"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. PRANA10"
                      className="flex-1 px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs uppercase font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-charcoal-800 hover:bg-charcoal-900 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600 pl-1">{couponError}</p>
                  )}
                  <p className="text-[10px] text-charcoal-700/60 pl-1">
                    Try promo codes: <strong>PRANA10</strong> (10% off) or <strong>PEACE20</strong> (20% off)
                  </p>
                </form>
              )}
            </div>

            {/* Checkout CTA */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 rounded-xl text-sm font-semibold bg-sage-700 hover:bg-sage-800 text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-charcoal-700/60 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                <span>Safe order reservation • No advance card payment required</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;
