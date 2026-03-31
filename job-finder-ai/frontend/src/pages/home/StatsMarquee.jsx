import React from 'react';
import { BriefcaseIcon, BuildingOfficeIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const StatsMarquee = ({ totalJobs }) => {
  const stats = [
    { icon: BriefcaseIcon, value: totalJobs, label: 'Việc làm' },
    { icon: BuildingOfficeIcon, value: 50, label: 'Công ty' },
    { icon: UserGroupIcon, value: '5,000+', label: 'Ứng viên' },
    { icon: ChartBarIcon, value: '94%', label: 'Hài lòng' }
  ];

  return (
    <div className="relative -mt-12 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsMarquee;