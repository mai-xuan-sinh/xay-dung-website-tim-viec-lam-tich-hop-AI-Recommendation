// src/pages/guide/GuidePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, SparklesIcon } from '@heroicons/react/24/outline';
import HeroGuide from './HeroGuide';
import GuideSection from './GuideSection';
import FAQSection from './FAQSection';
import GuideSidebar from './GuideSidebar';
import './GuidePage.css';
import bannerBg from '../../assets/banner_chinh.jpg';

const GuidePage = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: 'Giới thiệu' },
    { id: 'register', title: 'Đăng ký tài khoản' },
    { id: 'profile', title: 'Tạo hồ sơ & CV' },
    { id: 'search', title: 'Tìm kiếm việc làm' },
    { id: 'apply', title: 'Ứng tuyển' },
    { id: 'ai', title: 'AI gợi ý việc làm' },
    { id: 'interview', title: 'Chuẩn bị phỏng vấn' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section với background hình ảnh */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerBg})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <BookOpenIcon className="h-5 w-5 text-white" />
              <span className="text-sm text-white">Hướng dẫn sử dụng</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Bắt đầu hành trình
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                tìm việc thành công
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Hướng dẫn chi tiết từ A-Z giúp bạn làm quen và sử dụng hiệu quả các tính năng của ĐANANG WORK
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Điều hướng nhanh */}
          <div className="lg:w-1/4">
            <GuideSidebar 
              sections={sections} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-12">
            <GuideSection id="intro" title="Giới thiệu" setActiveSection={setActiveSection}>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Chào mừng bạn đến với ĐANANG WORK - nền tảng kết nối việc làm thông minh tại Đà Nẵng. 
                  Hướng dẫn này sẽ giúp bạn làm quen với các tính năng và tận dụng tối đa công nghệ AI để tìm kiếm công việc mơ ước.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="font-semibold text-gray-800">Tìm việc nhanh</p>
                    <p className="text-sm text-gray-500">Hơn 1000+ việc làm</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🤖</div>
                    <p className="font-semibold text-gray-800">Gợi ý thông minh</p>
                    <p className="text-sm text-gray-500">AI phân tích kỹ năng</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">💼</div>
                    <p className="font-semibold text-gray-800">Kết nối trực tiếp</p>
                    <p className="text-sm text-gray-500">Với nhà tuyển dụng</p>
                  </div>
                </div>
              </div>
            </GuideSection>

            <GuideSection id="register" title="Đăng ký tài khoản" setActiveSection={setActiveSection}>
              {/* Nội dung giữ nguyên */}
            </GuideSection>

            <GuideSection id="profile" title="Tạo hồ sơ & CV" setActiveSection={setActiveSection}>
              {/* Nội dung giữ nguyên */}
            </GuideSection>

            <GuideSection id="search" title="Tìm kiếm việc làm" setActiveSection={setActiveSection}>
              {/* Nội dung giữ nguyên */}
            </GuideSection>

            <GuideSection id="apply" title="Ứng tuyển" setActiveSection={setActiveSection}>
              {/* Nội dung giữ nguyên */}
            </GuideSection>

            <GuideSection id="ai" title="AI gợi ý việc làm" setActiveSection={setActiveSection}>
              {/* Nội dung giữ nguyên */}
            </GuideSection>

            <GuideSection id="interview" title="Chuẩn bị phỏng vấn" setActiveSection={setActiveSection}>
              {/* Nội dung giữ nguyên */}
            </GuideSection>

            {/* FAQ Section */}
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;