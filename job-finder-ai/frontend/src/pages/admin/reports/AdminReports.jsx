// src/pages/admin/reports/AdminReports.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, UsersIcon, BriefcaseIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        totalUsers: 1248,
        newUsersMonth: 156,
        totalJobs: 124,
        newJobsMonth: 28,
        totalApplications: 3456,
        newApplicationsMonth: 567,
        totalRevenue: 12450000,
        revenueMonth: 3450000
      });
      setLoading(false);
    }, 500);
  }, []);

  const reportCards = [
    { title: "Người dùng", value: stats.totalUsers, change: `+${stats.newUsersMonth}`, icon: UsersIcon, color: "blue", link: "/admin/reports/users" },
    { title: "Tin tuyển dụng", value: stats.totalJobs, change: `+${stats.newJobsMonth}`, icon: BriefcaseIcon, color: "green", link: "/admin/reports/users" },
    { title: "Đơn ứng tuyển", value: stats.totalApplications, change: `+${stats.newApplicationsMonth}`, icon: ChartBarIcon, color: "orange", link: "/admin/reports/users" },
    { title: "Doanh thu", value: `${(stats.totalRevenue / 1000000).toFixed(0)}M`, change: `+${(stats.revenueMonth / 1000000).toFixed(0)}M`, icon: CurrencyDollarIcon, color: "teal", link: "/admin/reports/revenue" }
  ];

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Báo cáo thống kê</h1>
        <p className="text-gray-500 mt-1">Tổng quan hoạt động của hệ thống</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {reportCards.map((card, idx) => {
          const Icon = card.icon;
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            orange: "bg-orange-50 text-orange-600",
            teal: "bg-teal-50 text-teal-600"
          };
          return (
            <Link key={idx} to={card.link} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${colorClasses[card.color]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-green-600 flex items-center">
                  <ArrowTrendingUpIcon className="h-3 w-3 mr-0.5" />
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">{card.title}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">📊 Biểu đồ tăng trưởng</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-400">Biểu đồ sẽ hiển thị tại đây</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">🏆 Top ngành nghề</h3>
          <div className="space-y-3">
            {[
              { name: "Công nghệ thông tin", jobs: 42, percentage: 35 },
              { name: "Du lịch - Khách sạn", jobs: 28, percentage: 23 },
              { name: "Kinh doanh", jobs: 21, percentage: 17 },
              { name: "Xây dựng", jobs: 18, percentage: 15 },
              { name: "Dịch vụ", jobs: 15, percentage: 10 }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span className="text-gray-500">{item.jobs} tin</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;