import React from 'react';
import { EyeIcon, SparklesIcon } from '@heroicons/react/24/outline';

const CVTemplateCard = ({ template, onSelect, compact = false }) => {
  if (compact) {
    return (
      <div 
        className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
        onClick={onSelect}
      >
        {/* Preview Area */}
        <div className={`h-40 ${template.previewBg} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm flex items-center space-x-1 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <EyeIcon className="h-4 w-4" />
              <span>Dùng mẫu</span>
            </button>
          </div>
          
          <div className="p-4">
            <div className="text-4xl mb-3">{template.icon}</div>
            <div className="h-2 w-12 bg-white/80 rounded mb-2"></div>
            <div className="h-2 w-20 bg-white/60 rounded"></div>
          </div>
        </div>
        
        {/* Info */}
        <div className="p-3">
          <h3 className="font-bold text-gray-800 text-sm">{template.name}</h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{template.title}</p>
        </div>
        
        {/* Hover Effect */}
        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${template.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
      onClick={onSelect}
    >
      {/* Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
          <SparklesIcon className="h-3 w-3" />
          <span>Hot</span>
        </div>
      </div>
      
      {/* Preview Area */}
      <div className={`h-56 ${template.previewBg} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button className="px-6 py-2.5 bg-white text-gray-900 rounded-xl font-semibold text-sm flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <EyeIcon className="h-5 w-5" />
            <span>Dùng mẫu này</span>
          </button>
        </div>
        
        {/* Mock CV Content */}
        <div className="p-6">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-full bg-white/80"></div>
            <div className="flex-1">
              <div className="h-4 w-32 bg-white/80 rounded mb-2"></div>
              <div className="h-3 w-24 bg-white/60 rounded"></div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full bg-white/60 rounded"></div>
            <div className="h-2 w-3/4 bg-white/40 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{template.icon}</span>
            <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-3">{template.description}</p>
        
        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-3">
          {template.features.map((feature, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      {/* Hover Effect Border */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${template.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    </div>
  );
};

export default CVTemplateCard;