import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
            <p className="mt-1 text-lg text-gray-900">{user?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vai trò</label>
            <p className="mt-1 text-lg text-gray-900">
              {user?.role === 'jobseeker' ? 'Người tìm việc' : 'Nhà tuyển dụng'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;