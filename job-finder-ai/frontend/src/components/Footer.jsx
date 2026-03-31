import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  BriefcaseIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  HeartIcon,
  InformationCircleIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Kết nối với API sau
    alert('Cảm ơn bạn đã đăng ký nhận tin! (Chức năng đang phát triển)');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Cột 1: Thông tin công ty */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo}
                alt="ĐANANG WORK" 
                className="h-10 w-10 object-contain" 
              />
              <span className="text-2xl font-bold text-white tracking-tight">ĐANANG WORK</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Nền tảng tìm việc làm thông minh tích hợp AI tại Đà Nẵng. 
              Kết nối ứng viên với cơ hội việc làm phù hợp nhất.
            </p>

            {/* Social Links */}
            <div className="flex space-x-5 pt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <span className="sr-only">Facebook</span> Facebook
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span> LinkedIn
              </a>
            </div>
          </div>

          {/* Cột 2: Dịch vụ */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Dịch vụ</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/jobs" className="hover:text-white flex items-center gap-2"><BriefcaseIcon className="h-4 w-4" /> Tìm việc làm</Link></li>
              <li><Link to="/companies" className="hover:text-white flex items-center gap-2"><BuildingOfficeIcon className="h-4 w-4" /> Khám phá công ty</Link></li>
              <li><Link to="/trends" className="hover:text-white flex items-center gap-2"><NewspaperIcon className="h-4 w-4" /> Xu hướng</Link></li>
              <li><Link to="/guide" className="hover:text-white flex items-center gap-2"><DocumentTextIcon className="h-4 w-4" /> Hướng dẫn CV</Link></li>
              <li><Link to="/saved-jobs" className="hover:text-white flex items-center gap-2"><HeartIcon className="h-4 w-4" /> Việc làm đã lưu</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white flex items-center gap-2"><InformationCircleIcon className="h-4 w-4" /> Về chúng tôi</Link></li>
              <li><Link to="/contact" className="hover:text-white flex items-center gap-2"><PhoneIcon className="h-4 w-4" /> Liên hệ</Link></li>
              <li><Link to="/faq" className="hover:text-white flex items-center gap-2"><QuestionMarkCircleIcon className="h-4 w-4" /> FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-white flex items-center gap-2"><ShieldCheckIcon className="h-4 w-4" /> Bảo mật</Link></li>
              <li><Link to="/terms" className="hover:text-white flex items-center gap-2"><DocumentTextIcon className="h-4 w-4" /> Điều khoản</Link></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ + Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Liên hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPinIcon className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>123 Nguyễn Văn Linh, Quận Hải Châu, TP. Đà Nẵng</span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <a href="tel:19001234" className="hover:text-white">1900 1234</a>
              </li>
              <li className="flex gap-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <a href="mailto:support@danangwork.vn" className="hover:text-white">support@danangwork.vn</a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-white text-sm font-medium mb-3">Đăng ký nhận tin việc làm</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:outline-none focus:border-blue-500 text-sm"
                  required
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-xl transition-colors font-medium"
                >
                  Gửi
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">Nhận việc làm phù hợp qua AI mỗi tuần</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>© {currentYear} ĐANANG WORK. Tất cả quyền được bảo lưu.</div>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white">Bảo mật</Link>
              <Link to="/terms" className="hover:text-white">Điều khoản</Link>
              <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;