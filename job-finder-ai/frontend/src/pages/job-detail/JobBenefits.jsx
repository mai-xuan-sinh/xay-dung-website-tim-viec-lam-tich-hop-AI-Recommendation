import React from 'react';
import { GiftIcon, ShieldCheckIcon, RocketLaunchIcon, HeartIcon } from '@heroicons/react/24/outline';

const JobBenefits = ({ benefits }) => {
  const icons = [GiftIcon, ShieldCheckIcon, RocketLaunchIcon, HeartIcon];
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-900">Phúc lợi</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {benefits.map((benefit, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Icon className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-gray-700 text-sm">{benefit}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobBenefits;