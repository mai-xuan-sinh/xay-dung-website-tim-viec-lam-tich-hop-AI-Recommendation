// src/pages/admin/companies/AdminCompanyDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const AdminCompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCompany({
        id: parseInt(id),
        name: id === '1' ? "FPT Software" : "Axon Active",
        email: id === '1' ? "hr@fpt.com" : "hr@axon.com",
        phone: id === '1' ? "02361234567" : "02369876543",
        address: id === '1' ? "Hải Châu, Đà Nẵng" : "Ngũ Hành Sơn, Đà Nẵng",
        status: "active",
        joinedAt: "2024-01-15",
        jobsPosted: 12,
        description: "Công ty hàng đầu trong lĩnh vực phần mềm"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>;
  }

  return (
    <div>
      <button onClick={() => navigate('/admin/companies')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5" /> Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8">
          <h1 className="text-2xl font-bold text-white">{company.name}</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Thông tin liên hệ</h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-600"><EnvelopeIcon className="h-5 w-5" /> {company.email}</p>
                <p className="flex items-center gap-2 text-gray-600"><PhoneIcon className="h-5 w-5" /> {company.phone}</p>
                <p className="flex items-center gap-2 text-gray-600"><MapPinIcon className="h-5 w-5" /> {company.address}</p>
                <p className="flex items-center gap-2 text-gray-600"><CalendarIcon className="h-5 w-5" /> Tham gia: {company.joinedAt}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Thống kê</h3>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{company.jobsPosted}</p>
                <p className="text-xs text-gray-500">Tin tuyển dụng</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Giới thiệu</h3>
            <p className="text-gray-600">{company.description}</p>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Duyệt công ty</button>
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyDetail;