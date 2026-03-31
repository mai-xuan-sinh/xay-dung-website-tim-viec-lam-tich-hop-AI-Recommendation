import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Danh sách quận/huyện Đà Nẵng
const districts = [
  { value: '', label: 'Tất cả Đà Nẵng' },
  { value: 'Hải Châu', label: 'Quận Hải Châu' },
  { value: 'Thanh Khê', label: 'Quận Thanh Khê' },
  { value: 'Sơn Trà', label: 'Quận Sơn Trà' },
  { value: 'Ngũ Hành Sơn', label: 'Quận Ngũ Hành Sơn' },
  { value: 'Liên Chiểu', label: 'Quận Liên Chiểu' },
  { value: 'Cẩm Lệ', label: 'Quận Cẩm Lệ' },
  { value: 'Hòa Vang', label: 'Huyện Hòa Vang' },
];

const JobFilter = ({ searchTerm, setSearchTerm, locationFilter, setLocationFilter, onFilterToggle }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
    if (onFilterToggle) onFilterToggle(!showFilters);
  };

  // Gợi ý tìm kiếm phổ biến
  const searchSuggestions = [
    { label: 'React', query: 'React' },
    { label: 'Node.js', query: 'Node.js' },
    { label: 'Frontend', query: 'Frontend' },
    { label: 'Backend', query: 'Backend' },
    { label: 'Python', query: 'Python' },
    { label: 'Java', query: 'Java' },
    { label: 'Nhân viên bán hàng', query: 'bán hàng' },
    { label: 'Lễ tân', query: 'lễ tân' },
    { label: 'Kỹ sư', query: 'kỹ sư' },
    { label: 'Thợ xây', query: 'thợ xây' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên công việc, công ty, kỹ năng, ngành nghề..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1 relative">
          <MapPinIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 appearance-none bg-white cursor-pointer"
          >
            {districts.map((district) => (
              <option key={district.value} value={district.value}>
                {district.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleFilterToggle}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FunnelIcon className="h-5 w-5" />
          <span>Bộ lọc</span>
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Gợi ý tìm kiếm */}
      {searchTerm === '' && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400">Gợi ý:</span>
          {searchSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setSearchTerm(suggestion.query)}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      )}

      {/* Expandable Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-slideDown">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select className="p-2 border rounded-lg">
              <option>Kinh nghiệm</option>
              <option>0-1 năm</option>
              <option>1-3 năm</option>
              <option>3-5 năm</option>
              <option>5+ năm</option>
            </select>
            <select className="p-2 border rounded-lg">
              <option>Mức lương</option>
              <option>Dưới 10M</option>
              <option>10-15M</option>
              <option>15-20M</option>
              <option>20-30M</option>
              <option>Trên 30M</option>
            </select>
            <select className="p-2 border rounded-lg">
              <option>Loại hình</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
            </select>
            <select className="p-2 border rounded-lg">
              <option>Sắp xếp</option>
              <option>Mới nhất</option>
              <option>Lương cao nhất</option>
              <option>Phù hợp nhất</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilter;