import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';
import { STORAGE_KEYS, getFromStorage, saveToStorage } from '../utils/storage';
import { 
  ShieldAlert, 
  Lock, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Package, 
  BookOpen,
  Info
} from 'lucide-react';

export const Checkout = () => {
  const { cart, total, subtotal, shippingFee, discountAmount, couponCode, hasPhysicalItems, hasDigitalPrograms, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // If cart is empty on checkout page, navigate to cart
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'pay_later', // 'pay_later' or 'cash_on_delivery'
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    // Physical shipping address validation only if physical items present
    if (hasPhysicalItems) {
      if (!formData.address.trim()) errs.address = 'Street address is required for delivery';
      if (!formData.city.trim()) errs.city = 'City is required';
      if (!formData.state.trim()) errs.state = 'State / Region is required';
      if (!formData.pincode.trim()) {
        errs.pincode = '6-digit PIN code is required';
      } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
        errs.pincode = 'Please enter a valid 6-digit PIN code';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate unique order ID
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `PRANA-ORD-${Date.now().toString().slice(-4)}${randomDigits}`;

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        shippingAddress: hasPhysicalItems
          ? {
              address: formData.address.trim(),
              city: formData.city.trim(),
              state: formData.state.trim(),
              pincode: formData.pincode.trim(),
            }
          : null,
      },
      items: cart,
      subtotal,
      discountAmount,
      couponCode: couponCode || null,
      shippingFee,
      total,
      paymentMethod: formData.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Pay Later / Digital Invoice',
      paymentStatus: 'Pending Settlement / Invoice',
      orderStatus: 'Confirmed (Reserved)',
      notes: formData.notes.trim() || null,
      userId: currentUser ? currentUser.id : null,
    };

    // Save order in localStorage
    const existingOrders = getFromStorage(STORAGE_KEYS.ORDERS, []);
    saveToStorage(STORAGE_KEYS.ORDERS, [newOrder, ...existingOrders]);

    // Clear cart
    clearCart();

    setIsSubmitting(false);
    // Navigate to confirmation page
    navigate(`/order-confirmation/${orderId}`, { state: { order: newOrder } });
  };

  if (cart.length === 0) return null;

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cream-200">
        <div>
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-sage-800 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping Cart</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Order Checkout
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-0.5">
            Complete your order. Payment is settled via Pay Later invoice or Cash on Delivery.
          </p>
        </div>
      </div>

      {/* Customer-Facing Payment Information Box */}
      <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-sage-900 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-sage-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sage-950">
            Payment & Processing Information:
          </p>
          <p className="leading-relaxed text-sage-800">
            Online card processing is currently scheduled for an upcoming system upgrade. All orders placed today are reserved with <strong>"Pay Later / Digital Invoice"</strong> or <strong>"Cash on Delivery"</strong> for physical items. No credit card or banking PINs are required today.
          </p>
        </div>
      </div>

      {/* Main Grid: Form Left, Summary Right */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Contact Details */}
          <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-800 text-xs flex items-center justify-center font-sans">1</span>
              <span>Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-charcoal-800">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                    errors.fullName ? 'border-red-500' : 'border-cream-300'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-600">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-800">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                    errors.email ? 'border-red-500' : 'border-cream-300'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-800">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                    errors.phone ? 'border-red-500' : 'border-cream-300'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-600">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address (CONDITIONAL) */}
          {hasPhysicalItems ? (
            <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-charcoal-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-800 text-xs flex items-center justify-center font-sans">2</span>
                  <span>Physical Delivery Address</span>
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-terracotta-100 text-terracotta-800 font-semibold flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  <span>Physical items in cart</span>
                </span>
              </div>

              <p className="text-xs text-charcoal-700/80">
                Please specify your delivery address for shipping your yoga mats and props.
              </p>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal-800">
                    House / Flat / Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Flat 402, Lotus Residency, Koregaon Park"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                      errors.address ? 'border-red-500' : 'border-cream-300'
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-red-600">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-800">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Pune"
                      className={`w-full px-3 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                        errors.city ? 'border-red-500' : 'border-cream-300'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-red-600">{errors.city}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-800">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Maharashtra"
                      className={`w-full px-3 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                        errors.state ? 'border-red-500' : 'border-cream-300'
                      }`}
                    />
                    {errors.state && <p className="text-[11px] text-red-600">{errors.state}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-800">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6 digits"
                      maxLength={6}
                      className={`w-full px-3 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                        errors.pincode ? 'border-red-500' : 'border-cream-300'
                      }`}
                    />
                    {errors.pincode && <p className="text-[11px] text-red-600">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-sage-50/70 p-5 rounded-2xl border border-sage-200 text-xs text-sage-900 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-sage-700 shrink-0" />
              <div>
                <p className="font-semibold text-sage-950">Digital Delivery Only</p>
                <p className="text-sage-800">
                  Your cart contains online yoga programs. No physical shipping address is required; access will be activated immediately upon order placement.
                </p>
              </div>
            </div>
          )}

          {/* Section 3: Payment Method Selection */}
          <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-800 text-xs flex items-center justify-center font-sans">
                {hasPhysicalItems ? '3' : '2'}
              </span>
              <span>Payment Method</span>
            </h3>

            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'pay_later'
                    ? 'border-sage-600 bg-sage-50/60 shadow-xs'
                    : 'border-cream-300 hover:bg-cream-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pay_later"
                  checked={formData.paymentMethod === 'pay_later'}
                  onChange={handleChange}
                  className="mt-1 text-sage-700 focus:ring-sage-500"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-charcoal-900">
                      Pay Later / Digital Invoice
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sage-100 text-sage-800 font-semibold">
                      Instant Confirmation
                    </span>
                  </div>
                  <p className="text-charcoal-700 mt-1 leading-relaxed">
                    Zero upfront card payment required today. An invoice and payment link will be coordinated upon enrollment confirmation.
                  </p>
                </div>
              </label>

              {hasPhysicalItems && (
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cash_on_delivery'
                      ? 'border-sage-600 bg-sage-50/60 shadow-xs'
                      : 'border-cream-300 hover:bg-cream-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={handleChange}
                    className="mt-1 text-sage-700 focus:ring-sage-500"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-charcoal-900">
                        Cash on Delivery (Physical Items)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cream-200 text-charcoal-800 font-semibold">
                        Pay on Delivery
                      </span>
                    </div>
                    <p className="text-charcoal-700 mt-1 leading-relaxed">
                      Pay upon physical delivery of your yoga mat or props.
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Order Review & Confirm CTA */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white rounded-3xl p-6 border border-cream-200 shadow-lift space-y-6">
            <h3 className="font-serif text-xl font-bold text-charcoal-900 pb-3 border-b border-cream-100">
              Items in Your Order ({cart.length})
            </h3>

            {/* Item list brief */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover bg-cream-100 shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-charcoal-900 truncate">{item.title}</p>
                      <p className="text-[11px] text-charcoal-700/70">
                        Qty: {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold font-serif text-charcoal-900 shrink-0">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-cream-200 space-y-2 text-xs text-charcoal-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-terracotta-600 font-medium">
                  <span>Coupon Discount ({couponCode})</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-sage-700 font-semibold">FREE</span>
                  ) : (
                    formatCurrency(shippingFee)
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-charcoal-900">Total Payable</span>
                <span className="font-serif text-2xl font-bold text-sage-900">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-semibold bg-sage-700 hover:bg-sage-800 disabled:bg-sage-400 text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Confirming Your Order...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order ({formatCurrency(total)})</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-charcoal-700/60 text-center leading-relaxed">
                By clicking place order, your order reservation is confirmed and saved to your account. No upfront card payment is processed today.
              </p>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};

export default Checkout;
