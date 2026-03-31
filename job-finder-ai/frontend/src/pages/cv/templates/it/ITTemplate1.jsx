// src/pages/cv/templates/it/ITTemplate1.jsx
import React from 'react';
import EditableField from '../../components/EditableField';

const ITTemplate1 = ({ data, onUpdate }) => {
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
      startDate: '',
      endDate: '',
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
    const newSkills = [...(data.skills || []), { name: '', percentage: 0 }];
    onUpdate({ ...data, skills: newSkills });
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...(data.skills || [])];
    if (!newSkills[index]) newSkills[index] = { name: '', percentage: 0 };
    newSkills[index][field] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = (data.skills || []).filter((_, i) => i !== index);
    onUpdate({ ...data, skills: newSkills });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar trái - Màu xanh navy */}
        <div className="md:w-1/3 bg-[#1a2a3a] text-white p-8">
          {/* Tên và chức danh */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              <EditableField
                value={data.personalInfo?.fullName}
                onSave={(v) => updateField('personalInfo.fullName', v)}
                placeholder="Henrietta Mitchell"
                className="text-white font-bold"
              />
            </h1>
            <p className="text-gray-300 text-sm uppercase tracking-wide">
              <EditableField
                value={data.personalInfo?.title}
                onSave={(v) => updateField('personalInfo.title', v)}
                placeholder="UI/UX DESIGNER"
              />
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">CONTACT</h2>
            <div className="space-y-2 text-sm">
              <div>
                <EditableField
                  value={data.personalInfo?.phone}
                  onSave={(v) => updateField('personalInfo.phone', v)}
                  placeholder="+84 123 456 789"
                  className="text-gray-300"
                />
              </div>
              <div>
                <EditableField
                  value={data.personalInfo?.email}
                  onSave={(v) => updateField('personalInfo.email', v)}
                  placeholder="hello@reallygreatsite.com"
                  className="text-gray-300"
                />
              </div>
              <div>
                <EditableField
                  value={data.personalInfo?.address}
                  onSave={(v) => updateField('personalInfo.address', v)}
                  placeholder="123 Anywhere St., Any City"
                  className="text-gray-300"
                />
              </div>
              <div>
                <EditableField
                  value={data.personalInfo?.website}
                  onSave={(v) => updateField('personalInfo.website', v)}
                  placeholder="www.reallygreatsite.com"
                  className="text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">EDUCATION</h2>
              <button onClick={addEducation} className="text-xs text-gray-400 hover:text-white">+</button>
            </div>
            <div className="space-y-4">
              {(data.educations || []).map((edu, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button
                      onClick={() => removeEducation(idx)}
                      className="absolute -top-2 -right-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  )}
                  <h3 className="font-semibold text-sm">
                    <EditableField
                      value={edu.degree}
                      onSave={(v) => updateEducation(idx, 'degree', v)}
                      placeholder="Bachelor of Science in Design"
                      className="text-white"
                    />
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    <EditableField
                      value={edu.school}
                      onSave={(v) => updateEducation(idx, 'school', v)}
                      placeholder="Fauget University"
                    />
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    <EditableField
                      value={edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''}
                      onSave={(v) => {
                        const [start, end] = v.split('-').map(s => s.trim());
                        if (start) updateEducation(idx, 'startDate', start);
                        if (end) updateEducation(idx, 'endDate', end);
                      }}
                      placeholder="2018 - 2020"
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">SKILLS</h2>
              <button onClick={addSkill} className="text-xs text-gray-400 hover:text-white">+</button>
            </div>
            <div className="space-y-3">
              {(data.skills || []).map((skill, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button
                      onClick={() => removeSkill(idx)}
                      className="absolute -top-2 -right-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  )}
                  <div className="flex justify-between text-sm mb-1">
                    <EditableField
                      value={skill.name}
                      onSave={(v) => updateSkill(idx, 'name', v)}
                      placeholder="Skill name"
                      className="text-gray-300"
                    />
                    <span className="text-gray-400 text-xs">
                      <EditableField
                        value={skill.percentage ? `${skill.percentage}%` : ''}
                        onSave={(v) => {
                          const num = parseInt(v);
                          updateSkill(idx, 'percentage', isNaN(num) ? 0 : Math.min(100, Math.max(0, num)));
                        }}
                        placeholder="86%"
                        className="text-right w-12"
                      />
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${skill.percentage || 86}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nội dung chính - Bên phải */}
        <div className="md:w-2/3 p-8">
          {/* Profile / About */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">PROFILE</h2>
            <EditableField
              value={data.personalInfo?.summary}
              onSave={(v) => updateField('personalInfo.summary', v)}
              placeholder="Dedicated and innovative UI/UX designer with 4 years of experience in creating intuitive and visually appealing digital experiences. Adept at translating user needs into elegant, user-centered design solutions."
              multiline
              className="text-gray-600 text-sm leading-relaxed"
            />
          </div>

          {/* Work Experience */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">WORK EXPERIENCE</h2>
              <button onClick={addExperience} className="text-xs text-blue-600 hover:text-blue-700">+ Add</button>
            </div>
            <div className="space-y-6">
              {(data.experiences || []).map((exp, idx) => (
                <div key={idx} className="group relative">
                  {idx > 0 && (
                    <button
                      onClick={() => removeExperience(idx)}
                      className="absolute -top-2 -right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  )}
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800">
                      <EditableField
                        value={exp.position}
                        onSave={(v) => updateExperience(idx, 'position', v)}
                        placeholder="Graphic Designer"
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
                        placeholder="2018 - 2020"
                      />
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    <EditableField
                      value={exp.company}
                      onSave={(v) => updateExperience(idx, 'company', v)}
                      placeholder="Fauget University"
                    />
                  </p>
                  <EditableField
                    value={exp.description}
                    onSave={(v) => updateExperience(idx, 'description', v)}
                    placeholder="Collaborated with clients to understand their visual branding needs and provided creative design solutions."
                    multiline
                    className="text-gray-600 text-sm leading-relaxed"
                  />
                </div>
              ))}
              {(data.experiences || []).length === 0 && (
                <p className="text-gray-400 text-sm italic text-center py-4">No work experience added. Click "+ Add" to add.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
        CV được tạo tại ĐANANG WORK
      </div>
    </div>
  );
};

export default ITTemplate1;