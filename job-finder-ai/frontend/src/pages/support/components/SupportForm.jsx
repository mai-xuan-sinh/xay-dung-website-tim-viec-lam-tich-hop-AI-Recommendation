// src/pages/support/components/SupportForm.jsx
import React, { useState } from 'react';
import { XMarkIcon, PaperAirplaneIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';

const SupportForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    priority: 'medium',
    message: '',
    attachment: null
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const subjects = [
    { value: 'general', label: 'Tư vấn chung' },
    { value: 'account', label: 'Vấn đề tài khoản' },
    { value: 'cv', label: 'Hỗ trợ tạo CV' },
    { value: 'job', label: 'Vấn đề về việc làm' },
    { value: 'payment', label: 'Thanh toán & Gói dịch vụ' },
    { value: 'technical', label: 'Lỗi kỹ thuật' },
    { value: 'other', label: 'Khác' }
  ];

  const priorities = [
    { value: 'low', label: 'Thấp', color: 'bg-gray-100 text-gray-700' },
    { value: 'medium', label: 'Trung bình', color: 'bg-blue-100 text-blue-700' },
    { value: 'high', label: 'Cao', color: 'bg-orange-100 text-orange-700' },
    { value: 'urgent', label: 'Khẩn cấp', color: 'bg-red-100 text-red-700' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập nội dung';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Gửi yêu cầu hỗ trợ</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nguyễn Văn A"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="example@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="0912345678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chủ đề
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {subjects.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mức độ ưu tiên
            </label>
            <div className="flex gap-3">
              {priorities.map(p => (
                <label key={p.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={p.value}
                    checked={formData.priority === p.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm px-2 py-1 rounded-full ${p.color}`}>
                    {p.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đính kèm file (tối đa 5MB)
            </label>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                <DocumentArrowUpIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Chọn file</span>
                <input
                  type="file"
                  name="attachment"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
              {formData.attachment && (
                <span className="text-sm text-gray-500">{formData.attachment.name}</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">Hỗ trợ: JPG, PNG, PDF, DOC (tối đa 5MB)</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5" />
                  <span>Gửi yêu cầu</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportForm;