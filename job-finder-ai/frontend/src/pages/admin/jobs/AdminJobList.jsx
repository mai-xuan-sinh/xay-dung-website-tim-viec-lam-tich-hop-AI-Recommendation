// src/pages/admin/jobs/AdminJobList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, CheckCircleIcon, XCircleIcon, TrashIcon, MapPinIcon, CurrencyDollarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import DataTable from '../components/DataTable';

// Import dữ liệu jobs
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../../data/jobs';

const AdminJobList = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    
    // Lấy tất cả jobs
    const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];
    
    // Thêm các trường cần thiết cho admin
    const jobsWithStats = allJobs.map(job => ({
      ...job,
      views: Math.floor(Math.random() * 500) + 100,
      applications: Math.floor(Math.random() * 50) + 5,
      status: job.hot || job.featured ? 'active' : 'active',
      postedAt: job.postedDate || '2024-03-01'
    }));
    
    setJobs(jobsWithStats);
    setLoading(false);
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: "Đang tuyển", color: "bg-green-100 text-green-700" },
      pending: { text: "Chờ duyệt", color: "bg-yellow-100 text-yellow-700" },
      expired: { text: "Hết hạn", color: "bg-gray-100 text-gray-700" }
    };
    return badges[status] || badges.active;
  };

  const getCategoryName = (category) => {
    const categories = {
      it: "IT", tourism: "Du lịch", business: "Kinh doanh", 
      construction: "Xây dựng", service: "Dịch vụ"
    };
    return categories[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      it: "bg-blue-100 text-blue-700",
      tourism: "bg-green-100 text-green-700",
      business: "bg-yellow-100 text-yellow-700",
      construction: "bg-orange-100 text-orange-700",
      service: "bg-purple-100 text-purple-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const columns = [
    { 
      key: 'title', 
      label: 'Tin tuyển dụng', 
      render: (value, row) => (
        <div>
          <p className="font-semibold text-gray-900 flex items-center gap-2">
            {value}
            {row.hot && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">🔥 Hot</span>}
            {row.featured && <span className="text-xs bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded">⭐ Nổi bật</span>}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <BuildingOfficeIcon className="h-3 w-3" />
            {row.company}
          </p>
        </div>
      )
    },
    { 
      key: 'location', 
      label: 'Địa điểm', 
      render: (value) => (
        <span className="flex items-center gap-1 text-sm">
          <MapPinIcon className="h-4 w-4 text-gray-400" />
          {value}
        </span>
      )
    },
    { 
      key: 'salary', 
      label: 'Mức lương', 
      render: (value) => (
        <span className="flex items-center gap-1 text-sm text-green-600">
          <CurrencyDollarIcon className="h-4 w-4" />
          {value}
        </span>
      )
    },
    { 
      key: 'category', 
      label: 'Ngành nghề', 
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(value)}`}>
          {getCategoryName(value)}
        </span>
      )
    },
    { key: 'views', label: 'Lượt xem' },
    { key: 'applications', label: 'Ứng viên' },
    { 
      key: 'status', 
      label: 'Trạng thái', 
      render: (value) => {
        const status = getStatusBadge(value);
        return <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>{status.text}</span>;
      }
    }
  ];

  const actions = [
    { label: 'Xem chi tiết', icon: <EyeIcon className="h-5 w-5" />, color: 'text-blue-600 hover:bg-blue-50', onClick: (row) => window.location.href = `/admin/jobs/${row.id}` },
    { label: 'Duyệt', icon: <CheckCircleIcon className="h-5 w-5" />, color: 'text-green-600 hover:bg-green-50', onClick: (row) => alert(`Đã duyệt tin ${row.title}`) },
    { label: 'Từ chối', icon: <XCircleIcon className="h-5 w-5" />, color: 'text-red-600 hover:bg-red-50', onClick: (row) => alert(`Từ chối tin ${row.title}`) },
    { label: 'Xóa', icon: <TrashIcon className="h-5 w-5" />, color: 'text-red-600 hover:bg-red-50', onClick: (row) => alert(`Xóa tin ${row.title}`) }
  ];

  const filteredJobs = statusFilter === 'all' ? jobs : jobs.filter(job => job.status === statusFilter);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý tin tuyển dụng</h1>
        <p className="text-gray-500 mt-1">Quản lý tất cả tin tuyển dụng trên hệ thống</p>
      </div>
      
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            statusFilter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Tất cả ({jobs.length})
        </button>
        <button
          onClick={() => setStatusFilter('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            statusFilter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Đang tuyển ({jobs.filter(j => j.status === 'active').length})
        </button>
        <button
          onClick={() => setStatusFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            statusFilter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Chờ duyệt ({jobs.filter(j => j.status === 'pending').length})
        </button>
      </div>
      
      <DataTable
        columns={columns}
        data={filteredJobs}
        actions={actions}
        onRowClick={(row) => window.location.href = `/admin/jobs/${row.id}`}
      />
    </div>
  );
};

export default AdminJobList;