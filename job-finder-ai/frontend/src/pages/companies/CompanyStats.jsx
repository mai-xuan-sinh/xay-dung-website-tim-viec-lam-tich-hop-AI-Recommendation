import React from 'react';
import { TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline';

const CompanyStats = ({ stats }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl mb-8">
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 rounded-full p-3">
              <TrophyIcon className="h-8 w-8 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Top Công Ty Hàng Đầu</h2>
              <p className="text-gray-300 text-sm">Đà Nẵng 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{stats.totalCompanies}</div>
              <div className="text-xs text-gray-400">Công ty</div>
            </div>
            <div className="w-px h-10 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{stats.totalJobs}</div>
              <div className="text-xs text-gray-400">Việc làm</div>
            </div>
            <div className="w-px h-10 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{stats.totalReviews}</div>
              <div className="text-xs text-gray-400">Đánh giá</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <SparklesIcon className="h-5 w-5 text-amber-400" />
            <span className="text-sm text-gray-300">Được tin tưởng bởi 5000+ ứng viên</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;