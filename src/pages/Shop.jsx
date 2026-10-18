import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SHOP_PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw, Package, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'rating'

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...SHOP_PRODUCTS];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('default');
    searchParams.delete('cat');
    setSearchParams(searchParams);
  };

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-700 text-xs font-semibold">
          <Package className="w-3.5 h-3.5" />
          <span>Mindfully Crafted Physical Props</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900">
          The Prana Yoga Storefront
        </h1>
        <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
          Elevate your daily practice with non-toxic, eco-friendly yoga mats, supportive organic buckwheat meditation cushions, and essential stretching props.
        </p>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-cream-100/70 border border-cream-200 text-xs text-charcoal-800">
        <div className="flex items-center gap-2.5 justify-center">
          <Truck className="w-4 h-4 text-sage-700" />
          <span>Free Standard Shipping on physical orders over ₹999</span>
        </div>
        <div className="flex items-center gap-2.5 justify-center">
          <ShieldCheck className="w-4 h-4 text-sage-700" />
          <span>100% Eco-friendly, non-toxic materials</span>
        </div>
        <div className="flex items-center gap-2.5 justify-center">
          <RefreshCw className="w-4 h-4 text-sage-700" />
          <span>Hassle-free 14-day replacement guarantee</span>
        </div>
      </div>

      {/* Search, Filter Pills & Sort Controls */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-cream-200 shadow-soft">
        
        {/* Search bar & Sort dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-charcoal-700/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products: mat, block, cushion, bottle..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-charcoal-900 placeholder-charcoal-700/50 focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-700/60 hover:text-charcoal-900"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs font-medium text-charcoal-700 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500"
            >
              <option value="default">Featured / Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Active filters note */}
      <div className="flex items-center justify-between text-xs text-charcoal-700 px-1">
        <span>
          Showing <strong>{filteredProducts.length}</strong> of {SHOP_PRODUCTS.length} products
          {selectedCategory !== 'All' && <span> in "{selectedCategory}"</span>}
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </span>

        {(selectedCategory !== 'All' || searchQuery || sortBy !== 'default') && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-terracotta-600 hover:text-terracotta-700 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-cream-200 p-8 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-cream-100 flex items-center justify-center text-charcoal-700/60">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal-900">
            No matching products found
          </h3>
          <p className="text-xs text-charcoal-700 max-w-md mx-auto">
            We couldn't find any products in our catalog matching your query. Try searching for "mat", "strap", or "cushion".
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-terracotta-500 text-white font-semibold text-xs hover:bg-terracotta-600 transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      )}

    </div>
  );
};

export default Shop;
