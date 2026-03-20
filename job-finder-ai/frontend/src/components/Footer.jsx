import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Thông tin công ty */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo}
                alt="ĐANANG WORK" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold text-white">ĐANANG WORK</span>
            </div>
            <p className="text-sm leading-relaxed">
              Nền tảng kết nối việc làm hàng đầu tại Đà Nẵng. Giúp bạn tìm kiếm cơ hội việc làm phù hợp với năng lực và mong muốn.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Dịch vụ */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Dịch vụ</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <BriefcaseIcon className="h-4 w-4" />
                  <span>Tìm việc làm</span>
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <BuildingOfficeIcon className="h-4 w-4" />
                  <span>Khám phá công ty</span>
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <NewspaperIcon className="h-4 w-4" />
                  <span>Tin tức thị trường</span>
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <DocumentTextIcon className="h-4 w-4" />
                  <span>Hướng dẫn viết CV</span>
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <HeartIcon className="h-4 w-4" />
                  <span>Việc làm đã lưu</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Hỗ trợ</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <BuildingOfficeIcon className="h-4 w-4" />
                  <span>Về chúng tôi</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>Liên hệ</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <QuestionMarkCircleIcon className="h-4 w-4" />
                  <span>Câu hỏi thường gặp</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4" />
                  <span>Chính sách bảo mật</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <DocumentTextIcon className="h-4 w-4" />
                  <span>Điều khoản sử dụng</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Đường ABC, Quận XYZ, Đà Nẵng</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">1900 1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">support@danangwork.vn</span>
              </li>
            </ul>

            {/* Form đăng ký nhận tin */}
            <div className="mt-6">
              <h4 className="text-white text-sm font-medium mb-2">Đăng ký nhận tin</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                  Gửi
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Nhận thông tin việc làm mới nhất mỗi tuần
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {currentYear} ĐANANG WORK. Tất cả các quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;