import React from 'react';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  BriefcaseIcon, 
  CalendarIcon, 
  ClockIcon,
  StarIcon,
  ShareIcon,
  BookmarkIcon,
  EyeIcon,
  DocumentTextIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { getCompanyLogo } from '../../data/companyLogos';

const JobHeader = ({ job, isSaved, onSave, onShare, onView }) => {
  // Lấy logo từ mapping
  const companyLogo = getCompanyLogo(job.company);
  
  // Tính số ngày còn lại đến hạn nộp
  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Đã hết hạn';
    if (diffDays === 0) return 'Hôm nay';
    return `Còn ${diffDays} ngày`;
  };
  
  const daysRemaining = getDaysRemaining(job.deadline);
  const isExpired = daysRemaining === 'Đã hết hạn';
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Logo và thông tin */}
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={job.company}
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80?text=Logo';
                }}
              />
            ) : (
              <span className="text-3xl text-gray-500">🏢</span>
            )}
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
              {job.hot && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  🔥 Hot
                </span>
              )}
              {job.featured && (
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full">
                  ⭐ Nổi bật
                </span>
              )}
              {job.isNew && (
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Mới
                </span>
              )}
              {isExpired && (
                <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full">
                  Đã hết hạn
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-lg font-semibold text-blue-600">{job.company}</span>
              <div className="flex items-center text-gray-500 text-sm">
                <EyeIcon className="h-4 w-4 mr-1" />
                <span>{job.views || 128} lượt xem</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <UserGroupIcon className="h-4 w-4 mr-1" />
                <span>{job.applicants || 45} ứng viên</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                {job.location}
              </span>
              <span className="flex items-center">
                <CurrencyDollarIcon className="h-4 w-4 mr-1 text-green-500" />
                <span className="font-medium text-green-600">{job.salary}</span>
              </span>
              <span className="flex items-center">
                <BriefcaseIcon className="h-4 w-4 mr-1" />
                {job.type}
              </span>
              <span className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                {job.experience}
              </span>
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Đăng ngày: {job.postedDate}
              </span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSave}
            className="p-2.5 text-gray-500 hover:text-yellow-500 transition-colors rounded-lg hover:bg-gray-100"
            title={isSaved ? 'Bỏ lưu' : 'Lưu việc làm'}
          >
            {isSaved ? (
              <StarIconSolid className="h-6 w-6 text-yellow-500" />
            ) : (
              <StarIcon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={onShare}
            className="p-2.5 text-gray-500 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100"
            title="Chia sẻ"
          >
            <ShareIcon className="h-6 w-6" />
          </button>
          <button
            onClick={onView}
            className="p-2.5 text-gray-500 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100"
            title="Xem công ty"
          >
            <BriefcaseIcon className="h-6 w-6" />
          </button>
          <button
            className="p-2.5 text-gray-500 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100"
            title="In thông tin"
            onClick={() => window.print()}
          >
            <DocumentTextIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Deadline và số lượng ứng tuyển */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isExpired ? 'bg-gray-500' : 'bg-red-500 animate-pulse'}`}></div>
            <span className="text-sm text-gray-500">
              Hạn nộp: <span className={`font-medium ${isExpired ? 'text-gray-500' : 'text-red-600'}`}>
                {job.deadline} {daysRemaining && !isExpired && `(${daysRemaining})`}
              </span>
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Đã có <span className="font-medium text-blue-600">{job.applicants || 45}</span> ứng viên nộp
          </div>
          {job.positions && (
            <div className="text-sm text-gray-500">
              Số lượng: <span className="font-medium text-gray-700">{job.positions} vị trí</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <StarIconSolid key={i} className={`h-4 w-4 ${i < Math.floor(job.rating || 4.5) ? 'text-yellow-400' : 'text-gray-200'}`} />
          ))}
          <span className="text-sm text-gray-500 ml-1">({job.ratingCount || 128} đánh giá)</span>
        </div>
      </div>

      {/* Tags bổ sung */}
      {(job.skills || job.tags) && (
        <div className="mt-4 pt-2 flex flex-wrap gap-2">
          {job.skills?.slice(0, 5).map((skill, idx) => (
            <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              #{skill}
            </span>
          ))}
          {job.tags?.map((tag, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default JobHeader;