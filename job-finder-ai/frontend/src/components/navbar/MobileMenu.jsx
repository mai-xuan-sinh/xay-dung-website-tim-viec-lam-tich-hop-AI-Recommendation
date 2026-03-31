/* MobileMenu.jsx */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const MobileMenu = ({ navLinks, isOpen, onClose }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);   // Quản lý dropdown nào đang mở

  if (!isOpen) return null;

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="lg:hidden mt-4 py-4 border-t border-gray-100">
      <div className="flex flex-col space-y-1 px-2">
        {navLinks.map((link) => {
          if (link.isDropdown) {
            const isDropdownOpen = openDropdown === link.label;
            
            return (
              <div key={link.label} className="space-y-1">
                <button
                  onClick={() => toggleDropdown(link.label)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isDropdownOpen && (
                  <div className="ml-6 space-y-1 border-l border-gray-200 pl-4">
                    {link.items.map((item, index) => (
                      <Link
                        key={index}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                        onClick={onClose}
                      >
                        {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Link thường
          const active = isActive(link.to);

          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active 
                  ? 'text-blue-600 bg-blue-50 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;