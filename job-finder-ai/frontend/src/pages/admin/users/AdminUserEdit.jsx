// src/pages/admin/users/AdminUserEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active'
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFormData({
        name: id === '1' ? "Nguyễn Văn A" : "Trần Thị B",
        email: id === '1' ? "nguyenvana@email.com" : "tranthib@email.com",
        phone: id === '1' ? "0912345678" : "0987654321",
        role: "user",
        status: "active"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cập nhật thông tin thành công!');
    navigate(`/admin/users/${id}`);
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>;
  }

  return (
    <div>
      <button onClick={() => navigate(`/admin/users/${id}`)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5" /> Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Chỉnh sửa người dùng</h1>
        
        <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
            <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="user">Ứng viên</option>
              <option value="hr">Nhà tuyển dụng</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="active">Hoạt động</option>
              <option value="inactive">Đã khóa</option>
              <option value="pending">Chờ duyệt</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Lưu thay đổi</button>
            <button type="button" onClick={() => navigate(`/admin/users/${id}`)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserEdit;