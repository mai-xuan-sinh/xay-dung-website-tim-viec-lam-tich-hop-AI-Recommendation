// src/pages/cv/templates/MinimalTemplate4.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const MinimalTemplate4 = ({ data, onUpdate }) => {
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

  const addProject = () => {
    const newProjects = [...(data.projects || []), { name: '', description: '', techStack: '' }];
    onUpdate({ ...data, projects: newProjects });
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...(data.projects || [])];
    if (!newProjects[index]) newProjects[index] = {};
    newProjects[index][field] = value;
    onUpdate({ ...data, projects: newProjects });
  };

  const removeProject = (index) => {
    const newProjects = (data.projects || []).filter((_, i) => i !== index);
    onUpdate({ ...data, projects: newProjects });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      {/* Header với đường kẻ ngang */}
      <div className="p-8 pb-4">
        <h1 className="text-5xl font-light text-gray-900 mb-2 tracking-wide">
          <EditableField
            value={data.personalInfo?.fullName}
            onSave={(v) => updateField('personalInfo.fullName', v)}
            placeholder="HỌ VÀ TÊN"
            className="font-light uppercase"
          />
        </h1>
        <p className="text-md text-gray-500 mb-4">
          <EditableField
            value={data.personalInfo?.title}
            onSave={(v) => updateField('personalInfo.title', v)}
            placeholder="Chức danh"
          />
        </p>
        <div className="w-12 h-0.5 bg-gray-300 mb-4"></div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <EditableField
            value={data.personalInfo?.email}
            onSave={(v) => updateField('personalInfo.email', v)}
            placeholder="Email"
          />
          <span>|</span>
          <EditableField
            value={data.personalInfo?.phone}
            onSave={(v) => updateField('personalInfo.phone', v)}
            placeholder="Số điện thoại"
          />
          <span>|</span>
          <EditableField
            value={data.personalInfo?.address}
            onSave={(v) => updateField('personalInfo.address', v)}
            placeholder="Địa chỉ"
          />
        </div>
      </div>

      {/* Nội dung 2 cột */}
      <div className="p-8 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột trái - Thông tin cá nhân & Kỹ năng */}
          <div className="md:col-span-1">
            {/* Giới thiệu */}
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Giới thiệu</h2>
              <EditableField
                value={data.personalInfo?.summary}
                onSave={(v) => updateField('personalInfo.summary', v)}
                placeholder="Đôi nét về bản thân..."
                multiline
                className="text-gray-600 text-sm leading-relaxed"
              />
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

            {/* Liên hệ */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Liên hệ</h2>
              <div className="space-y-1 text-sm text-gray-500">
                <div>
                  <EditableField
                    value={data.personalInfo?.linkedin}
                    onSave={(v) => updateField('personalInfo.linkedin', v)}
                    placeholder="LinkedIn"
                  />
                </div>
                <div>
                  <EditableField
                    value={data.personalInfo?.website}
                    onSave={(v) => updateField('personalInfo.website', v)}
                    placeholder="Website"
                  />
                </div>
                <div>
                  <EditableField
                    value={data.personalInfo?.github}
                    onSave={(v) => updateField('personalInfo.github', v)}
                    placeholder="GitHub"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải - Kinh nghiệm & Học vấn */}
          <div className="md:col-span-2">
            {/* Kinh nghiệm */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Kinh nghiệm làm việc</h2>
                <button onClick={addExperience} className="text-xs text-blue-600">+ Thêm</button>
              </div>
              <div className="space-y-4">
                {(data.experiences || []).map((exp, idx) => (
                  <div key={idx} className="group relative border-l-2 border-gray-200 pl-4 pb-2">
                    {idx > 0 && (
                      <button
                        onClick={() => removeExperience(idx)}
                        className="absolute -top-1 -right-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
                      placeholder="Mô tả công việc..."
                      multiline
                      className="text-gray-600 text-sm leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dự án */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Dự án nổi bật</h2>
                <button onClick={addProject} className="text-xs text-blue-600">+ Thêm</button>
              </div>
              <div className="space-y-3">
                {(data.projects || []).map((proj, idx) => (
                  <div key={idx} className="group relative">
                    {idx > 0 && (
                      <button
                        onClick={() => removeProject(idx)}
                        className="absolute -top-1 -right-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    )}
                    <h3 className="font-semibold text-gray-800">
                      <EditableField
                        value={proj.name}
                        onSave={(v) => updateProject(idx, 'name', v)}
                        placeholder="Tên dự án"
                      />
                    </h3>
                    <EditableField
                      value={proj.description}
                      onSave={(v) => updateProject(idx, 'description', v)}
                      placeholder="Mô tả dự án..."
                      multiline
                      className="text-gray-600 text-sm leading-relaxed"
                    />
                    <div className="flex flex-wrap gap-1 mt-1">
                      <EditableField
                        value={proj.techStack}
                        onSave={(v) => updateProject(idx, 'techStack', v)}
                        placeholder="Công nghệ sử dụng"
                        className="text-xs text-gray-400"
                      />
                    </div>
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
                        className="absolute -top-1 -right-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
                      placeholder="Thành tích, GPA..."
                      className="text-gray-500 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 pb-6 pt-2 border-t border-gray-100 text-center text-xs text-gray-400">
        CV được tạo tại ĐANANG WORK
      </div>
    </div>
  );
};

export default MinimalTemplate4;