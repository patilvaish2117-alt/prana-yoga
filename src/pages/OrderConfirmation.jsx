import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { STORAGE_KEYS, getFromStorage } from '../utils/storage';
import { formatCurrency } from '../utils/formatCurrency';
import { 
  CheckCircle2, 
  Package, 
  BookOpen, 
  ArrowRight, 
  Home, 
  User, 
  MapPin, 
  Calendar, 
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export const OrderConfirmation = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    if (!order && id) {
      const orders = getFromStorage(STORAGE_KEYS.ORDERS, []);
      const found = orders.find((o) => o.orderId === id);
      if (found) {
        setOrder(found);
      }
    }
  }, [id, order]);

  if (!order) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900">Order Not Located</h2>
        <p className="text-sm text-charcoal-700">We could not retrieve order #{id}. It may have been cleared or placed under another account.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-xl bg-sage-700 text-white text-xs font-semibold hover:bg-sage-800"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const hasPhysical = order.items.some((i) => i.type === 'product');

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Success Badge & Title */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-sage-100 text-sage-700 flex items-center justify-center shadow-soft">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-widest font-semibold text-sage-700">
          Order Successfully Placed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
          Thank You for Your Order!
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-700 max-w-md mx-auto">
          Your order ID is <strong className="text-charcoal-900 font-mono">{order.orderId}</strong>. A confirmation has been registered to your account order history.
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-lift overflow-hidden">
        
        {/* Order Meta Header */}
        <div className="p-6 sm:p-8 bg-cream-50/80 border-b border-cream-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-charcoal-700/60 block font-medium">Order Number</span>
            <span className="font-bold text-charcoal-900 font-mono text-sm">{order.orderId}</span>
          </div>
          <div>
            <span className="text-charcoal-700/60 block font-medium">Date Placed</span>
            <span className="font-semibold text-charcoal-900">
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <div>
            <span className="text-charcoal-700/60 block font-medium">Total Amount</span>
            <span className="font-bold font-serif text-sage-900 text-sm">
              {formatCurrency(order.total)}
            </span>
          </div>
          <div>
            <span className="text-charcoal-700/60 block font-medium">Order Status</span>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sage-100 text-sage-800">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-lg font-bold text-charcoal-900">
            Order Items ({order.items.length})
          </h3>

          <div className="divide-y divide-cream-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover bg-cream-100 border border-cream-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-700/60">
                        {item.category}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-cream-100 text-charcoal-700">
                        {item.type === 'program' ? 'Digital Program' : 'Physical Prop'}
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-charcoal-900">{item.title}</h4>
                    <p className="text-xs text-charcoal-700">
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>

                <div className="text-right font-serif font-bold text-sm text-charcoal-900">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="pt-4 border-t border-cream-200 max-w-xs ml-auto space-y-2 text-xs text-charcoal-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-charcoal-900">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-terracotta-600 font-medium">
                <span>Coupon ({order.couponCode}):</span>
                <span>-{formatCurrency(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{order.shippingFee === 0 ? 'FREE' : formatCurrency(order.shippingFee)}</span>
            </div>
            <div className="pt-2 border-t border-cream-200 flex justify-between text-sm font-bold">
              <span>Total Paid / Due:</span>
              <span className="font-serif text-base text-sage-900">{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-cream-200 text-xs">
            <div className="space-y-1.5">
              <h4 className="font-serif text-sm font-bold text-charcoal-900 flex items-center gap-1.5">
                <User className="w-4 h-4 text-sage-600" />
                <span>Customer Details</span>
              </h4>
              <p className="text-charcoal-900 font-semibold">{order.customer.name}</p>
              <p className="text-charcoal-700">{order.customer.email}</p>
              <p className="text-charcoal-700">+91 {order.customer.phone}</p>
              <p className="text-charcoal-700/70 pt-1">
                Payment: <strong className="text-charcoal-900">{order.paymentMethod}</strong>
              </p>
            </div>

            {order.customer.shippingAddress && (
              <div className="space-y-1.5">
                <h4 className="font-serif text-sm font-bold text-charcoal-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-terracotta-600" />
                  <span>Delivery Destination</span>
                </h4>
                <p className="text-charcoal-900">{order.customer.shippingAddress.address}</p>
                <p className="text-charcoal-700">
                  {order.customer.shippingAddress.city}, {order.customer.shippingAddress.state} – {order.customer.shippingAddress.pincode}
                </p>
                <p className="text-sage-700 font-semibold pt-1">
                  Estimated Dispatch: 2 Business Days
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Next Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/account"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sage-700 hover:bg-sage-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <User className="w-4 h-4" />
          <span>View My Account & Orders</span>
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-charcoal-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>

    </div>
  );
};

export default OrderConfirmation;
