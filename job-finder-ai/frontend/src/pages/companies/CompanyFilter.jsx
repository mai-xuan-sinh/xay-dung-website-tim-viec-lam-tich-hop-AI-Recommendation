import React from 'react';
import { BuildingOfficeIcon, ComputerDesktopIcon, CameraIcon, HomeModernIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/24/outline';

const CompanyFilter = ({ selectedIndustry, onIndustryChange }) => {
  const industries = [
    { id: 'all', name: 'Tất cả', icon: BuildingOfficeIcon },
    { id: 'it', name: 'Công nghệ thông tin', icon: ComputerDesktopIcon },
    { id: 'tourism', name: 'Du lịch - Khách sạn', icon: CameraIcon },
    { id: 'construction', name: 'Xây dựng - Bất động sản', icon: HomeModernIcon },
    { id: 'business', name: 'Kinh doanh - Bán lẻ', icon: ShoppingBagIcon },
    { id: 'service', name: 'Dịch vụ - Logistics', icon: TruckIcon }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {industries.map((industry) => {
        const Icon = industry.icon;
        const isActive = selectedIndustry === industry.id;
        return (
          <button
            key={industry.id}
            onClick={() => onIndustryChange(industry.id)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
              isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{industry.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CompanyFilter;