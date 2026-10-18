import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import { Clock, BarChart2, Plus, Check } from 'lucide-react';

export const ProgramCard = ({ program }) => {
  const { addToCart, cart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isInCart = cart.some((item) => item.id === program.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(program, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
        <img
          src={imageError ? fallbackImage : program.image}
          alt={program.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cream-50/95 text-sage-800 shadow-sm backdrop-blur-sm border border-cream-200">
            {program.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-charcoal-900/80 text-cream-50 backdrop-blur-sm">
            {program.level}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating & Duration */}
          <div className="flex items-center justify-between text-xs text-charcoal-700">
            <StarRating rating={program.rating} reviewsCount={program.reviewsCount} />
            <div className="flex items-center gap-1 font-medium text-sage-700">
              <Clock className="w-3.5 h-3.5" />
              <span>{program.duration.split('•')[0].trim()}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-sage-700 transition-colors line-clamp-1">
            <Link to={`/programs/${program.id}`}>
              {program.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-charcoal-700/80 leading-relaxed line-clamp-2">
            {program.shortDescription}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-cream-200 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-charcoal-700/60 block font-semibold">
              Course Fee
            </span>
            <span className="text-xl font-bold font-serif text-sage-900">
              {formatCurrency(program.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/programs/${program.id}`}
              className="px-3 py-2 text-xs font-semibold text-charcoal-700 hover:text-sage-800 bg-cream-100 hover:bg-cream-200 rounded-lg transition-colors"
            >
              Details
            </Link>
            
            <button
              onClick={handleAddToCart}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm ${
                addedAnimation || isInCart
                  ? 'bg-sage-100 text-sage-800 border border-sage-300'
                  : 'bg-sage-700 hover:bg-sage-800 text-white'
              }`}
              aria-label={`Add ${program.title} to cart`}
            >
              {addedAnimation || isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 text-sage-700" />
                  <span>In Cart</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enroll</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProgramCard;
