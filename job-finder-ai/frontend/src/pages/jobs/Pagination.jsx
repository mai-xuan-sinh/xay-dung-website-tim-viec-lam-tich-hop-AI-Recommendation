/* Component hiển thị phần phân trang trên trang danh sách công việc, cho phép người dùng chuyển đổi giữa các trang kết quả công việc. Bao gồm các nút để chuyển đến trang trước và trang sau, cũng như các nút số trang để nhảy trực tiếp đến một trang cụ thể. Khi có nhiều trang, sẽ hiển thị dấu "..." để chỉ ra rằng có thêm các trang ở giữa. */

import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 rounded-lg transition-all ${
            currentPage === i
              ? 'bg-blue-600 text-white shadow-md'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-10 h-10 rounded-lg hover:bg-gray-100"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-500">...</span>}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-lg hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronDownIcon className="h-5 w-5 rotate-90 mx-auto" />
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronDownIcon className="h-5 w-5 -rotate-90 mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;