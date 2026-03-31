import React, { useState } from 'react';
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  UserIcon, 
  CalendarIcon,
  HandThumbUpIcon,  // Đã sửa
  FlagIcon,
  ShareIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import RatingStars from './RatingStars';

const CompanyReviewCard = ({ company, onHelpful, onReport }) => {
  const [expanded, setExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(company.helpfulCount || 0);
  const [isHelpful, setIsHelpful] = useState(false);

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount(helpfulCount + 1);
      setIsHelpful(true);
      onHelpful?.(company.id);
    }
  };

  const getIndustryColor = (industry) => {
    const colors = {
      it: 'bg-blue-100 text-blue-700',
      tourism: 'bg-green-100 text-green-700',
      business: 'bg-yellow-100 text-yellow-700',
      construction: 'bg-orange-100 text-orange-700',
      service: 'bg-purple-100 text-purple-700',
    };
    return colors[industry] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 animate-fadeIn">
      {/* Company Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100">
            <img
              src={company.logo}
              alt={company.name}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48?text=Logo';
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getIndustryColor(company.industry)}`}>
                {company.industryName}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {company.location}
              </span>
              <span className="flex items-center">
                <BriefcaseIcon className="h-4 w-4 mr-1" />
                {company.employees} nhân viên
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <RatingStars rating={company.rating} size="sm" />
                <span className="ml-2 text-sm font-semibold text-gray-900">{company.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({company.reviewCount} đánh giá)</span>
              </div>
              <div className="flex items-center">
                <HandThumbUpIcon className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-semibold text-green-600">{company.recommendRate}%</span>
                <span className="text-xs text-gray-500 ml-1">khuyến khích</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="p-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 font-bold">{company.reviewAuthor?.charAt(0) || 'A'}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="font-medium text-gray-900">{company.reviewAuthor}</span>
                <span className="text-xs text-gray-400 ml-2">{company.reviewDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <RatingStars rating={company.reviewRating} size="sm" />
              </div>
            </div>
            <p className={`text-gray-600 mt-2 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
              {company.reviewContent}
            </p>
            {company.reviewContent?.length > 200 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 flex items-center"
              >
                {expanded ? (
                  <>
                    <span>Thu gọn</span>
                    <ChevronUpIcon className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    <span>Xem thêm</span>
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Pros & Cons */}
        {(company.pros || company.cons) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
            {company.pros && (
              <div className="bg-green-50 rounded-xl p-3">
                <h4 className="text-sm font-semibold text-green-700 mb-2">Ưu điểm</h4>
                <p className="text-sm text-green-600">{company.pros}</p>
              </div>
            )}
            {company.cons && (
              <div className="bg-red-50 rounded-xl p-3">
                <h4 className="text-sm font-semibold text-red-700 mb-2">Nhược điểm</h4>
                <p className="text-sm text-red-600">{company.cons}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={handleHelpful}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              isHelpful ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <HandThumbUpIcon className="h-4 w-4" />
            <span>Hữu ích ({helpfulCount})</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ShareIcon className="h-4 w-4" />
            <span>Chia sẻ</span>
          </button>
          <button 
            onClick={() => onReport?.(company.id)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <FlagIcon className="h-4 w-4" />
            <span>Báo cáo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyReviewCard;