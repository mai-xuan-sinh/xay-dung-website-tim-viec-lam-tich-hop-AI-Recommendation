import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon, 
  BriefcaseIcon,
  PhoneIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = checkPasswordStrength(formData.password);
  const strengthText = ['Yếu', 'Trung bình', 'Khá', 'Mạnh'][passwordStrength - 1] || 'Rất yếu';
  const strengthColor = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][passwordStrength - 1] || 'bg-gray-200';

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Họ và tên không được để trống';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Phone validation
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    // Terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Bạn phải đồng ý với điều khoản dịch vụ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone
      });
      navigate('/dashboard');
    } catch (err) {
      setErrors({
        ...errors,
        submit: err.message || 'Đăng ký thất bại. Vui lòng thử lại sau.'
      });
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
      <div className="max-w-4xl mx-auto">
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
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Benefits */}
            <div className="lg:w-1/3 bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Lợi ích khi tham gia</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                  <span>Truy cập hàng ngàn việc làm chất lượng</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                  <span>Gợi ý việc làm thông minh bằng AI</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                  <span>Kết nối trực tiếp với nhà tuyển dụng</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                  <span>Theo dõi quá trình ứng tuyển</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                  <span>Hoàn toàn miễn phí</span>
                </li>
              </ul>

              {/* Testimonial */}
              <div className="mt-8 p-4 bg-white/10 rounded-lg">
                <p className="text-sm italic">
                  "Tôi đã tìm được công việc mơ ước chỉ sau 2 tuần sử dụng ĐANANG WORK. 
                  Giao diện thân thiện và gợi ý việc làm rất chính xác!"
                </p>
                <div className="mt-3 flex items-center space-x-2">
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

            {/* Right Column - Form */}
            <div className="lg:w-2/3 p-8">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                        s <= step 
                          ? 'border-blue-600 bg-blue-600 text-white' 
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        {s}
                      </div>
                      {s < 3 && (
                        <div className={`w-16 h-0.5 mx-2 transition-colors ${
                          s < step ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Thông tin cá nhân</span>
                  <span>Bảo mật</span>
                  <span>Hoàn tất</span>
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-5">
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
                          errors.name 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 error-message">{errors.name}</p>
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
                          errors.email 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="example@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 error-message">{errors.email}</p>
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
                          errors.phone 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="0912345678"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 error-message">{errors.phone}</p>
                    )}
                  </div>

                  {/* Vai trò */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bạn là
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.role === 'jobseeker'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}>
                        <input
                          type="radio"
                          name="role"
                          value="jobseeker"
                          checked={formData.role === 'jobseeker'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <BriefcaseIcon className={`h-6 w-6 mx-auto mb-1 ${
                            formData.role === 'jobseeker' ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <span className={`text-sm font-medium ${
                            formData.role === 'jobseeker' ? 'text-blue-600' : 'text-gray-700'
                          }`}>
                            Người tìm việc
                          </span>
                        </div>
                      </label>

                      <label className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.role === 'employer'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}>
                        <input
                          type="radio"
                          name="role"
                          value="employer"
                          checked={formData.role === 'employer'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <BuildingOfficeIcon className={`h-6 w-6 mx-auto mb-1 ${
                            formData.role === 'employer' ? 'text-purple-600' : 'text-gray-400'
                          }`} />
                          <span className={`text-sm font-medium ${
                            formData.role === 'employer' ? 'text-purple-600' : 'text-gray-700'
                          }`}>
                            Nhà tuyển dụng
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Tiếp theo
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                          errors.password 
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
                    
                    {/* Password strength meter */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Độ mạnh mật khẩu:</span>
                          <span className={`text-xs font-medium ${
                            passwordStrength >= 3 ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {strengthText}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${strengthColor} transition-all duration-300`}
                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                          />
                        </div>
                        <ul className="mt-2 text-xs text-gray-500 space-y-1">
                          <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                            ✓ Ít nhất 8 ký tự
                          </li>
                          <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                            ✓ Ít nhất 1 chữ hoa
                          </li>
                          <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                            ✓ Ít nhất 1 số
                          </li>
                          <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                            ✓ Ít nhất 1 ký tự đặc biệt
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500 error-message">{errors.password}</p>
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
                          errors.confirmPassword 
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
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500 error-message">{errors.confirmPassword}</p>
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
                  {errors.agreeTerms && (
                    <p className="text-xs text-red-500 error-message">{errors.agreeTerms}</p>
                  )}

                  {/* Submit error */}
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {errors.submit}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                    >
                      Quay lại
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                          Đang xử lý...
                        </span>
                      ) : (
                        'Hoàn tất đăng ký'
                      )}
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                      <CheckCircleIcon className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Đăng ký thành công!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Chào mừng bạn đến với ĐANANG WORK. Hãy hoàn thiện hồ sơ để tìm việc dễ dàng hơn.
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/profile"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Hoàn thiện hồ sơ ngay
                    </Link>
                    <Link
                      to="/jobs"
                      className="block w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200"
                    >
                      Tìm việc ngay
                    </Link>
                  </div>
                </div>
              )}

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Hoặc đăng ký với
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSocialLogin('google')}
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FaGoogle className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleSocialLogin('facebook')}
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FaFacebook className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleSocialLogin('github')}
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FaGithub className="h-5 w-5 text-gray-800 group-hover:scale-110 transition-transform" />
                  </button>
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

export default RegisterPage;