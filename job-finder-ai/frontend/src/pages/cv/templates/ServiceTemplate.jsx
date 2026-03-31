// src/pages/cv/templates/ServiceTemplate.jsx

import React from 'react';

const ServiceTemplate = ({ data }) => {
  const { personalInfo, experiences, educations, skills, languages, customerFeedback } = data;

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    return `${startDate} - ${endDate || 'Hiện tại'}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Header màu dịch vụ */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">{personalInfo.fullName || 'Họ và tên'}</h1>
            <p className="text-purple-200 text-lg">{personalInfo.title || 'Vị trí mong muốn'}</p>
          </div>
          <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-purple-200">
          {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.address && <span>📍 {personalInfo.address}</span>}
        </div>
      </div>

      <div className="p-8">
        {personalInfo.summary && (
          <div className="mb-6 bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-gray-700 italic">"{personalInfo.summary}"</p>
          </div>
        )}

        {customerFeedback && (
          <div className="mb-6 bg-pink-50 rounded-xl p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pink-600 mb-2">💬 Phản hồi từ khách hàng</h2>
            <p className="text-gray-700 text-sm italic">"{customerFeedback}"</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {experiences.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-purple-700 border-l-4 border-purple-500 pl-3 mb-4">💼 Kinh nghiệm</h2>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <span className="text-xs text-gray-400">{formatDateRange(exp.startDate, exp.endDate)}</span>
                      </div>
                      <p className="text-purple-600 text-sm">{exp.company}</p>
                      <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-purple-700 border-l-4 border-purple-500 pl-3 mb-4">🎓 Học vấn</h2>
                {educations.map((edu, idx) => (
                  <div key={idx} className="mb-3">
                    <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                    <p className="text-gray-600 text-sm">{edu.degree} - {edu.fieldOfStudy}</p>
                    <p className="text-xs text-gray-400">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-purple-700 border-l-4 border-purple-500 pl-3 mb-4">✨ Kỹ năng</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {languages && languages.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-purple-700 border-l-4 border-purple-500 pl-3 mb-4">🌐 Ngoại ngữ</h2>
                <div className="space-y-2">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-purple-600 text-sm">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          🤝 CV Dịch vụ - ĐANANG WORK
        </div>
      </div>
    </div>
  );
};

export default ServiceTemplate;