// src/pages/cv/templates/BusinessTemplate.jsx

import React from 'react';

const BusinessTemplate = ({ data }) => {
  const { personalInfo, experiences, educations, skills, achievements } = data;

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    return `${startDate} - ${endDate || 'Hiện tại'}`;
  };

  // Tính tổng doanh số từ achievements (mô phỏng)
  const totalRevenue = achievements?.reduce((sum, ach) => sum + (parseInt(ach.value) || 0), 0) || 45;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Header với màu kinh doanh */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">{personalInfo.fullName || 'Họ và tên'}</h1>
            <p className="text-amber-100 text-lg">{personalInfo.title || 'Vị trí mong muốn'}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center min-w-[120px]">
            <div className="text-2xl font-bold">+{totalRevenue}%</div>
            <div className="text-xs">Tăng trưởng doanh số</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-amber-100">
          {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.address && <span>📍 {personalInfo.address}</span>}
        </div>
      </div>

      <div className="p-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Thành tích nổi bật */}
        {achievements && achievements.length > 0 && (
          <div className="mb-6 bg-amber-50 rounded-xl p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-700 mb-3">🏆 Thành tích nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {achievements.slice(0, 3).map((ach, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{ach.value}</div>
                  <div className="text-xs text-gray-600">{ach.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {experiences.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-amber-700 border-l-4 border-amber-500 pl-3 mb-4">💼 Kinh nghiệm</h2>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <span className="text-xs text-gray-400">{formatDateRange(exp.startDate, exp.endDate)}</span>
                      </div>
                      <p className="text-amber-600 text-sm">{exp.company}</p>
                      <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                      {exp.achievement && <p className="text-green-600 text-xs mt-1">✓ {exp.achievement}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {educations.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-amber-700 border-l-4 border-amber-500 pl-3 mb-4">🎓 Học vấn</h2>
                {educations.map((edu, idx) => (
                  <div key={idx} className="mb-3">
                    <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                    <p className="text-gray-600 text-sm">{edu.degree} - {edu.fieldOfStudy}</p>
                    <p className="text-xs text-gray-400">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-amber-700 border-l-4 border-amber-500 pl-3 mb-4">⚡ Kỹ năng</h2>
                <div className="space-y-2">
                  {skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{skill}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          📊 CV Kinh doanh - ĐANANG WORK
        </div>
      </div>
    </div>
  );
};

export default BusinessTemplate;