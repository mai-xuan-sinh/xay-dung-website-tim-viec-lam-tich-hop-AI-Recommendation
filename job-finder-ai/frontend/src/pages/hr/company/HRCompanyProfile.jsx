// src/pages/hr/company/HRCompanyProfile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon, MapPinIcon, PhoneIcon, EnvelopeIcon,
  GlobeAltIcon, UsersIcon, CalendarIcon, DocumentTextIcon,
  PencilIcon, CameraIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';

const HRCompanyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Mock data - sẽ thay bằng API sau
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockCompany = {
        id: 1,
        name: "FPT Software Đà Nẵng",
        logo: "https://via.placeholder.com/120",
        coverImage: "https://via.placeholder.com/1200x300",
        email: "hr@fptsoftware.com",
        phone: "0236 123 4567",
        website: "https://fptsoftware.com",
        address: "Tầng 5, Tòa nhà Indochina, 123 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
        established: "2010",
        size: "1000+",
        industry: "Công nghệ thông tin",
        description: "FPT Software là công ty hàng đầu trong lĩnh vực gia công phần mềm và chuyển đổi số. Với hơn 1000 nhân viên tại Đà Nẵng, chúng tôi luôn tìm kiếm những tài năng trẻ.",
        vision: "Trở thành công ty công nghệ hàng đầu khu vực",
        mission: "Cung cấp giải pháp công nghệ đột phá, tạo giá trị bền vững cho khách hàng",
        benefits: [
          "Môi trường làm việc chuyên nghiệp",
          "Lương thưởng hấp dẫn",
          "Bảo hiểm sức khỏe",
          "Du lịch hàng năm",
          "Đào tạo chuyên sâu"
        ],
        socialMedia: {
          facebook: "https://facebook.com/fptsoftware",
          linkedin: "https://linkedin.com/company/fpt-software"
        },
        stats: {
          totalJobs: 12,
          totalHired: 45,
          totalApplicants: 1560,
          rating: 4.5
        }
      };
      setCompany(mockCompany);
      setFormData(mockCompany);
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setCompany(formData);
    setEditing(false);
    // TODO: Gọi API cập nhật
    alert('Cập nhật thông tin thành công!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin công ty...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ công ty</h1>
            <p className="text-gray-500 mt-1">Quản lý thông tin công ty của bạn</p>
          </div>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PencilIcon className="h-5 w-5" />
              <span>Chỉnh sửa</span>
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Lưu thay đổi
              </button>
            </div>
          )}
        </div>

        {/* Cover Image & Logo */}
        <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            {editing && (
              <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/30">
                <CameraIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
              <BuildingOfficeIcon className="h-12 w-12 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="ml-28">
            {!editing ? (
              <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
            ) : (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
            )}
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {!editing ? company.address : (
                  <input type="text" name="address" value={formData.address} onChange={handleChange} className="border-b border-gray-300 focus:outline-none" />
                )}
              </span>
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Thành lập: {!editing ? company.established : (
                  <input type="text" name="established" value={formData.established} onChange={handleChange} className="border-b border-gray-300 focus:outline-none w-20" />
                )}
              </span>
              <span className="flex items-center">
                <UsersIcon className="h-4 w-4 mr-1" />
                Quy mô: {!editing ? company.size : (
                  <input type="text" name="size" value={formData.size} onChange={handleChange} className="border-b border-gray-300 focus:outline-none w-24" />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📞 Thông tin liên hệ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                {!editing ? (
                  <p className="text-gray-900">{company.email}</p>
                ) : (
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="border-b border-gray-300 focus:outline-none" />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Điện thoại</p>
                {!editing ? (
                  <p className="text-gray-900">{company.phone}</p>
                ) : (
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="border-b border-gray-300 focus:outline-none" />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <GlobeAltIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Website</p>
                {!editing ? (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {company.website}
                  </a>
                ) : (
                  <input type="url" name="website" value={formData.website} onChange={handleChange} className="border-b border-gray-300 focus:outline-none" />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Ngành nghề</p>
                {!editing ? (
                  <p className="text-gray-900">{company.industry}</p>
                ) : (
                  <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="border-b border-gray-300 focus:outline-none" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📝 Giới thiệu công ty</h2>
          {!editing ? (
            <p className="text-gray-600 leading-relaxed">{company.description}</p>
          ) : (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          )}
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">🎯 Tầm nhìn</h2>
            {!editing ? (
              <p className="text-gray-600">{company.vision}</p>
            ) : (
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">🚀 Sứ mệnh</h2>
            {!editing ? (
              <p className="text-gray-600">{company.mission}</p>
            ) : (
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎁 Phúc lợi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {company.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">{company.stats.totalJobs}</p>
            <p className="text-xs text-gray-500">Tin tuyển dụng</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{company.stats.totalHired}</p>
            <p className="text-xs text-gray-500">Đã tuyển</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-purple-600">{company.stats.totalApplicants}</p>
            <p className="text-xs text-gray-500">Ứng viên</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-yellow-600">{company.stats.rating}</p>
            <p className="text-xs text-gray-500">Đánh giá</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRCompanyProfile;