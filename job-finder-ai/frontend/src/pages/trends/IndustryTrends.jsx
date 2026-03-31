import React from 'react';

const IndustryTrends = ({ selectedYear }) => {
  const getIndustryData = () => {
    const data = {
      2024: { it: { growth: '+15%', jobs: 22 }, tourism: { growth: '+10%', jobs: 18 }, business: { growth: '+8%', jobs: 16 }, construction: { growth: '+5%', jobs: 14 }, service: { growth: '+8%', jobs: 15 } },
      2025: { it: { growth: '+20%', jobs: 24 }, tourism: { growth: '+18%', jobs: 22 }, business: { growth: '+12%', jobs: 18 }, construction: { growth: '+7%', jobs: 16 }, service: { growth: '+12%', jobs: 18 } },
      2026: { it: { growth: '+32%', jobs: 26 }, tourism: { growth: '+28%', jobs: 27 }, business: { growth: '+18%', jobs: 21 }, construction: { growth: '+10%', jobs: 21 }, service: { growth: '+15%', jobs: 26 } },
      2027: { it: { growth: '+45%', jobs: 32 }, tourism: { growth: '+35%', jobs: 34 }, business: { growth: '+25%', jobs: 27 }, construction: { growth: '+14%', jobs: 25 }, service: { growth: '+22%', jobs: 32 } },
      2028: { it: { growth: '+55%', jobs: 38 }, tourism: { growth: '+42%', jobs: 42 }, business: { growth: '+32%', jobs: 34 }, construction: { growth: '+18%', jobs: 30 }, service: { growth: '+30%', jobs: 40 } },
      2029: { it: { growth: '+68%', jobs: 45 }, tourism: { growth: '+50%', jobs: 52 }, business: { growth: '+40%', jobs: 42 }, construction: { growth: '+22%', jobs: 36 }, service: { growth: '+38%', jobs: 50 } },
      2030: { it: { growth: '+80%', jobs: 55 }, tourism: { growth: '+60%', jobs: 65 }, business: { growth: '+48%', jobs: 52 }, construction: { growth: '+28%', jobs: 44 }, service: { growth: '+45%', jobs: 62 } },
    };
    return data[selectedYear] || data[2026];
  };

  const industryData = getIndustryData();

  const industries = [
    { name: 'Công nghệ thông tin', icon: '💻', growth: industryData.it.growth, jobs: industryData.it.jobs, color: 'blue' },
    { name: 'Du lịch - Khách sạn', icon: '🏖️', growth: industryData.tourism.growth, jobs: industryData.tourism.jobs, color: 'green' },
    { name: 'Kinh doanh - Bán lẻ', icon: '💼', growth: industryData.business.growth, jobs: industryData.business.jobs, color: 'yellow' },
    { name: 'Xây dựng - BĐS', icon: '🏗️', growth: industryData.construction.growth, jobs: industryData.construction.jobs, color: 'orange' },
    { name: 'Dịch vụ - Logistics', icon: '🛎️', growth: industryData.service.growth, jobs: industryData.service.jobs, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Phân tích ngành {selectedYear}</h2>
        <p className="text-gray-600 mb-6">Xu hướng phát triển của 5 ngành trọng điểm tại Đà Nẵng</p>
        
        <div className="space-y-4">
          {industries.map((industry, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{industry.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{industry.name}</h3>
                    <p className="text-sm text-gray-500">Số việc làm: {industry.jobs}+</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{industry.growth}</div>
                    <div className="text-xs text-gray-500">Tăng trưởng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{industry.jobs}</div>
                    <div className="text-xs text-gray-500">Việc làm</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-${industry.color}-500 rounded-full`} style={{ width: `${parseInt(industry.growth)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryTrends;