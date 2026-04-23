// frontend/src/pages/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  EnvelopeIcon, LockClosedIcon, UserIcon, PhoneIcon,
  EyeIcon, EyeSlashIcon, BuildingOfficeIcon, ArrowRightIcon,
  CheckBadgeIcon, ShieldCheckIcon, BriefcaseIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import backgroundImage from '../../assets/DK_DN.jpg';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    if (!formData.agreeTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
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

        {/* Glassmorphism Form */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg mb-4">
              <span className="text-white font-bold text-2xl">ĐW</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">ĐANANG WORK</h1>
            <p className="text-white/70 text-sm">Nền tảng tuyển dụng thông minh tại Đà Nẵng</p>
          </div>

          {/* Glass Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Tạo tài khoản mới</h2>
              <p className="text-white/60 text-sm mt-1">Đăng ký để bắt đầu hành trình của bạn</p>
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

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Họ và tên *</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Email *</label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none text-white placeholder:text-white/40"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Số điện thoại</label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none text-white placeholder:text-white/40"
                    placeholder="0912345678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Mật khẩu *</label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none text-white placeholder:text-white/40"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Xác nhận mật khẩu *</label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none text-white placeholder:text-white/40"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                    {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500"
                />
                <label className="text-sm text-white/70">
                  Tôi đồng ý với <Link to="/terms" className="text-white hover:underline">Điều khoản sử dụng</Link> và <Link to="/privacy" className="text-white hover:underline">Chính sách bảo mật</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                  formData.role === 'hr'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                } shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  <>
                    <span>Đăng ký</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-white/70 mt-6">
              Đã có tài khoản? <Link to="/login" className="text-white font-semibold hover:underline">Đăng nhập ngay</Link>
            </p>

            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1"><SparklesIcon className="h-4 w-4 text-yellow-400" /><span>1,200+ việc làm</span></div>
                <div className="flex items-center gap-1"><ShieldCheckIcon className="h-4 w-4 text-green-400" /><span>500+ công ty</span></div>
                <div className="flex items-center gap-1"><CheckBadgeIcon className="h-4 w-4 text-blue-400" /><span>10,000+ ứng viên</span></div>
              </div>
            </div>
          </div>

          <p className="text-center text-white/50 text-xs mt-6">© 2024 ĐANANG WORK. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;