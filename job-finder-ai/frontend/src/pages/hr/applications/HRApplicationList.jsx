// frontend/src/pages/hr/applications/HRApplicationList.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, EyeIcon, ChevronDownIcon,
  UserGroupIcon, SparklesIcon, CalendarIcon,
  CheckCircleIcon, XCircleIcon, ClockIcon,
  FunnelIcon, ArrowPathIcon, DocumentTextIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import api, { SOCKET_URL } from '../../../services/api';
import io from 'socket.io-client';
import { useAuth } from '../../../context/AuthContext';

const HRApplicationList = () => {
  const { jobId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('appliedDate');
  const [jobInfo, setJobInfo] = useState(null);
  const [notification, setNotification] = useState(null);
  const socketRef = useRef(null);

  // Socket.IO connection
  useEffect(() => {
    if (user && user.id) {
      socketRef.current = io(SOCKET_URL);
      
      socketRef.current.on('connect', () => {
        console.log('✅ Socket connected');
        socketRef.current.emit('join_hr', user.id);
      });
      
      socketRef.current.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error.message);
      });
      
      socketRef.current.on('new_application', (data) => {
        console.log('📢 New application received:', data);
        setNotification({
          message: data.message || `📢 Ứng viên mới cho vị trí "${data.jobTitle}"`,
          type: 'success'
        });
        setTimeout(() => setNotification(null), 5000);
        fetchApplications();
      });
      
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [user]);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/applications/hr/applications');
      console.log('📋 Applications response:', response.data);
      
      if (response.data.success) {
        setApplications(response.data.applications);
        
        const apps = response.data.applications;
        if (apps.length > 0) {
          const avgQuiz = Math.round(apps.reduce((sum, a) => sum + (a.quizScore || 0), 0) / apps.length);
          const avgMatch = Math.round(apps.reduce((sum, a) => sum + (a.matchScore || 0), 0) / apps.length);
          
          setJobInfo({
            id: jobId || 'all',
            title: apps[0]?.jobTitle || 'Tất cả tin',
            company: apps[0]?.companyName || '',
            totalApplicants: apps.length,
            avgQuizScore: avgQuiz,
            avgMatchScore: avgMatch
          });
        }
      }
    } catch (error) {
      console.error('❌ Fetch applications error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

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
    const matchesSearch = searchTerm === '' || 
      app.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.candidateEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'quizScore') return (b.quizScore || 0) - (a.quizScore || 0);
    if (sortBy === 'matchScore') return (b.matchScore || 0) - (a.matchScore || 0);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewed: applications.filter(a => a.status === 'reviewed').length,
    interview: applications.filter(a => a.status === 'interview').length,
    hired: applications.filter(a => a.status === 'hired').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    avgQuiz: applications.length > 0 
      ? Math.round(applications.reduce((sum, a) => sum + (a.quizScore || 0), 0) / applications.length)
      : 0,
    avgMatch: applications.length > 0
      ? Math.round(applications.reduce((sum, a) => sum + (a.matchScore || 0), 0) / applications.length)
      : 0
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
        
        {/* Thông báo */}
        {notification && (
          <div className="fixed top-20 right-6 z-50 animate-bounce">
            <div className="bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
              <BellIcon className="h-5 w-5" />
              <span>{notification.message}</span>
              <button 
                onClick={() => setNotification(null)}
                className="ml-2 text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý ứng viên</h1>
              {jobInfo && (
                <p className="text-gray-500 mt-1">
                  Tổng cộng: <span className="font-semibold text-blue-600">{stats.total}</span> ứng viên
                </p>
              )}
            </div>
            <button
              onClick={fetchApplications}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Làm mới
            </button>
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
                placeholder="Tìm kiếm theo tên, email, công việc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {['all', 'pending', 'reviewed', 'interview', 'hired', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'Tất cả' : getStatusBadge(status).text}
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
                <option value="appliedDate">Mới nhất</option>
                <option value="quizScore">Điểm Quiz cao nhất</option>
                <option value="matchScore">Độ phù hợp cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Tìm thấy <span className="font-semibold text-gray-900">{sortedApplications.length}</span> ứng viên
          </p>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {sortedApplications.map((app) => {
            const status = getStatusBadge(app.status);
            return (
              <div key={app._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {app.candidateName?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <Link to={`/hr/applications/${app._id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                          {app.candidateName}
                        </Link>
                        <p className="text-sm text-gray-500">{app.candidateEmail} • {app.candidatePhone || 'Chưa có SĐT'}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                          <span>💼 {app.jobTitle}</span>
                          <span>📅 {new Date(app.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <SparklesIcon className="h-4 w-4 text-yellow-500" />
                          <span className="text-xs text-gray-500">Quiz</span>
                        </div>
                        <p className={`text-xl font-bold ${getScoreColor(app.quizScore || 0)}`}>{app.quizScore || 0}%</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <CheckCircleIcon className="h-4 w-4 text-blue-500" />
                          <span className="text-xs text-gray-500">Phù hợp</span>
                        </div>
                        <p className={`text-xl font-bold ${getScoreColor(app.matchScore || 0)}`}>{app.matchScore || 0}%</p>
                      </div>

                      <div className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/hr/applications/${app._id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      Xem chi tiết
                    </Link>
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
            <p className="text-sm text-gray-400 mt-1">Hãy đăng tin tuyển dụng để thu hút ứng viên</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRApplicationList;