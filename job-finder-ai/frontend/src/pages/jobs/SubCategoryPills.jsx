/* Component hiển thị các sub-category dưới dạng pills trên trang danh sách công việc, cho phép người dùng lọc công việc theo sub-category. Màu sắc của pills có thể được tùy chỉnh thông qua prop bgColor, với các tùy chọn như blue, green, yellow, orange và purple. Khi một sub-category được chọn, nó sẽ có màu nền và màu chữ tương ứng với màu đã chọn, trong khi các sub-category khác sẽ có màu nền xám nhạt và màu chữ xám đậm. */

import React from 'react';

const SubCategoryPills = ({ subCategories, selectedSubCategory, onSelectSubCategory, bgColor = 'blue' }) => {
  if (!subCategories || subCategories.length === 0) return null;

  const getActiveBgColor = () => {
    switch (bgColor) {
      case 'blue': return 'bg-blue-100 text-blue-700';
      case 'green': return 'bg-green-100 text-green-700';
      case 'yellow': return 'bg-yellow-100 text-yellow-700';
      case 'orange': return 'bg-orange-100 text-orange-700';
      case 'purple': return 'bg-purple-100 text-purple-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6 ml-4">
      {subCategories.map((sub) => (
        <button
          key={sub.id}
          onClick={() => onSelectSubCategory(sub.id)}
          className={`px-3 py-1.5 rounded-full transition-all duration-300 text-sm flex items-center space-x-1 ${
            selectedSubCategory === sub.id
              ? getActiveBgColor()
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>{sub.icon}</span>
          <span>{sub.name}</span>
          <span className="text-xs ml-1">({sub.count})</span>
        </button>
      ))}
    </div>
  );
};

export default SubCategoryPills;