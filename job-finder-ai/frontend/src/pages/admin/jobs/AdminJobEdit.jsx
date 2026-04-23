// src/pages/admin/jobs/AdminJobEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AdminJobEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    status: 'active'
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFormData({
        title: "Frontend Developer",
        company: "FPT Software",
        location: "Hải Châu",
        salary: "12-20M",
        status: "active"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cập nhật tin tuyển dụng thành công!');
    navigate(`/admin/jobs/${id}`);
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>;
  }

  return (
    <div>
      <button onClick={() => navigate(`/admin/jobs/${id}`)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5" /> Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Chỉnh sửa tin tuyển dụng</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
            <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mức lương</label>
            <input type="text" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="active">Đang tuyển</option>
              <option value="pending">Chờ duyệt</option>
              <option value="expired">Hết hạn</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Lưu thay đổi</button>
            <button type="button" onClick={() => navigate(`/admin/jobs/${id}`)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminJobEdit;