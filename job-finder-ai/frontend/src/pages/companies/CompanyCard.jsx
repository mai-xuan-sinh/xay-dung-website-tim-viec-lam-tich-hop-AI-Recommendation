import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  UsersIcon, 
  CalendarIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { getCompanyLogo } from '../../data/companyLogos';

const CompanyCard = ({ company, isSaved, onToggleSave, isExpanded, onToggleExpand }) => {
  const logo = getCompanyLogo(company.name);
  
  const displayJobs = company.jobs?.slice(0, 4) || [];
  const displayBenefits = company.benefits?.slice(0, 4) || [];
  
  // Tạo slug cho tên công ty để dùng trong URL
  const companySlug = encodeURIComponent(company.name);
  
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 animate-fadeIn">
      {/* Company Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start space-x-4">
            {/* Logo Container */}
            <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100">
              {logo ? (
                <img
                  src={logo}
                  alt={company.name}
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64?text=Logo';
                  }}
                />
              ) : (
                <span className="text-3xl text-gray-400">🏢</span>
              )}
            </div>
            
            {/* Company Info */}
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
                {company.featured && (
                  <span className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full border border-amber-200">
                    {company.badge || 'Nổi bật'}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                  {company.location}
                </span>
                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                  Thành lập {company.founded}
                </span>
                <span className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-1 text-gray-400" />
                  {company.employees} nhân viên
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {/* Rating Stars */}
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(company.rating) ? (
                        <StarIconSolid key={i} className="h-4 w-4 text-amber-400" />
                      ) : (
                        <StarIcon key={i} className="h-4 w-4 text-gray-200" />
                      )
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{company.rating}</span>
                  <span className="text-xs text-gray-400 ml-1">({company.ratingCount} đánh giá)</span>
                </div>
                
                {/* Recommend Rate */}
                <div className="flex items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-semibold text-green-600">{company.recommendRate}%</span>
                  <span className="text-xs text-gray-400 ml-1">khuyến khích</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleSave(company.id)}
              className="p-2 text-gray-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-gray-100"
              title={isSaved ? 'Bỏ lưu' : 'Lưu công ty'}
            >
              {isSaved ? (
                <HeartIcon className="h-5 w-5 fill-rose-500 text-rose-500" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </button>
            <button 
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100"
              title="Chia sẻ"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
            <button 
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100"
              title="Đánh dấu"
            >
              <BookmarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Review Quote */}
      {company.reviewQuote && (
        <div className="px-6 pt-4 pb-2 bg-gray-50">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-500 text-sm">“</span>
            </div>
            <div>
              <p className="text-gray-600 text-sm italic line-clamp-2">"{company.reviewQuote}"</p>
              <p className="text-xs text-gray-400 mt-1">— {company.reviewAuthor}</p>
            </div>
          </div>
        </div>
      )}

      {/* Company Info */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {company.description}
        </p>
        
        {/* Job Openings */}
        {displayJobs.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm">
              <BriefcaseIcon className="h-4 w-4 mr-2 text-blue-500" />
              Vị trí đang tuyển
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {displayJobs.map((job, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-gray-800 text-sm truncate">{job.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-green-600 font-medium">{job.salary}</span>
                    <span className="text-xs text-gray-400">{job.count} vị trí</span>
                  </div>
                  <span className="text-xs text-gray-400">{job.level}</span>
                </div>
              ))}
            </div>
            {company.jobs?.length > 4 && (
              <p className="text-xs text-gray-400 mt-2 text-center">
                +{company.jobs.length - 4} vị trí khác
              </p>
            )}
          </div>
        )}

        {/* Benefits */}
        {displayBenefits.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2 flex items-center text-sm">
              <svg className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Phúc lợi nổi bật
            </h4>
            <div className="flex flex-wrap gap-2">
              {displayBenefits.map((benefit, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100"
                  title={benefit}
                >
                  ✓ {benefit.length > 25 ? benefit.substring(0, 25) + '...' : benefit}
                </span>
              ))}
              {company.benefits?.length > 4 && (
                <span className="text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                  +{company.benefits.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
          <button
            onClick={() => onToggleExpand(company.id)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <span>{isExpanded ? 'Thu gọn' : 'Xem thông tin chi tiết'}</span>
            {isExpanded ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>
          
          {/* SỬA LINK Ở ĐÂY - Chuyển đến trang review với tên công ty */}
          <Link
            to={`/company-reviews?company=${companySlug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Xem đánh giá
          </Link>
          <Link
            to={`/jobs?company=${encodeURIComponent(company.name)}`}
            className="flex-1 border border-blue-600 text-blue-600 text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Xem việc làm
          </Link>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Culture */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Văn hóa công ty
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{company.culture}</p>
              </div>
              
              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Thông tin liên hệ
                </h4>
                <div className="space-y-2 text-sm">
                  {company.website && (
                    <div className="flex items-center space-x-2">
                      <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline truncate"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                  {company.email && (
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                      <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline truncate">
                        {company.email}
                      </a>
                    </div>
                  )}
                  {company.phone && (
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{company.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CompanyCard;