/* Component hiển thị form đăng nhập trên trang đăng nhập, bao gồm các trường nhập email và mật khẩu, một checkbox để ghi nhớ đăng nhập, một liên kết để quên mật khẩu, và một nút để đăng nhập. Form cũng sẽ hiển thị thông báo lỗi nếu có lỗi xảy ra trong quá trình đăng nhập, và sẽ hiển thị trạng thái loading khi đang xử lý yêu cầu đăng nhập. Ngoài ra, form còn có một liên kết để chuyển đến trang đăng ký nếu người dùng chưa có tài khoản. */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password, rememberMe);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fadeIn">
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

      {/* Register Link */}
      <div className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Đăng ký ngay
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;