// src/pages/cv/templates/MinimalTemplate3.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const MinimalTemplate3 = ({ data, onUpdate }) => {
  const updateField = (path, value) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onUpdate(newData);
  };

  const addExperience = () => {
    const newExperiences = [...(data.experiences || []), {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }];
    onUpdate({ ...data, experiences: newExperiences });
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = [...(data.experiences || [])];
    if (!newExperiences[index]) newExperiences[index] = {};
    newExperiences[index][field] = value;
    onUpdate({ ...data, experiences: newExperiences });
  };

  const addSkill = () => {
    const newSkills = [...(data.skills || []), ''];
    onUpdate({ ...data, skills: newSkills });
  };

  const updateSkill = (index, value) => {
    const newSkills = [...(data.skills || [])];
    newSkills[index] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const addEducation = () => {
    const newEducations = [...(data.educations || []), {
      school: '',
      degree: '',
      fieldOfStudy: '',
      graduationYear: '',
      description: ''
    }];
    onUpdate({ ...data, educations: newEducations });
  };

  const updateEducation = (index, field, value) => {
    const newEducations = [...(data.educations || [])];
    if (!newEducations[index]) newEducations[index] = {};
    newEducations[index][field] = value;
    onUpdate({ ...data, educations: newEducations });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8 md:p-10">
        {/* Header - Thông tin cá nhân 4 cột */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-4 border-b border-gray-200">
          <div className="text-sm text-gray-500">
            <EditableField
              value={data.personalInfo?.address}
              onSave={(v) => updateField('personalInfo.address', v)}
              placeholder="Địa chỉ"
            />
          </div>
          <div className="text-sm text-gray-500">
            <EditableField
              value={data.personalInfo?.phone}
              onSave={(v) => updateField('personalInfo.phone', v)}
              placeholder="Số điện thoại"
            />
          </div>
          <div className="text-sm text-gray-500">
            <EditableField
              value={data.personalInfo?.email}
              onSave={(v) => updateField('personalInfo.email', v)}
              placeholder="Email"
            />
          </div>
          <div className="text-sm text-gray-500">
            <EditableField
              value={data.personalInfo?.linkedin}
              onSave={(v) => updateField('personalInfo.linkedin', v)}
              placeholder="LinkedIn / Website"
            />
          </div>
        </div>

        {/* Tên */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <EditableField
            value={data.personalInfo?.fullName}
            onSave={(v) => updateField('personalInfo.fullName', v)}
            placeholder="Họ và tên"
            className="font-bold"
          />
        </h1>

        {/* Mục tiêu */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Mục tiêu</h2>
          <EditableField
            value={data.personalInfo?.objective}
            onSave={(v) => updateField('personalInfo.objective', v)}
            placeholder="Mục tiêu nghề nghiệp của bạn..."
            multiline
            className="text-gray-600 leading-relaxed"
          />
        </div>

        {/* Kỹ năng */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Kỹ năng</h2>
            <button onClick={addSkill} className="text-xs text-blue-600">+ Thêm</button>
          </div>
          <div className="space-y-2">
            {(data.skills || []).map((skill, idx) => (
              <div key={idx} className="group flex items-center">
                <span className="text-gray-600 mr-2">•</span>
                <EditableField
                  value={skill}
                  onSave={(v) => updateSkill(idx, v)}
                  placeholder={`Kỹ năng ${idx + 1}`}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Kinh nghiệm liên quan */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Kinh nghiệm liên quan</h2>
            <button onClick={addExperience} className="text-xs text-blue-600">+ Thêm</button>
          </div>
          <div className="space-y-5">
            {(data.experiences || []).map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-800">
                    <EditableField
                      value={exp.position}
                      onSave={(v) => updateExperience(idx, 'position', v)}
                      placeholder="Vị trí"
                    />
                  </h3>
                  <span className="text-sm text-gray-400">
                    <EditableField
                      value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''}
                      onSave={(v) => {
                        const [start, end] = v.split('-').map(s => s.trim());
                        if (start) updateExperience(idx, 'startDate', start);
                        if (end) updateExperience(idx, 'endDate', end);
                      }}
                      placeholder="Tháng năm"
                    />
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  <EditableField
                    value={exp.company}
                    onSave={(v) => updateExperience(idx, 'company', v)}
                    placeholder="Tổ chức / Công ty"
                  />
                </p>
                <EditableField
                  value={exp.description}
                  onSave={(v) => updateExperience(idx, 'description', v)}
                  placeholder="Mô tả chi tiết công việc và thành tích..."
                  multiline
                  className="text-gray-600 text-sm leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Học vấn */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Học vấn</h2>
            <button onClick={addEducation} className="text-xs text-blue-600">+ Thêm</button>
          </div>
          <div className="space-y-4">
            {(data.educations || []).map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">
                    <EditableField
                      value={edu.school}
                      onSave={(v) => updateEducation(idx, 'school', v)}
                      placeholder="Trường học"
                    />
                  </h3>
                  <span className="text-sm text-gray-400">
                    <EditableField
                      value={edu.graduationYear}
                      onSave={(v) => updateEducation(idx, 'graduationYear', v)}
                      placeholder="Năm"
                    />
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  <EditableField
                    value={edu.degree && edu.fieldOfStudy ? `${edu.degree} - ${edu.fieldOfStudy}` : ''}
                    onSave={(v) => {
                      const match = v.match(/^(.+?)\s*-\s*(.+)$/);
                      if (match) {
                        updateEducation(idx, 'degree', match[1]);
                        updateEducation(idx, 'fieldOfStudy', match[2]);
                      } else {
                        updateEducation(idx, 'degree', v);
                      }
                    }}
                    placeholder="Bằng cấp - Chuyên ngành"
                  />
                </p>
                <EditableField
                  value={edu.description}
                  onSave={(v) => updateEducation(idx, 'description', v)}
                  placeholder="GPA, thành tích nổi bật..."
                  multiline
                  className="text-gray-600 text-sm leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          CV được tạo tại ĐANANG WORK - Tìm việc thông minh tại Đà Nẵng
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate3;