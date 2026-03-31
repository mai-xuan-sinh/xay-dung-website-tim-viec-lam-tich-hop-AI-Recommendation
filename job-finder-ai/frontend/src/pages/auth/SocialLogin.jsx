/* Component hiển thị phần đăng nhập bằng mạng xã hội trên trang đăng nhập, bao gồm các nút để đăng nhập bằng Google, Facebook và GitHub. Mỗi nút sẽ có biểu tượng tương ứng với nhà cung cấp dịch vụ và màu sắc đặc trưng của họ. Khi người dùng nhấn vào một nút, hàm onSocialLogin sẽ được gọi với tên nhà cung cấp dịch vụ tương ứng để xử lý quá trình đăng nhập thông qua mạng xã hội đó. Phần này giúp người dùng có thêm lựa chọn để đăng nhập nhanh chóng và tiện lợi hơn. */

import React from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const SocialLogin = ({ onSocialLogin }) => {
  const socialButtons = [
    { provider: 'google', icon: FaGoogle, color: 'text-red-500', label: 'Google' },
    { provider: 'facebook', icon: FaFacebook, color: 'text-blue-600', label: 'Facebook' },
    { provider: 'github', icon: FaGithub, color: 'text-gray-800', label: 'GitHub' },
  ];

  return (
    <div>
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

      <div className="grid grid-cols-3 gap-3 mt-6">
        {socialButtons.map(({ provider, icon: Icon, color, label }) => (
          <button
            key={provider}
            type="button"
            onClick={() => onSocialLogin(provider)}
            className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
            aria-label={`Đăng nhập với ${label}`}
          >
            <Icon className={`h-5 w-5 ${color} group-hover:scale-110 transition-transform`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;