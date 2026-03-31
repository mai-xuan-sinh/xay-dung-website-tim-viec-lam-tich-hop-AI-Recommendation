import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const PasswordStrengthMeter = ({ password }) => {
  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = checkPasswordStrength(password);
  const strengthText = ['Rất yếu', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'][strength] || 'Rất yếu';
  const strengthColor = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ][strength] || 'bg-gray-200';

  const requirements = [
    { text: "Ít nhất 8 ký tự", check: password.length >= 8 },
    { text: "Ít nhất 1 chữ hoa", check: /[A-Z]/.test(password) },
    { text: "Ít nhất 1 số", check: /[0-9]/.test(password) },
    { text: "Ít nhất 1 ký tự đặc biệt", check: /[^A-Za-z0-9]/.test(password) },
  ];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">Độ mạnh mật khẩu:</span>
        <span className={`text-xs font-medium ${
          strength >= 3 ? 'text-green-600' : 'text-orange-600'
        }`}>
          {strengthText}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${strengthColor} transition-all duration-300`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <ul className="mt-2 text-xs text-gray-500 space-y-1">
        {requirements.map((req, idx) => (
          <li key={idx} className={req.check ? 'text-green-600' : 'text-gray-400'}>
            {req.check ? (
              <CheckCircleIcon className="h-3 w-3 inline mr-1" />
            ) : (
              <XCircleIcon className="h-3 w-3 inline mr-1" />
            )}
            {req.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter;