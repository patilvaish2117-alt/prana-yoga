import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, size = 'sm', reviewsCount = null }) => {
  const stars = [1, 2, 3, 4, 5];
  const sizeClasses = size === 'xs' ? 'w-3 h-3' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-500">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${sizeClasses} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-500'
                : 'text-cream-300'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-charcoal-700">
        {rating.toFixed(1)}
      </span>
      {reviewsCount !== null && (
        <span className="text-xs text-charcoal-700/60 font-normal">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};

export default StarRating;
