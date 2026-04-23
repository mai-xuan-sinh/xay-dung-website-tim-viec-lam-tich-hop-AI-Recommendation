// src/pages/admin/users/AdminUserList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon, UsersIcon, BuildingOfficeIcon,
  UserIcon, CheckCircleIcon, XCircleIcon, EyeIcon,
  TrashIcon, LockClosedIcon, LockOpenIcon,
  ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/24/outline';
import DataTable from '../components/DataTable';

const AdminUserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockUsers = [
        { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", phone: "0912345678", role: "user", status: "active", joinedAt: "2024-03-15", jobsApplied: 12 },
        { id: 2, name: "Trần Thị B", email: "tranthib@email.com", phone: "0987654321", role: "user", status: "active", joinedAt: "2024-03-14", jobsApplied: 8 },
        { id: 3, name: "Công ty FPT Software", email: "hr@fpt.com", phone: "02361234567", role: "hr", status: "active", joinedAt: "2024-03-13", companyName: "FPT Software" },
        { id: 4, name: "Lê Văn C", email: "levanc@email.com", phone: "0905123456", role: "user", status: "inactive", joinedAt: "2024-03-12", jobsApplied: 3 },
        { id: 5, name: "Công ty Axon Active", email: "hr@axon.com", phone: "02369876543", role: "hr", status: "pending", joinedAt: "2024-03-11", companyName: "Axon Active" }
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const getRoleBadge = (role) => {
    if (role === 'hr') {
      return { text: "Nhà tuyển dụng", color: "bg-purple-100 text-purple-700", icon: BuildingOfficeIcon };
    }
    return { text: "Ứng viên", color: "bg-blue-100 text-blue-700", icon: UserIcon };
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return { text: "Hoạt động", color: "bg-green-100 text-green-700" };
    }
    if (status === 'inactive') {
      return { text: "Đã khóa", color: "bg-red-100 text-red-700" };
    }
    return { text: "Chờ duyệt", color: "bg-yellow-100 text-yellow-700" };
  };

  const columns = [
    { key: 'name', label: 'Người dùng', render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
          {value.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      </div>
    ) },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'role', label: 'Vai trò', render: (value) => {
      const role = getRoleBadge(value);
      return <span className={`px-2 py-1 rounded-full text-xs ${role.color}`}>{role.text}</span>;
    } },
    { key: 'status', label: 'Trạng thái', render: (value) => {
      const status = getStatusBadge(value);
      return <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>{status.text}</span>;
    } },
    { key: 'joinedAt', label: 'Ngày tham gia' }
  ];

  const actions = [
    { label: 'Xem chi tiết', icon: <EyeIcon className="h-5 w-5" />, color: 'text-blue-600 hover:bg-blue-50', onClick: (row) => window.location.href = `/admin/users/${row.id}` },
    { label: 'Khóa/Mở khóa', icon: <LockClosedIcon className="h-5 w-5" />, color: 'text-orange-600 hover:bg-orange-50', onClick: (row) => alert(`Đã ${row.status === 'active' ? 'khóa' : 'mở khóa'} tài khoản ${row.name}`) },
    { label: 'Xóa', icon: <TrashIcon className="h-5 w-5" />, color: 'text-red-600 hover:bg-red-50', onClick: (row) => alert(`Xóa tài khoản ${row.name}`) }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="text-gray-500 mt-1">Quản lý tất cả tài khoản người dùng trên hệ thống</p>
        </div>
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="user">Ứng viên</option>
            <option value="hr">Nhà tuyển dụng</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Đã khóa</option>
            <option value="pending">Chờ duyệt</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        onSearch={(value) => setSearchTerm(value)}
        actions={actions}
        onRowClick={(row) => window.location.href = `/admin/users/${row.id}`}
      />
    </div>
  );
};

export default AdminUserList;