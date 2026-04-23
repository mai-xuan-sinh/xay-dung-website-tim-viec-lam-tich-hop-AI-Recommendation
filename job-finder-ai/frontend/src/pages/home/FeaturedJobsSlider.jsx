// src/pages/home/FeaturedJobsSlider.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CurrencyDollarIcon, BriefcaseIcon, ChevronLeftIcon, ChevronRightIcon, BuildingOfficeIcon, StarIcon } from '@heroicons/react/24/outline';
import { getCompanyLogo } from '../../data/companyLogos';

// Dữ liệu việc làm nổi bật mở rộng
const featuredJobs = [
  {
    id: 1,
    title: "Frontend Developer (React)",
    company: "FPT Software",
    location: "Hải Châu",
    salary: "12-20M",
    type: "Full-time",
    hot: true,
    logo: "⚛️",
    skills: ["React", "JavaScript", "HTML/CSS"],
    description: "Phát triển giao diện người dùng với ReactJS, làm việc với team Agile"
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    company: "Axon Active",
    location: "Ngũ Hành Sơn",
    salary: "15-25M",
    type: "Full-time",
    hot: true,
    logo: "🟢",
    skills: ["Node.js", "Express", "MongoDB"],
    description: "Phát triển API và microservices với Node.js"
  },
  {
    id: 3,
    title: "Fullstack Developer (Java/React)",
    company: "TMA Solutions",
    location: "Liên Chiểu",
    salary: "18-28M",
    type: "Full-time",
    hot: false,
    logo: "☕",
    skills: ["Java", "Spring Boot", "React"],
    description: "Phát triển hệ thống doanh nghiệp với Spring Boot và React"
  },
  {
    id: 4,
    title: "Mobile Developer (React Native)",
    company: "GAMELOFT",
    location: "Sơn Trà",
    salary: "14-22M",
    type: "Full-time",
    hot: false,
    logo: "📱",
    skills: ["React Native", "Redux", "JavaScript"],
    description: "Phát triển ứng dụng mobile với React Native"
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "DesignBold",
    location: "Hải Châu",
    salary: "12-18M",
    type: "Full-time",
    hot: false,
    logo: "🎨",
    skills: ["Figma", "UI Design", "UX Research"],
    description: "Thiết kế giao diện và trải nghiệm người dùng"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Viettel",
    location: "Liên Chiểu",
    salary: "20-30M",
    type: "Full-time",
    hot: true,
    logo: "🚀",
    skills: ["Docker", "Kubernetes", "AWS"],
    description: "Quản lý hạ tầng và tự động hóa deployment"
  }
];

const JobCard = ({ job }) => {
  const logo = getCompanyLogo(job.company);
  
  return (
    <Link to={`/jobs/${job.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full transform hover:-translate-y-1">
        {/* Header với badge */}
        <div className="relative p-6 pb-4">
          {job.hot && (
            <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
              🔥 Hot
            </span>
          )}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
              {logo ? (
                <img src={logo} alt={job.company} className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-3xl">{job.logo || '💼'}</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <BuildingOfficeIcon className="h-4 w-4" />
                <span className="text-sm">{job.company}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Thông tin chi tiết */}
        <div className="px-6 pb-3">
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full">
              <MapPinIcon className="h-4 w-4 text-gray-400" />
              {job.location}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full">
              <CurrencyDollarIcon className="h-4 w-4 text-green-500" />
              <span className="font-semibold text-green-600">{job.salary}</span>
            </span>
            <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full">
              <BriefcaseIcon className="h-4 w-4 text-gray-400" />
              {job.type}
            </span>
          </div>
        </div>
        
        {/* Skills tags */}
        <div className="px-6 pb-3">
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Footer với nút */}
        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-xs text-gray-400 ml-1">(4.9)</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedJobsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const jobsPerView = 3;

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, featuredJobs.length - jobsPerView));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < featuredJobs.length - jobsPerView) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const visibleJobs = featuredJobs.slice(currentIndex, currentIndex + jobsPerView);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Cơ hội tốt nhất</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Việc làm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">nổi bật</span>
            </h2>
            <p className="text-gray-500 mt-2">Những vị trí đang được săn đón nhiều nhất</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={prev}
              disabled={currentIndex === 0}
              className="p-3 rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={next}
              disabled={currentIndex >= featuredJobs.length - jobsPerView}
              className="p-3 rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/jobs?featured=true"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Xem tất cả việc làm
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobsSlider;