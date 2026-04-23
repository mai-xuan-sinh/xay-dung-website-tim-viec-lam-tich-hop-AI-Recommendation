// src/pages/admin/companies/AdminCompanyList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, CheckCircleIcon, XCircleIcon, TrashIcon, BuildingOfficeIcon, MapPinIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import DataTable from '../components/DataTable';

// Import dữ liệu công ty từ các file job (để lấy thông tin công ty)
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../../data/jobs';

const AdminCompanyList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setLoading(true);
    
    // Lấy tất cả jobs
    const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];
    
    // Tạo map để nhóm các job theo công ty
    const companyMap = new Map();
    
    allJobs.forEach(job => {
      if (!companyMap.has(job.company)) {
        companyMap.set(job.company, {
          id: companyMap.size + 1,
          name: job.company,
          logo: job.logo || '🏢',
          email: `hr@${job.company.toLowerCase().replace(/ /g, '')}.com`,
          phone: '0236xxxxxxx',
          address: job.location,
          jobsPosted: 0,
          totalApplicants: 0,
          totalViews: 0,
          status: 'active',
          joinedAt: job.postedDate || '2024-01-01'
        });
      }
      
      const company = companyMap.get(job.company);
      company.jobsPosted++;
      company.totalApplicants += job.applicants || Math.floor(Math.random() * 50) + 10;
      company.totalViews += job.views || Math.floor(Math.random() * 500) + 100;
    });
    
    setCompanies(Array.from(companyMap.values()));
    setLoading(false);
  }, []);

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return { text: "Hoạt động", color: "bg-green-100 text-green-700" };
    }
    if (status === 'pending') {
      return { text: "Chờ duyệt", color: "bg-yellow-100 text-yellow-700" };
    }
    return { text: "Tạm dừng", color: "bg-red-100 text-red-700" };
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Công ty', 
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl">
            {row.logo}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'address', label: 'Địa chỉ', render: (value) => (
      <span className="flex items-center gap-1 text-sm">
        <MapPinIcon className="h-4 w-4 text-gray-400" />
        {value}
      </span>
    ) },
    { 
      key: 'jobsPosted', 
      label: 'Tin tuyển dụng',
      render: (value) => (
        <span className="flex items-center gap-1 text-sm">
          <BriefcaseIcon className="h-4 w-4 text-blue-500" />
          {value} tin
        </span>
      )
    },
    { key: 'totalApplicants', label: 'Tổng ứng viên' },
    { key: 'totalViews', label: 'Lượt xem' },
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
    { label: 'Xem chi tiết', icon: <EyeIcon className="h-5 w-5" />, color: 'text-blue-600 hover:bg-blue-50', onClick: (row) => window.location.href = `/admin/companies/${row.id}` },
    { label: 'Duyệt', icon: <CheckCircleIcon className="h-5 w-5" />, color: 'text-green-600 hover:bg-green-50', onClick: (row) => alert(`Đã duyệt công ty ${row.name}`) },
    { label: 'Khóa', icon: <XCircleIcon className="h-5 w-5" />, color: 'text-red-600 hover:bg-red-50', onClick: (row) => alert(`Đã khóa công ty ${row.name}`) },
    { label: 'Xóa', icon: <TrashIcon className="h-5 w-5" />, color: 'text-red-600 hover:bg-red-50', onClick: (row) => alert(`Xóa công ty ${row.name}`) }
  ];

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
        <h1 className="text-2xl font-bold text-gray-800">Quản lý công ty</h1>
        <p className="text-gray-500 mt-1">Quản lý tất cả công ty trên hệ thống</p>
      </div>
      
      <div className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-purple-600">{companies.length}</p>
            <p className="text-xs text-gray-500">Tổng công ty</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">{companies.reduce((sum, c) => sum + c.jobsPosted, 0)}</p>
            <p className="text-xs text-gray-500">Tin tuyển dụng</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{companies.reduce((sum, c) => sum + c.totalApplicants, 0)}</p>
            <p className="text-xs text-gray-500">Tổng ứng viên</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-orange-600">{companies.reduce((sum, c) => sum + c.totalViews, 0)}</p>
            <p className="text-xs text-gray-500">Lượt xem</p>
          </div>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={companies}
        actions={actions}
        onRowClick={(row) => window.location.href = `/admin/companies/${row.id}`}
      />
    </div>
  );
};

export default AdminCompanyList;