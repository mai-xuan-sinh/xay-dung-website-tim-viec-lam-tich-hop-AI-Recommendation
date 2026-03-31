// src/pages/support/SupportPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import HeroSupport from './components/HeroSupport';
import ContactChannels from './components/ContactChannels';
import FAQSection from './components/FAQSection';
import SupportForm from './components/SupportForm';
import SupportStats from './components/SupportStats';
import SystemStatus from './components/SystemStatus';
import VideoTutorials from './components/VideoTutorials';
import './SupportPage.css';

const SupportPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmitSupport = (formData) => {
    console.log('Support request submitted:', formData);
    alert('Yêu cầu hỗ trợ đã được gửi! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Hỗ trợ</span>
          </div>
          
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 group"
          >
            <HomeIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Quay lại trang chủ</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSupport />

      {/* Contact Channels */}
      <ContactChannels />

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Gửi yêu cầu hỗ trợ</span>
          </button>
        </div>
      </div>

      {/* Support Form Modal */}
      {showForm && (
        <SupportForm onSubmit={handleSubmitSupport} onClose={() => setShowForm(false)} />
      )}

      {/* FAQ Section */}
      <FAQSection />

      {/* Video Tutorials */}
      <VideoTutorials />

      {/* System Status */}
      <SystemStatus />

      {/* Support Stats */}
      <SupportStats />
    </div>
  );
};

export default SupportPage;