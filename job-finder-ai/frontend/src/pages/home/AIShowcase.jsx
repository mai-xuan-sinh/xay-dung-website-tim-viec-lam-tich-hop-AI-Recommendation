import React from 'react';
import { SparklesIcon, ChartBarIcon, DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Pattern SVG - tạo biến riêng để tránh lỗi JSX
const patternSvg = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

const AIShowcase = () => {
  const features = [
    { icon: SparklesIcon, title: "Gợi ý siêu thông minh", desc: "AI phân tích hồ sơ, kỹ năng và kinh nghiệm để đề xuất việc làm phù hợp nhất", color: "blue" },
    { icon: ChartBarIcon, title: "Phân tích thị trường", desc: "Cập nhật xu hướng tuyển dụng, mức lương và kỹ năng hot theo thời gian thực", color: "purple" },
    { icon: DocumentTextIcon, title: "Tối ưu CV thông minh", desc: "AI đánh giá và gợi ý cải thiện CV, tăng 40% cơ hội trúng tuyển", color: "green" }
  ];

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${patternSvg})` }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm">
            <SparklesIcon className="h-4 w-4 text-yellow-400" />
            Công nghệ tiên tiến
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4">
            Trải nghiệm AI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              thông minh vượt trội
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Công nghệ AI giúp bạn tìm việc nhanh hơn, chính xác hơn và hiệu quả hơn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            const colorMap = {
              blue: "from-blue-500/20 to-blue-600/20",
              purple: "from-purple-500/20 to-purple-600/20",
              green: "from-green-500/20 to-green-600/20"
            };
            const textColorMap = {
              blue: "text-blue-400",
              purple: "text-purple-400",
              green: "text-green-400"
            };
            return (
              <div key={i} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[f.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <Icon className={`h-7 w-7 ${textColorMap[f.color]}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-300 leading-relaxed">{f.desc}</p>
                <div className="mt-5 flex items-center text-blue-400 group-hover:text-blue-300 transition">
                  <span className="text-sm">Tìm hiểu thêm</span>
                  <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <SparklesIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Thử ngay AI gợi ý việc làm</p>
                <p className="text-gray-400 text-sm">Nhập kỹ năng của bạn để nhận gợi ý phù hợp nhất</p>
              </div>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input type="text" placeholder="React, Python, Marketing..." className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition whitespace-nowrap">
                Gợi ý ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIShowcase;