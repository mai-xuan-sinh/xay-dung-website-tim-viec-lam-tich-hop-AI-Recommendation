// src/pages/admin/AdminDashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UsersIcon, BriefcaseIcon, BuildingOfficeIcon,
  DocumentTextIcon, EyeIcon, CheckCircleIcon,
  ArrowTrendingUpIcon, ClockIcon, ChartBarIcon,
  UserGroupIcon, CalendarIcon, CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import StatCard from './components/StatCard';

const AdminDashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        totalUsers: 1248,
        totalHr: 89,
        totalJobs: 124,
        totalApplications: 3456,
        totalCompanies: 67,
        totalRevenue: 12450000,
        pendingJobs: 12,
        pendingCompanies: 5,
        monthlyGrowth: {
          users: '+12.5%',
          jobs: '+8.3%',
          applications: '+23.7%',
          revenue: '+15.2%'
        }
      });
      setLoading(false);
    }, 500);
  }, []);

  const statCards = [
    { title: "Tổng người dùng", value: stats.totalUsers, icon: UsersIcon, color: "blue", change: stats.monthlyGrowth?.users },
    { title: "Nhà tuyển dụng", value: stats.totalHr, icon: BuildingOfficeIcon, color: "purple", change: "+5.2%" },
    { title: "Tin tuyển dụng", value: stats.totalJobs, icon: BriefcaseIcon, color: "green", change: stats.monthlyGrowth?.jobs },
    { title: "Đơn ứng tuyển", value: stats.totalApplications, icon: DocumentTextIcon, color: "orange", change: stats.monthlyGrowth?.applications },
    { title: "Công ty", value: stats.totalCompanies, icon: BuildingOfficeIcon, color: "indigo", change: "+3.8%" },
    { title: "Doanh thu", value: `${(stats.totalRevenue / 1000000).toFixed(0)}M`, icon: CurrencyDollarIcon, color: "teal", change: stats.monthlyGrowth?.revenue }
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-gray-500 mt-1">Chào mừng bạn đến với trang quản trị ĐANANG WORK</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statCards.map((card, idx) => (
          <StatCard key={idx} {...card} loading={loading} />
        ))}
      </div>

      {/* Pending Approvals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/admin/jobs?status=pending"
          className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 hover:shadow-md transition group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingJobs}</p>
              <p className="text-sm text-gray-600">Tin tuyển dụng chờ duyệt</p>
            </div>
          </div>
          <div className="text-yellow-600 group-hover:translate-x-1 transition">
            <span>Duyệt ngay →</span>
          </div>
        </Link>
        
        <Link
          to="/admin/companies?status=pending"
          className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 hover:shadow-md transition group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingCompanies}</p>
              <p className="text-sm text-gray-600">Công ty chờ duyệt</p>
            </div>
          </div>
          <div className="text-purple-600 group-hover:translate-x-1 transition">
            <span>Duyệt ngay →</span>
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-blue-500" />
              Người dùng mới
            </h3>
            <Link to="/admin/users" className="text-sm text-blue-600 hover:underline">Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div>
                    <p className="font-medium text-gray-900">Người dùng {i}</p>
                    <p className="text-xs text-gray-500">user{i}@email.com</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Hoạt động</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-green-500" />
              Tin tuyển dụng mới
            </h3>
            <Link to="/admin/jobs" className="text-sm text-blue-600 hover:underline">Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Frontend Developer</p>
                  <p className="text-xs text-gray-500">FPT Software • 12 ứng viên</p>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Đang tuyển</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;