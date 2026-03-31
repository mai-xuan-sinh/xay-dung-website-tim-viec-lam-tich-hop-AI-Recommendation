/* Component hiển thị các category dưới dạng pills trên trang danh sách công việc, cho phép người dùng lọc công việc theo category */

import React from 'react';

const CategoryPills = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
            selectedCategory === cat.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            selectedCategory === cat.id
              ? 'bg-white/20 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {cat.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;