// src/components/navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCircleIcon, BriefcaseIcon, BuildingOfficeIcon, BellIcon,
  ChevronDownIcon, Bars3Icon, XMarkIcon, MapPinIcon, EnvelopeIcon,
  PhoneIcon, SparklesIcon, HeartIcon, CogIcon, StarIcon,
  ChatBubbleLeftIcon, DocumentTextIcon, PaintBrushIcon, AcademicCapIcon,
  ChartBarIcon, ClipboardDocumentListIcon, CalendarIcon, MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import logo from '../../assets/logo.png';

const Navbar = ({ isAuthPage = false }) => {
  const { user, logout, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [isCVMenuOpen, setIsCVMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [savedJobs, setSavedJobs] = useState(5);
  
  const companyMenuRef = useRef(null);
  const companyButtonRef = useRef(null);
  const cvMenuRef = useRef(null);
  const cvButtonRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const switchToUserView = () => {
    navigate('/');
    window.location.reload();
  };

  const switchToHRView = () => {
    navigate('/hr/dashboard');
    window.location.reload();
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

  // Xác định class cho navbar khi ở auth page
  const getNavbarClass = () => {
    if (isAuthPage) {
      return 'absolute top-0 left-0 right-0 z-50 bg-transparent';
    }
    return `sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm' 
        : 'bg-white'
    }`;
  };

  const getTopBarClass = () => {
    if (isAuthPage) {
      return 'bg-transparent text-white py-2 px-4 text-sm';
    }
    return 'bg-gradient-to-r from-blue-600 to-blue-800 text-white py-1.5 px-4 text-sm';
  };

  // ========== HR NAVBAR ==========
  if (isAuthenticated() && (userRole === 'hr' || userRole === 'admin')) {
    return (
      <>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-1.5 px-4 text-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span>🏢 HR Management Portal</span>
              <span className="text-blue-200">|</span>
              <span>Đà Nẵng</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-blue-100">Hotline: 1900 1234</span>
              <span className="text-blue-200">|</span>
              <span className="flex items-center space-x-1">
                <EnvelopeIcon className="h-4 w-4" />
                <span>hr@danangwork.vn</span>
              </span>
            </div>
          </div>
        </div>

        <nav className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/hr/dashboard" className="flex items-center space-x-3 group">
                <img src={logo} alt="ĐANANG WORK" className="h-10 w-10 object-contain" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    ĐANANG WORK
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <SparklesIcon className="h-3 w-3 text-yellow-500 mr-1" />
                    HR Management
                  </span>
                </div>
              </Link>

              <div className="hidden lg:flex items-center space-x-1">
                <Link to="/hr/dashboard" className={`px-4 py-2 rounded-lg text-sm font-medium transition ${location.pathname === '/hr/dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Tổng quan
                </Link>
                <Link to="/hr/jobs" className={`px-4 py-2 rounded-lg text-sm font-medium transition ${location.pathname.includes('/hr/jobs') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Quản lý tin
                </Link>
                <Link to="/hr/applications" className={`px-4 py-2 rounded-lg text-sm font-medium transition ${location.pathname.includes('/hr/applications') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Ứng viên
                </Link>
                <Link to="/hr/interviews" className={`px-4 py-2 rounded-lg text-sm font-medium transition ${location.pathname.includes('/hr/interviews') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Phỏng vấn
                </Link>
                <Link to="/hr/candidates" className={`px-4 py-2 rounded-lg text-sm font-medium transition ${location.pathname.includes('/hr/candidates') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Tìm CV
                </Link>
              </div>

              <div className="flex items-center space-x-3">
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <BellIcon className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                      {notifications}
                    </span>
                  )}
                </button>

                <div className="relative" ref={profileRef}>
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'H'}
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-gray-700">
                      {user?.name?.split(' ')[0] || 'HR'}
                    </span>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
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
                              Nhà tuyển dụng
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <MenuItem to="/hr/company/profile" icon={BuildingOfficeIcon} label="Hồ sơ công ty" />
                        <MenuItem to="/hr/jobs" icon={BriefcaseIcon} label="Quản lý tin tuyển dụng" />
                        <MenuItem to="/hr/applications" icon={ClipboardDocumentListIcon} label="Quản lý ứng viên" />
                        <MenuItem to="/hr/interviews" icon={CalendarIcon} label="Lịch phỏng vấn" />
                        <MenuItem to="/hr/candidates" icon={MagnifyingGlassIcon} label="Tìm kiếm CV" />
                        <div className="border-t border-gray-100 my-2"></div>
                        <MenuItem to="/hr/settings" icon={CogIcon} label="Cài đặt" />
                        <button onClick={switchToUserView} className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition-colors">
                          <div className="w-8 flex justify-center"><UserCircleIcon className="h-5 w-5" /></div>
                          <span className="font-medium">Chuyển sang giao diện Ứng viên</span>
                        </button>
                        <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
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
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }

  // ========== USER NAVBAR ==========
  return (
    <>
      {/* Top Bar */}
      <div className={getTopBarClass()}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPinIcon className="h-4 w-4" />
              <span>Đà Nẵng</span>
            </div>
            {!isAuthPage && <span className="text-white/30">|</span>}
            {!isAuthPage && <span>🌤 28°C</span>}
          </div>
          <div className="flex items-center space-x-4">
            <span className={isAuthPage ? 'text-white/80' : 'text-white'}>Hotline: 1900 1234</span>
            {!isAuthPage && <span className="text-white/30">|</span>}
            <span className={`flex items-center space-x-1 ${isAuthPage ? 'text-white/80' : 'text-white'}`}>
              <EnvelopeIcon className="h-4 w-4" />
              <span>support@danangwork.vn</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={getNavbarClass()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img src={logo} alt="ĐANANG WORK" className="h-10 w-10 object-contain" />
              <div className="flex flex-col">
                <span className={`text-lg font-bold ${isAuthPage ? 'text-white' : 'bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'}`}>
                  ĐANANG WORK
                </span>
                <span className={`text-xs flex items-center ${isAuthPage ? 'text-white/70' : 'text-gray-500'}`}>
                  <SparklesIcon className="h-3 w-3 text-yellow-500 mr-1" />
                  Tìm việc thông minh tại Đà Nẵng
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Chỉ hiển thị khi không ở auth page */}
            {!isAuthPage && (
              <div className="hidden lg:flex items-center space-x-1">
                <Link to="/" className={`px-4 py-2 rounded-full text-sm font-medium transition ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Trang chủ
                </Link>
                <Link to="/jobs" className={`px-4 py-2 rounded-full text-sm font-medium transition ${isActive('/jobs') ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Việc làm
                </Link>

                <div className="relative" ref={companyMenuRef} onMouseEnter={handleMouseEnterCompany} onMouseLeave={handleMouseLeaveCompany}>
                  <button ref={companyButtonRef} className={`px-4 py-2 rounded-full text-sm font-medium transition ${location.pathname.includes('/companies') || location.pathname === '/top-companies' || location.pathname === '/company-reviews' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                    Công ty
                  </button>
                  {isCompanyMenuOpen && (
                    <div ref={companyMenuRef} className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                      <Link to="/top-companies" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600" onClick={() => setIsCompanyMenuOpen(false)}>
                        <StarIcon className="h-5 w-5" /><span>Top công ty</span>
                      </Link>
                      <Link to="/company-reviews" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600" onClick={() => setIsCompanyMenuOpen(false)}>
                        <ChatBubbleLeftIcon className="h-5 w-5" /><span>Review công ty</span>
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/trends" className={`px-4 py-2 rounded-full text-sm font-medium transition ${isActive('/trends') ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Xu hướng
                </Link>
                <Link to="/guide" className={`px-4 py-2 rounded-full text-sm font-medium transition ${isActive('/guide') ? 'text-pink-600 bg-pink-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Hướng dẫn
                </Link>

                <div className="relative" ref={cvMenuRef} onMouseEnter={handleMouseEnterCV} onMouseLeave={handleMouseLeaveCV}>
                  <button ref={cvButtonRef} className={`px-4 py-2 rounded-full text-sm font-medium transition ${location.pathname.includes('/create-cv') || location.pathname === '/cv-styles' || location.pathname === '/cv-industries' || location.pathname === '/cv-guide' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                    Tạo CV
                  </button>
                  {isCVMenuOpen && (
                    <div ref={cvMenuRef} className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                      <Link to="/create-cv" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600" onClick={() => setIsCVMenuOpen(false)}>
                        <DocumentTextIcon className="h-5 w-5" /><span>✨ Tạo CV Online</span>
                      </Link>
                      <Link to="/cv-styles" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600" onClick={() => setIsCVMenuOpen(false)}>
                        <PaintBrushIcon className="h-5 w-5" /><span>🎨 CV Theo Phong Cách</span>
                      </Link>
                      <Link to="/cv-industries" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600" onClick={() => setIsCVMenuOpen(false)}>
                        <BriefcaseIcon className="h-5 w-5" /><span>💼 CV Theo Ngành Nghề</span>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link to="/cv-guide" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600" onClick={() => setIsCVMenuOpen(false)}>
                        <AcademicCapIcon className="h-5 w-5" /><span>📖 Hướng Dẫn Viết CV</span>
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/support" className={`px-4 py-2 rounded-full text-sm font-medium transition ${isActive('/support') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Hỗ trợ
                </Link>
              </div>
            )}

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {!isAuthPage && (
                <>
                  <button onClick={() => navigate('/notifications')} className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <BellIcon className="h-5 w-5" />
                    {notifications > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">{notifications}</span>}
                  </button>
                  <button onClick={() => navigate('/saved-jobs')} className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <HeartIcon className="h-5 w-5" />
                    {savedJobs > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 bg-pink-500 text-white text-xs flex items-center justify-center rounded-full">{savedJobs}</span>}
                  </button>
                </>
              )}

              {isAuthenticated() ? (
                <div className="relative" ref={profileRef}>
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className={`flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-gray-700">{user?.name?.split(' ')[0]}</span>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl py-2 border border-gray-100 z-50">
                      <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                        <div className="flex items-center space-x-3">
                          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                            <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                              {user?.role === 'hr' ? 'Nhà tuyển dụng' : 'Người tìm việc'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-100">
                        <div className="text-center"><div className="text-lg font-bold text-blue-600">0</div><div className="text-xs text-gray-500">Đã ứng tuyển</div></div>
                        <div className="text-center"><div className="text-lg font-bold text-green-600">{savedJobs}</div><div className="text-xs text-gray-500">Đã lưu</div></div>
                        <div className="text-center"><div className="text-lg font-bold text-purple-600">0</div><div className="text-xs text-gray-500">Phỏng vấn</div></div>
                      </div>
                      
                      <div className="py-2">
                        <MenuItem to="/profile" icon={UserCircleIcon} label="Hồ sơ cá nhân" />
                        <MenuItem to="/create-cv" icon={DocumentTextIcon} label="Tạo CV" highlight />
                        <MenuItem to="/applications" icon={BriefcaseIcon} label="Đơn ứng tuyển" />
                        <MenuItem to="/saved-jobs" icon={HeartIcon} label="Việc làm đã lưu" badge={savedJobs} />
                        <MenuItem to="/notifications" icon={BellIcon} label="Thông báo" badge={notifications} />
                        
                        {user?.role === 'hr' && (
                          <>
                            <div className="border-t border-gray-100 my-2"></div>
                            <button onClick={switchToHRView} className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-purple-600 hover:bg-purple-50">
                              <BuildingOfficeIcon className="h-5 w-5" /><span>Chuyển sang giao diện HR</span>
                            </button>
                          </>
                        )}
                        
                        <div className="border-t border-gray-100 my-2"></div>
                        <MenuItem to="/settings" icon={CogIcon} label="Cài đặt" />
                        <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className={`px-4 py-2 text-sm font-medium rounded-lg transition ${isAuthPage ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}>Đăng nhập</Link>
                  <Link to="/register" className={`px-4 py-2 text-sm font-medium rounded-lg transition ${isAuthPage ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}>Đăng ký</Link>
                </div>
              )}

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`lg:hidden p-2 rounded-lg transition ${isAuthPage ? 'text-white hover:bg-white/20' : 'text-gray-600 hover:bg-gray-100'}`}>
                {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && !isAuthPage && (
            <div className="lg:hidden mt-4 py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-2">
                <Link to="/" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Trang chủ</Link>
                <Link to="/jobs" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Việc làm</Link>
                <Link to="/top-companies" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Công ty</Link>
                <Link to="/trends" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Xu hướng</Link>
                <Link to="/guide" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Hướng dẫn</Link>
                <Link to="/create-cv" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Tạo CV</Link>
                <Link to="/support" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Hỗ trợ</Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;