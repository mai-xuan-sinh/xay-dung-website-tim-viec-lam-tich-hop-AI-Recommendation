// src/pages/home/HeroSection.jsx
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline';

// Danh sách quận/huyện Đà Nẵng
const districts = [
  { value: '', label: 'Địa điểm' },
  { value: 'Hải Châu', label: 'Quận Hải Châu' },
  { value: 'Thanh Khê', label: 'Quận Thanh Khê' },
  { value: 'Sơn Trà', label: 'Quận Sơn Trà' },
  { value: 'Ngũ Hành Sơn', label: 'Quận Ngũ Hành Sơn' },
  { value: 'Liên Chiểu', label: 'Quận Liên Chiểu' },
  { value: 'Cẩm Lệ', label: 'Quận Cẩm Lệ' },
  { value: 'Hòa Vang', label: 'Huyện Hòa Vang' }
];

const HeroSection = ({ slides, currentSlide, setCurrentSlide, searchTerm, setSearchTerm, location, setLocation, handleSearch, totalJobs }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    setLocation(value);
  };

  return (
    <div className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
          
          {/* Title ở góc trên bên phải */}
          <div className="absolute top-8 right-8 md:top-16 md:right-16 text-white text-right z-10 animate-fade-up">
            <span className="text-sm uppercase tracking-wider text-blue-300">KHÁM PHÁ</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">{slide.title}</h2>
            <p className="text-gray-200 text-sm mt-1">{slide.desc}</p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group z-20"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white group-hover:scale-110 transition" />
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group z-20"
      >
        <ChevronRightIcon className="h-6 w-6 text-white group-hover:scale-110 transition" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Main Content - Form tìm kiếm ở giữa */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="max-w-4xl w-full mx-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <SparklesIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white">🔥 {totalJobs}+ cơ hội việc làm</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Tìm việc mơ ước
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              tại Đà Nẵng
            </span>
          </h1>
          
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
            Kết nối với hàng ngàn nhà tuyển dụng hàng đầu. Công việc phù hợp với kỹ năng và đam mê của bạn.
          </p>

          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Vị trí, kỹ năng, công ty..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedDistrict}
                onChange={handleLocationChange}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none appearance-none bg-white cursor-pointer border-none"
              >
                {districts.map((district) => (
                  <option key={district.value} value={district.value}>
                    {district.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <button type="submit" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
              Tìm kiếm
            </button>
          </form>

          <p className="text-sm text-gray-300 mt-4">Ví dụ: React, Marketing, Lễ tân, Kỹ sư xây dựng</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;