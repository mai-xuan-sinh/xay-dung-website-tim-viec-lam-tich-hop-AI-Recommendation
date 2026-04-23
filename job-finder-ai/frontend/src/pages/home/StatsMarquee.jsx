// src/pages/home/StatsMarquee.jsx
import React from 'react';
import { BriefcaseIcon, BuildingOfficeIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const StatsMarquee = ({ totalJobs }) => {
  const stats = [
    { icon: BriefcaseIcon, value: totalJobs, label: 'Việc làm', color: 'from-blue-500 to-cyan-500' },
    { icon: BuildingOfficeIcon, value: 50, label: 'Công ty', color: 'from-green-500 to-emerald-500' },
    { icon: UserGroupIcon, value: '5,000+', label: 'Ứng viên', color: 'from-purple-500 to-pink-500' },
    { icon: ChartBarIcon, value: '94%', label: 'Hài lòng', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="relative -mt-12 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center group">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsMarquee;