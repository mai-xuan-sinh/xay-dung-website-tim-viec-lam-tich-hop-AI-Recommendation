/* Component hiển thị thông báo khi không tìm thấy kết quả công việc nào trên trang danh sách công việc, với một biểu tượng và một thông điệp thân thiện khuyến khích người dùng thử tìm kiếm với từ khóa hoặc bộ lọc khác. */

import React from 'react';

const NoResults = ({ message }) => {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {message || 'Không tìm thấy việc làm'}
      </h3>
      <p className="text-gray-600">Thử tìm kiếm với từ khóa khác hoặc bộ lọc khác nhé!</p>
    </div>
  );
};

export default NoResults;