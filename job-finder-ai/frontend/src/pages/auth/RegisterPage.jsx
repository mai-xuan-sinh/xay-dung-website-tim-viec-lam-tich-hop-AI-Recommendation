import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RegisterForm from './RegisterForm';
import AuthSidebar from './AuthSidebar';
import SocialLogin from './SocialLogin';
import './RegisterPage.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (formData) => {
    setError('');
    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
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
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Benefits */}
            <AuthSidebar />

            {/* Right Column - Form */}
            <div className="lg:w-3/5 p-8 lg:p-12 animate-slideInRight">
              <RegisterForm 
                onSubmit={handleRegister}
                loading={loading}
                error={error}
              />

              {/* Social Login */}
              <div className="mt-8">
                <SocialLogin onSocialLogin={handleSocialLogin} />
              </div>
            </div>
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

export default RegisterPage;