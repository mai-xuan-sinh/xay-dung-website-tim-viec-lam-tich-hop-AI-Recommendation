// src/pages/hr/applications/HRApplicationList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, EyeIcon, ChevronDownIcon,
  UserGroupIcon, SparklesIcon, CalendarIcon,
  CheckCircleIcon, XCircleIcon, ClockIcon,
  FunnelIcon, ArrowPathIcon, DocumentTextIcon
} from '@heroicons/react/24/outline';

const HRApplicationList = () => {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('quizScore');
  const [jobInfo, setJobInfo] = useState(null);

  // Mock data - sẽ thay bằng API sau
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setJobInfo({
        id: jobId || 1,
        title: "Frontend Developer (React)",
        company: "FPT Software",
        totalApplicants: 45,
        avgQuizScore: 74,
        avgMatchScore: 68
      });

      const mockApplications = [
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@email.com",
          phone: "0912345678",
          appliedDate: "2024-03-15",
          status: "pending",
          quizScore: 85,
          matchScore: 92,
          experience: "3 năm",
          education: "Đại học Bách Khoa Đà Nẵng",
          skills: ["React", "JavaScript", "TypeScript"],
          cvUrl: "/cv/nguyen-van-a.pdf"
        },
        {
          id: 2,
          name: "Trần Thị B",
          email: "tranthib@email.com",
          phone: "0987654321",
          appliedDate: "2024-03-14",
          status: "reviewed",
          quizScore: 78,
          matchScore: 88,
          experience: "2 năm",
          education: "Đại học Duy Tân",
          skills: ["React", "Vue.js", "JavaScript"],
          cvUrl: "/cv/tran-thi-b.pdf"
        },
        {
          id: 3,
          name: "Lê Văn C",
          email: "levanc@email.com",
          phone: "0905123456",
          appliedDate: "2024-03-13",
          status: "interview",
          quizScore: 92,
          matchScore: 95,
          experience: "4 năm",
          education: "Đại học Bách Khoa Đà Nẵng",
          skills: ["React", "Next.js", "TypeScript", "Node.js"],
          cvUrl: "/cv/le-van-c.pdf"
        },
        {
          id: 4,
          name: "Phạm Thị D",
          email: "phamthid@email.com",
          phone: "0933123456",
          appliedDate: "2024-03-12",
          status: "hired",
          quizScore: 88,
          matchScore: 90,
          experience: "5 năm",
          education: "Đại học Sư phạm",
          skills: ["React", "Angular", "JavaScript"],
          cvUrl: "/cv/pham-thi-d.pdf"
        },
        {
          id: 5,
          name: "Hoàng Văn E",
          email: "hoangvane@email.com",
          phone: "0977123456",
          appliedDate: "2024-03-11",
          status: "rejected",
          quizScore: 45,
          matchScore: 52,
          experience: "1 năm",
          education: "Cao đẳng FPT",
          skills: ["HTML/CSS", "JavaScript"],
          cvUrl: "/cv/hoang-van-e.pdf"
        },
        {
          id: 6,
          name: "Ngô Thị F",
          email: "ngothif@email.com",
          phone: "0918234567",
          appliedDate: "2024-03-10",
          status: "pending",
          quizScore: 72,
          matchScore: 78,
          experience: "2 năm",
          education: "Đại học Đông Á",
          skills: ["React", "Redux", "TailwindCSS"],
          cvUrl: "/cv/ngo-thi-f.pdf"
        }
      ];
      setApplications(mockApplications);
      setLoading(false);
    }, 500);
  }, [jobId]);

  const statusOptions = [
    { value: 'all', label: 'Tất cả', icon: null, color: 'gray' },
    { value: 'pending', label: 'Chờ xử lý', icon: ClockIcon, color: 'yellow' },
    { value: 'reviewed', label: 'Đã xem', icon: EyeIcon, color: 'blue' },
    { value: 'interview', label: 'Phỏng vấn', icon: CalendarIcon, color: 'purple' },
    { value: 'hired', label: 'Đã nhận', icon: CheckCircleIcon, color: 'green' },
    { value: 'rejected', label: 'Từ chối', icon: XCircleIcon, color: 'red' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
      reviewed: { text: "Đã xem", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
      interview: { text: "Phỏng vấn", color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
      hired: { text: "Đã nhận", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
      rejected: { text: "Từ chối", color: "bg-red-100 text-red-700", dot: "bg-red-500" }
    };
    return badges[status] || badges.pending;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'quizScore') return b.quizScore - a.quizScore;
    if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
    if (sortBy === 'appliedDate') return new Date(b.appliedDate) - new Date(a.appliedDate);
    return 0;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewed: applications.filter(a => a.status === 'reviewed').length,
    interview: applications.filter(a => a.status === 'interview').length,
    hired: applications.filter(a => a.status === 'hired').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    avgQuiz: Math.round(applications.reduce((sum, a) => sum + a.quizScore, 0) / applications.length),
    avgMatch: Math.round(applications.reduce((sum, a) => sum + a.matchScore, 0) / applications.length)
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải danh sách ứng viên...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý ứng viên</h1>
              {jobInfo && (
                <p className="text-gray-500 mt-1">
                  Tin tuyển dụng: <span className="font-semibold text-blue-600">{jobInfo.title}</span> - {jobInfo.company}
                </p>
              )}
            </div>
            <Link
              to="/hr/jobs"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              ← Quay lại danh sách tin
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-xs text-gray-500">Tổng ứng viên</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-xs text-gray-500">Chờ xử lý</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.reviewed}</p>
            <p className="text-xs text-gray-500">Đã xem</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.interview}</p>
            <p className="text-xs text-gray-500">Phỏng vấn</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
            <p className="text-xs text-gray-500">Đã nhận</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{stats.avgQuiz}%</p>
            <p className="text-xs text-gray-500">Quiz TB</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.avgMatch}%</p>
            <p className="text-xs text-gray-500">Phù hợp TB</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, kỹ năng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    statusFilter === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="quizScore">Điểm Quiz cao nhất</option>
                <option value="matchScore">Độ phù hợp cao nhất</option>
                <option value="appliedDate">Mới nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Tìm thấy <span className="font-semibold text-gray-900">{sortedApplications.length}</span> ứng viên
          </p>
          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600">
            <ArrowPathIcon className="h-4 w-4" />
            <span>Làm mới</span>
          </button>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {sortedApplications.map((app) => {
            const status = getStatusBadge(app.status);
            return (
              <div key={app.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left - Candidate Info */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {app.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <Link to={`/hr/applications/${app.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                          {app.name}
                        </Link>
                        <p className="text-sm text-gray-500">{app.email} • {app.phone}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                          <span>🎓 {app.education}</span>
                          <span>💼 {app.experience}</span>
                          <span>📅 {app.appliedDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {app.skills.map((skill, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Scores & Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center space-x-4">
                      {/* Quiz Score */}
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <SparklesIcon className="h-4 w-4 text-yellow-500" />
                          <span className="text-xs text-gray-500">Quiz</span>
                        </div>
                        <p className={`text-xl font-bold ${getScoreColor(app.quizScore)}`}>{app.quizScore}%</p>
                        <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                          <div className={`h-full rounded-full ${app.quizScore >= 70 ? 'bg-green-500' : app.quizScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${app.quizScore}%` }}></div>
                        </div>
                      </div>
                      
                      {/* Match Score */}
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <CheckCircleIcon className="h-4 w-4 text-blue-500" />
                          <span className="text-xs text-gray-500">Phù hợp</span>
                        </div>
                        <p className={`text-xl font-bold ${getScoreColor(app.matchScore)}`}>{app.matchScore}%</p>
                        <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${app.matchScore}%` }}></div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/hr/applications/${app.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        Xem chi tiết
                      </Link>
                      {app.status === 'pending' && (
                        <Link
                          to={`/hr/applications/${app.id}/review`}
                          className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm hover:bg-green-50 transition"
                        >
                          Duyệt hồ sơ
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sortedApplications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy ứng viên nào</p>
            <p className="text-sm text-gray-400 mt-1">Hãy thử thay đổi bộ lọc tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRApplicationList;