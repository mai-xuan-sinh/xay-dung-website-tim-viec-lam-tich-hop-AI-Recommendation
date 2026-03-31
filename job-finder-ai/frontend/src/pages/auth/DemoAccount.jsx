/* Component hiển thị thông tin tài khoản demo trên trang đăng nhập, bao gồm email và mật khẩu để người dùng có thể sử dụng tài khoản demo để trải nghiệm nền tảng mà không cần phải đăng ký. Phần này sẽ giúp người dùng dễ dàng truy cập và thử nghiệm các tính năng của nền tảng trước khi quyết định đăng ký tài khoản thực sự. */

import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const DemoAccount = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mt-6">
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
  );
};

export default DemoAccount;