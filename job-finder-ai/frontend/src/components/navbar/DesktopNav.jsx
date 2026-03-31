/* DesktopNav.jsx */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';

const DesktopNav = ({ navLinks, isCompanyMenuOpen, setIsCompanyMenuOpen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getLinkStyles = (color, isActiveLink) => {
    if (isActiveLink) {
      const activeStyles = {
        blue: 'text-blue-600 bg-blue-50',
        green: 'text-green-600 bg-green-50',
        purple: 'text-purple-600 bg-purple-50',
        orange: 'text-orange-600 bg-orange-50',
        pink: 'text-pink-600 bg-pink-50',
        red: 'text-red-600 bg-red-50',
      };
      return activeStyles[color] || 'text-blue-600 bg-blue-50';
    }
    return 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';
  };

  const getDotColor = (color) => {
    const colors = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      orange: 'bg-orange-600',
      pink: 'bg-pink-600',
      red: 'bg-red-600',
    };
    return colors[color] || 'bg-blue-600';
  };

  return (
    <div className="hidden lg:flex flex-1 items-center justify-center space-x-2">
      {navLinks.map((link) => {
        if (link.isDropdown) {
          const isDropdownActive = 
            location.pathname.includes('/companies') || 
            location.pathname === '/top-companies' || 
            location.pathname === '/company-reviews';

          return (
            <DropdownMenu
              key={link.label}
              label={link.label}
              items={link.items}
              active={isDropdownActive}
              color={link.color}
              isOpen={isCompanyMenuOpen}
              onToggle={() => setIsCompanyMenuOpen(!isCompanyMenuOpen)}
            />
          );
        }

        const active = isActive(link.to);

        return (
          <Link
            key={link.to}
            to={link.to}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group 
              ${getLinkStyles(link.color, active)}`}
          >
            <span>{link.label}</span>
            {active && (
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${getDotColor(link.color)}`} />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopNav;