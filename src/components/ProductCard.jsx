import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import { ShoppingBag, Check, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category & Stock Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-cream-50/95 text-charcoal-800 shadow-sm backdrop-blur-sm border border-cream-200">
            {product.category}
          </span>
          {product.inStock ? (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-sage-100 text-sage-800 border border-sage-200">
              In Stock ({product.stockCount})
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-100 text-red-700">
              Currently Out of Stock
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-charcoal-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <Link
            to={`/shop/${product.id}`}
            className="pointer-events-auto p-2.5 bg-white text-charcoal-900 rounded-full shadow-md hover:bg-cream-100 hover:scale-105 transition-all"
            aria-label={`View ${product.name} details`}
          >
            <Eye className="w-4 h-4 text-charcoal-800" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center justify-between">
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
          </div>

          {/* Name */}
          <h3 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-sage-700 transition-colors line-clamp-1">
            <Link to={`/shop/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-charcoal-700/80 leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="pt-3 border-t border-cream-200 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-serif text-charcoal-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-charcoal-700/50 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-sage-700 font-semibold block">
              Inclusive of all applicable taxes
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm ${
              added
                ? 'bg-sage-100 text-sage-800 border border-sage-300'
                : !product.inStock
                ? 'bg-cream-200 text-charcoal-700/40 cursor-not-allowed'
                : 'bg-terracotta-500 hover:bg-terracotta-600 text-white'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-sage-700" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
