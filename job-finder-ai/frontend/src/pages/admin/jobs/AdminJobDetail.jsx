// src/pages/admin/jobs/AdminJobDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon, CurrencyDollarIcon, BuildingOfficeIcon, CalendarIcon, EyeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const AdminJobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setJob({
        id: parseInt(id),
        title: "Frontend Developer (React)",
        company: "FPT Software",
        location: "Hải Châu",
        salary: "12-20M",
        type: "Full-time",
        experience: "1-3 năm",
        description: "Phát triển giao diện người dùng với ReactJS",
        requirements: ["React", "JavaScript", "HTML/CSS"],
        benefits: ["Lương tháng 13", "Bảo hiểm sức khỏe"],
        views: 234,
        applications: 12,
        status: "active",
        postedAt: "2024-03-15",
        deadline: "2024-04-15"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>;
  }

  return (
    <div>
      <button onClick={() => navigate('/admin/jobs')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5" /> Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-500 mt-1">{job.company}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 py-4 border-y border-gray-100">
            <div className="flex items-center gap-2 text-gray-600"><MapPinIcon className="h-5 w-5" /> {job.location}</div>
            <div className="flex items-center gap-2 text-gray-600"><CurrencyDollarIcon className="h-5 w-5" /> {job.salary}</div>
            <div className="flex items-center gap-2 text-gray-600"><BuildingOfficeIcon className="h-5 w-5" /> {job.type}</div>
            <div className="flex items-center gap-2 text-gray-600"><CalendarIcon className="h-5 w-5" /> HSD: {job.deadline}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{job.views}</p>
              <p className="text-xs text-gray-500">Lượt xem</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{job.applications}</p>
              <p className="text-xs text-gray-500">Ứng viên</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900">Mô tả công việc</h3>
            <p className="text-gray-600 mt-1">{job.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-900">Yêu cầu</h3>
            <ul className="list-disc list-inside mt-1 text-gray-600">
              {job.requirements?.map((req, idx) => <li key={idx}>{req}</li>)}
            </ul>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Duyệt tin</button>
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">Từ chối</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Chỉnh sửa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobDetail;