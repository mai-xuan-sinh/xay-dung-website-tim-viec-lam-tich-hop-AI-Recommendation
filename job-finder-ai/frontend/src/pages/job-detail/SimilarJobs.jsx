import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CurrencyDollarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const SimilarJobs = ({ jobs }) => {
  if (!jobs || jobs.length === 0) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-900">Việc làm tương tự</h2>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="block p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:border-blue-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1 text-green-600" />
                    <span className="text-green-600">{job.salary}</span>
                  </span>
                  <span className="flex items-center">
                    <BriefcaseIcon className="h-4 w-4 mr-1" />
                    {job.type}
                  </span>
                </div>
              </div>
              {job.hot && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  🔥 Hot
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;