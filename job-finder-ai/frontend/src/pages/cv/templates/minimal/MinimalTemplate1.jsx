// src/pages/cv/templates/MinimalTemplate1.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const MinimalTemplate1 = ({ data, onUpdate }) => {
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

  const addActivity = () => {
    const newActivities = [...(data.activities || []), { title: '', organization: '', description: '' }];
    onUpdate({ ...data, activities: newActivities });
  };

  const updateActivity = (index, field, value) => {
    const newActivities = [...(data.activities || [])];
    if (!newActivities[index]) newActivities[index] = {};
    newActivities[index][field] = value;
    onUpdate({ ...data, activities: newActivities });
  };

  const removeActivity = (index) => {
    const newActivities = (data.activities || []).filter((_, i) => i !== index);
    onUpdate({ ...data, activities: newActivities });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="p-8 md:p-10">
        {/* Header - Giống hình Trần Mai Lan */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2 tracking-tight">
            <EditableField
              value={data.personalInfo?.fullName}
              onSave={(v) => updateField('personalInfo.fullName', v)}
              placeholder="Họ và tên"
              className="font-light"
            />
          </h1>
          <p className="text-lg text-gray-500 font-medium mb-4">
            <EditableField
              value={data.personalInfo?.title}
              onSave={(v) => updateField('personalInfo.title', v)}
              placeholder="Chức danh"
            />
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <EditableField
              value={data.personalInfo?.linkedin}
              onSave={(v) => updateField('personalInfo.linkedin', v)}
              placeholder="linkedin.com/in/username"
              className="inline-flex items-center"
            />
            <EditableField
              value={data.personalInfo?.email}
              onSave={(v) => updateField('personalInfo.email', v)}
              placeholder="Email"
              className="inline-flex items-center"
            />
            <EditableField
              value={data.personalInfo?.phone}
              onSave={(v) => updateField('personalInfo.phone', v)}
              placeholder="Số điện thoại"
              className="inline-flex items-center"
            />
            <EditableField
              value={data.personalInfo?.website}
              onSave={(v) => updateField('personalInfo.website', v)}
              placeholder="Website"
              className="inline-flex items-center"
            />
          </div>
        </div>

        {/* Tiểu sử - Giống hình */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Tiểu sử</h2>
          <EditableField
            value={data.personalInfo?.summary}
            onSave={(v) => updateField('personalInfo.summary', v)}
            placeholder="Giới thiệu về bản thân, kinh nghiệm, thành tích nổi bật..."
            multiline
            className="text-gray-600 leading-relaxed"
          />
          <div className="mt-2">
            <EditableField
              value={data.personalInfo?.portfolioLink}
              onSave={(v) => updateField('personalInfo.portfolioLink', v)}
              placeholder="Xem hồ sơ năng lực tại đây"
              className="text-blue-600 text-sm"
            />
          </div>
        </div>

        {/* Kinh nghiệm làm việc - Giống hình */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Kinh nghiệm làm việc</h2>
            <button
              onClick={addExperience}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              + Thêm kinh nghiệm
            </button>
          </div>
          <div className="space-y-5">
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
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
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
                      placeholder="Tháng năm - Tháng năm"
                      className="inline-block"
                    />
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  <EditableField
                    value={exp.company}
                    onSave={(v) => updateExperience(idx, 'company', v)}
                    placeholder="Tên công ty"
                  />
                </p>
                <EditableField
                  value={exp.description}
                  onSave={(v) => updateExperience(idx, 'description', v)}
                  placeholder="Mô tả công việc và thành tích đạt được..."
                  multiline
                  className="text-gray-600 text-sm leading-relaxed"
                />
              </div>
            ))}
            {(data.experiences || []).length === 0 && (
              <p className="text-gray-400 text-sm italic">Chưa có kinh nghiệm. Nhấn "+ Thêm kinh nghiệm" để thêm.</p>
            )}
          </div>
        </div>

        {/* Kỹ năng chuyên môn - Giống hình */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Kỹ năng chuyên môn</h2>
            <button
              onClick={addSkill}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              + Thêm kỹ năng
            </button>
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
                <button
                  onClick={() => removeSkill(idx)}
                  className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
            {(data.skills || []).length === 0 && (
              <p className="text-gray-400 text-sm italic">Chưa có kỹ năng. Nhấn "+ Thêm kỹ năng" để thêm.</p>
            )}
          </div>
        </div>

        {/* Học vấn - Giống hình */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Quá trình học tập</h2>
            <button
              onClick={addEducation}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              + Thêm học vấn
            </button>
          </div>
          <div className="space-y-4">
            {(data.educations || []).map((edu, idx) => (
              <div key={idx} className="group relative">
                {idx > 0 && (
                  <button
                    onClick={() => removeEducation(idx)}
                    className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                )}
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h3 className="font-semibold text-gray-800">
                    <EditableField
                      value={edu.school}
                      onSave={(v) => updateEducation(idx, 'school', v)}
                      placeholder="Tên trường"
                    />
                  </h3>
                  <span className="text-sm text-gray-400">
                    <EditableField
                      value={edu.graduationYear}
                      onSave={(v) => updateEducation(idx, 'graduationYear', v)}
                      placeholder="Năm tốt nghiệp"
                      className="inline-block"
                    />
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  <EditableField
                    value={edu.degree && edu.fieldOfStudy ? `${edu.degree} ${edu.fieldOfStudy}` : ''}
                    onSave={(v) => {
                      const match = v.match(/^(.+?)\s+(.+)$/);
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
                  placeholder="Thành tích, hoạt động nổi bật..."
                  multiline
                  className="text-gray-600 text-sm leading-relaxed"
                />
              </div>
            ))}
            {(data.educations || []).length === 0 && (
              <p className="text-gray-400 text-sm italic">Chưa có học vấn. Nhấn "+ Thêm học vấn" để thêm.</p>
            )}
          </div>
        </div>

        {/* Công việc tình nguyện và sở thích - Giống hình */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Công việc tình nguyện và sở thích</h2>
            <button
              onClick={addActivity}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              + Thêm hoạt động
            </button>
          </div>
          <div className="space-y-3">
            {(data.activities || []).map((act, idx) => (
              <div key={idx} className="group relative">
                {idx > 0 && (
                  <button
                    onClick={() => removeActivity(idx)}
                    className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                )}
                <h3 className="font-semibold text-gray-800">
                  <EditableField
                    value={act.title}
                    onSave={(v) => updateActivity(idx, 'title', v)}
                    placeholder="Vai trò / Hoạt động"
                  />
                </h3>
                <p className="text-sm text-gray-500">
                  <EditableField
                    value={act.organization}
                    onSave={(v) => updateActivity(idx, 'organization', v)}
                    placeholder="Tổ chức / Câu lạc bộ"
                  />
                </p>
                <EditableField
                  value={act.description}
                  onSave={(v) => updateActivity(idx, 'description', v)}
                  placeholder="Mô tả chi tiết..."
                  multiline
                  className="text-gray-600 text-sm leading-relaxed"
                />
              </div>
            ))}
            {(data.activities || []).length === 0 && (
              <p className="text-gray-400 text-sm italic">Chưa có hoạt động. Nhấn "+ Thêm hoạt động" để thêm.</p>
            )}
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

export default MinimalTemplate1;