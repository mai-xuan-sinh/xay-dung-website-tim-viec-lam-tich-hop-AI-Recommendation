// src/components/navbar/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1"
      aria-label="Trang chủ ĐANANG WORK"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        
        <img 
          src={logo} 
          alt="Logo ĐANANG WORK" 
          className="h-12 w-12 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110" 
        />
      </div>

      <div className="flex flex-col -space-y-0.5">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
          ĐANANG WORK
        </span>
        <span className="text-xs text-gray-500 flex items-center font-medium">
          <SparklesIcon className="h-3.5 w-3.5 text-yellow-500 mr-1.5" />
          Tìm việc thông minh tại Đà Nẵng
        </span>
      </div>
    </Link>
  );
};

export default Logo;