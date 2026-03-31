// src/pages/support/components/SystemStatus.jsx
import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const SystemStatus = () => {
  const services = [
    { name: 'API Backend', status: 'operational', uptime: '99.99%', message: 'Hoạt động tốt' },
    { name: 'Database', status: 'operational', uptime: '99.99%', message: 'Bình thường' },
    { name: 'AI Service', status: 'operational', uptime: '99.95%', message: 'Đang hoạt động' },
    { name: 'Email Service', status: 'degraded', uptime: '98.50%', message: 'Đang xử lý chậm' },
    { name: 'CDN/Images', status: 'operational', uptime: '99.99%', message: 'Ổn định' },
    { name: 'WebSocket', status: 'operational', uptime: '99.97%', message: 'Kết nối tốt' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'outage':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return <span className="text-green-600">Hoạt động</span>;
      case 'degraded':
        return <span className="text-yellow-600">Chậm</span>;
      case 'outage':
        return <span className="text-red-600">Gián đoạn</span>;
      default:
        return <span className="text-green-600">Hoạt động</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-1 h-8 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">Trạng thái hệ thống</h2>
          <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-700 font-medium">Tất cả dịch vụ đang hoạt động</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-semibold text-gray-600">Dịch vụ</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600">Trạng thái</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600">Uptime</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-600">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3">
                    <span className="font-medium text-gray-800">{service.name}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(service.status)}
                      {getStatusText(service.status)}
                    </div>
                  </td>
                  <td className="py-3 text-gray-600">{service.uptime}</td>
                  <td className="py-3 text-gray-500 text-sm">{service.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;