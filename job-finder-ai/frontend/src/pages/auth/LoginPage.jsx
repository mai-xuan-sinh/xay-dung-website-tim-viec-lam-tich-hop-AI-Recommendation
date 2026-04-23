// frontend/src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, 
  BuildingOfficeIcon, UserIcon, ArrowRightIcon,
  CheckBadgeIcon, ShieldCheckIcon, BriefcaseIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import api from '../../services/api';
import backgroundImage from '../../assets/DK_DN.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Gọi API login
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Lưu token và user vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Cập nhật context
        if (login) {
          await login(formData.email, formData.password);
        }
        
        // Chuyển hướng dựa trên role
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'hr') {
          navigate('/hr/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(response.data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="min-h-screen relative flex items-center justify-center px-4 py-12 pt-24">
        {/* Background Image */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'overlay'
          }}
        ></div>
        
        {/* Decorative blurred circles */}
        <div className="fixed top-20 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="fixed bottom-20 right-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        {/* Glassmorphism Form */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg mb-4">
              <span className="text-white font-bold text-2xl">ĐW</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">ĐANANG WORK</h1>
            <p className="text-white/70 text-sm">Nền tảng tuyển dụng thông minh tại Đà Nẵng</p>
          </div>

          {/* Glass Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Chào mừng trở lại</h2>
              <p className="text-white/60 text-sm mt-1">Đăng nhập để tiếp tục hành trình của bạn</p>
            </div>

            {/* Role Selector */}
            <div className="bg-white/10 rounded-xl p-1 mb-6 flex backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                  formData.role === 'user'
                    ? 'bg-white/20 shadow-md text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <UserIcon className="h-5 w-5" />
                <span className="font-medium">Ứng viên</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'hr' }))}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${
                  formData.role === 'hr'
                    ? 'bg-white/20 shadow-md text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <BuildingOfficeIcon className="h-5 w-5" />
                <span className="font-medium">Nhà tuyển dụng</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Email
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition text-white placeholder:text-white/40"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition text-white placeholder:text-white/40"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-400 focus:ring-offset-0" 
                  />
                  <span className="text-sm text-white/70">Ghi nhớ đăng nhập</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-white/70 hover:text-white transition">
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                  formData.role === 'hr'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                } shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 backdrop-blur-sm`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Đang đăng nhập...</span>
                  </div>
                ) : (
                  <>
                    <span>Đăng nhập</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-white/70 mt-6">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-white font-semibold hover:underline">
                Đăng ký ngay
              </Link>
            </p>

            {/* Features */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <SparklesIcon className="h-4 w-4 text-yellow-400" />
                  <span>1,200+ việc làm</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                  <span>500+ công ty</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckBadgeIcon className="h-4 w-4 text-blue-400" />
                  <span>10,000+ ứng viên</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-white/50 text-xs mt-6">
            © 2024 ĐANANG WORK. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;