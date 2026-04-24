// frontend/src/pages/jobs/JobCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CurrencyDollarIcon, BriefcaseIcon, HeartIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const JobCard = ({ job, onApply }) => {
  const { isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveJob = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      alert('Vui lòng đăng nhập để lưu việc làm');
      return;
    }
    
    setSaving(true);
    try {
      const response = await api.post(`/users/save-job/${job.id}`);
      if (response.data.success) {
        setIsSaved(response.data.saved);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Save job error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setSaving(false);
    }
  };

  const handleApplyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onApply) onApply(job);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group">
      <Link to={`/jobs/${job.id}`} className="block p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
              {job.logo || '💼'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
            </div>
          </div>
          <button
            onClick={handleSaveJob}
            disabled={saving}
            className="p-2 text-gray-400 hover:text-red-500 transition"
          >
            {isSaved ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-green-600">
            <CurrencyDollarIcon className="h-4 w-4" />
            {job.salary}
          </span>
          <span className="flex items-center gap-1">
            <BriefcaseIcon className="h-4 w-4" />
            {job.type}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {job.skills?.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-400">
              +{job.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>📅 {job.postedDate}</span>
            {job.hot && <span className="text-red-500">🔥 Hot</span>}
            {job.featured && <span className="text-yellow-500">⭐ Nổi bật</span>}
          </div>
          <button
            onClick={handleApplyClick}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            Ứng tuyển
          </button>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;