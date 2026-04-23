// src/pages/hr/jobs/HRJobDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, MapPinIcon, CurrencyDollarIcon, 
  CalendarIcon, EyeIcon, UserGroupIcon, 
  BuildingOfficeIcon, BriefcaseIcon, DocumentTextIcon,
  CheckCircleIcon, XCircleIcon, PencilIcon, TrashIcon,
  ClockIcon, SparklesIcon
} from '@heroicons/react/24/outline';

const HRJobDetail = () => {
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
        level: "Junior - Middle",
        description: "Phát triển giao diện người dùng với ReactJS, làm việc với team Agile",
        requirements: [
          "Thành thạo HTML5, CSS3, JavaScript",
          "Có kinh nghiệm với ReactJS và các thư viện liên quan",
          "Hiểu biết về RESTful API",
          "Tối ưu hiệu suất website"
        ],
        benefits: [
          "Lương tháng 13, thưởng dự án",
          "Bảo hiểm sức khỏe",
          "Đào tạo chuyên sâu",
          "Môi trường trẻ trung, năng động"
        ],
        skills: ["React", "JavaScript", "HTML/CSS", "Redux"],
        views: 234,
        applications: 12,
        status: "active",
        postedDate: "2024-03-15",
        deadline: "2024-04-15"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa tin tuyển dụng này?')) {
      alert('Đã xóa tin tuyển dụng');
      navigate('/hr/jobs');
    }
  };

  const handleToggleStatus = () => {
    const newStatus = job.status === 'active' ? 'closed' : 'active';
    setJob({ ...job, status: newStatus });
    alert(`Đã ${newStatus === 'active' ? 'mở lại' : 'đóng'} tin tuyển dụng`);
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/hr/jobs')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Quay lại danh sách</span>
          </button>
          <div className="flex items-center space-x-3">
            <Link
              to={`/hr/jobs/${job.id}/edit`}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <PencilIcon className="h-4 w-4" />
              <span>Chỉnh sửa</span>
            </Link>
            <button
              onClick={handleToggleStatus}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                job.status === 'active'
                  ? 'border border-yellow-600 text-yellow-600 hover:bg-yellow-50'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {job.status === 'active' ? (
                <>
                  <XCircleIcon className="h-4 w-4" />
                  <span>Đóng tin</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>Mở lại</span>
                </>
              )}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
            >
              <TrashIcon className="h-4 w-4" />
              <span>Xóa</span>
            </button>
          </div>
        </div>

        {/* Job Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <BuildingOfficeIcon className="h-4 w-4" />
                {job.company}
              </p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                job.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {job.status === 'active' ? 'Đang tuyển' : 'Đã đóng'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPinIcon className="h-5 w-5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">{job.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BriefcaseIcon className="h-5 w-5" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ClockIcon className="h-5 w-5" />
              <span>{job.experience}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{job.views}</p>
              <p className="text-xs text-gray-500">Lượt xem</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{job.applications}</p>
              <p className="text-xs text-gray-500">Ứng viên</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round((job.applications / job.views) * 100) || 0}%
              </p>
              <p className="text-xs text-gray-500">Tỷ lệ ứng tuyển</p>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5 text-blue-600" />
              Mô tả công việc
            </h2>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">✅ Yêu cầu công việc</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">🎁 Quyền lợi</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {job.benefits.map((ben, idx) => (
                <li key={idx}>{ben}</li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">🛠️ Kỹ năng yêu cầu</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">📅 Thông tin thời gian</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ngày đăng</p>
                <p className="font-medium text-gray-900">{job.postedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hạn nộp hồ sơ</p>
                <p className="font-medium text-gray-900">{job.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Còn lại</p>
                <p className="font-medium text-gray-900">
                  {Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24))} ngày
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <Link
            to={`/hr/jobs/${job.id}/applications`}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Xem danh sách ứng viên
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HRJobDetail;