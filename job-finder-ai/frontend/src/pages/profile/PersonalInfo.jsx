// frontend/src/pages/profile/PersonalInfo.jsx
import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

const PersonalInfo = ({ user }) => {
  if (!user) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin cá nhân</h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <UserIcon className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Họ và tên</p>
            <p className="text-gray-900 font-medium">{user.name || 'Chưa cập nhật'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <EnvelopeIcon className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900 font-medium">{user.email || 'Chưa cập nhật'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Số điện thoại</p>
            <p className="text-gray-900 font-medium">{user.phone || 'Chưa cập nhật'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Địa chỉ</p>
            <p className="text-gray-900 font-medium">{user.address || 'Chưa cập nhật'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Ngày tham gia</p>
            <p className="text-gray-900 font-medium">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
            </p>
          </div>
        </div>
      </div>
      
      {user.bio && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Giới thiệu bản thân</p>
          <p className="text-gray-700">{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;