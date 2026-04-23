// src/pages/admin/users/AdminUserDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, PhoneIcon, CalendarIcon, LockClosedIcon, LockOpenIcon, TrashIcon } from '@heroicons/react/24/outline';

const AdminUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        id: parseInt(id),
        name: id === '1' ? "Nguyễn Văn A" : "Trần Thị B",
        email: id === '1' ? "nguyenvana@email.com" : "tranthib@email.com",
        phone: id === '1' ? "0912345678" : "0987654321",
        role: "user",
        status: "active",
        joinedAt: "2024-03-15",
        jobsApplied: 12,
        savedJobs: 5,
        skills: ["React", "JavaScript", "HTML/CSS", "Node.js"],
        bio: "Frontend Developer với 3 năm kinh nghiệm"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>;
  }

  if (!user) {
    return <div className="text-center py-12">Không tìm thấy người dùng</div>;
  }

  return (
    <div>
      <button onClick={() => navigate('/admin/users')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5" /> Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-blue-100">{user.role === 'hr' ? 'Nhà tuyển dụng' : 'Ứng viên'}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Thông tin liên hệ</h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-600"><EnvelopeIcon className="h-5 w-5" /> {user.email}</p>
                <p className="flex items-center gap-2 text-gray-600"><PhoneIcon className="h-5 w-5" /> {user.phone}</p>
                <p className="flex items-center gap-2 text-gray-600"><CalendarIcon className="h-5 w-5" /> Tham gia: {user.joinedAt}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Thống kê</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">{user.jobsApplied || 0}</p>
                  <p className="text-xs text-gray-500">Đã ứng tuyển</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">{user.savedJobs || 0}</p>
                  <p className="text-xs text-gray-500">Đã lưu</p>
                </div>
              </div>
            </div>
          </div>

          {user.skills && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Kỹ năng</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <LockClosedIcon className="h-5 w-5" /> Khóa tài khoản
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
              <TrashIcon className="h-5 w-5" /> Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;