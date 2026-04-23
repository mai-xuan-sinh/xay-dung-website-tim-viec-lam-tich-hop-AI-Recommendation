// src/pages/hr/jobs/components/PaymentModal.jsx
import React, { useState } from 'react';
import { 
  XMarkIcon, CreditCardIcon, ShieldCheckIcon, 
  RocketLaunchIcon, FireIcon, ClockIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';

const PaymentModal = ({ isOpen, onClose, onSuccess, jobData }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Các gói dịch vụ
  const packages = [
    {
      id: 'basic',
      name: 'Gói Cơ Bản',
      price: 0,
      originalPrice: 0,
      days: 7,
      icon: ClockIcon,
      color: 'gray',
      features: [
        'Đăng tin cơ bản',
        'Hiển thị trong 7 ngày',
        'Tối đa 50 lượt xem',
        'Hỗ trợ email'
      ]
    },
    {
      id: 'standard',
      name: 'Gói Tiêu Chuẩn',
      price: 299000,
      originalPrice: 499000,
      days: 30,
      icon: ShieldCheckIcon,
      color: 'blue',
      popular: true,
      features: [
        'Đăng tin nổi bật',
        'Hiển thị trong 30 ngày',
        'Không giới hạn lượt xem',
        'Ưu tiên hiển thị',
        'Hỗ trợ 24/7',
        'Thống kê chi tiết'
      ]
    },
    {
      id: 'premium',
      name: 'Gói Premium',
      price: 599000,
      originalPrice: 999000,
      days: 60,
      icon: RocketLaunchIcon,
      color: 'purple',
      features: [
        'Đăng tin VIP + ghim đầu',
        'Hiển thị trong 60 ngày',
        'Không giới hạn lượt xem',
        'Ưu tiên cao nhất',
        'Hỗ trợ 24/7 qua điện thoại',
        'Thống kê nâng cao',
        'Gợi ý AI cho ứng viên',
        'Miễn phí đăng lại 1 lần'
      ]
    },
    {
      id: 'enterprise',
      name: 'Gói Doanh Nghiệp',
      price: 999000,
      originalPrice: 1999000,
      days: 90,
      icon: FireIcon,
      color: 'red',
      features: [
        'Đăng tin không giới hạn',
        'Hiển thị trong 90 ngày',
        'Tất cả tính năng Premium',
        'Tư vấn chiến lược tuyển dụng',
        'Đăng tin trên mạng xã hội',
        'Báo cáo chuyên sâu'
      ]
    }
  ];

  const handlePayment = async () => {
    if (!selectedPackage) {
      alert('Vui lòng chọn gói dịch vụ');
      return;
    }
    
    setPaymentLoading(true);
    
    // Giả lập thanh toán
    setTimeout(() => {
      setPaymentLoading(false);
      onSuccess(selectedPackage);
    }, 2000);
  };

  if (!isOpen) return null;

  const colorClasses = {
    gray: { border: 'border-gray-200', bg: 'bg-gray-50', text: 'text-gray-600', ring: 'ring-gray-200' },
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-200' },
    purple: { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-200' },
    red: { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-600', ring: 'ring-red-200' }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Chọn gói dịch vụ</h2>
            <p className="text-gray-500 mt-1">Chọn gói phù hợp để đăng tin tuyển dụng</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isSelected = selectedPackage?.id === pkg.id;
            const colors = colorClasses[pkg.color];
            
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative rounded-xl border-2 cursor-pointer transition-all p-4 ${
                  isSelected ? `${colors.border} border-2 shadow-lg ring-2 ${colors.ring}` : 'border-gray-200 hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-yellow-500 text-white text-xs rounded-full whitespace-nowrap">
                    Phổ biến nhất
                  </span>
                )}
                
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                  <div className="mt-2">
                    {pkg.originalPrice > pkg.price ? (
                      <>
                        <span className="text-2xl font-bold text-gray-900">{pkg.price.toLocaleString()}đ</span>
                        <span className="text-sm text-gray-400 line-through ml-2">{pkg.originalPrice.toLocaleString()}đ</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">
                        {pkg.price === 0 ? 'Miễn phí' : `${pkg.price.toLocaleString()}đ`}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">/{pkg.days} ngày</p>
                </div>
                
                <div className="mt-4 space-y-2">
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                      <CheckCircleIcon className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                  {pkg.features.length > 3 && (
                    <p className="text-xs text-gray-400 text-center mt-1">+{pkg.features.length - 3} tính năng khác</p>
                  )}
                </div>
                
                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600 bg-white rounded-full" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Package Summary */}
        {selectedPackage && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CreditCardIcon className="h-5 w-5 text-blue-600 mr-2" />
              Thông tin thanh toán
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Gói dịch vụ:</span>
                <span className="font-medium text-gray-900">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời hạn:</span>
                <span className="font-medium text-gray-900">{selectedPackage.days} ngày</span>
              </div>
              {selectedPackage.originalPrice > selectedPackage.price && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá gốc:</span>
                  <span className="text-gray-400 line-through">{selectedPackage.originalPrice.toLocaleString()}đ</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-blue-200">
                <span className="font-semibold text-gray-900">Tổng thanh toán:</span>
                <span className="text-xl font-bold text-blue-600">
                  {selectedPackage.price === 0 ? 'Miễn phí' : `${selectedPackage.price.toLocaleString()}đ`}
                </span>
              </div>
              {selectedPackage.originalPrice > selectedPackage.price && selectedPackage.price > 0 && (
                <p className="text-xs text-green-600 text-right">
                  Tiết kiệm {(selectedPackage.originalPrice - selectedPackage.price).toLocaleString()}đ
                </p>
              )}
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Phương thức thanh toán</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white hover:border-blue-300 transition cursor-pointer">
              <input type="radio" name="paymentMethod" defaultChecked className="text-blue-600" />
              <span className="text-sm">🏦 Chuyển khoản ngân hàng</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white hover:border-blue-300 transition cursor-pointer">
              <input type="radio" name="paymentMethod" className="text-blue-600" />
              <span className="text-sm">💳 Ví MoMo</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white hover:border-blue-300 transition cursor-pointer">
              <input type="radio" name="paymentMethod" className="text-blue-600" />
              <span className="text-sm">💳 Thẻ tín dụng/ghi nợ</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white hover:border-blue-300 transition cursor-pointer">
              <input type="radio" name="paymentMethod" className="text-blue-600" />
              <span className="text-sm">🏦 ZaloPay</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-yellow-50 rounded-lg p-3 mb-6">
          <p className="text-xs text-yellow-700 flex items-start">
            <span className="mr-2">ℹ️</span>
            Sau khi thanh toán thành công, tin tuyển dụng của bạn sẽ được đăng ngay lập tức. 
            Hóa đơn sẽ được gửi qua email của bạn.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Quay lại
          </button>
          <button
            onClick={handlePayment}
            disabled={!selectedPackage || paymentLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 flex items-center space-x-2"
          >
            {paymentLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <CreditCardIcon className="h-5 w-5" />
                <span>
                  {selectedPackage?.price === 0 
                    ? 'Đăng tin miễn phí' 
                    : `Thanh toán ${selectedPackage?.price?.toLocaleString()}đ`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;