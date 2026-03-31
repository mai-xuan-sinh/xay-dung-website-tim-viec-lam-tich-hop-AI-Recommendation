import React from 'react';

const JobDescription = ({ description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-900">Mô tả công việc</h2>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;