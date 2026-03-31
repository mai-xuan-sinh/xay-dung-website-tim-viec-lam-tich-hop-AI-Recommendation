/* ProfileMenu.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircleIcon, 
  BriefcaseIcon, 
  HeartIcon, 
  BellIcon, 
  CogIcon, 
  BuildingOfficeIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

const MenuItem = ({ to, icon: Icon, label, badge, highlight, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors rounded-xl mx-1 ${
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
      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
        {badge}
      </span>
    )}
  </Link>
);

const ProfileMenu = ({ user, savedJobs = 0, notifications = 0, onClose, onLogout }) => {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl py-2 border border-gray-100 z-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold border-2 border-white/30">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-14 w-14 rounded-full object-cover" />
            ) : (
              user?.name?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <div>
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-sm text-blue-100">{user?.email}</p>
            <span className="inline-block mt-1 text-xs px-3 py-0.5 bg-white/20 rounded-full">
              {user?.role === 'employer' ? 'Nhà tuyển dụng' : 'Người tìm việc'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-gray-100 bg-gray-50">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">0</div>
          <div className="text-xs text-gray-500">Ứng tuyển</div>
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
        <MenuItem to="/profile" icon={UserCircleIcon} label="Hồ sơ cá nhân" onClick={handleClick} />
        <MenuItem to="/applications" icon={BriefcaseIcon} label="Đơn ứng tuyển" onClick={handleClick} />
        <MenuItem to="/saved-jobs" icon={HeartIcon} label="Việc làm đã lưu" badge={savedJobs} onClick={handleClick} />
        <MenuItem to="/notifications" icon={BellIcon} label="Thông báo" badge={notifications} onClick={handleClick} />

        {user?.role === 'employer' && (
          <>
            <div className="border-t border-gray-100 my-2 mx-2"></div>
            <MenuItem to="/post-job" icon={BriefcaseIcon} label="Đăng tin tuyển dụng" highlight onClick={handleClick} />
            <MenuItem to="/manage-jobs" icon={BuildingOfficeIcon} label="Quản lý tin đăng" onClick={handleClick} />
          </>
        )}

        <div className="border-t border-gray-100 my-2 mx-2"></div>
        <MenuItem to="/settings" icon={CogIcon} label="Cài đặt" onClick={handleClick} />

        <button
          onClick={() => {
            onLogout();
            if (onClose) onClose();
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors mx-1 rounded-xl"
        >
          <div className="w-8 flex justify-center">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </div>
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;