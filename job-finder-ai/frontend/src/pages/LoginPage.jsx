import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  EnvelopeIcon, 
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <div className="text-center mb-8">
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
            <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4">ĐANANG WORK</h3>
                  <p className="text-blue-100 mb-6">
                    Nền tảng kết nối việc làm hàng đầu tại Đà Nẵng
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                      <span className="text-sm">Hơn 1000+ việc làm chất lượng</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                      <span className="text-sm">Kết nối trực tiếp với nhà tuyển dụng</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                      <span className="text-sm">Gợi ý việc làm thông minh bằng AI</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                      <span className="text-sm">Hoàn toàn miễn phí</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 pt-6 border-t border-blue-400">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">121+</div>
                      <div className="text-xs text-blue-200">Việc làm</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-xs text-blue-200">Công ty</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mt-8 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm italic mb-2">
                    "Tôi đã tìm được công việc mơ ước chỉ sau 2 tuần sử dụng ĐANANG WORK. Giao diện thân thiện và gợi ý việc làm rất chính xác!"
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="User" 
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Nguyễn Thị Minh Anh</p>
                      <p className="text-xs opacity-80">Developer tại FPT Software</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                      Đang đăng nhập...
                    </span>
                  ) : (
                    'Đăng nhập'
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Hoặc đăng nhập với
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FaGoogle className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FaFacebook className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('github')}
                    className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FaGithub className="h-5 w-5 text-gray-800 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Demo Account Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-800 font-medium">Tài khoản demo</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Email: demo@danangwork.vn<br />
                        Mật khẩu: demo123
                      </p>
                    </div>
                  </div>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-1">
                  <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">500+ công ty</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">1000+ việc làm</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <CheckCircleIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Miễn phí 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © 2024 ĐANANG WORK. Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;