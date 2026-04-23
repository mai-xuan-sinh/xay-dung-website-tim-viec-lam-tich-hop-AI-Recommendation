// src/pages/admin/components/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon: Icon, color, change, onClick, loading }) => {
  const colorConfig = {
    blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", text: "text-blue-600", border: "border-blue-100" },
    green: { bg: "bg-green-50", iconBg: "bg-green-100", text: "text-green-600", border: "border-green-100" },
    purple: { bg: "bg-purple-50", iconBg: "bg-purple-100", text: "text-purple-600", border: "border-purple-100" },
    orange: { bg: "bg-orange-50", iconBg: "bg-orange-100", text: "text-orange-600", border: "border-orange-100" },
    red: { bg: "bg-red-50", iconBg: "bg-red-100", text: "text-red-600", border: "border-red-100" },
    teal: { bg: "bg-teal-50", iconBg: "bg-teal-100", text: "text-teal-600", border: "border-teal-100" }
  };

  const colors = colorConfig[color] || colorConfig.blue;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-sm border ${colors.border} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-6 w-6 ${colors.text}`} />
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  );
};

export default StatCard;