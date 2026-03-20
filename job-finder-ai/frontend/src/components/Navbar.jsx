import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  UserCircleIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  HomeIcon,
  BellIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  NewspaperIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  MapPinIcon,
  HeartIcon,
  CogIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [savedJobs, setSavedJobs] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Hàm lấy thông báo từ API
  const fetchNotifications = async () => {
    try {
      // TODO: Khi có API thực, gọi API để lấy số thông báo
      // const response = await api.get('/notifications/unread');
      // setNotifications(response.data.count);
      setNotifications(0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Hàm lấy số việc làm đã lưu
  const fetchSavedJobs = async () => {
    try {
      // TODO: Khi có API thực, gọi API để lấy số việc làm đã lưu
      // const response = await api.get('/saved-jobs/count');
      // setSavedJobs(response.data.count);
      setSavedJobs(0);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Nếu user đã đăng nhập, fetch dữ liệu
    if (isAuthenticated()) {
      fetchNotifications();
      fetchSavedJobs();
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated()]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Trang chủ', icon: HomeIcon, color: 'blue' },
    { to: '/jobs', label: 'Việc làm', icon: BriefcaseIcon, color: 'green' },
    { to: '/companies', label: 'Công ty', icon: BuildingOfficeIcon, color: 'purple' },
    { to: '/news', label: 'Tin tức', icon: NewspaperIcon, color: 'orange' },
    { to: '/guide', label: 'Hướng dẫn', icon: AcademicCapIcon, color: 'pink' },
    { to: '/support', label: 'Hỗ trợ', icon: QuestionMarkCircleIcon, color: 'red' },
  ];

  const isActive = (path) => location.pathname === path;

  const getLinkColor = (color, isActive) => {
    if (isActive) {
      const colors = {
        blue: 'text-blue-600 bg-blue-50',
        green: 'text-green-600 bg-green-50',
        purple: 'text-purple-600 bg-purple-50',
        orange: 'text-orange-600 bg-orange-50',
        pink: 'text-pink-600 bg-pink-50',
        red: 'text-red-600 bg-red-50',
      };
      return colors[color] || 'text-blue-600 bg-blue-50';
    }
    return 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';
  };

  // Menu Item Component
  const MenuItem = ({ to, icon: Icon, label, badge, highlight }) => (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
        highlight 
          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
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
          <div className="flex items-center justify-between">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-1.5 group ${
                      getLinkColor(link.color, active)
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                      active ? 'opacity-100' : 'opacity-70'
                    }`} />
                    <span>{link.label}</span>
                    {active && (
                      <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        link.color === 'blue' ? 'bg-blue-600' :
                        link.color === 'green' ? 'bg-green-600' :
                        link.color === 'purple' ? 'bg-purple-600' :
                        link.color === 'orange' ? 'bg-orange-600' :
                        link.color === 'pink' ? 'bg-pink-600' : 'bg-red-600'
                      }`}></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* Notifications - Thông báo ứng tuyển */}
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
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Thông báo
                </span>
              </button>

              {/* Saved Jobs - Đã lưu */}
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
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Việc đã lưu
                </span>
              </button>

              {isAuthenticated() ? (
                <>
                  {/* Profile */}
                  <div className="relative">
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

                    {/* Profile Menu */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl py-2 border border-gray-100 animate-fadeIn">
                        {/* User Info Card */}
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

                        {/* Stats Quick View */}
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

                        {/* Menu Items */}
                        <div className="py-2">
                          <MenuItem to="/profile" icon={UserCircleIcon} label="Hồ sơ cá nhân" badge={0} />
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
                </>
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
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(link.to)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* CSS Animations */}
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