// src/pages/support/components/SupportStats.jsx
import React from 'react';
import { UsersIcon, ClockIcon, StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const SupportStats = () => {
  const stats = [
    {
      icon: UsersIcon,
      value: '10,000+',
      label: 'Người dùng đã được hỗ trợ',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: ClockIcon,
      value: '15 phút',
      label: 'Thời gian phản hồi trung bình',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: StarIcon,
      value: '4.9/5',
      label: 'Đánh giá hài lòng',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      value: '98%',
      label: 'Câu hỏi được giải đáp',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Con số ấn tượng
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Chúng tôi tự hào về chất lượng hỗ trợ khách hàng
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center">
                <div className={`w-20 h-20 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className={`h-10 w-10 ${stat.textColor}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.textColor} mb-2`}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SupportStats;