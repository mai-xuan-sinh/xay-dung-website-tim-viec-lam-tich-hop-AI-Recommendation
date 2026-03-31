// src/pages/cv/CVTemplateGallery.jsx
import React, { useState } from 'react';
import { 
  PaintBrushIcon, 
  SparklesIcon, 
  ShieldCheckIcon,
  ComputerDesktopIcon,
  CameraIcon,
  ShoppingBagIcon,
  HomeModernIcon,
  TruckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Import hình ảnh preview cho từng mẫu - BẠN CẦN THÊM ẢNH VÀO THƯ MỤC assets/cv-previews/
// Các ảnh sẽ được đặt tên theo id của template
import minimal1Img from '../../assets/cv-previews/logocv.webp';
import minimal2Img from '../../assets/cv-previews/logocv.webp';
import minimal3Img from '../../assets/cv-previews/logocv.webp';
import minimal4Img from '../../assets/cv-previews/logocv.webp';
import minimal5Img from '../../assets/cv-previews/logocv.webp';

import modern1Img from '../../assets/cv-previews/logocv.webp';
import modern2Img from '../../assets/cv-previews/logocv.webp';
import modern3Img from '../../assets/cv-previews/logocv.webp';
import modern4Img from '../../assets/cv-previews/logocv.webp';
import modern5Img from '../../assets/cv-previews/logocv.webp';

import professional1Img from '../../assets/cv-previews/logocv.webp';
import professional2Img from '../../assets/cv-previews/logocv.webp';
import professional3Img from '../../assets/cv-previews/logocv.webp';
import professional4Img from '../../assets/cv-previews/logocv.webp';
import professional5Img from '../../assets/cv-previews/logocv.webp';

import it1Img from '../../assets/cv-previews/logocv.webp';
import it2Img from '../../assets/cv-previews/logocv.webp';
import it3Img from '../../assets/cv-previews/logocv.webp';
import it4Img from '../../assets/cv-previews/logocv.webp';
import it5Img from '../../assets/cv-previews/logocv.webp';

import tourism1Img from '../../assets/cv-previews/logocv.webp';
import tourism2Img from '../../assets/cv-previews/logocv.webp';
import tourism3Img from '../../assets/cv-previews/logocv.webp';
import tourism4Img from '../../assets/cv-previews/logocv.webp';
import tourism5Img from '../../assets/cv-previews/logocv.webp';

import business1Img from '../../assets/cv-previews/logocv.webp';
import business2Img from '../../assets/cv-previews/logocv.webp';
import business3Img from '../../assets/cv-previews/logocv.webp';
import business4Img from '../../assets/cv-previews/logocv.webp';
import business5Img from '../../assets/cv-previews/logocv.webp';

import construction1Img from '../../assets/cv-previews/logocv.webp';
import construction2Img from '../../assets/cv-previews/logocv.webp';
import construction3Img from '../../assets/cv-previews/logocv.webp';
import construction4Img from '../../assets/cv-previews/logocv.webp';
import construction5Img from '../../assets/cv-previews/logocv.webp';

import service1Img from '../../assets/cv-previews/logocv.webp';
import service2Img from '../../assets/cv-previews/logocv.webp';
import service3Img from '../../assets/cv-previews/logocv.webp';
import service4Img from '../../assets/cv-previews/logocv.webp';
import service5Img from '../../assets/cv-previews/logocv.webp';

// ==================== DỮ LIỆU MẪU CV ====================

// Dữ liệu mẫu CV theo phong cách Tối giản - 5 mẫu (không icon)
const minimalTemplates = [
  {
    id: 'minimal-1',
    name: 'Minimal 1',
    title: 'Tối giản - Cân bằng',
    description: 'Bố cục 1 cột, thông tin ngang, phù hợp mọi ngành',
    image: minimal1Img,
    color: 'from-gray-500 to-gray-700',
    bgColor: 'gray',
    features: ['Bố cục 1 cột', 'Thông tin ngang', 'Dễ đọc']
  },
  {
    id: 'minimal-2',
    name: 'Minimal 2',
    title: 'Tối giản - 2 cột',
    description: 'Bố cục 2 cột, thông tin cân bằng, chuyên nghiệp',
    image: minimal2Img,
    color: 'from-gray-500 to-gray-700',
    bgColor: 'gray',
    features: ['Bố cục 2 cột', 'Thông tin liên hệ', 'Kỹ năng thanh']
  },
  {
    id: 'minimal-3',
    name: 'Minimal 3',
    title: 'Tối giản - 4 cột',
    description: 'Thông tin liên hệ 4 cột, tối ưu không gian',
    image: minimal3Img,
    color: 'from-gray-500 to-gray-700',
    bgColor: 'gray',
    features: ['Thông tin 4 cột', 'Rõ ràng', 'Dễ đọc']
  },
  {
    id: 'minimal-4',
    name: 'Minimal 4',
    title: 'Tối giản - Sidebar',
    description: 'Sidebar trái với giới thiệu, kỹ năng, liên hệ',
    image: minimal4Img,
    color: 'from-gray-500 to-gray-700',
    bgColor: 'gray',
    features: ['Sidebar trái', 'Nội dung chính phải', 'Dự án nổi bật']
  },
  {
    id: 'minimal-5',
    name: 'Minimal 5',
    title: 'Tối giản - Sidebar màu',
    description: 'Sidebar xám nhạt, phân chia rõ ràng',
    image: minimal5Img,
    color: 'from-gray-500 to-gray-700',
    bgColor: 'gray',
    features: ['Sidebar màu xám', 'Chứng chỉ', 'Gọn gàng']
  }
];

// Dữ liệu mẫu CV theo phong cách Modern
const modernTemplates = [
  {
    id: 'modern-1',
    name: 'Modern 1',
    title: 'Thiết kế đồ họa',
    description: 'Mẫu CV hiện đại cho ngành Thiết kế đồ họa, Mỹ thuật',
    image: modern1Img,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'purple',
    features: ['Bố cục 2 cột', 'Kỹ năng chính', 'Tiểu sử chuyên môn']
  },
  {
    id: 'modern-2',
    name: 'Modern 2',
    title: 'Quản lý tiếp thị',
    description: 'Mẫu CV hiện đại cho ngành Marketing, Quản lý',
    image: modern2Img,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'blue',
    features: ['Bố cục 2 cột', 'Kỹ năng chuyên môn', 'Thông tin liên hệ']
  },
  {
    id: 'modern-3',
    name: 'Modern 3',
    title: 'Nhiếp ảnh gia',
    description: 'Mẫu CV hiện đại cho ngành Nhiếp ảnh, Sáng tạo',
    image: modern3Img,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'green',
    features: ['Bố cục 3 cột', 'Giải thưởng', 'Người giới thiệu']
  },
  {
    id: 'modern-4',
    name: 'Modern 4',
    title: 'Kế toán',
    description: 'Mẫu CV hiện đại cho ngành Kế toán, Tài chính',
    image: modern4Img,
    color: 'from-gray-500 to-gray-700',
    bgColor: 'gray',
    features: ['Thông tin block', 'Kinh nghiệm chi tiết', 'Kỹ năng tag']
  },
  {
    id: 'modern-5',
    name: 'Modern 5',
    title: 'Truyền thông',
    description: 'Mẫu CV hiện đại cho ngành Truyền thông, Mạng xã hội',
    image: modern5Img,
    color: 'from-red-500 to-pink-500',
    bgColor: 'red',
    features: ['Bố cục 2 cột', 'Thành tích', 'Kỹ năng đa dạng']
  }
];

// Dữ liệu mẫu CV theo phong cách Professional
const professionalTemplates = [
  {
    id: 'professional-1',
    name: 'Professional 1',
    title: 'Thiết kế đồ họa',
    description: 'Mẫu CV chuyên nghiệp cho ngành Thiết kế đồ họa, Mỹ thuật',
    image: professional1Img,
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'blue',
    features: ['Bố cục 2 cột', 'Chuyên môn', 'Kinh nghiệm chi tiết']
  },
  {
    id: 'professional-2',
    name: 'Professional 2',
    title: 'Lão khoa - Y tế',
    description: 'Mẫu CV chuyên nghiệp cho ngành Y tế, Bác sĩ',
    image: professional2Img,
    color: 'from-green-600 to-emerald-600',
    bgColor: 'green',
    features: ['Kinh nghiệm lâm sàng', 'Học vấn cao', 'Tình nguyện']
  },
  {
    id: 'professional-3',
    name: 'Professional 3',
    title: 'Thiết kế đồ họa trẻ',
    description: 'Mẫu CV chuyên nghiệp cho Designer mới ra trường',
    image: professional3Img,
    color: 'from-purple-600 to-pink-600',
    bgColor: 'purple',
    features: ['Học vấn', 'Kinh nghiệm thực tập', 'Kỹ năng chuyên sâu']
  },
  {
    id: 'professional-4',
    name: 'Professional 4',
    title: 'Thiết kế thời trang',
    description: 'Mẫu CV chuyên nghiệp cho ngành Thời trang, Sáng tạo',
    image: professional4Img,
    color: 'from-pink-600 to-rose-600',
    bgColor: 'pink',
    features: ['Kinh nghiệm thực tế', 'Kỹ năng chuyên môn', 'Đào tạo chuyên sâu']
  },
  {
    id: 'professional-5',
    name: 'Professional 5',
    title: 'Chuyên nghiệp đa năng',
    description: 'Mẫu CV chuyên nghiệp phù hợp với nhiều ngành nghề',
    image: professional5Img,
    color: 'from-gray-600 to-gray-800',
    bgColor: 'gray',
    features: ['Bố cục cân đối', 'Thông tin đầy đủ', 'Dễ đọc']
  }
];

// Dữ liệu mẫu CV ngành IT
const itTemplates = [
  { id: 'it-1', name: 'IT Developer 1', title: 'UI/UX Designer Style', description: 'Mẫu CV 2 cột với sidebar xanh navy, thanh kỹ năng phần trăm', image: it1Img, color: 'from-blue-600 to-indigo-600', bgColor: 'blue', features: ['2 cột', 'Sidebar màu', 'Thanh kỹ năng'] },
  { id: 'it-2', name: 'IT Developer 2', title: 'Tech Style', description: 'Mẫu CV với avatar, sidebar xanh dương, thanh kỹ năng, dự án', image: it2Img, color: 'from-cyan-600 to-blue-700', bgColor: 'cyan', features: ['Avatar', 'Dự án', 'Kỹ năng'] },
  { id: 'it-3', name: 'IT Developer 3', title: 'Developer Style', description: 'Bố cục 3 cột, header gradient, hiện đại', image: it3Img, color: 'from-cyan-600 to-blue-700', bgColor: 'cyan', features: ['3 cột', 'Header gradient', 'Tags kỹ năng'] },
  { id: 'it-4', name: 'IT Developer 4', title: 'Data Scientist Style', description: 'Sidebar cam đậm, thanh kỹ năng dọc, chuyên nghiệp', image: it4Img, color: 'from-orange-600 to-red-600', bgColor: 'orange', features: ['Sidebar cam', 'Thanh kỹ năng', 'Expertise'] },
  { id: 'it-5', name: 'IT Developer 5', title: 'Minimal Tech Style', description: 'Phong cách tối giản, bố cục 2 cột, tập trung nội dung', image: it5Img, color: 'from-gray-600 to-gray-800', bgColor: 'gray', features: ['Tối giản', '2 cột', 'Rõ ràng'] }
];

// Dữ liệu mẫu CV ngành Du lịch
const tourismTemplates = [
  { id: 'tourism-1', name: 'Tourism 1', title: 'Juliana Silva Style', description: 'Bố cục 1 cột, Past Collaborations, Portfolio', image: tourism1Img, color: 'from-green-600 to-emerald-600', bgColor: 'green', features: ['1 cột', 'Past Collaborations', 'Portfolio'] },
  { id: 'tourism-2', name: 'Tourism 2', title: 'Hotel Manager Style', description: '2 cột, sidebar xanh biển, languages, skills', image: tourism2Img, color: 'from-teal-600 to-blue-700', bgColor: 'teal', features: ['2 cột', 'Sidebar', 'Languages'] },
  { id: 'tourism-3', name: 'Tourism 3', title: 'Tour Guide Style', description: 'Header gradient, 3 cột, certificates', image: tourism3Img, color: 'from-amber-500 to-orange-500', bgColor: 'amber', features: ['3 cột', 'Header gradient', 'Certificates'] },
  { id: 'tourism-4', name: 'Tourism 4', title: 'Resort Manager Style', description: 'Sidebar xanh lá, thanh kỹ năng, avatar', image: tourism4Img, color: 'from-emerald-600 to-green-700', bgColor: 'emerald', features: ['Sidebar', 'Thanh kỹ năng', 'Avatar'] },
  { id: 'tourism-5', name: 'Tourism 5', title: 'Travel Agency Style', description: '1 cột, 2 cột nội dung, hiện đại', image: tourism5Img, color: 'from-blue-600 to-indigo-600', bgColor: 'blue', features: ['1 cột', '2 cột nội dung', 'Hiện đại'] }
];

// Dữ liệu mẫu CV ngành Kinh doanh
const businessTemplates = [
  { id: 'business-1', name: 'Business 1', title: 'Hoàng Thái Tuyển Style', description: 'Bố cục 2 cột, kỹ năng %, giải thưởng, sở thích', image: business1Img, color: 'from-blue-600 to-indigo-600', bgColor: 'blue', features: ['2 cột', 'Kỹ năng %', 'Giải thưởng'] },
  { id: 'business-2', name: 'Business 2', title: 'Sales Manager Style', description: 'Sidebar cam, thành tích doanh số, achievement', image: business2Img, color: 'from-orange-600 to-red-600', bgColor: 'orange', features: ['Sidebar cam', 'Doanh số', 'Achievement'] },
  { id: 'business-3', name: 'Business 3', title: 'Marketing Director Style', description: 'Header gradient, 3 cột, hiện đại', image: business3Img, color: 'from-purple-600 to-pink-600', bgColor: 'purple', features: ['Header gradient', '3 cột', 'Hiện đại'] },
  { id: 'business-4', name: 'Business 4', title: 'Business Analyst Style', description: 'Sidebar xanh, số liệu thống kê, key metrics', image: business4Img, color: 'from-blue-800 to-blue-900', bgColor: 'blue', features: ['Key Metrics', 'Số liệu', 'Phân tích'] },
  { id: 'business-5', name: 'Business 5', title: 'Entrepreneur Style', description: 'Tối giản, hiện đại, tập trung nội dung', image: business5Img, color: 'from-gray-600 to-gray-800', bgColor: 'gray', features: ['Tối giản', 'Hiện đại', 'Rõ ràng'] }
];

// Dữ liệu mẫu CV ngành Xây dựng
const constructionTemplates = [
  { id: 'construction-1', name: 'Construction 1', title: 'Minh Chương Style', description: '2 cột, giải thưởng, kỹ năng, học vấn chi tiết', image: construction1Img, color: 'from-orange-600 to-red-600', bgColor: 'orange', features: ['2 cột', 'Giải thưởng', 'Kỹ năng'] },
  { id: 'construction-2', name: 'Construction 2', title: 'Site Engineer Style', description: 'Sidebar xám, kỹ năng %, project scale', image: construction2Img, color: 'from-gray-700 to-gray-900', bgColor: 'gray', features: ['Site Engineer', 'Project Scale', 'Certificates'] },
  { id: 'construction-3', name: 'Construction 3', title: 'Project Manager Style', description: 'Header gradient, budget, PMP certified', image: construction3Img, color: 'from-orange-600 to-red-600', bgColor: 'orange', features: ['Header gradient', 'Budget', 'PMP'] },
  { id: 'construction-4', name: 'Construction 4', title: 'Safety Officer Style', description: 'Sidebar vàng, safety record, certifications', image: construction4Img, color: 'from-yellow-600 to-amber-600', bgColor: 'yellow', features: ['Safety Officer', 'Certifications', 'Record'] },
  { id: 'construction-5', name: 'Construction 5', title: 'Architect Style', description: 'Tối giản, software skills %, projects', image: construction5Img, color: 'from-blue-600 to-indigo-600', bgColor: 'blue', features: ['Architect', 'Software Skills', 'Projects'] }
];

// Dữ liệu mẫu CV ngành Dịch vụ
const serviceTemplates = [
  { id: 'service-1', name: 'Service 1', title: 'Alexander Aronowitz Style', description: '2 cột, sidebar xám, education, language, skills', image: service1Img, color: 'from-gray-500 to-gray-700', bgColor: 'gray', features: ['2 cột', 'Sidebar', 'Language'] },
  { id: 'service-2', name: 'Service 2', title: 'Customer Service Style', description: 'Sidebar xanh, achievement, CS skills', image: service2Img, color: 'from-blue-600 to-blue-800', bgColor: 'blue', features: ['Customer Service', 'Achievement', 'Skills'] },
  { id: 'service-3', name: 'Service 3', title: 'Hospitality Style', description: 'Header gradient, 3 cột, luxury service', image: service3Img, color: 'from-green-600 to-emerald-600', bgColor: 'green', features: ['Header gradient', '3 cột', 'Hospitality'] },
  { id: 'service-4', name: 'Service 4', title: 'Logistics Style', description: 'Sidebar xanh lá, efficiency, supply chain', image: service4Img, color: 'from-green-700 to-green-800', bgColor: 'green', features: ['Logistics', 'Efficiency', 'Supply Chain'] },
  { id: 'service-5', name: 'Service 5', title: 'Front Desk Style', description: 'Tối giản, hiện đại, front desk', image: service5Img, color: 'from-gray-600 to-gray-800', bgColor: 'gray', features: ['Tối giản', 'Front Desk', 'Hiện đại'] }
];

// ==================== COMPONENTS ====================

const TemplateCard = ({ template, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={() => onClick(template)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge nổi bật */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
          Phổ biến
        </div>
      </div>
      
      {/* Hình ảnh preview CV */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={template.image} 
          alt={template.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=CV+Preview';
          }}
        />
      </div>
      
      {/* Nội dung thẻ */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {template.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {template.title}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {template.description}
        </p>
        
        {/* Features Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {template.features.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {feature}
            </span>
          ))}
          {template.features.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              +{template.features.length - 2}
            </span>
          )}
        </div>
        
        {/* Nút Dùng mẫu */}
        <button className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
          isHovered 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <EyeIcon className="h-4 w-4" />
          <span>Dùng mẫu</span>
        </button>
      </div>
      
      {/* Hover Border Effect */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${template.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
    </div>
  );
};

const CategorySection = ({ title, icon: Icon, templates, onSelectTemplate, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  if (templates.length === 0) return null;
  
  return (
    <div className="mb-12">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-6 group"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{templates.length} mẫu CV</p>
          </div>
        </div>
        <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-blue-50' : 'bg-gray-100'}`}>
          {isExpanded ? (
            <ChevronUpIcon className={`h-5 w-5 transition-colors ${isExpanded ? 'text-blue-600' : 'text-gray-500'}`} />
          ) : (
            <ChevronDownIcon className={`h-5 w-5 transition-colors ${isExpanded ? 'text-blue-600' : 'text-gray-500'}`} />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {templates.map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onClick={onSelectTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CVTemplateGallery = ({ onSelectTemplate, activeTab = 'styles' }) => {
  return (
    <div className="space-y-8">
      {activeTab === 'styles' ? (
        <>
          <CategorySection 
            title="Phong cách Tối giản"
            icon={PaintBrushIcon}
            templates={minimalTemplates}
            onSelectTemplate={onSelectTemplate}
            defaultExpanded={true}
          />
          
          <CategorySection 
            title="Phong cách Hiện đại"
            icon={SparklesIcon}
            templates={modernTemplates}
            onSelectTemplate={onSelectTemplate}
            defaultExpanded={false}
          />
          
          <CategorySection 
            title="Phong cách Chuyên nghiệp"
            icon={ShieldCheckIcon}
            templates={professionalTemplates}
            onSelectTemplate={onSelectTemplate}
            defaultExpanded={false}
          />
        </>
      ) : (
        <>
          <CategorySection 
            title="Công nghệ thông tin (IT)"
            icon={ComputerDesktopIcon}
            templates={itTemplates}
            onSelectTemplate={onSelectTemplate}
            defaultExpanded={true}
          />
          
          <CategorySection 
            title="Du lịch - Khách sạn"
            icon={CameraIcon}
            templates={tourismTemplates}
            onSelectTemplate={onSelectTemplate}
            defaultExpanded={false}
          />
          
          <CategorySection 
            title="Kinh doanh - Bán lẻ"
            icon={ShoppingBagIcon}
            templates={businessTemplates}
            onSelectTemplate={onSelectTemplate}
            defaultExpanded={false}
          />
          
          <CategorySection 
            title="Xây dựng - Bất động sản"
            icon={HomeModernIcon}
            templates={constructionTemplates}
            onSelectTemplate={onSelectTemplate}
            defaultExpanded={false}
          />
          
          <CategorySection 
            title="Dịch vụ - Logistics"
            icon={TruckIcon}
            templates={serviceTemplates}
            onSelectTemplate={onSelectTemplate}
            defaultExpanded={false}
          />
        </>
      )}
      
      {/* Thống kê */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-indigo-100 mt-8">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <SparklesIcon className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-1">✨ 40 mẫu CV chuyên nghiệp đã sẵn sàng</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
              <div><p className="text-sm font-semibold text-gray-800">5 mẫu Tối giản</p><p className="text-xs text-gray-500">Đơn giản, tinh tế</p></div>
              <div><p className="text-sm font-semibold text-gray-800">5 mẫu Hiện đại</p><p className="text-xs text-gray-500">Sáng tạo, nổi bật</p></div>
              <div><p className="text-sm font-semibold text-gray-800">5 mẫu Chuyên nghiệp</p><p className="text-xs text-gray-500">Doanh nghiệp, lịch sự</p></div>
              <div><p className="text-sm font-semibold text-gray-800">5 mẫu IT</p><p className="text-xs text-gray-500">Công nghệ, chuyên sâu</p></div>
              <div><p className="text-sm font-semibold text-gray-800">20 mẫu theo ngành</p><p className="text-xs text-gray-500">Du lịch, KD, XD, DV</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVTemplateGallery;