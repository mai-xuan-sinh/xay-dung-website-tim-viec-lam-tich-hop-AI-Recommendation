import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CurrencyDollarIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SavedJobs = ({ savedJobs, onRemove }) => {
  if (!savedJobs || savedJobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <div className="text-4xl mb-2">❤️</div>
        <p className="text-gray-500">Chưa có việc làm nào được lưu</p>
        <Link to="/jobs" className="mt-2 inline-block text-blue-600 text-sm hover:text-blue-700">
          Khám phá việc làm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 animate-fadeIn">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Việc làm đã lưu</h2>
      
      <div className="space-y-4">
        {savedJobs.map((job, idx) => (
          <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Link to={`/jobs/${job.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                      {job.title}
                    </Link>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <button
                    onClick={() => onRemove(job.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                    {job.salary}
                  </span>
                </div>
              </div>
              <Link
                to={`/jobs/${job.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;