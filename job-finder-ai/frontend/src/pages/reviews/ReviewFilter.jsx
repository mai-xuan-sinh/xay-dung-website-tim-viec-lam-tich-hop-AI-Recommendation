import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ReviewFilter = ({ industries, selectedIndustry, onIndustryChange, searchTerm, onSearchChange, sortBy, onSortChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'rating_desc', label: 'Đánh giá cao nhất' },
    { value: 'rating_asc', label: 'Đánh giá thấp nhất' },
    { value: 'reviews_desc', label: 'Nhiều đánh giá nhất' },
    { value: 'name_asc', label: 'Tên A-Z' },
    { value: 'name_desc', label: 'Tên Z-A' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm công ty..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <FunnelIcon className="h-5 w-5" />
            <span>Lọc</span>
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Lĩnh vực:</span>
            <button
              onClick={() => onIndustryChange('all')}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedIndustry === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả
            </button>
            {industries.map(industry => (
              <button
                key={industry.id}
                onClick={() => onIndustryChange(industry.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center space-x-1 ${
                  selectedIndustry === industry.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{industry.icon}</span>
                <span>{industry.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewFilter;