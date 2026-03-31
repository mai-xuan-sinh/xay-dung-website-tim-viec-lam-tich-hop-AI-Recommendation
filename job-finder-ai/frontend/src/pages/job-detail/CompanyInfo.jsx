import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  TrophyIcon,
  StarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { getCompanyLogo } from '../../data/companyLogos';

const CompanyInfo = ({ company }) => {
  // Lấy logo từ mapping
  const logo = getCompanyLogo(company.name);
  
  // Tính số năm thành lập
  const getYearsFounded = (founded) => {
    if (!founded) return null;
    const currentYear = new Date().getFullYear();
    const foundedYear = parseInt(founded);
    if (isNaN(foundedYear)) return null;
    const years = currentYear - foundedYear;
    return `${years} năm`;
  };
  
  const yearsFounded = getYearsFounded(company.founded);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
          <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Thông tin công ty</h2>
      </div>
      
      {/* Logo và tên công ty */}
      <div className="flex items-start space-x-4 mb-4">
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
            <BuildingOfficeIcon className="h-10 w-10 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mt-1">{company.description}</p>
        </div>
      </div>
      
      {/* Thông tin chi tiết */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
          <UsersIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{company.employees} nhân viên</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
          <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">Thành lập {company.founded} {yearsFounded && `(${yearsFounded})`}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
          <MapPinIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{company.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
          <ChartBarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{company.hotJobs} việc làm đang tuyển</span>
        </div>
      </div>
      
      {/* Rating và Recommend */}
      {company.rating && (
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
          <div className="flex items-center space-x-2">
            <TrophyIcon className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Đánh giá</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                i < Math.floor(company.rating) ? (
                  <StarIconSolid key={i} className="h-4 w-4 text-amber-400" />
                ) : (
                  <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                )
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">{company.rating}</span>
            <span className="text-xs text-gray-500">({company.ratingCount} đánh giá)</span>
          </div>
        </div>
      )}
      
      {/* Thông tin liên hệ */}
      <div className="pt-4 border-t border-gray-100">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <ShieldCheckIcon className="h-4 w-4 mr-2 text-green-500" />
          Liên hệ
        </h4>
        <div className="space-y-3 text-sm">
          {company.website && (
            <div className="flex items-center space-x-2 group">
              <GlobeAltIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline truncate group-hover:text-blue-700 transition-colors"
              >
                {company.website}
              </a>
            </div>
          )}
          {company.email && (
            <div className="flex items-center space-x-2 group">
              <EnvelopeIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <a 
                href={`mailto:${company.email}`} 
                className="text-blue-600 hover:underline truncate group-hover:text-blue-700 transition-colors"
              >
                {company.email}
              </a>
            </div>
          )}
          {company.phone && (
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-600">{company.phone}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Nút xem trang công ty */}
      <Link
        to={`/companies/${company.id}`}
        className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-sm font-medium transition-all duration-200 group"
      >
        <span>Xem trang công ty</span>
        <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
      
      {/* CSS cho line clamp */}
      <style jsx>{`
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

export default CompanyInfo;