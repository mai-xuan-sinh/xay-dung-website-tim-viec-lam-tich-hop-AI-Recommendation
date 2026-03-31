/* DropdownMenu.jsx */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const DropdownMenu = ({ 
  label, 
  items, 
  active = false, 
  color = 'purple' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Click outside để đóng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getActiveColor = () => {
    if (!active) return 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';
    
    const colors = {
      purple: 'text-purple-600 bg-purple-50',
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      orange: 'text-orange-600 bg-orange-50',
    };
    return colors[color] || 'text-purple-600 bg-purple-50';
  };

  const getDotColor = () => {
    const colors = {
      purple: 'bg-purple-600',
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      orange: 'bg-orange-600',
    };
    return colors[color] || 'bg-purple-600';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}           // Thay hover bằng click cho UX tốt hơn trên desktop
        onMouseEnter={() => setIsOpen(true)}         // Giữ hover nếu bạn muốn
        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-1 group ${getActiveColor()}`}
      >
        <span>{label}</span>
        <ChevronDownIcon className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        {active && (
          <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${getDotColor()}`} />
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50 animate-fadeIn"
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.icon && <item.icon className="h-5 w-5 flex-shrink-0" />}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;