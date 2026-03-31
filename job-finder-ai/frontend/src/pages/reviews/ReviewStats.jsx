import React from 'react';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import RatingStars from './RatingStars';

const ReviewStats = ({ stats }) => {
  const ratingDistribution = [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 8 },
    { stars: 2, percentage: 4 },
    { stars: 1, percentage: 3 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Rating */}
        <div className="text-center border-r border-gray-100">
          <div className="text-5xl font-bold text-gray-900">{stats.averageRating}</div>
          <div className="flex justify-center mt-2">
            <RatingStars rating={stats.averageRating} size="md" />
          </div>
          <div className="text-sm text-gray-500 mt-1">({stats.totalReviews} đánh giá)</div>
        </div>

        {/* Rating Distribution */}
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Phân bố đánh giá</h3>
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center w-12">
                  <span className="text-sm text-gray-600">{item.stars} sao</span>
                  <StarIconSolid className="h-3 w-3 text-yellow-400 ml-1" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-gray-500">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;