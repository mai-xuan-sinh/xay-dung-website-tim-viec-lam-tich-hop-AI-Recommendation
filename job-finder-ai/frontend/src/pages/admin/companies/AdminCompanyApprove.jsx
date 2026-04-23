// src/pages/admin/companies/AdminCompanyApprove.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const AdminCompanyApprove = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');

  const handleApprove = () => {
    alert(`Đã duyệt công ty #${id} thành công!`);
    navigate('/admin/companies');
  };

  const handleReject = () => {
    alert(`Đã từ chối công ty #${id}`);
    navigate('/admin/companies');
  };

  return (
    <div>
      <button onClick={() => navigate('/admin/companies')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-5 w-5" /> Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <BuildingOfficeIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Duyệt công ty</h1>
          <p className="text-gray-500 mt-1">Xem xét và phê duyệt công ty #{id}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (nếu có)</label>
            <textarea rows="4" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Nhập ghi chú cho công ty..."></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={handleApprove} className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Duyệt công ty</button>
            <button onClick={handleReject} className="flex-1 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyApprove;