// src/pages/admin/reports/RevenueReport.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const RevenueReport = () => {
  return (
    <div>
      <Link to="/admin/reports" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5" /> Quay lại
      </Link>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Báo cáo doanh thu</h1>
        <p className="text-gray-500 mb-6">Chi tiết doanh thu từ các gói dịch vụ</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Gói dịch vụ</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Số lượng</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Doanh thu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-4 py-3">Cơ Bản</td><td>45</td><td>0đ</td></tr>
              <tr><td className="px-4 py-3">Tiêu Chuẩn</td><td>28</td><td>8,372,000đ</td></tr>
              <tr><td className="px-4 py-3">Premium</td><td>12</td><td>5,988,000đ</td></tr>
              <tr><td className="px-4 py-3">Doanh Nghiệp</td><td>3</td><td>2,697,000đ</td></tr>
              <tr className="bg-gray-50 font-semibold"><td className="px-4 py-3">Tổng cộng</td><td>88</td><td>17,057,000đ</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;