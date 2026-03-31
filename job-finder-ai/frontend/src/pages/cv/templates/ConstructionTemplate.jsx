// src/pages/cv/templates/ConstructionTemplate.jsx

import React from 'react';

const ConstructionTemplate = ({ data }) => {
  const { personalInfo, experiences, educations, skills, certificates } = data;

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    return `${startDate} - ${endDate || 'Hiện tại'}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Header màu xây dựng */}
      <div className="bg-gradient-to-r from-orange-700 to-red-700 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-1">{personalInfo.fullName || 'Họ và tên'}</h1>
        <p className="text-orange-200 text-lg">{personalInfo.title || 'Vị trí mong muốn'}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-orange-200">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.address && <span>📍 {personalInfo.address}</span>}
        </div>
      </div>

      <div className="p-8">
        {personalInfo.summary && (
          <div className="mb-6 bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            {skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-700 mb-3">🛠️ Kỹ năng</h2>
                <div className="space-y-2">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-gray-700 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certificates && certificates.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-700 mb-3">📜 Chứng chỉ</h2>
                <ul className="space-y-1">
                  {certificates.map((cert, idx) => (
                    <li key={idx} className="text-sm text-gray-600">✓ {cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            {experiences.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-orange-700 border-b-2 border-orange-200 pb-2 mb-4">🏗️ Công trình đã tham gia</h2>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h3 className="font-bold text-gray-800">{exp.position}</h3>
                          <p className="text-orange-600 text-sm">{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-400">{formatDateRange(exp.startDate, exp.endDate)}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
                      {exp.projectScale && (
                        <div className="mt-2 text-xs text-gray-500">📐 Quy mô: {exp.projectScale}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-orange-700 border-b-2 border-orange-200 pb-2 mb-4">🎓 Học vấn</h2>
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
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          🏛️ CV Xây dựng - ĐANANG WORK
        </div>
      </div>
    </div>
  );
};

export default ConstructionTemplate;