/* TopBar.jsx */
import React from 'react';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-1.5 text-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              <span className="font-medium">Đà Nẵng</span>
            </div>
            
            {/* Có thể bỏ thời tiết hoặc làm động sau */}
            {/* <div className="flex items-center gap-1 text-blue-100">
              <span>🌤</span>
              <span>28°C</span>
            </div> */}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5 text-blue-100">
            <a 
              href="tel:19001234" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>1900 1234</span>
            </a>

            <span className="text-blue-200">•</span>

            <a 
              href="mailto:support@danangwork.vn" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <EnvelopeIcon className="h-4 w-4" />
              <span>support@danangwork.vn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;