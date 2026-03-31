import React from 'react';
import { CalendarIcon, BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Experience = ({ experiences }) => {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <div className="text-4xl mb-2">💼</div>
        <p className="text-gray-500">Chưa có kinh nghiệm làm việc</p>
        <button className="mt-2 text-blue-600 text-sm hover:text-blue-700">
          + Thêm kinh nghiệm
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Kinh nghiệm làm việc</h2>
        <button className="text-blue-600 text-sm hover:text-blue-700">+ Thêm</button>
      </div>
      
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="border-l-2 border-blue-200 pl-4 pb-4 last:pb-0">
            <h3 className="font-semibold text-gray-900">{exp.position}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <BuildingOfficeIcon className="h-4 w-4" />
              <span>{exp.company}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{exp.startDate} - {exp.endDate || 'Hiện tại'}</span>
              </div>
              {exp.location && (
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{exp.location}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;