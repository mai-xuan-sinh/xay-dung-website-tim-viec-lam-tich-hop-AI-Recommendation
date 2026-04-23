// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UsersIcon, BriefcaseIcon, BuildingOfficeIcon,
  DocumentTextIcon, CurrencyDollarIcon, UserGroupIcon,
  ClockIcon, TrendingUpIcon, EyeIcon, CheckCircleIcon,
  UserIcon, OfficeBuildingIcon
} from '@heroicons/react/24/outline';
import StatCard from './components/StatCard';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        totalUsers: 1248,
        totalCandidates: 1159,
        totalHR: 89,
        totalJobs: 124,
        activeJobs: 98,
        pendingJobs: 12,
        expiredJobs: 14,
        totalApplications: 3456,
        newApplications: 567,
        totalCompanies: 67,
        pendingCompanies: 5,
        totalRevenue: 12450000,
        monthlyGrowth: {
          users: '+12.5%',
          jobs: '+8.3%',
          applications: '+23.7%',
          revenue: '+15.2%'
        }
      });
      
      setRecentUsers([
        { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", role: "candidate", status: "active", joinedAt: "15/03/2024" },
        { id: 2, name: "Trần Thị B", email: "tranthib@email.com", role: "candidate", status: "active", joinedAt: "14/03/2024" },
        { id: 3, name: "FPT Software", email: "hr@fpt.com", role: "hr", status: "active", joinedAt: "13/03/2024", companyName: "FPT Software" },
        { id: 4, name: "Lê Văn C", email: "levanc@email.com", role: "candidate", status: "inactive", joinedAt: "12/03/2024" },
        { id: 5, name: "Axon Active", email: "hr@axon.com", role: "hr", status: "pending", joinedAt: "11/03/2024", companyName: "Axon Active" }
      ]);
      
      setRecentJobs([
        { id: 1, title: "Frontend Developer", company: "FPT Software", status: "active", views: 234, applications: 12, postedAt: "15/03" },
        { id: 2, title: "Backend Developer", company: "Axon Active", status: "active", views: 189, applications: 8, postedAt: "14/03" },
        { id: 3, title: "Fullstack Developer", company: "TMA Solutions", status: "pending", views: 0, applications: 0, postedAt: "13/03" },
        { id: 4, title: "UI/UX Designer", company: "DesignBold", status: "active", views: 156, applications: 6, postedAt: "12/03" }
      ]);
      
      setLoading(false);
    }, 500);
  }, []);

  const statCards = [
    { title: "Tổng người dùng", value: stats.totalUsers, icon: UsersIcon, color: "blue", change: stats.monthlyGrowth?.users },
    { title: "Ứng viên", value: stats.totalCandidates, icon: UserIcon, color: "teal", change: "+8.2%" },
    { title: "Nhà tuyển dụng", value: stats.totalHR, icon: BuildingOfficeIcon, color: "purple", change: "+5.2%" },
    { title: "Tin tuyển dụng", value: stats.totalJobs, icon: BriefcaseIcon, color: "green", change: stats.monthlyGrowth?.jobs },
    { title: "Đơn ứng tuyển", value: stats.totalApplications, icon: DocumentTextIcon, color: "orange", change: stats.monthlyGrowth?.applications },
    { title: "Doanh thu", value: `${(stats.totalRevenue / 1000000).toFixed(0)}M`, icon: CurrencyDollarIcon, color: "red", change: stats.monthlyGrowth?.revenue }
  ];

  const getRoleIcon = (role) => {
    if (role === 'hr') return <BuildingOfficeIcon className="h-4 w-4 text-purple-500" />;
    return <UserIcon className="h-4 w-4 text-blue-500" />;
  };

  const getRoleName = (role) => {
    return role === 'hr' ? 'Nhà tuyển dụng' : 'Ứng viên';
  };

  const getStatusBadge = (status) => {
    if (status === 'active') return <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">● Hoạt động</span>;
    if (status === 'inactive') return <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">● Đã khóa</span>;
    return <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">● Chờ duyệt</span>;
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tổng hệ thống</h1>
        <p className="text-gray-500 mt-1">Chào mừng bạn đến với DANANG WORK</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
        {statCards.map((card, idx) => (
          <StatCard key={idx} {...card} loading={loading} />
        ))}
      </div>

      {/* Pending Approvals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/admin/jobs?status=pending"
          className="group bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <ClockIcon className="h-7 w-7 text-yellow-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.pendingJobs}</p>
                <p className="text-sm text-gray-600">Tin tuyển dụng chờ duyệt</p>
              </div>
            </div>
            <div className="text-yellow-600 group-hover:translate-x-1 transition font-medium">
              Duyệt ngay →
            </div>
          </div>
        </Link>
        
        <Link
          to="/admin/companies?status=pending"
          className="group bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <BuildingOfficeIcon className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.pendingCompanies}</p>
                <p className="text-sm text-gray-600">Công ty chờ duyệt</p>
              </div>
            </div>
            <div className="text-purple-600 group-hover:translate-x-1 transition font-medium">
              Duyệt ngay →
            </div>
          </div>
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Users - Phân biệt rõ Ứng viên và HR */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-blue-500" />
              Người dùng mới nhất
            </h2>
            <Link to="/admin/users" className="text-sm text-red-600 hover:text-red-700 font-medium">
              Xem tất cả →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentUsers.map((user) => (
              <div key={user.id} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                      user.role === 'hr' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          user.role === 'hr' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {getRoleIcon(user.role)}
                          {getRoleName(user.role)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      {user.companyName && <p className="text-xs text-gray-400 mt-0.5">🏢 {user.companyName}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(user.status)}
                    <p className="text-xs text-gray-400 mt-1">{user.joinedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-green-500" />
              Tin tuyển dụng mới nhất
            </h2>
            <Link to="/admin/jobs" className="text-sm text-red-600 hover:text-red-700 font-medium">
              Xem tất cả →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentJobs.map((job) => (
              <div key={job.id} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.company}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">👁️ {job.views} lượt xem</span>
                      <span className="flex items-center gap-1">📄 {job.applications} ứng viên</span>
                      <span>📅 {job.postedAt}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {job.status === 'active' && <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Đang tuyển</span>}
                    {job.status === 'pending' && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">Chờ duyệt</span>}
                    {job.status === 'expired' && <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">Hết hạn</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.activeJobs}</p>
          <p className="text-xs text-gray-500">Tin đang tuyển</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.newApplications}</p>
          <p className="text-xs text-gray-500">Ứng viên mới</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.totalCompanies}</p>
          <p className="text-xs text-gray-500">Công ty đối tác</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-orange-600">24</p>
          <p className="text-xs text-gray-500">Phỏng vấn hôm nay</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;