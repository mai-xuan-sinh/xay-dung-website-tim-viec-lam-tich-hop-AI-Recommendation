import React from 'react';

const SalaryTrends = ({ selectedYear }) => {
  const getSalaryData = () => {
    const data = {
      2024: { fresher: '6-10M', junior: '8-14M', middle: '12-18M', senior: '18-28M', avg: 10.5 },
      2025: { fresher: '7-11M', junior: '10-16M', middle: '14-22M', senior: '20-32M', avg: 12.2 },
      2026: { fresher: '8-12M', junior: '12-18M', middle: '15-25M', senior: '22-38M', avg: 15.2 },
      2027: { fresher: '9-14M', junior: '14-22M', middle: '18-30M', senior: '28-45M', avg: 18.5 },
      2028: { fresher: '10-16M', junior: '16-26M', middle: '22-36M', senior: '35-55M', avg: 22.0 },
      2029: { fresher: '12-18M', junior: '18-30M', middle: '26-42M', senior: '42-65M', avg: 26.5 },
      2030: { fresher: '14-22M', junior: '22-36M', middle: '32-50M', senior: '50-80M', avg: 32.0 },
    };
    return data[selectedYear] || data[2026];
  };

  const salaryData = getSalaryData();

  const salaryTable = [
    { level: 'Fresher', it: salaryData.fresher, tourism: salaryData.fresher, business: salaryData.fresher, construction: salaryData.fresher, service: salaryData.fresher },
    { level: 'Junior (1-2 năm)', it: salaryData.junior, tourism: salaryData.junior, business: salaryData.junior, construction: salaryData.junior, service: salaryData.junior },
    { level: 'Middle (3-5 năm)', it: salaryData.middle, tourism: salaryData.middle, business: salaryData.middle, construction: salaryData.middle, service: salaryData.middle },
    { level: 'Senior (5+ năm)', it: salaryData.senior, tourism: salaryData.senior, business: salaryData.senior, construction: salaryData.senior, service: salaryData.senior },
  ];

  const trends = [
    { year: 2024, avg: 10.5 },
    { year: 2025, avg: 12.2 },
    { year: 2026, avg: 15.2, highlight: true },
    { year: 2027, avg: 18.5 },
    { year: 2028, avg: 22.0 },
    { year: 2029, avg: 26.5 },
    { year: 2030, avg: 32.0 },
  ];

  return (
    <div className="space-y-6">
      {/* Salary Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bảng lương theo ngành và kinh nghiệm</h2>
        <p className="text-gray-600 mb-6">Cập nhật {selectedYear}</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Trình độ</th>
                <th className="text-left py-3 px-4 font-semibold text-blue-600">IT</th>
                <th className="text-left py-3 px-4 font-semibold text-green-600">Du lịch</th>
                <th className="text-left py-3 px-4 font-semibold text-yellow-600">Kinh doanh</th>
                <th className="text-left py-3 px-4 font-semibold text-orange-600">Xây dựng</th>
                <th className="text-left py-3 px-4 font-semibold text-purple-600">Dịch vụ</th>
               </tr>
            </thead>
            <tbody>
              {salaryTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{row.level}</td>
                  <td className="py-3 px-4 text-blue-600 font-medium">{row.it}</td>
                  <td className="py-3 px-4 text-green-600">{row.tourism}</td>
                  <td className="py-3 px-4 text-yellow-600">{row.business}</td>
                  <td className="py-3 px-4 text-orange-600">{row.construction}</td>
                  <td className="py-3 px-4 text-purple-600">{row.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Xu hướng lương trung bình</h2>
        <p className="text-gray-600 mb-6">Đơn vị: Triệu đồng/tháng</p>
        
        <div className="space-y-4">
          {trends.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div className="w-16 text-sm text-gray-500">{item.year}</div>
              <div className="flex-1">
                <div 
                  className={`h-8 rounded-lg flex items-center justify-end px-3 text-sm font-medium ${
                    item.year === selectedYear ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                  }`}
                  style={{ width: `${(item.avg / 35) * 100}%` }}
                >
                  {item.avg}M
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">
            📈 Dự báo lương trung bình tại Đà Nẵng sẽ đạt {salaryData.avg} triệu đồng vào năm {selectedYear},
            tăng trưởng trung bình 12-15% mỗi năm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalaryTrends;