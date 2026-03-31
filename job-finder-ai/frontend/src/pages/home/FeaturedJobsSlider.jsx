import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CurrencyDollarIcon, BriefcaseIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getCompanyLogo } from '../../data/companyLogos';

const JobCard = ({ job, index, isActive }) => {
  const logo = getCompanyLogo(job.company);
  
  return (
    <div className={`transition-all duration-500 ${isActive ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-40'}`}>
      <Link to={`/jobs/${job.id}`} className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6 group">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
            {logo ? (
              <img src={logo} alt={job.company} className="w-10 h-10 object-contain" />
            ) : (
              <span className="text-2xl">{job.logo || '💼'}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{job.company}</p>
              </div>
              {job.hot && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Hot</span>}
            </div>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
              <span className="flex items-center"><MapPinIcon className="h-3 w-3 mr-1" />{job.location}</span>
              <span className="flex items-center"><CurrencyDollarIcon className="h-3 w-3 mr-1 text-green-500" />{job.salary}</span>
              <span className="flex items-center"><BriefcaseIcon className="h-3 w-3 mr-1" />{job.type}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const FeaturedJobsSlider = () => {
  const demoJobs = [
    { id: 1, title: "Frontend Developer", company: "FPT Software", location: "Hải Châu", salary: "12-20M", type: "Full-time", hot: true, logo: "⚛️" },
    { id: 2, title: "Backend Developer", company: "Axon Active", location: "Ngũ Hành Sơn", salary: "15-25M", type: "Full-time", hot: true, logo: "🟢" },
    { id: 3, title: "Fullstack Developer", company: "TMA Solutions", location: "Liên Chiểu", salary: "18-28M", type: "Full-time", hot: false, logo: "🔄" },
    { id: 4, title: "Mobile Developer", company: "GAMELOFT", location: "Sơn Trà", salary: "14-22M", type: "Full-time", hot: false, logo: "📱" },
    { id: 5, title: "UI/UX Designer", company: "DesignBold", location: "Hải Châu", salary: "12-18M", type: "Full-time", hot: false, logo: "🎨" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const jobsPerView = 3;

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, demoJobs.length - jobsPerView));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < demoJobs.length - jobsPerView) setCurrentIndex(prev => prev + 1);
      else setCurrentIndex(0);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const visibleJobs = demoJobs.slice(currentIndex, currentIndex + jobsPerView);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Cơ hội tốt nhất</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Việc làm nổi bật</h2>
            <p className="text-gray-500 mt-2">Những vị trí đang được săn đón nhiều nhất</p>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="p-2 rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button onClick={next} className="p-2 rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleJobs.map((job, idx) => (
            <JobCard key={job.id} job={job} index={idx} isActive={true} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/jobs?featured=true" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
            Xem tất cả việc làm
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobsSlider;