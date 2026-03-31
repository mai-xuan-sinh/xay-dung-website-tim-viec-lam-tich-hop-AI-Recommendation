// src/pages/cv/templates/MinimalTemplate5.jsx
import React from 'react';
import EditableField from '../../components/EditableField'; 

const MinimalTemplate5 = ({ data, onUpdate }) => {
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

  const removeExperience = (index) => {
    const newExperiences = (data.experiences || []).filter((_, i) => i !== index);
    onUpdate({ ...data, experiences: newExperiences });
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

  const removeEducation = (index) => {
    const newEducations = (data.educations || []).filter((_, i) => i !== index);
    onUpdate({ ...data, educations: newEducations });
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

  const removeSkill = (index) => {
    const newSkills = (data.skills || []).filter((_, i) => i !== index);
    onUpdate({ ...data, skills: newSkills });
  };

  const addCertificate = () => {
    const newCertificates = [...(data.certificates || []), ''];
    onUpdate({ ...data, certificates: newCertificates });
  };

  const updateCertificate = (index, value) => {
    const newCertificates = [...(data.certificates || [])];
    newCertificates[index] = value;
    onUpdate({ ...data, certificates: newCertificates });
  };

  const removeCertificate = (index) => {
    const newCertificates = (data.certificates || []).filter((_, i) => i !== index);
    onUpdate({ ...data, certificates: newCertificates });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar trái - Màu nền xám nhạt */}
        <div className="md:w-1/3 bg-gray-50 p-6">
          {/* Tên và chức danh */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              <EditableField
                value={data.personalInfo?.fullName}
                onSave={(v) => updateField('personalInfo.fullName', v)}
                placeholder="Họ và tên"
                className="font-bold"
              />
            </h1>
            <p className="text-sm text-gray-500">
              <EditableField
                value={data.personalInfo?.title}
                onSave={(v) => updateField('personalInfo.title', v)}
                placeholder="Chức danh"
              />
            </p>
          </div>

          {/* Liên hệ */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Liên hệ</h2>
            <div className="space-y-1 text-sm">
              <EditableField
                value={data.personalInfo?.email}
                onSave={(v) => updateField('personalInfo.email', v)}
                placeholder="Email"
              />
              <EditableField
                value={data.personalInfo?.phone}
                onSave={(v) => updateField('personalInfo.phone', v)}
                placeholder="Số điện thoại"
              />
              <EditableField
                value={data.personalInfo?.address}
                onSave={(v) => updateField('personalInfo.address', v)}
                placeholder="Địa chỉ"
              />
            </div>
          </div>

          {/* Kỹ năng */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Kỹ năng</h2>
              <button onClick={addSkill} className="text-xs text-blue-600">+</button>
            </div>
            <div className="space-y-1">
              {(data.skills || []).map((skill, idx) => (
                <div key={idx} className="group flex items-center justify-between">
                  <span className="text-gray-600 text-sm">•</span>
                  <EditableField
                    value={skill}
                    onSave={(v) => updateSkill(idx, v)}
                    placeholder={`Kỹ năng ${idx + 1}`}
                    className="flex-1 ml-2"
                  />
                  <button
                    onClick={() => removeSkill(idx)}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Chứng chỉ */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Chứng chỉ</h2>
              <button onClick={addCertificate} className="text-xs text-blue-600">+</button>
            </div>
            <div className="space-y-1">
              {(data.certificates || []).map((cert, idx) => (
                <div key={idx} className="group flex items-center justify-between">
                  <span className="text-gray-600 text-sm">📜</span>
                  <EditableField
                    value={cert}
                    onSave={(v) => updateCertificate(idx, v)}
                    placeholder={`Chứng chỉ ${idx + 1}`}
                    className="flex-1 ml-2"
                  />
                  <button
                    onClick={() => removeCertificate(idx)}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="md:w-2/3 p-6">
          {/* Giới thiệu */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Giới thiệu</h2>
            <EditableField
              value={data.personalInfo?.summary}
              onSave={(v) => updateField('personalInfo.summary', v)}
              placeholder="Giới thiệu về bản thân, kinh nghiệm, mục tiêu nghề nghiệp..."
              multiline
              className="text-gray-600 text-sm leading-relaxed"
            />
          </div>

          {/* Kinh nghiệm */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Kinh nghiệm làm việc</h2>
              <button onClick={addExperience} className="text-xs text-blue-600">+ Thêm</button>
            </div>
            <div className="space-y-4">
              {(data.experiences || []).map((exp, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button
                      onClick={() => removeExperience(idx)}
                      className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    >
                      ✕
                    </button>
                  )}
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800">
                      <EditableField
                        value={exp.position}
                        onSave={(v) => updateExperience(idx, 'position', v)}
                        placeholder="Vị trí"
                      />
                    </h3>
                    <span className="text-xs text-gray-400">
                      <EditableField
                        value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''}
                        onSave={(v) => {
                          const [start, end] = v.split('-').map(s => s.trim());
                          if (start) updateExperience(idx, 'startDate', start);
                          if (end) updateExperience(idx, 'endDate', end);
                        }}
                        placeholder="Thời gian"
                      />
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    <EditableField
                      value={exp.company}
                      onSave={(v) => updateExperience(idx, 'company', v)}
                      placeholder="Công ty"
                    />
                  </p>
                  <EditableField
                    value={exp.description}
                    onSave={(v) => updateExperience(idx, 'description', v)}
                    placeholder="Mô tả công việc và thành tích..."
                    multiline
                    className="text-gray-600 text-sm leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Học vấn */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Học vấn</h2>
              <button onClick={addEducation} className="text-xs text-blue-600">+ Thêm</button>
            </div>
            <div className="space-y-3">
              {(data.educations || []).map((edu, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button
                      onClick={() => removeEducation(idx)}
                      className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    >
                      ✕
                    </button>
                  )}
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800">
                      <EditableField
                        value={edu.school}
                        onSave={(v) => updateEducation(idx, 'school', v)}
                        placeholder="Trường học"
                      />
                    </h3>
                    <span className="text-xs text-gray-400">
                      <EditableField
                        value={edu.graduationYear}
                        onSave={(v) => updateEducation(idx, 'graduationYear', v)}
                        placeholder="Năm"
                      />
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
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
                    placeholder="Thành tích, GPA, hoạt động..."
                    className="text-gray-500 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 text-center text-xs text-gray-400 border-t border-gray-200">
        CV được tạo tại ĐANANG WORK - Tìm việc thông minh tại Đà Nẵng
      </div>
    </div>
  );
};

export default MinimalTemplate5;