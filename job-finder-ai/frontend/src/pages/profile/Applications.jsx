import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  CurrencyDollarIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as PendingIcon
} from '@heroicons/react/24/outline';

const Applications = ({ applications }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { icon: PendingIcon, text: 'Đang xử lý', color: 'bg-yellow-100 text-yellow-700' },
      reviewed: { icon: ClockIcon, text: 'Đã xem', color: 'bg-blue-100 text-blue-700' },
      shortlisted: { icon: CheckCircleIcon, text: 'Đã lọc', color: 'bg-purple-100 text-purple-700' },
      rejected: { icon: XCircleIcon, text: 'Từ chối', color: 'bg-red-100 text-red-700' },
      hired: { icon: CheckCircleIcon, text: 'Trúng tuyển', color: 'bg-green-100 text-green-700' },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <div className="text-4xl mb-2">📄</div>
        <p className="text-gray-500">Chưa có đơn ứng tuyển nào</p>
        <Link to="/jobs" className="mt-2 inline-block text-blue-600 text-sm hover:text-blue-700">
          Tìm việc ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 animate-fadeIn">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Đơn ứng tuyển</h2>
      
      <div className="space-y-4">
        {applications.map((app, idx) => {
          const StatusIcon = getStatusBadge(app.status).icon;
          const statusConfig = getStatusBadge(app.status);
          
          return (
            <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <Link to={`/jobs/${app.jobId}`} className="font-semibold text-gray-900 hover:text-blue-600">
                    {app.jobTitle}
                  </Link>
                  <p className="text-sm text-gray-600">{app.company}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {app.location}
                    </span>
                    <span className="flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {app.salary}
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {app.appliedDate}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                  <StatusIcon className="h-3 w-3" />
                  <span>{statusConfig.text}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Applications;