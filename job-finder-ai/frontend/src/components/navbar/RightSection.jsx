/* RightSection.jsx */
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BellIcon, 
  HeartIcon, 
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import ProfileMenu from './ProfileMenu';

const RightSection = ({ 
  isAuthenticated, 
  user, 
  notifications = 0, 
  savedJobs = 0, 
  onLogout 
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Click outside để đóng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = () => navigate('/notifications');
  const handleSavedJobsClick = () => navigate('/saved-jobs');

  return (
    <div className="flex items-center space-x-3 flex-shrink-0">
      {/* Notifications */}
      <button 
        onClick={handleNotificationClick}
        className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 group"
        title="Thông báo"
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
        onClick={handleSavedJobsClick}
        className="relative p-2.5 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-300 group"
        title="Việc làm đã lưu"
      >
        <HeartIcon className="h-5 w-5" />
        {savedJobs > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-pink-500 text-white text-xs flex items-center justify-center rounded-full">
            {savedJobs > 99 ? '99+' : savedJobs}
          </span>
        )}
      </button>

      {isAuthenticated ? (
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-blue-200"
          >
            <div className="relative">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white" 
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white" />
            </div>

            <div className="hidden lg:flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">
                {user?.name?.split(' ')[0]}
              </span>
              <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {isProfileOpen && (
            <ProfileMenu 
              user={user}
              savedJobs={savedJobs}
              notifications={notifications}
              onClose={() => setIsProfileOpen(false)}
              onLogout={onLogout}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link 
            to="/login" 
            className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
          >
            Đăng nhập
          </Link>
          <Link 
            to="/register" 
            className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
};

export default RightSection;