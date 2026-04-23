// src/pages/admin/companies/AdminCompanyList.jsx
import React, { useState, useEffect } from 'react';
import { EyeIcon, CheckCircleIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import DataTable from '../components/DataTable';

const AdminCompanyList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCompanies([
        { id: 1, name: "FPT Software", email: "hr@fpt.com", phone: "02361234567", address: "Hải Châu, Đà Nẵng", status: "active", jobsPosted: 12, joinedAt: "2024-01-15" },
        { id: 2, name: "Axon Active", email: "hr@axon.com", phone: "02369876543", address: "Ngũ Hành Sơn, Đà Nẵng", status: "active", jobsPosted: 8, joinedAt: "2024-01-20" },
        { id: 3, name: "DesignBold", email: "hr@designbold.com", phone: "02364443333", address: "Hải Châu, Đà Nẵng", status: "pending", jobsPosted: 0, joinedAt: "2024-03-10" }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status) => {
    if (status === 'active') return { text: "Hoạt động", color: "bg-green-100 text-green-700" };
    if (status === 'pending') return { text: "Chờ duyệt", color: "bg-yellow-100 text-yellow-700" };
    return { text: "Tạm dừng", color: "bg-red-100 text-red-700" };
  };

  const columns = [
    { key: 'name', label: 'Tên công ty' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'address', label: 'Địa chỉ' },
    { key: 'status', label: 'Trạng thái', render: (value) => {
      const status = getStatusBadge(value);
      return <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>{status.text}</span>;
    } },
    { key: 'jobsPosted', label: 'Tin tuyển dụng' },
    { key: 'joinedAt', label: 'Ngày tham gia' }
  ];

  const actions = [
    { label: 'Xem chi tiết', icon: <EyeIcon className="h-5 w-5" />, color: 'text-blue-600 hover:bg-blue-50', onClick: (row) => window.location.href = `/admin/companies/${row.id}` },
    { label: 'Duyệt', icon: <CheckCircleIcon className="h-5 w-5" />, color: 'text-green-600 hover:bg-green-50', onClick: (row) => alert(`Đã duyệt công ty ${row.name}`) },
    { label: 'Từ chối', icon: <XCircleIcon className="h-5 w-5" />, color: 'text-red-600 hover:bg-red-50', onClick: (row) => alert(`Từ chối công ty ${row.name}`) },
    { label: 'Xóa', icon: <TrashIcon className="h-5 w-5" />, color: 'text-red-600 hover:bg-red-50', onClick: (row) => alert(`Xóa công ty ${row.name}`) }
  ];

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý công ty</h1>
        <p className="text-gray-500 mt-1">Duyệt và quản lý tất cả công ty trên hệ thống</p>
      </div>
      <DataTable columns={columns} data={companies} actions={actions} onRowClick={(row) => window.location.href = `/admin/companies/${row.id}`} />
    </div>
  );
};

export default AdminCompanyList;