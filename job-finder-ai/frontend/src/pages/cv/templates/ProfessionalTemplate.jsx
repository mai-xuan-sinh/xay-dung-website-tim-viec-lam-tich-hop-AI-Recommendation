// src/pages/cv/templates/ProfessionalTemplate.jsx

import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  const { personalInfo, experiences, educations, skills, certificates } = data;

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    if (startDate && !endDate) return startDate;
    return `${startDate} - ${endDate || 'Hiện tại'}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Header với layout 2 cột - Phong cách doanh nghiệp */}
      <div className="bg-gray-900 p-8 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">{personalInfo.fullName || 'Họ và tên'}</h1>
            <p className="text-gray-400 text-lg">{personalInfo.title || 'Vị trí mong muốn'}</p>
          </div>
          <div className="text-right">
            {personalInfo.email && <p className="text-sm text-gray-300">{personalInfo.email}</p>}
            {personalInfo.phone && <p className="text-sm text-gray-300">{personalInfo.phone}</p>}
            {personalInfo.address && <p className="text-sm text-gray-300">{personalInfo.address}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Thông tin bên trái */}
          <div className="md:col-span-1">
            {/* Giới thiệu ngắn */}
            {personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Giới thiệu</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {/* Kỹ năng */}
            {skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Kỹ năng chuyên môn</h2>
                <div className="space-y-2">
                  {skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="text-sm text-gray-700 mb-1">{skill}</div>
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chứng chỉ */}
            {certificates && certificates.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Chứng chỉ</h2>
                <ul className="space-y-1">
                  {certificates.map((cert, idx) => (
                    <li key={idx} className="text-sm text-gray-600">✓ {cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main Content - Kinh nghiệm và Học vấn */}
          <div className="md:col-span-3">
            {experiences.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Kinh nghiệm làm việc</h2>
                <div className="space-y-5">
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <span className="text-sm text-gray-400">{formatDateRange(exp.startDate, exp.endDate)}</span>
                      </div>
                      <p className="text-sm text-blue-600 mb-2">{exp.company}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Học vấn</h2>
                <div className="space-y-4">
                  {educations.map((edu, idx) => (
                    <div key={idx}>
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

export default ProfessionalTemplate;