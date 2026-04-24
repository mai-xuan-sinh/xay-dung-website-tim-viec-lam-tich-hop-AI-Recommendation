// src/pages/hr/HRDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import io from 'socket.io-client';
import { 
  BriefcaseIcon, UserGroupIcon, EyeIcon, CheckCircleIcon,
  PlusIcon, DocumentTextIcon, ClockIcon, CalendarIcon,
  ArrowTrendingUpIcon, SparklesIcon, VideoCameraIcon,
  MapPinIcon, MegaphoneIcon, ShieldCheckIcon, RocketLaunchIcon,
  BellIcon
} from '@heroicons/react/24/outline';

// Import banner image
import bannerHR from '../../assets/Banner_HR.png';

// Banner component
const HRBanner = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg min-h-[200px] md:min-h-[250px]">
      {/* Ảnh banner */}
      <img 
        src={bannerHR} 
        alt="HR Banner - ĐANANG WORK" 
        className="w-full h-full object-cover absolute inset-0"
      />
      {/* Lớp phủ gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-transparent"></div>
      
      {/* Nội dung banner */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-10 py-8 md:py-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">ĐW</span>
            </div>
            <span className="text-white/80 text-sm font-medium">ĐANANG WORK</span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            NỀN TẢNG TUYỂN DỤNG <br />
            <span className="text-yellow-400">HÀNG ĐẦU ĐÀ NẴNG</span>
          </h1>
          
          <p className="text-white/90 text-sm md:text-base mb-4 max-w-xl">
            Kết nối với các nhà tuyển dụng hàng đầu Việt Nam
          </p>
          
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <BriefcaseIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-white text-sm">Hàng ngàn việc làm</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <ShieldCheckIcon className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm">Công ty uy tín</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <RocketLaunchIcon className="h-4 w-4 text-purple-400" />
              <span className="text-white text-sm">Hỗ trợ tuyển dụng</span>
            </div>
          </div>
          
          <Link
            to="/hr/jobs/create"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition shadow-md hover:scale-105 transform duration-200"
          >
            <PlusIcon className="h-5 w-5" />
            Đăng tin ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, change, onClick }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    indigo: "bg-indigo-50 text-indigo-600",
    pink: "bg-pink-50 text-pink-600",
    teal: "bg-teal-50 text-teal-600"
  };
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-xl ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <span className="text-xs text-green-600 flex items-center">
            <ArrowTrendingUpIcon className="h-3 w-3 mr-0.5" />
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{title}</p>
    </div>
  );
};

// Quick Action Card
const QuickAction = ({ title, description, icon: Icon, color, link, badge }) => {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-600",
    green: "from-green-50 to-green-100 border-green-200 text-green-600",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-600",
    orange: "from-orange-50 to-orange-100 border-orange-200 text-orange-600",
    indigo: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-600",
    yellow: "from-yellow-50 to-amber-50 border-yellow-200 text-yellow-600"
  };
  
  return (
    <Link
      to={link}
      className={`flex items-center justify-between p-4 bg-gradient-to-r ${colorClasses[color]} rounded-xl border hover:shadow-md transition group`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-white/50`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      {badge && (
        <span className="px-2 py-1 bg-white rounded-full text-xs font-semibold text-gray-600 shadow-sm">
          {badge}
        </span>
      )}
    </Link>
  );
};

// Recent Application Item
const RecentApplication = ({ application, onView }) => {
  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
      reviewed: { text: "Đã xem", color: "bg-blue-100 text-blue-700" },
      interview: { text: "Chờ PV", color: "bg-purple-100 text-purple-700" },
      hired: { text: "Đã nhận", color: "bg-green-100 text-green-700" },
      rejected: { text: "Từ chối", color: "bg-red-100 text-red-700" }
    };
    return badges[status] || badges.pending;
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };
  
  const status = getStatusBadge(application.status);
  
  return (
    <div 
      className="p-4 hover:bg-gray-50 transition cursor-pointer border-b border-gray-100 last:border-b-0"
      onClick={() => onView(application.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {application.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{application.name}</p>
            <p className="text-xs text-gray-500">{application.jobTitle}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <SparklesIcon className="h-3 w-3 text-yellow-500" />
          <span className="text-xs text-gray-500">Quiz:</span>
          <span className={`text-xs font-medium ${getScoreColor(application.quizScore)}`}>{application.quizScore}%</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircleIcon className="h-3 w-3 text-blue-500" />
          <span className="text-xs text-gray-500">Phù hợp:</span>
          <span className={`text-xs font-medium ${getScoreColor(application.matchScore)}`}>{application.matchScore}%</span>
        </div>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-400">{application.appliedDate}</span>
      </div>
    </div>
  );
};

// Upcoming Interview Item
const UpcomingInterview = ({ interview, onView }) => {
  const getTypeIcon = (type) => {
    if (type === 'online') return <VideoCameraIcon className="h-4 w-4" />;
    return <MapPinIcon className="h-4 w-4" />;
  };
  
  const getTypeText = (type) => {
    return type === 'online' ? 'Online' : 'Trực tiếp';
  };
  
  return (
    <div 
      className="p-4 hover:bg-gray-50 transition cursor-pointer border-b border-gray-100 last:border-b-0"
      onClick={() => onView(interview.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            {getTypeIcon(interview.type)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{interview.candidateName}</p>
            <p className="text-xs text-gray-500">{interview.jobTitle}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center text-xs text-gray-500">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {interview.date}
              </span>
              <span className="flex items-center text-xs text-gray-500">
                <ClockIcon className="h-3 w-3 mr-1" />
                {interview.time}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                interview.type === 'online' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {getTypeText(interview.type)}
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs text-blue-600 font-medium">Chi tiết →</span>
      </div>
    </div>
  );
};

// Active Job Item
const ActiveJob = ({ job, onView }) => {
  return (
    <div 
      className="p-4 hover:bg-gray-50 transition cursor-pointer border-b border-gray-100 last:border-b-0"
      onClick={() => onView(job.id)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900 flex items-center gap-2">
            {job.title}
            {job.isHot && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">🔥 Hot</span>}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <EyeIcon className="h-3 w-3" />
              {job.views} lượt xem
            </span>
            <span className="flex items-center gap-1">
              <UserGroupIcon className="h-3 w-3" />
              {job.applicants} ứng viên
            </span>
            <span className="flex items-center gap-1">
              <SparklesIcon className="h-3 w-3 text-yellow-500" />
              Quiz: {job.quizAvg}%
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            Đang tuyển
          </span>
        </div>
      </div>
    </div>
  );
};

const HRDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [notification, setNotification] = useState(null);
  const socketRef = useRef(null);

  // Socket.IO connection
  useEffect(() => {
    if (user && user.id) {
      // Kết nối socket
      socketRef.current = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
      
      // Tham gia room HR
      socketRef.current.emit('join_hr', user.id);
      console.log(`📢 HR ${user.id} joined room hr_${user.id}`);
      
      // Lắng nghe sự kiện có ứng viên mới
      socketRef.current.on('new_application', (data) => {
        console.log('📢 New application received:', data);
        
        // Hiển thị thông báo
        setNotification({
          message: data.message || `📢 ${data.candidateName} đã ứng tuyển vào vị trí "${data.jobTitle}"`,
          type: 'success'
        });
        
        // Tự động ẩn sau 5 giây
        setTimeout(() => setNotification(null), 5000);
        
        // Refresh dữ liệu
        refreshData();
      });
      
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [user]);

  const refreshData = () => {
    // TODO: Gọi API để refresh dữ liệu
    console.log('🔄 Refreshing HR dashboard data...');
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        totalJobs: 8,
        totalApplications: 156,
        totalViews: 2340,
        totalHired: 6,
        totalInterviews: 12,
        avgQuizScore: 72
      });
      
      setActiveJobs([
        { id: 1, title: "Frontend Developer (React)", applicants: 45, views: 320, quizAvg: 74, isHot: true },
        { id: 2, title: "Backend Developer (Node.js)", applicants: 32, views: 245, quizAvg: 68, isHot: false },
        { id: 3, title: "Fullstack Developer (MERN)", applicants: 28, views: 198, quizAvg: 71, isHot: true },
        { id: 4, title: "UI/UX Designer", applicants: 22, views: 167, quizAvg: 65, isHot: false }
      ]);
      
      setRecentApplications([
        { id: 1, name: "Nguyễn Văn A", avatar: "NA", jobTitle: "Frontend Developer", appliedDate: "15/03/2024", status: "pending", quizScore: 85, matchScore: 92 },
        { id: 2, name: "Trần Thị B", avatar: "TB", jobTitle: "Backend Developer", appliedDate: "14/03/2024", status: "reviewed", quizScore: 78, matchScore: 88 },
        { id: 3, name: "Lê Văn C", avatar: "LC", jobTitle: "Frontend Developer", appliedDate: "13/03/2024", status: "interview", quizScore: 92, matchScore: 95 },
        { id: 4, name: "Phạm Thị D", avatar: "PD", jobTitle: "UI/UX Designer", appliedDate: "12/03/2024", status: "pending", quizScore: 65, matchScore: 70 }
      ]);
      
      setUpcomingInterviews([
        { id: 1, candidateName: "Nguyễn Văn A", jobTitle: "Frontend Developer", date: "20/03/2024", time: "14:00", type: "offline" },
        { id: 2, candidateName: "Trần Thị B", jobTitle: "Backend Developer", date: "20/03/2024", time: "15:30", type: "online" },
        { id: 3, candidateName: "Lê Văn C", jobTitle: "Frontend Developer", date: "21/03/2024", time: "09:00", type: "offline" }
      ]);
      
      setLoading(false);
    }, 500);
  }, []);

  const handleViewApplication = (id) => {
    window.location.href = `/hr/applications/${id}`;
  };
  
  const handleViewInterview = (id) => {
    window.location.href = `/hr/interviews/${id}`;
  };
  
  const handleViewJob = (id) => {
    window.location.href = `/hr/jobs/${id}/applications`;
  };

  const displayedJobs = showAllJobs ? activeJobs : activeJobs.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
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
        
        {/* Banner HR */}
        <HRBanner />

        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Xin chào, {user?.name?.split(' ')[0] || "Nhà tuyển dụng"}! 👋
          </h1>
          <p className="text-gray-500">Hôm nay là ngày mới với nhiều cơ hội tuyển dụng</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <StatCard title="Tin đang tuyển" value={stats.totalJobs} icon={BriefcaseIcon} color="blue" change="+2" />
          <StatCard title="Ứng viên mới" value={stats.totalApplications} icon={UserGroupIcon} color="green" change="+18" />
          <StatCard title="Lượt xem" value={stats.totalViews} icon={EyeIcon} color="purple" change="+234" />
          <StatCard title="Đã tuyển" value={stats.totalHired} icon={CheckCircleIcon} color="orange" change="+3" />
          <StatCard title="Phỏng vấn" value={stats.totalInterviews} icon={CalendarIcon} color="indigo" change="+5" />
          <StatCard title="Quiz TB" value={`${stats.avgQuizScore}%`} icon={SparklesIcon} color="teal" change="+5%" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <QuickAction 
            title="Đăng tin mới" 
            description="Tạo tin tuyển dụng + Quiz" 
            icon={PlusIcon} 
            color="blue" 
            link="/hr/jobs/create"
          />
          <QuickAction 
            title="Xét duyệt hồ sơ" 
            description="Xem ứng viên + Quiz" 
            icon={UserGroupIcon} 
            color="green" 
            link="/hr/applications"
            badge={`${stats.totalApplications} mới`}
          />
          <QuickAction 
            title="Lịch phỏng vấn" 
            description="Sắp xếp lịch PV" 
            icon={CalendarIcon} 
            color="purple" 
            link="/hr/interviews"
            badge={`${upcomingInterviews.length} sắp tới`}
          />
          <QuickAction 
            title="Quản lý tin" 
            description="Sửa/Xóa tin tuyển dụng" 
            icon={BriefcaseIcon} 
            color="orange" 
            link="/hr/jobs"
            badge={`${activeJobs.length} đang hiển thị`}
          />
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Recent Applications */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-transparent">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-blue-500" />
                Ứng viên mới nhất
              </h2>
              <Link to="/hr/applications" className="text-blue-600 text-sm hover:underline font-medium">
                Xem tất cả
              </Link>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {recentApplications.map((app) => (
                <RecentApplication key={app.id} application={app} onView={handleViewApplication} />
              ))}
            </div>
          </div>

          {/* Column 2: Upcoming Interviews */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-transparent">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-purple-500" />
                Lịch phỏng vấn
              </h2>
              <Link to="/hr/interviews" className="text-blue-600 text-sm hover:underline font-medium">
                Xem tất cả
              </Link>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {upcomingInterviews.map((interview) => (
                <UpcomingInterview key={interview.id} interview={interview} onView={handleViewInterview} />
              ))}
            </div>
          </div>

          {/* Column 3: Active Jobs */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-green-50 to-transparent">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-green-500" />
                Tin đang tuyển
              </h2>
              <Link to="/hr/jobs" className="text-blue-600 text-sm hover:underline font-medium">
                Quản lý
              </Link>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {displayedJobs.map((job) => (
                <ActiveJob key={job.id} job={job} onView={handleViewJob} />
              ))}
            </div>
            {activeJobs.length > 3 && !showAllJobs && (
              <div className="p-3 border-t border-gray-100 text-center">
                <button
                  onClick={() => setShowAllJobs(true)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Xem thêm {activeJobs.length - 3} tin khác →
                </button>
              </div>
            )}
            {showAllJobs && activeJobs.length > 3 && (
              <div className="p-3 border-t border-gray-100 text-center">
                <button
                  onClick={() => setShowAllJobs(false)}
                  className="text-gray-500 text-sm hover:underline"
                >
                  Thu gọn ↑
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <MegaphoneIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">💡 Mẹo tuyển dụng hiệu quả</h3>
                <p className="text-sm text-gray-600">
                  Sử dụng Quiz để đánh giá ứng viên chính xác hơn • 
                  Xem báo cáo phân tích ứng viên để tối ưu quy trình • 
                  Lên lịch phỏng vấn sớm để không bỏ lỡ ứng viên tốt
                </p>
              </div>
            </div>
            <Link
              to="/hr/jobs/create"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-blue-600 text-sm font-medium shadow-sm hover:shadow-md transition"
            >
              <PlusIcon className="h-4 w-4" />
              Đăng tin ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;