import React from 'react';
import { CalendarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const Education = ({ educations }) => {
  if (!educations || educations.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <div className="text-4xl mb-2">🎓</div>
        <p className="text-gray-500">Chưa có thông tin học vấn</p>
        <button className="mt-2 text-blue-600 text-sm hover:text-blue-700">
          + Thêm học vấn
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Học vấn</h2>
        <button className="text-blue-600 text-sm hover:text-blue-700">+ Thêm</button>
      </div>
      
      <div className="space-y-6">
        {educations.map((edu, idx) => (
          <div key={idx} className="border-l-2 border-green-200 pl-4 pb-4 last:pb-0">
            <h3 className="font-semibold text-gray-900">{edu.school}</h3>
            <p className="text-sm text-gray-600">{edu.degree} - {edu.fieldOfStudy}</p>
            <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{edu.startDate} - {edu.endDate}</span>
            </div>
            {edu.description && (
              <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;