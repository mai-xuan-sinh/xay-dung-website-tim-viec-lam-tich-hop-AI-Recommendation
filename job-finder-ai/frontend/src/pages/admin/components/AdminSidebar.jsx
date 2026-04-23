// src/pages/admin/components/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon, UsersIcon, BriefcaseIcon, BuildingOfficeIcon,
  ChartBarIcon, ArrowRightOnRectangleIcon, ChatBubbleLeftRightIcon  
} from '@heroicons/react/24/outline';

const Sidebar = ({ isHovered, setIsHovered }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const menuItems = [
    { path: '/admin/dashboard', name: 'Tổng quan', icon: HomeIcon, color: 'blue' },
    { path: '/admin/users', name: 'Quản lý người dùng', icon: UsersIcon, color: 'green' },
    { path: '/admin/jobs', name: 'Quản lý tin tuyển dụng', icon: BriefcaseIcon, color: 'orange' },
    { path: '/admin/companies', name: 'Quản lý công ty', icon: BuildingOfficeIcon, color: 'purple' },
    { path: '/admin/reports', name: 'Báo cáo & Thống kê', icon: ChartBarIcon, color: 'red' },
    { path: '/admin/support', name: 'Hỗ trợ khách hàng', icon: ChatBubbleLeftRightIcon, color: 'green' }  // ✅ THÊM DÒNG NÀY
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-50 transition-all duration-300 ease-in-out flex flex-col ${
        isHovered ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Area */}
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white font-bold text-xl">DW</span>
          </div>
          <span className={`font-bold text-white text-base transition-all duration-300 whitespace-nowrap ${
            isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
          }`}>
            DANANG WORK
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                ${active 
                  ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-white shadow-lg border border-red-500/30' 
                  : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }
                ${!isHovered ? 'justify-center' : ''}
              `}
            >
              <Icon className={`h-5 w-5 transition-transform duration-200 flex-shrink-0 ${
                hoveredItem === item.path ? 'scale-110' : ''
              }`} />
              <span className={`text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              }`}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className={`flex items-center gap-3 mb-4 p-3 bg-gray-700/50 rounded-xl transition-all duration-200 ${
          !isHovered ? 'justify-center' : ''
        }`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
            A
          </div>
          <div className={`transition-all duration-200 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
            <p className="text-sm font-semibold text-white whitespace-nowrap">Quản trị viên</p>
            <p className="text-xs text-gray-400 whitespace-nowrap">admin@danangwork.vn</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-red-500/20 transition-all duration-200 group ${
            !isHovered ? 'justify-center' : ''
          }`}
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 group-hover:scale-110 transition flex-shrink-0" />
          <span className={`text-sm transition-all duration-200 whitespace-nowrap ${
            isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
          }`}>
            Đăng xuất
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;