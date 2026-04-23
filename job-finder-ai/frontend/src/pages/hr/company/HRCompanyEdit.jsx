// src/pages/hr/company/HRCompanyEdit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, BuildingOfficeIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, UsersIcon, CalendarIcon } from '@heroicons/react/24/outline';

const HRCompanyEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    established: '',
    size: '',
    industry: '',
    description: '',
    vision: '',
    mission: ''
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFormData({
        name: "FPT Software Đà Nẵng",
        email: "hr@fptsoftware.com",
        phone: "0236 123 4567",
        website: "https://fptsoftware.com",
        address: "Tầng 5, Tòa nhà Indochina, 123 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
        established: "2010",
        size: "1000+",
        industry: "Công nghệ thông tin",
        description: "FPT Software là công ty hàng đầu trong lĩnh vực gia công phần mềm...",
        vision: "Trở thành công ty công nghệ hàng đầu khu vực",
        mission: "Cung cấp giải pháp công nghệ đột phá, tạo giá trị bền vững cho khách hàng"
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Cập nhật thông tin thành công!');
      navigate('/hr/company/profile');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/hr/company/profile')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Quay lại</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
            <h1 className="text-2xl font-bold text-white">Chỉnh sửa hồ sơ công ty</h1>
            <p className="text-blue-100 mt-1">Cập nhật thông tin công ty của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên công ty *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngành nghề</label>
                <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Năm thành lập</label>
                <input type="text" name="established" value={formData.established} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quy mô công ty</label>
                <input type="text" name="size" value={formData.size} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <textarea name="address" rows="2" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu công ty</label>
                <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tầm nhìn</label>
                <textarea name="vision" rows="3" value={formData.vision} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sứ mệnh</label>
                <textarea name="mission" rows="3" value={formData.mission} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={() => navigate('/hr/company/profile')} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Hủy
              </button>
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HRCompanyEdit;