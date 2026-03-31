/* Component hiển thị thống kê số lượng việc làm theo ngành nghề trên trang chủ */

import React from 'react';
import { Link } from 'react-router-dom';

const StatsBar = ({ stats }) => {
  const statsData = [
    { name: 'IT', value: stats.it, color: 'blue' },
    { name: 'Du lịch', value: stats.tourism, color: 'green' },
    { name: 'Kinh doanh', value: stats.business, color: 'yellow' },
    { name: 'Xây dựng', value: stats.construction, color: 'orange' },
    { name: 'Dịch vụ', value: stats.service, color: 'purple' },
  ];

  const total = stats.it + stats.tourism + stats.business + stats.construction + stats.service;

  return (
    <>
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {statsData.map((item) => (
            <div key={item.name} className="text-center border-r border-blue-400 last:border-0">
              <div className="text-3xl font-bold">{item.value}</div>
              <div className="text-sm text-blue-200">{item.name}</div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4 pt-4 border-t border-blue-400">
          <div className="text-2xl font-bold">Tổng: {total} việc làm</div>
        </div>
      </div>

      {/* Hot Tags */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-gray-500">Từ khóa hot:</span>
        {['React', 'NodeJS', 'Tiếng Anh', 'Kinh doanh', 'Xây dựng'].map((tag) => (
          <Link 
            key={tag} 
            to={`/jobs?keyword=${tag.toLowerCase().replace(/ /g, '-')}`}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </>
  );
};

export default StatsBar;