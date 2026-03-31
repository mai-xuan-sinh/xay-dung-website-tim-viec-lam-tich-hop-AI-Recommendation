import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const RatingStars = ({ rating, maxRating = 5, size = 'sm', interactive = false, onRatingChange }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  const starSize = sizeClasses[size] || sizeClasses.sm;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= maxRating; i++) {
      if (interactive) {
        stars.push(
          <button
            key={i}
            type="button"
            onClick={() => onRatingChange?.(i)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            {i <= rating ? (
              <StarIconSolid className={`${starSize} text-yellow-400`} />
            ) : (
              <StarIcon className={`${starSize} text-gray-300`} />
            )}
          </button>
        );
      } else {
        stars.push(
          <span key={i}>
            {i <= fullStars ? (
              <StarIconSolid className={`${starSize} text-yellow-400`} />
            ) : i === fullStars + 1 && hasHalfStar ? (
              <div className="relative">
                <StarIconSolid className={`${starSize} text-yellow-400 absolute overflow-hidden`} style={{ width: '50%' }} />
                <StarIcon className={`${starSize} text-gray-300`} />
              </div>
            ) : (
              <StarIcon className={`${starSize} text-gray-300`} />
            )}
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      {renderStars()}
    </div>
  );
};

export default RatingStars;