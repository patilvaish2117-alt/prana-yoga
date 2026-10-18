import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SHOP_PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Check, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Share2,
  CheckCircle2
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, showToast } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);

  const product = SHOP_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900">Product Not Found</h2>
        <p className="text-sm text-charcoal-700">The yoga prop or accessory you are looking for is unavailable.</p>
        <Link
          to="/shop"
          className="inline-block px-5 py-2.5 rounded-xl bg-sage-700 text-white text-xs font-semibold hover:bg-sage-800"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1200&q=80';

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-700/80 hover:text-charcoal-900 px-3 py-1.5 rounded-lg border border-cream-200 bg-white"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Big Product Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden aspect-square bg-cream-100 border border-cream-200 shadow-soft relative">
            <img
              src={imageError ? fallbackImage : product.image}
              alt={product.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <div className="absolute top-4 left-4 bg-terracotta-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                {discountPercent}% OFF
              </div>
            )}
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-cream-100/70 border border-cream-200 text-center">
            <div className="space-y-1">
              <Truck className="w-4 h-4 mx-auto text-sage-700" />
              <p className="text-[11px] font-semibold text-charcoal-900">Free Over ₹999</p>
              <p className="text-[10px] text-charcoal-700/60">Express Delivery</p>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-sage-700" />
              <p className="text-[11px] font-semibold text-charcoal-900">Eco-Friendly</p>
              <p className="text-[10px] text-charcoal-700/60">Sustainable</p>
            </div>
            <div className="space-y-1">
              <RefreshCw className="w-4 h-4 mx-auto text-sage-700" />
              <p className="text-[11px] font-semibold text-charcoal-900">14-Day Return</p>
              <p className="text-[10px] text-charcoal-700/60">Hassle-Free</p>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Actions, Specs */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-600 bg-terracotta-50 px-2.5 py-0.5 rounded-full border border-terracotta-100">
                {product.category}
              </span>
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size="md" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-serif text-3xl font-bold text-charcoal-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-charcoal-700/50 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-md">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-sage-500 animate-pulse"></span>
              <span className="text-sage-800 font-semibold">
                In Stock ({product.stockCount} items available)
              </span>
            </div>
          </div>

          <p className="text-sm text-charcoal-700 leading-relaxed border-t border-cream-200 pt-4">
            {product.fullDescription}
          </p>

          {/* Key Features List */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal-700/70">
              Key Highlights
            </h4>
            <div className="space-y-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-700">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-charcoal-800">Select Quantity:</span>
              <div className="flex items-center border border-cream-300 rounded-xl bg-cream-50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-charcoal-700 hover:bg-cream-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-charcoal-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="p-2.5 text-charcoal-700 hover:bg-cream-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                  added
                    ? 'bg-sage-100 text-sage-800 border border-sage-300'
                    : 'bg-terracotta-500 hover:bg-terracotta-600 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-sage-700" />
                    <span>Added {quantity} to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatCurrency(product.price * quantity)})</span>
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="py-3.5 px-4 rounded-xl text-sm font-semibold text-charcoal-800 bg-cream-100 hover:bg-cream-200 text-center flex items-center justify-center transition-colors"
              >
                View Shopping Cart
              </Link>
            </div>
          </div>

          {/* Technical Specifications Table */}
          {product.specs && (
            <div className="space-y-3 pt-2">
              <h4 className="font-serif text-base font-bold text-charcoal-900">
                Specifications & Craftsmanship
              </h4>
              <div className="rounded-xl border border-cream-200 overflow-hidden text-xs">
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <div
                    key={key}
                    className={`flex flex-col sm:flex-row py-2.5 px-4 gap-1 sm:gap-4 ${
                      idx % 2 === 0 ? 'bg-cream-50/70' : 'bg-white'
                    }`}
                  >
                    <span className="font-semibold text-charcoal-900 w-36 shrink-0">{key}</span>
                    <span className="text-charcoal-700">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;
