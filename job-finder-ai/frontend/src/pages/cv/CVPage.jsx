// src/pages/cv/CVPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentTextIcon,
  ArrowLeftIcon,
  SparklesIcon,
  PaintBrushIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ChevronRightIcon,
  EyeIcon,
  PrinterIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import CVTemplateGallery from './CVTemplateGallery';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
import './CVPage.css';

// Dữ liệu mặc định cho CV
const defaultCVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    title: '',
    summary: '',
    linkedin: '',
    website: '',
    github: '',
    objective: ''
  },
  experiences: [],
  educations: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
  activities: []
};

const CVPage = () => {
  const location = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [cvData, setCvData] = useState(defaultCVData);
  const [step, setStep] = useState('gallery'); // gallery, form, preview
  const [activeTab, setActiveTab] = useState('styles'); // styles, industries

  // Xác định tab dựa trên URL
  useEffect(() => {
    if (location.pathname === '/cv-styles') {
      setActiveTab('styles');
    } else if (location.pathname === '/cv-industries') {
      setActiveTab('industries');
    } else {
      setActiveTab('styles');
    }
  }, [location.pathname]);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setStep('form');
  };

  const handleBackToGallery = () => {
    setStep('gallery');
    setSelectedTemplate(null);
  };

  const handleUpdateCV = (newData) => {
    setCvData(newData);
  };

  const handlePreview = () => {
    setStep('preview');
  };

  const handleBackToForm = () => {
    setStep('form');
  };

  const handleSaveCV = () => {
    // TODO: Lưu CV vào localStorage hoặc API
    console.log('CV saved:', cvData);
    alert('CV đã được lưu thành công!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Tính năng xuất PDF đang phát triển!');
  };

  // Reset CV data khi chọn template mới
  const handleNewTemplate = (template) => {
    setSelectedTemplate(template);
    setCvData(defaultCVData);
    setStep('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <SparklesIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm text-white">Tạo CV chuyên nghiệp - Hoàn toàn miễn phí</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tạo CV Ấn Tượng
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Trong 5 Phút
              </span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Hàng ngàn mẫu CV độc đáo, thiết kế chuyên nghiệp, phù hợp với mọi ngành nghề
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link 
                to="/cv-styles" 
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('styles');
                  setStep('gallery');
                }}
              >
                Xem mẫu theo phong cách
              </Link>
              <Link 
                to="/cv-industries" 
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('industries');
                  setStep('gallery');
                }}
              >
                Xem mẫu theo ngành
              </Link>
              <Link 
                to="/cv-guide" 
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                Hướng dẫn viết CV
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className={`flex items-center space-x-2 ${step === 'gallery' ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${step === 'gallery' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="hidden md:inline font-medium">Chọn mẫu</span>
            </div>
            <div className="w-8 md:w-16 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${step === 'form' ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${step === 'form' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="hidden md:inline font-medium">Điền thông tin</span>
            </div>
            <div className="w-8 md:w-16 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${step === 'preview' ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${step === 'preview' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className="hidden md:inline font-medium">Xem trước</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher - chỉ hiển thị ở gallery */}
        {step === 'gallery' && (
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg inline-flex">
              <button
                onClick={() => setActiveTab('styles')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === 'styles'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <PaintBrushIcon className="h-5 w-5" />
                  <span>CV Theo Phong Cách</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('industries')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === 'industries'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-5 w-5" />
                  <span>CV Theo Ngành Nghề</span>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="animate-fadeIn">
          {step === 'gallery' && (
            <CVTemplateGallery 
              onSelectTemplate={handleSelectTemplate}
              activeTab={activeTab}
            />
          )}

          {step === 'form' && selectedTemplate && (
            <CVForm 
              template={selectedTemplate}
              cvData={cvData}
              onUpdate={handleUpdateCV}
              onBack={handleBackToGallery}
              onNext={handlePreview}
            />
          )}

          {step === 'preview' && selectedTemplate && (
            <CVPreview 
              template={selectedTemplate}
              cvData={cvData}
              onBack={handleBackToForm}
              onSave={handleSaveCV}
              onPrint={handlePrint}
              onDownload={handleDownload}
            />
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CVPage;