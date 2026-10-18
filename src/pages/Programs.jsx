import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { YOGA_PROGRAMS, PROGRAM_CATEGORIES } from '../data/programs';
import ProgramCard from '../components/ProgramCard';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

export const Programs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'rating'

  // Sync category changes to URL query param
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat });
    }
  };

  // Filtered and sorted programs
  const filteredPrograms = useMemo(() => {
    let result = [...YOGA_PROGRAMS];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.level.toLowerCase().includes(q) ||
          p.instructor.toLowerCase().includes(q)
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
          <span>Authentic Digital Curriculum</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900">
          Yoga & Meditation Programs
        </h1>
        <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
          From classical asana postures to subtle pranayama breathwork and transcendental meditation. Choose from 14 progressive courses with step-by-step guidance.
        </p>
      </div>

      {/* Search, Filter Tabs & Sort Controls */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-cream-200 shadow-soft">
        
        {/* Search bar & Sort dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-charcoal-700/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs by pose, level, breathwork..."
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
              <option value="default">Featured / Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {PROGRAM_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sage-700 text-white shadow-sm'
                    : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Header / Active Filters */}
      <div className="flex items-center justify-between text-xs text-charcoal-700 px-1">
        <span>
          Showing <strong>{filteredPrograms.length}</strong> of {YOGA_PROGRAMS.length} programs
          {selectedCategory !== 'All' && <span> in "{selectedCategory}"</span>}
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </span>

        {(selectedCategory !== 'All' || searchQuery || sortBy !== 'default') && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sage-700 hover:text-sage-900 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Programs Grid */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-cream-200 p-8 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-cream-100 flex items-center justify-center text-charcoal-700/60">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal-900">
            No matching programs found
          </h3>
          <p className="text-xs text-charcoal-700 max-w-md mx-auto">
            We couldn't find any programs matching your current filter criteria. Try searching with different terms or reset your filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-sage-700 text-white font-semibold text-xs hover:bg-sage-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};

export default Programs;
