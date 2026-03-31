import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CurrencyDollarIcon, BriefcaseIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const JobCard = ({ job }) => (
  <Link to={`/jobs/${job.id}`} className="group bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all block">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">{job.logo || '💼'}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">{job.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{job.company}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          <span className="flex items-center"><MapPinIcon className="h-3 w-3 mr-1" />{job.location}</span>
          <span className="flex items-center"><CurrencyDollarIcon className="h-3 w-3 mr-1 text-green-500" />{job.salary}</span>
          <span className="flex items-center"><BriefcaseIcon className="h-3 w-3 mr-1" />{job.type}</span>
        </div>
      </div>
      {job.hot && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Hot</span>}
    </div>
  </Link>
);

const JobList = ({ jobs, title, viewAllLink }) => {
  const demoJobs = [
    { id: 1, title: "Frontend Developer", company: "FPT Software", location: "Hải Châu", salary: "12-20M", type: "Full-time", hot: true, logo: "⚛️" },
    { id: 2, title: "Backend Developer", company: "Axon Active", location: "Ngũ Hành Sơn", salary: "15-25M", type: "Full-time", hot: true, logo: "🟢" },
    { id: 3, title: "Fullstack Developer", company: "TMA Solutions", location: "Liên Chiểu", salary: "18-28M", type: "Full-time", hot: false, logo: "🔄" },
    { id: 4, title: "Mobile Developer", company: "GAMELOFT", location: "Sơn Trà", salary: "14-22M", type: "Full-time", hot: false, logo: "📱" },
    { id: 5, title: "UI/UX Designer", company: "DesignBold", location: "Hải Châu", salary: "12-18M", type: "Full-time", hot: false, logo: "🎨" },
    { id: 6, title: "DevOps Engineer", company: "Viettel", location: "Liên Chiểu", salary: "20-30M", type: "Full-time", hot: true, logo: "🚀" }
  ];

  const displayJobs = jobs.length > 0 ? jobs.slice(0, 6) : demoJobs;

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-500 mt-1">Những cơ hội việc làm hấp dẫn nhất</p>
          </div>
          <Link to={viewAllLink} className="flex items-center text-blue-600 hover:text-blue-700 font-medium group">
            Xem tất cả <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayJobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
};

export default JobList;