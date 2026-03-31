import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const templates = [
  {
    id: 'modern',
    name: 'Hiện đại',
    description: 'Mẫu CV hiện đại, nổi bật kỹ năng và kinh nghiệm',
    preview: 'bg-gradient-to-r from-blue-500 to-purple-500',
    color: 'blue'
  },
  {
    id: 'professional',
    name: 'Chuyên nghiệp',
    description: 'Mẫu CV chuyên nghiệp, phù hợp với văn phòng',
    preview: 'bg-gradient-to-r from-gray-700 to-gray-900',
    color: 'gray'
  },
  {
    id: 'creative',
    name: 'Sáng tạo',
    description: 'Mẫu CV sáng tạo, phù hợp với ngành thiết kế, nghệ thuật',
    preview: 'bg-gradient-to-r from-pink-500 to-orange-500',
    color: 'pink'
  },
  {
    id: 'minimal',
    name: 'Tối giản',
    description: 'Mẫu CV tối giản, tập trung vào nội dung',
    preview: 'bg-gradient-to-r from-green-500 to-teal-500',
    color: 'green'
  }
];

const CVTemplates = ({ selectedTemplate, onSelectTemplate, onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Chọn mẫu CV</h2>
      <p className="text-gray-600 mb-6">Chọn mẫu phù hợp với phong cách của bạn</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-2xl overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-500 shadow-lg ring-2 ring-blue-500'
                : 'border-gray-200 hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className={`h-40 ${template.preview} relative`}>
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 text-white">
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">
                  {template.name}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between pt-6 border-t border-gray-100 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Quay lại
        </button>
        <button
          onClick={() => onSelectTemplate(selectedTemplate)}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Tiếp theo: Xem trước CV →
        </button>
      </div>
    </div>
  );
};

export default CVTemplates;