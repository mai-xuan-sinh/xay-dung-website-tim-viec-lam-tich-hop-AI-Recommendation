// src/pages/jobs/JobCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  CurrencyDollarIcon, 
  BriefcaseIcon, 
  StarIcon 
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { getCompanyLogo } from '../../data/companyLogos';

const JobCard = ({ job, isSaved, onToggleSave, onApply }) => {
  // Lấy logo từ mapping
  const companyLogo = getCompanyLogo(job.company);
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 relative group">
      {/* Hot Badge */}
      {job.hot && (
        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
          🔥 Hot
        </span>
      )}

      {/* Featured Badge */}
      {job.featured && (
        <span className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
          ⭐ Nổi bật
        </span>
      )}

      {/* Save Button */}
      <button
        onClick={() => onToggleSave(job.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 transition-colors z-10"
      >
        {isSaved ? (
          <StarIconSolid className="h-5 w-5 text-yellow-500" />
        ) : (
          <StarIcon className="h-5 w-5" />
        )}
      </button>

      {/* Job Header */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={job.company}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40?text=Logo';
              }}
            />
          ) : (
            <span className="text-2xl">{job.logo || '💼'}</span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <BuildingOfficeIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{job.company}</span>
          </p>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <CurrencyDollarIcon className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="font-medium text-green-600">{job.salary}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <BriefcaseIcon className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{job.type} - {job.experience}</span>
        </div>
        {job.skills && (
          <div className="flex flex-wrap gap-1 mt-2">
            {job.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                +{job.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Link
          to={`/jobs/${job.id}`}
          className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Xem chi tiết
        </Link>
        <button 
          onClick={() => onApply(job)}
          className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Ứng tuyển
        </button>
      </div>
    </div>
  );
};

export default JobCard;