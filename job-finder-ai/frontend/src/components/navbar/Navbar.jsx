import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCircleIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  BellIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  SparklesIcon,
  HeartIcon,
  CogIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [isCVMenuOpen, setIsCVMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [savedJobs, setSavedJobs] = useState(0);
  
  // Refs cho các dropdown
  const companyMenuRef = useRef(null);
  const companyButtonRef = useRef(null);
  const cvMenuRef = useRef(null);
  const cvButtonRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
    setIsCompanyMenuOpen(false);
    setIsCVMenuOpen(false);
  }, [location]);

  // Xử lý hover cho Company menu
  const handleMouseEnterCompany = () => {
    setIsCompanyMenuOpen(true);
  };

  const handleMouseLeaveCompany = () => {
    setTimeout(() => {
      if (!companyMenuRef.current?.matches(':hover') && !companyButtonRef.current?.matches(':hover')) {
        setIsCompanyMenuOpen(false);
      }
    }, 100);
  };

  // Xử lý hover cho CV menu
  const handleMouseEnterCV = () => {
    setIsCVMenuOpen(true);
  };

  const handleMouseLeaveCV = () => {
    setTimeout(() => {
      if (!cvMenuRef.current?.matches(':hover') && !cvButtonRef.current?.matches(':hover')) {
        setIsCVMenuOpen(false);
      }
    }, 100);
  };

  // Click outside để đóng profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const MenuItem = ({ to, icon: Icon, label, badge, highlight }) => (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
        highlight 
          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
      onClick={() => setIsProfileMenuOpen(false)}
    >
      <div className="w-8 flex justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <span className="flex-1 font-medium">{label}</span>
      {badge > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-1.5 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPinIcon className="h-4 w-4" />
              <span>Đà Nẵng</span>
            </div>
            <span className="text-blue-200">|</span>
            <span>🌤 28°C</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-100">Hotline: 1900 1234</span>
            <span className="text-blue-200">|</span>
            <span className="flex items-center space-x-1">
              <EnvelopeIcon className="h-4 w-4" />
              <span>support@danangwork.vn</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
            : 'bg-white shadow-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <img 
                    src={logo}
                    alt="ĐANANG WORK" 
                    className="h-12 w-12 object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    ĐANANG WORK
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <SparklesIcon className="h-3 w-3 text-yellow-500 mr-1" />
                    Tìm việc thông minh tại Đà Nẵng
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center justify-center space-x-2">
              <Link
                to="/"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive('/')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Trang chủ</span>
                {isActive('/') && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600"></span>
                )}
              </Link>

              <Link
                to="/jobs"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive('/jobs')
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Việc làm</span>
                {isActive('/jobs') && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-green-600"></span>
                )}
              </Link>

              {/* Company Dropdown */}
              <div 
                className="relative"
                ref={companyMenuRef}
                onMouseEnter={handleMouseEnterCompany}
                onMouseLeave={handleMouseLeaveCompany}
              >
                <button
                  ref={companyButtonRef}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    location.pathname.includes('/companies') || 
                    location.pathname === '/top-companies' || 
                    location.pathname === '/company-reviews'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>Công ty</span>
                  {isCompanyMenuOpen && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-purple-600"></span>
                  )}
                </button>

                {isCompanyMenuOpen && (
                  <div 
                    ref={companyMenuRef}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 animate-fadeIn z-50"
                    onMouseEnter={() => setIsCompanyMenuOpen(true)}
                    onMouseLeave={() => setIsCompanyMenuOpen(false)}
                  >
                    <Link
                      to="/top-companies"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      onClick={() => setIsCompanyMenuOpen(false)}
                    >
                      <StarIcon className="h-5 w-5" />
                      <span className="font-medium">Top công ty</span>
                    </Link>
                    <Link
                      to="/company-reviews"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      onClick={() => setIsCompanyMenuOpen(false)}
                    >
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                      <span className="font-medium">Review công ty</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/trends"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive('/trends')
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Xu hướng</span>
                {isActive('/trends') && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-orange-600"></span>
                )}
              </Link>

              <Link
                to="/guide"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive('/guide')
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Hướng dẫn</span>
                {isActive('/guide') && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-pink-600"></span>
                )}
              </Link>

              {/* CV Dropdown */}
              <div 
                className="relative"
                ref={cvMenuRef}
                onMouseEnter={handleMouseEnterCV}
                onMouseLeave={handleMouseLeaveCV}
              >
                <button
                  ref={cvButtonRef}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    location.pathname.includes('/create-cv') || 
                    location.pathname === '/cv-styles' || 
                    location.pathname === '/cv-industries' ||
                    location.pathname === '/cv-guide'
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>Tạo CV</span>
                  {isCVMenuOpen && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600"></span>
                  )}
                </button>

                {isCVMenuOpen && (
                  <div 
                    ref={cvMenuRef}
                    className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 border border-gray-100 animate-fadeIn z-50"
                    onMouseEnter={() => setIsCVMenuOpen(true)}
                    onMouseLeave={() => setIsCVMenuOpen(false)}
                  >
                    <Link
                      to="/create-cv"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsCVMenuOpen(false)}
                    >
                      <DocumentTextIcon className="h-5 w-5" />
                      <span className="font-medium">✨ Tạo CV Online</span>
                    </Link>
                    <Link
                      to="/cv-styles"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsCVMenuOpen(false)}
                    >
                      <PaintBrushIcon className="h-5 w-5" />
                      <span className="font-medium">🎨 CV Theo Phong Cách</span>
                    </Link>
                    <Link
                      to="/cv-industries"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsCVMenuOpen(false)}
                    >
                      <BriefcaseIcon className="h-5 w-5" />
                      <span className="font-medium">💼 CV Theo Ngành Nghề</span>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      to="/cv-guide"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsCVMenuOpen(false)}
                    >
                      <AcademicCapIcon className="h-5 w-5" />
                      <span className="font-medium">📖 Hướng Dẫn Viết CV</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/support"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive('/support')
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>Hỗ trợ</span>
                {isActive('/support') && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-red-600"></span>
                )}
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Notifications */}
              <button 
                onClick={() => navigate('/notifications')}
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 group"
              >
                {notifications > 0 ? (
                  <BellIconSolid className="h-5 w-5 text-blue-600" />
                ) : (
                  <BellIcon className="h-5 w-5" />
                )}
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                    {notifications > 99 ? '99+' : notifications}
                  </span>
                )}
              </button>

              {/* Saved Jobs */}
              <button 
                onClick={() => navigate('/saved-jobs')}
                className="relative p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-300 group"
              >
                <HeartIcon className="h-5 w-5" />
                {savedJobs > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-pink-500 text-white text-xs flex items-center justify-center rounded-full">
                    {savedJobs > 99 ? '99+' : savedJobs}
                  </span>
                )}
              </button>

              {isAuthenticated() ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition-all duration-300 border-2 border-transparent hover:border-blue-200"
                  >
                    <div className="relative">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-gray-700">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                      isProfileMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl py-2 border border-gray-100 animate-fadeIn z-50">
                      <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                        <div className="flex items-center space-x-3">
                          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                            <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                              {user?.role === 'employer' ? 'Nhà tuyển dụng' : 'Người tìm việc'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-100">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">0</div>
                          <div className="text-xs text-gray-500">Đã ứng tuyển</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{savedJobs}</div>
                          <div className="text-xs text-gray-500">Đã lưu</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">0</div>
                          <div className="text-xs text-gray-500">Phỏng vấn</div>
                        </div>
                      </div>

                      <div className="py-2">
                        <MenuItem to="/profile" icon={UserCircleIcon} label="Hồ sơ cá nhân" badge={0} />
                        <MenuItem to="/create-cv" icon={DocumentTextIcon} label="Tạo CV" badge={0} highlight />
                        <MenuItem to="/applications" icon={BriefcaseIcon} label="Đơn ứng tuyển" badge={0} />
                        <MenuItem to="/saved-jobs" icon={HeartIcon} label="Việc làm đã lưu" badge={savedJobs} />
                        <MenuItem to="/notifications" icon={BellIcon} label="Thông báo" badge={notifications} />
                        
                        {user?.role === 'employer' && (
                          <>
                            <div className="border-t border-gray-100 my-2"></div>
                            <MenuItem to="/post-job" icon={BriefcaseIcon} label="Đăng tin tuyển dụng" highlight />
                            <MenuItem to="/manage-jobs" icon={BuildingOfficeIcon} label="Quản lý tin đăng" />
                          </>
                        )}
                        
                        <div className="border-t border-gray-100 my-2"></div>
                        <MenuItem to="/settings" icon={CogIcon} label="Cài đặt" badge={0} />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <div className="w-8 flex justify-center">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          <span className="font-medium">Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-gray-100 animate-slideDown">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Trang chủ
                </Link>
                <Link
                  to="/jobs"
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/jobs')
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Việc làm
                </Link>
                
                {/* Mobile Company Menu */}
                <div>
                  <div className="px-4 py-3 text-sm font-medium text-gray-700">
                    Công ty
                  </div>
                  <div className="ml-4 space-y-2">
                    <Link
                      to="/top-companies"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <StarIcon className="h-4 w-4" />
                      <span>Top công ty</span>
                    </Link>
                    <Link
                      to="/company-reviews"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChatBubbleLeftIcon className="h-4 w-4" />
                      <span>Review công ty</span>
                    </Link>
                  </div>
                </div>

                <Link
                  to="/trends"
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/trends')
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Xu hướng
                </Link>
                <Link
                  to="/guide"
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/guide')
                      ? 'text-pink-600 bg-pink-50'
                      : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hướng dẫn
                </Link>

                {/* Mobile CV Menu */}
                <div>
                  <div className="px-4 py-3 text-sm font-medium text-gray-700">
                    Tạo CV
                  </div>
                  <div className="ml-4 space-y-2">
                    <Link
                      to="/create-cv"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <DocumentTextIcon className="h-4 w-4" />
                      <span>✨ Tạo CV Online</span>
                    </Link>
                    <Link
                      to="/cv-styles"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <PaintBrushIcon className="h-4 w-4" />
                      <span>🎨 CV Theo Phong Cách</span>
                    </Link>
                    <Link
                      to="/cv-industries"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BriefcaseIcon className="h-4 w-4" />
                      <span>💼 CV Theo Ngành Nghề</span>
                    </Link>
                    <Link
                      to="/cv-guide"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <AcademicCapIcon className="h-4 w-4" />
                      <span>📖 Hướng Dẫn Viết CV</span>
                    </Link>
                  </div>
                </div>

                <Link
                  to="/support"
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/support')
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hỗ trợ
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;