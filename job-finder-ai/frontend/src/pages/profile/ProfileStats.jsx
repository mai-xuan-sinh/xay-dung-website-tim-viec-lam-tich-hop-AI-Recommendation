import React from 'react';
import { BriefcaseIcon, HeartIcon, CalendarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const ProfileStats = ({ stats }) => {
  const statItems = [
    { label: 'Đã ứng tuyển', value: stats.applications, icon: BriefcaseIcon, color: 'blue' },
    { label: 'Đã lưu', value: stats.savedJobs, icon: HeartIcon, color: 'pink' },
    { label: 'Phỏng vấn', value: stats.interviews, icon: CalendarIcon, color: 'purple' },
    { label: 'Đã trúng tuyển', value: stats.accepted, icon: CheckBadgeIcon, color: 'green' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fadeIn">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        const colorClasses = {
          blue: 'bg-blue-50 text-blue-600',
          pink: 'bg-pink-50 text-pink-600',
          purple: 'bg-purple-50 text-purple-600',
          green: 'bg-green-50 text-green-600',
        };
        
        return (
          <div key={idx} className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <div className={`w-10 h-10 ${colorClasses[item.color]} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            <div className="text-xs text-gray-500">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileStats;