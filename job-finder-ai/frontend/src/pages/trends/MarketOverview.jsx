import React from 'react';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  MinusIcon, 
  SparklesIcon, 
  RocketLaunchIcon, 
  AcademicCapIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const MarketOverview = ({ selectedYear }) => {
  // Dữ liệu theo từng năm
  const getDataByYear = () => {
    const data = {
      2024: { growth: '+12%', jobs: 85, description: 'Thị trường phục hồi sau đại dịch', highlight: 'Năm phục hồi' },
      2025: { growth: '+18%', jobs: 98, description: 'Tăng trưởng ổn định', highlight: 'Năm ổn định' },
      2026: { growth: '+21%', jobs: 121, description: 'Bùng nổ việc làm IT và du lịch', highlight: 'Năm bùng nổ' },
      2027: { growth: '+25%', jobs: 145, description: 'AI và công nghệ số lên ngôi', highlight: 'Kỷ nguyên AI' },
      2028: { growth: '+28%', jobs: 168, description: 'Công nghệ xanh phát triển mạnh', highlight: 'Công nghệ xanh' },
      2029: { growth: '+32%', jobs: 195, description: 'Kinh tế số chiếm ưu thế', highlight: 'Kinh tế số' },
      2030: { growth: '+35%', jobs: 220, description: 'Thành phố thông minh', highlight: 'Thành phố thông minh' },
    };
    return data[selectedYear] || data[2026];
  };

  const data = getDataByYear();

  const marketHighlights = [
    {
      title: 'Công nghệ thông tin',
      growth: selectedYear === 2024 ? '+15%' : selectedYear === 2025 ? '+20%' : selectedYear === 2026 ? '+32%' : selectedYear === 2027 ? '+45%' : selectedYear === 2028 ? '+55%' : selectedYear === 2029 ? '+68%' : '+80%',
      trend: 'up',
      color: 'blue',
      description: selectedYear === 2027 ? 'AI Engineer trở thành vị trí hot nhất' : 'Nhu cầu tuyển dụng IT tăng cao',
      jobs: selectedYear === 2024 ? '280+' : selectedYear === 2025 ? '320+' : selectedYear === 2026 ? '450+' : selectedYear === 2027 ? '580+' : selectedYear === 2028 ? '720+' : selectedYear === 2029 ? '890+' : '1100+'
    },
    {
      title: 'Du lịch - Khách sạn',
      growth: selectedYear === 2024 ? '+10%' : selectedYear === 2025 ? '+18%' : selectedYear === 2026 ? '+28%' : selectedYear === 2027 ? '+35%' : selectedYear === 2028 ? '+42%' : selectedYear === 2029 ? '+50%' : '+60%',
      trend: 'up',
      color: 'green',
      description: selectedYear === 2027 ? 'Du lịch thông minh, cá nhân hóa trải nghiệm' : 'Phục hồi mạnh mẽ',
      jobs: selectedYear === 2024 ? '220+' : selectedYear === 2025 ? '280+' : selectedYear === 2026 ? '380+' : selectedYear === 2027 ? '480+' : selectedYear === 2028 ? '590+' : selectedYear === 2029 ? '720+' : '880+'
    },
    {
      title: 'Kinh doanh - Bán lẻ',
      growth: selectedYear === 2024 ? '+8%' : selectedYear === 2025 ? '+12%' : selectedYear === 2026 ? '+18%' : selectedYear === 2027 ? '+25%' : selectedYear === 2028 ? '+32%' : selectedYear === 2029 ? '+40%' : '+48%',
      trend: 'up',
      color: 'yellow',
      description: selectedYear === 2027 ? 'Thương mại điện tử chiếm 50% thị trường' : 'Thương mại điện tử bùng nổ',
      jobs: selectedYear === 2024 ? '180+' : selectedYear === 2025 ? '220+' : selectedYear === 2026 ? '290+' : selectedYear === 2027 ? '370+' : selectedYear === 2028 ? '460+' : selectedYear === 2029 ? '570+' : '700+'
    },
    {
      title: 'Xây dựng - BĐS',
      growth: selectedYear === 2024 ? '+5%' : selectedYear === 2025 ? '+7%' : selectedYear === 2026 ? '+10%' : selectedYear === 2027 ? '+14%' : selectedYear === 2028 ? '+18%' : selectedYear === 2029 ? '+22%' : '+28%',
      trend: 'stable',
      color: 'orange',
      description: selectedYear === 2027 ? 'Dự án đô thị thông minh được triển khai' : 'Nhiều dự án hạ tầng lớn',
      jobs: selectedYear === 2024 ? '150+' : selectedYear === 2025 ? '170+' : selectedYear === 2026 ? '210+' : selectedYear === 2027 ? '260+' : selectedYear === 2028 ? '320+' : selectedYear === 2029 ? '390+' : '480+'
    },
    {
      title: 'Dịch vụ - Logistics',
      growth: selectedYear === 2024 ? '+8%' : selectedYear === 2025 ? '+12%' : selectedYear === 2026 ? '+15%' : selectedYear === 2027 ? '+22%' : selectedYear === 2028 ? '+30%' : selectedYear === 2029 ? '+38%' : '+45%',
      trend: 'up',
      color: 'purple',
      description: selectedYear === 2027 ? 'Logistics thông minh, tự động hóa' : 'Phát triển nhờ thương mại điện tử',
      jobs: selectedYear === 2024 ? '120+' : selectedYear === 2025 ? '140+' : selectedYear === 2026 ? '180+' : selectedYear === 2027 ? '240+' : selectedYear === 2028 ? '310+' : selectedYear === 2029 ? '400+' : '520+'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Market Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {marketHighlights.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className={`h-2 bg-${item.color}-500`}></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                  item.trend === 'up' ? 'bg-green-100 text-green-600' :
                  item.trend === 'down' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  <ArrowTrendingUpIcon className="h-4 w-4" />
                  <span className="text-sm font-bold">{item.growth}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">Việc làm</span>
                <span className="text-lg font-bold text-gray-900">{item.jobs}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <SparklesIcon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Thị trường lao động {selectedYear}</h3>
              <p className="text-blue-100">{data.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{data.growth}</div>
            <div className="text-blue-200 text-sm">so với năm trước</div>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RocketLaunchIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Tăng trưởng {data.growth}</h4>
          <p className="text-gray-500 text-sm">{data.highlight}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AcademicCapIcon className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">{data.jobs}+ việc làm</h4>
          <p className="text-gray-500 text-sm">Cơ hội việc làm đa dạng</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GlobeAltIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Hội nhập quốc tế</h4>
          <p className="text-gray-500 text-sm">Cơ hội làm việc với đối tác nước ngoài</p>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;