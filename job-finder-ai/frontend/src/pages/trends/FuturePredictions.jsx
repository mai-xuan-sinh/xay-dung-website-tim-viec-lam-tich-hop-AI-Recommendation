import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, RocketLaunchIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const FuturePredictions = ({ selectedYear }) => {
  const getPrediction = () => {
    const predictions = {
      2027: { title: 'Kỷ nguyên AI', icon: '🤖', trends: ['AI Engineer trở thành vị trí hot nhất', '70% công ty áp dụng AI', 'Nhu cầu nhân lực AI tăng 150%'] },
      2028: { title: 'Công nghệ xanh', icon: '🌱', trends: ['Việc làm năng lượng tái tạo tăng 200%', 'Kỹ sư môi trường được săn đón', 'Đà Nẵng trở thành thành phố xanh'] },
      2029: { title: 'Kinh tế số', icon: '📊', trends: ['TMĐT chiếm 65% thị trường', 'Data Analyst lên ngôi', 'Blockchain tạo 5000+ việc làm'] },
      2030: { title: 'Thành phố thông minh', icon: '🏙️', trends: ['Đà Nẵng trung tâm công nghệ', 'Nhu cầu IoT tăng 300%', 'Làm việc hybrid trở thành chuẩn mực'] },
    };
    return predictions[selectedYear] || predictions[2027];
  };

  const prediction = getPrediction();

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <RocketLaunchIcon className="h-10 w-10" />
          <h2 className="text-2xl md:text-3xl font-bold">Dự báo năm {selectedYear}</h2>
        </div>
        <p className="text-orange-100">Phân tích xu hướng và dự báo thị trường lao động Đà Nẵng năm {selectedYear}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
        <div className={`p-8 border-l-4 border-blue-500`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-5xl">{prediction.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900">{prediction.title}</h3>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-blue-100 rounded-full">
              <CalendarIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">{selectedYear}</span>
            </div>
          </div>
          <ul className="space-y-3">
            {prediction.trends.map((trend, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5">▹</span>
                <span className="text-gray-600 text-base">{trend}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 rounded-2xl p-8 text-white text-center">
        <LightBulbIcon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Sẵn sàng cho năm {selectedYear}?</h3>
        <p className="text-gray-300 mb-6">Trang bị ngay những kỹ năng cần thiết để không bị bỏ lại phía sau</p>
        <Link to="/jobs" className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
          <span>Khám phá việc làm ngay</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
};

export default FuturePredictions;