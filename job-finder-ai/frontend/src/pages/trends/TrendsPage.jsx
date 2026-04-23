import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  CalendarIcon,
  SparklesIcon,
  ComputerDesktopIcon,
  CameraIcon,
  HomeModernIcon,
  ShoppingBagIcon,
  TruckIcon,
  TrophyIcon,
  FireIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import MarketOverview from './MarketOverview';
import IndustryTrends from './IndustryTrends';
import SalaryTrends from './SalaryTrends';
import SkillDemand from './SkillDemand';
import FuturePredictions from './FuturePredictions';
import './TrendsPage.css';
import trendsbg from '../../assets/banner_chinh.jpg';

const TrendsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState(2026);
  const currentYear = new Date().getFullYear();

  const tabs = [
    { id: 'overview', label: 'Tổng quan thị trường', icon: ChartBarIcon, color: 'blue' },
    { id: 'industry', label: 'Phân tích ngành', icon: ComputerDesktopIcon, color: 'green' },
    { id: 'salary', label: 'Lương & đãi ngộ', icon: CurrencyDollarIcon, color: 'yellow' },
    { id: 'skills', label: 'Kỹ năng hot', icon: FireIcon, color: 'orange' },
    { id: 'future', label: 'Dự báo 2030', icon: RocketLaunchIcon, color: 'purple' },
  ];

  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

  // Thống kê
  const stats = [
    { icon: BriefcaseIcon, label: 'Việc làm', value: '121+', growth: '+32%', color: 'blue', width: 'w-3/4' },
    { icon: BuildingOfficeIcon, label: 'Công ty', value: '50+', growth: '+18%', color: 'green', width: 'w-2/3' },
    { icon: UsersIcon, label: 'Ứng viên', value: '5,000+', growth: '+45%', color: 'purple', width: 'w-4/5' },
    { icon: ArrowTrendingUpIcon, label: 'Lương TB', value: '15.2M', growth: '+15%', color: 'orange', width: 'w-3/5' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section với background hình ảnh */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${trendsbg})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <TrophyIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm text-white">Báo cáo thường niên {currentYear}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Thị trường lao động
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Đà Nẵng {currentYear}
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Phân tích chuyên sâu về xu hướng tuyển dụng, mức lương và kỹ năng hot nhất
              tại thành phố đáng sống nhất Việt Nam
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedYear === year
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <span className={`text-3xl font-bold text-${stat.color}-600`}>{stat.growth}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <div className="mt-3 h-1 w-full bg-gray-100 rounded-full">
                  <div className={`h-1 ${stat.width} bg-${stat.color}-600 rounded-full`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const colorClass = {
                blue: 'bg-blue-600 text-white',
                green: 'bg-green-600 text-white',
                yellow: 'bg-yellow-600 text-white',
                orange: 'bg-orange-600 text-white',
                purple: 'bg-purple-600 text-white',
              };
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? colorClass[tab.color]
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === 'overview' && <MarketOverview selectedYear={selectedYear} />}
          {activeTab === 'industry' && <IndustryTrends selectedYear={selectedYear} />}
          {activeTab === 'salary' && <SalaryTrends selectedYear={selectedYear} />}
          {activeTab === 'skills' && <SkillDemand selectedYear={selectedYear} />}
          {activeTab === 'future' && <FuturePredictions selectedYear={selectedYear} />}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TrendsPage;