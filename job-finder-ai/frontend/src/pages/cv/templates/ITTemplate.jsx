// src/pages/cv/templates/ITTemplate.jsx

import React from 'react';

const ITTemplate = ({ data }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;

  const formatDateRange = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    if (startDate && !endDate) return startDate;
    return `${startDate} - ${endDate || 'Hiện tại'}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Màu xanh công nghệ */}
        <div className="md:w-1/3 bg-gradient-to-b from-cyan-600 to-blue-800 p-6 text-white">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl font-bold">{personalInfo.fullName?.charAt(0) || 'A'}</span>
            </div>
            <h2 className="text-xl font-bold">{personalInfo.fullName || 'Họ và tên'}</h2>
            <p className="text-cyan-200 text-sm mt-1">{personalInfo.title || 'Developer'}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-200 mb-3">Thông tin liên hệ</h3>
            <div className="space-y-2 text-sm">
              {personalInfo.email && <p>📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
              {personalInfo.address && <p>📍 {personalInfo.address}</p>}
              {personalInfo.github && <p>💻 {personalInfo.github}</p>}
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-200 mb-3">Kỹ năng chuyên môn</h3>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="text-sm mb-1">{skill}</div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 p-8">
          {personalInfo.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 border-l-4 border-cyan-500 pl-3 mb-3">Giới thiệu</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 border-l-4 border-cyan-500 pl-3 mb-3">Kinh nghiệm làm việc</h3>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                      <span className="text-xs text-gray-500">{formatDateRange(exp.startDate, exp.endDate)}</span>
                    </div>
                    <p className="text-cyan-600 text-sm">{exp.company}</p>
                    <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 border-l-4 border-cyan-500 pl-3 mb-3">Học vấn</h3>
              {educations.map((edu, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h4 className="font-semibold text-gray-800">{edu.school}</h4>
                    <span className="text-xs text-gray-500">{edu.graduationYear}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{edu.degree} - {edu.fieldOfStudy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ITTemplate;