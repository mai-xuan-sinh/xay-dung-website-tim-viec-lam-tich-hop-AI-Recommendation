// src/pages/admin/reports/UserReport.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const UserReport = () => {
  return (
    <div>
      <Link to="/admin/reports" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5" /> Quay lại
      </Link>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Báo cáo người dùng</h1>
        <p className="text-gray-500 mb-6">Thống kê số lượng người dùng theo thời gian</p>

        <div className="h-80 flex items-center justify-center border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400">Biểu đồ tăng trưởng người dùng sẽ hiển thị tại đây</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">1,248</p>
            <p className="text-sm text-gray-600">Tổng người dùng</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">89</p>
            <p className="text-sm text-gray-600">Nhà tuyển dụng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReport;