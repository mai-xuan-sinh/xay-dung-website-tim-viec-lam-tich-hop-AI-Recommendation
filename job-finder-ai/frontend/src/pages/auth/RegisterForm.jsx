import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon, 
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import RoleSelector from './RoleSelector';

const RegisterForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (localErrors[name]) {
      setLocalErrors({ ...localErrors, [name]: null });
    }
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Họ và tên không được để trống';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Bạn phải đồng ý với điều khoản dịch vụ';
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
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

      {/* Họ tên */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`pl-10 pr-3 py-2.5 w-full border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              localErrors.name 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Nhập họ và tên của bạn"
          />
        </div>
        {localErrors.name && (
          <p className="mt-1 text-xs text-red-500">{localErrors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`pl-10 pr-3 py-2.5 w-full border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              localErrors.email 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="example@email.com"
          />
        </div>
        {localErrors.email && (
          <p className="mt-1 text-xs text-red-500">{localErrors.email}</p>
        )}
      </div>

      {/* Số điện thoại */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Số điện thoại
        </label>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`pl-10 pr-3 py-2.5 w-full border rounded-lg focus:outline-none focus:ring-2 ${
              localErrors.phone 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="0912345678"
          />
        </div>
        {localErrors.phone && (
          <p className="mt-1 text-xs text-red-500">{localErrors.phone}</p>
        )}
      </div>

      {/* Vai trò */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bạn là
        </label>
        <RoleSelector selectedRole={formData.role} onChange={handleRoleChange} />
      </div>

      {/* Mật khẩu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mật khẩu <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`pl-10 pr-10 py-2.5 w-full border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              localErrors.password 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="••••••••"
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
        <PasswordStrengthMeter password={formData.password} />
        {localErrors.password && (
          <p className="mt-1 text-xs text-red-500">{localErrors.password}</p>
        )}
      </div>

      {/* Xác nhận mật khẩu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Xác nhận mật khẩu <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`pl-10 pr-10 py-2.5 w-full border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              localErrors.confirmPassword 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {localErrors.confirmPassword && (
          <p className="mt-1 text-xs text-red-500">{localErrors.confirmPassword}</p>
        )}
      </div>

      {/* Đồng ý điều khoản */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          name="agreeTerms"
          id="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
          Tôi đồng ý với{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">Điều khoản dịch vụ</a>{' '}
          và{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">Chính sách bảo mật</a>
        </label>
      </div>
      {localErrors.agreeTerms && (
        <p className="text-xs text-red-500">{localErrors.agreeTerms}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
            Đang xử lý...
          </span>
        ) : (
          'Đăng ký'
        )}
      </button>

      {/* Login Link */}
      <div className="text-center text-sm text-gray-600">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Đăng nhập ngay
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;