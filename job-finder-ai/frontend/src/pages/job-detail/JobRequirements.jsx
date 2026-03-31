import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const JobRequirements = ({ requirements }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-1 h-6 bg-green-600 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-900">Yêu cầu công việc</h2>
      </div>
      <ul className="space-y-3">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-start space-x-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{req}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRequirements;