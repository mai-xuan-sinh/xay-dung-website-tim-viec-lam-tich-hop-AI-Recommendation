import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Chi tiết công việc</h1>
      <p className="text-gray-600 mt-2">Job ID: {id}</p>
      <p className="text-gray-600">Trang đang được xây dựng...</p>
    </div>
  );
};

export default JobDetailPage;