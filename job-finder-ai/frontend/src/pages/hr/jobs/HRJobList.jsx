// src/pages/hr/jobs/HRJobList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, MagnifyingGlassIcon, PencilIcon, EyeIcon, 
  TrashIcon, DocumentDuplicateIcon, ChartBarIcon,
  ClockIcon, CheckCircleIcon, XCircleIcon, CalendarIcon,
  FunnelIcon, ArrowPathIcon
} from '@heroicons/react/24/outline';

const HRJobList = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  // Mock data - sẽ thay bằng API sau
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: "Frontend Developer (React)",
          company: "FPT Software",
          location: "Hải Châu",
          salary: "12-20M",
          type: "Full-time",
          experience: "1-3 năm",
          level: "Junior - Middle",
          status: "active",
          applicants: 45,
          views: 320,
          quizAvg: 74,
          postedDate: "2024-03-10",
          deadline: "2024-04-10",
          isHot: true,
          isFeatured: true
        },
        {
          id: 2,
          title: "Backend Developer (Node.js)",
          company: "Axon Active",
          location: "Ngũ Hành Sơn",
          salary: "15-25M",
          type: "Full-time",
          experience: "2-4 năm",
          level: "Middle",
          status: "active",
          applicants: 32,
          views: 245,
          quizAvg: 68,
          postedDate: "2024-03-12",
          deadline: "2024-04-12",
          isHot: true,
          isFeatured: false
        },
        {
          id: 3,
          title: "Fullstack Developer (Java/React)",
          company: "TMA Solutions",
          location: "Liên Chiểu",
          salary: "18-28M",
          type: "Full-time",
          experience: "3-5 năm",
          level: "Senior",
          status: "active",
          applicants: 28,
          views: 198,
          quizAvg: 71,
          postedDate: "2024-03-14",
          deadline: "2024-04-14",
          isHot: false,
          isFeatured: true
        },
        {
          id: 4,
          title: "UI/UX Designer",
          company: "DesignBold",
          location: "Hải Châu",
          salary: "12-18M",
          type: "Full-time",
          experience: "1-3 năm",
          level: "Junior - Middle",
          status: "expired",
          applicants: 22,
          views: 167,
          quizAvg: 65,
          postedDate: "2024-02-15",
          deadline: "2024-03-15",
          isHot: false,
          isFeatured: false
        },
        {
          id: 5,
          title: "DevOps Engineer",
          company: "Viettel",
          location: "Liên Chiểu",
          salary: "20-30M",
          type: "Full-time",
          experience: "2-4 năm",
          level: "Middle - Senior",
          status: "closed",
          applicants: 18,
          views: 134,
          quizAvg: 73,
          postedDate: "2024-02-20",
          deadline: "2024-03-20",
          isHot: false,
          isFeatured: false
        }
      ];
      setJobs(mockJobs);
      setLoading(false);
    }, 500);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'Tất cả', icon: null },
    { value: 'active', label: 'Đang tuyển', icon: CheckCircleIcon, color: 'text-green-600' },
    { value: 'expired', label: 'Hết hạn', icon: ClockIcon, color: 'text-yellow-600' },
    { value: 'closed', label: 'Đã đóng', icon: XCircleIcon, color: 'text-red-600' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: "Đang tuyển", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
      expired: { text: "Hết hạn", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
      closed: { text: "Đã đóng", color: "bg-red-100 text-red-700", dot: "bg-red-500" }
    };
    return badges[status] || badges.active;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setJobs(jobs.filter(j => j.id !== jobToDelete.id));
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const handleDuplicateJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now(),
      title: `${job.title} (Sao chép)`,
      postedDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applicants: 0,
      views: 0,
      status: 'active'
    };
    setJobs([newJob, ...jobs]);
  };

  const handleToggleSelect = (jobId) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(j => j.id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedJobs.length} tin tuyển dụng?`)) {
      setJobs(jobs.filter(j => !selectedJobs.includes(j.id)));
      setSelectedJobs([]);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-500`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải danh sách tin tuyển dụng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý tin tuyển dụng</h1>
            <p className="text-gray-500 mt-1">Quản lý tất cả tin tuyển dụng của công ty</p>
          </div>
          <Link
            to="/hr/jobs/create"
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Đăng tin mới</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatCard title="Tổng số tin" value={jobs.length} icon={DocumentDuplicateIcon} color="blue" />
          <StatCard title="Đang tuyển" value={jobs.filter(j => j.status === 'active').length} icon={CheckCircleIcon} color="green" />
          <StatCard title="Hết hạn" value={jobs.filter(j => j.status === 'expired').length} icon={ClockIcon} color="yellow" />
          <StatCard title="Đã đóng" value={jobs.filter(j => j.status === 'closed').length} icon={XCircleIcon} color="red" />
          <StatCard title="Tổng ứng viên" value={jobs.reduce((sum, j) => sum + j.applicants, 0)} icon={ChartBarIcon} color="purple" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề, công ty, địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex space-x-2">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {selectedJobs.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Xóa {selectedJobs.length} tin
              </button>
            )}
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Tin tuyển dụng</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Địa điểm</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Mức lương</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Ứng viên</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Quiz TB</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.map((job) => {
                  const status = getStatusBadge(job.status);
                  return (
                    <tr key={job.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => handleToggleSelect(job.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Link to={`/hr/jobs/${job.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                              {job.title}
                            </Link>
                            {job.isHot && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">🔥 Hot</span>
                            )}
                            {job.isFeatured && (
                              <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-600 text-xs rounded-full">⭐ Nổi bật</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{job.company}</p>
                          <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                            <span className="flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              HSD: {job.deadline}
                            </span>
                            <span className="flex items-center">
                              <EyeIcon className="h-3 w-3 mr-1" />
                              {job.views} lượt xem
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{job.location}</td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600">{job.salary}</td>
                      <td className="px-4 py-4 text-center text-sm font-semibold text-gray-700">{job.applicants}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <span className={`text-sm font-medium ${job.quizAvg >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {job.quizAvg}%
                          </span>
                          <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${job.quizAvg}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${status.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                            <span>{status.text}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Link
                            to={`/hr/jobs/${job.id}`}
                            className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                            title="Xem chi tiết"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/hr/jobs/${job.id}/edit`}
                            className="p-1.5 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50 transition"
                            title="Chỉnh sửa"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDuplicateJob(job)}
                            className="p-1.5 text-gray-500 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition"
                            title="Sao chép"
                          >
                            <DocumentDuplicateIcon className="h-5 w-5" />
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <DocumentDuplicateIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Không tìm thấy tin tuyển dụng nào</p>
              <Link to="/hr/jobs/create" className="mt-3 inline-block text-blue-600 hover:underline">
                Đăng tin tuyển dụng đầu tiên
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && jobToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa tin tuyển dụng <span className="font-semibold">"{jobToDelete.title}"</span>?
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRJobList;