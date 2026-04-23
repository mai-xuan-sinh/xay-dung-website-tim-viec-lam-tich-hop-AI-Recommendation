// src/pages/job-detail/SimilarJobs.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CurrencyDollarIcon, BriefcaseIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { getSimilarJobsAI } from '../../services/aiRecommendation';
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../data/jobs';

const SimilarJobs = ({ currentJob }) => {
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];

  useEffect(() => {
    if (currentJob) {
      setLoading(true);
      // Mô phỏng delay để thấy hiệu ứng AI
      setTimeout(() => {
        const jobs = getSimilarJobsAI(currentJob, allJobs, 5);
        setSimilarJobs(jobs);
        setLoading(false);
      }, 200);
    }
  }, [currentJob]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">Việc làm tương tự</h2>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (similarJobs.length === 0) return null;

  const getSimilarityColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">Việc làm tương tự</h2>
        </div>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <SparklesIcon className="h-3 w-3 text-purple-500" />
          Gợi ý thông minh từ AI
        </span>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {similarJobs.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="block p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:border-blue-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1 text-green-600" />
                    <span className="text-green-600">{job.salary}</span>
                  </span>
                  <span className="flex items-center">
                    <BriefcaseIcon className="h-4 w-4 mr-1" />
                    {job.type}
                  </span>
                </div>
              </div>
              <div className="text-right">
                {job.similarityScore && (
                  <span className={`text-xs font-medium ${getSimilarityColor(job.similarityScore)}`}>
                    {job.similarityScore}% tương tự
                  </span>
                )}
                {job.hot && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full ml-2">
                    🔥 Hot
                  </span>
                )}
              </div>
            </div>
            {/* Progress bar cho độ tương đồng */}
            {job.similarityScore && (
              <div className="mt-2 w-full bg-gray-100 rounded-full h-1">
                <div 
                  className="h-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                  style={{ width: `${job.similarityScore}%` }}
                ></div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;