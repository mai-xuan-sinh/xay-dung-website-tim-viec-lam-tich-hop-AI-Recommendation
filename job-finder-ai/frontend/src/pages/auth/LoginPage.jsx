import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BuildingOfficeIcon, BriefcaseIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import AuthSidebar from './AuthSidebar';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import DemoAccount from './DemoAccount';
import './LoginPage.css';

// Import tổng số jobs và companies
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../data/jobs';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Tính tổng số việc làm và công ty
  const totalJobs = itJobs.length + tourismJobs.length + businessJobs.length + 
                     constructionJobs.length + serviceJobs.length;
  
  // Tính số công ty duy nhất
  const getAllCompanies = () => {
    const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];
    const uniqueCompanies = [...new Map(allJobs.map(job => [job.company, job])).values()];
    return uniqueCompanies;
  };
  const totalCompanies = getAllCompanies().length;

  const handleLogin = async (email, password, rememberMe) => {
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu!');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Xử lý đăng nhập với Google/Facebook/GitHub
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="relative">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                ĐW
              </span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ĐANANG WORK
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Chào mừng trở lại
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Welcome Section */}
            <AuthSidebar totalJobs={totalJobs} totalCompanies={totalCompanies} />

            {/* Right Column - Login Form */}
            <div className="lg:w-3/5 p-8 lg:p-12 animate-slideInRight">
              <LoginForm 
                onSubmit={handleLogin}
                loading={loading}
                error={error}
              />

              {/* Social Login */}
              <div className="mt-6">
                <SocialLogin onSocialLogin={handleSocialLogin} />
              </div>

              {/* Demo Account Info */}
              <DemoAccount />
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex items-center justify-center space-x-4 animate-fadeIn">
          <div className="flex items-center space-x-1">
            <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">{totalCompanies}+ công ty</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center space-x-1">
            <BriefcaseIcon className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">{totalJobs}+ việc làm</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center space-x-1">
            <CheckCircleIcon className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">Miễn phí 100%</span>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400 animate-fadeIn">
          © 2024 ĐANANG WORK. Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;