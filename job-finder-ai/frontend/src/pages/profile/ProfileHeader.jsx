import React from 'react';
import { UserCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const ProfileHeader = ({ user, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <button
              onClick={onEdit}
              className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <PencilSquareIcon className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
            {user?.profile?.title && (
              <p className="text-sm text-blue-600 mt-1">{user.profile.title}</p>
            )}
            <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
              user?.role === 'employer' 
                ? 'bg-purple-100 text-purple-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {user?.role === 'employer' ? 'Nhà tuyển dụng' : 'Người tìm việc'}
            </span>
          </div>
        </div>
        
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <PencilSquareIcon className="h-5 w-5" />
          <span>Chỉnh sửa hồ sơ</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;