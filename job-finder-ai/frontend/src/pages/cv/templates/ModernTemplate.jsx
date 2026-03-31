// src/pages/cv/templates/ModernTemplate.jsx

import React from 'react';

const ModernTemplate = ({ data }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    if (startDate && !endDate) return startDate;
    return `${startDate} - ${endDate || 'Hiện tại'}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Header với gradient và layout 2 cột */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{personalInfo.fullName || 'Họ và tên'}</h1>
            <p className="text-purple-100 text-lg">{personalInfo.title || 'Vị trí mong muốn'}</p>
          </div>
          <div className="text-right">
            {personalInfo.email && <p className="text-sm">✉️ {personalInfo.email}</p>}
            {personalInfo.phone && <p className="text-sm">📞 {personalInfo.phone}</p>}
            {personalInfo.address && <p className="text-sm">📍 {personalInfo.address}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Giới thiệu */}
        {personalInfo.summary && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-0.5 bg-purple-500"></div>
              <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">Giới thiệu</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột trái - Kỹ năng */}
          <div className="md:col-span-1">
            {skills.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-0.5 bg-purple-500"></div>
                  <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">Kỹ năng</h2>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{skill}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ngoại ngữ */}
            {personalInfo.languages && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-0.5 bg-purple-500"></div>
                  <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">Ngoại ngữ</h2>
                </div>
                <div className="space-y-2">
                  {personalInfo.languages.map((lang, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cột phải - Kinh nghiệm và Học vấn */}
          <div className="md:col-span-2">
            {experiences.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-0.5 bg-purple-500"></div>
                  <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">Kinh nghiệm làm việc</h2>
                </div>
                <div className="space-y-5">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="border-l-2 border-purple-200 pl-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <span className="text-sm text-gray-400">{formatDateRange(exp.startDate, exp.endDate)}</span>
                      </div>
                      <p className="text-sm text-purple-600 mb-2">{exp.company}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-0.5 bg-purple-500"></div>
                  <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">Học vấn</h2>
                </div>
                <div className="space-y-4">
                  {educations.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-purple-200 pl-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                        <span className="text-sm text-gray-400">{edu.graduationYear}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{edu.degree} - {edu.fieldOfStudy}</p>
                      {edu.description && <p className="text-gray-500 text-sm mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          CV được tạo tại ĐANANG WORK
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;