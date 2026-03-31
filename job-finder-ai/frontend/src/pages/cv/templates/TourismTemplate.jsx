// src/pages/cv/templates/TourismTemplate.jsx

import React from 'react';

const TourismTemplate = ({ data }) => {
  const { personalInfo, experiences, educations, skills, languages } = data;

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    return `${startDate} - ${endDate || 'Hiện tại'}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Header với hình ảnh biển */}
      <div className="relative h-40 bg-gradient-to-r from-teal-500 to-green-500 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800')] bg-cover bg-center opacity-20"></div>
        <div className="relative h-full flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || 'Họ và tên'}</h1>
            <p className="text-teal-200">{personalInfo.title || 'Vị trí mong muốn'}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Thông tin liên hệ */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm text-gray-500">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.address && <span>📍 {personalInfo.address}</span>}
        </div>

        {personalInfo.summary && (
          <div className="mb-6 bg-teal-50 rounded-xl p-4 text-center">
            <p className="text-gray-700 italic">"{personalInfo.summary}"</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {experiences.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">🌟 Kinh nghiệm</h2>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-teal-600 text-sm">{exp.company}</p>
                      <p className="text-xs text-gray-400 mb-1">{formatDateRange(exp.startDate, exp.endDate)}</p>
                      <p className="text-gray-600 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">🎓 Học vấn</h2>
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
                <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">✨ Kỹ năng</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {languages && languages.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">🌐 Ngoại ngữ</h2>
                <div className="space-y-2">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-teal-600 text-sm">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          🌊 CV Du lịch - ĐANANG WORK
        </div>
      </div>
    </div>
  );
};

export default TourismTemplate;