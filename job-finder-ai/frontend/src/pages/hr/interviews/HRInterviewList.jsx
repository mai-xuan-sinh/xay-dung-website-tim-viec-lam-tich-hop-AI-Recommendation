// src/pages/hr/interviews/HRInterviewList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, ClockIcon, MapPinIcon, VideoCameraIcon,
  MagnifyingGlassIcon, CheckCircleIcon, XCircleIcon,
  ClockIcon as PendingIcon, EyeIcon, ChevronLeftIcon,
  ChevronRightIcon, UserGroupIcon
} from '@heroicons/react/24/outline';

const HRInterviewList = () => {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock data - sẽ thay bằng API sau
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockInterviews = [
        {
          id: 1,
          candidateName: "Nguyễn Văn A",
          candidateAvatar: "NA",
          jobTitle: "Frontend Developer",
          date: "2024-03-20",
          time: "14:00",
          location: "Văn phòng FPT Software - Tầng 5, Tòa nhà Indochina",
          type: "offline",
          status: "scheduled",
          quizScore: 85,
          matchScore: 92,
          notes: "Mang theo CV bản cứng và portfolio"
        },
        {
          id: 2,
          candidateName: "Trần Thị B",
          candidateAvatar: "TB",
          jobTitle: "Backend Developer",
          date: "2024-03-20",
          time: "15:30",
          location: "https://meet.google.com/abc-def-ghi",
          type: "online",
          status: "confirmed",
          quizScore: 78,
          matchScore: 88,
          notes: ""
        },
        {
          id: 3,
          candidateName: "Lê Văn C",
          candidateAvatar: "LC",
          jobTitle: "Fullstack Developer",
          date: "2024-03-21",
          time: "09:00",
          location: "Văn phòng Axon Active - Tầng 3, Tòa nhà Sky Garden",
          type: "offline",
          status: "scheduled",
          quizScore: 92,
          matchScore: 95,
          notes: "Test kỹ năng coding"
        },
        {
          id: 4,
          candidateName: "Phạm Thị D",
          candidateAvatar: "PD",
          jobTitle: "UI/UX Designer",
          date: "2024-03-18",
          time: "10:00",
          location: "https://zoom.us/j/123456789",
          type: "online",
          status: "completed",
          quizScore: 88,
          matchScore: 90,
          notes: "",
          result: "passed"
        },
        {
          id: 5,
          candidateName: "Hoàng Văn E",
          candidateAvatar: "HE",
          jobTitle: "DevOps Engineer",
          date: "2024-03-16",
          time: "14:30",
          location: "Văn phòng Viettel - Tầng 10, Tòa nhà VNPT",
          type: "offline",
          status: "completed",
          quizScore: 82,
          matchScore: 85,
          notes: "",
          result: "failed"
        },
        {
          id: 6,
          candidateName: "Ngô Thị F",
          candidateAvatar: "NF",
          jobTitle: "Frontend Developer",
          date: "2024-03-22",
          time: "11:00",
          location: "https://meet.google.com/xyz-123-abc",
          type: "online",
          status: "scheduled",
          quizScore: 75,
          matchScore: 80,
          notes: ""
        }
      ];
      setInterviews(mockInterviews);
      setLoading(false);
    }, 500);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'Tất cả', icon: null },
    { value: 'scheduled', label: 'Đã lên lịch', icon: PendingIcon, color: 'yellow' },
    { value: 'confirmed', label: 'Đã xác nhận', icon: CheckCircleIcon, color: 'green' },
    { value: 'completed', label: 'Đã hoàn thành', icon: EyeIcon, color: 'blue' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: { text: "Đã lên lịch", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
      confirmed: { text: "Đã xác nhận", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
      completed: { text: "Đã hoàn thành", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" }
    };
    return badges[status] || badges.scheduled;
  };

  const getResultBadge = (result) => {
    if (result === 'passed') {
      return { text: "Đậu", color: "bg-green-100 text-green-700" };
    }
    if (result === 'failed') {
      return { text: "Rớt", color: "bg-red-100 text-red-700" };
    }
    return null;
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sắp xếp theo ngày
  const sortedInterviews = [...filteredInterviews].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Thống kê
  const stats = {
    total: interviews.length,
    scheduled: interviews.filter(i => i.status === 'scheduled').length,
    confirmed: interviews.filter(i => i.status === 'confirmed').length,
    completed: interviews.filter(i => i.status === 'completed').length,
    passed: interviews.filter(i => i.result === 'passed').length
  };

  // Lấy danh sách ngày trong tháng
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getInterviewsByDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return interviews.filter(i => i.date === dateStr);
  };

  const changeMonth = (delta) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
  };

  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải danh sách phỏng vấn...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Quản lý phỏng vấn</h1>
            <p className="text-gray-500 mt-1">Theo dõi lịch phỏng vấn và kết quả</p>
          </div>
          <Link
            to="/hr/applications"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <UserGroupIcon className="h-5 w-5" />
            <span>Duyệt hồ sơ</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-xs text-gray-500">Tổng buổi PV</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.scheduled}</p>
            <p className="text-xs text-gray-500">Đã lên lịch</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
            <p className="text-xs text-gray-500">Đã xác nhận</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            <p className="text-xs text-gray-500">Đã hoàn thành</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
            <p className="text-xs text-gray-500">Đậu</p>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentMonth).map((date, idx) => {
              const dayInterviews = getInterviewsByDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div key={idx} className={`bg-white p-2 min-h-[100px] ${isToday ? 'bg-blue-50' : ''}`}>
                  <p className={`text-sm ${isToday ? 'font-bold text-blue-600' : 'text-gray-500'}`}>
                    {date.getDate()}
                  </p>
                  <div className="mt-1 space-y-1">
                    {dayInterviews.slice(0, 2).map(interview => (
                      <Link
                        key={interview.id}
                        to={`/hr/interviews/${interview.id}`}
                        className="block text-xs p-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 truncate"
                      >
                        {interview.time} - {interview.candidateName}
                      </Link>
                    ))}
                    {dayInterviews.length > 2 && (
                      <span className="text-xs text-gray-400">+{dayInterviews.length - 2}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên ứng viên hoặc vị trí..."
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
          </div>
        </div>

        {/* Interviews List */}
        <div className="space-y-4">
          {sortedInterviews.map((interview) => {
            const status = getStatusBadge(interview.status);
            const result = interview.result ? getResultBadge(interview.result) : null;
            return (
              <Link to={`/hr/interviews/${interview.id}`} key={interview.id}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {interview.candidateAvatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600">
                          {interview.candidateName}
                        </h3>
                        <p className="text-sm text-gray-500">{interview.jobTitle}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {interview.date}
                          </span>
                          <span className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {interview.time}
                          </span>
                          <span className="flex items-center">
                            {interview.type === 'online' ? (
                              <VideoCameraIcon className="h-4 w-4 mr-1" />
                            ) : (
                              <MapPinIcon className="h-4 w-4 mr-1" />
                            )}
                            {interview.type === 'online' ? 'Online' : interview.location.substring(0, 30)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
                          {status.text}
                        </span>
                        {result && (
                          <span className={`px-2 py-1 rounded-full text-xs ${result.color}`}>
                            {result.text}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="flex items-center">
                          <span className="text-yellow-500">Quiz: {interview.quizScore}%</span>
                        </span>
                        <span className="flex items-center">
                          <span className="text-blue-500">Phù hợp: {interview.matchScore}%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {sortedInterviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy lịch phỏng vấn nào</p>
            <Link to="/hr/applications" className="mt-3 inline-block text-blue-600 hover:underline">
              Duyệt hồ sơ để tạo lịch phỏng vấn
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRInterviewList;