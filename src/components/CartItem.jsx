import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, BookOpen, Package } from 'lucide-react';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const isDigital = item.type === 'program';

  const detailUrl = isDigital ? `/programs/${item.id}` : `/shop/${item.id}`;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-cream-200 shadow-sm transition-all hover:border-cream-300">
      
      {/* Left: Thumbnail & Details */}
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-cream-100 border border-cream-200">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 left-1">
            {isDigital ? (
              <span className="p-1 rounded bg-sage-800 text-cream-50 flex items-center justify-center shadow-xs" title="Digital Program">
                <BookOpen className="w-3 h-3" />
              </span>
            ) : (
              <span className="p-1 rounded bg-terracotta-600 text-white flex items-center justify-center shadow-xs" title="Physical Shop Item">
                <Package className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-700/60">
              {item.category}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-cream-100 text-charcoal-700">
              {isDigital ? 'Online Program' : 'Physical Prop'}
            </span>
          </div>

          <h4 className="font-serif text-sm sm:text-base font-bold text-charcoal-900 hover:text-sage-700 transition-colors truncate">
            <Link to={detailUrl}>
              {item.title}
            </Link>
          </h4>

          <div className="text-xs text-charcoal-700 mt-0.5">
            Unit Price: <span className="font-semibold text-charcoal-900">{formatCurrency(item.price)}</span>
          </div>
        </div>
      </div>

      {/* Right: Quantity Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-100">
        
        {/* Quantity Stepper */}
        {isDigital ? (
          <div className="px-3 py-1.5 rounded-lg bg-cream-100 text-xs font-semibold text-sage-800 border border-cream-200">
            1 User License
          </div>
        ) : (
          <div className="flex items-center border border-cream-300 rounded-lg bg-cream-50 overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 text-charcoal-700 hover:bg-cream-200 transition-colors focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-charcoal-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 text-charcoal-700 hover:bg-cream-200 transition-colors focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Item Total */}
        <div className="text-right min-w-[70px]">
          <span className="text-sm sm:text-base font-bold font-serif text-charcoal-900">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1.5 text-charcoal-700/60 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          aria-label={`Remove ${item.title} from cart`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default CartItem;
